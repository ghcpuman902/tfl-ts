import { 
  Api, 
  BikePointSearchParams, 
  TflApiPresentationEntitiesAdditionalProperties, 
  TflApiPresentationEntitiesPlace
} from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';
import { 
  extractStatus, 
} from './utils/bikePoint';



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
export interface BikePointInfo extends TflApiPresentationEntitiesPlace {
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
export interface BikePointProperty extends TflApiPresentationEntitiesAdditionalProperties {
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
 *   lon: -0.10997,
 *   terminalName: "001023",
 *   isInstalled: true,
 *   isLocked: false,
 *   installDate: "2023-01-01T12:00:00Z",
 *   removalDate: null,
 *   isTemporary: false,
 *   standardBikes: 4,
 *   eBikes: 1,
 *   additionalProperties: [
 *     {
 *       category: "NumberOfBikes",
 *       key: "NbBikes",
 *       sourceSystemKey: "BikePoints",
 *       value: "5",
 *       modified: "2023-01-01T12:00:00Z"
 *     }
 *   ]
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
  /** Terminal name/ID */
  terminalName?: string;
  /** Whether the bike point is installed */
  isInstalled?: boolean;
  /** Whether the bike point is locked */
  isLocked?: boolean;
  /** Installation date */
  installDate?: string;
  /** Removal date (if applicable) */
  removalDate?: string | null;
  /** Whether this is a temporary bike point */
  isTemporary?: boolean;
  /** Number of standard bikes */
  standardBikes?: number;
  /** Number of electric bikes */
  eBikes?: number;
  /** Original additional properties (preserved when keepTflTypes is true) */
  additionalProperties?: BikePointProperty[];
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
interface BikePointSearchQuery extends BikePointSearchParams {
  /** The search term (e.g., "St. James") */
  query: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for bike point radius search
 * @example
 * // Search for bike points within 500m of a location
 * const bikePoints = await client.bikePoint.getByRadius({
 *   lat: 51.508418,
 *   lon: -0.067048,
 *   radius: 500,
 *   keepTflTypes: false
 * });
 */
interface BikePointRadiusQuery {
  /** Latitude of the center point */
  lat: number;
  /** Longitude of the center point */
  lon: number;
  /** Radius in meters (default: 200) */
  radius?: number;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for bike point bounding box search
 * @example
 * // Search for bike points within a bounding box
 * const bikePoints = await client.bikePoint.getByBounds({
 *   point1: { lat: 51.516027, lon: -0.119842 },
 *   point2: { lat: 51.513089, lon: -0.115669 },
 *   keepTflTypes: false
 * });
 */
interface BikePointBoundsQuery {
  /** First point of the bounding box */
  point1: { lat: number; lon: number };
  /** Second point of the bounding box */
  point2: { lat: number; lon: number };
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Response from radius-based bike point search
 * @example
 * {
 *   centrePoint: [51.508, -0.067],
 *   places: [
 *     {
 *       id: "BikePoints_46",
 *       name: "Nesham Street, Wapping",
 *       distance: 96.91253333568288,
 *       lat: 51.507131,
 *       lon: -0.06691,
 *       bikes: 5,
 *       docks: 15,
 *       spaces: 10
 *     }
 *   ]
 * }
 */
export interface BikePointRadiusResponse {
  /** Center point coordinates [lat, lon] */
  centrePoint: [number, number];
  /** Array of bike points within the radius */
  places: (BikePointStatus & { distance?: number })[];
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
 * // Get bike point with original additional properties preserved
 * const bikePointWithTypes = await client.bikePoint.getById('BikePoints_1', { keepTflTypes: true });
 * console.log('Original properties:', bikePointWithTypes.additionalProperties);
 * 
 * // Search for bike points
 * const searchResults = await client.bikePoint.search({ query: 'St. James' });
 * 
 * // Get bike points within radius
 * const nearbyBikePoints = await client.bikePoint.getByRadius({
 *   lat: 51.508418,
 *   lon: -0.067048,
 *   radius: 500
 * });
 * 
 * // Get bike points within bounding box
 * const areaBikePoints = await client.bikePoint.getByBounds({
 *   point1: { lat: 51.516027, lon: -0.119842 },
 *   point2: { lat: 51.513089, lon: -0.115669 }
 * });
 * 
 * // Access static metadata (no HTTP request)
 * const endpoints = client.bikePoint.ENDPOINTS;
 * const totalEndpoints = client.bikePoint.TOTAL_ENDPOINTS;
 * 
 * // Validate user input before making API calls
 * const userInput = ['BikePoints_1', 'invalid-id'];
 * const validIds = userInput.filter(id => id.startsWith('BikePoints_'));
 * if (validIds.length !== userInput.length) {
 *   throw new Error(`Invalid bike point IDs: ${userInput.filter(id => !id.startsWith('BikePoints_')).join(', ')}`);
 * }
 */
export class BikePoint {
  /** Transport mode for bike points */
  public readonly MODE = 'cycle-hire' as const;

