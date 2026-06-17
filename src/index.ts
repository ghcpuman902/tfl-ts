import { TflHttpClient } from './core/http';
import { RawClient } from './generated/raw';
import { Line } from './line';
import { AccidentStats } from './accidentStats';
import { AirQuality } from './airQuality';
import { BikePoint } from './bikePoint';
import { Cabwise } from './cabwise';
import { Journey } from './journey';
import { StopPoint } from './stopPoint';
import { Mode } from './mode';
import { Road } from './road';
import { Search } from './search';
import { Vehicle } from './vehicle';
import { Occupancy } from './occupancy';
import { Place } from './place';
import { TravelTimes } from './travelTimes';
import { Realtime } from './realtime';
import {
  Modes,
  ServiceTypes,
  DisruptionCategories,
  Severity,
} from './generated/meta/Meta';
import { Lines } from './generated/meta/Line';
import {
  TflError,
  TflHttpError,
  TflNetworkError,
  TflValidationError,
  TflTimeoutError,
  TflConfigError,
  TflErrorHandler,
} from './errors';
import type { TflApiErrorBody } from './errors';

type ModeName = typeof Modes[number]['modeName'];
type ServiceType = typeof ServiceTypes[number];
type DisruptionCategory = typeof DisruptionCategories[number];
type LineId = typeof Lines[number]['id'];

const modeMetadata: Record<string, {
  isTflService: boolean;
  isFarePaying: boolean;
  isScheduledService: boolean;
}> = Modes.reduce((acc, mode) => {
  acc[mode.modeName] = {
    isTflService: mode.isTflService,
    isFarePaying: mode.isFarePaying,
    isScheduledService: mode.isScheduledService,
  };
  return acc;
}, {} as Record<string, {
  isTflService: boolean;
  isFarePaying: boolean;
  isScheduledService: boolean;
}>);

const buildLineIds = () => {
  const lineIds: Record<string, Record<string, string>> = {
    tube: {},
    dlr: {},
    overground: {},
    tram: {},
    bus: {},
  };

  Lines.forEach((line) => {
    const modeName = line.modeName;
    if (modeName in lineIds) {
      lineIds[modeName][line.name.toUpperCase()] = line.id;
    }
  });

  return lineIds;
};

const buildSeverityByMode = (): Record<string, Array<{ level: number; description: string }>> => {
  const severityMap: Record<string, Array<{ level: number; description: string }>> = {};

  Severity.forEach((severity) => {
    if (!severityMap[severity.modeName]) {
      severityMap[severity.modeName] = [];
    }
    severityMap[severity.modeName].push({
      level: severity.severityLevel,
      description: severity.description,
    });
  });

  return severityMap;
};

const buildSeverityDescriptions = (): readonly string[] => {
  const descriptions = new Set<string>();
  Severity.forEach((severity) => {
    descriptions.add(severity.description);
  });
  return Array.from(descriptions).sort();
};

const LINE_IDS = buildLineIds();
const MODES = modeMetadata;
const SERVICE_TYPES = {
  REGULAR: 'Regular' as ServiceType,
  NIGHT: 'Night' as ServiceType,
} as const;
const DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
  ALL: 'all',
} as const;
const severityByMode = buildSeverityByMode();
const severityDescriptions = buildSeverityDescriptions();

export type TflLineId = LineId;
export type TflMode = keyof typeof MODES;
export type TflServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];
export type TflDirection = typeof DIRECTIONS[keyof typeof DIRECTIONS];

export interface TflClientConfig {
  appId?: string;
  appKey?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

class TflClient {
  private readonly http: TflHttpClient;
  private readonly config: Required<TflClientConfig>;

  /**
   * Direct access to every TfL REST endpoint using generated operation names.
   * This escape hatch always stays available even before friendly wrappers exist.
   */
  public readonly raw: RawClient;

  /**
   * Instant-pull realtime helpers (REST polling). Push/stream transports are deferred.
   */
  public readonly realtime: Realtime;

  public line: Line;
  public stopPoint: StopPoint;
  public journey: Journey;
  public mode: Mode;
  public road: Road;
  public bikePoint: BikePoint;
  public accidentStats: AccidentStats;
  public airQuality: AirQuality;
  public cabwise: Cabwise;
  public search: Search;
  public vehicle: Vehicle;
  public occupancy: Occupancy;
  public place: Place;
  public travelTimes: TravelTimes;

