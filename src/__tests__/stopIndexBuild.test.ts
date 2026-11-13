import { STATION_HUBS } from '../generated/meta/StationHubs';
import {
  StopIndexBuildError,
  buildStopIndex,
  busStopIdsUnder,
  redactKey,
  stationRowsFromSeeds,
  stationSeedsFromGeoJson,
  stationSeedsFromIndex,
} from '../stops/build';
import type { StopIndexBuildEvent } from '../stops/build';
import { createStopIndex } from '../stops/decode';
import type { StationSeed } from '../stops/types';
import { buildTestIndex, createStubFetch, loadStopFixture, radiusStops } from './helpers/stopFixtures';
import type { StubResponse } from './helpers/stopFixtures';
import type { RawStopPoint } from '../stops/build';

const APP_KEY = 'SECRET-KEY-do-not-log-123';

const seeds: StationSeed[] = [
  { id: 'HUBKGX', name: "King's Cross & St Pancras International", lat: 51.53168, lon: -0.12354, lineIds: ['northern', 'victoria'] },
  { id: '940GZZLUTWH', name: 'Tower Hill Underground Station', label: 'Tower Hill', lat: 51.50998, lon: -0.07655, lineIds: ['circle', 'district'] },
];

const stops = radiusStops();
const bareStops = (): RawStopPoint[] =>
  stops.map((stop) => {
    const copy: RawStopPoint = { ...stop };
    delete copy.lines;
    return copy;
  });

/** Bus-listing handler: serves `pages` for /StopPoint/Mode/bus, 404 for anything else. */
const listing =
  (pages: RawStopPoint[][], extra: Record<string, (query: URLSearchParams) => StubResponse> = {}) =>
  (path: string, query: URLSearchParams): StubResponse => {
    if (path === '/StopPoint/Mode/bus') {
      const page = Number(query.get('page'));
      return { body: { stopPoints: pages[page - 1] ?? [], pageSize: 1000, total: 0, page } };
    }
    const handler = extra[path];
    return handler ? handler(query) : { status: 404, body: { message: 'not found' } };
  };

describe('buildStopIndex: bus listing', () => {
  test('walks pages until an empty one, keeps boarding bus stops, and joins the station seed', async () => {
    const stub = createStubFetch(listing([stops.slice(0, 9), stops.slice(9), []]));
    const { data, stats } = await buildStopIndex({
      appKey: APP_KEY,
      stations: seeds,
      fetch: stub.fetch,
      hubBusStops: false,
      sleep: stub.sleep,
      now: stub.now,
      generatedAt: '2026-11-13T00:00:00.000Z',
    });

    expect(stats).toMatchObject({ stations: 2, busStops: stops.length, pages: 3, requests: 3, retries: 0 });
    const index = createStopIndex(data);
    expect(index.stationCount).toBe(2);
    expect(index.size).toBe(2 + stops.length);

    const e = index.byId('490000129E');
    expect(e).toMatchObject({ name: "King's Cross Station", kind: 'bus', letter: 'E', indicator: 'Stop E', towards: 'Angel Islington', modes: ['bus'] });
    expect(e?.lines).toEqual(['205', '214', '30', '73', 'n205', 'n73']);
    expect(e?.lat).toBe(51.5305);
    expect(e?.lon).toBe(-0.12307);
    // Station seed: label wins for the name, modes come from the line sequences.
    expect(index.byId('940GZZLUTWH')).toMatchObject({ name: 'Tower Hill', modes: ['tube'], lines: ['circle', 'district'] });
  });

  test('reads the letter from stopLetter/indicator, never from the id suffix', async () => {
    const stub = createStubFetch(listing([stops, []]));
    const { data } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    const index = createStopIndex(data);
    // 490003087W1 ends in "1" but is painted HA.
    expect(index.byId('490003087W1')?.letter).toBe('HA');
    expect(index.byId('490012149N')?.letter).toBe('HF');
  });

  test('stops on `total`, without asking for a page past the end', async () => {
    const stub = createStubFetch((path, query) => {
      const page = Number(query.get('page'));
      return { body: { stopPoints: page === 1 ? stops.slice(0, 9) : stops.slice(9), pageSize: 9, total: stops.length, page } };
    });
    const { stats } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stats.pages).toBe(2);
    expect(stub.calls.map((call) => call.query.get('page'))).toEqual(['1', '2']);
  });

  test('drops hubs, non-bus stops and stops without coordinates, and dedupes repeats', async () => {
    const noise: RawStopPoint[] = [
      { id: '490G00000001', commonName: 'Some Pair', stopType: 'NaptanOnstreetBusCoachStopPair', modes: ['bus'], lat: 51.5, lon: -0.1 },
      { id: '940GZZCRXYZ', commonName: 'Tram', stopType: 'NaptanTramPlatform', modes: ['tram'], lat: 51.5, lon: -0.1 },
      { id: '490000000A', commonName: 'No Coords', stopType: 'NaptanPublicBusCoachTram', modes: ['bus'] },
      { id: '490000000B', stopType: 'NaptanPublicBusCoachTram', modes: ['bus'], lat: 51.5, lon: -0.1 },
    ];
    const stub = createStubFetch(listing([[...noise, ...stops.slice(0, 3)], [...stops.slice(0, 3), ...stops.slice(3, 5)], []]));
    const { data, stats } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stats.skipped).toBe(4);
    expect(stats.busStops).toBe(5);
    expect(data.id).toEqual(['490000129D', '490000129E', '490000129R', '490004722M', '490012553B']);
  });

  test('a server that ignores `page` does not loop forever', async () => {
    const stub = createStubFetch(() => ({ body: { stopPoints: stops, pageSize: 1000, total: 0, page: 1 } }));
    const { stats } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stats.pages).toBe(2);
    expect(stats.busStops).toBe(stops.length);
  });

  test('accepts a bare array and a 404 past the last page', async () => {
    const stub = createStubFetch((path, query) =>
      Number(query.get('page')) === 1 ? { body: stops } : { status: 404, body: {} },
    );
    const { stats } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stats.busStops).toBe(stops.length);
  });
});

