import { 
  TflApiPresentationEntitiesLineStatus as TflLineStatus,
  TflApiPresentationEntitiesLine as TflLine,
  TflApiPresentationEntitiesDisruption as TflDisruption,
  TflApiPresentationEntitiesMode as TflApiMode,
  TflApiPresentationEntitiesStatusSeverity as TflStatusSeverity,
  TflApiPresentationEntitiesRouteSearchResponse as TflRouteSearchResponse,
  TflApiPresentationEntitiesRouteSequence as TflRouteSequence,
  TflApiPresentationEntitiesStopPoint as TflStopPoint,
  TflApiPresentationEntitiesTimetableResponse as TflTimetableResponse,
  TflApiPresentationEntitiesPrediction as TflPrediction
} from './generated/types';
import { RawClient } from './generated/raw';
import { BatchRequest } from './utils/batchRequest';
import type {
  LineIdInput,
  ModeInput,
  ModeName,
  NamedLineId,
  ServiceType,
  ServiceTypeInput,
  TflLineId,
} from './utils/autocomplete';

// Import raw data from generated meta files
import { Lines } from './generated/meta/Line';
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

type DisruptionCategory = typeof DisruptionCategories[number];

// Create LINE_NAMES mapping
const LINE_NAMES: Record<TflLineId, string> = Lines.reduce((acc, line) => {
  acc[line.id as TflLineId] = line.name;
  return acc;
}, {} as Record<TflLineId, string>);

// Create LINE_INFO mapping
const LINE_INFO: Record<TflLineId, typeof Lines[number]> = Lines.reduce((acc, line) => {
  acc[line.id as TflLineId] = line;
  return acc;
}, {} as Record<TflLineId, typeof Lines[number]>);

// Create mode metadata from the generated Modes data
const modeMetadata: Record<string, any> = Modes.reduce((acc, mode) => {
  acc[mode.modeName] = {
    isTflService: mode.isTflService,
    isFarePaying: mode.isFarePaying,
    isScheduledService: mode.isScheduledService
  };
  return acc;
}, {} as Record<string, any>);

// Build severity by mode mapping from generated data
const buildSeverityByMode = (): Record<string, Array<{level: number, description: string}>> => {
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
  
  // Sort by severity level (descending)
  Object.keys(severityMap).forEach(mode => {
    severityMap[mode].sort((a, b) => b.level - a.level);
  });
  
  return severityMap;
};

// Build severity descriptions from generated data
const buildSeverityDescriptions = (): readonly string[] => {
  const descriptions = new Set<string>();
  Severity.forEach(severity => {
    descriptions.add(severity.description);
  });
  return Array.from(descriptions).sort();
};

// Build severity by mode mapping
const severityByMode = buildSeverityByMode();
const severityDescriptions = buildSeverityDescriptions();

/**
 * Query options for line-related requests
 * @example
 * // Get all tube lines
 * const tubeLines = await client.line.get({ modes: ['tube'] });
 * 
 * // Get specific lines by ID
 * const specificLines = await client.line.get({ lineIds: ['central', 'victoria'] });
 * 
 * // Validate user input before making API calls
 * const userInput = ['central', 'invalid-line'];
 * const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
 * if (validIds.length !== userInput.length) {
 *   throw new Error(`Invalid line IDs: ${userInput.filter(id => !(id in client.line.LINE_NAMES)).join(', ')}`);
 * }
 */