  /** Bike point property categories */
  public readonly PROPERTY_CATEGORIES = [
    'Description'
  ] as const;

  /** Bike point property keys */
  public readonly PROPERTY_KEYS = [
    'NbBikes',
    'NbDocks',
    'NbEmptyDocks'
  ] as const;

  constructor(private api: Api<{}>) {}

  /**
   * Gets all bike point locations with their current status
   * 
   * This method returns all bike point locations in London with their current status.
   * The response includes structured status information with bikes, docks, spaces, and broken docks.
   * 
   * @param options - Options for the request
   * @returns Promise resolving to an array of bike point status information
   * @example
   * // Get all bike points with status
   * const allBikePoints = await client.bikePoint.get();
   * 
   * // Process bike point data
   * allBikePoints.forEach(status => {
   *   console.log(`${status.name}: ${status.bikes} bikes, ${status.spaces} spaces available`);
   *   
   *   if (status.brokenDocks > 0) {
   *     console.log(`⚠️ ${status.brokenDocks} broken docks detected`);
   *   }
   * });
   * 
   * // Find bike points with available bikes
   * const availableBikePoints = allBikePoints.filter(status => status.bikes > 0);
   * 
   * // Find bike points with available spaces
   * const availableSpaces = allBikePoints.filter(status => status.spaces > 0);
   * 
   * // Find bike points with electric bikes
   * const eBikePoints = allBikePoints.filter(status => status.eBikes > 0);
   * 
   * // Get all bike points with original additional properties preserved
   * const allBikePointsWithTypes = await client.bikePoint.get({ keepTflTypes: true });
   * 
   * // Access original properties for debugging or advanced processing
   * allBikePointsWithTypes.forEach(status => {
   *   if (status.additionalProperties) {
   *     console.log(`${status.name} has ${status.additionalProperties.length} original properties`);
   *     status.additionalProperties.forEach(prop => {
   *       console.log(`  ${prop.key}: ${prop.value} (${prop.category})`);
   *     });
   *   }
   * });
   */
  async get(options: { keepTflTypes?: boolean } = {}): Promise<BikePointStatus[]> {
    const rawData = await this.api.bikePoint.bikePointGetAll()
      .then((response: any) => stripTypeFields(response.data, options.keepTflTypes));
    
    return rawData.map((bikePoint: BikePointInfo) => extractStatus(bikePoint, options.keepTflTypes));
  }

