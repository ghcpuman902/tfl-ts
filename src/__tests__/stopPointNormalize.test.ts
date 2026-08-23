import {
  normalizeStopPoint,
  normalizeStopPoints,
  parseCompassPoint,
} from '../utils/stopPoint';
import type { TflApiPresentationEntitiesStopPoint } from '../generated/types';

const prop = (key: string, value: string): { key: string; value: string } => ({
  key,
  value,
});

const trafalgarStopE: TflApiPresentationEntitiesStopPoint = {
  id: '490013766E',
  commonName: 'Charing Cross Stn / Trafalgar Square',
  indicator: 'Stop E',
  stopLetter: 'E',
  smsCode: '50435',
  additionalProperties: [
    prop('CompassPoint', 'E'),
    prop('Towards', 'Aldwych'),
    prop('WiFi', 'yes'),
    prop('Zone', '1'),
  ],
};

const highwayNorth: TflApiPresentationEntitiesStopPoint = {
  id: '490014016N',
  commonName: 'The Highway',
  indicator: '->N',
  stopLetter: '->N',
  additionalProperties: [
    prop('CompassPoint', 'N'),
    prop('Towards', 'Liverpool Street'),
  ],
};

const walthamstowStopW: TflApiPresentationEntitiesStopPoint = {
  id: '490000249YY',
  commonName: 'Walthamstow Central Station',
  indicator: 'W',
  stopLetter: 'W',
  smsCode: '92359',
  additionalProperties: [
    prop('CompassPoint', 'N'),
    prop('Towards', 'Chingford'),
  ],
};

describe('parseCompassPoint', () => {
  test.each([
    { raw: 'N', compassPoint: 'N', compassBearingDegrees: 0 },
    { raw: 'NE', compassPoint: 'NE', compassBearingDegrees: 45 },
    { raw: '->W', compassPoint: 'W', compassBearingDegrees: 270 },
    { raw: 'e', compassPoint: 'E', compassBearingDegrees: 90 },
  ])('$raw', ({ raw, compassPoint, compassBearingDegrees }) => {
    expect(parseCompassPoint(raw)).toEqual({ compassPoint, compassBearingDegrees });
  });

  test('ignores painted stop letters and stands', () => {
    expect(parseCompassPoint('Stop G')).toBeUndefined();
    expect(parseCompassPoint('RG')).toBeUndefined();
    expect(parseCompassPoint('Stand 12')).toBeUndefined();
  });
});

describe('normalizeStopPoint', () => {
  test('lifts Towards, CompassPoint, and first-class smsCode', () => {
    const stop = normalizeStopPoint(trafalgarStopE);
    expect(stop).toEqual(
      expect.objectContaining({
        id: '490013766E',
        towards: 'Aldwych',
        compassPoint: 'E',
        compassBearingDegrees: 90,
        smsCode: '50435',
        stopLetter: 'E',
      })
    );
    expect(stop.additionalProperties).toEqual(trafalgarStopE.additionalProperties);
  });

  test('fills smsCode from the bag when first-class is missing', () => {
    const stop = normalizeStopPoint({
      id: '490000091G',
      additionalProperties: [prop('SmsCode', '53240'), prop('CompassPoint', 'NE')],
    });
    expect(stop.smsCode).toBe('53240');
    expect(stop.compassPoint).toBe('NE');
    expect(stop.compassBearingDegrees).toBe(45);
  });

  test('prefers CompassPoint over a ->N indicator', () => {
    const stop = normalizeStopPoint(highwayNorth);
    expect(stop.compassPoint).toBe('N');
    expect(stop.compassBearingDegrees).toBe(0);
    expect(stop.stopLetter).toBe('->N');
    expect(stop.towards).toBe('Liverpool Street');
  });

  test('falls back to a ->W indicator when CompassPoint is missing', () => {
    const stop = normalizeStopPoint({
      id: '490012020A',
      indicator: '->W',
      stopLetter: '->W',
    });
    expect(stop.compassPoint).toBe('W');
    expect(stop.compassBearingDegrees).toBe(270);
  });

  test('does not treat painted stop letter W as west', () => {
    const stop = normalizeStopPoint(walthamstowStopW);
    expect(stop.stopLetter).toBe('W');
    expect(stop.compassPoint).toBe('N');
    expect(stop.compassBearingDegrees).toBe(0);
  });

  test('does not invent compass from a painted letter when CompassPoint is absent', () => {
    const stop = normalizeStopPoint({
      id: '490000249K',
      indicator: 'Stop X',
      stopLetter: 'X',
    });
    expect(stop.compassPoint).toBeUndefined();
    expect(stop.compassBearingDegrees).toBeUndefined();
  });

  test('drops a literal null towards', () => {
    const stop = normalizeStopPoint({
      id: '490000001A',
      towards: 'null',
      additionalProperties: [prop('Towards', 'null')],
    });
    expect(stop.towards).toBeUndefined();
  });

  test('keeps a search-hit towards without additionalProperties', () => {
    const stop = normalizeStopPoint({
      id: '490013766E',
      towards: 'Aldwych',
    });
    expect(stop.towards).toBe('Aldwych');
    expect(stop.compassPoint).toBeUndefined();
  });

  test('recurses into children of a stop-area', () => {
    const hub = normalizeStopPoint({
      id: '490G00014016',
      children: [highwayNorth],
    });
    expect(hub.children?.[0]).toEqual(
      expect.objectContaining({
        id: '490014016N',
        compassPoint: 'N',
        towards: 'Liverpool Street',
      })
    );
  });

  test('normalizeStopPoints maps every stop', () => {
    const stops = normalizeStopPoints([trafalgarStopE, highwayNorth]);
    expect(stops.map((s) => s.compassPoint)).toEqual(['E', 'N']);
  });
});
