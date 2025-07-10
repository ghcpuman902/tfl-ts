/**
 * Journey API Module
 * 
 * Provides comprehensive journey planning functionality across the TfL transport network.
 * This module allows users to plan routes between any two locations in London, with support
 * for multi-modal journeys, accessibility preferences, cycling routes, and real-time information.
 * 
 * **Features:**
 * - Route planning between any two locations (stations, coordinates, postcodes, or free-text)
 * - Multi-modal journey options (tube, bus, DLR, river bus, etc.)
 * - Accessibility preferences for step-free access
 * - Cycling journey planning with bike hire integration
 * - Real-time journey information with live arrivals
 * - Fare calculations and alternative routes
 * - Disambiguation handling for ambiguous locations
 * 
 * @example
 * // Plan a basic journey
 * const journey = await client.journey.plan({
 *   from: '940GZZLUOXC', // Oxford Circus Station ID
 *   to: '940GZZLUVIC',   // Victoria Station ID
 *   mode: ['tube', 'bus'],
 *   timeIs: 'Departing',
 *   date: '20241201',
 *   time: '1430'
 * });
 * 
 * // Plan an accessible journey
 * const accessibleJourney = await client.journey.plan({
 *   from: 'Kings Cross',
 *   to: 'Waterloo',
 *   accessibilityPreference: ['StepFreeToVehicle', 'NoEscalators'],
 *   walkingSpeed: 'Slow',
 *   maxWalkingMinutes: '15'
 * });
 * 
 * // Plan a cycling journey
 * const cycleJourney = await client.journey.plan({
 *   from: 'Hyde Park',
 *   to: 'Regents Park',
 *   cyclePreference: 'AllTheWay',
 *   bikeProficiency: ['Easy'],
 *   alternativeCycle: true
 * });
 */

import { 
  Api, 
  TflApiPresentationEntitiesJourneyPlannerItineraryResult,
  TflApiPresentationEntitiesMode,
  JourneyJourneyResultsParams,
  TimeIsEnum,
  JourneyPreferenceEnum,
  AccessibilityPreferenceEnum,
  WalkingSpeedEnum,
  CyclePreferenceEnum,
  BikeProficiencyEnum,
  TflApiPresentationEntitiesJourneyPlannerJourney,
  TflApiPresentationEntitiesJourneyPlannerLeg,
  TflApiPresentationEntitiesJourneyPlannerJourneyFare
} from './generated/tfl';

import { stripTypeFields } from './utils/stripTypes';
import { formatDistance, formatDuration } from './utils/format';

// Import generated metadata (NEVER hardcode!)
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
  const descriptions = Array.from(new Set(Severity.map(s => s.description)));
  return descriptions.sort() as readonly string[];
};

// Build severity by mode mapping
const severityByMode = buildSeverityByMode();
const severityDescriptions = buildSeverityDescriptions();

/**
 * Disambiguation option from journey planner
 */
export interface DisambiguationOption {
  /** Parameter value to use for the journey */
  parameterValue: string;
  /** URI for the journey with this option */
  uri: string;
  /** Place information */
  place: {
    /** Naptan ID if available */
    naptanId?: string;
    /** Transport modes available */
    modes?: string[];
    /** ICS code if available */
    icsCode?: string;
    /** Stop type */
    stopType?: string;
    /** URL for the place */
    url: string;
    /** Common name of the place */
    commonName: string;
    /** Place type */
    placeType: string;
    /** Latitude */
    lat: number;
    /** Longitude */
    lon: number;
  };
  /** Match quality score */
  matchQuality: number;
}

/**
 * Disambiguation result for journey planning
 */
export interface DisambiguationResult {
  /** Disambiguation options for the 'from' location */
  fromLocationDisambiguation?: {
    /** List of disambiguation options */
    disambiguationOptions: DisambiguationOption[];
    /** Match status */
    matchStatus: string;
  };
  /** Disambiguation options for the 'to' location */
  toLocationDisambiguation?: {
    /** List of disambiguation options */
    disambiguationOptions: DisambiguationOption[];
    /** Match status */
    matchStatus: string;
  };
  /** Disambiguation options for the 'via' location */
  viaLocationDisambiguation?: {
    /** List of disambiguation options */
    disambiguationOptions: DisambiguationOption[];
    /** Match status */
    matchStatus: string;
  };
  /** Recommended max age in minutes */
  recommendedMaxAgeMinutes?: number;
  /** Search criteria used */
  searchCriteria?: {
    /** Date and time */
    dateTime: string;
    /** Date time type */
    dateTimeType: string;
  };
  /** Journey vector */
  journeyVector?: {
    /** From location */
    from: string;
    /** To location */
    to: string;
    /** Via location */
    via: string;
    /** URI for the journey */
    uri: string;
  };
}

/**
 * Simplified journey type for better developer experience
 */
export interface JourneyData {
  /** Journey start date/time */
  startDateTime?: string;
  /** Journey duration in minutes */
  duration?: number;
  /** Journey arrival date/time */
  arrivalDateTime?: string;
  /** Journey description */
  description?: string;
  /** Whether this is an alternative route */
  alternativeRoute?: boolean;
  /** Journey legs (steps) */
  legs?: JourneyLegData[];
  /** Fare information */
  fare?: JourneyFareData;
}

/**
 * Simplified journey leg type
 */
export interface JourneyLegData {
  /** Leg duration in minutes */
  duration?: number;
  /** User instructions */
  instruction?: {
    summary?: string;
    detailed?: string;
  };
  /** Departure time */
  departureTime?: string;
  /** Arrival time */
  arrivalTime?: string;
  /** Transport mode */
  mode?: {
    name?: string;
    id?: string;
  };
  /** Distance in meters */
  distance?: number;
  /** Whether this leg is disrupted */
  isDisrupted?: boolean;
}