interface BaseLineQuery {
  /** Array of line IDs (e.g., 'central', 'victoria', 'jubilee'). */
  lineIds?: LineIdInput[];
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr'). */
  modes?: ModeInput[];
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for line route requests
 * @example
 * // Most common: Get routes for specific lines
 * const routes = await client.line.getRoute({ 
 *   lineIds: ['central', 'victoria'],
 *   serviceTypes: ['Regular']
 * });
 * 
 * // Common: Get routes for all lines of a specific mode
 * const tubeRoutes = await client.line.getRoute({ 
 *   modes: ['tube'],
 *   serviceTypes: ['Regular', 'Night']
 * });
 * 
 * // Less common: Get all routes (use with caution - returns large dataset)
 * const allRoutes = await client.line.getRoute();
 */
interface LineRouteQuery extends BaseLineQuery {
  /** Array of service types to filter by (e.g., 'Regular', 'Night') */
  serviceTypes?: ServiceTypeInput[];
}

/**
 * Query options for line status requests
 * @example
 * // Get status for specific lines
 * const status = await client.line.getStatus({ 
 *   lineIds: ['central', 'victoria'],
 *   severity: 10
 * });
 */
interface LineStatusQuery extends BaseLineQuery {
  /** Filter by status severity level (1-20) */
  severity?: number;
  /** Filter by date range */
  dateRange?: {
    /** Start date in ISO format */
    startDate: string;
    /** End date in ISO format */
    endDate: string;
  };
  /** Include details of disruptions */
  detail?: boolean;
  /** Filter by severity level string */
  severityLevel?: string;
}

/**
 * Query options for line search requests
 * @example
 * // Search for lines containing "victoria"
 * const results = await client.line.search({ 
 *   query: "victoria",
 *   modes: ['tube']
 * });
 */
interface LineSearchQuery {
  /** Search query string */
  query: string;
  /** Filter by transport modes */
  modes?: ModeInput[];
  /** Filter by service types */
  serviceTypes?: ServiceTypeInput[];
}

/**
 * Query options for line route sequence requests
 * @example
 * // Get route sequence for Central line inbound
 * const sequence = await client.line.getRouteSequence({
 *   id: 'central',
 *   direction: 'inbound',
 *   serviceTypes: ['Regular']
 * });
 */
interface LineRouteSequenceQuery {
  /** Single line ID */
  id: LineIdInput;
  /** Direction of travel */
  direction: 'inbound' | 'outbound';
  /** Service types to filter by */
  serviceTypes?: ServiceTypeInput[];
  /** Exclude crowding information */
  excludeCrowding?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for line stop points requests
 * @example
 * // Get all stations for Central line
 * const stations = await client.line.getStopPoints({ id: 'central' });
 */
interface LineStopPointsQuery {
  /** Single line ID */
  id: LineIdInput;
  /** Filter to TfL-operated national rail stations only */
  tflOperatedNationalRailStationsOnly?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for line timetable requests
 * @example
 * // Get timetable from Oxford Circus to Victoria
 * const timetable = await client.line.getTimetable({
 *   id: 'central',
 *   fromStopPointId: '940GZZLUOXC',
 *   toStopPointId: '940GZZLUVIC'
 * });
 */
interface LineTimetableQuery {
  /** Single line ID */
  id: LineIdInput;
  /** Originating station stop point ID */
  fromStopPointId: string;
  /** Destination station stop point ID (optional) */
  toStopPointId?: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for line arrivals requests
 * @example
 * // Get arrivals for Central line at Oxford Circus
 * const arrivals = await client.line.getArrivals({
 *   lineIds: ['central'],
 *   stopPointId: '940GZZLUOXC',
 *   direction: 'inbound'
 * });
 * 
 * // Get inbound arrivals for Victoria line at Victoria
 * const arrivals = await client.line.getArrivals({
 *   lineIds: ['victoria'],
 *   stopPointId: '940GZZLUVIC',
 *   direction: 'inbound'
 * });
 */
interface LineArrivalsQuery {
  /** Array of line IDs */
  lineIds: LineIdInput[];
  /** Stop point ID */
  stopPointId: string;
  /** Direction of travel */
  direction?: 'inbound' | 'outbound' | 'all';
  /** Destination station ID */
  destinationStationId?: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Line information returned by the Tfl API
 * @example
 * {
 *   id: "central",
 *   name: "Central",
 *   modeName: "tube",
 *   created: "2024-01-01T00:00:00Z",
 *   lineStatuses: [
 *     {
 *       statusSeverity: 10,
 *       statusSeverityDescription: "Good Service",
 *       reason: "No issues reported"
 *     }
 *   ]
 * }
 */
export interface LineInfo {
  /** Unique identifier for the line */
  id: string;
  /** Display name of the line */
  name: string;
  /** Transport mode (e.g., 'tube', 'bus') */
  modeName: ModeName;
  /** Creation date of the line */
  created: string;
  /** Current status information */
  lineStatuses?: TflLineStatus[];
  /** Additional line information */
  [key: string]: any;
}

/**
 * Line class for interacting with Tfl Line API endpoints
 * @example
 * // Get all tube lines
 * const tubeLines = await client.line.get({ modes: ['tube'] });
 * 
 * // Get status for specific lines
 * const status = await client.line.getStatus({ lineIds: ['central', 'victoria'] });
 * 
 * // Search for lines
 * const results = await client.line.search({ query: "victoria" });
 * 
 * // Get static line information (no HTTP request)
 * const lineName = client.line.LINE_NAMES['central']; // "Central"
 * const lineInfo = client.line.LINE_INFO['central']; // Full line information
 * 
 * // Validate user input before making API calls
 * const validateLineIds = (ids: string[]) => {
 *   const validIds = ids.filter(id => id in client.line.LINE_NAMES);
 *   if (validIds.length !== ids.length) {
 *     const invalidIds = ids.filter(id => !(id in client.line.LINE_NAMES));
 *     throw new Error(`Invalid line IDs: ${invalidIds.join(', ')}`);
 *   }
 *   return validIds;
 * };
 */
export class Line {
  private batchRequest: BatchRequest;

