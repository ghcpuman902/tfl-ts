import {
  getSharedTrackSegments,
  resolveSharedTrackIdentity,
  withSharedTrackIdentity,
} from '../utils/sharedTrackIdentity';
import type { Prediction } from '../utils/arrivals';

const SUBSURFACE = ['circle', 'hammersmith-city', 'metropolitan'] as const;

const VICTORIA = '940GZZLUVIC';
const WESTMINSTER = '940GZZLUWSM';
const CANNON_STREET = '940GZZLUCST';
const LIVERPOOL_STREET = '940GZZLULVT';
const KINGS_CROSS = '940GZZLUKSX';
const ALDGATE = '940GZZLUALD';
const ALDGATE_EAST = '940GZZLUADE';
const WHITECHAPEL = '940GZZLUWPL';
const AMERSHAM = '940GZZLUAMS';

const prediction = (fields: {
  vehicleId: string;
  lineId: string;
  naptanId: string;
  towards?: string;
  destinationName?: string;
}): Prediction => ({
  vehicleId: fields.vehicleId,
  lineId: fields.lineId,
  naptanId: fields.naptanId,
  towards: fields.towards,
  destinationName: fields.destinationName,
});

describe('getSharedTrackSegments', () => {
  const segments = getSharedTrackSegments(SUBSURFACE);

  test('marks Circle-only southern-loop stations exclusive to circle', () => {
    expect(segments.exclusive.get('circle')?.has(VICTORIA)).toBe(true);
    expect(segments.exclusive.get('circle')?.has(WESTMINSTER)).toBe(true);
    expect(segments.exclusive.get('circle')?.has(CANNON_STREET)).toBe(true);
    expect(segments.shared.has(VICTORIA)).toBe(false);
  });

  test('marks H&C-only east-end stations exclusive to hammersmith-city', () => {
    expect(segments.exclusive.get('hammersmith-city')?.has(ALDGATE_EAST)).toBe(true);
    expect(segments.exclusive.get('hammersmith-city')?.has(WHITECHAPEL)).toBe(true);
  });

  test('marks Metropolitan-only stations exclusive to metropolitan', () => {
    expect(segments.exclusive.get('metropolitan')?.has(AMERSHAM)).toBe(true);
  });

  test('marks the Baker Street–Aldgate stretch as shared', () => {
    expect(segments.shared.has(LIVERPOOL_STREET)).toBe(true);
    expect(segments.shared.has(KINGS_CROSS)).toBe(true);
    expect(segments.exclusive.get('circle')?.has(LIVERPOOL_STREET)).toBe(false);
    expect(segments.exclusive.get('hammersmith-city')?.has(LIVERPOOL_STREET)).toBe(
      false
    );
  });

  test('lists serving lines per station among the given set', () => {
    expect(new Set(segments.linesByStation.get(LIVERPOOL_STREET))).toEqual(
      new Set(SUBSURFACE)
    );
    expect(segments.linesByStation.get(VICTORIA)).toEqual(['circle']);
    expect(new Set(segments.linesByStation.get(ALDGATE))).toEqual(
      new Set(['circle', 'metropolitan'])
    );
  });

  test('ignores unknown line ids', () => {
    const empty = getSharedTrackSegments(['not-a-line']);
    expect(empty.exclusive.get('not-a-line')?.size ?? 0).toBe(0);
    expect(empty.shared.size).toBe(0);
  });
});

