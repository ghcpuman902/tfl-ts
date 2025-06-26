import { 
  Api, 
  TflApiPresentationEntitiesRoadCorridor,
  TflApiPresentationEntitiesRoadDisruption
} from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';

// Import raw data from generated meta files
import { ROAD_DATA } from './generated/jsdoc/Road';
import { 
  RoadCategory, 
  roadSeverity, 
  SeverityDescription, 
  SeverityByMode 
} from './generated/meta/Road';

// Generate types from the generated meta data
type RoadCategoryType = RoadCategory;
type RoadSeverityType = roadSeverity;
type SeverityDescriptionType = SeverityDescription;

// Create arrays from the types for static properties
const ROAD_CATEGORIES: readonly RoadCategoryType[] = [
  'Undefined', 'RealTime', 'PlannedWork', 'Information', 'Event', 'Crowding', 'StatusAlert'
] as const;

const ROAD_SEVERITY_DESCRIPTIONS: readonly SeverityDescriptionType[] = [
  'Good Service', 'Minor Delays', 'Severe Delays', 'Part Suspended', 'Suspended'
] as const;

/**
 * Query options for road status requests
 * @example
 * // Get status for specific roads
 * const status = await client.road.getStatus({ 
 *   ids: ['A406', 'A2'],
 *   dateRange: {
 *     startDate: '2023-01-01',
 *     endDate: '2023-01-31'
 *   }
 * });
 */
interface RoadStatusQuery {
  /** Comma-separated list of road identifiers (e.g., 'A406, A2') or 'all' for all roads */
  ids: string[];
  /** Optional date range for filtering */
  dateRange?: {
    /** Start date in ISO format */
    startDate: string;
    /** End date in ISO format */
    endDate: string;
  };
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for road disruption requests
 * @example
 * // Get disruptions for specific roads
 * const disruptions = await client.road.getDisruptions({
 *   ids: ['A406', 'A2'],
 *   stripContent: false,
 *   severities: ['Good Service', 'Minor Delays']
 * });
 */
interface RoadDisruptionQuery {
  /** Comma-separated list of road identifiers (e.g., 'A406, A2') or 'all' for all roads */
  ids: string[];
  /** Whether to strip content to essential fields only */
  stripContent?: boolean;
  /** Array of severity names to filter on */
  severities?: SeverityDescriptionType[];
  /** Array of category names to filter on */
  categories?: RoadCategoryType[];
  /** Whether to always include road closures regardless of severity filter */
  closures?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for road street disruption requests
 * @example
 * // Get disrupted streets
 * const streets = await client.road.getDisruptedStreets({
 *   startDate: '2023-01-01',
 *   endDate: '2023-01-31'
 * });
 */
interface RoadStreetDisruptionQuery {
  /** Start time to filter on */
  startDate: string;
  /** End time to filter on */
  endDate: string;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Query options for road disruption by ID requests
 * @example
 * // Get specific disruptions by ID
 * const disruption = await client.road.getDisruptionById({
 *   disruptionIds: ['12345', '67890'],
 *   stripContent: true
 * });
 */
interface RoadDisruptionByIdQuery {
  /** Comma-separated list of disruption identifiers */
  disruptionIds: string[];
  /** Whether to strip content to essential fields only */
  stripContent?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Road corridor information returned by the TfL API
 * @example
 * {
 *   id: "A406",
 *   displayName: "North Circular (A406)",
 *   group: "Red Routes",
 *   statusSeverity: "Good Service",
 *   statusSeverityDescription: "No issues reported"
 * }
 */
export interface RoadCorridorInfo {
  /** Unique identifier for the road */
  id: string;
  /** Display name of the road */
  displayName: string;
  /** Road group classification */
  group: string;
  /** Status severity level */
  statusSeverity: string;
  /** Description of the status severity */
  statusSeverityDescription: string;
  /** Additional road information */
  [key: string]: any;
}

/**
 * Road class for interacting with TfL Road API endpoints
 * @example
 * // Get all roads managed by TfL
 * const allRoads = await client.road.get();
 * 
 * // Get status for specific roads
 * const status = await client.road.getStatus({ ids: ['A406', 'A2'] });
 * 
 * // Get disruptions for roads
 * const disruptions = await client.road.getDisruptions({ ids: ['A406'] });
 * 
 * // Access static metadata (no HTTP request)
 * const categories = client.road.ROAD_CATEGORIES;
 * const severities = client.road.ROAD_SEVERITY_DESCRIPTIONS;
 */
export class Road {
  /** Available API endpoints (static, no HTTP request needed) */
  public readonly ENDPOINTS = ROAD_DATA.endpoints;

