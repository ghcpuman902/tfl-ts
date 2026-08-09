import TflClient, { LINE_STATION_SEQUENCES } from '../index';

process.env.TFL_APP_ID = 'test-app-id';
process.env.TFL_APP_KEY = 'test-app-key';

describe('static station sequences', () => {
  test('are available without making a TfL request', () => {
    const client = new TflClient();

    expect(client.line.STATION_SEQUENCES).toBe(LINE_STATION_SEQUENCES);
    expect(LINE_STATION_SEQUENCES.bakerloo.lineName).toBe('Bakerloo');
  });

  test('include station identity and both ordered directions', () => {
    const bakerloo = LINE_STATION_SEQUENCES.bakerloo;
    const names = new Map(bakerloo.stations.map((station) => [station.id, station.name]));
    const inbound = bakerloo.orderedRoutes.find((route) => route.direction === 'inbound');
    const outbound = bakerloo.orderedRoutes.find((route) => route.direction === 'outbound');

    expect(bakerloo.stations).toHaveLength(25);
    expect(names.get('940GZZLUQPS')).toBe("Queen's Park Underground Station");
    expect(inbound?.stationIds[0]).toBe('940GZZLUHAW');
    expect(inbound?.stationIds[inbound.stationIds.length - 1]).toBe('940GZZLUEAC');
    expect(outbound?.stationIds[0]).toBe('940GZZLUEAC');
    expect(outbound?.stationIds[outbound.stationIds.length - 1]).toBe('940GZZLUHAW');
  });

  test('preserves branch relationships for branching lines', () => {
    const central = LINE_STATION_SEQUENCES.central;

    expect(central.branches.length).toBeGreaterThan(2);
    expect(
      central.branches.some(
        (branch) => branch.nextBranchIds.length > 0 || branch.previousBranchIds.length > 0
      )
    ).toBe(true);
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

    visit(LINE_STATION_SEQUENCES);
    expect([...found]).toEqual([]);
  });
});
