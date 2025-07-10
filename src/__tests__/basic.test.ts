import TflClient from '../index';

// Mock environment variables for testing
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
    expect(client.airQuality).toBeDefined();
    expect(client.accidentStats).toBeDefined();
  });

  test('should have metadata constants', () => {
    expect(client.line.LINE_NAMES).toBeDefined();
    expect(client.line.MODE_NAMES).toBeDefined();
    expect(client.stopPoint.MODE_NAMES).toBeDefined();
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