import { STOP_INDEX_FORMAT } from './types';
import type { StopIndex, StopIndexColumns, StopIndexData, StopRow } from './types';

const COORD_SCALE = 1e5;

/** Undo first-seen coding: `coded = highestSoFar + 1 - index`. */
const decodeFirstSeen = (coded: readonly number[]): Int32Array => {
  const decoded = new Int32Array(coded.length);
  let highest = -1;
  for (let i = 0; i < coded.length; i++) {
    const index = highest + 1 - coded[i];
    decoded[i] = index;
    if (index > highest) highest = index;
  }
  return decoded;
};

/** Undo delta coding. */
const decodeDeltas = (coded: readonly number[]): Int32Array => {
  const decoded = new Int32Array(coded.length);
  let running = 0;
  for (let i = 0; i < coded.length; i++) {
    running += coded[i];
    decoded[i] = running;
  }
  return decoded;
};

/** Decode the relative columns of `data` to absolute values. */
export const decodeStopIndexColumns = (data: StopIndexData): StopIndexColumns => ({
  name: decodeFirstSeen(data.name),
  lineSet: decodeFirstSeen(data.lineSet),
  lat: decodeDeltas(data.dlat),
  lon: decodeDeltas(data.dlon),
});

/** Problems with a `StopIndexData` payload, empty when it is well formed. */
export const validateStopIndexData = (data: StopIndexData): string[] => {
  const problems: string[] = [];
  if (data.format !== STOP_INDEX_FORMAT) {
    problems.push(`format is ${String(data.format)}, expected ${STOP_INDEX_FORMAT}`);
  }
  const size = data.id.length;
  const columns = ['name', 'letter', 'towards', 'dlat', 'dlon', 'lineSet', 'modeMask', 'hub'] as const;
  for (const column of columns) {
    if (data[column].length !== size) {
      problems.push(`column ${column} has ${data[column].length} rows, expected ${size}`);
    }
  }
  if (problems.length > 0) return problems;
  if (data.stationCount < 0 || data.stationCount > size) {
    problems.push(`stationCount ${data.stationCount} is outside 0..${size}`);
  }
  if (data.towardsText[0] !== '') problems.push('towardsText[0] must be the empty string');
  if (data.hubs[0] !== '') problems.push('hubs[0] must be the empty string');
  if (data.modes.length > 30) problems.push('more than 30 modes does not fit the bitmask');

  const decoded = decodeStopIndexColumns(data);
  const seen = new Set<string>();
  for (let row = 0; row < size; row++) {
    const id = data.id[row];
    if (!id) problems.push(`row ${row} has no id`);
    else if (seen.has(id)) problems.push(`duplicate id ${id}`);
    seen.add(id);
    if (!(decoded.name[row] >= 0 && decoded.name[row] < data.names.length)) {
      problems.push(`row ${row} (${id}): name index out of range`);
    }
    if (!(data.towards[row] >= 0 && data.towards[row] < data.towardsText.length)) {
      problems.push(`row ${row} (${id}): towards index out of range`);
    }
    if (!(data.hub[row] >= 0 && data.hub[row] < data.hubs.length)) {
      problems.push(`row ${row} (${id}): hub index out of range`);
    }
    if (!(decoded.lineSet[row] >= 0 && decoded.lineSet[row] < data.lineSets.length)) {
      problems.push(`row ${row} (${id}): lineSet index out of range`);
    }
    if (!Number.isInteger(data.dlat[row]) || !Number.isInteger(data.dlon[row])) {
      problems.push(`row ${row} (${id}): coordinates must be integers (degrees * 1e5)`);
    }
    if (problems.length > 50) {
      problems.push('…stopping after 50 problems');
      return problems;
    }
  }
  for (const set of data.lineSets) {
    for (const lineIx of set) {
      if (!(lineIx >= 0 && lineIx < data.lineIds.length)) {
        problems.push(`lineSet references missing line index ${lineIx}`);
      }
    }
  }
  return problems;
};

/**
 * Wrap `StopIndexData` in a read-only handle. Relative columns are decoded once
 * (a few thousand integer additions); rows are materialised on demand and the
 * id lookup is built on first use.
 */
export const createStopIndex = (data: StopIndexData): StopIndex => {
  const size = data.id.length;
  const columns = decodeStopIndexColumns(data);
  let positions: Map<string, number> | undefined;

  const lookup = (): Map<string, number> => {
    if (!positions) {
      positions = new Map();
      for (let i = 0; i < size; i++) positions.set(data.id[i], i);
    }
    return positions;
  };

  const at = (position: number): StopRow | undefined => {
    if (!Number.isInteger(position) || position < 0 || position >= size) return undefined;
    const letter = data.letter[position];
    const towards = data.towardsText[data.towards[position]];
    const hubId = data.hubs[data.hub[position]];
    const mask = data.modeMask[position];
    const modes: string[] = [];
    for (let bit = 0; bit < data.modes.length; bit++) {
      if (mask & (1 << bit)) modes.push(data.modes[bit]);
    }
    const indicator =
      data.indicators[position] ?? (letter ? `Stop ${letter}` : undefined);
    const row: StopRow = {
      id: data.id[position],
      name: data.names[columns.name[position]],
      kind: position < data.stationCount ? 'station' : 'bus',
      lat: columns.lat[position] / COORD_SCALE,
      lon: columns.lon[position] / COORD_SCALE,
      lines: data.lineSets[columns.lineSet[position]].map((ix) => data.lineIds[ix]),
      modes,
    };
    if (letter) row.letter = letter;
    if (indicator) row.indicator = indicator;
    if (towards) row.towards = towards;
    if (hubId) row.hubId = hubId;
    return row;
  };

  return {
    format: data.format,
    generatedAt: data.generatedAt,
    size,
    stationCount: data.stationCount,
    at,
    indexOf: (id): number => lookup().get(id) ?? -1,
    byId: (id): StopRow | undefined => {
      const position = lookup().get(id);
      return position === undefined ? undefined : at(position);
    },
    *[Symbol.iterator](): IterableIterator<StopRow> {
      for (let i = 0; i < size; i++) yield at(i) as StopRow;
    },
    data,
    columns,
  };
};