  /**
   * Gets the bike point with the given id
   * 
   * This method returns detailed information about a specific bike point,
   * including its current status (number of bikes, docks, and spaces).
   * 
   * @param id - A bike point id (a list of ids can be obtained from the get() method)
   * @param options - Options for the request
   * @returns Promise resolving to bike point status information
   * @example
   * // Get specific bike point by ID
   * const bikePoint = await client.bikePoint.getById('BikePoints_1');
   * 
   * // Display status information
   * console.log(`Bike Point: ${bikePoint.name}`);
   * console.log(`Available bikes: ${bikePoint.bikes}`);
   * console.log(`Available spaces: ${bikePoint.spaces}`);
   * console.log(`Total docks: ${bikePoint.docks}`);
   * 
   * if (bikePoint.brokenDocks > 0) {
   *   console.log(`Broken docks: ${bikePoint.brokenDocks}`);
   * }
   * 
   * if (bikePoint.eBikes > 0) {
   *   console.log(`Electric bikes: ${bikePoint.eBikes}`);
   * }
   * 
   * // Get bike point with original additional properties preserved
   * const bikePointWithTypes = await client.bikePoint.getById('BikePoints_1', { keepTflTypes: true });
   * 
   * // Access all original properties for advanced processing
   * if (bikePointWithTypes.additionalProperties) {
   *   console.log('All original properties:');
   *   bikePointWithTypes.additionalProperties.forEach(prop => {
   *     console.log(`  ${prop.key}: ${prop.value} (${prop.category}) - Modified: ${prop.modified}`);
   *   });
   * }
   */
  async getById(id: string, options: { keepTflTypes?: boolean } = {}): Promise<BikePointStatus> {
    const rawData = await this.api.bikePoint.bikePointGet(id)
      .then((response: any) => stripTypeFields(response.data, options.keepTflTypes));
    
    return extractStatus(rawData, options.keepTflTypes);
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
   *     console.log(`Status: ${detailedBikePoint.bikes} bikes, ${detailedBikePoint.spaces} spaces`);
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
   * Gets bike points within a radius of a location
   * 
   * This method returns bike points within a specified radius of a given location.
   * Uses the TfL API endpoint: /BikePoint?lat={lat}&lon={lon}&radius={radius}
   * 
   * @param options - Query options for radius-based bike point search
   * @returns Promise resolving to bike point radius response
   * @example
   * // Get bike points within 500m of a location
   * const nearbyBikePoints = await client.bikePoint.getByRadius({
   *   lat: 51.508418,
   *   lon: -0.067048,
   *   radius: 500
   * });
   * 
   * console.log(`Found ${nearbyBikePoints.places.length} bike points within ${options.radius}m`);
   * console.log(`Center point: ${nearbyBikePoints.centrePoint[0]}, ${nearbyBikePoints.centrePoint[1]}`);
   * 
   * // Process each bike point
   * nearbyBikePoints.places.forEach(bikePoint => {
   *   console.log(`${bikePoint.name}: ${bikePoint.bikes} bikes, ${bikePoint.spaces} spaces (${bikePoint.distance?.toFixed(0)}m away)`);
   * });
   * 
   * // Find closest bike point with available bikes
   * const closestWithBikes = nearbyBikePoints.places
   *   .filter(bikePoint => bikePoint.bikes > 0)
   *   .sort((a, b) => (a.distance || 0) - (b.distance || 0))[0];
   * 
   * if (closestWithBikes) {
   *   console.log(`Closest bike point with bikes: ${closestWithBikes.name} (${closestWithBikes.distance?.toFixed(0)}m)`);
   * }
   * 
   * // Get bike points with original additional properties preserved
   * const nearbyBikePointsWithTypes = await client.bikePoint.getByRadius({
   *   lat: 51.508418,
   *   lon: -0.067048,
   *   radius: 500,
   *   keepTflTypes: true
   * });
   * 
   * // Access original properties for each bike point
   * nearbyBikePointsWithTypes.places.forEach(bikePoint => {
   *   if (bikePoint.additionalProperties) {
   *     console.log(`${bikePoint.name} has ${bikePoint.additionalProperties.length} original properties`);
   *   }
   * });
   */
  async getByRadius(options: BikePointRadiusQuery): Promise<BikePointRadiusResponse> {
    const { lat, lon, radius = 200, keepTflTypes } = options;
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('lat', lat.toString());
    queryParams.append('lon', lon.toString());
    if (radius !== 200) {
      queryParams.append('radius', radius.toString());
    }
    
    // Make direct API call to the radius endpoint
    const response = await this.api.request({
      path: `/BikePoint?${queryParams.toString()}`,
      method: 'GET',
      format: 'json'
    });
    
    const rawData = stripTypeFields(response.data, keepTflTypes);
    
    // Transform the data to include status information
    return {
      centrePoint: rawData.centrePoint,
      places: rawData.places.map((bikePoint: BikePointInfo) => ({
        ...extractStatus(bikePoint, keepTflTypes),
        distance: bikePoint.distance
      }))
    };
  }

  /**
   * Gets bike points within a bounding box
   * 
   * This method returns bike points within a bounding box defined by two points.
   * Uses the TfL API endpoint: /BikePoint?swLat={swLat}&swLon={swLon}&neLat={neLat}&neLon={neLon}
   * 
   * @param options - Query options for bounding box bike point search
   * @returns Promise resolving to an array of bike point status information
   * @example
   * // Get bike points within a bounding box
   * const areaBikePoints = await client.bikePoint.getByBounds({
   *   point1: { lat: 51.516027, lon: -0.119842 },
   *   point2: { lat: 51.513089, lon: -0.115669 }
   * });
   * 
   * console.log(`Found ${areaBikePoints.length} bike points in the area`);
   * 
   * // Process each bike point
   * areaBikePoints.forEach(bikePoint => {
   *   console.log(`${bikePoint.name}: ${bikePoint.bikes} bikes, ${bikePoint.spaces} spaces`);
   *   console.log(`Location: ${bikePoint.lat}, ${bikePoint.lon}`);
   * });
   * 
   * // Find bike points with most available bikes in the area
   * const topBikePoints = areaBikePoints
   *   .sort((a, b) => b.bikes - a.bikes)
   *   .slice(0, 3);
   * 
   * console.log('Top 3 bike points with most bikes:');
   * topBikePoints.forEach((bikePoint, index) => {
   *   console.log(`${index + 1}. ${bikePoint.name}: ${bikePoint.bikes} bikes`);
   * });
   * 
   * // Get bike points with original additional properties preserved
   * const areaBikePointsWithTypes = await client.bikePoint.getByBounds({
   *   point1: { lat: 51.516027, lon: -0.119842 },
   *   point2: { lat: 51.513089, lon: -0.115669 },
   *   keepTflTypes: true
   * });
   * 
   * // Access original properties for debugging
   * areaBikePointsWithTypes.forEach(bikePoint => {
   *   if (bikePoint.additionalProperties) {
   *     const lastModified = bikePoint.additionalProperties
   *       .map(prop => new Date(prop.modified || ''))
   *       .sort((a, b) => b.getTime() - a.getTime())[0];
   *     console.log(`${bikePoint.name} last updated: ${lastModified}`);
   *   }
   * });
   */
  async getByBounds(options: BikePointBoundsQuery): Promise<BikePointStatus[]> {
    const { point1, point2, keepTflTypes } = options;
    
    // Determine southwest and northeast corners
    const swLat = Math.min(point1.lat, point2.lat);
    const swLon = Math.min(point1.lon, point2.lon);
    const neLat = Math.max(point1.lat, point2.lat);
    const neLon = Math.max(point1.lon, point2.lon);
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append('swLat', swLat.toString());
    queryParams.append('swLon', swLon.toString());
    queryParams.append('neLat', neLat.toString());
    queryParams.append('neLon', neLon.toString());
    
    // Make direct API call to the bounds endpoint
    const response = await this.api.request({
      path: `/BikePoint?${queryParams.toString()}`,
      method: 'GET',
      format: 'json'
    });
    
    const rawData = stripTypeFields(response.data, keepTflTypes);
    return rawData.map((bikePoint: BikePointInfo) => extractStatus(bikePoint, keepTflTypes));
  }




}

// Export the BikePoint module and all interfaces
export { 
  BikePointSearchQuery,
  BikePointRadiusQuery,
  BikePointBoundsQuery
}; 