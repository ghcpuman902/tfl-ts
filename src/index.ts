import { Api } from './generated/tfl';
import { Line } from './line';
import { AccidentStats } from './accidentStats';
import { AirQuality } from './airQuality';
import { BikePoint } from './bikePoint';
import { Cabwise } from './cabwise';
import { Journey } from './journey';
import { StopPoint } from './stopPoint';
import { Mode } from './mode';
import { Road } from './road';
import { 
  Modes, 
  ServiceTypes, 
  DisruptionCategories,
  Severity
} from './generated/meta/Meta';
import { Lines } from './generated/meta/Line';
import {
  TflError,
  TflHttpError,
  TflNetworkError,
  TflValidationError,
  TflTimeoutError,
  TflConfigError,
  TflErrorHandler
} from './errors';

// Generate types from the generated meta data
type ModeName = typeof Modes[number]['modeName'];
type ServiceType = typeof ServiceTypes[number];
type DisruptionCategory = typeof DisruptionCategories[number];
type LineId = typeof Lines[number]['id'];

// Create mode metadata from the generated Modes data
const modeMetadata: Record<string, any> = Modes.reduce((acc, mode) => {
  acc[mode.modeName] = {
    isTflService: mode.isTflService,
    isFarePaying: mode.isFarePaying,
    isScheduledService: mode.isScheduledService
  };
  return acc;
}, {} as Record<string, any>);

// Build line IDs from generated Lines data
const buildLineIds = () => {
  const lineIds: Record<string, Record<string, string>> = {
    tube: {},
    dlr: {},
    overground: {},
    tram: {},
    bus: {}
  };

  Lines.forEach(line => {
    const modeName = line.modeName;
    if (modeName === 'tube') {
      lineIds.tube[line.name.toUpperCase()] = line.id;
    } else if (modeName === 'dlr') {
      lineIds.dlr[line.name.toUpperCase()] = line.id;
    } else if (modeName === 'overground') {
      lineIds.overground[line.name.toUpperCase()] = line.id;
    } else if (modeName === 'tram') {
      lineIds.tram[line.name.toUpperCase()] = line.id;
    } else if (modeName === 'bus') {
      lineIds.bus[line.name.toUpperCase()] = line.id;
    }
  });

  return lineIds;
};

// Build severity by mode from generated Severity data
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
  
  return severityMap;
};

// Build severity descriptions from generated Severity data
const buildSeverityDescriptions = (): readonly string[] => {
  const descriptions = new Set<string>();
  Severity.forEach(severity => {
    descriptions.add(severity.description);
  });
  return Array.from(descriptions).sort();
};

// Tfl Line IDs - built from generated data
const LINE_IDS = buildLineIds();

// Tfl Transport Modes - from generated data
const MODES = modeMetadata;

// Tfl Service Types - from generated data
const SERVICE_TYPES = {
  REGULAR: 'Regular' as ServiceType,
  NIGHT: 'Night' as ServiceType
} as const;

// Tfl Direction Types
const DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
  ALL: 'all'
} as const;

// Build severity by mode and descriptions
const severityByMode = buildSeverityByMode();
const severityDescriptions = buildSeverityDescriptions();

// Type for line IDs
export type TflLineId = LineId;

// Type for transport modes
export type TflMode = keyof typeof MODES;

// Type for service types
export type TflServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];

// Type for directions
export type TflDirection = typeof DIRECTIONS[keyof typeof DIRECTIONS];

interface TflClientConfig {
  appId?: string;
  appKey?: string;
  /** Timeout for API requests in milliseconds (default: 30000) */
  timeout?: number;
  /** Maximum number of retries for failed requests (default: 3) */
  maxRetries?: number;
  /** Retry delay in milliseconds (default: 1000) */
  retryDelay?: number;
}

class TflClient {
  private api: Api<{}>;
  private config: Required<TflClientConfig>;
  
  /**
   * Access all London Underground, Elizabeth line, DLR, Overground, Tram, and other Tfl line data.
   */
  public line: Line;

  /**
   * Access all Tfl stop points (stations, bus stops, piers, etc).
   */
  public stopPoint: StopPoint;

  /**
   * Plan journeys across all supported Tfl modes (tube, bus, rail, etc).
   */
  public journey: Journey;

  /**
   * Access all available transport modes and their metadata.
   */
  public mode: Mode;

