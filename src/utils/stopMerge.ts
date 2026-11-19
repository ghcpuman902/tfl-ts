/**
 * Lay live TfL search hits over the instant (static index) result list without
 * moving anything the user is already looking at.
 *
 * Rules, all pure and idempotent:
 * 1. Every instant row keeps its identity (`id`) and its position.
 * 2. A live hit that matches an instant row (same id, or a station hub and one
 *    of its members, via `STATION_HUBS`) enriches that row in place: missing
 *    fields are filled and `lines` / `modes` are unioned. Nothing is overwritten
 *    and `name` never changes.
 * 3. Live-only hits are appended below, in the order the live list gave them,
 *    marked `liveOnly: true`.
 * 4. Merging the same live payload again changes nothing, and returns the very
 *    array it was given, so a UI can skip the re-render.
 */

import { STATION_HUBS } from '../generated/meta/StationHubs';
import type { LiveStopHit, StopRow } from '../stops/types';
import {
  isBoardableBusStopId,
  readAdditionalProperty,
  readStopLetter,
  usableText,
} from './busStopSearch';

export interface MergeLiveOptions {
  /**
   * Hub lookup by station or hub id. Defaults to the bundled `STATION_HUBS`.
   * Pass `{}` to match on exact ids only.
   */
  hubs?: Readonly<Record<string, { hubId?: string }>>;
}

const liveId = (hit: LiveStopHit): string | undefined => usableText(hit.id ?? hit.naptanId);

const liveLines = (hit: LiveStopHit): string[] =>
  (hit.lines ?? [])
    .map((line) => (typeof line === 'string' ? line : (line.id ?? line.name)))
    .filter((line): line is string => Boolean(line));

const sortedUnion = (current: readonly string[], extra: readonly string[]): readonly string[] => {
  const missing = extra.filter((value) => !current.includes(value));
  if (missing.length === 0) return current;
  return [...new Set([...current, ...missing])].sort();
};

const hitTowards = (hit: LiveStopHit): string | undefined =>
  usableText(hit.towards) ?? readAdditionalProperty(hit.additionalProperties, 'towards');

/** Fill what `row` lacks from `hit`. Returns `row` itself when nothing changes. */
const enrichRow = (row: StopRow, hit: LiveStopHit, sameStop: boolean): StopRow => {
  const next: StopRow = { ...row };
  let changed = false;
  const set = <K extends keyof StopRow>(key: K, value: StopRow[K] | undefined): void => {
    if (value === undefined || next[key] !== undefined) return;
    next[key] = value;
    changed = true;
  };

  if (typeof hit.lat === 'number') set('lat', hit.lat);
  if (typeof hit.lon === 'number') set('lon', hit.lon);
  if (sameStop && row.kind === 'bus') {
    set('letter', readStopLetter(hit.stopLetter, hit.indicator ?? hit.platformName));
    set('indicator', usableText(hit.indicator ?? hit.platformName));
    set('towards', hitTowards(hit));
  }
  const hubCode = usableText(hit.hubNaptanCode);
  if (hubCode && hubCode !== row.id) set('hubId', hubCode);

  const lines = sortedUnion(row.lines, liveLines(hit));
  if (lines !== row.lines) {
    next.lines = lines;
    changed = true;
  }
  const modes = sortedUnion(row.modes, hit.modes ?? []);
  if (modes !== row.modes) {
    next.modes = modes;
    changed = true;
  }
  return changed ? next : row;
};

const isBusHit = (hit: LiveStopHit, id: string): boolean =>
  hit.modes?.length ? hit.modes.every((mode) => mode === 'bus') : isBoardableBusStopId(id);

const rowFromLiveHit = (hit: LiveStopHit, id: string): StopRow => {
  const row: StopRow = {
    id,
    name: usableText(hit.commonName ?? hit.name ?? hit.stationName) ?? id,
    kind: isBusHit(hit, id) ? 'bus' : 'station',
    lines: [...new Set(liveLines(hit))].sort(),
    modes: [...new Set(hit.modes ?? [])].sort(),
    liveOnly: true,
  };
  const hubCode = usableText(hit.hubNaptanCode);
  if (row.kind === 'bus') {
    const letter = readStopLetter(hit.stopLetter, hit.indicator ?? hit.platformName);
    const indicator = usableText(hit.indicator ?? hit.platformName);
    const towards = hitTowards(hit);
    if (letter) row.letter = letter;
    if (indicator) row.indicator = indicator;
    if (towards) row.towards = towards;
  }
  if (typeof hit.lat === 'number') row.lat = hit.lat;
  if (typeof hit.lon === 'number') row.lon = hit.lon;
  if (hubCode && hubCode !== id) row.hubId = hubCode;
  return row;
};

/**
 * Merge live hits into the instant list. See the module notes for the rules.
 * Returns `instant` itself when the merge changes nothing.
 *
 * @example
 * const instant = searchStops(STOP_INDEX, query);
 * const rows = mergeLiveResults(instant, liveMatches);   // same order, extras below
 * const highlighted = findHighlightedIndex(rows, highlightedId);
 */
export const mergeLiveResults = (
  instant: readonly StopRow[],
  live: readonly LiveStopHit[],
  options: MergeLiveOptions = {},
): StopRow[] => {
  const hubs = options.hubs ?? STATION_HUBS;
  const hubKey = (id: string): string => hubs[id]?.hubId ?? id;

  const rows = [...instant];
  const byId = new Map<string, number>();
  const stationByHub = new Map<string, number>();
  rows.forEach((row, position) => {
    if (!byId.has(row.id)) byId.set(row.id, position);
    if (row.kind !== 'station') return;
    for (const key of new Set([hubKey(row.id), row.hubId ?? row.id])) {
      if (!stationByHub.has(key)) stationByHub.set(key, position);
    }
  });

  let changed = false;
  for (const hit of live) {
    const id = liveId(hit);
    if (!id) continue;

    const exact = byId.get(id);
    const position = exact ?? (isBusHit(hit, id) ? undefined : stationByHub.get(hubKey(id)));
    if (position === undefined) {
      const row = rowFromLiveHit(hit, id);
      byId.set(id, rows.length);
      rows.push(row);
      changed = true;
      continue;
    }
    const enriched = enrichRow(rows[position], hit, exact !== undefined);
    if (enriched !== rows[position]) {
      rows[position] = enriched;
      changed = true;
    }
  }
  return changed ? rows : (instant as StopRow[]);
};

/**
 * Position of `highlightedId` in `rows`, so the UI can keep the highlighted row
 * after a merge. Because `mergeLiveResults` never reorders or removes rows, an
 * id that was in the instant list keeps its position. When the id is absent
 * (a new query), returns `fallback` clamped to the list, or `-1` for an empty list.
 */
export const findHighlightedIndex = (
  rows: readonly { id: string }[],
  highlightedId: string | undefined,
  fallback = 0,
): number => {
  if (rows.length === 0) return -1;
  if (highlightedId !== undefined) {
    const position = rows.findIndex((row) => row.id === highlightedId);
    if (position >= 0) return position;
  }
  return Math.min(Math.max(0, fallback), rows.length - 1);
};
