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