describe('buildStopIndex: routes, hubs', () => {
  const route30 = loadStopFixture('route-30-outbound.json');
  const route73 = loadStopFixture('route-73-inbound.json');
  const routeHandlers: Record<string, () => StubResponse> = {
    '/Line/Mode/bus': (): StubResponse => ({ body: [{ id: '30' }, { id: '73' }] }),
    '/Line/30/Route/Sequence/outbound': (): StubResponse => ({ body: route30 }),
    '/Line/73/Route/Sequence/inbound': (): StubResponse => ({ body: route73 }),
  };

  test('walks route sequences when the listing has no lines, and fills lines, letters and towards', async () => {
    const stub = createStubFetch(listing([bareStops(), []], routeHandlers));
    const { data, stats } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stats.routeSequencesFetched).toBe(2); // the one-way directions answered 404
    const index = createStopIndex(data);
    const euston = index.byId('490000077D'); // only in the route sequence, not the 400 m listing
    expect(euston).toMatchObject({ name: 'Euston Station', letter: 'D' });
    expect(euston?.lines).toEqual(expect.arrayContaining(['30', '73']));
    // A listing stop gains lines from the sequences that serve it.
    expect(index.byId('490000129E')?.lines).toEqual(expect.arrayContaining(['30', '73']));
    expect(index.byId('490000129E')?.towards).toBe('Angel Islington');
  });

  test("'auto' skips route sequences when the listing already has lines; true forces them", async () => {
    const withLines = createStubFetch(listing([stops, []], routeHandlers));
    await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: withLines.fetch, hubBusStops: false, sleep: withLines.sleep, now: withLines.now });
    expect(withLines.calls.some((call) => call.path.startsWith('/Line/'))).toBe(false);

    const forced = createStubFetch(listing([stops, []], routeHandlers));
    await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: forced.fetch, routeSequences: true, hubBusStops: false, sleep: forced.sleep, now: forced.now });
    expect(forced.calls.some((call) => call.path === '/Line/Mode/bus')).toBe(true);

    const never = createStubFetch(listing([bareStops(), []], routeHandlers));
    await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: never.fetch, routeSequences: false, hubBusStops: false, sleep: never.sleep, now: never.now });
    expect(never.calls.some((call) => call.path.startsWith('/Line/'))).toBe(false);
  });

  test('links the bus stops under a hub to it', async () => {
    const hub = loadStopFixture('hub-HUBKGX.json');
    expect(busStopIdsUnder(hub as RawStopPoint).sort()).toEqual(['490001171G', '490001171H', '490001172X', '490012553B']);

    const stub = createStubFetch(listing([stops, []], { '/StopPoint/HUBKGX': () => ({ body: hub }) }));
    const { data, stats } = await buildStopIndex({ appKey: APP_KEY, stations: seeds, fetch: stub.fetch, sleep: stub.sleep, now: stub.now });
    expect(stats.hubsFetched).toBe(1); // only HUB… ids are fetched
    const index = createStopIndex(data);
    expect(index.byId('490001171G')?.hubId).toBe('HUBKGX');
    expect(index.byId('490001172X')?.hubId).toBe('HUBKGX');
    expect(index.byId('490000129E')?.hubId).toBeUndefined(); // the King's Cross Station stops are not under the hub
  });
});

