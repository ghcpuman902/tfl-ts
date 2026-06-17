import { TflHttpClient } from '../core/http';
import { TflHttpError, TflNetworkError } from '../errors';

const mockFetch = jest.fn();

describe('TflHttpClient', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  const createClient = (overrides: Partial<{ maxRetries: number; retryDelay: number }> = {}) =>
    new TflHttpClient({
      appId: 'test-id',
      appKey: 'test-key',
      maxRetries: overrides.maxRetries ?? 0,
      retryDelay: overrides.retryDelay ?? 1,
    });

  test('should append auth query params and strip $type fields by default', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ $type: 'TflApi.Presentation.Entities.Line, Tfl.Api.Presentation.Entities', id: 'central' }),
    });

    const client = createClient();
    const result = await client.request<{ id: string }>({ path: '/Line/central' });

    expect(result).toEqual({ id: 'central' });
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const calledUrl = String(mockFetch.mock.calls[0][0]);
    expect(calledUrl).toContain('app_id=test-id');
    expect(calledUrl).toContain('app_key=test-key');
    expect(calledUrl).toContain('/Line/central');
  });

  test('should preserve $type fields when keepTflTypes is true', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ $type: 'TflApi.Presentation.Entities.Line, Tfl.Api.Presentation.Entities', id: 'central' }),
    });

    const client = createClient();
    const result = await client.request<{ $type?: string; id: string }>({
      path: '/Line/central',
      keepTflTypes: true,
    });

    expect(result.$type).toContain('TflApi.Presentation.Entities.Line');
    expect(result.id).toBe('central');
  });

  test('should serialize array query params as comma-separated values', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([]),
    });

    const client = createClient();
    await client.request({
      path: '/Line/Mode/tube/Status',
      query: { ids: ['central', 'victoria'] },
    });

    const calledUrl = String(mockFetch.mock.calls[0][0]);
    expect(calledUrl).toContain('ids=central%2Cvictoria');
  });

  test('should throw TflHttpError for non-OK responses', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => 'missing',
    });

    const client = createClient();

    await expect(client.request({ path: '/Line/missing' })).rejects.toBeInstanceOf(TflHttpError);
  });

  test('should retry retryable server errors', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        text: async () => 'busy',
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ok: true }),
      });

    const client = createClient({ maxRetries: 1, retryDelay: 0 });
    const result = await client.request<{ ok: boolean }>({ path: '/Mode' });

    expect(result).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  test('should wrap network failures as TflNetworkError', async () => {
    mockFetch.mockRejectedValueOnce(new Error('fetch failed'));

    const client = createClient();

    await expect(client.request({ path: '/Mode' })).rejects.toBeInstanceOf(TflNetworkError);
  });
});