/**
 * Simplified fare type
 */
export interface JourneyFareData {
  /** Total cost in pence */
  totalCost?: number;
  /** Individual fares */
  fares?: Array<{
    cost?: number;
    chargeProfileName?: string;
    peak?: number;
    offPeak?: number;
  }>;
}

/**
 * Journey result with station names and disambiguation support
 */
export interface JourneyResult {
  /** List of journeys */
  journeys?: JourneyData[];
  /** Station names extracted from journey */
  stationNames?: {
    from?: string;
    to?: string;
  };
  /** Any stop messages */
  stopMessages?: string[];
  /** Disambiguation data when multiple options are found */
  disambiguation?: DisambiguationResult;
}

/**
 * Query options for journey planning requests
 * @example
 * // Plan a journey from Oxford Circus to Victoria
 * const journey = await client.journey.plan({
 *   from: '940GZZLUOXC',
 *   to: '940GZZLUVIC',
 *   mode: ['tube', 'bus'],
 *   timeIs: 'Departing',
 *   date: '20241201',
 *   time: '1430'
 * });
 * 
 * // Plan a journey with specific preferences
 * const journey = await client.journey.plan({
 *   from: 'Oxford Circus',
 *   to: 'Victoria',
 *   journeyPreference: 'LeastTime',
 *   walkingSpeed: 'Fast',
 *   maxWalkingMinutes: '30'
 * });
 * 
 * // Plan a journey with accessibility requirements
 * const accessibleJourney = await client.journey.plan({
 *   from: 'Kings Cross',
 *   to: 'Waterloo',
 *   accessibilityPreference: ['StepFreeToVehicle', 'NoEscalators'],
 *   walkingSpeed: 'Slow',
 *   maxWalkingMinutes: '15'
 * });
 * 
 * // Plan a cycling journey
 * const cycleJourney = await client.journey.plan({
 *   from: 'Hyde Park',
 *   to: 'Regents Park',
 *   cyclePreference: 'AllTheWay',
 *   bikeProficiency: ['Easy'],
 *   alternativeCycle: true
 * });
 * 
 * @example
 * // Validate user input before making API calls
 * const userInput = ['tube', 'invalid-mode'];
 * const validModes = userInput.filter(mode => client.journey.MODE_NAMES.includes(mode));
 * if (validModes.length !== userInput.length) {
 *   throw new Error(`Invalid modes: ${userInput.filter(mode => !client.journey.MODE_NAMES.includes(mode)).join(', ')}`);
 * }
 */
export interface JourneyQuery extends Partial<JourneyJourneyResultsParams> {
  /** Origin of the journey. Can be WGS84 coordinates, UK postcode, Naptan ID, or free-text string */
  from: string;
  /** Destination of the journey. Can be WGS84 coordinates, UK postcode, Naptan ID, or free-text string */
  to: string;
  /** Whether to keep TfL type fields in the response (default: false) */
  keepTflTypes?: boolean;
}

/**
 * Journey class for planning routes across TfL transport network
 * 
 * Provides comprehensive journey planning functionality including:
 * - Route planning between any two locations
 * - Multi-modal journey options
 * - Accessibility preferences
 * - Real-time journey information
 * - Fare calculations
 * - Disambiguation handling for ambiguous locations
 * 
 * @example
 * // Plan a journey
 * const journey = await client.journey.plan({
 *   from: 'Oxford Circus',
 *   to: 'Victoria',
 *   mode: ['tube', 'bus']
 * });
 * 
 * // Handle disambiguation
 * if (journey.disambiguation) {
 *   console.log('Multiple options found. Please choose from:');
 *   journey.disambiguation.toLocationDisambiguation?.disambiguationOptions.forEach(option => {
 *     console.log(`${option.place.commonName} (${option.parameterValue})`);
 *   });
 * }
 * 
 * // Get available journey modes
 * const modes = await client.journey.getModes();
 * 
 * // Plan an accessible journey
 * const accessibleJourney = await client.journey.plan({
 *   from: 'Kings Cross',
 *   to: 'Waterloo',
 *   accessibilityPreference: ['StepFreeToVehicle', 'NoEscalators'],
 *   walkingSpeed: 'Slow'
 * });
 * 
 * // Get static metadata (no HTTP request)
 * const modeNames = client.journey.MODE_NAMES; // ['tube', 'bus', 'dlr', ...]
 * const timeIsOptions = client.journey.TIME_IS_OPTIONS; // ['Arriving', 'Departing']
 * 
 * // Validate user input before making API calls
 * const validateJourneyOptions = (options: JourneyQuery) => {
 *   const validModes = options.mode?.filter(mode => client.journey.MODE_NAMES.includes(mode));
 *   if (validModes && validModes.length !== options.mode?.length) {
 *     const invalidModes = options.mode?.filter(mode => !client.journey.MODE_NAMES.includes(mode));
 *     throw new Error(`Invalid modes: ${invalidModes?.join(', ')}`);
 *   }
 *   return validModes;
 * };
 */
export class Journey {
  /** API name for this module */
  static readonly API_NAME = 'Journey API';

