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

import { stripTypeFields } from './utils/stripTypes';

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
  /** Travel speed */
  speed?: string;
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
 * Journey result with station names
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
  /** Disambiguation data */
  disambiguation?: any;
}

/**
 * Query options for journey planning requests
 * @example
 * // Plan a journey from Oxford Circus to Victoria
 * const journey = await client.journey.plan({
 *   from: '940GZZLUOXC',
 *   to: '940GZZLUVIC',
 *   modes: ['tube', 'bus'],
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
 * @example
 * // Validate user input before making API calls
 * const userInput = ['tube', 'invalid-mode'];
 * const validModes = userInput.filter(mode => mode in client.journey.MODE_NAMES);
 * if (validModes.length !== userInput.length) {
 *   throw new Error(`Invalid modes: ${userInput.filter(mode => !(mode in client.journey.MODE_NAMES)).join(', ')}`);
 * }
 */
interface JourneyQuery extends Partial<JourneyJourneyResultsParams> {
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
 * 
 * @example
 * // Plan a journey
 * const journey = await client.journey.plan({
 *   from: 'Oxford Circus',
 *   to: 'Victoria',
 *   modes: ['tube', 'bus']
 * });
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
 */
export class Journey {
  private api: Api<{}>;

  // Static metadata
  static readonly API_NAME = 'Journey API';
  static readonly ENDPOINTS = {
    JOURNEY_RESULTS: '/Journey/JourneyResults/{from}/to/{to}',
    META_MODES: '/Journey/Meta/Modes'
  };

  // 🚨 ALWAYS use generated metadata (never hardcode!)
  public readonly MODE_NAMES: readonly string[] = Modes.map(m => m.modeName);
  public readonly SERVICE_TYPES: readonly string[] = ServiceTypes;
  public readonly DISRUPTION_CATEGORIES: readonly string[] = DisruptionCategories;
  public readonly PLACE_TYPES: readonly string[] = PlaceTypes;
  public readonly SEARCH_PROVIDERS: readonly string[] = SearchProviders;
  public readonly SORT_OPTIONS: readonly string[] = Sorts;
  public readonly STOP_TYPES: readonly string[] = StopTypes;
  public readonly CATEGORIES: readonly string[] = Categories.map(c => c.category);
  public readonly ALL_SEVERITY: readonly string[] = Severity.map(s => s.description);
  
  // Build derived metadata from generated data
  public readonly SEVERITY_BY_MODE = this.buildSeverityByMode();
  public readonly SEVERITY_DESCRIPTIONS = this.buildSeverityDescriptions();
  public readonly MODE_METADATA = this.buildModeMetadata();

  // Journey-specific constants
  public readonly TIME_IS_OPTIONS: readonly string[] = ['Arriving', 'Departing'];
  public readonly JOURNEY_PREFERENCES: readonly string[] = ['LeastInterchange', 'LeastTime', 'LeastWalking'];
  public readonly ACCESSIBILITY_PREFERENCES: readonly string[] = [
    'NoRequirements', 'NoSolidStairs', 'NoEscalators', 'NoElevators', 
    'StepFreeToVehicle', 'StepFreeToPlatform'
  ];
  public readonly WALKING_SPEEDS: readonly string[] = ['Slow', 'Average', 'Fast'];
  public readonly CYCLE_PREFERENCES: readonly string[] = [
    'None', 'LeaveAtStation', 'TakeOnTransport', 'AllTheWay', 'CycleHire'
  ];
  public readonly BIKE_PROFICIENCIES: readonly string[] = ['Easy', 'Moderate', 'Fast'];

  constructor(api: Api<{}>) {
    this.api = api;
  }

  /**
   * Plan a journey between two locations
   * @param options - Journey planning options
   * @returns Promise resolving to journey itinerary results with simplified types
   * @example
   * const journey = await client.journey.plan({
   *   from: '940GZZLUOXC',
   *   to: '940GZZLUVIC',
   *   modes: ['tube', 'bus'],
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
   */
  async plan(options: JourneyQuery): Promise<JourneyResult> {
    const { keepTflTypes = false, ...apiOptions } = options;
    
    try {
      const result = await this.api.journey.journeyJourneyResults(apiOptions)
        .then(response => stripTypeFields(response.data, keepTflTypes));
      
      return this.simplifyJourneyResult(result);
    } catch (error: any) {
      // Handle disambiguation responses (status 300)
      // The generated client throws the entire Response object
      if (error?.status === 300) {
        // Extract the response body to get disambiguation data
        let disambiguationData: any = null;
        
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
   * @returns Promise resolving to an array of available modes
   * @example
   * const modes = await client.journey.getModes();
   * console.log('Available modes:', modes.map(m => m.modeName));
   */
  async getModes(): Promise<TflApiPresentationEntitiesMode[]> {
    return this.api.journey.journeyMeta().then(response => response.data);
  }

  /**
   * Extract station names from journey result
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
   * @param options - Journey planning options to validate
   * @returns Object with validation results and any errors
   * @example
   * const validation = client.journey.validateOptions({
   *   from: 'Oxford Circus',
   *   to: 'Victoria',
   *   modes: ['tube', 'invalid-mode']
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
      const invalidModes = options.mode.filter(mode => !this.MODE_NAMES.includes(mode));
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
   * Simplify individual journey
   */
  private simplifyJourney(journey: TflApiPresentationEntitiesJourneyPlannerJourney): JourneyData {
    return {
      startDateTime: journey.startDateTime,
      duration: journey.duration,
      arrivalDateTime: journey.arrivalDateTime,
      description: journey.description,
      alternativeRoute: journey.alternativeRoute,
      legs: journey.legs?.map(leg => this.simplifyLeg(leg)),
      fare: journey.fare ? this.simplifyFare(journey.fare) : undefined
    };
  }

  /**
   * Simplify journey leg
   */
  private simplifyLeg(leg: TflApiPresentationEntitiesJourneyPlannerLeg): JourneyLegData {
    return {
      duration: leg.duration,
      speed: leg.speed,
      instruction: leg.instruction ? {
        summary: leg.instruction.summary,
        detailed: leg.instruction.detailed
      } : undefined,
      departureTime: leg.departureTime,
      arrivalTime: leg.arrivalTime,
      mode: leg.mode ? {
        name: leg.mode.name,
        id: leg.mode.id
      } : undefined,
      distance: leg.distance,
      isDisrupted: leg.isDisrupted
    };
  }

  /**
   * Simplify fare information
   */
  private simplifyFare(fare: TflApiPresentationEntitiesJourneyPlannerJourneyFare): JourneyFareData {
    return {
      totalCost: fare.totalCost,
      fares: fare.fares?.map(f => ({
        cost: f.cost,
        chargeProfileName: f.chargeProfileName,
        peak: f.peak,
        offPeak: f.offPeak
      }))
    };
  }

  // 🚨 Build derived metadata from generated data
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

  private buildSeverityDescriptions(): Record<number, string> {
    const descriptions: Record<number, string> = {};
    
    Severity.forEach(severity => {
      descriptions[severity.severityLevel] = severity.description;
    });
    
    return descriptions;
  }

  private buildModeMetadata(): Record<string, {isTflService: boolean, isFarePaying: boolean, isScheduledService: boolean}> {
    const metadata: Record<string, {isTflService: boolean, isFarePaying: boolean, isScheduledService: boolean}> = {};
    
    Modes.forEach(mode => {
      metadata[mode.modeName] = {
        isTflService: mode.isTflService,
        isFarePaying: mode.isFarePaying,
        isScheduledService: mode.isScheduledService
      };
    });
    
    return metadata;
  }
}

export { JourneyQuery }; 