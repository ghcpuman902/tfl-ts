import TflClient, { TflConfigError } from '../index';

describe('TflClient credentials', () => {
  const originalAppId = process.env.TFL_APP_ID;
  const originalAppKey = process.env.TFL_APP_KEY;

  beforeEach(() => {
    delete process.env.TFL_APP_ID;
    delete process.env.TFL_APP_KEY;
  });

  afterAll(() => {
    if (originalAppId === undefined) {
      delete process.env.TFL_APP_ID;
    } else {
      process.env.TFL_APP_ID = originalAppId;
    }
    if (originalAppKey === undefined) {
      delete process.env.TFL_APP_KEY;
    } else {
      process.env.TFL_APP_KEY = originalAppKey;
    }
  });

  test('constructs with appKey only', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const client = new TflClient({ appKey: 'test-key' });

    expect(client.getConfig().appKey).toBe('test-key');
    expect(client.getConfig().appId).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  test('keeps appId when both are passed', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const client = new TflClient({ appId: 'test-id', appKey: 'test-key' });

    expect(client.getConfig().appId).toBe('test-id');
    expect(client.getConfig().appKey).toBe('test-key');
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('appKey / TFL_APP_KEY (Primary key) is enough'),
    );
    warn.mockRestore();
  });

  test('throws when appKey is missing', () => {
    expect(() => new TflClient()).toThrow(TflConfigError);
    expect(() => new TflClient()).toThrow(/Missing TFL_APP_KEY/);
    expect(() => new TflClient()).toThrow(/500 Requests per min/);
    expect(() => new TflClient()).toThrow(/api-portal\.tfl\.gov\.uk/);
    expect(() => new TflClient()).toThrow(/Primary key/);

    try {
      new TflClient();
    } catch (error) {
      expect(String(error)).not.toMatch(/app_id/i);
      expect(String(error)).not.toMatch(/TFL_APP_ID/);
      expect(String(error)).not.toMatch(/appId/);
    }
  });

  test('throws when only TFL_APP_ID is set', () => {
    process.env.TFL_APP_ID = 'test-id';
    expect(() => new TflClient()).toThrow(/Missing TFL_APP_KEY/);
  });
});
