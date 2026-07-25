import TflClient from '../index';
import { TflHttpError } from '../errors';

const mockFetch = jest.fn();

describe('Journey.plan disambiguation', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
    process.env.TFL_APP_ID = 'test-app-id';
    process.env.TFL_APP_KEY = 'test-app-key';
  });

  test('returns disambiguation options for HTTP 300 instead of throwing', async () => {
    const body = {
      $type: 'Tfl.Api.Presentation.Entities.JourneyPlanner.DisambiguationResult',
      toLocationDisambiguation: {
        $type: 'Tfl.Api.Presentation.Entities.JourneyPlanner.Disambiguation',
        matchStatus: 'list',
        disambiguationOptions: [
          {
            parameterValue: '1000013',
            uri: '/journey/journeyresults/westminster/to/1000013',
            place: {
              commonName: 'City of London, Bank',
              placeType: 'StopPoint',
              url: '/StopPoint/HUBBAN',
              lat: 51.51,
              lon: -0.08,
            },
            matchQuality: 1000,
          },
        ],
      },
    };

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 300,
      statusText: 'Multiple Choices',
      text: async () => JSON.stringify(body),
    });

    const client = new TflClient({ maxRetries: 0 });
    const result = await client.journey.plan({
      from: 'Westminster',
      to: 'Bank',
    });

    expect(result.journeys).toEqual([]);
    expect(result.disambiguation).toBeDefined();
    expect(result.disambiguation?.toLocationDisambiguation?.matchStatus).toBe('list');
    expect(
      result.disambiguation?.toLocationDisambiguation?.disambiguationOptions[0].parameterValue,
    ).toBe('1000013');
    expect(result.disambiguation).not.toHaveProperty('$type');
    expect(result.stopMessages?.[0]).toContain('Disambiguation required');
  });

  test('rethrows non-300 HTTP errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: async () => 'boom',
    });

    const client = new TflClient({ maxRetries: 0 });

    await expect(
      client.journey.plan({ from: '940GZZLUOXC', to: '940GZZLUVIC' }),
    ).rejects.toBeInstanceOf(TflHttpError);
  });
});