  /** Map of line IDs to their display names (static, no HTTP request needed) */
  public readonly LINE_NAMES = LINE_NAMES;

  /** Map of line IDs to their full information (static, no HTTP request needed) */
  public readonly LINE_INFO = LINE_INFO;

  /** Map of mode names to their metadata (static, no HTTP request needed) */
  public readonly MODE_METADATA = modeMetadata;

  /** Available severity descriptions (static, no HTTP request needed) */
  public readonly SEVERITY_DESCRIPTIONS: typeof severityDescriptions = severityDescriptions;

  /** Available service types (static, no HTTP request needed) */
  public readonly SERVICE_TYPES: readonly ServiceType[] = ServiceTypes;

  /** Available disruption categories (static, no HTTP request needed) */
  public readonly DISRUPTION_CATEGORIES: readonly DisruptionCategory[] = DisruptionCategories;

  /** Mode-specific severity types (static, no HTTP request needed) */
  public readonly SEVERITY_BY_MODE = severityByMode;

  /** Available mode names (static, no HTTP request needed) */
  public readonly MODE_NAMES: readonly ModeName[] = Modes.map(m => m.modeName);

  /** Available place types (static, no HTTP request needed) */
  public readonly PLACE_TYPES: readonly typeof PlaceTypes[number][] = PlaceTypes;

  /** Available search providers (static, no HTTP request needed) */
  public readonly SEARCH_PROVIDERS: readonly typeof SearchProviders[number][] = SearchProviders;

  /** Available sort options (static, no HTTP request needed) */
  public readonly SORT_OPTIONS: readonly typeof Sorts[number][] = Sorts;

  /** Available stop types (static, no HTTP request needed) */
  public readonly STOP_TYPES: readonly typeof StopTypes[number][] = StopTypes;

  /** Available categories with their keys (static, no HTTP request needed) */
  public readonly CATEGORIES: readonly typeof Categories[number][] = Categories;

  /** All severity levels and descriptions (static, no HTTP request needed) */
  public readonly ALL_SEVERITY: readonly typeof Severity[number][] = Severity;

  constructor(private raw: RawClient) {
    this.batchRequest = new BatchRequest(raw);
  }

