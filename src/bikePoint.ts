import { 
  Api, 
  TflApiPresentationEntitiesPlace
} from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';

// Import raw data from generated meta files
import { BIKEPOINT_DATA } from './generated/jsdoc/BikePoint';
import { ModeName } from './generated/meta/StopPoint';

/**
 * Bike point information returned by the TfL API
 * @example
 * {
 *   id: "BikePoints_1",
 *   url: "/Place/BikePoints_1",
 *   commonName: "River Street , Clerkenwell",
 *   placeType: "BikePoint",
 *   additionalProperties: [
 *     {
 *       category: "NumberOfBikes",
 *       key: "NbBikes",
 *       sourceSystemKey: "BikePoints",
 *       value: "5",
 *       modified: "2023-01-01T12:00:00Z"
 *     },
 *     {
 *       category: "NumberOfDocks",
 *       key: "NbDocks",
 *       sourceSystemKey: "BikePoints",
 *       value: "15",
 *       modified: "2023-01-01T12:00:00Z"
 *     },
 *     {
 *       category: "NumberOfEmptyDocks",
 *       key: "NbSpaces",
 *       sourceSystemKey: "BikePoints",
 *       value: "10",
 *       modified: "2023-01-01T12:00:00Z"
 *     }
 *   ],
 *   lat: 51.529163,
 *   lon: -0.10997
 * }
 */
export interface BikePointInfo {
  /** Unique identifier for the bike point */
  id?: string;
  /** URL to the bike point resource */
  url?: string;
  /** Human-readable name of the bike point */
  commonName?: string;
  /** Type of place (always "BikePoint") */
  placeType?: string;
  /** Additional properties containing bike point status */
  additionalProperties?: BikePointProperty[];
  /** WGS84 latitude of the location */
  lat?: number;
  /** WGS84 longitude of the location */
  lon?: number;
  /** Distance from search point (if applicable) */
  distance?: number;
}

/**
 * Bike point property containing status information
 * @example
 * {
 *   category: "NumberOfBikes",
 *   key: "NbBikes",
 *   sourceSystemKey: "BikePoints",
 *   value: "5",
 *   modified: "2023-01-01T12:00:00Z"
 * }
 */
export interface BikePointProperty {
  /** Category of the property */
  category?: string;
  /** Property key */
  key?: string;
  /** Source system key */
  sourceSystemKey?: string;
  /** Property value */
  value?: string;
  /** Last modified timestamp */
  modified?: string;
}

/**
 * Bike point status information
 * @example
 * {
 *   id: "BikePoints_1",
 *   name: "River Street , Clerkenwell",
 *   bikes: 5,
 *   docks: 15,
 *   spaces: 10,
 *   brokenDocks: 0,
 *   lat: 51.529163,
 *   lon: -0.10997
 * }
 */
export interface BikePointStatus {
  /** Bike point ID */
  id: string;
  /** Bike point name */
  name: string;
  /** Number of bikes available */
  bikes: number;
  /** Total number of docks */
  docks: number;
  /** Number of empty spaces */
  spaces: number;
  /** Number of broken docks (calculated) */
  brokenDocks: number;
  /** Latitude coordinate */
  lat?: number;
  /** Longitude coordinate */
  lon?: number;
}

/**
 * Query options for bike point search
 * @example
 * // Search for bike points near a location
 * const bikePoints = await client.bikePoint.search({
 *   query: "St. James",
 *   keepTflTypes: false
 * });
 */
interface BikePointSearchQuery {
  /** The search term (e.g., "St. James") */
  query: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Bike point class for interacting with TfL Bike Point API endpoints
 * @example
 * // Get all bike points
 * const allBikePoints = await client.bikePoint.get();
 * 
 * // Get specific bike point by ID
 * const bikePoint = await client.bikePoint.getById('BikePoints_1');
 * 
 * // Search for bike points
 * const searchResults = await client.bikePoint.search({ query: 'St. James' });
 * 
 * // Access static metadata (no HTTP request)
 * const endpoints = client.bikePoint.ENDPOINTS;
 * const totalEndpoints = client.bikePoint.TOTAL_ENDPOINTS;
 */
export class BikePoint {
  /** Available API endpoints (static, no HTTP request needed) */
  public readonly ENDPOINTS = BIKEPOINT_DATA.endpoints;

