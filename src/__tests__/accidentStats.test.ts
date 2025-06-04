import { config } from 'dotenv';
import { AccidentStats } from '../accidentStats';
import { Api } from '../tfl';

// Mock the environment variables
config({ path: '.env.test' });

// Mock the API class
jest.mock('../tfl', () => ({
  Api: jest.fn().mockImplementation(() => ({
    accidentStats: {
      accidentStatsGet: jest.fn().mockResolvedValue({ data: [] }),
    }
  }))
}));

describe('AccidentStats Service', () => {
  let accidentStats: AccidentStats;
  let mockApi: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApi = new Api();
    accidentStats = new AccidentStats(mockApi);
  });

  it('should get accident statistics for a specific year', async () => {
    const result = await accidentStats.get({ year: 2020 });
    expect(mockApi.accidentStats.accidentStatsGet).toHaveBeenCalledWith(2020);
    expect(result).toEqual([]);
  });
}); 