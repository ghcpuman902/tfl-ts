import { config } from 'dotenv';
import { AirQuality } from '../airQuality';
import { Api, SystemObject } from '../tfl';

// Mock the environment variables
config({ path: '.env.test' });

// Mock the API class
jest.mock('../tfl', () => ({
  Api: jest.fn().mockImplementation(() => ({
    airQuality: {
      airQualityGet: jest.fn().mockResolvedValue({ data: {} }),
    }
  }))
}));

describe('AirQuality Service', () => {
  let airQuality: AirQuality;
  let mockApi: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApi = new Api();
    airQuality = new AirQuality(mockApi);
  });

  it('should get air quality information', async () => {
    const result = await airQuality.get();
    expect(mockApi.airQuality.airQualityGet).toHaveBeenCalled();
    expect(result).toEqual({});
  });
}); 