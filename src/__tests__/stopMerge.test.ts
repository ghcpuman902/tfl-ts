import { STATION_HUBS } from '../generated/meta/StationHubs';
import type { ExtendedSearchResponse } from '../stopPoint';
import type { LiveStopHit, StopRow } from '../stops/types';
import { findHighlightedIndex, mergeLiveResults } from '../utils/stopMerge';
import { searchStops } from '../utils/stopSearch';
import { buildTestIndex, loadStopFixture } from './helpers/stopFixtures';

const index = buildTestIndex();
const deepFreeze = <T>(rows: T[]): T[] => {
  rows.forEach((row) => Object.freeze(row));
  return Object.freeze(rows) as T[];
};
const instantFor = (query: string): StopRow[] => deepFreeze(searchStops(index, query, { limit: 50 }));

const liveHits: LiveStopHit[] = [
  // Same id as an instant row: Tower Hill Station stop B had no `towards`.
  { id: '490000254T2', name: 'Tower Hill Station', modes: ['bus'], lines: [{ id: '15' }, { id: 'n15' }], towards: 'Blackwall', lat: 99, lon: 99 },
  // A child of the King's Cross hub: enriches the HUBKGX row, is not appended.
  { id: '940GZZLUKSX', name: "King's Cross St. Pancras Underground Station", modes: ['tube', 'national-rail'], lines: [{ id: 'piccadilly' }, { id: 'metropolitan' }], lat: 51.5308, lon: -0.1238 },
  // Live-only, two of them, plus a repeat that must not duplicate.
  { id: '490777001Q', commonName: 'Tower Bridge Road', modes: ['bus'], lines: [{ id: '42' }], stopLetter: 'Q', indicator: 'Stop Q', lat: 51.5, lon: -0.07 },
  { id: '940GZZLUTWH-X', name: 'Somewhere Else Station', modes: ['tube'], lat: 51.4, lon: -0.1, lines: [{ id: 'jubilee' }] },
  { id: '490777001Q', commonName: 'Tower Bridge Road', modes: ['bus'], lines: [{ id: '42' }, { id: '78' }] },
];

describe('mergeLiveResults', () => {
  const instant = instantFor('tow');
  const merged = mergeLiveResults(instant, liveHits);

  test('keeps every instant row, in order, with the same ids', () => {
    expect(merged.slice(0, instant.length).map((row) => row.id)).toEqual(instant.map((row) => row.id));
  });

  test('enriches a same-id row in place: fills gaps, unions lines, never overwrites', () => {
    const at = instant.findIndex((row) => row.id === '490000254T2');
    expect(at).toBeGreaterThanOrEqual(0);
    const row = merged[at];
    expect(row).toMatchObject({ id: '490000254T2', name: 'Tower Hill Station', towards: 'Blackwall', letter: 'B' });
    expect(row.lines).toEqual(['15', 'n15']);
    expect(row.lat).toBe(51.5098); // live coordinates do not replace the index's
    expect(row.liveOnly).toBeUndefined();

    // A row that already has `towards` keeps it.
    const aldgate = mergeLiveResults(instant, [{ id: '490000254T1', modes: ['bus'], towards: 'Somewhere Else' }]);
    expect(aldgate.find((r) => r.id === '490000254T1')?.towards).toBe('Aldgate');
  });

  test('matches a hub to its member through STATION_HUBS, in place', () => {
    expect(STATION_HUBS['940GZZLUKSX']?.hubId).toBe('HUBKGX');
    const withHub = mergeLiveResults(instantFor('kings cross'), liveHits.slice(1, 2));
    const hub = withHub.find((row) => row.id === 'HUBKGX') as StopRow;
    expect(hub.name).toBe("King's Cross & St Pancras International"); // name untouched
    expect(hub.lines).toEqual(['metropolitan', 'northern', 'piccadilly', 'victoria']);
    expect(hub.modes).toEqual(['national-rail', 'tube']);
    expect(withHub.map((row) => row.id)).not.toContain('940GZZLUKSX');
    expect(withHub).toHaveLength(instantFor('kings cross').length);
  });

  test('hub matching can be switched off with an empty hub table', () => {
    const exactOnly = mergeLiveResults(instantFor('kings cross'), liveHits.slice(1, 2), { hubs: {} });
    expect(exactOnly[exactOnly.length - 1]).toMatchObject({ id: '940GZZLUKSX', liveOnly: true });
  });

  test('a bus hit is never folded into a station row, even with a hub code', () => {
    const hit: LiveStopHit = { id: '490555555Z', name: 'Bus at KGX', modes: ['bus'], hubNaptanCode: 'HUBKGX', lines: [{ id: '73' }] };
    const result = mergeLiveResults(instantFor('kings cross'), [hit]);
    expect(result.find((row) => row.id === 'HUBKGX')?.lines).not.toContain('73');
    expect(result[result.length - 1]).toMatchObject({ id: '490555555Z', kind: 'bus', hubId: 'HUBKGX', liveOnly: true });
  });

  test('appends live-only hits below, in live order, once each', () => {
    // The "tow" list has no King's Cross hub row, so that hit has nothing to enrich and is appended too.
    const appended = merged.slice(instant.length);
    expect(appended.map((row) => row.id)).toEqual(['940GZZLUKSX', '490777001Q', '940GZZLUTWH-X']);
    expect(appended[1]).toMatchObject({ name: 'Tower Bridge Road', kind: 'bus', letter: 'Q', indicator: 'Stop Q', liveOnly: true, lines: ['42', '78'] }); // the repeat enriched it, it was not added twice
    expect(appended[2]).toMatchObject({ kind: 'station', liveOnly: true, modes: ['tube'] });
    expect(merged).toHaveLength(instant.length + 3);
  });

  test('a second merge of the same payload is a no-op (same array back)', () => {
    const again = mergeLiveResults(merged, liveHits);
    expect(again).toBe(merged);
    expect(again).toEqual(merged);
  });

  test('merging payloads in pieces gives the same rows as merging them together', () => {
    const stepwise = mergeLiveResults(mergeLiveResults(instant, liveHits.slice(0, 2)), liveHits.slice(2));
    expect(stepwise.map((row) => row.id)).toEqual(merged.map((row) => row.id));
    expect(stepwise).toEqual(merged);
  });

  test('a later, richer payload adds only what is new, still in place', () => {
    const richer = mergeLiveResults(merged, [{ id: '490777001Q', modes: ['bus'], lines: [{ id: '90' }], towards: 'Peckham' }]);
    expect(richer.map((row) => row.id)).toEqual(merged.map((row) => row.id));
    const row = richer.find((r) => r.id === '490777001Q');
    expect(row?.lines).toEqual(['42', '78', '90']);
    expect(row?.towards).toBe('Peckham');
    expect(mergeLiveResults(richer, [{ id: '490777001Q', lines: [{ id: '90' }], towards: 'Peckham' }])).toBe(richer);
  });

  test('does not mutate its inputs (frozen rows would throw)', () => {
    expect(() => mergeLiveResults(instant, liveHits)).not.toThrow();
    expect(instant.find((row) => row.id === '490000254T2')?.towards).toBeUndefined();
  });

  test('no live hits returns the instant list itself; hits without ids are ignored', () => {
    expect(mergeLiveResults(instant, [])).toBe(instant);
    expect(mergeLiveResults(instant, [{ name: 'No id' }, { id: '  ' }])).toBe(instant);
  });

  test('works on an empty instant list', () => {
    const only = mergeLiveResults([], liveHits);
    expect(only.map((row) => row.id)).toEqual(['490000254T2', '940GZZLUKSX', '490777001Q', '940GZZLUTWH-X']);
    expect(only.every((row) => row.liveOnly)).toBe(true);
    expect(mergeLiveResults(only, liveHits)).toBe(only);
  });
});