  /** Total number of available endpoints (static, no HTTP request needed) */
  public readonly TOTAL_ENDPOINTS = ROAD_DATA.totalEndpoints;

  /** API section name (static, no HTTP request needed) */
  public readonly SECTION = ROAD_DATA.section;

  /** Generation timestamp (static, no HTTP request needed) */
  public readonly GENERATED_AT = ROAD_DATA.generatedAt;

  /** Available road categories (static, no HTTP request needed) */
  public readonly ROAD_CATEGORIES: readonly RoadCategoryType[] = ROAD_CATEGORIES;

  /** Available road severity descriptions (static, no HTTP request needed) */
  public readonly ROAD_SEVERITY_DESCRIPTIONS: readonly SeverityDescriptionType[] = ROAD_SEVERITY_DESCRIPTIONS;

  /** Road severity by mode mapping (static, no HTTP request needed) */
  public readonly SEVERITY_BY_MODE = SeverityByMode;

  constructor(private api: Api<{}>) {}

  /**
   * Gets all roads managed by TfL
   * 
   * This method returns a comprehensive list of all roads managed by TfL,
   * including major arterial routes, red routes, and other strategic roads.
   * 
   * @param options - Options for the request
   * @returns Promise resolving to an array of road corridors
   * @example
   * // Get all roads managed by TfL
   * const allRoads = await client.road.get();
   * 
   * // Get roads with type fields preserved
   * const allRoads = await client.road.get({ keepTflTypes: true });
   * 
   * // Process road data
   * allRoads.forEach(road => {
   *   console.log(`${road.displayName}: ${road.statusSeverityDescription}`);
   * });
   */
  async get(options: { keepTflTypes?: boolean } = {}): Promise<TflApiPresentationEntitiesRoadCorridor[]> {
    return this.api.road.roadGet()
      .then(response => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Gets the road with the specified id
   * 
   * This method returns detailed information about specific roads by their identifiers.
   * 
   * @param ids - Array of road identifiers (e.g., ['A406', 'A2'])
   * @param options - Options for the request
   * @returns Promise resolving to an array of road corridors
   * @example
   * // Get specific roads by ID
   * const roads = await client.road.getById(['A406', 'A2']);
   * 
   * // Get single road
   * const road = await client.road.getById(['A406']);
   */
  async getById(ids: string[], options: { keepTflTypes?: boolean } = {}): Promise<TflApiPresentationEntitiesRoadCorridor[]> {
    return this.api.road.roadGet2(ids)
      .then((response: any) => stripTypeFields(response.data, options.keepTflTypes));
  }

  /**
   * Gets the specified roads with the status aggregated over the date range specified
   * 
   * This method returns road status information aggregated over a specified date range,
   * or from now until the end of today if no dates are provided.
   * 
   * @param options - Query options for road status
   * @returns Promise resolving to an array of road corridors with status
   * @example
   * // Get status for specific roads
   * const status = await client.road.getStatus({ 
   *   ids: ['A406', 'A2'],
   *   dateRange: {
   *     startDate: '2023-01-01',
   *     endDate: '2023-01-31'
   *   }
   * });
   * 
   * // Get current status for all roads
   * const allStatus = await client.road.getStatus({ ids: ['all'] });
   * 
   * // Get status with type fields preserved
   * const status = await client.road.getStatus({ 
   *   ids: ['A406'],
   *   keepTflTypes: true
   * });
   */
  async getStatus(options: RoadStatusQuery): Promise<TflApiPresentationEntitiesRoadCorridor[]> {
    const { ids, dateRange, keepTflTypes } = options;
    return this.api.road.roadStatus({
      ids: Array.isArray(ids) ? ids : [ids],
      dateRangeNullableStartDate: dateRange?.startDate,
      dateRangeNullableEndDate: dateRange?.endDate
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Get active disruptions, filtered by road ids
   * 
   * This method returns active road disruptions with optional filtering by
   * severity, category, and content stripping options.
   * 
   * @param options - Query options for road disruptions
   * @returns Promise resolving to an array of road disruptions
   * @example
   * // Get disruptions for specific roads
   * const disruptions = await client.road.getDisruptions({
   *   ids: ['A406', 'A2'],
   *   stripContent: false,
   *   severities: ['Good Service', 'Minor Delays']
   * });
   * 
   * // Get all disruptions for all roads
   * const allDisruptions = await client.road.getDisruptions({
   *   ids: ['all'],
   *   categories: ['RealTime', 'PlannedWork']
   * });
   * 
   * // Get minimal disruption data
   * const minimalDisruptions = await client.road.getDisruptions({
   *   ids: ['A406'],
   *   stripContent: true
   * });
   */
  async getDisruptions(options: RoadDisruptionQuery): Promise<TflApiPresentationEntitiesRoadDisruption[]> {
    const { ids, stripContent, severities, categories, closures, keepTflTypes } = options;
    return this.api.road.roadDisruption({
      ids: Array.isArray(ids) ? ids : [ids],
      stripContent,
      severities,
      categories,
      closures
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets a list of disrupted streets
   * 
   * This method returns a list of streets that are currently disrupted.
   * If no date filters are provided, current disruptions are returned.
   * 
   * @param options - Query options for street disruptions
   * @returns Promise resolving to disrupted streets data
   * @example
   * // Get disrupted streets for a date range
   * const streets = await client.road.getDisruptedStreets({
   *   startDate: '2023-01-01',
   *   endDate: '2023-01-31'
   * });
   * 
   * // Get current disrupted streets
   * const currentStreets = await client.road.getDisruptedStreets({
   *   startDate: new Date().toISOString(),
   *   endDate: new Date().toISOString()
   * });
   */
  async getDisruptedStreets(options: RoadStreetDisruptionQuery): Promise<any> {
    const { startDate, endDate, keepTflTypes } = options;
    return this.api.road.roadDisruptedStreets({
      startDate,
      endDate
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Gets a list of active disruptions filtered by disruption Ids
   * 
   * This method returns specific disruptions by their identifiers,
   * with optional content stripping for minimal data.
   * 
   * @param options - Query options for disruption by ID
   * @returns Promise resolving to road disruption data
   * @example
   * // Get specific disruptions by ID
   * const disruption = await client.road.getDisruptionById({
   *   disruptionIds: ['12345', '67890'],
   *   stripContent: true
   * });
   * 
   * // Get full disruption details
   * const fullDisruption = await client.road.getDisruptionById({
   *   disruptionIds: ['12345'],
   *   stripContent: false
   * });
   */
  async getDisruptionById(options: RoadDisruptionByIdQuery): Promise<TflApiPresentationEntitiesRoadDisruption> {
    const { disruptionIds, stripContent, keepTflTypes } = options;
    return this.api.road.roadDisruptionById({
      disruptionIds: Array.isArray(disruptionIds) ? disruptionIds : [disruptionIds],
      stripContent
    }).then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Get road metadata (makes HTTP request to TfL API)
   * 
   * This method fetches live metadata from the TfL API. For static metadata
   * that doesn't change frequently, consider using the static properties
   * instead to save HTTP round trips.
   * 
   * @param options - Options for metadata request
   * @returns Promise resolving to road metadata
   * @example
   * // Get live metadata from TfL API
   * const meta = await client.road.getMeta();
   * 
   * // Use static metadata instead (no HTTP request)
   * const categories = client.road.ROAD_CATEGORIES;
   * const severities = client.road.ROAD_SEVERITY_DESCRIPTIONS;
   */
  async getMeta(options: { keepTflTypes?: boolean } = {}): Promise<{
    endpoints: typeof ROAD_DATA.endpoints;
    totalEndpoints: number;
    section: string;
    generatedAt: string;
    categories: readonly RoadCategoryType[];
    severities: readonly SeverityDescriptionType[];
    severityByMode: typeof SeverityByMode;
  }> {
    return {
      endpoints: this.ENDPOINTS,
      totalEndpoints: this.TOTAL_ENDPOINTS,
      section: this.SECTION,
      generatedAt: this.GENERATED_AT,
      categories: this.ROAD_CATEGORIES,
      severities: this.ROAD_SEVERITY_DESCRIPTIONS,
      severityByMode: this.SEVERITY_BY_MODE
    };
  }
}

// Export the Road module and all interfaces
export { 
  RoadStatusQuery,
  RoadDisruptionQuery,
  RoadStreetDisruptionQuery,
  RoadDisruptionByIdQuery
};

// Re-export static types and constants for direct use
export {
  RoadCategoryType,
  RoadSeverityType,
  SeverityDescriptionType,
  ROAD_CATEGORIES,
  ROAD_SEVERITY_DESCRIPTIONS,
  SeverityByMode,
  ROAD_DATA
}; 