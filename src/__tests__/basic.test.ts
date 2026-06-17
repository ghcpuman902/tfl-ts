import TflClient from '../index';
import { ENDPOINTS, ENDPOINT_COUNT } from '../generated/endpoints';

process.env.TFL_APP_ID = 'test-app-id';
process.env.TFL_APP_KEY = 'test-app-key';

describe('TflClient', () => {
  let client: TflClient;

  beforeEach(() => {
    client = new TflClient();
  });

  test('should create client instance', () => {
    expect(client).toBeInstanceOf(TflClient);
  });

  test('should have all required API modules', () => {
    expect(client.line).toBeDefined();
    expect(client.stopPoint).toBeDefined();
    expect(client.journey).toBeDefined();
    expect(client.mode).toBeDefined();
    expect(client.road).toBeDefined();
    expect(client.bikePoint).toBeDefined();
    expect(client.cabwise).toBeDefined();
    expect(client.accidentStats).toBeDefined();
    expect(client.airQuality).toBeDefined();
    expect(client.search).toBeDefined();
    expect(client.vehicle).toBeDefined();
    expect(client.occupancy).toBeDefined();
    expect(client.place).toBeDefined();
    expect(client.travelTimes).toBeDefined();
  });

  test('should expose raw and realtime namespaces', () => {
    expect(client.raw).toBeDefined();
    expect(client.realtime).toBeDefined();
    expect(typeof client.raw.line.get).toBe('function');
    expect(typeof client.realtime.pollArrivals).toBe('function');
    expect(typeof client.realtime.pollLineArrivals).toBe('function');
    expect(typeof client.realtime.pollVehicleArrivals).toBe('function');
  });

  test('should expose every generated endpoint on client.raw', () => {
    expect(ENDPOINT_COUNT).toBe(84);
    expect(ENDPOINTS).toHaveLength(84);

    const missing: string[] = [];

    for (const endpoint of ENDPOINTS) {
      const namespace = (client.raw as unknown as Record<string, Record<string, unknown>>)[endpoint.tagKey];
      if (!namespace || typeof namespace[endpoint.methodName] !== 'function') {
        missing.push(`${endpoint.tagKey}.${endpoint.methodName}`);
      }
    }

    expect(missing).toEqual([]);
  });

  test('should have metadata constants', () => {
    expect(client.line.LINE_NAMES).toBeDefined();
    expect(client.line.MODE_NAMES).toBeDefined();
    expect(client.stopPoint.MODE_NAMES).toBeDefined();
    expect(client.search.SEARCH_PROVIDERS).toBeDefined();
    expect(client.place.PLACE_TYPES).toBeDefined();
    expect(client.travelTimes.DIRECTIONS).toBeDefined();
  });

  test('should have configuration', () => {
    const config = client.getConfig();
    expect(config.appId).toBe('test-app-id');
    expect(config.appKey).toBe('test-app-key');
    expect(config.timeout).toBe(30000);
    expect(config.maxRetries).toBe(3);
    expect(config.retryDelay).toBe(1000);
  });
});
