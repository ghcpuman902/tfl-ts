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