describe('resolveSharedTrackIdentity', () => {
  test('resolves a vehicle that also appears on Circle-exclusive track', () => {
    const rows = [
      prediction({
        vehicleId: '204',
        lineId: 'circle',
        naptanId: CANNON_STREET,
        towards: 'Hammersmith',
        destinationName: 'Hammersmith (H&C Line) Underground Station',
      }),
      prediction({
        vehicleId: '204',
        lineId: 'hammersmith-city',
        naptanId: LIVERPOOL_STREET,
        towards: 'Hammersmith',
        destinationName: 'Hammersmith (H&C Line) Underground Station',
      }),
      prediction({
        vehicleId: '204',
        lineId: 'hammersmith-city',
        naptanId: KINGS_CROSS,
        towards: 'Hammersmith',
      }),
    ];

    const identity = resolveSharedTrackIdentity(rows, SUBSURFACE).get('204');
    expect(identity).toEqual({
      vehicleId: '204',
      canonicalLineId: 'circle',
      confidence: 'exclusive-segment',
      rawLineIds: ['circle', 'hammersmith-city'],
    });
  });

  test('leaves a shared-track-only vehicle ambiguous', () => {
    const rows = [
      prediction({
        vehicleId: '406',
        lineId: 'hammersmith-city',
        naptanId: LIVERPOOL_STREET,
        towards: 'Check Front of Train',
      }),
      prediction({
        vehicleId: '406',
        lineId: 'metropolitan',
        naptanId: LIVERPOOL_STREET,
        towards: 'Check Front of Train',
      }),
      prediction({
        vehicleId: '406',
        lineId: 'metropolitan',
        naptanId: ALDGATE,
        towards: 'Aldgate',
        destinationName: 'Aldgate Underground Station',
      }),
    ];

    const identity = resolveSharedTrackIdentity(rows, SUBSURFACE).get('406');
    expect(identity).toEqual({
      vehicleId: '406',
      confidence: 'ambiguous',
      rawLineIds: ['hammersmith-city', 'metropolitan'],
    });
  });

  test('resolves Check Front of Train via exclusive-station topology, not the raw label', () => {
    const rows = [
      prediction({
        vehicleId: '053',
        lineId: 'hammersmith-city',
        naptanId: WESTMINSTER,
        towards: 'Check Front of Train',
      }),
      prediction({
        vehicleId: '053',
        lineId: 'hammersmith-city',
        naptanId: LIVERPOOL_STREET,
        towards: 'Check Front of Train',
      }),
    ];

    const identity = resolveSharedTrackIdentity(rows, SUBSURFACE).get('053');
    expect(identity?.confidence).toBe('exclusive-segment');
    expect(identity?.canonicalLineId).toBe('circle');
  });
});

describe('withSharedTrackIdentity', () => {
  test('tags stop rows from network-wide evidence and leaves raw lineId intact', () => {
    const stopRow = prediction({
      vehicleId: '204',
      lineId: 'hammersmith-city',
      naptanId: LIVERPOOL_STREET,
      towards: 'Hammersmith',
    });
    const evidence = [
      prediction({
        vehicleId: '204',
        lineId: 'circle',
        naptanId: CANNON_STREET,
        towards: 'Hammersmith',
      }),
      stopRow,
    ];

    const [tagged] = withSharedTrackIdentity([stopRow], SUBSURFACE, evidence);
    expect(tagged.lineId).toBe('hammersmith-city');
    expect(tagged.sharedTrackIdentity).toEqual({
      canonicalLineId: 'circle',
      confidence: 'exclusive-segment',
      rawLineId: 'hammersmith-city',
      rawLineIds: ['circle', 'hammersmith-city'],
    });
  });

  test('tags ambiguous vehicles with rawLineIds and no canonical line', () => {
    const stopRow = prediction({
      vehicleId: '406',
      lineId: 'hammersmith-city',
      naptanId: LIVERPOOL_STREET,
      towards: 'Check Front of Train',
    });
    const [tagged] = withSharedTrackIdentity(
      [stopRow],
      SUBSURFACE,
      [
        stopRow,
        prediction({
          vehicleId: '406',
          lineId: 'metropolitan',
          naptanId: ALDGATE,
          towards: 'Aldgate',
        }),
      ]
    );
    expect(tagged.lineId).toBe('hammersmith-city');
    expect(tagged.sharedTrackIdentity).toEqual({
      confidence: 'ambiguous',
      rawLineId: 'hammersmith-city',
      rawLineIds: ['hammersmith-city', 'metropolitan'],
    });
  });

  test('does not tag a different line that reuses the same vehicleId', () => {
    const centralRow = prediction({
      vehicleId: '204',
      lineId: 'central',
      naptanId: LIVERPOOL_STREET,
      towards: 'Epping',
    });
    const [tagged] = withSharedTrackIdentity(
      [centralRow],
      SUBSURFACE,
      [
        prediction({
          vehicleId: '204',
          lineId: 'circle',
          naptanId: CANNON_STREET,
          towards: 'Hammersmith',
        }),
      ]
    );
    expect(tagged.lineId).toBe('central');
    expect(tagged.sharedTrackIdentity).toBeUndefined();
  });
});
