import { config } from 'dotenv';
import TflClient from '..';


// Mock the environment variables
config({ path: '.env.test' });


// Mock the API class with the new structure
jest.mock('../tfl', () => ({
  Api: jest.fn().mockImplementation(() => ({
    line: {
      lineStatusByMode: jest.fn().mockResolvedValue({
        data: [
          {
            id: 'victoria',
            name: 'Victoria',
            modeName: 'tube',
            disruptions: [],
            created: '',
            modified: '',
            lineStatuses: [{ 
              statusSeverity: 10, 
              statusSeverityDescription: 'Good Service',
              validityPeriods: []
            }],
            routeSections: [],
            serviceTypes: [],
            crowding: {
              crowdingDescription: '',
              crowdingLevel: 0
            }
          },
          {
            id: 'central',
            name: 'Central',
            modeName: 'tube',
            disruptions: [],
            created: '',
            modified: '',
            lineStatuses: [{ 
              statusSeverity: 10, 
              statusSeverityDescription: 'Good Service',
              validityPeriods: []
            }],
            routeSections: [],
            serviceTypes: [],
            crowding: {
              crowdingDescription: '',
              crowdingLevel: 0
            }
          }
        ]
      }),
      lineMetaModes: jest.fn().mockResolvedValue({
        data: [{ modeName: 'tube' }, { modeName: 'bus' }]
      })
    }
  }))
}));

describe('TFL API Client', () => {
  let client: TflClient;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with environment variables', () => {
      client = new TflClient();
      expect(client).toBeInstanceOf(TflClient);
    });

    it('should initialize with direct configuration', () => {
      client = new TflClient({
        appId: 'test-app-id',
        appKey: 'test-app-key'
      });
      expect(client).toBeInstanceOf(TflClient);
    });

    it('should throw error if credentials are missing', () => {
      // Temporarily remove env variables
      const oldAppId = process.env.TFL_APP_ID;
      const oldAppKey = process.env.TFL_APP_KEY;
      delete process.env.TFL_APP_ID;
      delete process.env.TFL_APP_KEY;

      expect(() => new TflClient()).toThrow('Missing TFL API credentials');
      expect(() => new TflClient({})).toThrow('Missing TFL API credentials');

      // Restore env variables
      process.env.TFL_APP_ID = oldAppId;
      process.env.TFL_APP_KEY = oldAppKey;
    });

    it('should prioritize direct configuration over environment variables', () => {
      const directConfig = {
        appId: 'direct-app-id',
        appKey: 'direct-app-key'
      };
      client = new TflClient(directConfig);
      expect(client).toBeInstanceOf(TflClient);
    });
  });

  describe('line.getStatus', () => {
    it('should return line statuses for given modes', async () => {
      client = new TflClient();
      const result = await client.line.getStatus({ modes: ['tube'] });

      expect(result).toEqual([
        {
          id: 'victoria',
          name: 'Victoria',
          modeName: 'tube',
          disruptions: [],
          created: '',
          modified: '',
          lineStatuses: [{
            statusSeverity: 10,
            statusSeverityDescription: 'Good Service',
            validityPeriods: []
          }],
          routeSections: [],
          serviceTypes: [],
          crowding: {
            crowdingDescription: '',
            crowdingLevel: 0
          }
        },
        {
          id: 'central',
          name: 'Central',
          modeName: 'tube',
          disruptions: [],
          created: '',
          modified: '',
          lineStatuses: [{
            statusSeverity: 10,
            statusSeverityDescription: 'Good Service',
            validityPeriods: []
          }],
          routeSections: [],
          serviceTypes: [],
          crowding: {
            crowdingDescription: '',
            crowdingLevel: 0
          }
        }
      ]);
    });

    it('should handle errors gracefully when fetching by mode', async () => {
      const mockApi = require('../tfl').Api.mock.results[0].value;
      mockApi.line.lineStatusByMode.mockRejectedValueOnce(new Error('API Error'));

      await expect(client.line.getStatus({ modes: ['tube'] })).rejects.toThrow('API Error');
    });

    it('should fetch all modes when no modes are specified', async () => {
      const result = await client.line.getStatus();
      
      // Verify that lineMetaModes was called to get all modes
      const mockApi = require('../tfl').Api.mock.results[0].value;
      expect(mockApi.line.lineMetaModes).toHaveBeenCalled();
      expect(mockApi.line.lineStatusByMode).toHaveBeenCalledWith(
        { modes: ['tube', 'bus'] }
      );
    });
  });
}); 