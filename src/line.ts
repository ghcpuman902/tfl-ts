import { 
  Api,
  TflApiPresentationEntitiesLineStatus as TflLineStatus,
  TflApiPresentationEntitiesLine as TflLine,
  TflApiPresentationEntitiesDisruption as TflDisruption,
  TflApiPresentationEntitiesCrowding as TflCrowding,
  TflApiPresentationEntitiesMode as TflApiMode,
  TflApiPresentationEntitiesStatusSeverity as TflStatusSeverity,
  TflApiPresentationEntitiesRouteSearchResponse as TflRouteSearchResponse
} from './tfl';
import { BatchRequest } from './utils/batchRequest';
import { ModeName, ServiceType, DisruptionCategory } from './types';
import { TflLineId, LINE_NAMES } from './types/LineId';

/**
 * Query options for line-related requests
 * @example
 * // Get all tube lines
 * const tubeLines = await client.line.get({ modes: ['tube'] });
 * 
 * // Get specific lines by ID
 * const specificLines = await client.line.get({ ids: ['central', 'victoria'] });
 */
interface BaseLineQuery {
  /** Array of line IDs (e.g., 'central', 'victoria', 'jubilee') */
  ids?: TflLineId[];
  /** Array of transport modes (e.g., 'tube', 'bus', 'dlr') */
  modes?: ModeName[];
}

/**
 * Query options for line route requests
 * @example
 * // Most common: Get routes for specific lines
 * const routes = await client.line.getRoute({ 
 *   ids: ['central', 'victoria'],
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
  serviceTypes?: ServiceType[];
}

/**
 * Query options for line status requests
 * @example
 * // Get status for specific lines
 * const status = await client.line.getStatus({ 
 *   ids: ['central', 'victoria'],
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
  modes?: ModeName[];
}

/**
 * Line information returned by the TfL API
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
 * Line class for interacting with TfL Line API endpoints
 * @example
 * // Get all tube lines
 * const tubeLines = await client.line.get({ modes: ['tube'] });
 * 
 * // Get status for specific lines
 * const status = await client.line.getStatus({ ids: ['central', 'victoria'] });
 * 
 * // Search for lines
 * const results = await client.line.search({ query: "victoria" });
 */
export class Line {
  private batchRequest: BatchRequest;

  /** Map of line IDs to their display names */
  public readonly LINE_NAMES = LINE_NAMES;

  constructor(private api: Api<{}>) {
    this.batchRequest = new BatchRequest(api);
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
   *   ids: ['central', 'victoria', 'jubilee'] 
   * });
   */
  async get(options?: BaseLineQuery): Promise<LineInfo[]> {
    const { ids, modes } = options || {};

    if (ids?.length) {
      const response = await this.batchRequest.processBatch(
        ids,
        async (chunk) => this.api.line.lineGet(chunk).then(response => response.data)
      );
      return response as LineInfo[];
    }

    if (modes?.length) {
      const response = await this.batchRequest.processBatch(
        modes,
        async (chunk) => this.api.line.lineGetByMode(chunk).then(response => response.data)
      );
      return response as LineInfo[];
    }

    const response = await this.api.line.lineGet([]).then(response => response.data);
    return response as LineInfo[];
  }

  /**
   * Get detailed route information for TfL lines
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
   *   ids: ['central', 'victoria'],
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
    const { ids, modes } = options;

    if (ids?.length) {
      return this.api.line.lineLineRoutesByIds({ ids, serviceTypes: options.serviceTypes as ServiceType[] }).then(response => response.data);
    }

    if (modes?.length) {
      return this.api.line.lineRouteByMode({ modes, serviceTypes: options.serviceTypes as ServiceType[] }).then(response => response.data);
    }

    return this.api.line.lineRoute({ serviceTypes: options.serviceTypes as ServiceType[] }).then(response => response.data);
  }

  /**
   * Get line status information
   */
  async getStatus(options: LineStatusQuery = {}): Promise<TflLine[]> {
    const { ids, modes, severity, dateRange } = options;

    if (dateRange && ids?.length) {
      return this.batchRequest.processBatch(
        ids,
        async (chunk) => this.api.line.lineStatus({
          ids: chunk,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        }).then(response => response.data)
      );
    }

    if (ids?.length) {
      return this.batchRequest.processBatch(
        ids,
        async (chunk) => this.api.line.lineStatusByIds({ ids: chunk }).then(response => response.data)
      );
    }

    // Handle mode specific status
    if (modes?.length) {
      return this.api.line.lineStatusByMode({ modes: modes as string[] }).then(response => response.data);
    }

    // Default: get all modes first, then get status for all modes
    const allModes = await this.api.line.lineMetaModes().then(response => response.data);
    const modeNames = allModes.map(mode => mode.modeName).filter((name): name is string => name !== undefined);
    return this.api.line.lineStatusByMode({ modes: modeNames }).then(response => response.data);
  }

  /**
   * Get line disruption information
   */
  async getDisruption(options: BaseLineQuery = {}): Promise<TflDisruption[]> {
    const { ids, modes } = options;

    if (ids?.length) {
      return this.api.line.lineDisruption(ids).then(response => response.data);
    }

    if (modes?.length) {
      return this.api.line.lineDisruptionByMode(modes as string[]).then(response => response.data);
    }

    return this.api.line.lineMetaDisruptionCategories().then(response => 
      response.data.map(category => ({
        category: category as DisruptionCategory,
        type: '',
        description: '',
      }))
    );
  }

  /**
   * Get line metadata
   */
  async getMeta(): Promise<{
    modes: TflApiMode[];
    severities: TflStatusSeverity[];
    disruptionCategories: string[];
    serviceTypes: string[];
  }> {
    const [modes, severities, disruptions, serviceTypes] = await Promise.all([
      this.api.line.lineMetaModes().then(response => response.data),
      this.api.line.lineMetaSeverity().then(response => response.data),
      this.api.line.lineMetaDisruptionCategories().then(response => response.data),
      this.api.line.lineMetaServiceTypes().then(response => response.data)
    ]);

    return {
      modes,
      severities,
      disruptionCategories: disruptions,
      serviceTypes
    };
  }

  /**
   * Search lines
   */
  async search(options: LineSearchQuery): Promise<TflRouteSearchResponse> {
    const { query, modes } = options;
    return this.api.line.lineSearch({ 
      query, 
      modes: modes as string[] 
    }).then(response => response.data);
  }
}

// Export the Line module
export { BaseLineQuery, LineRouteQuery, LineStatusQuery, LineSearchQuery };