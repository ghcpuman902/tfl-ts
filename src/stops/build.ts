/**
 * Build the static stop index from the TfL API. Node-side tooling, exposed as
 * `tfl-ts/meta/stops/build`; the runtime entry `tfl-ts/meta/stops` never imports it.
 *
 * ```ts
 * import { buildStopIndex, stationSeedsFromIndex } from 'tfl-ts/meta/stops/build';
 * import { STOP_INDEX } from 'tfl-ts/meta/stops';
 *
 * const { data } = await buildStopIndex({
 *   appKey: process.env.TFL_APP_KEY!,
 *   stations: stationSeedsFromIndex(STOP_INDEX), // stations are not fetched
 * });
 * ```
 *
 * ## What it fetches, and why
 *
 * - **Bus stops: `GET /StopPoint/Mode/bus?page=N`.** The one endpoint that lists
 *   every bus stop (1000 per page, about 20 pages, so about 20 requests). The
 *   alternative, `/StopPoint/Type/NaptanPublicBusCoachTram`, is unpaged in the
 *   spec and would be one huge response. Boarding stops only: hub and stop-pair
 *   ids (`490G…`) carry no arrivals and are dropped.
 * - **Route sequences, only when needed.** If the paged listing leaves most stops
 *   without `lines`, `/Line/{id}/Route/Sequence/{direction}` is walked for every
 *   bus route (about 1400 requests, a few minutes at the rate limit). Each stop
 *   there carries the full set of routes that serve it, its painted letter and
 *   its `towards`.
 * - **Hub bus stops: `GET /StopPoint/{HUB…}`**, once per hub in the station seed,
 *   to link the bus stops at an interchange to it (`hubId`).
 * - **Stations are not fetched.** They come from the seed you pass in (see
 *   `StationSeed`), enriched from the bundled `STATION_HUBS` and line sequences.
 *
 * ## Credentials
 *
 * `appKey` is sent as the `app_key` query parameter, like the rest of the
 * library. It is never logged: progress events and errors carry the request
 * path without its query string, and any other message is scrubbed of the key.
 * Requests are spaced to stay under the 500 per minute limit and retried with
 * backoff on 408, 429 and 5xx.
 */

import { LINE_STATION_SEQUENCES } from '../generated/meta/StationSequence';
import { STATION_HUBS } from '../generated/meta/StationHubs';
import {
  isBoardableBusStopId,
  readAdditionalProperty,
  readStopLetter,
  usableText,
} from '../utils/busStopSearch';
import { encodeStopIndex } from './encode';
import type { StationSeed, StopIndex, StopIndexData, StopRow } from './types';

export { encodeStopIndex } from './encode';
export type { EncodeStopIndexOptions } from './encode';

const DEFAULT_BASE_URL = 'https://api.tfl.gov.uk';
const DEFAULT_MAX_REQUESTS_PER_MINUTE = 450; // headroom under TfL's 500
const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_MAX_PAGES = 100;
/** Fraction of bus stops that must have `lines` before route sequences are skipped. */
const MIN_LINE_COVERAGE = 0.5;
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);
const BUS_STOP_TYPE = 'NaptanPublicBusCoachTram';

/** The part of `fetch` the builder uses. The global `fetch` fits. */
export type FetchLike = (
  url: string,
  init?: { headers?: Record<string, string> },
) => Promise<{
  ok: boolean;
  status: number;
  statusText?: string;
  headers: { get(name: string): string | null };
  json(): Promise<unknown>;
}>;

export type StopIndexBuildPhase = 'bus-pages' | 'route-sequences' | 'hub-stops';

export interface StopIndexBuildEvent {
  phase: StopIndexBuildPhase;
  /** Items done so far in this phase. */
  done: number;
  /** Items expected, when known. */
  total?: number;
}