  /** Available API endpoints */
  static readonly ENDPOINTS = {
    /** Plan a journey between two locations */
    JOURNEY_RESULTS: {
      path: '/Journey/JourneyResults/{from}/to/{to}',
      method: 'GET',
      description: 'Gets journey results between two locations',
      parameters: [
        { name: 'from', type: 'string', required: true, description: 'Origin location' },
        { name: 'to', type: 'string', required: true, description: 'Destination location' },
        { name: 'mode', type: 'string[]', required: false, description: 'Transport modes to use' },
        { name: 'timeIs', type: 'string', required: false, description: 'Whether time is Arriving or Departing' },
        { name: 'date', type: 'string', required: false, description: 'Date in YYYYMMDD format' },
        { name: 'time', type: 'string', required: false, description: 'Time in HHMM format' },
        { name: 'journeyPreference', type: 'string', required: false, description: 'Journey preference' },
        { name: 'accessibilityPreference', type: 'string[]', required: false, description: 'Accessibility preferences' },
        { name: 'walkingSpeed', type: 'string', required: false, description: 'Walking speed preference' },
        { name: 'cyclePreference', type: 'string', required: false, description: 'Cycle preference' },
        { name: 'bikeProficiency', type: 'string[]', required: false, description: 'Bike proficiency levels' },
        { name: 'maxWalkingMinutes', type: 'string', required: false, description: 'Maximum walking time in minutes' },
        { name: 'useMultiModalCall', type: 'boolean', required: false, description: 'Use multi-modal journey planning' },
        { name: 'walkingOptimization', type: 'boolean', required: false, description: 'Optimize for walking' },
        { name: 'includeAlternativeRoutes', type: 'boolean', required: false, description: 'Include alternative routes' },
        { name: 'useRealTimeLiveArrivals', type: 'boolean', required: false, description: 'Use real-time live arrivals' },
        { name: 'alternativeCycle', type: 'boolean', required: false, description: 'Include alternative cycling routes' },
        { name: 'alternativeWalking', type: 'boolean', required: false, description: 'Include alternative walking routes' },
        { name: 'applyHtmlMarkup', type: 'boolean', required: false, description: 'Apply HTML markup to instructions' },
        { name: 'via', type: 'string', required: false, description: 'Via location' },
        { name: 'nationalSearch', type: 'boolean', required: false, description: 'Include national rail services' },
        { name: 'maxChangeMinutes', type: 'string', required: false, description: 'Maximum change time in minutes' },
        { name: 'changeSpeed', type: 'string', required: false, description: 'Change speed preference' },
        { name: 'adjustment', type: 'string', required: false, description: 'Time adjustment' },
        { name: 'bikeProficiency', type: 'string[]', required: false, description: 'Bike proficiency levels' },
        { name: 'cyclePreference', type: 'string', required: false, description: 'Cycle preference' },
        { name: 'accessibilityPreference', type: 'string[]', required: false, description: 'Accessibility preferences' },
        { name: 'walkingSpeed', type: 'string', required: false, description: 'Walking speed preference' },
        { name: 'maxWalkingMinutes', type: 'string', required: false, description: 'Maximum walking time in minutes' },
        { name: 'journeyPreference', type: 'string', required: false, description: 'Journey preference' },
        { name: 'timeIs', type: 'string', required: false, description: 'Whether time is Arriving or Departing' },
        { name: 'time', type: 'string', required: false, description: 'Time in HHMM format' },
        { name: 'date', type: 'string', required: false, description: 'Date in YYYYMMDD format' },
        { name: 'mode', type: 'string[]', required: false, description: 'Transport modes to use' },
        { name: 'to', type: 'string', required: true, description: 'Destination location' },
        { name: 'from', type: 'string', required: true, description: 'Origin location' }
      ]
    },
    /** Get available transport modes */
    META_MODES: {
      path: '/Journey/Meta/Modes',
      method: 'GET',
      description: 'Gets available transport modes for journey planning',
      parameters: []
    }
  };

  /** Total number of endpoints */
  static readonly TOTAL_ENDPOINTS = 2;

  // 🚨 ALWAYS use generated metadata (never hardcode!)
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
  
  // Build derived metadata from generated data
  /** Severity levels by transport mode */
  public readonly SEVERITY_BY_MODE = severityByMode;
  
  /** All available severity descriptions */
  public readonly SEVERITY_DESCRIPTIONS: typeof severityDescriptions = severityDescriptions;
  
  /** Mode metadata with service information */
  public readonly MODE_METADATA = modeMetadata;

  // Journey-specific constants
  /** Available time options for journey planning */
  public readonly TIME_IS_OPTIONS: readonly string[] = ['Arriving', 'Departing'];
  
  /** Available journey preferences */
  public readonly JOURNEY_PREFERENCES: readonly string[] = ['LeastInterchange', 'LeastTime', 'LeastWalking'];
  
  /** Available accessibility preferences */
  public readonly ACCESSIBILITY_PREFERENCES: readonly string[] = [
    'NoRequirements', 'NoSolidStairs', 'NoEscalators', 'NoElevators', 
    'StepFreeToVehicle', 'StepFreeToPlatform'
  ];
  
  /** Available walking speeds */
  public readonly WALKING_SPEEDS: readonly string[] = ['Slow', 'Average', 'Fast'];
  
  /** Available cycle preferences */
  public readonly CYCLE_PREFERENCES: readonly string[] = [
    'None', 'LeaveAtStation', 'TakeOnTransport', 'AllTheWay', 'CycleHire'
  ];
  
  /** Available bike proficiency levels */
  public readonly BIKE_PROFICIENCIES: readonly string[] = ['Easy', 'Moderate', 'Fast'];

  constructor(private api: Api<{}>) {}

