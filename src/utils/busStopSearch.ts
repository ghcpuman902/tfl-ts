/**
 * Bus name search: TfL's StopPoint search often returns a mix of boarding
 * 490… stops and 490G… area hubs. Boarding hits alone are incomplete.
 * Expand named hubs, then keep stops whose names match the query.
 */

const GENERIC_BUS_SEARCH_WORDS = new Set([
  'and',
  'avenue',
  'bridge',
  'circus',
  'close',
  'common',
  'green',
  'grove',
  'hill',
  'lane',
  'park',
  'place',
  'road',
  'row',
  'square',
  'st',
  'station',
  'stop',
  'street',
  'the',
  'way',
]);

const PAINTED_STOP_LETTER = /^[A-Z]{1,2}$/;
const STOP_LETTER_IN_BRACKETS =
  /^(.*?)\s*\(\s*(?:stop\s+)?([a-z0-9]{1,2})\s*\)\s*$/i;
const STOP_LETTER_TRAILING = /^(.*?)\s+stop\s+([a-z0-9]{1,2})\s*$/i;

export const DEFAULT_BUS_SEARCH_LIMIT = 12;
export const DEFAULT_BUS_SEARCH_HUB_LIMIT = 3;
export const DEFAULT_BUS_SEARCH_HUB_RADIUS_METERS = 400;
export const DEFAULT_BUS_SEARCH_STOPS_PER_HUB = 25;

export type BoardableBusStop = {
  id: string;
  name: string;
  indicator?: string;
  stopLetter?: string;
  towards?: string;
  distance?: number;
  lines?: string[];
  lat?: number;
  lon?: number;
  smsCode?: string;
};

export type BusStopSearchMatch = {
  id?: string;
  name?: string;
  stationName?: string;
  lat?: number;
  lon?: number;
  modes?: string[];
  lines?: Array<{ id?: string; name?: string }>;
  platformName?: string;
  towards?: string;
};

export type BusStopPointLike = {
  id?: string;
  naptanId?: string;
  commonName?: string;
  name?: string;
  indicator?: string;
  stopLetter?: string;
  towards?: string;
  distance?: number;
  lat?: number;
  lon?: number;
  modes?: string[];
  lines?: Array<{ id?: string; name?: string }>;
  additionalProperties?: Array<{ key?: string; value?: string }>;
  smsCode?: string;
};

export type SearchBusStopsOptions = {
  query: string;
  maxResults?: number;
  /** Named 490G… hubs to expand. Default 3. */
  maxHubs?: number;
  /** Metres around each hub. Default 400. */
  hubRadius?: number;
};

const usableText = (value?: string | null): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed || /^(null|undefined)$/i.test(trimmed)) return undefined;
  return trimmed;
};

