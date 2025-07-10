/**
 * Mode API Module
 * 
 * Provides access to transport mode information, active service types, and mode-specific arrivals.
 * Transport modes include tube, bus, dlr, overground, tram, cable-car, cycle-hire, and more.
 */

import { 
  Api, 
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesActiveServiceType,
  ModeArrivalsParams
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

// Types and interfaces
export interface ModeArrivalsQuery {
  /** The mode name (e.g., 'tube', 'bus', 'dlr'). TypeScript provides autocomplete for known values. */
  mode: string;
  /** Number of arrivals to return for each stop, -1 to return all available. */
  count?: number;
  /** Whether to keep TfL internal type fields in the response */
  keepTflTypes?: boolean;
}

export interface ModeServiceQuery {
  /** Whether to keep TfL internal type fields in the response */
  keepTflTypes?: boolean;
}

// Re-export types from generated API
export type TflMode = TflApiPresentationEntitiesMode;
export type TflPrediction = TflApiPresentationEntitiesPrediction;
export type TflActiveServiceType = TflApiPresentationEntitiesActiveServiceType;
export type ModeName = typeof Modes[number]['modeName'];

/**
 * Mode API client for transport mode information and arrivals
 * 
 * The Mode API provides information about transport modes available in the TfL network,
 * including service types and real-time arrival predictions for all stops of a given mode.
 * 
 * @example
 * ```typescript
 * // Get all active service types (currently only supports tube)
 * const serviceTypes = await client.mode.getActiveServiceTypes();
 * 
 * // Get arrivals for all tube stops
 * const tubeArrivals = await client.mode.getArrivals({ mode: 'tube', count: 5 });
 * 
 * // Validate mode names
 * const isValidMode = client.mode.MODE_NAMES.includes('elizabeth-line');
 * ```
 */
export class Mode {
  // Static metadata for API documentation
  static readonly API_NAME = 'Mode API';
  static readonly DESCRIPTION = 'Transport mode information and arrivals';
  static readonly ENDPOINTS = {
    getActiveServiceTypes: '/Mode/ActiveServiceTypes',
    getArrivals: '/Mode/{mode}/Arrivals'
  } as const;

  // 🚨 ALWAYS use generated metadata (never hardcode!)
  public readonly MODE_NAMES: readonly ModeName[] = Modes.map(m => m.modeName);
  public readonly SERVICE_TYPES: readonly typeof ServiceTypes[number][] = ServiceTypes;
  public readonly DISRUPTION_CATEGORIES: readonly typeof DisruptionCategories[number][] = DisruptionCategories;
  public readonly PLACE_TYPES: readonly typeof PlaceTypes[number][] = PlaceTypes;
  public readonly SEARCH_PROVIDERS: readonly typeof SearchProviders[number][] = SearchProviders;
  public readonly SORT_OPTIONS: readonly typeof Sorts[number][] = Sorts;
  public readonly STOP_TYPES: readonly typeof StopTypes[number][] = StopTypes;
  public readonly CATEGORIES: readonly typeof Categories[number][] = Categories;
  public readonly ALL_SEVERITY: readonly typeof Severity[number][] = Severity;
  
  // Build derived metadata from generated data
  public readonly MODES_BY_TYPE = this.buildModesByType();
  public readonly TFL_OPERATED_MODES = this.buildTflOperatedModes();
  public readonly FARE_PAYING_MODES = this.buildFarePayingModes();
  public readonly SCHEDULED_SERVICE_MODES = this.buildScheduledServiceModes();

  constructor(private api: Api<{}>) {}

  /**
   * Gets the active service types for transport modes
   * 
   * Returns the service type active for a mode. Currently only supports tube mode.
   * 
   * @param options - Query options for getting active service types
   * @returns Promise resolving to array of active service types
   * 
   * @example
   * ```typescript
   * // Get all active service types
   * const serviceTypes = await client.mode.getActiveServiceTypes();
   * console.log(serviceTypes);
   * // Output: [{ name: 'Regular', uri: '/Line/Route?serviceTypes=Regular' }, ...]
   * 
   * // Check if service types are available
   * if (serviceTypes.length > 0) {
   *   console.log('Active service types available');
   * }
   * ```
   */
  async getActiveServiceTypes(options: ModeServiceQuery = {}): Promise<TflActiveServiceType[]> {
    const { keepTflTypes = false } = options;
    
    return this.api.mode.modeGetActiveServiceTypes().then(response => 
      stripTypeFields(response.data, keepTflTypes)
    );
  }

  /**
   * Gets arrival predictions for all stops of a given mode
   * 
   * Returns the next arrival predictions for all stops that serve the specified transport mode.
   * This is useful for getting a comprehensive view of arrivals across an entire mode network.
   * 
   * @param options - Query options including mode and count
   * @returns Promise resolving to array of arrival predictions
   * 
   * @example
   * ```typescript
   * // Get next 3 arrivals for all tube stops
   * const tubeArrivals = await client.mode.getArrivals({ 
   *   mode: 'tube', 
   *   count: 3 
   * });
   * 
   * // Get all available arrivals for DLR
   * const dlrArrivals = await client.mode.getArrivals({ 
   *   mode: 'dlr', 
   *   count: -1 
   * });
   * 
   * // Validate mode before making request
   * const modeName = 'elizabeth-line';
   * if (client.mode.MODE_NAMES.includes(modeName)) {
   *   const arrivals = await client.mode.getArrivals({ mode: modeName });
   * } else {
   *   throw new Error(`Invalid mode: ${modeName}`);
   * }
   * 
   * // Filter arrivals by destination
   * const filteredArrivals = tubeArrivals.filter(arrival => 
   *   arrival.towards?.includes('Central London')
   * );
   * ```
   */
  async getArrivals(options: ModeArrivalsQuery): Promise<TflPrediction[]> {
    const { mode, count, keepTflTypes = false } = options;
    
    const params: ModeArrivalsParams = {
      mode,
      ...(count !== undefined && { count })
    };
    
    return this.api.mode.modeArrivals(params).then(response => 
      stripTypeFields(response.data, keepTflTypes)
    );
  }

  // 🚨 Build derived metadata from generated data
  private buildModesByType(): Record<string, ModeName[]> {
    const modesByType: Record<string, ModeName[]> = {
      tflOperated: [],
      farePaying: [],
      scheduled: [],
      nonTfl: []
    };

    Modes.forEach(mode => {
      if (mode.isTflService) {
        modesByType.tflOperated.push(mode.modeName);
      } else {
        modesByType.nonTfl.push(mode.modeName);
      }
      
      if (mode.isFarePaying) {
        modesByType.farePaying.push(mode.modeName);
      }
      
      if (mode.isScheduledService) {
        modesByType.scheduled.push(mode.modeName);
      }
    });

    return modesByType;
  }

  private buildTflOperatedModes(): readonly ModeName[] {
    return Modes
      .filter(mode => mode.isTflService)
      .map(mode => mode.modeName);
  }

  private buildFarePayingModes(): readonly ModeName[] {
    return Modes
      .filter(mode => mode.isFarePaying)
      .map(mode => mode.modeName);
  }

  private buildScheduledServiceModes(): readonly ModeName[] {
    return Modes
      .filter(mode => mode.isScheduledService)
      .map(mode => mode.modeName);
  }

  // Utility methods
  /**
   * Validates if a mode name is valid
   * 
   * @param modeName - The mode name to validate
   * @returns True if the mode is valid, false otherwise
   * 
   * @example
   * ```typescript
   * const isValid = client.mode.isValidMode('tube'); // true
   * const isInvalid = client.mode.isValidMode('invalid-mode'); // false
   * ```
   */
  isValidMode(modeName: string): modeName is ModeName {
    return this.MODE_NAMES.includes(modeName as ModeName);
  }

  /**
   * Checks if a mode is operated by TfL
   * 
   * @param modeName - The mode name to check
   * @returns True if the mode is TfL operated, false otherwise
   * 
   * @example
   * ```typescript
   * const isTflOperated = client.mode.isTflOperated('tube'); // true
   * const isNotTflOperated = client.mode.isTflOperated('national-rail'); // false
   * ```
   */
  isTflOperated(modeName: string): boolean {
    return this.TFL_OPERATED_MODES.includes(modeName as ModeName);
  }

  /**
   * Checks if a mode requires fare payment
   * 
   * @param modeName - The mode name to check
   * @returns True if the mode requires fare payment, false otherwise
   * 
   * @example
   * ```typescript
   * const requiresFare = client.mode.requiresFare('bus'); // true
   * const isFree = client.mode.requiresFare('walking'); // false
   * ```
   */
  requiresFare(modeName: string): boolean {
    return this.FARE_PAYING_MODES.includes(modeName as ModeName);
  }

  /**
   * Checks if a mode operates on a scheduled service
   * 
   * @param modeName - The mode name to check
   * @returns True if the mode operates on a schedule, false otherwise
   * 
   * @example
   * ```typescript
   * const isScheduled = client.mode.isScheduledService('tube'); // true
   * const isNotScheduled = client.mode.isScheduledService('walking'); // false
   * ```
   */
  isScheduledService(modeName: string): boolean {
    return this.SCHEDULED_SERVICE_MODES.includes(modeName as ModeName);
  }

  /**
   * Gets mode information by name
   * 
   * @param modeName - The mode name to get information for
   * @returns Mode information or undefined if not found
   * 
   * @example
   * ```typescript
   * const modeInfo = client.mode.getModeInfo('tube');
   * console.log(modeInfo);
   * // Output: { isTflService: true, isFarePaying: true, isScheduledService: true, modeName: 'tube' }
   * ```
   */
  getModeInfo(modeName: string): typeof Modes[number] | undefined {
    return Modes.find(mode => mode.modeName === modeName);
  }

  /**
   * Gets all modes that match specific criteria
   * 
   * @param criteria - Filter criteria for modes
   * @returns Array of mode names matching the criteria
   * 
   * @example
   * ```typescript
   * // Get all TfL operated modes
   * const tflModes = client.mode.getModesByCriteria({ isTflService: true });
   * 
   * // Get all free modes
   * const freeModes = client.mode.getModesByCriteria({ isFarePaying: false });
   * 
   * // Get all scheduled TfL services
   * const scheduledTfl = client.mode.getModesByCriteria({ 
   *   isTflService: true, 
   *   isScheduledService: true 
   * });
   * ```
   */
  getModesByCriteria(criteria: Partial<{
    isTflService: boolean;
    isFarePaying: boolean;
    isScheduledService: boolean;
  }>): ModeName[] {
    return Modes
      .filter(mode => {
        if (criteria.isTflService !== undefined && mode.isTflService !== criteria.isTflService) {
          return false;
        }
        if (criteria.isFarePaying !== undefined && mode.isFarePaying !== criteria.isFarePaying) {
          return false;
        }
        if (criteria.isScheduledService !== undefined && mode.isScheduledService !== criteria.isScheduledService) {
          return false;
        }
        return true;
      })
      .map(mode => mode.modeName);
  }
}

// ModeApi is already exported above 

// Re-export the raw Modes data for direct use
export { Modes }; 