  /**
   * Plan a journey between two locations
   * 
   * This method plans routes between any two locations in London, with support for
   * multi-modal journeys, accessibility preferences, cycling routes, and real-time information.
   * 
   * @param options - Journey planning options
   * @returns Promise resolving to journey itinerary results with simplified types
   * @example
   * const journey = await client.journey.plan({
   *   from: '940GZZLUOXC',
   *   to: '940GZZLUVIC',
   *   mode: ['tube', 'bus'],
   *   timeIs: 'Departing',
   *   date: '20241201',
   *   time: '1430'
   * });
   * 
   * @example
   * // Plan a journey with accessibility requirements
   * const accessibleJourney = await client.journey.plan({
   *   from: 'Kings Cross',
   *   to: 'Waterloo',
   *   accessibilityPreference: ['StepFreeToVehicle', 'NoEscalators'],
   *   walkingSpeed: 'Slow',
   *   maxWalkingMinutes: '15'
   * });
   * 
   * @example
   * // Plan a cycling journey
   * const cycleJourney = await client.journey.plan({
   *   from: 'Hyde Park',
   *   to: 'Regents Park',
   *   cyclePreference: 'AllTheWay',
   *   bikeProficiency: ['Easy'],
   *   alternativeCycle: true
   * });
   * 
   * @example
   * // Handle disambiguation when multiple options are found
   * const journey = await client.journey.plan({
   *   from: 'Westminster',
   *   to: 'Bank'
   * });
   * 
   * if (journey.disambiguation) {
   *   console.log('Multiple options found. Please choose from:');
   *   
   *   // Show 'from' options
   *   if (journey.disambiguation.fromLocationDisambiguation) {
   *     console.log('From options:');
   *     journey.disambiguation.fromLocationDisambiguation.disambiguationOptions.forEach(option => {
   *       console.log(`- ${option.place.commonName} (${option.parameterValue})`);
   *     });
   *   }
   *   
   *   // Show 'to' options
   *   if (journey.disambiguation.toLocationDisambiguation) {
   *     console.log('To options:');
   *     journey.disambiguation.toLocationDisambiguation.disambiguationOptions.forEach(option => {
   *       console.log(`- ${option.place.commonName} (${option.parameterValue})`);
   *     });
   *   }
   *   
   *   // Use a specific option for the journey
   *   const specificJourney = await client.journey.plan({
   *     from: '1000266', // Westminster Station
   *     to: '1000013'    // Bank Station
   *   });
   * }
   * 
   * @example
   * // Validate user input before making API calls
   * const userInput = ['tube', 'invalid-mode'];
   * const validModes = userInput.filter(mode => client.journey.MODE_NAMES.includes(mode));
   * if (validModes.length !== userInput.length) {
   *   throw new Error(`Invalid modes: ${userInput.filter(mode => !client.journey.MODE_NAMES.includes(mode)).join(', ')}`);
   * }
   */
  async plan(options: JourneyQuery): Promise<JourneyResult> {
    const { keepTflTypes = false, ...apiOptions } = options;
    
    // Fix mode parameter to be comma-separated string instead of array
    if (apiOptions.mode && Array.isArray(apiOptions.mode)) {
      (apiOptions as any).mode = apiOptions.mode.join(',');
    }
    
    try {
      const result = await this.api.journey.journeyJourneyResults(apiOptions)
        .then(response => stripTypeFields(response.data, keepTflTypes));
      
      return this.simplifyJourneyResult(result);
    } catch (error: any) {
      // Handle disambiguation responses (status 300)
      // The generated client throws the entire Response object
      if (error?.status === 300) {
        // Extract the response body to get disambiguation data
        let disambiguationData: DisambiguationResult | undefined = undefined;
        
        try {
          // Clone the response and read the body
          const responseClone = error.clone ? error.clone() : error;
          if (responseClone.body && !responseClone.bodyUsed) {
            const text = await responseClone.text();
            disambiguationData = JSON.parse(text);
          }
        } catch (parseError) {
          console.warn('Failed to parse disambiguation response:', parseError);
        }
        
        // Return a special result indicating disambiguation is needed
        return {
          journeys: [],
          stationNames: {
            from: options.from,
            to: options.to
          },
          stopMessages: [`Disambiguation required. Multiple options found for "${options.from}" and/or "${options.to}". Please use specific station IDs.`],
          disambiguation: disambiguationData
        };
      }
      
      // Re-throw other errors
      throw error;
    }
  }

  /**
   * Get available transport modes for journey planning
   * 
   * This method retrieves all available transport modes that can be used
   * for journey planning, including their metadata and capabilities.
   * 
   * @returns Promise resolving to an array of available modes
   * @example
   * const modes = await client.journey.getModes();
   * console.log('Available modes:', modes.map(m => m.modeName));
   * 
   * // Use static metadata instead (no HTTP request)
   * const modeNames = client.journey.MODE_NAMES; // ['tube', 'bus', 'dlr', ...]
   */
  async getModes(): Promise<TflApiPresentationEntitiesMode[]> {
    return this.api.journey.journeyMeta().then(response => response.data);
  }

  /**
   * Extract station names from journey result
   * 
   * This method extracts the actual station names from a journey result,
   * which can be useful for displaying user-friendly location names.
   * 
   * @param journey - Journey result from plan method
   * @returns Object with from and to station names
   * @example
   * const journey = await client.journey.plan({ from: 'Oxford Circus', to: 'Victoria' });
   * const stationNames = client.journey.getStationNames(journey);
   * console.log(`From: ${stationNames.from}, To: ${stationNames.to}`);
   */
  getStationNames(journey: JourneyResult): { from?: string; to?: string } {
    const stationNames: { from?: string; to?: string } = {};
    
    if (journey.journeys && journey.journeys.length > 0) {
      const firstJourney = journey.journeys[0];
      if (firstJourney.legs && firstJourney.legs.length > 0) {
        // Get first leg departure point
        const firstLeg = firstJourney.legs[0];
        if (firstLeg.instruction?.summary) {
          const summary = firstLeg.instruction.summary;
          // Extract station name from instruction like "Walk to Oxford Circus Underground Station"
          const match = summary.match(/to (.+?)(?: Underground Station| Station|$)/i);
          if (match) {
            stationNames.from = match[1];
          }
        }
        
        // Get last leg arrival point
        const lastLeg = firstJourney.legs[firstJourney.legs.length - 1];
        if (lastLeg.instruction?.summary) {
          const summary = lastLeg.instruction.summary;
          // Extract station name from instruction
          const match = summary.match(/to (.+?)(?: Underground Station| Station|$)/i);
          if (match) {
            stationNames.to = match[1];
          }
        }
      }
    }
    
    return stationNames;
  }

