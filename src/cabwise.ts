/**
 * Cabwise API Module
 * 
 * Provides access to taxi and minicab contact information through the TfL Cabwise service.
 * This module allows users to search for nearby taxi and minicab services based on location.
 * 
 * **Note**: While this API is functional and returns data, the information provided may have limitations:
 * - Some operators may have very few vehicles (e.g., 1-2 vehicles)
 * - Addresses are often registration addresses rather than operational addresses
 * - For comprehensive local minicab information, consider using the official TfL form:
 *   https://tfl.gov.uk/forms/12389.aspx
 * 
 * @example
 * // Search for nearby taxi services
 * const results = await client.cabwise.search({
 *   lat: 51.514792,
 *   lon: -0.118509,
 *   radius: 5000,
 *   maxResults: 10
 * });
 * 
 * // Search for wheelchair accessible services
 * const accessibleResults = await client.cabwise.search({
 *   lat: 51.514792,
 *   lon: -0.118509,
 *   wc: 'true',
 *   optype: 'Minicab' // TypeScript provides autocomplete for valid operator types
 * });
 */

import { 
  Api,
  CabwiseGetParams,
  SystemObject
} from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';

// Import raw data from generated meta files
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

// Generate types from the generated meta data
type ModeName = typeof Modes[number]['modeName'];
type ServiceType = typeof ServiceTypes[number];
type DisruptionCategory = typeof DisruptionCategories[number];
type SeverityLevel = typeof Severity[number]['severityLevel'];
type SeverityDescription = typeof Severity[number]['description'];

/**
 * Valid operator types for cabwise searches
 * Based on the official TfL private hire operator form
 */
export type CabwiseOperatorType = 
  | 'Chauffeur'
  | 'Contract'
  | 'Driver Guide(Tourist service)'
  | 'Executive'
  | 'Limousine'
  | 'Minicab'
  | 'MPV'
  | 'Other'
  | 'School Runs'
  | 'Unknown';

/**
 * Query options for cabwise search requests
 * @example
 * // Search for nearby taxi services
 * const results = await client.cabwise.search({
 *   lat: 51.514792,
 *   lon: -0.118509,
 *   radius: 5000,
 *   maxResults: 10
 * });
 * 
 * // Search for wheelchair accessible services
 * const accessibleResults = await client.cabwise.search({
 *   lat: 51.514792,
 *   lon: -0.118509,
 *   wc: 'true',
 *   optype: 'Minicab' // TypeScript provides autocomplete for valid operator types
 * });
 */
export interface CabwiseSearchParams extends CabwiseGetParams {
  /** Latitude coordinate (must be between -90 and 90) */
  lat: number;
  /** Longitude coordinate (must be between -180 and 180) */
  lon: number;
  /** Operator Type e.g., 'Minicab', 'Executive', 'Limousine' */
  optype?: CabwiseOperatorType;
  /** Wheelchair accessible - set to 'true' for accessible services */
  wc?: string;
  /** The radius of the bounding circle in metres (default: 1000) */
  radius?: number;
  /** Trading name of operating company */
  name?: string;
  /** An optional parameter to limit the number of results. Default and maximum is 20. */
  maxResults?: number;
  /** Legacy Format */
  legacyFormat?: boolean;
  /** Force Xml */
  forceXml?: boolean;
  /** Twenty Four Seven Only */
  twentyFourSevenOnly?: boolean;
  /** Whether to keep $type fields in the response */
  keepTflTypes?: boolean;
}

/**
 * Cabwise API information returned by the TfL API
 * @example
 * {
 *   Operators: {
 *     OperatorList: [
 *       {
 *         OrganisationName: "ABC Taxis",
 *         TradingName: "ABC Taxis",
 *         BookingsPhoneNumber: "020 1234 5678",
 *         BookingsEmail: "info@abctaxis.com",
 *         WheelchairAccessible: false,
 *         HoursOfOperation24X7: true,
 *         NumberOfVehicles: 10,
 *         OperatorTypes: ["Minicab", "Executive"],
 *         Distance: 0.5
 *       }
 *     ]
 *   },
 *   Header: {
 *     Identifier: "Licenced Private Hire Operators (Find a ride)",
 *     DisplayTitle: "Licenced Private Hire Operators (Find a ride)",
 *     Version: "0.1",
 *     PublishDateTime: "Jul 09 2025 07:07PM"
 *   }
 * }
 */