  /**
   * Get line information
   * @param options - Query options for filtering lines
   * @returns Promise resolving to an array of line information
   * @example
   * // Get all lines
   * const allLines = await client.line.get();
   * 
   * // Get tube lines
   * const tubeLines = await client.line.get({ modes: ['tube'] });
   * 
   * // Get specific lines
   * const specificLines = await client.line.get({ 
   *   lineIds: ['central', 'victoria', 'jubilee'] 
   * });
   * 
   * // Validate user input before making API calls
   * const userInput = ['central', 'invalid-line'];
   * const validIds = userInput.filter(id => id in client.line.LINE_NAMES);
   * if (validIds.length !== userInput.length) {
   *   throw new Error(`Invalid line IDs: ${userInput.filter(id => !(id in client.line.LINE_NAMES)).join(', ')}`);
   * }
   */
  async get(options?: BaseLineQuery): Promise<LineInfo[]> {
    const { lineIds, modes, keepTflTypes } = options || {};

    if (lineIds?.length) {
      const response = await this.batchRequest.processBatch(
        lineIds,
        async (chunk) => this.raw.line.get({ ids: chunk, keepTflTypes })
      );
      return response as LineInfo[];
    }

    if (modes?.length) {
      const response = await this.batchRequest.processBatch(
        modes,
        async (chunk) => this.raw.line.getByMode({ modes: chunk, keepTflTypes })
      );
      return response as LineInfo[];
    }

    const response = await this.raw.line.get({ ids: [], keepTflTypes });
    return response as LineInfo[];
  }

  /**
   * Get detailed route information for Tfl lines
   * 
   * This method returns comprehensive route information including:
   * - Route sections with start and end stations
   * - Service types (Regular/Night)
   * - Direction (inbound/outbound)
   * - Valid date ranges
   * 
   * @param options - Query options for filtering routes
   * @returns Promise resolving to an array of line route information
   * @example
   * // Most common: Get routes for specific lines
   * const specificRoutes = await client.line.getRoute({ 
   *   lineIds: ['central', 'victoria'],
   *   serviceTypes: ['Regular']
   * });
   * 
   * // Common: Get routes for all lines of a specific mode
   * const tubeRoutes = await client.line.getRoute({ 
   *   modes: ['tube'],
   *   serviceTypes: ['Regular', 'Night']
   * });
   * 
   * // Less common: Get all routes (use with caution - returns large dataset)
   * const allRoutes = await client.line.getRoute();
   */
  async getRoute(options: LineRouteQuery = {}): Promise<TflLine[]> {
    const { lineIds, modes, keepTflTypes } = options;

    if (lineIds?.length) {
      return this.raw.line.lineRoutesByIds({
        ids: lineIds,
        serviceTypes: options.serviceTypes as ServiceType[],
        keepTflTypes,
      });
    }

    if (modes?.length) {
      return this.raw.line.routeByMode({
        modes,
        serviceTypes: options.serviceTypes as ServiceType[],
        keepTflTypes,
      });
    }

    return this.raw.line.route({
      serviceTypes: options.serviceTypes as ServiceType[],
      keepTflTypes,
    });
  }