  /** Total number of available endpoints (static, no HTTP request needed) */
  public readonly TOTAL_ENDPOINTS = BIKEPOINT_DATA.totalEndpoints;

  /** API section name (static, no HTTP request needed) */
  public readonly SECTION = BIKEPOINT_DATA.section;

  /** Generation timestamp (static, no HTTP request needed) */
  public readonly GENERATED_AT = BIKEPOINT_DATA.generatedAt;

  /** Transport mode for bike points (static, no HTTP request needed) */
  public readonly MODE: ModeName = 'cycle-hire';

  /** Bike point property categories (static, no HTTP request needed) */
  public readonly PROPERTY_CATEGORIES = [
    'NumberOfBikes',
    'NumberOfDocks', 
    'NumberOfEmptyDocks'
  ] as const;

  /** Bike point property keys (static, no HTTP request needed) */
  public readonly PROPERTY_KEYS = [
    'NbBikes',
    'NbDocks',
    'NbSpaces'
  ] as const;

  constructor(private api: Api<{}>) {}

  /**
   * Gets all bike point locations
   * 
   * This method returns all bike point locations in London with their current status.
   * The Place object has an additionalProperties array which contains the nbBikes,
   * nbDocks and nbSpaces numbers which give the status of the BikePoint.
   * A mismatch in these numbers i.e. nbDocks - (nbBikes + nbSpaces) != 0 indicates broken docks.
   * 
   * @param options - Options for the request
   * @returns Promise resolving to an array of bike point information
   * @example
   * // Get all bike points
   * const allBikePoints = await client.bikePoint.get();
   * 
   * // Get all bike points with type fields preserved
   * const allBikePoints = await client.bikePoint.get({ keepTflTypes: true });
   * 
   * // Process bike point data
   * allBikePoints.forEach(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   console.log(`${status.name}: ${status.bikes} bikes, ${status.spaces} spaces available`);
   *   
   *   if (status.brokenDocks > 0) {
   *     console.log(`⚠️ ${status.brokenDocks} broken docks detected`);
   *   }
   * });
   * 
   * // Find bike points with available bikes
   * const availableBikePoints = allBikePoints.filter(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   return status.bikes > 0;
   * });
   * 
   * // Find bike points with available spaces
   * const availableSpaces = allBikePoints.filter(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   return status.spaces > 0;
   * });
   */
  async get(options: { keepTflTypes?: boolean } = {}): Promise<BikePointInfo[]> {
    return this.api.bikePoint.bikePointGetAll()
      .then((response: any) => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Gets the bike point with the given id
   * 
   * This method returns detailed information about a specific bike point,
   * including its current status (number of bikes, docks, and spaces).
   * 
   * @param id - A bike point id (a list of ids can be obtained from the get() method)
   * @param options - Options for the request
   * @returns Promise resolving to bike point information
   * @example
   * // Get specific bike point by ID
   * const bikePoint = await client.bikePoint.getById('BikePoints_1');
   * 
   * // Get bike point with type fields preserved
   * const bikePoint = await client.bikePoint.getById('BikePoints_1', { keepTflTypes: true });
   * 
   * // Extract and display status
   * if (bikePoint) {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   console.log(`Bike Point: ${status.name}`);
   *   console.log(`Available bikes: ${status.bikes}`);
   *   console.log(`Available spaces: ${status.spaces}`);
   *   console.log(`Total docks: ${status.docks}`);
   *   
   *   if (status.brokenDocks > 0) {
   *     console.log(`Broken docks: ${status.brokenDocks}`);
   *   }
   * }
   */
  async getById(id: string, options: { keepTflTypes?: boolean } = {}): Promise<BikePointInfo> {
    return this.api.bikePoint.bikePointGet(id)
      .then((response: any) => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Search for bike stations by their name
   * 
   * This method searches for bike stations by their name. A bike point's name often
   * contains information about the name of the street or nearby landmarks.
   * Note that the search result does not contain the PlaceProperties i.e. the status
   * or occupancy of the BikePoint. To get that information, you should retrieve
   * the BikePoint by its id using getById().
   * 
   * @param options - Query options for bike point search
   * @returns Promise resolving to an array of bike point information
   * @example
   * // Search for bike points by name
   * const searchResults = await client.bikePoint.search({ query: 'St. James' });
   * 
   * // Search with type fields preserved
   * const searchResults = await client.bikePoint.search({ 
   *   query: 'River Street',
   *   keepTflTypes: true 
   * });
   * 
   * // Process search results
   * searchResults.forEach(bikePoint => {
   *   console.log(`Found: ${bikePoint.commonName} (${bikePoint.id})`);
   *   console.log(`Location: ${bikePoint.lat}, ${bikePoint.lon}`);
   *   
   *   // Get detailed status for each result
   *   client.bikePoint.getById(bikePoint.id!).then(detailedBikePoint => {
   *     const status = client.bikePoint.extractStatus(detailedBikePoint);
   *     console.log(`Status: ${status.bikes} bikes, ${status.spaces} spaces`);
   *   });
   * });
   * 
   * // Search for bike points near landmarks
   * const nearLandmarks = await client.bikePoint.search({ query: 'Tower Bridge' });
   * const nearStations = await client.bikePoint.search({ query: 'Kings Cross' });
   */
  async search(options: BikePointSearchQuery): Promise<BikePointInfo[]> {
    const { query, keepTflTypes } = options;
    return this.api.bikePoint.bikePointSearch({ query })
      .then((response: any) => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Extract bike point status from bike point information
   * 
   * This utility method extracts the current status (bikes, docks, spaces)
   * from a bike point's additionalProperties array.
   * 
   * @param bikePoint - Bike point information
   * @returns Bike point status with calculated broken docks
   * @example
   * // Extract status from bike point data
   * const allBikePoints = await client.bikePoint.get();
   * 
   * allBikePoints.forEach(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   
   *   console.log(`${status.name}:`);
   *   console.log(`  Bikes available: ${status.bikes}`);
   *   console.log(`  Spaces available: ${status.spaces}`);
   *   console.log(`  Total docks: ${status.docks}`);
   *   
   *   if (status.brokenDocks > 0) {
   *     console.log(`  ⚠️ Broken docks: ${status.brokenDocks}`);
   *   }
   *   
   *   // Calculate availability percentage
   *   const availabilityPercent = (status.bikes / status.docks) * 100;
   *   console.log(`  Availability: ${availabilityPercent.toFixed(1)}%`);
   * });
   * 
   * // Find bike points with issues
   * const problematicBikePoints = allBikePoints.filter(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   return status.brokenDocks > 0 || status.bikes === 0;
   * });
   */
  extractStatus(bikePoint: BikePointInfo): BikePointStatus {
    const bikes = Number(this.getPropertyValue(bikePoint, 'NbBikes') || 0);
    const docks = Number(this.getPropertyValue(bikePoint, 'NbDocks') || 0);
    const spaces = Number(this.getPropertyValue(bikePoint, 'NbSpaces') || 0);
    
    // Calculate broken docks: total docks - (bikes + spaces)
    const brokenDocks = Math.max(0, docks - (bikes + spaces));
    
    return {
      id: bikePoint.id || '',
      name: bikePoint.commonName || '',
      bikes,
      docks,
      spaces,
      brokenDocks,
      lat: bikePoint.lat,
      lon: bikePoint.lon
    };
  }

  /**
   * Get property value from bike point additional properties
   * 
   * This helper method extracts a specific property value from the
   * bike point's additionalProperties array.
   * 
   * @param bikePoint - Bike point information
   * @param key - Property key to extract (e.g., 'NbBikes', 'NbDocks', 'NbSpaces')
   * @returns Property value as string or undefined if not found
   * @example
   * // Get specific property values
   * const bikePoint = await client.bikePoint.getById('BikePoints_1');
   * 
   * const bikes = client.bikePoint.getPropertyValue(bikePoint, 'NbBikes');
   * const docks = client.bikePoint.getPropertyValue(bikePoint, 'NbDocks');
   * const spaces = client.bikePoint.getPropertyValue(bikePoint, 'NbSpaces');
   * 
   * console.log(`Bikes: ${bikes}, Docks: ${docks}, Spaces: ${spaces}`);
   */
  getPropertyValue(bikePoint: BikePointInfo, key: string): string | undefined {
    return bikePoint.additionalProperties?.find(prop => prop.key === key)?.value;
  }

  /**
   * Get bike point metadata (makes HTTP request to TfL API)
   * 
   * This method fetches live metadata from the TfL API. For static metadata
   * that doesn't change frequently, consider using the static properties
   * instead to save HTTP round trips.
   * 
   * @param options - Options for metadata request
   * @returns Promise resolving to bike point metadata
   * @example
   * // Get live metadata from TfL API
   * const meta = await client.bikePoint.getMeta();
   * 
   * // Use static metadata instead (no HTTP request)
   * const endpoints = client.bikePoint.ENDPOINTS;
   * const categories = client.bikePoint.PROPERTY_CATEGORIES;
   * const keys = client.bikePoint.PROPERTY_KEYS;
   */
  async getMeta(options: { keepTflTypes?: boolean } = {}): Promise<{
    endpoints: typeof BIKEPOINT_DATA.endpoints;
    totalEndpoints: number;
    section: string;
    generatedAt: string;
    mode: ModeName;
    propertyCategories: readonly string[];
    propertyKeys: readonly string[];
  }> {
    return {
      endpoints: this.ENDPOINTS,
      totalEndpoints: this.TOTAL_ENDPOINTS,
      section: this.SECTION,
      generatedAt: this.GENERATED_AT,
      mode: this.MODE,
      propertyCategories: this.PROPERTY_CATEGORIES,
      propertyKeys: this.PROPERTY_KEYS
    };
  }

  /**
   * Find bike points with available bikes
   * 
   * This utility method filters bike points to find those with bikes available.
   * 
   * @param bikePoints - Array of bike point information
   * @returns Array of bike points with available bikes
   * @example
   * // Find bike points with available bikes
   * const allBikePoints = await client.bikePoint.get();
   * const availableBikePoints = client.bikePoint.findAvailableBikes(allBikePoints);
   * 
   * console.log(`Found ${availableBikePoints.length} bike points with available bikes`);
   * 
   * availableBikePoints.forEach(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   console.log(`${status.name}: ${status.bikes} bikes available`);
   * });
   */
  findAvailableBikes(bikePoints: BikePointInfo[]): BikePointInfo[] {
    return bikePoints.filter(bikePoint => {
      const bikes = this.getPropertyValue(bikePoint, 'NbBikes');
      return bikes && Number(bikes) > 0;
    });
  }

  /**
   * Find bike points with available spaces
   * 
   * This utility method filters bike points to find those with empty spaces
   * where bikes can be returned.
   * 
   * @param bikePoints - Array of bike point information
   * @returns Array of bike points with available spaces
   * @example
   * // Find bike points with available spaces
   * const allBikePoints = await client.bikePoint.get();
   * const availableSpaces = client.bikePoint.findAvailableSpaces(allBikePoints);
   * 
   * console.log(`Found ${availableSpaces.length} bike points with available spaces`);
   * 
   * availableSpaces.forEach(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   console.log(`${status.name}: ${status.spaces} spaces available`);
   * });
   */
  findAvailableSpaces(bikePoints: BikePointInfo[]): BikePointInfo[] {
    return bikePoints.filter(bikePoint => {
      const spaces = this.getPropertyValue(bikePoint, 'NbSpaces');
      return spaces && Number(spaces) > 0;
    });
  }

  /**
   * Find bike points with broken docks
   * 
   * This utility method filters bike points to find those with broken docks.
   * 
   * @param bikePoints - Array of bike point information
   * @returns Array of bike points with broken docks
   * @example
   * // Find bike points with broken docks
   * const allBikePoints = await client.bikePoint.get();
   * const brokenDocks = client.bikePoint.findBrokenDocks(allBikePoints);
   * 
   * console.log(`Found ${brokenDocks.length} bike points with broken docks`);
   * 
   * brokenDocks.forEach(bikePoint => {
   *   const status = client.bikePoint.extractStatus(bikePoint);
   *   console.log(`${status.name}: ${status.brokenDocks} broken docks`);
   * });
   */
  findBrokenDocks(bikePoints: BikePointInfo[]): BikePointInfo[] {
    return bikePoints.filter(bikePoint => {
      const status = this.extractStatus(bikePoint);
      return status.brokenDocks > 0;
    });
  }
}

// Re-export static types and constants for direct use
export {
  BIKEPOINT_DATA
}; 