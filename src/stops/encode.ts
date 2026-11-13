import { STOP_INDEX_FORMAT } from './types';
import type { StopIndexData, StopRow } from './types';

const COORD_SCALE = 1e5;

export interface EncodeStopIndexOptions {
  /** ISO timestamp stored in the snapshot. Defaults to now. */
  generatedAt?: string;
}

const compareIds = (a: StopRow, b: StopRow): number =>
  a.id < b.id ? -1 : a.id > b.id ? 1 : 0;

/** Intern `value` in `table` and return its position. */
const intern = (table: Map<string, number>, value: string): number => {
  const existing = table.get(value);
  if (existing !== undefined) return existing;
  const position = table.size;
  table.set(value, position);
  return position;
};

/**
 * Encode rows into the columnar `tfl-stop-index/1` format.
 *
 * Stations come first, then bus stops, each sorted by id, so equal input always
 * gives equal output. Throws on a duplicate id or a row without coordinates.
 * Coordinates are rounded to 5 decimal places.
 */
export const encodeStopIndex = (
  rows: readonly StopRow[],
  options: EncodeStopIndexOptions = {},
): StopIndexData => {
  const seen = new Set<string>();
  for (const row of rows) {
    if (seen.has(row.id)) throw new Error(`Duplicate stop id ${row.id}`);
    seen.add(row.id);
    if (typeof row.lat !== 'number' || typeof row.lon !== 'number') {
      throw new Error(`Stop ${row.id} has no coordinates`);
    }
  }

  const stations = rows.filter((row) => row.kind === 'station').sort(compareIds);
  const buses = rows.filter((row) => row.kind === 'bus').sort(compareIds);
  const ordered = [...stations, ...buses];

  const modeNames = [...new Set(ordered.flatMap((row) => row.modes))].sort();
  if (modeNames.length > 30) {
    throw new Error(`Too many distinct modes (${modeNames.length}) for the bitmask`);
  }
  const modeBit = new Map(modeNames.map((mode, bit) => [mode, bit]));
  const lineIds = [...new Set(ordered.flatMap((row) => row.lines))].sort();
  const lineIx = new Map(lineIds.map((id, position) => [id, position]));

  const names = new Map<string, number>();
  const towardsText = new Map<string, number>([['', 0]]);
  const hubs = new Map<string, number>([['', 0]]);
  const lineSets = new Map<string, number>();
  const lineSetList: number[][] = [];

  const data: StopIndexData = {
    format: STOP_INDEX_FORMAT,
    generatedAt: options.generatedAt ?? new Date().toISOString(),
    stationCount: stations.length,
    names: [],
    towardsText: [],
    lineIds,
    modes: modeNames,
    hubs: [],
    lineSets: lineSetList,
    id: [],
    name: [],
    letter: [],
    towards: [],
    lat: [],
    lon: [],
    lineSet: [],
    modeMask: [],
    hub: [],
    indicators: {},
  };

  ordered.forEach((row, position) => {
    data.id.push(row.id);
    data.name.push(intern(names, row.name));
    data.letter.push(row.letter ?? '');
    data.towards.push(row.towards ? intern(towardsText, row.towards) : 0);
    data.lat.push(Math.round((row.lat as number) * COORD_SCALE));
    data.lon.push(Math.round((row.lon as number) * COORD_SCALE));

    const lineSetIndexes = [
      ...new Set(row.lines.map((line) => lineIx.get(line) as number)),
    ].sort((a, b) => a - b);
    const key = lineSetIndexes.join(',');
    let lineSetAt = lineSets.get(key);
    if (lineSetAt === undefined) {
      lineSetAt = lineSetList.length;
      lineSets.set(key, lineSetAt);
      lineSetList.push(lineSetIndexes);
    }
    data.lineSet.push(lineSetAt);

    let mask = 0;
    for (const mode of row.modes) mask |= 1 << (modeBit.get(mode) as number);
    data.modeMask.push(mask);

    data.hub.push(row.hubId ? intern(hubs, row.hubId) : 0);

    const standard = row.letter ? `Stop ${row.letter}` : undefined;
    if (row.indicator && row.indicator !== standard) {
      data.indicators[position] = row.indicator;
    }
  });

  data.names = [...names.keys()];
  data.towardsText = [...towardsText.keys()];
  data.hubs = [...hubs.keys()];
  return data;
};
