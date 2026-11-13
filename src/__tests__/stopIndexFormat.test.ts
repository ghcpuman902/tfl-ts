import { STOP_INDEX_DATA } from '../generated/stops/StopIndex';
import { STOP_INDEX_FORMAT } from '../stops/types';
import type { StopRow } from '../stops/types';
import { createStopIndex, validateStopIndexData } from '../stops/decode';
import { encodeStopIndex } from '../stops/encode';
import { STOP_INDEX } from '../stops';
import { buildTestIndex, testBusRows, testStationRows } from './helpers/stopFixtures';

const generatedAt = '2026-11-13T00:00:00.000Z';

describe('stop index format', () => {
  const rows: StopRow[] = [...testStationRows(), ...testBusRows()];

  test('encode → decode returns every row unchanged (round-trip)', () => {
    const index = createStopIndex(encodeStopIndex(rows, { generatedAt }));
    expect(index.size).toBe(rows.length);

    const decoded = new Map([...index].map((row) => [row.id, row]));
    for (const original of rows) {
      const row = decoded.get(original.id);
      expect(row).toBeDefined();
      expect(row).toMatchObject({
        id: original.id,
        name: original.name,
        kind: original.kind,
        lines: [...original.lines].sort(),
        modes: [...original.modes].sort(),
      });
      expect(row?.letter).toBe(original.letter);
      expect(row?.towards).toBe(original.towards);
      expect(row?.indicator).toBe(original.indicator);
      expect(row?.lat).toBeCloseTo(original.lat as number, 5);
      expect(row?.lon).toBeCloseTo(original.lon as number, 5);
    }
  });

  test('puts stations first, then bus stops, each sorted by id, whatever the input order', () => {
    const shuffled = [...rows].reverse();
    const data = encodeStopIndex(shuffled, { generatedAt });
    expect(data.stationCount).toBe(testStationRows().length);
    const stationIds = data.id.slice(0, data.stationCount);
    const busIds = data.id.slice(data.stationCount);
    expect(stationIds).toEqual([...stationIds].sort());
    expect(busIds).toEqual([...busIds].sort());
    expect(encodeStopIndex(rows, { generatedAt })).toEqual(data);

    const index = createStopIndex(data);
    expect(index.at(0)?.kind).toBe('station');
    expect(index.at(data.stationCount)?.kind).toBe('bus');
  });

  test('rounds coordinates to 5 decimal places and stores them as integers', () => {
    const data = encodeStopIndex(
      [{ id: 'X1', name: 'X', kind: 'bus', lat: 51.5304512345, lon: -0.123287654, lines: [], modes: ['bus'] }],
      { generatedAt },
    );
    expect(data.dlat).toEqual([5153045]);
    expect(data.dlon).toEqual([-12329]);
    const row = createStopIndex(data).at(0);
    expect(row?.lat).toBe(51.53045);
    expect(row?.lon).toBe(-0.12329);
  });

  test('interns repeated names, towards text, hubs and line sets', () => {
    const base = { kind: 'bus', lat: 51.5, lon: -0.1, modes: ['bus'] } as const;
    const data = encodeStopIndex(
      [
        { ...base, id: 'A1', name: 'High Street', towards: 'Angel', lines: ['73', '30'], hubId: 'HUBX' },
        { ...base, id: 'A2', name: 'High Street', towards: 'Angel', lines: ['30', '73'], hubId: 'HUBX' },
        { ...base, id: 'A3', name: 'Low Street', lines: ['73'] },
      ],
      { generatedAt },
    );
    expect(data.names).toEqual(['High Street', 'Low Street']);
    expect(data.towardsText).toEqual(['', 'Angel']);
    expect(data.hubs).toEqual(['', 'HUBX']);
    expect(data.lineIds).toEqual(['30', '73']);
    expect(data.lineSets).toEqual([[0, 1], [1]]);
    // First-seen coded: new entry = 0, the latest entry again = 1.
    expect(data.lineSet).toEqual([0, 1, 0]);
    expect(data.name).toEqual([0, 1, 0]);
    const index = createStopIndex(data);
    expect(index.columns.lineSet).toEqual(Int32Array.from([0, 0, 1]));
    expect(index.columns.name).toEqual(Int32Array.from([0, 0, 1]));
  });

  test('delta and first-seen columns round-trip across many rows, including far-back repeats', () => {
    const many: StopRow[] = [];
    for (let i = 0; i < 400; i++) {
      many.push({
        id: `4900${String(i).padStart(5, '0')}A`,
        name: `Street ${i % 37}`, // names come back in a cycle, so repeats are far behind the latest
        kind: 'bus',
        letter: 'A',
        indicator: 'Stop A',
        lat: 51 + ((i * 7919) % 10000) / 20000,
        lon: -0.5 + ((i * 104729) % 10000) / 20000,
        lines: [String(i % 11), String((i * 3) % 13)],
        modes: ['bus'],
      });
    }
    const data = encodeStopIndex(many, { generatedAt });
    expect(validateStopIndexData(data)).toEqual([]);
    const index = createStopIndex(data);
    many.forEach((original, position) => {
      const row = index.at(position) as StopRow;
      expect(row.id).toBe(original.id);
      expect(row.name).toBe(original.name);
      expect(row.lat).toBeCloseTo(original.lat as number, 5);
      expect(row.lon).toBeCloseTo(original.lon as number, 5);
      expect(row.lines).toEqual([...new Set(original.lines)].sort());
    });
  });

  test('keeps the painted letter apart from the NaPTAN suffix and stores odd indicators sparsely', () => {
    const data = encodeStopIndex(
      [
        { id: '490003087W1', name: 'Acton Street', kind: 'bus', letter: 'HA', indicator: 'Stop HA', lat: 51.5, lon: -0.1, lines: [], modes: ['bus'] },
        { id: '490000001A', name: 'Odd', kind: 'bus', indicator: 'Stand 3', lat: 51.5, lon: -0.1, lines: [], modes: ['bus'] },
      ],
      { generatedAt },
    );
    const index = createStopIndex(data);
    expect(index.byId('490003087W1')).toMatchObject({ letter: 'HA', indicator: 'Stop HA' });
    expect(index.byId('490000001A')).toMatchObject({ indicator: 'Stand 3' });
    expect(index.byId('490000001A')?.letter).toBeUndefined();
    // `Stop <letter>` is derivable, so it is not stored; only the odd one is.
    expect(Object.keys(data.indicators)).toHaveLength(1);
  });

  test('indexOf and byId find rows; unknown ids are absent', () => {
    const index = buildTestIndex();
    expect(index.byId('940GZZLUTWH')?.name).toBe('Tower Hill');
    expect(index.indexOf('940GZZLUTWH')).toBeGreaterThanOrEqual(0);
    expect(index.indexOf('nope')).toBe(-1);
    expect(index.byId('nope')).toBeUndefined();
    expect(index.at(-1)).toBeUndefined();
    expect(index.at(index.size)).toBeUndefined();
  });

  test('rejects duplicate ids and rows without coordinates', () => {
    const row: StopRow = { id: 'A', name: 'A', kind: 'bus', lat: 1, lon: 1, lines: [], modes: [] };
    expect(() => encodeStopIndex([row, row])).toThrow(/Duplicate stop id A/);
    expect(() => encodeStopIndex([{ ...row, lat: undefined }])).toThrow(/no coordinates/);
  });

  test('validateStopIndexData flags broken columns', () => {
    const good = encodeStopIndex(rows, { generatedAt });
    expect(validateStopIndexData(good)).toEqual([]);

    const short = { ...good, dlat: good.dlat.slice(1) };
    expect(validateStopIndexData(short).join('\n')).toMatch(/column dlat has/);

    const badName = { ...good, name: good.name.map(() => 9999) };
    expect(validateStopIndexData(badName).join('\n')).toMatch(/name index out of range/);
  });
});

