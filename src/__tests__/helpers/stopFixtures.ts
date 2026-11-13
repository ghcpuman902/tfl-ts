import { readFileSync } from 'fs';
import path from 'path';
import type { FetchLike, RawStopPoint } from '../../stops/build';
import { busRowFromStopPoint, encodeStopIndex } from '../../stops/build';
import { createStopIndex } from '../../stops/decode';
import type { StopIndex, StopRow } from '../../stops/types';

/** Trimmed copies of recorded TfL responses (see fixtures/stops). */
export const loadStopFixture = <T = unknown>(name: string): T =>
  JSON.parse(readFileSync(path.join(__dirname, '..', 'fixtures', 'stops', name), 'utf8')) as T;

export const radiusStops = (): RawStopPoint[] =>
  loadStopFixture<{ stopPoints: RawStopPoint[] }>('radius-kx-bus-400m.json').stopPoints;

export type StubResponse = {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
  /** Throw this instead of answering, like a dropped connection. */
  fail?: Error;
};

export type StubCall = { path: string; query: URLSearchParams; at: number };

/**
 * Stub `fetch`. `handler` gets the path and query and answers; every call is
 * recorded with the fake clock reading, and the clock never moves unless
 * `sleep` is awaited, so pacing can be asserted without waiting.
 */
export type StubFetch = {
  fetch: FetchLike;
  calls: StubCall[];
  sleeps: number[];
  now: () => number;
  sleep: (milliseconds: number) => Promise<void>;
};

export const createStubFetch = (
  handler: (path: string, query: URLSearchParams, call: number) => StubResponse,
): StubFetch => {
  const clock = { now: 0 };
  const calls: StubCall[] = [];
  const sleeps: number[] = [];
  const fetchStub: FetchLike = async (url) => {
    const parsed = new URL(url);
    calls.push({ path: parsed.pathname, query: parsed.searchParams, at: clock.now });
    const answer = handler(parsed.pathname, parsed.searchParams, calls.length);
    if (answer.fail) throw answer.fail;
    const status = answer.status ?? 200;
    return {
      ok: status >= 200 && status < 300,
      status,
      statusText: String(status),
      headers: { get: (name) => answer.headers?.[name.toLowerCase()] ?? null },
      json: async () => answer.body,
    };
  };
  return {
    fetch: fetchStub,
    calls,
    sleeps,
    now: (): number => clock.now,
    sleep: async (milliseconds: number): Promise<void> => {
      sleeps.push(milliseconds);
      clock.now += milliseconds;
    },
  };
};

/** A small hand-made station list: enough to test ranking without the full index. */
export const testStationRows = (): StopRow[] => [
  { id: '940GZZLUTWH', name: 'Tower Hill', kind: 'station', lat: 51.50998, lon: -0.07655, lines: ['circle', 'district'], modes: ['tube'] },
  { id: 'HUBTOG', name: 'Tower Gateway', kind: 'station', lat: 51.51062, lon: -0.07481, lines: ['dlr'], modes: ['dlr'] },
  { id: 'HUBKGX', name: "King's Cross & St Pancras International", kind: 'station', lat: 51.53168, lon: -0.12354, lines: ['northern', 'victoria'], modes: ['tube'] },
  { id: '940GZZLUAGL', name: 'Angel', kind: 'station', lat: 51.53224, lon: -0.10575, lines: ['northern'], modes: ['tube'] },
  { id: '910GSVNKNGS', name: 'Seven Kings', kind: 'station', lat: 51.56717, lon: 0.09672, lines: ['elizabeth'], modes: ['elizabeth-line'] },
  { id: '940GZZLUHBT', name: 'Hounslow West', kind: 'station', lat: 51.47337, lon: -0.38546, lines: ['piccadilly'], modes: ['tube'] },
];

/** Bus rows made by the builder's own normaliser from the recorded 400 m lookup. */
export const testBusRows = (): StopRow[] => {
  const rows = radiusStops()
    .map((stop) => busRowFromStopPoint(stop))
    .filter((row): row is StopRow => row !== undefined);
  rows.push(
    { id: '490000254T1', name: 'Tower Hill Station', kind: 'bus', letter: 'A', indicator: 'Stop A', towards: 'Aldgate', lat: 51.50972, lon: -0.07639, lines: ['15', '42'], modes: ['bus'] },
    { id: '490000254T2', name: 'Tower Hill Station', kind: 'bus', letter: 'B', indicator: 'Stop B', lat: 51.5098, lon: -0.0762, lines: ['15'], modes: ['bus'] },
    { id: '490000999X', name: 'Town Hall', kind: 'bus', letter: 'X', indicator: 'Stop X', lat: 51.5, lon: -0.1, lines: ['9'], modes: ['bus'] },
    { id: '490000888Y', name: 'Stowe Road', kind: 'bus', letter: 'Y', indicator: 'Stop Y', lat: 51.51, lon: -0.2, lines: ['9'], modes: ['bus'] },
    { id: '490000777Z', name: 'Théâtre Royal Rd', kind: 'bus', letter: 'Z', indicator: 'Stop Z', lat: 51.52, lon: -0.11, lines: ['9'], modes: ['bus'] },
  );
  return rows;
};

export const buildTestIndex = (): StopIndex =>
  createStopIndex(
    encodeStopIndex([...testStationRows(), ...testBusRows()], { generatedAt: '2026-11-13T00:00:00.000Z' }),
  );