  /**
   * Validate journey planning parameters
   * 
   * This method validates journey planning options before making API calls,
   * helping to catch errors early and provide better error messages.
   * 
   * @param options - Journey planning options to validate
   * @returns Object with validation results and any errors
   * @example
   * const validation = client.journey.validateOptions({
   *   from: 'Oxford Circus',
   *   to: 'Victoria',
   *   mode: ['tube', 'invalid-mode']
   * });
   * 
   * if (!validation.isValid) {
   *   console.log('Validation errors:', validation.errors);
   * }
   */
  validateOptions(options: JourneyQuery): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate required fields
    if (!options.from) {
      errors.push('Origin location (from) is required');
    }
    if (!options.to) {
      errors.push('Destination location (to) is required');
    }

    // Validate modes if provided
    if (options.mode && options.mode.length > 0) {
      const invalidModes = options.mode.filter(mode => !this.MODE_NAMES.includes(mode as ModeName));
      if (invalidModes.length > 0) {
        errors.push(`Invalid modes: ${invalidModes.join(', ')}. Valid modes: ${this.MODE_NAMES.join(', ')}`);
      }
    }

    // Validate timeIs if provided
    if (options.timeIs && !this.TIME_IS_OPTIONS.includes(options.timeIs)) {
      errors.push(`Invalid timeIs: ${options.timeIs}. Valid options: ${this.TIME_IS_OPTIONS.join(', ')}`);
    }

    // Validate journeyPreference if provided
    if (options.journeyPreference && !this.JOURNEY_PREFERENCES.includes(options.journeyPreference)) {
      errors.push(`Invalid journeyPreference: ${options.journeyPreference}. Valid options: ${this.JOURNEY_PREFERENCES.join(', ')}`);
    }

    // Validate accessibilityPreference if provided
    if (options.accessibilityPreference && options.accessibilityPreference.length > 0) {
      const invalidPrefs = options.accessibilityPreference.filter(pref => !this.ACCESSIBILITY_PREFERENCES.includes(pref));
      if (invalidPrefs.length > 0) {
        errors.push(`Invalid accessibility preferences: ${invalidPrefs.join(', ')}. Valid options: ${this.ACCESSIBILITY_PREFERENCES.join(', ')}`);
      }
    }

    // Validate walkingSpeed if provided
    if (options.walkingSpeed && !this.WALKING_SPEEDS.includes(options.walkingSpeed)) {
      errors.push(`Invalid walkingSpeed: ${options.walkingSpeed}. Valid options: ${this.WALKING_SPEEDS.join(', ')}`);
    }

    // Validate cyclePreference if provided
    if (options.cyclePreference && !this.CYCLE_PREFERENCES.includes(options.cyclePreference)) {
      errors.push(`Invalid cyclePreference: ${options.cyclePreference}. Valid options: ${this.CYCLE_PREFERENCES.join(', ')}`);
    }