describe('against a recorded TfL search response', () => {
  const recorded = loadStopFixture<{ matches: LiveStopHit[] }>('search-tow.json');
  const instant = instantFor('tow');

  test('the live "tow" results enrich Tower Hill and Tower Gateway in place and append the rest', () => {
    const merged = mergeLiveResults(instant, recorded.matches);
    expect(merged.slice(0, instant.length).map((row) => row.id)).toEqual(instant.map((row) => row.id));

    const gateway = merged.find((row) => row.id === 'HUBTOG') as StopRow;
    expect(gateway.name).toBe('Tower Gateway');
    expect(gateway.modes).toEqual(expect.arrayContaining(['bus', 'dlr'])); // live added "bus"
    expect(merged.length).toBeGreaterThan(instant.length); // live-only hits were appended
    expect(merged.slice(instant.length).every((row) => row.liveOnly)).toBe(true);

    expect(mergeLiveResults(merged, recorded.matches)).toBe(merged);
    expect(new Set(merged.map((row) => row.id)).size).toBe(merged.length);
  });
});

describe('live hit types', () => {
  test('the matches of client.stopPoint.search() go straight in', () => {
    const response: ExtendedSearchResponse = {
      matches: [{ id: '490000129E', name: "King's Cross Station", modes: ['bus'], lines: [{ id: '73', name: '73' }], lat: 51.5, lon: -0.1 }],
    };
    const rows = mergeLiveResults(instantFor('kings cross'), response.matches ?? []);
    expect(rows.find((row) => row.id === '490000129E')?.lines).toEqual(expect.arrayContaining(['73']));
  });

  test('a full StopPoint payload (additionalProperties Towards, hubNaptanCode) is understood too', () => {
    const rows = mergeLiveResults([], [
      {
        id: '490000129E',
        commonName: "King's Cross Station",
        modes: ['bus'],
        stopLetter: 'E',
        indicator: 'Stop E',
        additionalProperties: [{ key: 'Towards', value: 'Angel Islington' }],
        hubNaptanCode: 'HUBKGX',
        lat: 51.5305,
        lon: -0.12307,
      },
    ]);
    expect(rows[0]).toMatchObject({ letter: 'E', towards: 'Angel Islington', hubId: 'HUBKGX', kind: 'bus' });
  });
});

describe('findHighlightedIndex', () => {
  const instant = instantFor('tow');
  const merged = mergeLiveResults(instant, liveHits);

  test('the highlighted row keeps its position and identity through a merge', () => {
    for (let position = 0; position < instant.length; position++) {
      const highlightedId = instant[position].id;
      expect(findHighlightedIndex(merged, highlightedId)).toBe(position);
      expect(merged[findHighlightedIndex(merged, highlightedId)].id).toBe(highlightedId);
    }
  });

  test('finds a live-only row, and falls back to a clamped position when the id is gone', () => {
    expect(findHighlightedIndex(merged, '490777001Q')).toBe(instant.length + 1);
    expect(findHighlightedIndex(merged, 'gone', 2)).toBe(2);
    expect(findHighlightedIndex(merged, 'gone', 999)).toBe(merged.length - 1);
    expect(findHighlightedIndex(merged, undefined)).toBe(0);
    expect(findHighlightedIndex([], 'x')).toBe(-1);
  });
});