  /**
   * Get route sequence for a specific line and direction
   * 
   * This method returns the complete sequence of stops for a line in a specific direction,
   * including detailed information about each stop and the route sections.
   * 
   * @param idOrOptions - Line ID, or full query options object
   * @param direction - Direction when using positional form
   * @param options - Optional flags when using positional form
   * @returns Promise resolving to route sequence information
   * @example
   * const sequence = await client.line.getRouteSequence('central', 'inbound');
   * const sequence = await client.line.getRouteSequence({
   *   id: 'victoria',
   *   direction: 'outbound',
   *   excludeCrowding: true
   * });
   */
  async getRouteSequence(
    id: LineIdInput,
    direction: 'inbound' | 'outbound',
    options?: Omit<LineRouteSequenceQuery, 'id' | 'direction'>,
  ): Promise<TflRouteSequence>;
  async getRouteSequence(options: LineRouteSequenceQuery): Promise<TflRouteSequence>;
  async getRouteSequence(
    idOrOptions: LineIdInput | LineRouteSequenceQuery,
    direction?: 'inbound' | 'outbound',
    options?: Omit<LineRouteSequenceQuery, 'id' | 'direction'>,
  ): Promise<TflRouteSequence> {
    const query: LineRouteSequenceQuery =
      typeof idOrOptions === 'string'
        ? { id: idOrOptions, direction: direction!, ...options }
        : idOrOptions;
    const { id, direction: dir, serviceTypes, excludeCrowding, keepTflTypes } = query;
    
    return this.raw.line.routeSequence({
      id,
      direction: dir,
      serviceTypes: serviceTypes as ServiceType[] | undefined,
      excludeCrowding,
      keepTflTypes,
    });
  }

  /**
   * Get line status information
   * @param options - Query options for status filtering
   * @returns Promise resolving to an array of line status information
   * @example
   * // Get status for specific lines
   * const status = await client.line.getStatus({ 
   *   lineIds: ['central', 'victoria'],
   *   detail: true
   * });
   * 
   * // Get status for all lines with specific severity
   * const severeDelays = await client.line.getStatus({ severity: 3 });
   * 
   * // Get status for tube lines only
   * const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
   */
  async getStatus(options: LineStatusQuery = {}): Promise<TflLine[]> {
    const { lineIds, modes, severity, dateRange, detail, severityLevel, keepTflTypes } = options;

    // Handle severity-based status (new endpoint)
    if (severity !== undefined && !lineIds?.length && !modes?.length) {
      return this.raw.line.statusBySeverity({
        severity,
        keepTflTypes,
      });
    }

    if (dateRange && lineIds?.length) {
      return this.batchRequest.processBatch(
        lineIds,
        async (chunk) => this.raw.line.status({
          ids: chunk,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          detail,
          keepTflTypes,
        })
      );
    }

    if (lineIds?.length) {
      return this.batchRequest.processBatch(
        lineIds,
        async (chunk) => this.raw.line.statusByIds({
          ids: chunk,
          detail,
          keepTflTypes,
        })
      );
    }

    // Handle mode specific status
    if (modes?.length) {
      return this.raw.line.statusByMode({
        modes: modes as string[],
        detail,
        severityLevel,
        keepTflTypes,
      });
    }

    // Default: get all modes first, then get status for all modes
    const allModes = await this.raw.line.metaModes({ keepTflTypes });
    const modeNames = allModes.map((mode: any) => mode.modeName).filter((name: any): name is string => name !== undefined);
    return this.raw.line.statusByMode({
      modes: modeNames,
      detail,
      keepTflTypes,
    });
  }

  /**
   * Get line disruption information
   * @param options - Query options for disruption filtering
   * @returns Promise resolving to an array of disruption information
   * @example
   * // Get disruptions for specific lines
   * const disruptions = await client.line.getDisruption({ 
   *   lineIds: ['central', 'victoria'] 
   * });
   * 
   * // Get disruptions for all tube lines
   * const tubeDisruptions = await client.line.getDisruption({ 
   *   modes: ['tube'] 
   * });
   */
  async getDisruption(options: BaseLineQuery = {}): Promise<TflDisruption[]> {
    const { lineIds, modes, keepTflTypes } = options;

    if (lineIds?.length) {
      return this.raw.line.disruption({ ids: lineIds, keepTflTypes });
    }

    if (modes?.length) {
      return this.raw.line.disruptionByMode({ modes: modes as string[], keepTflTypes });
    }

    const categories = await this.raw.line.metaDisruptionCategories({ keepTflTypes });
    return categories.map(category => ({
      category: category as DisruptionCategory,
      type: '',
      description: '',
    })) as TflDisruption[];
  }

