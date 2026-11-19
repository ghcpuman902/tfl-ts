import TflClient, { LINE_STATION_SEQUENCES } from '../index';
import { checkLineId } from '../checkIds';

process.env.TFL_APP_KEY = 'test-app-key';
delete process.env.TFL_APP_ID;

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

  test('includes river-bus pier sequences on FerryPort ids', () => {
    const rb1 = LINE_STATION_SEQUENCES.rb1;
    expect(rb1.modeName).toBe('river-bus');
    expect(rb1.stations.some((station) => station.id === '930GWMR')).toBe(true);
    expect(LINE_STATION_SEQUENCES['woolwich-ferry']).toBeDefined();
    expect(
      (LINE_STATION_SEQUENCES as Record<string, unknown>).rb2,
    ).toBeUndefined();
  });

  describe('river-bus routes (TfL change seen 19 Nov 2026)', () => {
    type Route = { name?: string; direction: string; stationIds: readonly string[] };
    const pier = (code: string) => `930G${code}`;
    const routes = (lineId: 'rb1' | 'rb6', direction: string): Route[] =>
      (LINE_STATION_SEQUENCES[lineId].orderedRoutes as readonly Route[]).filter(
        (route) => route.direction === direction,
      );
    const named = (lineId: 'rb1' | 'rb6', direction: string, via: string | null) =>
      routes(lineId, direction).filter((route) => {
        const name = (route.name ?? '').trim();
        return via === null ? !/\bvia\b/.test(name) : name.endsWith(`via ${via}`);
      });

    test('RB1 outbound has no "via Blackfriars" branch and a plain BSP to Barking Riverside route', () => {
      expect(named('rb1', 'outbound', 'Blackfriars')).toHaveLength(0);
      const plain = named('rb1', 'outbound', null);
      expect(plain).toHaveLength(1);
      expect(plain[0].stationIds).toHaveLength(12);
      expect(plain[0].stationIds[0]).toBe(pier('BSP'));
      expect(plain[0].stationIds[11]).toBe(pier('BRVS'));
      expect(plain[0].stationIds).not.toContain(pier('BFR'));
    });

    test('RB6 inbound has no Blackfriars to Battersea Power Station short working', () => {
      expect(
        routes('rb6', 'inbound').filter(
          (route) => route.stationIds.length === 2 && route.stationIds.includes(pier('BFR')),
        ),
      ).toHaveLength(0);
    });

    test('RB6 via Blackfriars calls at Bankside, not Westminster, inbound and skips Tower outbound', () => {
      const [inbound] = named('rb6', 'inbound', 'Blackfriars');
      expect(inbound.stationIds).toContain(pier('SWK'));
      expect(inbound.stationIds).not.toContain(pier('WMR'));
      const [outbound] = named('rb6', 'outbound', 'Blackfriars');
      expect(outbound.stationIds).not.toContain(pier('TMP'));
    });

    test('RB6 via Chelsea Harbour skips Tower and calls at Wandsworth Riverside Quarter, Cadogan and St George Wharf', () => {
      const [outbound] = named('rb6', 'outbound', 'Chelsea Harbour');
      expect(outbound.stationIds).not.toContain(pier('TMP'));
      for (const code of ['WRQ', 'BSE', 'SGW']) expect(outbound.stationIds).toContain(pier(code));
    });

    test('rb1 and rb6 are line ids; br1 and br6 are not', () => {
      expect(checkLineId('rb1')).toEqual(expect.objectContaining({ ok: true, modeName: 'river-bus' }));
      expect(checkLineId('rb6')).toEqual(expect.objectContaining({ ok: true, modeName: 'river-bus' }));
      expect(checkLineId('br1').ok).toBe(false);
      expect(checkLineId('br6').ok).toBe(false);
      expect((LINE_STATION_SEQUENCES as Record<string, unknown>).br1).toBeUndefined();
      expect((LINE_STATION_SEQUENCES as Record<string, unknown>).br6).toBeUndefined();
    });
  });
});