export interface BuildStopIndexOptions {
  /** TfL primary key. Required, and never logged. */
  appKey: string;
  /** Stations to seed the index with. Required: stations are not fetched. */
  stations: readonly StationSeed[];
  /** Defaults to global `fetch`. Inject a stub in tests. */
  fetch?: FetchLike;
  /** Default `https://api.tfl.gov.uk`. */
  baseUrl?: string;
  /** Default 450. */
  maxRequestsPerMinute?: number;
  /** Attempts per request including the first. Default 5. */
  maxAttempts?: number;
  /** Safety stop for the paged bus listing. Default 100. */
  maxPages?: number;
  /**
   * `'auto'` (default) walks route sequences only when the paged listing leaves
   * under half of the bus stops without `lines`. `true` always walks them
   * (about 1400 requests); `false` never does.
   */
  routeSequences?: 'auto' | boolean;
  /** Fetch each `HUB…` once to link its bus stops. Default true. */
  hubBusStops?: boolean;
  /** Hub table for station rows. Defaults to the bundled `STATION_HUBS`. */
  hubs?: Readonly<Record<string, { hubId?: string; members?: ReadonlyArray<{ modes: readonly string[] }> }>>;
  /** Stamp stored in the snapshot. Defaults to now. */
  generatedAt?: string;
  /** Progress without URLs or keys. */
  onProgress?: (event: StopIndexBuildEvent) => void;
  /** Test seams. */
  sleep?: (milliseconds: number) => Promise<void>;
  now?: () => number;
}

export interface StopIndexBuildStats {
  stations: number;
  busStops: number;
  /** Listing pages fetched. */
  pages: number;
  routeSequencesFetched: number;
  hubsFetched: number;
  requests: number;
  retries: number;
  /** Bus listing entries skipped (not boarding stops, or no coordinates). */
  skipped: number;
}

export interface StopIndexBuildResult {
  data: StopIndexData;
  stats: StopIndexBuildStats;
}