describe('buildStopIndex: transport', () => {
  test('retries 429 honouring Retry-After, and 5xx with backoff', async () => {
    let calls = 0;
    const stub = createStubFetch((path, query) => {
      calls++;
      if (calls === 1) return { status: 429, headers: { 'retry-after': '2' }, body: {} };
      if (calls === 2) return { status: 503, body: {} };
      return { body: { stopPoints: Number(query.get('page')) === 1 ? stops : [], total: 0 } };
    });
    const { stats } = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stats.retries).toBe(2);
    expect(stub.sleeps).toContain(2000);
    expect(stub.sleeps).toContain(1000); // 500 ms * 2^(2-1) after the second failure
    expect(stats.busStops).toBe(stops.length);
  });

  test('retries a dropped connection, then gives up with an error that has no key in it', async () => {
    const stub = createStubFetch((path) => ({
      fail: new Error(`connect ECONNRESET https://api.tfl.gov.uk${path}?page=1&app_key=${APP_KEY}`),
    }));
    const failure = await buildStopIndex({
      appKey: APP_KEY,
      stations: [],
      fetch: stub.fetch,
      maxAttempts: 3,
      sleep: stub.sleep,
      now: stub.now,
    }).catch((error: unknown) => error);

    expect(failure).toBeInstanceOf(StopIndexBuildError);
    const error = failure as StopIndexBuildError;
    expect(stub.calls).toHaveLength(3);
    expect(error.path).toBe('/StopPoint/Mode/bus');
    expect(`${error.message}\n${error.stack}\n${error.path}`).not.toContain(APP_KEY);
    expect(error.message).toContain('[redacted]');
  });

  test('does not retry other 4xx', async () => {
    const stub = createStubFetch(() => ({ status: 401, body: {} }));
    const failure = await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, sleep: stub.sleep, now: stub.now }).catch((error: unknown) => error);
    expect(stub.calls).toHaveLength(1);
    expect(failure).toMatchObject({ name: 'StopIndexBuildError', status: 401 });
    expect((failure as Error).message).not.toContain(APP_KEY);
  });

  test('spaces requests under 500 a minute', async () => {
    const stub = createStubFetch(listing([stops.slice(0, 6), stops.slice(6, 12), stops.slice(12), []]));
    await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: stub.fetch, hubBusStops: false, sleep: stub.sleep, now: stub.now });
    expect(stub.calls).toHaveLength(4);
    for (let i = 1; i < stub.calls.length; i++) {
      expect(stub.calls[i].at - stub.calls[i - 1].at).toBeGreaterThanOrEqual(60_000 / 450 - 1e-9);
    }
    // And a stricter limit paces more slowly.
    const slow = createStubFetch(listing([stops, []]));
    await buildStopIndex({ appKey: APP_KEY, stations: [], fetch: slow.fetch, maxRequestsPerMinute: 60, hubBusStops: false, sleep: slow.sleep, now: slow.now });
    expect(slow.calls[1].at - slow.calls[0].at).toBeGreaterThanOrEqual(1000);
  });

  test('the key goes out as app_key only, and never appears in output, progress or console', async () => {
    const consoleSpies = (['log', 'info', 'warn', 'error', 'debug'] as const).map((method) =>
      jest.spyOn(console, method).mockImplementation(() => undefined),
    );
    const events: StopIndexBuildEvent[] = [];
    const stub = createStubFetch(listing([stops, []], { '/StopPoint/HUBKGX': () => ({ body: loadStopFixture('hub-HUBKGX.json') }) }));
    const { data, stats } = await buildStopIndex({
      appKey: APP_KEY,
      stations: seeds,
      fetch: stub.fetch,
      onProgress: (event) => events.push(event),
      sleep: stub.sleep,
      now: stub.now,
    });

    expect(stub.calls.length).toBeGreaterThan(0);
    for (const call of stub.calls) expect(call.query.get('app_key')).toBe(APP_KEY);
    const visible = JSON.stringify({ data, stats, events });
    expect(visible).not.toContain(APP_KEY);
    expect(events.length).toBeGreaterThan(0);
    for (const spy of consoleSpies) {
      expect(JSON.stringify(spy.mock.calls)).not.toContain(APP_KEY);
      spy.mockRestore();
    }
  });

  test('needs a key', async () => {
    await expect(buildStopIndex({ appKey: '', stations: [] })).rejects.toThrow(/needs appKey/);
  });

  test('redactKey scrubs app_key values and the literal key', () => {
    expect(redactKey('GET /x?app_key=abc123&page=2 failed', 'zzz')).toBe('GET /x?app_key=[redacted]&page=2 failed');
    expect(redactKey('token zzz leaked', 'zzz')).toBe('token [redacted] leaked');
    expect(redactKey('regex chars a.b*c in key', 'a.b*c')).toBe('regex chars [redacted] in key');
  });
});

