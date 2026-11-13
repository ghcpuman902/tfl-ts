/**
 * Static stop index: types and the on-disk format.
 *
 * One compact index holds every station (tube, DLR, Overground, Elizabeth line,
 * tram, hubs) and every London bus stop, so one search covers both. Bundled data
 * lives in `src/generated/stops/StopIndex.ts` and is rebuilt with
 * `pnpm run generate -- --only=stops`.
 *
 * ## On-disk format (`tfl-stop-index/1`)
 *
 * Columnar: one array per field, all of length `size`. Row `i` is
 * `{ id[i], names[name[i]], letter[i], ... }`. Strings that repeat (names,
 * `towards`, line ids, hub ids) are interned once and referenced by number, and
 * identical line sets are interned too, because bus stops on the same street
 * share them. Coordinates are `degrees * 1e5` rounded to integers (5 decimal
 * places, about a metre). Rows are sorted by `id`, stations first, so the output
 * is deterministic and diffs stay small.
 *
 * | column      | type       | meaning                                                         |
 * |-------------|------------|-----------------------------------------------------------------|
 * | `id`        | string[]   | NaPTAN / hub id, e.g. `490000129E`, `940GZZLUKSX`, `HUBKGX`      |
 * | `name`      | number[]   | index into `names`                                              |
 * | `letter`    | string[]   | painted stop letter (`'E'`, `'HA'`), `''` for none              |
 * | `towards`   | number[]   | index into `towardsText`, `0` = none (`towardsText[0] === ''`)  |
 * | `lat`,`lon` | number[]   | degrees * 1e5                                                   |
 * | `lineSet`   | number[]   | index into `lineSets` (each a sorted list of indexes `lineIds`) |
 * | `modeMask`  | number[]   | bitmask over `modes` (bit i = `modes[i]`)                       |
 * | `hub`       | number[]   | index into `hubs`, `0` = none (`hubs[0] === ''`)                |
 * | `indicators`| object     | sparse: row index → raw TfL indicator when it is not `Stop <letter>` |
 *
 * `stationCount` rows at the front are stations (`kind: 'station'`); the rest are
 * bus stops (`kind: 'bus'`).
 *
 * The letter is the painted letter TfL reports in `stopLetter` / `indicator`
 * (`Stop E`). It is never read from the NaPTAN id suffix (`490003087W1` is
 * painted `HA`) and it is not a compass point.
 */

export const STOP_INDEX_FORMAT = 'tfl-stop-index/1' as const;

export type StopKind = 'station' | 'bus';

/** One row: an index entry, a search hit, or a row appended from a live TfL hit. */
export interface StopRow {
  /** NaPTAN id, or a hub id such as `HUBKGX`. */
  id: string;
  name: string;
  kind: StopKind;
  /** Painted stop letter such as `E`. Bus stops only. */
  letter?: string;
  /** Raw TfL indicator, e.g. `Stop E`. */
  indicator?: string;
  /** Where the stop's buses head, e.g. `Angel Islington`. */
  towards?: string;
  /** Degrees, 5 dp. Always set on index rows; may be missing on live-only rows. */
  lat?: number;
  lon?: number;
  /** Line / route ids serving the row (`'victoria'`, `'73'`, `'n73'`), sorted. */
  lines: readonly string[];
  /** Mode names (`'tube'`, `'bus'`), sorted. */
  modes: readonly string[];
  /** The interchange this row belongs to, when it is not the interchange itself. */
  hubId?: string;
  /** Metres from the `near` point of a search. Only set by `searchStops` with `near`. */
  distance?: number;
  /** Set by `mergeLiveResults` on rows that came from live TfL hits only. */
  liveOnly?: true;
}

export interface StopIndexData {
  format: typeof STOP_INDEX_FORMAT;
  generatedAt: string;
  /** Rows `[0, stationCount)` are stations; the rest are bus stops. */
  stationCount: number;
  names: string[];
  towardsText: string[];
  lineIds: string[];
  modes: string[];
  hubs: string[];
  lineSets: number[][];
  id: string[];
  name: number[];
  letter: string[];
  towards: number[];
  lat: number[];
  lon: number[];
  lineSet: number[];
  modeMask: number[];
  hub: number[];
  indicators: Record<string, string>;
}

/** Read-only handle over `StopIndexData`. Rows are materialised on demand. */
export interface StopIndex {
  readonly format: typeof STOP_INDEX_FORMAT;
  readonly generatedAt: string;
  readonly size: number;
  readonly stationCount: number;
  /** Row at position `position`, or `undefined` out of range. */
  at(position: number): StopRow | undefined;
  /** Position of `id`, or `-1`. */
  indexOf(id: string): number;
  byId(id: string): StopRow | undefined;
  /** Iterate every row in index order. */
  [Symbol.iterator](): IterableIterator<StopRow>;
  /** @internal Search internals: raw columns and lazily folded names. */
  readonly data: StopIndexData;
}

/** A station to seed the index with. The builder does not fetch stations. */
export interface StationSeed {
  id: string;
  /** TfL common name, e.g. `Tower Hill Underground Station`. */
  name: string;
  /** Short display name, e.g. `Tower Hill`. Used as the row name when present. */
  label?: string;
  lat: number;
  lon: number;
  lineIds: readonly string[];
  zone?: string | null;
}

/** A live TfL hit (StopPoint search match or StopPoint object) for `mergeLiveResults`. */
export interface LiveStopHit {
  id?: string;
  naptanId?: string;
  name?: string;
  commonName?: string;
  stationName?: string;
  indicator?: string;
  stopLetter?: string;
  platformName?: string;
  towards?: string;
  lat?: number;
  lon?: number;
  modes?: readonly string[];
  lines?: ReadonlyArray<string | { id?: string; name?: string }>;
  hubNaptanCode?: string;
  additionalProperties?: ReadonlyArray<{ key?: string; value?: string }>;
}