export interface CabwiseInfo {
  /** Array of taxi and minicab operators */
  Operators?: {
    /** List of operators */
    OperatorList?: Array<{
      /** Organization name */
      OrganisationName?: string;
      /** Trading name */
      TradingName?: string;
      /** Alternative names */
      AlsoKnownAs?: string[];
      /** Centre ID */
      CentreId?: number;
      /** Address line 1 */
      AddressLine1?: string;
      /** Address line 2 */
      AddressLine2?: string;
      /** Address line 3 */
      AddressLine3?: string;
      /** Town */
      Town?: string;
      /** County */
      County?: string;
      /** Postcode */
      Postcode?: string;
      /** Bookings phone number */
      BookingsPhoneNumber?: string;
      /** Bookings email */
      BookingsEmail?: string;
      /** Public access */
      PublicAccess?: boolean;
      /** Public waiting room */
      PublicWaitingRoom?: boolean;
      /** Wheelchair accessible */
      WheelchairAccessible?: boolean;
      /** Credit/debit card accepted */
      CreditDebitCard?: boolean;
      /** Cheque/bankers card accepted */
      ChequeBankersCard?: boolean;
      /** Account services available */
      AccountServicesAvailable?: boolean;
      /** 24/7 operation */
      HoursOfOperation24X7?: boolean;
      /** Hours of operation Mon-Thu */
      HoursOfOperationMonThu?: boolean;
      /** Start time Mon-Thu */
      StartTimeMonThu?: string;
      /** End time Mon-Thu */
      EndTimeMonThu?: string;
      /** Hours of operation Fri */
      HoursOfOperationFri?: boolean;
      /** Start time Fri */
      StartTimeFri?: string;
      /** End time Fri */
      EndTimeFri?: string;
      /** Hours of operation Sat */
      HoursOfOperationSat?: boolean;
      /** Start time Sat */
      StartTimeSat?: string;
      /** End time Sat */
      EndTimeSat?: string;
      /** Hours of operation Sun */
      HoursOfOperationSun?: boolean;
      /** Start time Sun */
      StartTimeSun?: string;
      /** End time Sun */
      EndTimeSun?: string;
      /** Hours of operation Public Holiday */
      HoursOfOperationPubHol?: boolean;
      /** Start time Public Holiday */
      StartTimePubHol?: string;
      /** End time Public Holiday */
      EndTimePubHol?: string;
      /** Number of vehicles */
      NumberOfVehicles?: number;
      /** Number of wheelchair accessible vehicles */
      NumberOfVehiclesWheelchair?: number;
      /** Longitude */
      Longitude?: number;
      /** Latitude */
      Latitude?: number;
      /** Operator types */
      OperatorTypes?: CabwiseOperatorType[];
      /** Distance from search point */
      Distance?: number;
      /** Additional operator information */
      [key: string]: any;
    }>;
  };
  /** Header information */
  Header?: {
    /** Identifier */
    Identifier?: string;
    /** Display title */
    DisplayTitle?: string;
    /** Version */
    Version?: string;
    /** Publish date time */
    PublishDateTime?: string;
    /** Canonical publish date time */
    CanonicalPublishDateTime?: string;
    /** Author */
    Author?: string;
    /** Owner */
    Owner?: string;
    /** Refresh rate */
    RefreshRate?: number;
    /** Max latency */
    Max_Latency?: number;
    /** Time to error */
    TimeToError?: number;
    /** Schedule */
    Schedule?: string;
    /** Logo */
    Logo?: string;
    /** Language */
    Language?: string;
    /** Attribution */
    Attribution?: {
      /** Link */
      Link?: string;
      /** Text */
      Text?: string;
      /** Logo */
      Logo?: string;
    };
    /** Additional header information */
    [key: string]: any;
  };
  /** Additional cabwise information */
  [key: string]: any;
}

/**
 * Cabwise class for interacting with TfL Cabwise API endpoints
 * 
 * This API provides access to licensed private hire operators in London.
 * While functional, users should be aware that some operators may have limited
 * vehicle fleets and addresses may be registration rather than operational.
 * 
 * @example
 * // Search for nearby taxi services
 * const results = await client.cabwise.search({
 *   lat: 51.514792,
 *   lon: -0.118509,
 *   radius: 5000,
 *   maxResults: 10
 * });
 * 
 * // Search for wheelchair accessible services
 * const accessibleResults = await client.cabwise.search({
 *   lat: 51.514792,
 *   lon: -0.118509,
 *   wc: 'true',
 *   optype: 'Minicab' // TypeScript provides autocomplete for valid operator types
 * });
 */
