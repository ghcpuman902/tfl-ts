// this code is not generated, please edit to add additional features

import { 
  Api, 
  TflApiPresentationEntitiesStopPoint,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesStopPointsResponse,
  TflApiPresentationEntitiesPlace,
  TflApiPresentationEntitiesStopPointCategory,
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesLineServiceType,
  TflApiPresentationEntitiesArrivalDeparture,
  TflApiPresentationEntitiesStopPointRouteSection,
  TflApiPresentationEntitiesDisruptedPoint,
  TflApiPresentationEntitiesSearchResponse,
  TflApiPresentationEntitiesMatchedStop,
  SystemObject,
  DirectionEnum2
} from './generated/tfl';
import { BatchRequest } from './utils/batchRequest';
import { stripTypeFields } from './utils/stripTypes';

// 🚨 ALWAYS use generated metadata (never hardcode!)
import { 
  Modes, 
  ServiceTypes, 
  DisruptionCategories, 
  Severity,
  Categories,
  PlaceTypes,
  SearchProviders,
  Sorts,
  StopTypes
} from './generated/meta/Meta';

// Import raw data from generated meta files
import { 
  StopPointCategory, 
  StopPointType, 
  ModeName, 
  TflServiceMode, 
  FarePayingMode, 
  ScheduledServiceMode,
  modeMetadata,
  ModeInfo,
  ModeMetadata
} from './generated/meta/StopPoint';

/**
 * Extended SearchMatch interface that includes properties actually returned by the API
 * but missing from the generated TflApiPresentationEntitiesSearchMatch type
 */
export interface ExtendedSearchMatch {
  id?: string;
  url?: string;
  name?: string;
  lat?: number;
  lon?: number;
  // Additional properties that are actually returned by the API
  stationName?: string;
  platformName?: string;
  modes?: string[];
  lines?: Array<{
    id: string;
    name: string;
  }>;
  [key: string]: any; // Allow for additional properties
}

/**
 * Extended SearchResponse interface that uses the extended SearchMatch
 */
export interface ExtendedSearchResponse {
  query?: string;
  from?: number;
  page?: number;
  pageSize?: number;
  provider?: string;
  total?: number;
  matches?: ExtendedSearchMatch[];
  maxScore?: number;
}

/**
 * Query options for stop point requests
 * @example
 * // Get specific stop points by ID
 * const stops = await client.stopPoint.get({ stopPointIds: ['940GZZLUOXC', '940GZZLUVIC'] });
 * 
 * // Get stop points by mode
 * const tubeStops = await client.stopPoint.get({ modes: ['tube'] });
 * 
 * // Validate user input before making API calls
 * const userInput = ['940GZZLUOXC', 'invalid-id'];
 * const validIds = userInput.filter(id => id.match(/^[0-9A-Z]+$/));
 * if (validIds.length !== userInput.length) {
 *   throw new Error(`Invalid stop point IDs: ${userInput.filter(id => !id.match(/^[0-9A-Z]+$/)).join(', ')}`);
 * }
 */