describe('stations', () => {
  test('rows take the label as name and get modes and hub ids from static metadata', () => {
    const rows = stationRowsFromSeeds([
      { id: '940GZZLUKSX', name: "King's Cross St. Pancras Underground Station", label: "King's Cross St. Pancras", lat: 51.5308, lon: -0.1238, lineIds: ['victoria', 'northern'] },
      { id: '940GZZDLABR', name: 'Abbey Road DLR Station', label: 'Abbey Road', lat: 51.53254, lon: 0.0036, lineIds: ['dlr'] },
    ]);
    expect(rows[0]).toMatchObject({ name: "King's Cross St. Pancras", kind: 'station', lines: ['northern', 'victoria'], hubId: 'HUBKGX' });
    expect(rows[0].modes).toContain('tube');
    expect(rows[1]).toMatchObject({ modes: ['dlr'] });
    expect(rows[1].hubId).toBeUndefined();
    expect(STATION_HUBS['940GZZLUKSX']?.hubId).toBe('HUBKGX');
  });

  test('seeds convert from the website GeoJSON and round-trip through an index', () => {
    const converted = stationSeedsFromGeoJson({
      features: [
        { id: 'HUBABW', properties: { featureId: 'HUBABW', name: 'Abbey Wood', label: 'Abbey Wood', lineIds: ['elizabeth'], zone: null }, geometry: { coordinates: [0.121057, 51.491247] } },
        { id: 'bad', properties: { featureId: 'bad', name: 'No Geometry', lineIds: [] } },
      ],
    });
    expect(converted).toEqual([
      { id: 'HUBABW', name: 'Abbey Wood', label: 'Abbey Wood', lat: 51.491247, lon: 0.121057, lineIds: ['elizabeth'], zone: null },
    ]);

    const index = buildTestIndex();
    const again = stationSeedsFromIndex(index);
    expect(again.map((seed) => seed.id)).toEqual(
      Array.from({ length: index.stationCount }, (_, position) => index.at(position)?.id),
    );
    expect(again.find((seed) => seed.id === 'HUBTOG')).toMatchObject({ name: 'Tower Gateway', lineIds: ['dlr'] });
  });
});