export class StopIndexBuildError extends Error {
  /** Request path without query string. */
  readonly path: string;
  readonly status?: number;
  constructor(message: string, path: string, status?: number) {
    super(message);
    this.name = 'StopIndexBuildError';
    this.path = path;
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Transport: pacing, retry, redaction
// ---------------------------------------------------------------------------

const defaultSleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const escapeForRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Remove the key (and any `app_key=` value) from text that may reach a log. */
export const redactKey = (text: string, appKey: string): string => {
  let clean = text.replace(/(app_key=)[^&\s"']*/gi, '$1[redacted]');
  if (appKey) clean = clean.replace(new RegExp(escapeForRegExp(appKey), 'g'), '[redacted]');
  return clean;
};

type Transport = {
  getJson<T>(path: string, query?: Record<string, string>): Promise<T>;
  counters: { requests: number; retries: number };
};

const createTransport = (options: BuildStopIndexOptions): Transport => {
  const fetchImpl = options.fetch ?? (globalThis.fetch as unknown as FetchLike | undefined);
  if (!fetchImpl) throw new Error('No fetch available: pass options.fetch');
  const baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
  const sleep = options.sleep ?? defaultSleep;
  const now = options.now ?? Date.now;
  const maxAttempts = Math.max(1, options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  const gap = 60_000 / Math.max(1, options.maxRequestsPerMinute ?? DEFAULT_MAX_REQUESTS_PER_MINUTE);
  const counters = { requests: 0, retries: 0 };
  let nextSlot = 0;

  const waitForSlot = async (): Promise<void> => {
    const current = now();
    const start = Math.max(current, nextSlot);
    nextSlot = start + gap;
    if (start > current) await sleep(start - current);
  };

  const getJson = async <T>(path: string, query: Record<string, string> = {}): Promise<T> => {
    const params = new URLSearchParams(query);
    params.set('app_key', options.appKey);
    const url = `${baseUrl}${path}?${params.toString()}`;

    let lastFailure = 'unknown error';
    let lastStatus: number | undefined;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await waitForSlot();
      counters.requests++;
      let retryAfterMs: number | undefined;
      try {
        const response = await fetchImpl(url, { headers: { accept: 'application/json' } });
        if (response.ok) return (await response.json()) as T;
        lastStatus = response.status;
        lastFailure = `HTTP ${response.status}`;
        if (!RETRYABLE_STATUS.has(response.status)) {
          throw new StopIndexBuildError(`TfL request failed: ${path} → ${lastFailure}`, path, response.status);
        }
        const retryAfter = Number(response.headers.get('retry-after'));
        if (Number.isFinite(retryAfter) && retryAfter > 0) retryAfterMs = Math.min(retryAfter, 60) * 1000;
      } catch (error) {
        if (error instanceof StopIndexBuildError) throw error;
        lastStatus = undefined;
        lastFailure = redactKey(error instanceof Error ? error.message : String(error), options.appKey);
      }
      if (attempt < maxAttempts) {
        counters.retries++;
        await sleep(retryAfterMs ?? Math.min(30_000, 500 * 2 ** (attempt - 1)));
      }
    }
    throw new StopIndexBuildError(
      `TfL request failed after ${maxAttempts} attempts: ${path} → ${lastFailure}`,
      path,
      lastStatus,
    );
  };

  return { getJson, counters };
};

// ---------------------------------------------------------------------------
// Raw TfL shapes (only what is read)
// ---------------------------------------------------------------------------

type RawIdentifier = { id?: string; name?: string };

export type RawStopPoint = {
  id?: string;
  naptanId?: string;
  commonName?: string;
  name?: string;
  stopType?: string;
  indicator?: string;
  stopLetter?: string;
  towards?: string;
  lat?: number;
  lon?: number;
  modes?: string[];
  lines?: RawIdentifier[];
  hubNaptanCode?: string;
  additionalProperties?: Array<{ key?: string; value?: string }>;
  children?: RawStopPoint[];
};

type RawStopPointsResponse = { stopPoints?: RawStopPoint[]; pageSize?: number; total?: number; page?: number };

type RawRouteSequence = {
  lineId?: string;
  stopPointSequences?: Array<{ stopPoint?: RawStopPoint[] }>;
  stations?: RawStopPoint[];
};

const rawId = (stop: RawStopPoint): string | undefined => usableText(stop.id ?? stop.naptanId);

const isBoardingBusStop = (stop: RawStopPoint): boolean => {
  const id = rawId(stop);
  if (!id) return false;
  if (!stop.modes?.includes('bus')) return false;
  if (stop.stopType) return stop.stopType === BUS_STOP_TYPE;
  return isBoardableBusStopId(id);
};

const sortedUnique = (values: Iterable<string>): string[] => [...new Set(values)].sort();

const lineIdsOf = (lines?: RawIdentifier[]): string[] =>
  sortedUnique((lines ?? []).map((line) => line.id ?? line.name).filter((id): id is string => Boolean(id)));

/** Bus row from a TfL StopPoint, or `undefined` when it is not a usable boarding stop. */
export const busRowFromStopPoint = (raw: RawStopPoint): StopRow | undefined => {
  if (!isBoardingBusStop(raw)) return undefined;
  const id = rawId(raw) as string;
  if (typeof raw.lat !== 'number' || typeof raw.lon !== 'number') return undefined;
  const name = usableText(raw.commonName ?? raw.name);
  if (!name) return undefined;
  const letter = readStopLetter(raw.stopLetter, raw.indicator);
  const indicator = usableText(raw.indicator);
  const towards = usableText(raw.towards) ?? readAdditionalProperty(raw.additionalProperties, 'towards');
  const hubCode = usableText(raw.hubNaptanCode);
  const row: StopRow = {
    id,
    name,
    kind: 'bus',
    lat: raw.lat,
    lon: raw.lon,
    lines: lineIdsOf(raw.lines),
    modes: sortedUnique(raw.modes ?? []),
  };
  if (letter) row.letter = letter;
  if (indicator) row.indicator = indicator;
  if (towards) row.towards = towards;
  if (hubCode && hubCode !== id) row.hubId = hubCode;
  return row;
};

// ---------------------------------------------------------------------------
// Stations
// ---------------------------------------------------------------------------

const lineModes = (): Map<string, string> => {
  const modes = new Map<string, string>();
  for (const sequence of Object.values(LINE_STATION_SEQUENCES)) {
    modes.set(sequence.lineId, sequence.modeName);
  }
  return modes;
};

const modeFromId = (id: string): string | undefined => {
  if (id.startsWith('940GZZLU')) return 'tube';
  if (id.startsWith('940GZZDL')) return 'dlr';
  if (id.startsWith('940GZZCR')) return 'tram';
  if (id.startsWith('910G')) return 'overground';
  return undefined;
};

/** Station rows from the seed, with modes and hub ids from static metadata. */
export const stationRowsFromSeeds = (
  seeds: readonly StationSeed[],
  hubs: BuildStopIndexOptions['hubs'] = STATION_HUBS,
): StopRow[] => {
  const modeOfLine = lineModes();
  return seeds.map((seed) => {
    const lines = sortedUnique(seed.lineIds);
    const modes = new Set<string>();
    for (const line of lines) {
      const mode = modeOfLine.get(line);
      if (mode) modes.add(mode);
    }
    const hub = hubs?.[seed.id];
    for (const member of hub?.members ?? []) {
      for (const mode of member.modes) modes.add(mode);
    }
    if (modes.size === 0) {
      const guessed = modeFromId(seed.id);
      if (guessed) modes.add(guessed);
    }
    const row: StopRow = {
      id: seed.id,
      name: usableText(seed.label) ?? seed.name,
      kind: 'station',
      lat: seed.lat,
      lon: seed.lon,
      lines,
      modes: sortedUnique(modes),
    };
    if (hub?.hubId && hub.hubId !== seed.id) row.hubId = hub.hubId;
    return row;
  });
};

/** GeoJSON station collection (the website's `all-stations.json`) → seeds. */
export const stationSeedsFromGeoJson = (collection: {
  features: ReadonlyArray<{
    id?: string | number;
    properties?: {
      featureId?: string;
      name?: string;
      label?: string;
      lineIds?: string[];
      zone?: string | null;
    };
    geometry?: { coordinates?: number[] };
  }>;
}): StationSeed[] =>
  collection.features.flatMap((feature) => {
    const properties = feature.properties ?? {};
    const id = properties.featureId ?? (feature.id === undefined ? undefined : String(feature.id));
    const [lon, lat] = feature.geometry?.coordinates ?? [];
    if (!id || !properties.name || typeof lat !== 'number' || typeof lon !== 'number') return [];
    return [
      {
        id,
        name: properties.name,
        label: properties.label,
        lat,
        lon,
        lineIds: properties.lineIds ?? [],
        zone: properties.zone,
      },
    ];
  });

/** Seeds from an existing index, so a refresh keeps the same stations. */
export const stationSeedsFromIndex = (index: StopIndex): StationSeed[] => {
  const seeds: StationSeed[] = [];
  for (let position = 0; position < index.stationCount; position++) {
    const row = index.at(position) as StopRow;
    seeds.push({
      id: row.id,
      name: row.name,
      lat: row.lat as number,
      lon: row.lon as number,
      lineIds: row.lines,
    });
  }
  return seeds;
};

// ---------------------------------------------------------------------------
// Bus stops
// ---------------------------------------------------------------------------

/** Fill gaps in `row` from `from`. Lines are unioned. */
const mergeBusRow = (row: StopRow, from: StopRow): StopRow => {
  const lines = sortedUnique([...row.lines, ...from.lines]);
  return {
    ...from,
    ...row,
    letter: row.letter ?? from.letter,
    indicator: row.indicator ?? from.indicator,
    towards: row.towards ?? from.towards,
    hubId: row.hubId ?? from.hubId,
    lines,
    modes: sortedUnique([...row.modes, ...from.modes]),
  };
};

const stripUndefined = (row: StopRow): StopRow => {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(row)) if (value !== undefined) clean[key] = value;
  return clean as unknown as StopRow;
};

const fetchBusListing = async (
  transport: Transport,
  options: BuildStopIndexOptions,
  stats: StopIndexBuildStats,
): Promise<Map<string, StopRow>> => {
  const rows = new Map<string, StopRow>();
  const maxPages = options.maxPages ?? DEFAULT_MAX_PAGES;
  let previousFirstId: string | undefined;
  let expectedTotal = 0;
  let listed = 0;

  for (let page = 1; page <= maxPages; page++) {
    let payload: RawStopPointsResponse | RawStopPoint[];
    try {
      payload = await transport.getJson<RawStopPointsResponse | RawStopPoint[]>('/StopPoint/Mode/bus', {
        page: String(page),
      });
    } catch (error) {
      // Past the last page some deployments answer 404 instead of an empty list.
      if (page > 1 && error instanceof StopIndexBuildError && error.status === 404) break;
      throw error;
    }
    stats.pages++;
    const stopPoints = Array.isArray(payload) ? payload : (payload.stopPoints ?? []);
    if (!Array.isArray(payload) && typeof payload.total === 'number') {
      expectedTotal = Math.max(expectedTotal, payload.total);
    }
    options.onProgress?.({ phase: 'bus-pages', done: page, total: expectedTotal > 0 ? Math.ceil(expectedTotal / 1000) : undefined });
    if (stopPoints.length === 0) break;

    const firstId = rawId(stopPoints[0]);
    if (firstId !== undefined && firstId === previousFirstId) break; // page parameter ignored
    previousFirstId = firstId;

    for (const stop of stopPoints) {
      const row = busRowFromStopPoint(stop);
      if (!row) {
        stats.skipped++;
        continue;
      }
      const existing = rows.get(row.id);
      rows.set(row.id, existing ? mergeBusRow(existing, row) : row);
    }
    listed += stopPoints.length;
    // `total` is 0 on some responses, so an empty page (or a 404) also ends the walk.
    if (expectedTotal > 0 && listed >= expectedTotal) break;
  }
  return rows;
};

const collectRouteStops = (sequence: RawRouteSequence): RawStopPoint[] => [
  ...(sequence.stopPointSequences ?? []).flatMap((entry) => entry.stopPoint ?? []),
  ...(sequence.stations ?? []),
];

const fetchRouteSequences = async (
  transport: Transport,
  options: BuildStopIndexOptions,
  rows: Map<string, StopRow>,
  stats: StopIndexBuildStats,
): Promise<void> => {
  const lines = await transport.getJson<RawIdentifier[]>('/Line/Mode/bus');
  const lineIds = sortedUnique(lines.map((line) => line.id).filter((id): id is string => Boolean(id)));
  const total = lineIds.length * 2;
  let done = 0;

  for (const lineId of lineIds) {
    for (const direction of ['inbound', 'outbound']) {
      let sequence: RawRouteSequence | undefined;
      try {
        sequence = await transport.getJson<RawRouteSequence>(
          `/Line/${encodeURIComponent(lineId)}/Route/Sequence/${direction}`,
        );
      } catch (error) {
        // Some routes run one way only and answer 404 for the other direction.
        if (!(error instanceof StopIndexBuildError && error.status === 404)) throw error;
      }
      done++;
      options.onProgress?.({ phase: 'route-sequences', done, total });
      if (!sequence) continue;
      stats.routeSequencesFetched++;
      for (const stop of collectRouteStops(sequence)) {
        const row = busRowFromStopPoint(stop);
        if (!row) continue;
        row.lines = sortedUnique([...row.lines, lineId]);
        const existing = rows.get(row.id);
        rows.set(row.id, existing ? mergeBusRow(existing, row) : row);
      }
    }
  }
};

/**
 * Boarding bus stop ids below a hub payload, any depth. Station entrances also
 * start with `490` (`4900KNGX1`), so the stop type decides, not the id.
 */
export const busStopIdsUnder = (stop: RawStopPoint): string[] => {
  const ids: string[] = [];
  const walk = (node: RawStopPoint): void => {
    const id = rawId(node);
    if (id && node.stopType === BUS_STOP_TYPE) ids.push(id);
    for (const child of node.children ?? []) walk(child);
  };
  walk(stop);
  return ids;
};

const fetchHubBusStops = async (
  transport: Transport,
  options: BuildStopIndexOptions,
  hubIds: readonly string[],
  rows: Map<string, StopRow>,
  stats: StopIndexBuildStats,
): Promise<void> => {
  let done = 0;
  for (const hubId of hubIds) {
    let payload: RawStopPoint | RawStopPoint[] | undefined;
    try {
      payload = await transport.getJson<RawStopPoint | RawStopPoint[]>(`/StopPoint/${encodeURIComponent(hubId)}`);
    } catch (error) {
      if (!(error instanceof StopIndexBuildError && error.status === 404)) throw error;
    }
    done++;
    options.onProgress?.({ phase: 'hub-stops', done, total: hubIds.length });
    if (!payload) continue;
    stats.hubsFetched++;
    const root = Array.isArray(payload) ? payload[0] : payload;
    if (!root) continue;
    for (const busId of busStopIdsUnder(root)) {
      const row = rows.get(busId);
      if (row && !row.hubId) rows.set(busId, { ...row, hubId });
    }
  }
};

// ---------------------------------------------------------------------------
// Public entry
// ---------------------------------------------------------------------------

/**
 * Fetch TfL bus stops, join them with the station seed and return the encoded
 * index plus build stats. Pure of the filesystem; the caller writes the result
 * (see `script/generateStops.ts`).
 *
 * @example
 * const { data, stats } = await buildStopIndex({ appKey, stations });
 * const index = createStopIndex(data); // from 'tfl-ts/meta/stops'
 */
export const buildStopIndex = async (options: BuildStopIndexOptions): Promise<StopIndexBuildResult> => {
  if (!options.appKey) {
    throw new Error('buildStopIndex needs appKey (TFL_APP_KEY from https://api-portal.tfl.gov.uk/)');
  }
  const transport = createTransport(options);
  const stats: StopIndexBuildStats = {
    stations: 0,
    busStops: 0,
    pages: 0,
    routeSequencesFetched: 0,
    hubsFetched: 0,
    requests: 0,
    retries: 0,
    skipped: 0,
  };

  const stationRows = stationRowsFromSeeds(options.stations, options.hubs ?? STATION_HUBS);
  const busRows = await fetchBusListing(transport, options, stats);

  const withLines = [...busRows.values()].filter((row) => row.lines.length > 0).length;
  const coverage = busRows.size === 0 ? 0 : withLines / busRows.size;
  const walkRoutes =
    options.routeSequences === true || (options.routeSequences !== false && coverage < MIN_LINE_COVERAGE);
  if (walkRoutes) await fetchRouteSequences(transport, options, busRows, stats);

  if (options.hubBusStops !== false) {
    const hubIds = stationRows.map((row) => row.id).filter((id) => id.startsWith('HUB'));
    await fetchHubBusStops(transport, options, hubIds, busRows, stats);
  }

  const rows = [...stationRows, ...[...busRows.values()].map(stripUndefined)];
  stats.stations = stationRows.length;
  stats.busStops = busRows.size;
  stats.requests = transport.counters.requests;
  stats.retries = transport.counters.retries;
  return { data: encodeStopIndex(rows, { generatedAt: options.generatedAt }), stats };
};