  constructor(config?: TflClientConfig) {
    const appId = config?.appId || process.env.TFL_APP_ID;
    const appKey = config?.appKey || process.env.TFL_APP_KEY;

    if (!appId || !appKey) {
      throw new TflConfigError(
        'Missing TFL API credentials. Please either:\n' +
          '1. Create a .env file in the root directory with:\n' +
          '   TFL_APP_ID=your-app-id\n' +
          '   TFL_APP_KEY=your-app-key\n' +
          '2. Or pass the credentials directly:\n' +
          "   new TflClient({ appId: 'your-app-id', appKey: 'your-app-key' })\n" +
          'You can get these credentials by registering at https://api-portal.tfl.gov.uk/',
        'credentials',
      );
    }

    this.config = {
      appId,
      appKey,
      timeout: config?.timeout ?? 30000,
      maxRetries: config?.maxRetries ?? 3,
      retryDelay: config?.retryDelay ?? 1000,
    };

    this.http = new TflHttpClient(this.config);
    this.raw = new RawClient(this.http);
    this.realtime = new Realtime(this.raw);

    this.line = new Line(this.raw);
    this.stopPoint = new StopPoint(this.raw);
    this.journey = new Journey(this.raw);
    this.mode = new Mode(this.raw);
    this.road = new Road(this.raw);
    this.bikePoint = new BikePoint(this.raw);
    this.accidentStats = new AccidentStats(this.raw);
    this.airQuality = new AirQuality(this.raw);
    this.cabwise = new Cabwise(this.raw);
    this.search = new Search(this.raw);
    this.vehicle = new Vehicle(this.raw);
    this.occupancy = new Occupancy(this.raw);
    this.place = new Place(this.raw);
    this.travelTimes = new TravelTimes(this.raw);
  }

  async executeWithRetry<T>(apiCall: () => Promise<T>, _context?: string): Promise<T> {
    const requestId = this.generateRequestId();
    let lastError: TflError | undefined;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        const tflError = TflErrorHandler.handleApiError(error, undefined, requestId);
        lastError = tflError;

        if (attempt === this.config.maxRetries || !TflErrorHandler.isRetryableError(tflError)) {
          break;
        }

        const delay = TflErrorHandler.getRetryDelay(tflError, attempt, this.config.retryDelay);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  getConfig(): Readonly<TflClientConfig> {
    return this.config;
  }

  private generateRequestId = (): string =>
    `tfl_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

export default TflClient;
export { LINE_IDS, MODES, SERVICE_TYPES, DIRECTIONS, severityByMode, severityDescriptions };
export type { ModeName, ServiceType, DisruptionCategory };
export {
  TflError,
  TflHttpError,
  TflNetworkError,
  TflValidationError,
  TflTimeoutError,
  TflConfigError,
  TflErrorHandler,
};
export type { TflApiErrorBody };
export { RawClient } from './generated/raw';
export { ENDPOINTS, ENDPOINT_COUNT } from './generated/endpoints';
export type { EndpointDefinition } from './generated/endpoints';
export { Realtime, pollArrivals, pollLineArrivals, pollVehicleArrivals } from './realtime';
export type {
  PollMeta,
  PollArrivalsOptions,
  PollLineArrivalsOptions,
  PollVehicleArrivalsOptions,
  PollArrivalsUnsubscribe,
  OnArrivals,
  OnPollError,
  ArrivalSortBy,
  ArrivalSortOrder,
  Prediction as RealtimePrediction,
} from './realtime';
export * from './utils/ui';
export {
  getLineColor,
  getLineCssProps,
  getLineInlineStyles,
  normalizeLineId,
  getSeverityCategory,
  getSeverityClasses,
  getAccessibleSeverityLabel,
  sortLinesBySeverityAndOrder,
  getLineStatusSummary,
  isNormalService,
  hasNightService,
  getLineAriaLabel,
  getLineDisplayName,
  LINE_COLORS,
  SEVERITY_MAPPING,
  LINE_ORDER,
} from './utils/ui';
export {
  getPropertyValue,
  findElectricBikes,
  sortByDistance,
  findClosestWithBikes,
} from './utils/bikePoint';
