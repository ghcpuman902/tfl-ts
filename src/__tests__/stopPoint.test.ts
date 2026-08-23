import TflClient from '../index';

process.env.TFL_APP_KEY = 'test-app-key';
delete process.env.TFL_APP_ID;

const mockFetch = jest.fn();

describe('StopPoint.getByGeoPoint', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test('should send lat/lon query params, not location.lat/location.lon', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stopPoints: [{ id: '940GZZ12345', commonName: 'Test Stop' }] }),
    });

    const client = new TflClient();
    await client.stopPoint.getByGeoPoint({
      lat: 51.508,
      lon: -0.065,
      radius: 400,
      modes: ['bus'],
      stoptypes: ['NaptanPublicBusCoachTram'],
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const calledUrl = String(mockFetch.mock.calls[0][0]);

    expect(calledUrl).toContain('lat=51.508');
    expect(calledUrl).toContain('lon=-0.065');
    expect(calledUrl).toContain('radius=400');
    expect(calledUrl).toContain('modes=bus');
    expect(calledUrl).toContain('stopTypes=NaptanPublicBusCoachTram');
    expect(calledUrl).not.toContain('location.lat');
    expect(calledUrl).not.toContain('location.lon');
  });

  test('lifts CompassPoint, Towards, and smsCode onto geo hits', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        stopPoints: [
          {
            id: '490013766E',
            commonName: 'Charing Cross Stn / Trafalgar Square',
            indicator: 'Stop E',
            stopLetter: 'E',
            smsCode: '50435',
            additionalProperties: [
              { key: 'CompassPoint', value: 'E' },
              { key: 'Towards', value: 'Aldwych' },
              { key: 'WiFi', value: 'yes' },
            ],
          },
        ],
      }),
    });

    const client = new TflClient();
    const response = await client.stopPoint.getByGeoPoint({
      lat: 51.508,
      lon: -0.126,
      modes: ['bus'],
    });

    expect(response.stopPoints?.[0]).toEqual(
      expect.objectContaining({
        id: '490013766E',
        towards: 'Aldwych',
        compassPoint: 'E',
        compassBearingDegrees: 90,
        smsCode: '50435',
      })
    );
    expect(
      response.stopPoints?.[0]?.additionalProperties?.some((prop) => prop.key === 'WiFi')
    ).toBe(true);
  });

  test('should default stopTypes to bus-relevant types when omitted', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ stopPoints: [] }),
    });

    const client = new TflClient();
    await client.stopPoint.getByGeoPoint({
      lat: 51.508,
      lon: -0.065,
      radius: 400,
      modes: ['bus'],
    });

    const calledUrl = String(mockFetch.mock.calls[0][0]);
    expect(calledUrl).toContain('stopTypes=NaptanBusCoachStation');
    expect(calledUrl).toContain('NaptanPublicBusCoachTram');
  });
});

describe('StopPoint.get', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test('lifts Direction fields and keeps the additionalProperties bag', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: '490014016N',
          commonName: 'The Highway',
          indicator: '->N',
          stopLetter: '->N',
          additionalProperties: [
            { key: 'CompassPoint', value: 'N' },
            { key: 'Towards', value: 'Liverpool Street' },
          ],
        },
      ],
    });

    const client = new TflClient();
    const stops = await client.stopPoint.get({ stopPointIds: ['490014016N'] });

    expect(stops).toHaveLength(1);
    expect(stops[0]).toEqual(
      expect.objectContaining({
        id: '490014016N',
        towards: 'Liverpool Street',
        compassPoint: 'N',
        compassBearingDegrees: 0,
        stopLetter: '->N',
      })
    );
  });
});