export class Cabwise {
  /** API name for this module */
  static readonly API_NAME = 'Cabwise API';

  /** Available API endpoints */
  static readonly ENDPOINTS = {
    /** Search for taxi and minicab services */
    SEARCH: {
      path: '/Cabwise/search',
      method: 'GET',
      description: 'Gets taxis and minicabs contact information',
      parameters: [
        { name: 'lat', type: 'number', required: true, description: 'Latitude' },
        { name: 'lon', type: 'number', required: true, description: 'Longitude' },
        { name: 'optype', type: 'string', required: false, description: 'Operator Type e.g Minicab, Executive, Limousine' },
        { name: 'wc', type: 'string', required: false, description: 'Wheelchair accessible' },
        { name: 'radius', type: 'number', required: false, description: 'The radius of the bounding circle in metres' },
        { name: 'name', type: 'string', required: false, description: 'Trading name of operating company' },
        { name: 'maxResults', type: 'number', required: false, description: 'An optional parameter to limit the number of results return. Default and maximum is 20.' },
        { name: 'legacyFormat', type: 'boolean', required: false, description: 'Legacy Format' },
        { name: 'forceXml', type: 'boolean', required: false, description: 'Force Xml' },
        { name: 'twentyFourSevenOnly', type: 'boolean', required: false, description: 'Twenty Four Seven Only' }
      ]
    }
  };

  /** Total number of endpoints */
  static readonly TOTAL_ENDPOINTS = 1;

  /** Available mode names (static, no HTTP request needed) */
  public readonly MODE_NAMES: readonly ModeName[] = Modes.map(m => m.modeName);

  /** Available service types (static, no HTTP request needed) */
  public readonly SERVICE_TYPES: readonly ServiceType[] = ServiceTypes;

  /** Available disruption categories (static, no HTTP request needed) */
  public readonly DISRUPTION_CATEGORIES: readonly DisruptionCategory[] = DisruptionCategories;

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

  /** Available operator types for cabwise searches */
  public readonly OPERATOR_TYPES: readonly CabwiseOperatorType[] = [
    'Chauffeur',
    'Contract',
    'Driver Guide(Tourist service)',
    'Executive',
    'Limousine',
    'Minicab',
    'MPV',
    'Other',
    'School Runs',
    'Unknown'
  ] as const;

  constructor(private api: Api<{}>) {}

  /**
   * Gets taxis and minicabs contact information
   * 
   * This method searches for taxi and minicab services near a specified location,
   * with optional filters for operator type, accessibility, and service availability.
   * 
   * @param params - Search parameters including location and optional filters
   * @returns Promise resolving to taxi and minicab contact information
   * @example
   * // Search for nearby taxi services
   * const results = await client.cabwise.search({
   *   lat: 51.514792,
   *   lon: -0.118509,
   *   radius: 5000,
   *   maxResults: 10
   * });
   * 
   * // Search for wheelchair accessible services
   * const accessibleResults = await client.cabwise.search({
   *   lat: 51.514792,
   *   lon: -0.118509,
   *   wc: 'true',
   *   optype: 'Minicab' // TypeScript provides autocomplete for valid operator types
   * });
   * 
   * // Search for 24/7 services
   * const twentyFourSevenResults = await client.cabwise.search({
   *   lat: 51.514792,
   *   lon: -0.118509,
   *   twentyFourSevenOnly: true
   * });
   */
  async search(params: CabwiseSearchParams): Promise<CabwiseInfo> {
    const { keepTflTypes, ...searchParams } = params;
    
    return this.api.cabwise.cabwiseGet(searchParams)
      .then(response => stripTypeFields(response.data, keepTflTypes));
  }

  /**
   * Get API endpoint information
   * 
   * This method returns information about the available API endpoints
   * for the Cabwise module.
   * 
   * @returns Object containing endpoint information
   * @example
   * // Get endpoint information
   * const endpoints = client.cabwise.getEndpoints();
   * console.log('Available endpoints:', Object.keys(endpoints));
   * 
   * // Get specific endpoint details
   * const searchEndpoint = endpoints.SEARCH;
   * console.log('Search endpoint path:', searchEndpoint.path);
   * console.log('Search endpoint method:', searchEndpoint.method);
   */
  getEndpoints() {
    return Cabwise.ENDPOINTS;
  }
}

// Re-export static types for direct use
export {
  ModeName,
  ServiceType,
  DisruptionCategory,
  SeverityLevel,
  SeverityDescription
}; 