const normalizeSearchText = (value: string): string =>
  value.trim().toLowerCase().replace(/['’]/g, '');

const normalizeStopLetter = (raw?: string | null): string | undefined => {
  const stripped = raw
    ?.replace(/^stop\s+/i, '')
    .trim()
    .toUpperCase();
  if (!stripped || !PAINTED_STOP_LETTER.test(stripped)) return undefined;
  return stripped;
};

const readStopLetter = (
  stopLetter?: string | null,
  indicator?: string | null,
): string | undefined =>
  normalizeStopLetter(stopLetter) ?? normalizeStopLetter(indicator);

const readAdditionalProperty = (
  properties: BusStopPointLike['additionalProperties'],
  key: string,
): string | undefined =>
  usableText(
    properties?.find((prop) => prop.key?.toLowerCase() === key.toLowerCase())
      ?.value,
  );

const lineNames = (
  lines?: Array<{ id?: string; name?: string }>,
): string[] | undefined => {
  const names = lines
    ?.map((line) => line.name ?? line.id)
    .filter((value): value is string => Boolean(value));
  return names?.length ? names : undefined;
};

/** London boarding bus StopPoints that carry live arrivals (not 490G… hubs). */
export const isBoardableBusStopId = (id: string): boolean => /^490\d/i.test(id);

export const isBusStop = (modes?: string[]): boolean =>
  modes?.includes('bus') ?? false;

export const isSmsCodeQuery = (query: string): boolean =>
  /^\d{5}$/.test(query.trim());

/** True when a stop or hub name is a real hit for the typed query. */
export const busSearchNameMatches = (name: string, query: string): boolean => {
  const needle = normalizeSearchText(query);
  if (needle.length < 2) return false;
  const haystack = normalizeSearchText(name);
  if (haystack.includes(needle)) return true;
  const tokens = needle
    .split(/[^a-z0-9]+/)
    .filter(
      (token) => token.length >= 4 && !GENERIC_BUS_SEARCH_WORDS.has(token),
    );
  return tokens.some((token) => haystack.includes(token));
};

/**
 * Google-style labels: "Rookery Road (Stop Y)".
 * Search the street; keep the letter to pin the matching stop first.
 */
export const parseBusStopSearchQuery = (
  raw: string,
): { query: string; stopLetter?: string } => {
  const trimmed = raw.trim();
  const bracket = trimmed.match(STOP_LETTER_IN_BRACKETS);
  if (bracket?.[1] && bracket[2]) {
    const query = bracket[1].trim();
    if (query.length >= 2) {
      return { query, stopLetter: bracket[2].toUpperCase() };
    }
  }
  const trailing = trimmed.match(STOP_LETTER_TRAILING);
  if (trailing?.[1] && trailing[2]) {
    const query = trailing[1].trim();
    if (query.length >= 2) {
      return { query, stopLetter: trailing[2].toUpperCase() };
    }
  }
  return { query: trimmed };
};

/** Hubs with coordinates, preferring names that match the query. Skips boarding IDs. */
export const pickNamedExpandableMatches = <
  T extends {
    id?: string;
    name?: string;
    stationName?: string;
    lat?: number;
    lon?: number;
  },
>(
  matches: readonly T[],
  query: string,
  limit = DEFAULT_BUS_SEARCH_HUB_LIMIT,
): T[] => {
  const withCoords = matches.filter(
    (match) =>
      typeof match.lat === 'number' &&
      typeof match.lon === 'number' &&
      !(match.id && isBoardableBusStopId(match.id)),
  );
  const named = withCoords.filter((match) =>
    busSearchNameMatches(match.name ?? match.stationName ?? '', query),
  );
  const chosen = named.length > 0 ? named : withCoords;
  return chosen.slice(0, limit);
};

export const mergeStopsById = <T extends { id: string }>(
  groups: readonly (readonly T[])[],
): T[] => {
  const seen = new Set<string>();
  const merged: T[] = [];
  for (const group of groups) {
    for (const stop of group) {
      if (seen.has(stop.id)) continue;
      seen.add(stop.id);
      merged.push(stop);
    }
  }
  return merged;
};

/** Keep name matches when any exist so a street search is not a nearby dump. */
export const preferStopsMatchingSearch = <T extends { name: string }>(
  stops: readonly T[],
  query: string,
): T[] => {
  const matched = stops.filter((stop) => busSearchNameMatches(stop.name, query));
  return matched.length > 0 ? matched : [...stops];
};

/** Pin stops whose letter matches a parsed "(Stop Y)" query, keep the rest. */
export const rankStopsBySearchLetter = <T extends { stopLetter?: string }>(
  stops: readonly T[],
  stopLetter?: string,
): T[] => {
  if (!stopLetter) return [...stops];
  const wanted = stopLetter.toUpperCase();
  const matched: T[] = [];
  const rest: T[] = [];
  for (const stop of stops) {
    if (stop.stopLetter?.toUpperCase() === wanted) matched.push(stop);
    else rest.push(stop);
  }
  return matched.length > 0 ? [...matched, ...rest] : [...stops];
};

export const resolveBusNameSearchHits = <
  T extends { id: string; name: string; stopLetter?: string },
>(
  boardable: readonly T[],
  expandedGroups: readonly (readonly T[])[],
  query: string,
  stopLetter?: string,
  extras: readonly T[] = [],
  limit = DEFAULT_BUS_SEARCH_LIMIT,
): T[] =>
  rankStopsBySearchLetter(
    preferStopsMatchingSearch(
      mergeStopsById([extras, boardable, ...expandedGroups]),
      query,
    ),
    stopLetter,
  ).slice(0, limit);

export const mapBusStopFromSearchMatch = (
  match: BusStopSearchMatch,
): BoardableBusStop | null => {
  if (!match.id) return null;
  return {
    id: match.id,
    name: (match.name ?? match.stationName)?.trim() || 'Unknown stop',
    indicator: match.platformName,
    stopLetter: readStopLetter(undefined, match.platformName),
    towards: usableText(match.towards),
    lines: lineNames(match.lines),
    lat: typeof match.lat === 'number' ? match.lat : undefined,
    lon: typeof match.lon === 'number' ? match.lon : undefined,
  };
};

export const mapBusStopFromStopPoint = (
  stop: BusStopPointLike,
): BoardableBusStop | null => {
  const id = stop.id ?? stop.naptanId;
  if (!id) return null;
  return {
    id,
    name: (stop.commonName ?? stop.name)?.trim() || 'Unknown stop',
    indicator: stop.indicator,
    stopLetter: readStopLetter(stop.stopLetter, stop.indicator),
    towards:
      usableText(stop.towards) ||
      readAdditionalProperty(stop.additionalProperties, 'towards'),
    distance: stop.distance,
    lines: lineNames(stop.lines),
    lat: typeof stop.lat === 'number' ? stop.lat : undefined,
    lon: typeof stop.lon === 'number' ? stop.lon : undefined,
    smsCode:
      usableText(stop.smsCode) ||
      readAdditionalProperty(stop.additionalProperties, 'smscode'),
  };
};

export const mapBoardableStopsFromGeoResponse = (
  stopPoints: readonly BusStopPointLike[],
  limit: number,
): BoardableBusStop[] =>
  stopPoints
    .filter(
      (stop) =>
        (stop.id || stop.naptanId) &&
        isBusStop(stop.modes) &&
        isBoardableBusStopId(stop.id ?? stop.naptanId ?? ''),
    )
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
    .slice(0, limit)
    .map(mapBusStopFromStopPoint)
    .filter((stop): stop is BoardableBusStop => stop !== null);

export const mergeBusStopDetail = (
  stop: BoardableBusStop,
  detail?: BoardableBusStop | null,
): BoardableBusStop => {
  if (!detail) return stop;
  return {
    ...stop,
    stopLetter: stop.stopLetter ?? detail.stopLetter,
    towards: stop.towards ?? detail.towards,
    lines: stop.lines?.length ? stop.lines : detail.lines,
    name: stop.name || detail.name,
    smsCode: stop.smsCode ?? detail.smsCode,
    lat: stop.lat ?? detail.lat,
    lon: stop.lon ?? detail.lon,
    indicator: stop.indicator ?? detail.indicator,
  };
};
