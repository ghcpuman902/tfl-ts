/**
 * Cabwise API Module
 * 
 * Provides access to taxi and minicab contact information through the TfL Cabwise service.
 * This module allows users to search for nearby taxi and minicab services based on location.
 */

// Types from tfl.ts
export interface CabwiseGetParams {
  /**
   * Latitude
   * @format double
   */
  lat: number;
  /**
   * Longitude
   * @format double
   */
  lon: number;
  /** Operator Type e.g Minicab, Executive, Limousine */
  optype?: string;
  /** Wheelchair accessible */
  wc?: string;
  /**
   * The radius of the bounding circle in metres
   * @format double
   */
  radius?: number;
  /** Trading name of operating company */
  name?: string;
  /**
   * An optional parameter to limit the number of results return. Default and maximum is 20.
   * @format int32
   */
  maxResults?: number;
  /** Legacy Format */
  legacyFormat?: boolean;
  /** Force Xml */
  forceXml?: boolean;
  /** Twenty Four Seven Only */
  twentyFourSevenOnly?: boolean;
}

export type SystemObject = object;

/**
 * Cabwise API class providing access to taxi and minicab services
 */
export class CabwiseApi {
  private api: any;

  constructor(api: any) {
    this.api = api;
  }

  /**
   * Static metadata about the Cabwise API
   */
  static readonly SECTION = 'Cabwise';
  static readonly ENDPOINTS = [
    {
      path: '/Cabwise/search',
      method: 'GET',
      summary: 'Gets taxis and minicabs contact information',
      parameters: [
        { name: 'lat', type: 'number', required: true, description: 'Latitude' },
        { name: 'lon', type: 'number', required: true, description: 'Longitude' },
        { name: 'optype', type: 'string', required: false, description: 'Operator Type e.g Minicab, Executive, Limousine' },
        { name: 'wc', type: 'string', required: false, description: 'Wheelchair accessible' },
        { name: 'radius', type: 'number', required: false, description: 'The radius of the bounding circle in metres' },
        { name: 'name', type: 'string', required: false, description: 'Trading name of operating company' },
        { name: 'maxResults', type: 'number', required: false, description: 'An optional parameter to limit the number of results return. Default and maximum is 20.' },
        { name: 'legacyFormat', type: 'boolean', required: false, description: 'Legacy Format' },
        { name: 'forceXml', type: 'boolean', required: false, description: 'Force Xml' },
        { name: 'twentyFourSevenOnly', type: 'boolean', required: false, description: 'Twenty Four Seven Only' }
      ],
      returnType: 'Object',
      deprecated: false,
      tags: ['Cabwise']
    }
  ];
  static readonly TOTAL_ENDPOINTS = 1;

  /**
   * Gets taxis and minicabs contact information
   * 
   * @param params - Search parameters including location and optional filters
   * @returns Promise resolving to taxi and minicab contact information
   * 
   * @example
   * ```typescript
   * const cabwise = new CabwiseApi(api);
   * 
   * // Search for nearby taxi services
   * const results = await cabwise.search({
   *   lat: 51.5074,
   *   lon: -0.1278,
   *   radius: 1000,
   *   maxResults: 10
   * });
   * 
   * // Search for wheelchair accessible services
   * const accessibleResults = await cabwise.search({
   *   lat: 51.5074,
   *   lon: -0.1278,
   *   wc: 'true',
   *   optype: 'Minicab'
   * });
   * ```
   */
  async search(params: CabwiseGetParams): Promise<SystemObject> {
    return this.api.cabwise.cabwiseGet(params);
  }

  /**
   * Utility method to search for taxi services with common filters
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param options - Optional search parameters
   * @returns Promise resolving to taxi and minicab contact information
   */
  async searchNearby(
    lat: number,
    lon: number,
    options: {
      radius?: number;
      maxResults?: number;
      wheelchairAccessible?: boolean;
      operatorType?: string;
      companyName?: string;
      twentyFourSeven?: boolean;
    } = {}
  ): Promise<SystemObject> {
    const params: CabwiseGetParams = {
      lat,
      lon,
      radius: options.radius,
      maxResults: options.maxResults,
      wc: options.wheelchairAccessible ? 'true' : undefined,
      optype: options.operatorType,
      name: options.companyName,
      twentyFourSevenOnly: options.twentyFourSeven
    };

    return this.search(params);
  }

  /**
   * Search for wheelchair accessible taxi services
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param radius - Search radius in metres (default: 1000)
   * @returns Promise resolving to wheelchair accessible taxi services
   */
  async searchWheelchairAccessible(
    lat: number,
    lon: number,
    radius: number = 1000
  ): Promise<SystemObject> {
    return this.search({
      lat,
      lon,
      radius,
      wc: 'true'
    });
  }

  /**
   * Search for specific operator types
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param operatorType - Type of operator (e.g., 'Minicab', 'Executive', 'Limousine')
   * @param radius - Search radius in metres (default: 1000)
   * @returns Promise resolving to services of the specified operator type
   */
  async searchByOperatorType(
    lat: number,
    lon: number,
    operatorType: string,
    radius: number = 1000
  ): Promise<SystemObject> {
    return this.search({
      lat,
      lon,
      radius,
      optype: operatorType
    });
  }

  /**
   * Search for 24/7 taxi services
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param radius - Search radius in metres (default: 1000)
   * @returns Promise resolving to 24/7 taxi services
   */
  async searchTwentyFourSeven(
    lat: number,
    lon: number,
    radius: number = 1000
  ): Promise<SystemObject> {
    return this.search({
      lat,
      lon,
      radius,
      twentyFourSevenOnly: true
    });
  }

  /**
   * Search for services by company name
   * 
   * @param lat - Latitude coordinate
   * @param lon - Longitude coordinate
   * @param companyName - Trading name of operating company
   * @param radius - Search radius in metres (default: 1000)
   * @returns Promise resolving to services matching the company name
   */
  async searchByCompany(
    lat: number,
    lon: number,
    companyName: string,
    radius: number = 1000
  ): Promise<SystemObject> {
    return this.search({
      lat,
      lon,
      radius,
      name: companyName
    });
  }
}

export default CabwiseApi; 