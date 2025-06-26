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

// Create arrays from the types for static properties
const STOP_POINT_CATEGORIES: readonly StopPointCategory[] = [
  'Accessibility', 'AirQuality', 'BikePoint', 'CarPark', 'CycleSuperhighway', 
  'Disruption', 'JourneyPlanner', 'Line', 'Mode', 'Place', 'Route', 'StopPoint', 'Train', 'Tube'
] as const;

const STOP_POINT_TYPES: readonly StopPointType[] = [
  'NaptanMetroStation', 'NaptanRailStation', 'NaptanBusCoachStation', 
  'NaptanPublicBusCoachTram', 'NaptanAccessibleArea', 'NaptanFlexibleZone'
] as const;

const MODE_NAMES: readonly ModeName[] = [
  'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 
  'cable-car', 'coach', 'cycle', 'cycle-hire', 'walking', 'national-rail'
] as const;

const TFL_SERVICE_MODES: readonly TflServiceMode[] = [
  'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 'cable-car', 'cycle-hire'
] as const;

const FARE_PAYING_MODES: readonly FarePayingMode[] = [
  'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 
  'cable-car', 'coach', 'cycle-hire', 'national-rail'
] as const;

const SCHEDULED_SERVICE_MODES: readonly ScheduledServiceMode[] = [
  'tube', 'bus', 'dlr', 'overground', 'elizabeth-line', 'river-bus', 
  'cable-car', 'coach', 'national-rail'
] as const;

/**
 * Query options for stop point requests
 * @example
 * // Get specific stop points by ID
 * const stops = await client.stopPoint.get({ ids: ['940GZZLUOXC', '940GZZLUVIC'] });
 * 
 * // Get stop points by mode
 * const tubeStops = await client.stopPoint.get({ modes: ['tube'] });
 */
interface BaseStopPointQuery {
  /** Array of stop point IDs (e.g., '940GZZLUOXC', '940GZZLUVIC') */
  ids?: string[];
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr') */
  modes?: (ModeName | string)[];
  /** Maximum number of results to return */
  maxResults?: number;
  /** Array of line IDs to filter by */
  lines?: string[];
  /** Search radius in meters */
  radius?: number;
  /** Whether to use stop point hierarchy */
  useStopPointHierarchy?: boolean;
  /** Array of categories to include */
  categories?: StopPointCategory[];
  /** Whether to return lines for each stop point */
  returnLines?: boolean;
  /** Array of stop types to filter by */
  stoptypes?: StopPointType[];
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
 */
interface StopPointSearchQuery {
  /** Search query string */
  query: string;
  /** Filter by transport modes (e.g., 'tube', 'bus', 'dlr') */
  modes?: (ModeName | string)[];
  /** Maximum number of results to return */
  maxResults?: number;
  /** Filter by line IDs */
  lines?: string[];
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
 *   ids: ['940GZZLUOXC'],
 *   sortBy: 'timeToStation'
 * });
 */
interface StopPointArrivalsQuery {
  /** Array of stop point IDs */
  ids: string[];
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
 */
interface StopPointReachableFromQuery {
  /** Stop point ID */
  id: string;
  /** Line ID */
  lineId: string;
  /** Service types to filter by */
  serviceTypes?: ('Regular' | 'Night')[];
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
  serviceTypes?: ('Regular' | 'Night')[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for stop point disruption requests
 * @example
 * // Get disruptions for specific stops
 * const disruptions = await client.stopPoint.getDisruption({
 *   ids: ['940GZZLUOXC', '940GZZLUVIC'],
 *   getFamily: true
 * });
 */
interface StopPointDisruptionQuery {
  /** Array of stop point IDs */
  ids: string[];
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
  categories?: StopPointCategory[];
  /** Whether to return lines for each stop point */
  returnLines?: boolean;
  /** Array of stop types to filter by */
  stoptypes?: StopPointType[];
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
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr') */
  modes: (ModeName | string)[];
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
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr') */
  modes?: (ModeName | string)[];
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
  modes: ModeName[];
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

  /** Available stop point categories (static, no HTTP request needed) */
  public readonly STOP_POINT_CATEGORIES: readonly StopPointCategory[] = STOP_POINT_CATEGORIES;

  /** Available stop point types (static, no HTTP request needed) */
  public readonly STOP_POINT_TYPES: readonly StopPointType[] = STOP_POINT_TYPES;

  /** Available transport modes (static, no HTTP request needed) */
  public readonly MODE_NAMES: readonly ModeName[] = MODE_NAMES;

  /** TfL service modes (static, no HTTP request needed) */
  public readonly TFL_SERVICE_MODES: readonly TflServiceMode[] = TFL_SERVICE_MODES;

  /** Fare paying modes (static, no HTTP request needed) */
  public readonly FARE_PAYING_MODES: readonly FarePayingMode[] = FARE_PAYING_MODES;

  /** Scheduled service modes (static, no HTTP request needed) */
  public readonly SCHEDULED_SERVICE_MODES: readonly ScheduledServiceMode[] = SCHEDULED_SERVICE_MODES;

  /** Mode metadata (static, no HTTP request needed) */
  public readonly MODE_METADATA: ModeMetadata = modeMetadata;

  constructor(private api: Api<{}>) {
    this.batchRequest = new BatchRequest(api);
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
   * const stops = await client.stopPoint.get({ ids: ['940GZZLUOXC', '940GZZLUVIC'] });
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
    const { ids } = input;
    if (!ids?.length) {
      throw new Error('Stop point ID(s) are required');
    }

    return this.batchRequest.processBatch(
      ids,
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
   */
  async getByType(types: StopPointType[]): Promise<TflApiPresentationEntitiesStopPoint[]> {
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
  async getByTypeWithPagination(types: StopPointType[], page: number): Promise<TflApiPresentationEntitiesStopPoint[]> {
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
   *   ids: ['940GZZLUOXC'],
   *   sortBy: 'timeToStation'
   * });
   */
  async getArrivals(options: StopPointArrivalsQuery): Promise<TflApiPresentationEntitiesPrediction[]> {
    const { ids, sortBy, sortOrder, keepTflTypes } = options;
    
    const arrivals = await this.batchRequest.processBatch(
      ids,
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
   */
  async getDisruptionByMode(modes: ModeName[], options?: { 
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
   *   ids: ['940GZZLUOXC', '940GZZLUVIC'],
   *   getFamily: true
   * });
   */
  async getDisruption(options: StopPointDisruptionQuery): Promise<TflApiPresentationEntitiesDisruptedPoint[]> {
    const { ids, getFamily, includeRouteBlockedStops, flattenResponse, keepTflTypes } = options;
    return this.api.stopPoint.stopPointDisruption({ 
      ids, 
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
   * @returns Promise resolving to search response
   * @example
   * const results = await client.stopPoint.search({ 
   *   query: "Oxford Circus",
   *   modes: ['tube', 'bus']
   * });
   */
  async search(options: StopPointSearchQuery): Promise<TflApiPresentationEntitiesSearchResponse> {
    const { query, modes, maxResults, lines, tflOperatedNationalRailStationsOnly, faresOnly, includeHubs, keepTflTypes } = options;
    return this.api.stopPoint.stopPointSearch({
      query,
      modes,
      maxResults,
      lines,
      tflOperatedNationalRailStationsOnly,
      faresOnly,
      includeHubs
    }).then(response => {
      const data = response.data;
      const sanitized = JSON.parse(JSON.stringify(data));
      return stripTypeFields(sanitized, keepTflTypes);
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