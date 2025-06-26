import { 
  Api, 
  TflApiPresentationEntitiesAccidentStatsAccidentDetail as TflAccidentDetail,
  TflApiPresentationEntitiesAccidentStatsAccidentStatsOrderedSummary as TflAccidentStatsOrderedSummary
} from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';

// Import raw data from generated meta files
import { ACCIDENTSTATS_DATA } from './generated/jsdoc/AccidentStats';

/**
 * Query options for accident statistics requests
 * @example
 * // Get accident statistics for 2023
 * const accidents = await client.accidentStats.get({ year: 2023 });
 */
interface AccidentStatsQuery {
  /** The year for which to filter the accidents on */
  year: number;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Accident statistics information returned by the TfL API
 * @example
 * {
 *   id: 12345,
 *   lat: 51.5074,
 *   lon: -0.1278,
 *   location: "Oxford Street, London",
 *   date: "2023-01-15T10:30:00Z",
 *   severity: "Slight",
 *   borough: "Westminster",
 *   casualties: [
 *     {
 *       age: 25,
 *       class: "Pedestrian",
 *       severity: "Slight"
 *     }
 *   ]
 * }
 */
export interface AccidentStatsInfo {
  /** Unique identifier for the accident */
  id: number;
  /** Latitude coordinate of the accident location */
  lat: number;
  /** Longitude coordinate of the accident location */
  lon: number;
  /** Human-readable location description */
  location: string;
  /** Date and time of the accident */
  date: string;
  /** Severity level of the accident */
  severity: string;
  /** Borough where the accident occurred */
  borough: string;
  /** Additional accident information */
  [key: string]: any;
}

/**
 * AccidentStats class for interacting with TfL AccidentStats API endpoints
 * @example
 * // Get accident statistics for a specific year
 * const accidents = await client.accidentStats.get({ year: 2023 });
 * 
 * // Access static metadata (no HTTP request)
 * const endpoints = client.accidentStats.ENDPOINTS;
 * const totalEndpoints = client.accidentStats.TOTAL_ENDPOINTS;
 */
export class AccidentStats {
  /** Available API endpoints (static, no HTTP request needed) */
  public readonly ENDPOINTS = ACCIDENTSTATS_DATA.endpoints;

  /** Total number of available endpoints (static, no HTTP request needed) */
  public readonly TOTAL_ENDPOINTS = ACCIDENTSTATS_DATA.totalEndpoints;

  /** API section name (static, no HTTP request needed) */
  public readonly SECTION = ACCIDENTSTATS_DATA.section;

  /** Generation timestamp (static, no HTTP request needed) */
  public readonly GENERATED_AT = ACCIDENTSTATS_DATA.generatedAt;

  constructor(private api: Api<{}>) {}

  /**
   * Gets all accident details for accidents occurring in the specified year
   * 
   * This method returns comprehensive accident statistics including:
   * - Location details (coordinates, borough, street name)
   * - Accident details (date, time, severity)
   * - Casualty information (age, type, severity)
   * - Vehicle information (type, details)
   * 
   * @param options - Query options for accident statistics
   * @returns Promise resolving to an array of accident details
   * @example
   * // Get all accidents from 2023
   * const accidents = await client.accidentStats.get({ year: 2023 });
   * 
   * // Get accidents with type fields preserved
   * const accidents = await client.accidentStats.get({ 
   *   year: 2023,
   *   keepTflTypes: true
   * });
   * 
   * // Process accident data
   * accidents.forEach(accident => {
   *   console.log(`Accident on ${accident.date} at ${accident.location}`);
   *   console.log(`Severity: ${accident.severity}, Borough: ${accident.borough}`);
   * });
   */
  async get(options: AccidentStatsQuery): Promise<TflAccidentDetail[]> {
    const { year, keepTflTypes } = options;
    return this.api.accidentStats.accidentStatsGet(year)
      .then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Get accident statistics metadata (makes HTTP request to TfL API)
   * 
   * This method fetches live metadata from the TfL API. For static metadata
   * that doesn't change frequently, consider using the static properties
   * instead to save HTTP round trips.
   * 
   * @param options - Options for metadata request
   * @returns Promise resolving to accident statistics metadata
   * @example
   * // Get live metadata from TfL API
   * const meta = await client.accidentStats.getMeta();
   * 
   * // Use static metadata instead (no HTTP request)
   * const endpoints = client.accidentStats.ENDPOINTS;
   * const totalEndpoints = client.accidentStats.TOTAL_ENDPOINTS;
   */
  async getMeta(options: { keepTflTypes?: boolean } = {}): Promise<{
    endpoints: typeof ACCIDENTSTATS_DATA.endpoints;
    totalEndpoints: number;
    section: string;
    generatedAt: string;
  }> {
    return {
      endpoints: this.ENDPOINTS,
      totalEndpoints: this.TOTAL_ENDPOINTS,
      section: this.SECTION,
      generatedAt: this.GENERATED_AT
    };
  }
}

// Export the AccidentStats module and all interfaces
export { AccidentStatsQuery };

// Re-export static types and constants for direct use
export {
  ACCIDENTSTATS_DATA
};
