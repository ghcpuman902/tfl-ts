import {
  normalizeArrival,
  normalizeArrivalDeparture,
  normalizeArrivals,
  parseArrivalPlatform,
  resolveArrivalDestination,
} from '../utils/arrivals';
import type { TflApiPresentationEntitiesPrediction } from '../generated/types';

describe('resolveArrivalDestination', () => {
  test.each([
    {
      name: 'prefers a filled towards',
      input: { towards: 'Epping', destinationName: 'Epping Underground Station' },
      expected: { name: 'Epping', source: 'towards' },
    },
    {
      name: 'falls through an empty towards to destinationName',
      input: { towards: '', destinationName: 'Abbey Wood Rail Station' },
      expected: { name: 'Abbey Wood Rail Station', source: 'destinationName' },
    },
    {
      name: 'falls through whitespace towards to destinationName',
      input: { towards: '   ', destinationName: 'Cheshunt Rail Station' },
      expected: { name: 'Cheshunt Rail Station', source: 'destinationName' },
    },
    {
      name: 'returns none when both are empty',
      input: { towards: '', destinationName: '' },
      expected: { source: 'none' },
    },
    {
      name: 'returns none when both are missing',
      input: {},
      expected: { source: 'none' },
    },
  ])('$name', ({ input, expected }) => {
    expect(resolveArrivalDestination(input)).toEqual(expected);
  });
});

describe('parseArrivalPlatform', () => {
  test.each([
    {
      name: 'Eastbound - Platform 1',
      input: 'Eastbound - Platform 1',
      expected: {
        raw: 'Eastbound - Platform 1',
        label: '1',
        compassBound: 'eastbound',
        isUnknown: false,
      },
    },
    {
      name: 'Westbound - Platform 2',
      input: 'Westbound - Platform 2',
      expected: {
        raw: 'Westbound - Platform 2',
        label: '2',
        compassBound: 'westbound',
        isUnknown: false,
      },
    },
    {
      name: 'letter platform A',
      input: 'A',
      expected: { raw: 'A', label: 'A', isUnknown: false },
    },
    {
      name: 'letter platform B',
      input: 'B',
      expected: { raw: 'B', label: 'B', isUnknown: false },
    },
    {
      name: 'Platform 3 without compass',
      input: 'Platform 3',
      expected: { raw: 'Platform 3', label: '3', isUnknown: false },
    },
    {
      name: 'literal Platform Unknown',
      input: 'Platform Unknown',
      expected: { raw: 'Platform Unknown', isUnknown: true },
    },
    {
      name: 'undefined',
      input: undefined,
      expected: { isUnknown: false },
    },
    {
      name: 'empty string',
      input: '',
      expected: { raw: '', isUnknown: false },
    },
    {
      name: 'PA letter pair',
      input: 'PA',
      expected: { raw: 'PA', label: 'PA', isUnknown: false },
    },
  ])('$name', ({ input, expected }) => {
    expect(parseArrivalPlatform(input)).toEqual(expected);
  });
});

describe('normalizeArrival', () => {
  const liverpoolStreetElizabeth: TflApiPresentationEntitiesPrediction = {
    id: 'elz-1',
    lineId: 'elizabeth',
    lineName: 'Elizabeth line',
    modeName: 'elizabeth-line',
    platformName: 'A',
    towards: '',
    destinationName: 'Abbey Wood Rail Station',
    timeToStation: 180,
  };

  const wappingOverground: TflApiPresentationEntitiesPrediction = {
    id: 'wdr-1',
    lineId: 'windrush',
    lineName: 'Windrush',
    modeName: 'overground',
    platformName: '1',
    towards: '',
    destinationName: 'Highbury & Islington Rail Station',
    timeToStation: 90,
  };

  const centralTube: TflApiPresentationEntitiesPrediction = {
    id: 'cen-1',
    lineId: 'central',
    lineName: 'Central',
    modeName: 'tube',
    platformName: 'Westbound - Platform 1',
    towards: 'Ealing Broadway',
    destinationName: 'Ealing Broadway Underground Station',
    timeToStation: 45,
  };

  const unknownPlatform: TflApiPresentationEntitiesPrediction = {
    id: 'unk-1',
    lineId: 'central',
    platformName: 'Platform Unknown',
    towards: 'Epping',
    destinationName: 'Epping Underground Station',
  };

  test('normalises Elizabeth line empty towards and letter platform', () => {
    expect(normalizeArrival(liverpoolStreetElizabeth)).toEqual(
      expect.objectContaining({
        id: 'elz-1',
        destination: { name: 'Abbey Wood Rail Station', source: 'destinationName' },
        platform: { raw: 'A', label: 'A', isUnknown: false },
      })
    );
  });

  test('normalises Overground empty towards and numbered platform', () => {
    expect(normalizeArrival(wappingOverground)).toEqual(
      expect.objectContaining({
        destination: { name: 'Highbury & Islington Rail Station', source: 'destinationName' },
        platform: { raw: '1', label: '1', isUnknown: false },
      })
    );
  });

  test('keeps Tube towards and compass platform', () => {
    expect(normalizeArrival(centralTube)).toEqual(
      expect.objectContaining({
        destination: { name: 'Ealing Broadway', source: 'towards' },
        platform: {
          raw: 'Westbound - Platform 1',
          label: '1',
          compassBound: 'westbound',
          isUnknown: false,
        },
      })
    );
  });

  test('marks Platform Unknown without a label', () => {
    expect(normalizeArrival(unknownPlatform).platform).toEqual({
      raw: 'Platform Unknown',
      isUnknown: true,
    });
  });

  test('normalizeArrivals maps every row', () => {
    const rows = normalizeArrivals([liverpoolStreetElizabeth, centralTube]);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.destination.source).toBe('destinationName');
    expect(rows[1]?.destination.source).toBe('towards');
  });

  test('normalizeArrivalDeparture only adds a parsed platform', () => {
    expect(
      normalizeArrivalDeparture({
        platformName: 'B',
        destinationName: 'Paddington',
      })
    ).toEqual({
      platformName: 'B',
      destinationName: 'Paddington',
      platform: { raw: 'B', label: 'B', isUnknown: false },
    });
  });
});
