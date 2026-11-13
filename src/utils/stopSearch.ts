/**
 * Search the static stop index (`tfl-ts/meta/stops`). Pure and deterministic:
 * the same index, query and options always give the same rows in the same order.
 *
 * Live TfL search is separate; see `src/utils/busStopSearch.ts` for that and
 * `mergeLiveResults` (`./stopMerge`) for laying live hits over these rows.
 */

import { foldStopQueries, foldStopText } from '../stops/fold';
import type { StopIndex, StopKind, StopRow } from '../stops/types';
import { parseBusStopSearchQuery } from './busStopSearch';

export const DEFAULT_STOP_SEARCH_LIMIT = 20;

export interface SearchStopsOptions {
  /** Maximum rows returned. Default 20. */
  limit?: number;
  /** Break ties by distance to this point; adds `distance` (metres) to each row. */
  near?: { lat: number; lon: number };
  /** Restrict to stations or bus stops. */
  kinds?: readonly StopKind[];
}

/** How well a folded name matches a folded query. Lower is better. */
export const MATCH_EXACT = 0;
export const MATCH_PREFIX = 1;
export const MATCH_WORD_PREFIX = 2;
export const MATCH_CONTAINS = 3;
export const MATCH_ALL_WORDS = 4;
const NO_MATCH = -1;

type ParsedStopQuery = {
  /** Folded forms of the whole query as typed. */
  whole: string[];
  /** Folded forms of the query without its stop letter, with the letter. */
  lettered?: { text: string[]; letter: string };
  /** `stop E` on its own: only rows with that letter. */
  letterOnly: boolean;
};

const EXPLICIT_LETTER_ONLY = /^stop\s+([a-z0-9]{1,2})$/i;
const TRAILING_BARE_LETTER = /^(.{2,}?)\s+([a-z])$/i;

/**
 * Split a typed query into text and stop letter.
 *
 * - `kings cross stop E`, `Rookery Road (Stop Y)` → text + letter
 * - `stop E` → letter only
 * - `kings cross E` → text + letter, but also tried whole (`oxford c` may mean
 *   Oxford Circus), so a bare trailing letter never hides a plain name match
 */
export const parseStopSearchQuery = (raw: string): ParsedStopQuery => {
  const trimmed = raw.trim();
  const parsedWhole = foldStopQueries(trimmed);
  const only = trimmed.match(EXPLICIT_LETTER_ONLY);
  if (only) {
    return {
      whole: [],
      lettered: { text: [], letter: only[1].toUpperCase() },
      letterOnly: true,
    };
  }
  const explicit = parseBusStopSearchQuery(trimmed);
  if (explicit.stopLetter) {
    return {
      whole: [],
      lettered: {
        text: foldStopQueries(explicit.query),
        letter: explicit.stopLetter.toUpperCase(),
      },
      letterOnly: false,
    };
  }
  const bare = trimmed.match(TRAILING_BARE_LETTER);
  if (bare) {
    return {
      whole: parsedWhole,
      lettered: { text: foldStopQueries(bare[1]), letter: bare[2].toUpperCase() },
      letterOnly: false,
    };
  }
  return { whole: parsedWhole, letterOnly: false };
};

/** Class of one folded name against one folded query, or -1. */
const classify = (name: string, query: string, queryWords: readonly string[]): number => {
  if (name === query) return MATCH_EXACT;
  if (name.startsWith(query)) return MATCH_PREFIX;
  if ((' ' + name).includes(' ' + query)) return MATCH_WORD_PREFIX;
  if (name.includes(query)) return MATCH_CONTAINS;
  if (queryWords.length > 1) {
    const nameWords = name.split(' ');
    const used = new Set<number>();
    const everyWordFound = queryWords.every((word) => {
      const at = nameWords.findIndex((candidate, i) => !used.has(i) && candidate.startsWith(word));
      if (at < 0) return false;
      used.add(at);
      return true;
    });
    if (everyWordFound) return MATCH_ALL_WORDS;
  }
  return NO_MATCH;
};

/** Best class of `name` across the folded query forms, or -1. */
export const classifyStopName = (foldedName: string, foldedQueries: readonly string[]): number => {
  let best = NO_MATCH;
  for (const query of foldedQueries) {
    const matched = classify(foldedName, query, query.split(' '));
    if (matched !== NO_MATCH && (best === NO_MATCH || matched < best)) best = matched;
  }
  return best;
};

const foldedNameCache = new WeakMap<object, string[]>();

const foldedNames = (index: StopIndex): string[] => {
  let folded = foldedNameCache.get(index.data);
  if (!folded) {
    folded = index.data.names.map(foldStopText);
    foldedNameCache.set(index.data, folded);
  }
  return folded;
};

const EARTH_RADIUS_M = 6_371_000;

