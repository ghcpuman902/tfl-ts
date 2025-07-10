import { 
  Api, 
  TflApiPresentationEntitiesAccidentStatsAccidentDetail as TflAccidentDetail
} from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';



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
 * ⚠️ **DEPRECATED API - NOT RECOMMENDED FOR USE**
 * 
 * Access accident statistics for London roads.
 * 
 * This API appears to be poorly maintained on TfL's side and may not return
 * current or reliable data. Recent testing shows that most years return
 * "Invalid year parameter" errors, suggesting the API is no longer actively
 * supported.
 * 
 * **RECOMMENDED ALTERNATIVES:**
 * - London Datastore: https://data.london.gov.uk/dataset/?tags=GIS&tag=accidents
 * - TfL Road Safety Data: https://tfl.gov.uk/corporate/publications-and-reports/road-safety
 * 
 * This is a simple API that provides accident statistics data by year.
 * No metadata constants are provided as this API only deals with accident data.
 * 
 * @example
 * // Get accident statistics for a specific year
 * const accidents = await client.accidentStats.get({ year: 2023 });
 * 
 * // Process accident data
 * accidents.forEach(accident => {
 *   console.log(`Accident on ${accident.date} at ${accident.location}`);
 *   console.log(`Severity: ${accident.severity}, Borough: ${accident.borough}`);
 * });
 */
export class AccidentStats {

  constructor(private api: Api<{}>) {}

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
      .then((response: any) => stripTypeFields(response.data, keepTflTypes))
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