  /**
   * Get stop points (stations) for a specific line
   * 
   * This method returns all stations that serve a given line, including
   * their stop point IDs, names, and additional information.
   * 
   * @param idOrOptions - Line ID, or full query options object
   * @param options - Optional flags when using positional form
   * @returns Promise resolving to an array of stop point information
   * @example
   * const stations = await client.line.getStopPoints('central');
   * const tflStations = await client.line.getStopPoints({
   *   id: 'elizabeth',
   *   tflOperatedNationalRailStationsOnly: true
   * });
   */
  async getStopPoints(id: LineIdInput): Promise<TflStopPoint[]>;
  async getStopPoints(
    id: LineIdInput,
    options: Omit<LineStopPointsQuery, 'id'>,
  ): Promise<TflStopPoint[]>;
  async getStopPoints(options: LineStopPointsQuery): Promise<TflStopPoint[]>;
  async getStopPoints(
    idOrOptions: LineIdInput | LineStopPointsQuery,
    options?: Omit<LineStopPointsQuery, 'id'>,
  ): Promise<TflStopPoint[]> {
    const query: LineStopPointsQuery =
      typeof idOrOptions === 'string' ? { id: idOrOptions, ...options } : idOrOptions;
    const { id, tflOperatedNationalRailStationsOnly, keepTflTypes } = query;
    
    return this.raw.line.stopPoints({
      id,
      tflOperatedNationalRailStationsOnly,
      keepTflTypes,
    });
  }

  /**
   * Get timetable for a specific line and station
   * 
   * This method returns timetable information for a specific station on a line,
   * optionally including destination-specific timetables.
   * 
   * @param idOrOptions - Line ID, or full query options object
   * @param fromStopPointId - Origin stop when using positional form
   * @param options - Optional destination / flags when using positional form
   * @returns Promise resolving to timetable information
   * @example
   * const timetable = await client.line.getTimetable('central', '940GZZLUOXC');
   * const timetable = await client.line.getTimetable({
   *   id: 'central',
   *   fromStopPointId: '940GZZLUOXC',
   *   toStopPointId: '940GZZLUVIC'
   * });
   */
  async getTimetable(
    id: LineIdInput,
    fromStopPointId: string,
    options?: Omit<LineTimetableQuery, 'id' | 'fromStopPointId'>,
  ): Promise<TflTimetableResponse>;
  async getTimetable(options: LineTimetableQuery): Promise<TflTimetableResponse>;
  async getTimetable(
    idOrOptions: LineIdInput | LineTimetableQuery,
    fromStopPointId?: string,
    options?: Omit<LineTimetableQuery, 'id' | 'fromStopPointId'>,
  ): Promise<TflTimetableResponse> {
    const query: LineTimetableQuery =
      typeof idOrOptions === 'string'
        ? { id: idOrOptions, fromStopPointId: fromStopPointId!, ...options }
        : idOrOptions;
    const { id, fromStopPointId: fromId, toStopPointId, keepTflTypes } = query;
    
    if (toStopPointId) {
      return this.raw.line.timetableTo({
        fromStopPointId: fromId,
        id,
        toStopPointId,
        keepTflTypes,
      });
    }
    
    return this.raw.line.timetable({
      fromStopPointId: fromId,
      id,
      keepTflTypes,
    });
  }

  /**
   * Get arrival predictions for specific lines at a stop
   * 
   * This method returns real-time arrival predictions for specified lines
   * at a given stop, with optional direction and destination filtering.
   * 
   * @param options - Query options for arrivals
   * @returns Promise resolving to an array of arrival predictions
   * @example
   * // Get arrivals for Central line at Oxford Circus
   * const arrivals = await client.line.getArrivals({
   *   lineIds: ['central'],
   *   stopPointId: '940GZZLUOXC'
   * });
   * 
   * // Get inbound arrivals for Victoria line at Victoria
   * const arrivals = await client.line.getArrivals({
   *   lineIds: ['victoria'],
   *   stopPointId: '940GZZLUVIC',
   *   direction: 'inbound'
   * });
   */
  async getArrivals(options: LineArrivalsQuery): Promise<TflPrediction[]> {
    const { lineIds, stopPointId, direction, destinationStationId, keepTflTypes } = options;
    
    return this.raw.line.arrivals({
      ids: lineIds,
      stopPointId,
      direction,
      destinationStationId,
      keepTflTypes,
    });
  }