describe('bundled index', () => {
  test('is valid and in the current format', () => {
    expect(STOP_INDEX_DATA.format).toBe(STOP_INDEX_FORMAT);
    expect(validateStopIndexData(STOP_INDEX_DATA)).toEqual([]);
  });

  test('carries the stations, with coordinates, lines and modes', () => {
    expect(STOP_INDEX.stationCount).toBeGreaterThanOrEqual(400);
    const towerHill = STOP_INDEX.byId('940GZZLUTWH');
    expect(towerHill).toMatchObject({ name: 'Tower Hill', kind: 'station', lines: ['circle', 'district'] });
    expect(towerHill?.modes).toContain('tube');
    // King's Cross & St Pancras is a hub; its member is not a row but is reachable via STATION_HUBS.
    expect(STOP_INDEX.byId('HUBKGX')?.kind).toBe('station');
    for (let position = 0; position < STOP_INDEX.stationCount; position++) {
      const row = STOP_INDEX.at(position) as StopRow;
      expect(typeof row.lat).toBe('number');
      expect(row.lines.length).toBeGreaterThan(0);
    }
  });

  test('every bus row, once the snapshot has them, is a boarding stop with a position', () => {
    for (let position = STOP_INDEX.stationCount; position < STOP_INDEX.size; position++) {
      const row = STOP_INDEX.at(position) as StopRow;
      expect(row.kind).toBe('bus');
      expect(row.modes).toContain('bus');
      expect(typeof row.lat).toBe('number');
      expect(typeof row.lon).toBe('number');
    }
  });
});
