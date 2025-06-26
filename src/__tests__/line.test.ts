import { config } from 'dotenv';
import { Line } from '../line';
import { Api } from '../generated/tfl';

// Mock the environment variables
config({ path: '.env.test' });

// Mock the API class
jest.mock('../tfl', () => ({
  Api: jest.fn().mockImplementation(() => ({
    line: {
      lineGet: jest.fn().mockResolvedValue({ data: [] }),
      lineGetByMode: jest.fn().mockResolvedValue({ data: [] }),
      lineStatus: jest.fn().mockResolvedValue({ data: [] }),
      lineStatusByMode: jest.fn().mockResolvedValue({ data: [] }),
      lineLineRoutesByIds: jest.fn().mockResolvedValue({ data: [] }),
      lineRouteByMode: jest.fn().mockResolvedValue({ data: [] }),
    }
  }))
}));

describe('Line Service', () => {
  let line: Line;
  let mockApi: any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApi = new Api();
    line = new Line(mockApi);
  });

  it('should get line information', async () => {
    const result = await line.get({ ids: ['central'] });
    expect(mockApi.line.lineGet).toHaveBeenCalledWith(['central']);
    expect(result).toEqual([]);
  });

  it('should get line route information', async () => {
    const result = await line.getRoute({ ids: ['central'] });
    expect(mockApi.line.lineLineRoutesByIds).toHaveBeenCalledWith({ ids: ['central'], serviceTypes: undefined });
    expect(result).toEqual([]);
  });

  it('should get line status information', async () => {
    const result = await line.getStatus({ modes: ['tube'] });
    expect(mockApi.line.lineStatusByMode).toHaveBeenCalledWith({ modes: ['tube'], });
    expect(result).toEqual([]);
  });
}); 