interface BaseStopPointQuery {
  /** Array of stop point IDs (e.g., '940GZZLUOXC', '940GZZLUVIC'). TypeScript provides autocomplete for known values. */
  stopPointIds?: string[];
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
  modes?: string[];
  /** Maximum number of results to return */
  maxResults?: number;
  /** Array of line IDs to filter by */
  lineIds?: string[];
  /** Search radius in meters */
  radius?: number;
  /** Whether to use stop point hierarchy */
  useStopPointHierarchy?: boolean;
  /** Array of categories to include */
  categories?: string[];
  /** Whether to return lines for each stop point */
  returnLines?: boolean;
  /** Array of stop types to filter by */
  stoptypes?: string[];
  /** Direction of travel */
  direction?: string;
  /** Whether to include crowding data */
  includeCrowdingData?: boolean;
  /** Filter to TfL-operated national rail stations only */
  tflOperatedNationalRailStationsOnly?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point search requests
 * @example
 * // Search for stops containing "Oxford"
 * const results = await client.stopPoint.search({ 
 *   query: "Oxford",
 *   modes: ['tube', 'bus']
 * });
 * 
 * // Validate user input before making API calls
 * const userInput = ['tube', 'invalid-mode'];
 * const validModes = userInput.filter(mode => client.stopPoint.MODE_NAMES.includes(mode as any));
 * if (validModes.length !== userInput.length) {
 *   throw new Error(`Invalid modes: ${userInput.filter(mode => !client.stopPoint.MODE_NAMES.includes(mode as any)).join(', ')}`);
 * }
 */
interface StopPointSearchQuery {
  /** Search query string */
  query: string;
  /** Filter by transport modes (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
  modes?: string[];
  /** Maximum number of results to return */
  maxResults?: number;
  /** Filter by line IDs */
  lineIds?: string[];
  /** Filter to TfL-operated national rail stations only */
  tflOperatedNationalRailStationsOnly?: boolean;
  /** Whether to only return stations with fares data */
  faresOnly?: boolean;
  /** Whether to include hubs */
  includeHubs?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point arrivals requests
 * @example
 * // Get arrivals for a specific stop
 * const arrivals = await client.stopPoint.getArrivals({
 *   stopPointIds: ['940GZZLUOXC'],
 *   sortBy: 'timeToStation'
 * });
 */
interface StopPointArrivalsQuery {
  /** Array of stop point IDs */
  stopPointIds: string[];
  /** Sort arrivals by criteria */
  sortBy?: 'timeToStation' | 'lineName' | 'destinationName';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point arrival departures requests
 * @example
 * // Get arrival departures for overground station
 * const arrivals = await client.stopPoint.getArrivalDepartures({
 *   id: '940GZZLULBG',
 *   lineIds: ['london-overground']
 * });
 */
interface StopPointArrivalDeparturesQuery {
  /** Stop point ID */
  id: string;
  /** Array of line IDs */
  lineIds: string[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point crowding requests
 * @example
 * // Get crowding data for Central line at Oxford Circus
 * const crowding = await client.stopPoint.getCrowding({
 *   id: '940GZZLUOXC',
 *   line: 'central',
 *   direction: 'inbound'
 * });
 */
interface StopPointCrowdingQuery {
  /** Stop point ID */
  id: string;
  /** Line ID */
  line: string;
  /** Direction of travel */
  direction?: DirectionEnum2;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point reachable from requests
 * @example
 * // Get stops reachable from Oxford Circus on Central line
 * const reachable = await client.stopPoint.getReachableFrom({
 *   id: '940GZZLUOXC',
 *   lineId: 'central',
 *   serviceTypes: ['Regular']
 * });
 * 
 * // Validate service types before making API calls
 * const userInput = ['Regular', 'InvalidType'];
 * const validServiceTypes = userInput.filter(type => client.stopPoint.SERVICE_TYPES.includes(type as any));
 * if (validServiceTypes.length !== userInput.length) {
 *   throw new Error(`Invalid service types: ${userInput.filter(type => !client.stopPoint.SERVICE_TYPES.includes(type as any)).join(', ')}`);
 * }
 */
interface StopPointReachableFromQuery {
  /** Stop point ID */
  id: string;
  /** Line ID */
  lineId: string;
  /** Service types to filter by */
  serviceTypes?: string[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point route requests
 * @example
 * // Get route sections for Oxford Circus
 * const routes = await client.stopPoint.getRoute({
 *   id: '940GZZLUOXC',
 *   serviceTypes: ['Regular']
 * });
 */
interface StopPointRouteQuery {
  /** Stop point ID */
  id: string;
  /** Service types to filter by */
  serviceTypes?: string[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point disruption requests
 * @example
 * // Get disruptions for specific stops
 * const disruptions = await client.stopPoint.getDisruption({
 *   stopPointIds: ['940GZZLUOXC', '940GZZLUVIC'],
 *   getFamily: true
 * });
 */
interface StopPointDisruptionQuery {
  /** Array of stop point IDs */
  stopPointIds: string[];
  /** Whether to return disruptions for entire family */
  getFamily?: boolean;
  /** Whether to include route blocked stops */
  includeRouteBlockedStops?: boolean;
  /** Whether to flatten response */
  flattenResponse?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point direction requests
 * @example
 * // Get direction from Oxford Circus to Victoria
 * const direction = await client.stopPoint.getDirection({
 *   id: '940GZZLUOXC',
 *   toStopPointId: '940GZZLUVIC',
 *   lineId: 'central'
 * });
 */
interface StopPointDirectionQuery {
  /** Originating stop point ID */
  id: string;
  /** Destination stop point ID */
  toStopPointId: string;
  /** Optional line ID filter */
  lineId?: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point geo location requests
 * @example
 * // Get stops near a location
 * const stops = await client.stopPoint.getByGeoPoint({
 *   lat: 51.5074,
 *   lon: -0.1278,
 *   radius: 500,
 *   modes: ['tube', 'bus']
 * });
 */
interface StopPointGeoQuery {
  /** Latitude */
  lat: number;
  /** Longitude */
  lon: number;
  /** Search radius in meters */
  radius?: number;
  /** Whether to use stop point hierarchy */
  useStopPointHierarchy?: boolean;
  /** Array of categories to include */
  categories?: string[];
  /** Whether to return lines for each stop point */
  returnLines?: boolean;
  /** Array of stop types to filter by */
  stoptypes?: string[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point mode requests
 * @example
 * // Get all tube stops
 * const tubeStops = await client.stopPoint.getByMode({
 *   modes: ['tube'],
 *   page: 1
 * });
 */
interface StopPointModeQuery {
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
  modes: string[];
  /** Page number for pagination */
  page?: number;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point SMS requests
 * @example
 * // Get stop point by SMS code
 * const stop = await client.stopPoint.getBySms({
 *   id: '73241',
 *   output: 'web'
 * });
 */
interface StopPointSmsQuery {
  /** SMS code (5-digit Countdown Bus Stop Code) */
  id: string;
  /** Output format */
  output?: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point service types requests
 * @example
 * // Get service types for Oxford Circus
 * const serviceTypes = await client.stopPoint.getServiceTypes({
 *   id: '940GZZLUOXC',
 *   lineIds: ['central', 'victoria']
 * });
 */
interface StopPointServiceTypesQuery {
  /** Stop point ID */
  id: string;
  /** Array of line IDs */
  lineIds?: string[];
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
  modes?: string[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Stop point information returned by the TfL API
 * @example
 * {
 *   id: "940GZZLUOXC",
 *   name: "Oxford Circus Underground Station",
 *   modes: ["tube"],
 *   lines: [
 *     {
 *       id: "central",
 *       name: "Central"
 *     }
 *   ]
 * }
 */
export interface StopPointInfo {
  /** Unique identifier for the stop point */
  id: string;
  /** Display name of the stop point */
  name: string;
  /** Transport modes available at this stop */
  modes: string[];
  /** Lines that serve this stop */
  lines?: Array<{
    id: string;
    name: string;
  }>;
  /** Additional stop point information */
  [key: string]: any;
}

/**
 * StopPoint class for interacting with TfL StopPoint API endpoints
 * @example
 * // Get stop point information
 * const stopInfo = await client.stopPoint.get({ id: '940GZZLUOXC' });
 * 
 * // Search for stops
 * const results = await client.stopPoint.search({ 
 *   query: "Oxford Circus",
 *   modes: ['tube', 'bus']
 * });
 * 
 * // Get arrivals for a stop
 * const arrivals = await client.stopPoint.getArrivals({ ids: ['940GZZLUOXC'] });
 * 
 * // Access static metadata (no HTTP request)
 * const categories = client.stopPoint.STOP_POINT_CATEGORIES;
 * const stopTypes = client.stopPoint.STOP_POINT_TYPES;
 * const modeNames = client.stopPoint.MODE_NAMES; // For validation
 */
export class StopPoint {
  private batchRequest: BatchRequest;

  // 🚨 ALWAYS use generated metadata (never hardcode!)
  /** Available transport modes (static, no HTTP request needed) */
  public readonly MODE_NAMES: readonly string[] = Modes.map(m => m.modeName);

  /** Service types (static, no HTTP request needed) */
  public readonly SERVICE_TYPES: readonly string[] = ServiceTypes;

  /** Disruption categories (static, no HTTP request needed) */
  public readonly DISRUPTION_CATEGORIES: readonly string[] = DisruptionCategories;

  /** Place types (static, no HTTP request needed) */
  public readonly PLACE_TYPES: readonly string[] = PlaceTypes;

  /** Search providers (static, no HTTP request needed) */
  public readonly SEARCH_PROVIDERS: readonly string[] = SearchProviders;

  /** Sort options (static, no HTTP request needed) */
  public readonly SORT_OPTIONS: readonly string[] = Sorts;

  /** Stop types (static, no HTTP request needed) */
  public readonly STOP_TYPES: readonly string[] = StopTypes;

  /** Categories (static, no HTTP request needed) */
  public readonly CATEGORIES: readonly string[] = Categories.map(c => c.category);

  /** All severity levels (static, no HTTP request needed) */
  public readonly ALL_SEVERITY: readonly typeof Severity[number][] = Severity;

  /** Available stop point categories (static, no HTTP request needed) */
  public readonly STOP_POINT_CATEGORIES: readonly StopPointCategory[] = [
    'Accessibility', 'AirQuality', 'BikePoint', 'CarPark', 'CycleSuperhighway', 
    'Disruption', 'JourneyPlanner', 'Line', 'Mode', 'Place', 'Route', 'StopPoint', 'Train', 'Tube'
  ] as const;

  /** Available stop point types (static, no HTTP request needed) */
  public readonly STOP_POINT_TYPES: readonly StopPointType[] = [
    'NaptanMetroStation', 'NaptanRailStation', 'NaptanBusCoachStation', 
    'NaptanPublicBusCoachTram', 'NaptanAccessibleArea', 'NaptanFlexibleZone'
  ] as const;

  /** TfL service modes (static, no HTTP request needed) */
  public readonly TFL_SERVICE_MODES: readonly TflServiceMode[] = [
    'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 'cable-car', 'cycle-hire'
  ] as const;

  /** Fare paying modes (static, no HTTP request needed) */
  public readonly FARE_PAYING_MODES: readonly FarePayingMode[] = [
    'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 
    'cable-car', 'coach', 'cycle-hire', 'national-rail'
  ] as const;

  /** Scheduled service modes (static, no HTTP request needed) */
  public readonly SCHEDULED_SERVICE_MODES: readonly ScheduledServiceMode[] = [
    'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 
    'cable-car', 'coach', 'national-rail'
  ] as const;

  /** Mode metadata (static, no HTTP request needed) */
  public readonly MODE_METADATA: ModeMetadata = modeMetadata;

  // 🚨 Build derived metadata from generated data
  /** Severity levels grouped by mode (static, no HTTP request needed) */
  public readonly SEVERITY_BY_MODE = this.buildSeverityByMode();

  /** Severity descriptions (static, no HTTP request needed) */
  public readonly SEVERITY_DESCRIPTIONS = this.buildSeverityDescriptions();

  /** Categories with their available keys (static, no HTTP request needed) */
  public readonly CATEGORIES_WITH_KEYS = this.buildCategoriesWithKeys();

  constructor(private api: Api<{}>) {
    this.batchRequest = new BatchRequest(api);
  }

  /**
   * Builds severity levels grouped by mode from generated data
   * @returns Record mapping mode names to their severity levels
   * @example
   * const tubeSeverity = client.stopPoint.SEVERITY_BY_MODE.tube;
   * // Returns: [{ level: 10, description: 'Good Service' }, ...]
   */
  private buildSeverityByMode(): Record<string, Array<{level: number, description: string}>> {
    const severityMap: Record<string, Array<{level: number, description: string}>> = {};
    
    Severity.forEach(severity => {
      if (!severityMap[severity.modeName]) {
        severityMap[severity.modeName] = [];
      }
      severityMap[severity.modeName].push({
        level: severity.severityLevel,
        description: severity.description
      });
    });
    
    return severityMap;
  }

  /**
   * Builds severity descriptions from generated data
   * @returns Record mapping severity levels to descriptions
   * @example
   * const description = client.stopPoint.SEVERITY_DESCRIPTIONS[10];
   * // Returns: 'Good Service'
   */
  private buildSeverityDescriptions(): Record<number, string> {
    const descriptions: Record<number, string> = {};
    
    Severity.forEach(severity => {
      descriptions[severity.severityLevel] = severity.description;
    });
    
    return descriptions;
  }

  /**
   * Builds categories with their available keys from generated data
   * @returns Record mapping category names to their available keys
   * @example
   * const facilityKeys = client.stopPoint.CATEGORIES_WITH_KEYS.Facility;
   * // Returns: ['Lifts', 'Boarding Ramp', 'Cash Machines', ...]
   */
  private buildCategoriesWithKeys(): Record<string, readonly string[]> {
    const categoriesMap: Record<string, readonly string[]> = {};
    
    Categories.forEach(category => {
      categoriesMap[category.category] = category.availableKeys;
    });
    
    return categoriesMap;
  }

  /**
   * Gets the list of available StopPoint additional information categories
   * @returns Promise resolving to an array of stop point categories
   * @example
   * const categories = await client.stopPoint.getCategories();
   */
  async getCategories(): Promise<TflApiPresentationEntitiesStopPointCategory[]> {
    return this.api.stopPoint.stopPointMetaCategories()
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets the list of available StopPoint types
   * @returns Promise resolving to an array of stop point types
   * @example
   * const types = await client.stopPoint.getTypes();
   */
  async getTypes(): Promise<string[]> {
    return this.api.stopPoint.stopPointMetaStopTypes()
      .then(response => response.data);
  }

  /**
   * Gets the list of available StopPoint modes
   * @returns Promise resolving to an array of stop point modes
   * @example
   * const modes = await client.stopPoint.getModes();
   */
  async getModes(): Promise<TflApiPresentationEntitiesMode[]> {
    return this.api.stopPoint.stopPointMetaModes()
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets a list of StopPoints corresponding to the given list of stop ids
   * @param options - Query options for stop points
   * @returns Promise resolving to an array of stop point information
   * @example
   * // Get specific stop points by ID
   * const stops = await client.stopPoint.get({ stopPointIds: ['940GZZLUOXC', '940GZZLUVIC'] });
   * 
   * // Get stop points by mode
   * const tubeStops = await client.stopPoint.get({ modes: ['tube'] });
   */
  async get(options: BaseStopPointQuery): Promise<TflApiPresentationEntitiesStopPoint[]>;
  /**
   * Gets a single StopPoint by ID
   * @param id - Single stop point ID
   * @returns Promise resolving to stop point information
   * @example
   * const stop = await client.stopPoint.get('940GZZLUOXC');
   */
  async get(id: string): Promise<TflApiPresentationEntitiesStopPoint>;
  /**
   * Gets multiple StopPoints by array of IDs
   * @param ids - Array of stop point IDs
   * @returns Promise resolving to an array of stop point information
   * @example
   * const stops = await client.stopPoint.get(['940GZZLUOXC', '940GZZLUVIC']);
   */
  async get(ids: string[]): Promise<TflApiPresentationEntitiesStopPoint[]>;
  async get(input: BaseStopPointQuery | string | string[]): Promise<TflApiPresentationEntitiesStopPoint | TflApiPresentationEntitiesStopPoint[]> {
    // Handle single ID
    if (typeof input === 'string') {
      return this.batchRequest.processBatch(
        [input],
        async (chunk) => this.api.stopPoint.stopPointGet({ ids: chunk })
          .then(response => stripTypeFields(response.data[0]))
      );
    }

    // Handle array of IDs
    if (Array.isArray(input)) {
      if (!input.length) {
        throw new Error('Stop point ID(s) are required');
      }
      return this.batchRequest.processBatch(
        input,
        async (chunk) => this.api.stopPoint.stopPointGet({ ids: chunk })
          .then(response => stripTypeFields(response.data))
      );
    }

    // Handle options object (original behavior)
    const { stopPointIds } = input;
    if (!stopPointIds?.length) {
      throw new Error('Stop point ID(s) are required');
    }

    return this.batchRequest.processBatch(
      stopPointIds,
      async (chunk) => this.api.stopPoint.stopPointGet({ ids: chunk })
        .then(response => stripTypeFields(response.data, input.keepTflTypes))
    );
  }

  /**
   * Get a list of places corresponding to a given id and place types
   * @param id - Stop point ID
   * @param placeTypes - Array of place types
   * @returns Promise resolving to an array of places
   * @example
   * const places = await client.stopPoint.getPlaces('940GZZLUOXC', ['NaptanMetroStation']);
   * 
   * // Validate place types before making API calls
   * const userInput = ['NaptanMetroStation', 'InvalidType'];
   * const validPlaceTypes = userInput.filter(type => client.stopPoint.PLACE_TYPES.includes(type));
   * if (validPlaceTypes.length !== userInput.length) {
   *   throw new Error(`Invalid place types: ${userInput.filter(type => !client.stopPoint.PLACE_TYPES.includes(type)).join(', ')}`);
   * }
   */
  async getPlaces(id: string, placeTypes: string[]): Promise<TflApiPresentationEntitiesPlace[]> {
    return this.api.stopPoint.stopPointGet2({ id, placeTypes })
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets all the Crowding data for the StopPointId, plus crowding data for a given line and optionally a particular direction
   * @param options - Query options for crowding data
   * @returns Promise resolving to an array of stop points with crowding data
   * @example
   * const crowding = await client.stopPoint.getCrowding({
   *   id: '940GZZLUOXC',
   *   line: 'central',
   *   direction: 'inbound'
   * });
   */
  async getCrowding(options: StopPointCrowdingQuery): Promise<TflApiPresentationEntitiesStopPoint[]> {
    const { id, line, direction, keepTflTypes } = options;
    return this.api.stopPoint.stopPointCrowding({ 
      id, 
      line, 
      direction: direction || 'all'
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets all stop points of a given type
   * @param types - Array of stop point types
   * @returns Promise resolving to an array of stop points
   * @example
   * const metroStations = await client.stopPoint.getByType(['NaptanMetroStation']);
   * 
   * // Validate stop types before making API calls
   * const userInput = ['NaptanMetroStation', 'InvalidType'];
   * const validStopTypes = userInput.filter(type => client.stopPoint.STOP_TYPES.includes(type));
   * if (validStopTypes.length !== userInput.length) {
   *   throw new Error(`Invalid stop types: ${userInput.filter(type => !client.stopPoint.STOP_TYPES.includes(type)).join(', ')}`);
   * }
   */
  async getByType(types: string[]): Promise<TflApiPresentationEntitiesStopPoint[]> {
    return this.api.stopPoint.stopPointGetByType(types)
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets all the stop points of given type(s) with a page number
   * @param types - Array of stop point types
   * @param page - Page number
   * @returns Promise resolving to an array of stop points
   * @example
   * const metroStations = await client.stopPoint.getByTypeWithPagination(['NaptanMetroStation'], 1);
   */
  async getByTypeWithPagination(types: string[], page: number): Promise<TflApiPresentationEntitiesStopPoint[]> {
    return this.api.stopPoint.stopPointGetByTypeWithPagination(types, page)
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Gets the service types for a given stoppoint
   * @param options - Query options for service types
   * @returns Promise resolving to an array of line service types
   * @example
   * const serviceTypes = await client.stopPoint.getServiceTypes({
   *   id: '940GZZLUOXC',
   *   lineIds: ['central', 'victoria']
   * });
   */
  async getServiceTypes(options: StopPointServiceTypesQuery): Promise<TflApiPresentationEntitiesLineServiceType[]> {
    return this.api.stopPoint.stopPointGetServiceTypes(options)
      .then(response => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Gets the list of arrival predictions for the given stop point id
   * @param options - Query options for arrivals
   * @returns Promise resolving to an array of arrival predictions
   * @example
   * const arrivals = await client.stopPoint.getArrivals({
   *   stopPointIds: ['940GZZLUOXC'],
   *   sortBy: 'timeToStation'
   * });
   */
  async getArrivals(options: StopPointArrivalsQuery): Promise<TflApiPresentationEntitiesPrediction[]> {
    const { stopPointIds, sortBy, sortOrder, keepTflTypes } = options;
    
    const arrivals = await this.batchRequest.processBatch(
      stopPointIds,
      async (chunk) => Promise.all(
        chunk.map(id => this.api.stopPoint.stopPointArrivals(id)
          .then(response => stripTypeFields(response.data, keepTflTypes)))
      ).then(results => results.flat())
    );
    
    if (!sortBy) {
      return arrivals;
    }

    const multiplier = sortOrder === 'desc' ? -1 : 1;

    return arrivals.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'timeToStation':
          aValue = a.timeToStation || 0;
          bValue = b.timeToStation || 0;
          break;
        case 'lineName':
          aValue = a.lineName || '';
          bValue = b.lineName || '';
          break;
        case 'destinationName':
          aValue = a.destinationName || '';
          bValue = b.destinationName || '';
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }

      return (aValue - bValue) * multiplier;
    });
  }

  /**
   * Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)
   * @param options - Query options for arrival departures
   * @returns Promise resolving to an array of arrival departure predictions
   * @example
   * const arrivals = await client.stopPoint.getArrivalDepartures({
   *   id: '940GZZLULBG',
   *   lineIds: ['london-overground']
   * });
   */
  async getArrivalDepartures(options: StopPointArrivalDeparturesQuery): Promise<TflApiPresentationEntitiesArrivalDeparture[]> {
    const { id, lineIds, keepTflTypes } = options;
    return this.api.stopPoint.stopPointArrivalDepartures({ id, lineIds })
      .then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets Stopoints that are reachable from a station/line combination
   * @param options - Query options for reachable stops
   * @returns Promise resolving to an array of reachable stop points
   * @example
   * const reachable = await client.stopPoint.getReachableFrom({
   *   id: '940GZZLUOXC',
   *   lineId: 'central',
   *   serviceTypes: ['Regular']
   * });
   */
  async getReachableFrom(options: StopPointReachableFromQuery): Promise<TflApiPresentationEntitiesStopPoint[]> {
    const { id, lineId, serviceTypes, keepTflTypes } = options;
    return this.api.stopPoint.stopPointReachableFrom({ 
      id, 
      lineId, 
      serviceTypes: serviceTypes as ('Regular' | 'Night')[] | undefined 
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Returns the route sections for all the lines that service the given stop point ids
   * @param options - Query options for route sections
   * @returns Promise resolving to an array of stop point route sections
   * @example
   * const routes = await client.stopPoint.getRoute({
   *   id: '940GZZLUOXC',
   *   serviceTypes: ['Regular']
   * });
   */
  async getRoute(options: StopPointRouteQuery): Promise<TflApiPresentationEntitiesStopPointRouteSection[]> {
    const { id, serviceTypes, keepTflTypes } = options;
    return this.api.stopPoint.stopPointRoute({ 
      id, 
      serviceTypes: serviceTypes as ('Regular' | 'Night')[] | undefined 
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets a distinct list of disrupted stop points for the given modes
   * @param modes - Array of transport modes
   * @param options - Additional options
   * @returns Promise resolving to an array of disrupted points
   * @example
   * const disruptions = await client.stopPoint.getDisruptionByMode(['tube', 'dlr'], {
   *   includeRouteBlockedStops: true
   * });
   * 
   * // Validate modes before making API calls
   * const userInput = ['tube', 'invalid-mode'];
   * const validModes = userInput.filter(mode => client.stopPoint.MODE_NAMES.includes(mode));
   * if (validModes.length !== userInput.length) {
   *   throw new Error(`Invalid modes: ${userInput.filter(mode => !client.stopPoint.MODE_NAMES.includes(mode)).join(', ')}`);
   * }
   */
  async getDisruptionByMode(modes: string[], options?: { 
    includeRouteBlockedStops?: boolean; 
    keepTflTypes?: boolean 
  }): Promise<TflApiPresentationEntitiesDisruptedPoint[]> {
    return this.api.stopPoint.stopPointDisruptionByMode({ modes, ...options })
      .then(response => stripTypeFields(response.data, options?.keepTflTypes));
  }

  /**
   * Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have
   * @param options - Query options for disruptions
   * @returns Promise resolving to an array of disrupted points
   * @example
   * const disruptions = await client.stopPoint.getDisruption({
   *   stopPointIds: ['940GZZLUOXC', '940GZZLUVIC'],
   *   getFamily: true
   * });
   */
  async getDisruption(options: StopPointDisruptionQuery): Promise<TflApiPresentationEntitiesDisruptedPoint[]> {
    const { stopPointIds, getFamily, includeRouteBlockedStops, flattenResponse, keepTflTypes } = options;
    return this.api.stopPoint.stopPointDisruption({ 
      ids: stopPointIds, 
      getFamily, 
      includeRouteBlockedStops, 
      flattenResponse 
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Returns the canonical direction, "inbound" or "outbound", for a given pair of stop point Ids
   * @param options - Query options for direction
   * @returns Promise resolving to direction string
   * @example
   * const direction = await client.stopPoint.getDirection({
   *   id: '940GZZLUOXC',
   *   toStopPointId: '940GZZLUVIC',
   *   lineId: 'central'
   * });
   */
  async getDirection(options: StopPointDirectionQuery): Promise<string> {
    const { id, toStopPointId, lineId, keepTflTypes } = options;
    return this.api.stopPoint.stopPointDirection({ id, toStopPointId, lineId })
      .then(response => response.data);
  }

  /**
   * Gets a list of StopPoints within radius by the specified criteria
   * @param options - Query options for geo location search
   * @returns Promise resolving to stop points response
   * @example
   * const stops = await client.stopPoint.getByGeoPoint({
   *   lat: 51.5074,
   *   lon: -0.1278,
   *   radius: 500,
   *   modes: ['tube', 'bus']
   * });
   */
  async getByGeoPoint(options: StopPointGeoQuery): Promise<TflApiPresentationEntitiesStopPointsResponse> {
    const { lat, lon, radius, useStopPointHierarchy, categories, returnLines, stoptypes, keepTflTypes } = options;
    return this.api.stopPoint.stopPointGetByGeoPoint({
      locationLat: lat,
      locationLon: lon,
      radius,
      useStopPointHierarchy,
      categories: categories || [],
      returnLines,
      stopTypes: stoptypes || []
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets a list of StopPoints filtered by the modes available at that StopPoint
   * @param options - Query options for mode-based search
   * @returns Promise resolving to stop points response
   * @example
   * const tubeStops = await client.stopPoint.getByMode({
   *   modes: ['tube'],
   *   page: 1
   * });
   */
  async getByMode(options: StopPointModeQuery): Promise<TflApiPresentationEntitiesStopPointsResponse> {
    const { modes, page, keepTflTypes } = options;
    return this.api.stopPoint.stopPointGetByMode({ 
      modes, 
      page
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code
   * @param options - Query options for search
   * @returns Promise resolving to search response with extended properties
   * @example
   * const results = await client.stopPoint.search({ 
   *   query: "Oxford Circus",
   *   modes: ['tube', 'bus'],
   *   lineIds: ['central', 'victoria']
   * });
   * 
   * // Access extended properties that are actually returned by the API
   * console.log(results.matches?.[0]?.stationName); // "Oxford Circus"
   * console.log(results.matches?.[0]?.platformName); // "Westbound - Platform 1"
   */
  async search(options: StopPointSearchQuery): Promise<ExtendedSearchResponse> {
    const { query, modes, maxResults, lineIds, tflOperatedNationalRailStationsOnly, faresOnly, includeHubs, keepTflTypes } = options;
    return this.api.stopPoint.stopPointSearch({
      query,
      modes,
      maxResults,
      lines: lineIds,
      tflOperatedNationalRailStationsOnly,
      faresOnly,
      includeHubs
    }).then(response => {
      const data = response.data;
      const sanitized = JSON.parse(JSON.stringify(data));
      return stripTypeFields(sanitized, keepTflTypes) as ExtendedSearchResponse;
    });
  }

  /**
   * Gets a StopPoint for a given sms code
   * @param options - Query options for SMS lookup
   * @returns Promise resolving to system object
   * @example
   * const stop = await client.stopPoint.getBySms({
   *   id: '73241',
   *   output: 'web'
   * });
   */
  async getBySms(options: StopPointSmsQuery): Promise<SystemObject> {
    const { id, output, keepTflTypes } = options;
    return this.api.stopPoint.stopPointGetBySms({ id, output })
      .then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets a list of taxi ranks corresponding to the given stop point id
   * @param stopPointId - Stop point ID
   * @returns Promise resolving to an array of places
   * @example
   * const taxiRanks = await client.stopPoint.getTaxiRanks('940GZZLUOXC');
   */
  async getTaxiRanks(stopPointId: string): Promise<TflApiPresentationEntitiesPlace[]> {
    return this.api.stopPoint.stopPointGetTaxiRanksByIds(stopPointId)
      .then(response => stripTypeFields(response.data));
  }

  /**
   * Get car parks corresponding to the given stop point id
   * @param stopPointId - Stop point ID
   * @returns Promise resolving to an array of places
   * @example
   * const carParks = await client.stopPoint.getCarParks('940GZZLUOXC');
   */
  async getCarParks(stopPointId: string): Promise<TflApiPresentationEntitiesPlace[]> {
    return this.api.stopPoint.stopPointGetCarParksById(stopPointId)
      .then(response => stripTypeFields(response.data));
  }
}

// Export the StopPoint module and all interfaces
export { 
  BaseStopPointQuery,
  StopPointSearchQuery,
  StopPointArrivalsQuery,
  StopPointArrivalDeparturesQuery,
  StopPointCrowdingQuery,
  StopPointReachableFromQuery,
  StopPointRouteQuery,
  StopPointDisruptionQuery,
  StopPointDirectionQuery,
  StopPointGeoQuery,
  StopPointModeQuery,
  StopPointSmsQuery,
  StopPointServiceTypesQuery
};

// Re-export static types and enums for direct use
export {
  StopPointCategory,
  StopPointType,
  ModeName,
  TflServiceMode,
  FarePayingMode,
  ScheduledServiceMode,
  modeMetadata,
  ModeInfo,
  ModeMetadata
}; 