/** Great-circle distance in metres. */
export const distanceMeters = (
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number => {
  const toRad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * toRad;
  const dLon = (b.lon - a.lon) * toRad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * toRad) * Math.cos(b.lat * toRad) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
};

type Candidate = {
  position: number;
  pinned: boolean;
  matchClass: number;
  distance: number;
};

/**
 * Search stations and bus stops by name.
 *
 * Order: stop-letter pin (`kings cross E` puts stop E first) → match class
 * (exact < prefix < word-prefix < contains < all words) → stations before bus
 * stops → distance to `near` → name A–Z → letter → id.
 *
 * Folding covers case, diacritics, `King's`/`Kings`, `&`/`and`, `St`/`Saint`
 * and common abbreviations (`Rd`, `Stn`). An empty query returns `[]`, or the
 * nearest rows when `near` is given.
 *
 * @example
 * import { STOP_INDEX, searchStops } from 'tfl-ts/meta/stops';
 * searchStops(STOP_INDEX, 'tow');                       // Tower Gateway, Tower Hill, …
 * searchStops(STOP_INDEX, 'kings cross E', { limit: 5 }); // stop E first
 */
export const searchStops = (
  index: StopIndex,
  query: string,
  options: SearchStopsOptions = {},
): StopRow[] => {
  const limit = Math.max(0, options.limit ?? DEFAULT_STOP_SEARCH_LIMIT);
  const parsed = parseStopSearchQuery(query);
  const near = options.near;
  const hasText = parsed.whole.length > 0 || (parsed.lettered?.text.length ?? 0) > 0;
  if (!hasText && !parsed.lettered && !near) return [];
  if (limit === 0) return [];

  const data = index.data;
  const columns = index.columns;
  const names = foldedNames(index);
  const wholeClass = new Int8Array(names.length).fill(NO_MATCH);
  const letteredClass = new Int8Array(names.length).fill(NO_MATCH);
  const matchAll = !hasText && !parsed.lettered; // empty query + near
  for (let n = 0; n < names.length; n++) {
    if (parsed.whole.length > 0) wholeClass[n] = classifyStopName(names[n], parsed.whole);
    if (parsed.lettered && parsed.lettered.text.length > 0) {
      letteredClass[n] = classifyStopName(names[n], parsed.lettered.text);
    }
  }

  const kinds = options.kinds;
  const wantStation = !kinds || kinds.includes('station');
  const wantBus = !kinds || kinds.includes('bus');
  const letter = parsed.lettered?.letter;
  const candidates: Candidate[] = [];

  for (let position = 0; position < index.size; position++) {
    const isStation = position < data.stationCount;
    if (isStation ? !wantStation : !wantBus) continue;
    const nameAt = columns.name[position];

    let matchClass = NO_MATCH;
    let pinned = false;
    if (matchAll) {
      matchClass = MATCH_EXACT;
    } else {
      if (parsed.whole.length > 0) matchClass = wholeClass[nameAt];
      if (letter !== undefined) {
        const textMatched = parsed.letterOnly ? MATCH_EXACT : letteredClass[nameAt];
        const rowLetter = data.letter[position];
        if (parsed.letterOnly) {
          if (rowLetter === letter) {
            pinned = true;
            matchClass = MATCH_EXACT;
          }
        } else if (textMatched !== NO_MATCH) {
          pinned = rowLetter === letter;
          if (matchClass === NO_MATCH || textMatched < matchClass) matchClass = textMatched;
        }
      }
    }
    if (matchClass === NO_MATCH) continue;

    let distance = 0;
    if (near) {
      distance = distanceMeters(near, {
        lat: columns.lat[position] / 1e5,
        lon: columns.lon[position] / 1e5,
      });
    }
    candidates.push({ position, pinned, matchClass, distance });
  }

  candidates.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (a.matchClass !== b.matchClass) return a.matchClass - b.matchClass;
    const aStation = a.position < data.stationCount;
    const bStation = b.position < data.stationCount;
    if (aStation !== bStation) return aStation ? -1 : 1;
    if (near && a.distance !== b.distance) return a.distance - b.distance;
    const aName = names[columns.name[a.position]];
    const bName = names[columns.name[b.position]];
    if (aName !== bName) return aName < bName ? -1 : 1;
    const aLetter = data.letter[a.position];
    const bLetter = data.letter[b.position];
    if (aLetter !== bLetter) return aLetter < bLetter ? -1 : 1;
    const aId = data.id[a.position];
    const bId = data.id[b.position];
    return aId < bId ? -1 : aId > bId ? 1 : 0;
  });

  return candidates.slice(0, limit).map((candidate) => {
    const row = index.at(candidate.position) as StopRow;
    return near ? { ...row, distance: Math.round(candidate.distance) } : row;
  });
};