  /**
   * Search lines and routes
   * @param queryOrOptions - Search string, or full query options object
   * @param options - Filters when using positional form
   * @returns Promise resolving to search results
   * @example
   * const results = await client.line.search('victoria', { modes: ['tube'] });
   * const results = await client.line.search({
   *   query: 'central',
   *   serviceTypes: ['Night']
   * });
   */
  async search(
    query: string,
    options?: Omit<LineSearchQuery, 'query'> & { keepTflTypes?: boolean },
  ): Promise<TflRouteSearchResponse>;
  async search(options: LineSearchQuery & { keepTflTypes?: boolean }): Promise<TflRouteSearchResponse>;
  async search(
    queryOrOptions: string | (LineSearchQuery & { keepTflTypes?: boolean }),
    options?: Omit<LineSearchQuery, 'query'> & { keepTflTypes?: boolean },
  ): Promise<TflRouteSearchResponse> {
    const queryOptions: LineSearchQuery & { keepTflTypes?: boolean } =
      typeof queryOrOptions === 'string'
        ? { query: queryOrOptions, ...options }
        : queryOrOptions;
    const { query, modes, serviceTypes, keepTflTypes } = queryOptions;
    return this.raw.line.search({
      query, 
      modes: modes as string[] | undefined,
      serviceTypes: serviceTypes as ServiceType[] | undefined,
      keepTflTypes,
    });
  }

  /**
   * Get line metadata (makes HTTP request to TfL API)
   * 
   * This method fetches live metadata from the TfL API. For static metadata
   * that doesn't change frequently, consider using the static properties
   * instead to save HTTP round trips.
   * 
   * @param options - Options for metadata request
   * @returns Promise resolving to line metadata
   * @example
   * // Get live metadata from TfL API
   * const meta = await client.line.getMeta();
   * 
   * // Use static metadata instead (no HTTP request)
   * const serviceTypes = client.line.SERVICE_TYPES; // ['Regular', 'Night']
   * const disruptionCategories = client.line.DISRUPTION_CATEGORIES;
   */
  async getMeta(options: { keepTflTypes?: boolean } = {}): Promise<{
    modes: TflApiMode[];
    severities: TflStatusSeverity[];
    disruptionCategories: string[];
    serviceTypes: string[];
  }> {
    const [modes, severities, disruptions, serviceTypes] = await Promise.all([
      this.raw.line.metaModes({ keepTflTypes: options.keepTflTypes }),
      this.raw.line.metaSeverity({ keepTflTypes: options.keepTflTypes }),
      this.raw.line.metaDisruptionCategories({ keepTflTypes: options.keepTflTypes }),
      this.raw.line.metaServiceTypes({ keepTflTypes: options.keepTflTypes }),
    ]);

    return {
      modes,
      severities,
      disruptionCategories: disruptions as string[],
      serviceTypes: serviceTypes as string[],
    };
  }
}

// Export the Line module and all interfaces
export { 
  BaseLineQuery, 
  LineRouteQuery, 
  LineStatusQuery, 
  LineSearchQuery,
  LineRouteSequenceQuery,
  LineStopPointsQuery,
  LineTimetableQuery,
  LineArrivalsQuery
};

// Re-export static types and enums for direct use
export {
  TflLineId,
  LINE_NAMES,
  LINE_INFO,
  modeMetadata,
  severityDescriptions,
  severityByMode
};

export type { ModeName, NamedLineId, LineIdInput, ModeInput, ServiceTypeInput };

// Re-export the raw Lines data
export { Lines };