import TflClient, { LINE_STATION_SEQUENCES, STATION_HUBS, STATION_HUB_LIST } from '../index';
import { resolveArrivalsStopId, resolveArrivalsStopIds } from '../utils/stopHierarchy';
import type { StationHubInfo } from '../generated/meta/StationHubs';

process.env.TFL_APP_KEY = 'test-app-key';
delete process.env.TFL_APP_ID;

const LIVERPOOL_STREET_TUBE = '940GZZLULVT';
const LIVERPOOL_STREET_RAIL = '910GLIVST';
const WAPPING = '910GWAPPING';

describe('static station hubs', () => {
  test('are available without making a TfL request', () => {
    const client = new TflClient();
    expect(client).toBeInstanceOf(TflClient);
    expect(STATION_HUB_LIST.length).toBeGreaterThan(100);
    expect(STATION_HUBS[LIVERPOOL_STREET_TUBE]).toBeDefined();
  });

  test('Liverpool Street tube and rail resolve to one hub', () => {
    const tube = STATION_HUBS[LIVERPOOL_STREET_TUBE];
    const rail = STATION_HUBS[LIVERPOOL_STREET_RAIL];
    expect(tube).toBeDefined();
    expect(rail).toBe(tube);
    expect(tube?.hubId).toBe('HUBLST');
    expect(tube?.lineMemberIds.central).toBe(LIVERPOOL_STREET_TUBE);
    expect(tube?.lineMemberIds.elizabeth).toMatch(/^910G/);
    expect(tube?.lineMemberIds.elizabeth).not.toBe(LIVERPOOL_STREET_TUBE);
  });

  test('Wapping resolves to a single-member entry', () => {
    const hub = STATION_HUBS[WAPPING];
    expect(hub).toBeDefined();
    expect(hub?.members.some((member) => member.id === WAPPING)).toBe(true);
    expect(hub?.members.length).toBeLessThanOrEqual(2);
  });

  test('indexes every sequence station', () => {
    const missing: string[] = [];
    for (const sequence of Object.values(LINE_STATION_SEQUENCES)) {
      for (const station of sequence.stations) {
        if (!STATION_HUBS[station.id]) missing.push(station.id);
      }
    }
    expect(missing).toEqual([]);
  });

  test('never lists the hub itself as one of its own members', () => {
    const offenders = STATION_HUB_LIST.filter(
      (hub) => hub.hubId && hub.members.some((member) => member.id === hub.hubId)
    ).map((hub) => hub.hubId);
    expect(offenders).toEqual([]);
  });

  test('lineMemberIds values always resolve to a real member or the hub id', () => {
    const offenders: string[] = [];
    for (const hub of STATION_HUB_LIST) {
      const validIds = new Set(hub.members.map((member) => member.id));
      if (hub.hubId) validIds.add(hub.hubId);
      for (const [lineId, memberId] of Object.entries(hub.lineMemberIds)) {
        if (!validIds.has(memberId)) {
          offenders.push(`${hub.hubId ?? hub.members[0]?.id}: ${lineId} -> ${memberId}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  test('contains topology only', () => {
    const bannedKeys = new Set([
      'status',
      'lineStatuses',
      'disruptions',
      'validityPeriods',
      'arrivals',
    ]);
    const found = new Set<string>();

    const visit = (value: unknown): void => {
      if (!value || typeof value !== 'object') return;
      for (const [key, child] of Object.entries(value)) {
        if (bannedKeys.has(key)) found.add(key);
        visit(child);
      }
    };

    visit(STATION_HUB_LIST);
    expect([...found]).toEqual([]);
  });
});

describe('resolveArrivalsStopId', () => {
  const hub: StationHubInfo = {
    hubId: 'HUBLST',
    hubName: 'Liverpool Street',
    members: [
      {
        id: LIVERPOOL_STREET_TUBE,
        name: 'Liverpool Street Underground Station',
        stopType: 'NaptanMetroStation',
        modes: ['tube'],
        lines: ['central', 'circle', 'hammersmith-city', 'metropolitan'],
      },
      {
        id: LIVERPOOL_STREET_RAIL,
        name: 'Liverpool Street Rail Station',
        stopType: 'NaptanRailStation',
        modes: ['elizabeth-line', 'overground'],
        lines: ['elizabeth', 'weaver'],
      },
    ],
    lineMemberIds: {
      central: LIVERPOOL_STREET_TUBE,
      elizabeth: LIVERPOOL_STREET_RAIL,
      weaver: LIVERPOOL_STREET_RAIL,
    },
  };

  test('maps a line to its arrivals StopPoint', () => {
    expect(resolveArrivalsStopId(hub, 'central')).toBe(LIVERPOOL_STREET_TUBE);
    expect(resolveArrivalsStopId(hub, 'elizabeth')).toBe(LIVERPOOL_STREET_RAIL);
    expect(resolveArrivalsStopId(hub, 'elizabeth-line')).toBe(LIVERPOOL_STREET_RAIL);
  });

  test('returns undefined for an unmapped line rather than the hub id', () => {
    // Polling the interchange id itself returns zero arrivals from TfL, so a
    // fallback to hub.hubId would look valid but silently return nothing.
    expect(resolveArrivalsStopId(hub, 'unknown-line')).toBeUndefined();
  });

  test('collects unique ids for a set of lines', () => {
    expect(resolveArrivalsStopIds(hub, ['central', 'elizabeth', 'elizabeth-line'])).toEqual([
      LIVERPOOL_STREET_TUBE,
      LIVERPOOL_STREET_RAIL,
    ]);
    expect(resolveArrivalsStopIds(hub).sort()).toEqual([
      LIVERPOOL_STREET_RAIL,
      LIVERPOOL_STREET_TUBE,
    ]);
  });
});