describe('StopPoint.getNormalizedArrivals', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test('fetches the same way as getArrivals and maps every row', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 'elz-1',
          lineId: 'elizabeth',
          lineName: 'Elizabeth line',
          modeName: 'elizabeth-line',
          platformName: 'A',
          towards: '',
          destinationName: 'Abbey Wood Rail Station',
          timeToStation: 180,
        },
      ],
    });

    const client = new TflClient();
    const arrivals = await client.stopPoint.getNormalizedArrivals({
      stopPointIds: ['910GLIVST'],
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(String(mockFetch.mock.calls[0][0])).toContain('910GLIVST');

    expect(arrivals).toHaveLength(1);
    expect(arrivals[0]).toEqual(
      expect.objectContaining({
        id: 'elz-1',
        destination: { name: 'Abbey Wood Rail Station', source: 'destinationName' },
        platform: { raw: 'A', label: 'A', isUnknown: false },
      })
    );
  });

  test('sorts the same as getArrivals when sortBy is given', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 'a', lineId: 'central', timeToStation: 300, towards: 'Epping', destinationName: '' },
        { id: 'b', lineId: 'central', timeToStation: 60, towards: 'Epping', destinationName: '' },
      ],
    });

    const client = new TflClient();
    const arrivals = await client.stopPoint.getNormalizedArrivals({
      stopPointIds: ['940GZZLULVT'],
      sortBy: 'timeToStation',
    });

    expect(arrivals.map((a) => a.id)).toEqual(['b', 'a']);
  });
});

describe('StopPoint.searchBusStops', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test('expands named 490G hubs instead of returning only two boarding hits', async () => {
    mockFetch.mockImplementation(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/StopPoint/Search/')) {
        return {
          ok: true,
          json: async () => ({
            matches: [
              {
                id: '490013766E',
                name: 'Charing Cross Stn / Trafalgar Square',
                modes: ['bus'],
                lat: 51.508,
                lon: -0.126,
                platformName: 'E',
              },
              {
                id: '490013766F',
                name: 'Charing Cross Stn / Trafalgar Square',
                modes: ['bus'],
                lat: 51.508,
                lon: -0.126,
                platformName: 'F',
              },
              {
                id: '490G000803',
                name: 'Trafalgar Square / Charing Cross Stn',
                modes: ['bus'],
                lat: 51.509,
                lon: -0.126,
              },
              {
                id: '490G000804',
                name: 'Northumberland Avenue / Trafalgar Square',
                modes: ['bus'],
                lat: 51.508,
                lon: -0.13,
              },
              {
                id: '490G000832',
                name: 'Whitehall / Trafalgar Square',
                modes: ['bus'],
                lat: 51.506,
                lon: -0.127,
              },
            ],
          }),
        };
      }
      if (url.includes('/StopPoint?') || url.includes('/StopPoint&')) {
        return {
          ok: true,
          json: async () => ({
            stopPoints: [
              {
                id: '490013766E',
                commonName: 'Charing Cross Stn / Trafalgar Square',
                modes: ['bus'],
                stopLetter: 'E',
                distance: 10,
              },
              {
                id: '490000091A',
                commonName: 'Whitehall / Trafalgar Square',
                modes: ['bus'],
                stopLetter: 'A',
                distance: 40,
              },
              {
                id: '490000091G',
                commonName: 'Trafalgar Square',
                modes: ['bus'],
                stopLetter: 'G',
                distance: 80,
              },
            ],
          }),
        };
      }
      return {
        ok: true,
        json: async () => ({}),
      };
    });

    const client = new TflClient();
    const stops = await client.stopPoint.searchBusStops('Trafalgar Sq');

    expect(stops.map((stop) => stop.id)).toEqual(
      expect.arrayContaining([
        '490013766E',
        '490013766F',
        '490000091A',
        '490000091G',
      ]),
    );
    expect(stops.length).toBeGreaterThan(2);
    expect(mockFetch.mock.calls.some((call) => String(call[0]).includes('/StopPoint/Search/'))).toBe(
      true,
    );
    expect(
      mockFetch.mock.calls.filter((call) => {
        const url = String(call[0]);
        return url.includes('lat=') && !url.includes('/Search/');
      }).length,
    ).toBe(3);
  });
});
