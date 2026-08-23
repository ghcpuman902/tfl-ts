import {
  busSearchNameMatches,
  isBoardableBusStopId,
  isSmsCodeQuery,
  mergeStopsById,
  parseBusStopSearchQuery,
  pickNamedExpandableMatches,
  preferStopsMatchingSearch,
  rankStopsBySearchLetter,
  resolveBusNameSearchHits,
} from '../utils/busStopSearch';

describe('isBoardableBusStopId', () => {
  test('accepts boarding 490… ids and rejects hubs', () => {
    expect(isBoardableBusStopId('490000091G')).toBe(true);
    expect(isBoardableBusStopId('HUBLBG')).toBe(false);
    expect(isBoardableBusStopId('490G00014016')).toBe(false);
  });
});

describe('isSmsCodeQuery', () => {
  test('accepts a 5-digit Countdown code', () => {
    expect(isSmsCodeQuery('51800')).toBe(true);
    expect(isSmsCodeQuery('Trafalgar')).toBe(false);
  });
});

describe('busSearchNameMatches', () => {
  test('matches a distinctive street token, not the word road', () => {
    expect(busSearchNameMatches('Silverthorne Road', 'Silverthorne Road')).toBe(
      true,
    );
    expect(busSearchNameMatches('Prairie Street', 'Silverthorne Road')).toBe(
      false,
    );
  });

  test('does not treat circus as a distinctive token', () => {
    expect(
      busSearchNameMatches("St George's Circus", 'Silverthorne Road'),
    ).toBe(false);
    expect(
      busSearchNameMatches("St George's Circus", "St George's Circus"),
    ).toBe(true);
  });

  test('matches Trafalgar Square for the abbreviation Sq', () => {
    expect(busSearchNameMatches('Trafalgar Square', 'Trafalgar Sq')).toBe(true);
    expect(
      busSearchNameMatches(
        'Charing Cross Stn / Trafalgar Square',
        'Trafalgar Sq',
      ),
    ).toBe(true);
  });
});

describe('pickNamedExpandableMatches', () => {
  test('keeps every name-matching hub, not only the first', () => {
    const picked = pickNamedExpandableMatches(
      [
        { name: 'Silverthorne Road', lat: 51.47, lon: -0.148 },
        { name: 'Silverthorne Road', lat: 51.46, lon: -0.145 },
        { name: 'Prairie Street', lat: 51.47, lon: -0.147 },
      ],
      'Silverthorne Road',
    );
    expect(picked).toHaveLength(2);
    expect(picked[0]?.lon).toBe(-0.148);
    expect(picked[1]?.lon).toBe(-0.145);
  });

  test('skips boarding 490 stops so mixed TfL hits still expand hubs', () => {
    const picked = pickNamedExpandableMatches(
      [
        {
          id: '490013766E',
          name: 'Charing Cross Stn / Trafalgar Square',
          lat: 51.508,
          lon: -0.126,
        },
        {
          id: '490013766F',
          name: 'Charing Cross Stn / Trafalgar Square',
          lat: 51.508,
          lon: -0.126,
        },
        {
          id: '490G000803',
          name: 'Trafalgar Square / Charing Cross Stn',
          lat: 51.509,
          lon: -0.126,
        },
        {
          id: '490G000804',
          name: 'Northumberland Avenue / Trafalgar Square',
          lat: 51.508,
          lon: -0.13,
        },
        {
          id: '490G000832',
          name: 'Whitehall / Trafalgar Square',
          lat: 51.506,
          lon: -0.127,
        },
      ],
      'Trafalgar Sq',
    );
    expect(picked.map((match) => match.id)).toEqual([
      '490G000803',
      '490G000804',
      '490G000832',
    ]);
  });
});

describe('preferStopsMatchingSearch', () => {
  test('drops nearby streets when any stop name matches', () => {
    const preferred = preferStopsMatchingSearch(
      [
        { id: 'a', name: 'Silverthorne Road' },
        { id: 'b', name: 'Prairie Street' },
        { id: 'c', name: 'Silverthorne Road' },
      ],
      'Silverthorne Road',
    );
    expect(preferred.map((stop) => stop.id)).toEqual(['a', 'c']);
  });
});

describe('mergeStopsById', () => {
  test('dedupes across hub expansions', () => {
    const merged = mergeStopsById([
      [{ id: 'a' }, { id: 'b' }],
      [{ id: 'b' }, { id: 'c' }],
    ]);
    expect(merged.map((stop) => stop.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('parseBusStopSearchQuery', () => {
  test('strips a Google (Stop Y) suffix and keeps the letter', () => {
    expect(parseBusStopSearchQuery('Rookery Road (Stop Y)')).toEqual({
      query: 'Rookery Road',
      stopLetter: 'Y',
    });
    expect(parseBusStopSearchQuery('Rookery Road (Y)')).toEqual({
      query: 'Rookery Road',
      stopLetter: 'Y',
    });
    expect(parseBusStopSearchQuery('Rookery Road Stop Y')).toEqual({
      query: 'Rookery Road',
      stopLetter: 'Y',
    });
  });

  test('leaves a plain street query unchanged', () => {
    expect(parseBusStopSearchQuery('Silverthorne Road')).toEqual({
      query: 'Silverthorne Road',
    });
  });
});

describe('rankStopsBySearchLetter', () => {
  test('pins the matching letter first and keeps the other stops', () => {
    const ranked = rankStopsBySearchLetter(
      [
        { id: 'n', stopLetter: 'N' },
        { id: 'y', stopLetter: 'Y' },
      ],
      'Y',
    );
    expect(ranked.map((stop) => stop.id)).toEqual(['y', 'n']);
  });
});

describe('resolveBusNameSearchHits', () => {
  test('unions boarding hits with hub expansion, not only two boarding stops', () => {
    const result = resolveBusNameSearchHits(
      [
        {
          id: '490013766E',
          name: 'Charing Cross Stn / Trafalgar Square',
          stopLetter: 'E',
        },
        {
          id: '490013766F',
          name: 'Charing Cross Stn / Trafalgar Square',
          stopLetter: 'F',
        },
      ],
      [
        [
          {
            id: '490000091A',
            name: 'Whitehall / Trafalgar Square',
            stopLetter: 'A',
          },
          {
            id: '490000091G',
            name: 'Trafalgar Square',
            stopLetter: 'G',
          },
        ],
      ],
      'Trafalgar Sq',
    );
    expect(result.map((stop) => stop.id)).toEqual([
      '490013766E',
      '490013766F',
      '490000091A',
      '490000091G',
    ]);
  });
});