    // Validate bikeProficiency if provided
    if (options.bikeProficiency && options.bikeProficiency.length > 0) {
      const invalidProfs = options.bikeProficiency.filter(prof => !this.BIKE_PROFICIENCIES.includes(prof));
      if (invalidProfs.length > 0) {
        errors.push(`Invalid bike proficiencies: ${invalidProfs.join(', ')}. Valid options: ${this.BIKE_PROFICIENCIES.join(', ')}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get journey planning metadata and constants
   * 
   * This method returns all available constants and metadata for journey planning,
   * including transport modes, preferences, and validation options.
   * 
   * @returns Object containing all journey planning constants and metadata
   * @example
   * const metadata = client.journey.getMetadata();
   * console.log('Available modes:', metadata.modes);
   * console.log('Journey preferences:', metadata.journeyPreferences);
   */
  getMetadata() {
    return {
      modes: this.MODE_NAMES,
      serviceTypes: this.SERVICE_TYPES,
      disruptionCategories: this.DISRUPTION_CATEGORIES,
      placeTypes: this.PLACE_TYPES,
      searchProviders: this.SEARCH_PROVIDERS,
      sortOptions: this.SORT_OPTIONS,
      stopTypes: this.STOP_TYPES,
      categories: this.CATEGORIES,
      severity: this.ALL_SEVERITY,
      severityByMode: this.SEVERITY_BY_MODE,
      severityDescriptions: this.SEVERITY_DESCRIPTIONS,
      modeMetadata: this.MODE_METADATA,
      timeIsOptions: this.TIME_IS_OPTIONS,
      journeyPreferences: this.JOURNEY_PREFERENCES,
      accessibilityPreferences: this.ACCESSIBILITY_PREFERENCES,
      walkingSpeeds: this.WALKING_SPEEDS,
      cyclePreferences: this.CYCLE_PREFERENCES,
      bikeProficiencies: this.BIKE_PROFICIENCIES
    };
  }

  /**
   * Get all available mode verbs for natural language generation
   * 
   * Returns a complete mapping of all transport modes to their natural language verbs,
   * useful for building custom natural language interfaces or validating mode verbs.
   * 
   * @returns Object mapping mode names to their verb forms
   * @example
   * const modeVerbs = client.journey.getAllModeVerbs();
   * console.log('Tube verbs:', modeVerbs.tube);
   * // Output: { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' }
   * 
   * // Use in custom natural language generation
   * const customInstruction = `Please ${modeVerbs.tube.imperative} ${modeVerbs.tube.article} tube to your destination`;
   */
  getAllModeVerbs(): Record<string, { imperative: string; gerund: string; present: string; article: string }> {
    const allVerbs: Record<string, { imperative: string; gerund: string; present: string; article: string }> = {};
    
    // Get verbs for all available modes
    this.MODE_NAMES.forEach(mode => {
      allVerbs[mode] = this.getModeVerbs(mode);
    });
    
    // Add additional common modes that might not be in MODE_NAMES
    const additionalModes = ['interchange-keep-sitting', 'interchange-secure'];
    additionalModes.forEach(mode => {
      allVerbs[mode] = this.getModeVerbs(mode);
    });
    
    return allVerbs;
  }



  /**
   * Get emoji icon for transport mode
   * 
   * Returns an emoji icon for each transport mode that can be used
   * in UI displays or console output.
   * 
   * @param mode - Transport mode name
   * @returns Emoji icon string
   * @example
   * const icon = client.journey.getModeIcon('tube');
   * console.log(icon); // "🚇"
   * 
   * // Use in UI
   * const modeIcon = client.journey.getModeIcon(leg.mode?.name || 'walking');
   * console.log(`${modeIcon} ${leg.instruction?.summary}`);
   */
  getModeIcon(mode: string): string {
    const icons: Record<string, string> = {
      'tube': '🚇',
      'bus': '🚌',
      'dlr': '🚈',
      'overground': '🚆',
      'elizabeth-line': '🚄',
      'national-rail': '🚂',
      'tram': '🚊',
      'river-bus': '⛴️',
      'river-tour': '🚢',
      'cable-car': '🚡',
      'cycle': '🚲',
      'cycle-hire': '🚲',
      'walking': '🚶',
      'taxi': '🚕',
      'coach': '🚌',
      'replacement-bus': '🚌',
      'interchange-keep-sitting': '🔄',
      'interchange-secure': '🔒'
    };
    
    return icons[mode] || '🚀';
  }

  /**
   * Get mode display name for natural language generation
   * 
   * Returns a human-readable name for each transport mode that can be used
   * in natural language sentences without emojis.
   * 
   * @param mode - Transport mode name
   * @returns Human-readable mode name
   * @example
   * const modeName = client.journey.getModeDisplayName('tube');
   * console.log(modeName); // "tube"
   * 
   * const busName = client.journey.getModeDisplayName('bus');
   * console.log(busName); // "bus"
   * 
   * // Use in natural language
   * const instruction = `Take the ${client.journey.getModeDisplayName(leg.mode?.name || 'walking')} for ${duration} minutes`;
   */
  getModeDisplayName(mode: string): string {
    const displayNames: Record<string, string> = {
      'tube': 'tube',
      'bus': 'bus',
      'dlr': 'DLR',
      'overground': 'Overground',
      'elizabeth-line': 'Elizabeth line',
      'national-rail': 'train',
      'tram': 'tram',
      'river-bus': 'river bus',
      'river-tour': 'river tour',
      'cable-car': 'cable car',
      'cycle': 'bike',
      'cycle-hire': 'bike',
      'walking': '',
      'taxi': 'taxi',
      'coach': 'coach',
      'replacement-bus': 'replacement bus',
      'interchange-keep-sitting': 'same vehicle',
      'interchange-secure': 'transfer'
    };
    
    return displayNames[mode] || mode;
  }

  /**
   * Get verb for transport mode for natural language generation
   * 
   * Returns appropriate verbs that can be used in natural language sentences
   * like "take the tube", "walk", "board the bus", etc.
   * 
   * @param mode - Transport mode name
   * @returns Object with different verb forms for the mode
   * @example
   * const verbs = client.journey.getModeVerbs('tube');
   * console.log(verbs.imperative); // "take"
   * console.log(verbs.gerund); // "taking"
   * console.log(verbs.present); // "take"
   * 
   * // Use in natural language
   * const instruction = `Please ${verbs.imperative} the ${mode} for ${duration} minutes`;
   */
  getModeVerbs(mode: string): { imperative: string; gerund: string; present: string; article: string } {
    const verbs: Record<string, { imperative: string; gerund: string; present: string; article: string }> = {
      'tube': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'bus': { imperative: 'board', gerund: 'boarding', present: 'board', article: 'the' },
      'dlr': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'overground': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'elizabeth-line': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'national-rail': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'tram': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'river-bus': { imperative: 'board', gerund: 'boarding', present: 'board', article: 'the' },
      'river-tour': { imperative: 'board', gerund: 'boarding', present: 'board', article: 'the' },
      'cable-car': { imperative: 'take', gerund: 'taking', present: 'take', article: 'the' },
      'cycle': { imperative: 'cycle', gerund: 'cycling', present: 'cycle', article: '' },
      'cycle-hire': { imperative: 'cycle', gerund: 'cycling', present: 'cycle', article: '' },
      'walking': { imperative: 'walk', gerund: 'walking', present: 'walk', article: '' },
      'taxi': { imperative: 'take', gerund: 'taking', present: 'take', article: 'a' },
      'coach': { imperative: 'board', gerund: 'boarding', present: 'board', article: 'the' },
      'replacement-bus': { imperative: 'board', gerund: 'boarding', present: 'board', article: 'the' },
      'interchange-keep-sitting': { imperative: 'stay on', gerund: 'staying on', present: 'stay on', article: '' },
      'interchange-secure': { imperative: 'transfer to', gerund: 'transferring to', present: 'transfer to', article: '' }
    };
    
    return verbs[mode] || { imperative: 'use', gerund: 'using', present: 'use', article: 'the' };
  }

  /**
   * Generate natural language instruction for a journey leg
   * 
   * Creates human-readable instructions like "Walk 3 minutes to Oxford Circus, 
   * then take the tube for 5 minutes to Victoria"
   * 
   * @param leg - Journey leg data
   * @param isFirst - Whether this is the first leg in the journey
   * @returns Natural language instruction string
   * @example
   * const journey = await client.journey.plan({ from: 'Oxford Circus', to: 'Victoria' });
   * if (journey.journeys?.[0]?.legs) {
   *   journey.journeys[0].legs.forEach((leg, index) => {
   *     const instruction = client.journey.generateNaturalInstruction(leg, index === 0);
   *     console.log(instruction);
   *   });
   * }
   */
  generateNaturalInstruction(leg: JourneyLegData, isFirst: boolean = false): string {
    const modeName = leg.mode?.name || 'walking';
    const duration = leg.duration || 0;
    const verbs = this.getModeVerbs(modeName);
    const article = verbs.article;
    const modeDisplay = modeName === 'walking' ? 'walking' : 
                       modeName === 'cycle' || modeName === 'cycle-hire' ? 'cycling' :
                       modeName === 'tube' ? 'tube' :
                       modeName === 'bus' ? 'bus' :
                       modeName === 'dlr' ? 'DLR' :
                       modeName === 'overground' ? 'Overground' :
                       modeName === 'elizabeth-line' ? 'Elizabeth line' :
                       modeName === 'national-rail' ? 'train' :
                       modeName === 'tram' ? 'tram' :
                       modeName === 'river-bus' ? 'river bus' :
                       modeName === 'river-tour' ? 'river tour' :
                       modeName === 'cable-car' ? 'cable car' :
                       modeName === 'taxi' ? 'taxi' :
                       modeName === 'coach' ? 'coach' :
                       modeName === 'replacement-bus' ? 'replacement bus' :
                       modeName;

    // Extract bus line information from original instruction if available
    let lineInfo = '';
    if (leg.instruction?.summary && (modeName === 'bus' || modeName === 'replacement-bus')) {
      // Look for bus line patterns like "390 bus", "N136 bus", etc.
      const busLineMatch = leg.instruction.summary.match(/(\d+|[A-Z]\d+)\s+bus/i);
      if (busLineMatch) {
        lineInfo = ` ${busLineMatch[1]}`;
      }
    }

    // Handle different modes with appropriate language
    if (modeName === 'walking') {
      const distance = leg.distance || 0;
      const distanceText = distance > 0 ? ` (${formatDistance(distance)})` : '';
      return `${isFirst ? 'Walk' : 'Then walk'} ${duration} minute${duration !== 1 ? 's' : ''}${distanceText}`;
    }
    
    if (modeName === 'cycle' || modeName === 'cycle-hire') {
      return `${isFirst ? 'Cycle' : 'Then cycle'} for ${duration} minute${duration !== 1 ? 's' : ''}`;
    }
    
    if (modeName === 'interchange-keep-sitting') {
      return `${isFirst ? 'Stay on' : 'Then stay on'} the same service`;
    }
    
    if (modeName === 'interchange-secure') {
      return `${isFirst ? 'Transfer to' : 'Then transfer to'} the next service`;
    }

    // For public transport modes
    const transportInstruction = `${isFirst ? verbs.imperative.charAt(0).toUpperCase() + verbs.imperative.slice(1) : 'Then ' + verbs.imperative} ${article}${lineInfo} ${modeDisplay} for ${duration} minute${duration !== 1 ? 's' : ''}`;
    
    return transportInstruction;
  }

  /**
   * Generate complete natural language journey description
   * 
   * Creates a full natural language description of the entire journey
   * 
   * @param journey - Journey data
   * @returns Complete natural language journey description
   * @example
   * const journey = await client.journey.plan({ from: 'Oxford Circus', to: 'Victoria' });
   * if (journey.journeys?.[0]) {
   *   const description = client.journey.generateNaturalDescription(journey.journeys[0]);
   *   console.log(description);
   *   // Output: "Walk 2 minutes to Oxford Circus Underground Station, then take the tube for 5 minutes to Victoria"
   * }
   */
  generateNaturalDescription(journey: JourneyData): string {
    if (!journey.legs || journey.legs.length === 0) {
      return 'Journey details unavailable';
    }

    const instructions: string[] = [];
    
    journey.legs.forEach((leg, index) => {
      const instruction = this.generateNaturalInstruction(leg, index === 0);
      instructions.push(instruction);
    });

    return instructions.join(', ');
  }

  /**
   * Get API endpoint information
   * 
   * This method returns information about the available API endpoints
   * for the Journey module.
   * 
   * @returns Object containing endpoint information
   * @example
   * // Get endpoint information
   * const endpoints = client.journey.getEndpoints();
   * console.log('Available endpoints:', Object.keys(endpoints));
   * 
   * // Get specific endpoint details
   * const journeyEndpoint = endpoints.JOURNEY_RESULTS;
   * console.log('Journey endpoint path:', journeyEndpoint.path);
   * console.log('Journey endpoint method:', journeyEndpoint.method);
   */
  getEndpoints() {
    return Journey.ENDPOINTS;
  }

  /**
   * Simplify journey result for better developer experience
   */
  private simplifyJourneyResult(result: TflApiPresentationEntitiesJourneyPlannerItineraryResult): JourneyResult {
    const simplifiedJourneys: JourneyData[] = result.journeys?.map(journey => this.simplifyJourney(journey)) || [];
    
    return {
      journeys: simplifiedJourneys,
      stationNames: this.getStationNames({ journeys: simplifiedJourneys }),
      stopMessages: result.stopMessages
    };
  }

  /**
   * Simplify individual journey with better undefined handling
   */
  private simplifyJourney(journey: TflApiPresentationEntitiesJourneyPlannerJourney): JourneyData {
    // Generate a meaningful description if none is provided
    const description = journey.description || this.generateJourneyDescription(journey);
    
    return {
      startDateTime: journey.startDateTime,
      duration: journey.duration,
      arrivalDateTime: journey.arrivalDateTime,
      description,
      alternativeRoute: journey.alternativeRoute || false,
      legs: journey.legs?.map(leg => this.simplifyLeg(leg)) || [],
      fare: journey.fare ? this.simplifyFare(journey.fare) : undefined
    };
  }

  /**
   * Generate a meaningful journey description from legs
   */
  private generateJourneyDescription(journey: TflApiPresentationEntitiesJourneyPlannerJourney): string {
    if (!journey.legs || journey.legs.length === 0) {
      return 'Journey details unavailable';
    }

    const modes = journey.legs
      .map(leg => leg.mode?.name)
      .filter((mode): mode is string => Boolean(mode))
      .filter((mode, index, arr) => arr.indexOf(mode) === index); // Remove duplicates

    if (modes.length === 0) {
      return 'Walking journey';
    }

    if (modes.length === 1) {
      return `${modes[0].charAt(0).toUpperCase() + modes[0].slice(1)} journey`;
    }

    return `${modes.length} mode journey (${modes.join(', ')})`;
  }

  /**
   * Simplify journey leg with better undefined handling
   */
  private simplifyLeg(leg: TflApiPresentationEntitiesJourneyPlannerLeg): JourneyLegData {
    // Generate meaningful instruction if none provided
    const instruction = leg.instruction ? {
      summary: leg.instruction.summary || this.generateLegSummary(leg),
      detailed: leg.instruction.detailed || leg.instruction.summary || this.generateLegSummary(leg)
    } : {
      summary: this.generateLegSummary(leg),
      detailed: this.generateLegSummary(leg)
    };

    return {
      duration: leg.duration || 0,
      instruction,
      departureTime: leg.departureTime,
      arrivalTime: leg.arrivalTime,
      mode: leg.mode ? {
        name: leg.mode.name || 'unknown',
        id: leg.mode.id || leg.mode.name || 'unknown'
      } : {
        name: 'walking',
        id: 'walking'
      },
      distance: leg.distance || 0,
      isDisrupted: leg.isDisrupted || false
    };
  }

  /**
   * Generate a meaningful leg summary
   */
  private generateLegSummary(leg: TflApiPresentationEntitiesJourneyPlannerLeg): string {
    const modeName = leg.mode?.name || 'walking';
    const duration = leg.duration || 0;
    
    if (leg.instruction?.summary) {
      return leg.instruction.summary;
    }
    
    // Use the natural language generation for better summaries
    const verbs = this.getModeVerbs(modeName);
    const article = verbs.article;
    const modeDisplay = modeName === 'walking' ? 'walking' : 
                       modeName === 'cycle' || modeName === 'cycle-hire' ? 'cycling' :
                       modeName === 'tube' ? 'tube' :
                       modeName === 'bus' ? 'bus' :
                       modeName === 'dlr' ? 'DLR' :
                       modeName === 'overground' ? 'Overground' :
                       modeName === 'elizabeth-line' ? 'Elizabeth line' :
                       modeName === 'national-rail' ? 'train' :
                       modeName === 'tram' ? 'tram' :
                       modeName === 'river-bus' ? 'river bus' :
                       modeName === 'river-tour' ? 'river tour' :
                       modeName === 'cable-car' ? 'cable car' :
                       modeName === 'taxi' ? 'taxi' :
                       modeName === 'coach' ? 'coach' :
                       modeName === 'replacement-bus' ? 'replacement bus' :
                       modeName;

    if (modeName === 'walking') {
      return `Walk for ${duration} minutes`;
    }
    
    if (modeName === 'cycle' || modeName === 'cycle-hire') {
      return `Cycle for ${duration} minutes`;
    }
    
    if (modeName === 'interchange-keep-sitting') {
      return 'Stay on the same service';
    }
    
    if (modeName === 'interchange-secure') {
      return 'Transfer to the next service';
    }

    return `${verbs.imperative.charAt(0).toUpperCase() + verbs.imperative.slice(1)} ${article} ${modeDisplay} for ${duration} minutes`;
  }

  /**
   * Simplify fare information with better undefined handling
   */
  private simplifyFare(fare: TflApiPresentationEntitiesJourneyPlannerJourneyFare): JourneyFareData {
    return {
      totalCost: fare.totalCost || 0,
      fares: fare.fares?.map(f => ({
        cost: f.cost || 0,
        chargeProfileName: f.chargeProfileName || 'Standard',
        peak: f.peak || 0,
        offPeak: f.offPeak || 0
      })) || []
    };
  }
}

// Re-export static types and enums for direct use
export {
  ModeName,
  ServiceType,
  DisruptionCategory,
  SeverityLevel,
  SeverityDescription,
  modeMetadata,
  severityDescriptions,
  severityByMode
};

// Re-export the raw Modes data
export { Modes }; 