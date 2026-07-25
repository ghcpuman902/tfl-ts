import { 
  TflApiPresentationEntitiesAccidentStatsAccidentDetail as TflAccidentDetail
} from './generated/types';
import { RawClient } from './generated/raw';



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
 * ⚠️ **DEPRECATED / RETIRING — NOT FOR NEW WORK**
 *
 * Wraps TfL `GET /AccidentStats/{year}`.
 *
 * Per TfL’s Unified API tidy-up (June 2026), this endpoint is scheduled for
 * removal on **31 July 2026**. It only ever exposed data for **2005–2019**.
 * Modern years return 400; do not build products on it.
 *
 * @see https://techforum.tfl.gov.uk/t/unified-api-tidy-up/6296
 *
 * **Alternatives:**
 * - TfL road safety publications: https://tfl.gov.uk/corporate/publications-and-reports/road-safety
 * - London Datastore / DfT STATS19 accident datasets
 *
 * @example
 * // Historical years only (2005–2019) — may still fail as the feed is wound down
 * const accidents = await client.accidentStats.get({ year: 2019 });
 */
export class AccidentStats {

  constructor(private raw: RawClient) {}

  /**
   * Gets all accident details for accidents occurring in the specified year
   * 
   * ⚠️ **WARNING: This method is part of a deprecated API.**
   * See the class documentation above for details and recommended alternatives.
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
   * // Historical years only (2005–2019). Post-2019 and many live calls fail.
   * const accidents = await client.accidentStats.get({ year: 2019 });
   * 
   * const withTypes = await client.accidentStats.get({
   *   year: 2019,
   *   keepTflTypes: true,
   * });
   */
  async get(options: AccidentStatsQuery): Promise<TflAccidentDetail[]> {
    const { year, keepTflTypes } = options;
    return this.raw.accidentStats.get({ year, keepTflTypes })
      .catch((error: any) => {
        // The error is a Response object, not an axios-style error
        if (error instanceof Response) {
          const status = error.status;
          const statusText = error.statusText;
          
          if (status === 404) {
            throw new Error(`No accident data available for year ${year}. This year may not have data or may not be accessible.`);
          }
          if (status === 400) {
            throw new Error(`Invalid year parameter: ${year}. The year ${year} is not supported by the TfL AccidentStats API.`);
          }
          if (status === 403) {
            throw new Error('Access denied. Please check your API credentials and permissions.');
          }
          if (status >= 500) {
            throw new Error(`TfL API server error (${status}). Please try again later.`);
          }
          
          // For other status codes, provide a generic but helpful message
          throw new Error(`TfL API error (${status} ${statusText}) for year ${year}. Please check the year parameter.`);
        }
        
        // Handle other types of errors
        if (error?.message?.includes('fetch')) {
          throw new Error(`Network error: Unable to connect to TfL API. Please check your internet connection.`);
        }
        
        if (error?.message?.includes('timeout')) {
          throw new Error(`Request timeout: TfL API is taking too long to respond. Please try again.`);
        }
        
        // If we can't categorize it, provide a more helpful error message
        const originalMessage = error?.message || 'Unknown error occurred';
        throw new Error(`TfL API error for year ${year}: ${originalMessage}`);
      });
  }


}

// Export the AccidentStats module and all interfaces
export { AccidentStatsQuery };