  /**
   * Access all London road corridors and road status/disruption info.
   */
  public road: Road;
  
  /**
   * Access all London bike point locations and real-time availability.
   */
  public bikePoint: BikePoint;
  
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
   */
  public accidentStats: AccidentStats;

  /**
   * ⚠️ **DEPRECATED API - NOT RECOMMENDED FOR USE**
   * 
   * Access real-time air quality data for London.
   * 
   * This API appears to be poorly maintained on TfL's side and may not return
   * current or reliable data. Recent testing shows 500 Internal Server Error
   * responses, suggesting the API is no longer actively supported.
   * 
   * **RECOMMENDED ALTERNATIVES:**
   * - London Air API: https://londonair.org.uk/Londonair/API/
   * - London Datastore Air Quality: https://data.london.gov.uk/air-quality/
   */
  public airQuality: AirQuality;

  /**
   * Access taxi and minicab contact information through TfL Cabwise service.
   */
  public cabwise: Cabwise;

  constructor(config?: TflClientConfig) {
    const appId = config?.appId || process.env.TFL_APP_ID;
    const appKey = config?.appKey || process.env.TFL_APP_KEY;

    if (!appId || !appKey) {
      throw new TflConfigError(
        "Missing TFL API credentials. Please either:\n" +
        "1. Create a .env file in the root directory with:\n" +
        "   TFL_APP_ID=your-app-id\n" +
        "   TFL_APP_KEY=your-app-key\n" +
        "2. Or pass the credentials directly:\n" +
        "   new TflClient({ appId: 'your-app-id', appKey: 'your-app-key' })\n" +
        "You can get these credentials by registering at https://api-portal.tfl.gov.uk/",
        'credentials'
      );
    }

    this.config = {
      appId,
      appKey,
      timeout: config?.timeout || 30000,
      maxRetries: config?.maxRetries || 3,
      retryDelay: config?.retryDelay || 1000
    };

    this.api = new Api({
      baseUrl: "https://api.tfl.gov.uk",
      customFetch: (input, init) => {
        const url = new URL(input.toString());
        url.searchParams.set("app_id", this.config.appId);
        url.searchParams.set("app_key", this.config.appKey);
        
        // Add timeout to the request
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
        
        return fetch(url, {
          ...init,
          signal: controller.signal
        }).finally(() => clearTimeout(timeoutId));
      }
    });

    // Initialize core transport services
    this.line = new Line(this.api);
    this.stopPoint = new StopPoint(this.api);
    this.journey = new Journey(this.api);
    this.mode = new Mode(this.api);
    this.road = new Road(this.api);
    this.bikePoint = new BikePoint(this.api);

    // Initialize additional services
    this.accidentStats = new AccidentStats(this.api);
    this.airQuality = new AirQuality(this.api);
    this.cabwise = new Cabwise(this.api);
  }

  /**
   * Execute an API call with error handling and retry logic
   */
  async executeWithRetry<T>(
    apiCall: () => Promise<T>,
    _context?: string
  ): Promise<T> {
    const requestId = this.generateRequestId();
    let lastError: TflError;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        const tflError = TflErrorHandler.handleApiError(error, undefined, requestId);
        lastError = tflError;

        // Don't retry on the last attempt
        if (attempt === this.config.maxRetries) {
          break;
        }

        // Check if error is retryable
        if (!TflErrorHandler.isRetryableError(tflError)) {
          break;
        }

        // Calculate retry delay
        const delay = TflErrorHandler.getRetryDelay(tflError, attempt, this.config.retryDelay);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Generate a unique request ID for tracking
   */
  private generateRequestId = (): string => {
    return `tfl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get client configuration
   */
  getConfig(): Readonly<TflClientConfig> {
    return this.config;
  }
}

export default TflClient;
export {
  LINE_IDS,
  MODES,
  SERVICE_TYPES,
  DIRECTIONS,
  severityByMode,
  severityDescriptions
};
export type { ModeName, ServiceType, DisruptionCategory };
export {
  TflError,
  TflHttpError,
  TflNetworkError,
  TflValidationError,
  TflTimeoutError,
  TflConfigError,
  TflErrorHandler
};

// Export UI utilities for building user interfaces
export * from './utils/ui';

// Export bike point utilities for working with bike point data
export { 
  getPropertyValue, 
  findElectricBikes, 
  sortByDistance, 
  findClosestWithBikes 
} from './utils/bikePoint';