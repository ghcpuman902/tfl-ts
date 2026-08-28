import { TflHttpClient } from './core/http';
import { RawClient } from './generated/rawClient';
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
  TflError,
  TflConfigError,
  TflErrorHandler,
} from './errors';

export interface TflClientConfig {
  appId?: string;
  appKey?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
}

type ResolvedClientConfig = {
  appId?: string;
  appKey: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
};

const MISSING_APP_KEY_MESSAGE =
  'Missing TFL_APP_KEY.\n' +
  'Subscribe to "500 Requests per min" at https://api-portal.tfl.gov.uk/, then open Profile and press Show next to your Primary key.\n' +
  'Set TFL_APP_KEY, or pass { appKey } to TflClient.';

const APP_ID_NOTICE =
  'tfl-ts: appId is unused by TfL (since Jan 2021). appKey / TFL_APP_KEY (Primary key) is enough.';

let appIdNoticeShown = false;

const warnIfAppIdProvided = (appId?: string): void => {
  if (!appId || appIdNoticeShown) {
    return;
  }
  appIdNoticeShown = true;
  console.warn(APP_ID_NOTICE);
};

export class TflClient {
  private readonly http: TflHttpClient;
  private readonly config: ResolvedClientConfig;

  /**
   * Direct access to every TfL REST endpoint using generated operation names.
   * This escape hatch always stays available even before friendly wrappers exist.
   */
  public readonly raw: RawClient;

  private _realtime?: Realtime;
  private _line?: Line;
  private _stopPoint?: StopPoint;
  private _journey?: Journey;
  private _mode?: Mode;
  private _road?: Road;
  private _bikePoint?: BikePoint;
  private _accidentStats?: AccidentStats;
  private _airQuality?: AirQuality;
  private _cabwise?: Cabwise;
  private _search?: Search;
  private _vehicle?: Vehicle;
  private _occupancy?: Occupancy;
  private _place?: Place;
  private _travelTimes?: TravelTimes;

  constructor(config?: TflClientConfig) {
    const appId = config?.appId || process.env.TFL_APP_ID;
    const appKey = config?.appKey || process.env.TFL_APP_KEY;

    if (!appKey) {
      throw new TflConfigError(MISSING_APP_KEY_MESSAGE, 'appKey');
    }

    warnIfAppIdProvided(appId);

    this.config = {
      appKey,
      timeout: config?.timeout ?? 30000,
      maxRetries: config?.maxRetries ?? 3,
      retryDelay: config?.retryDelay ?? 1000,
      ...(appId ? { appId } : {}),
    };

    this.http = new TflHttpClient(this.config);
    this.raw = new RawClient(this.http);
  }

  get realtime(): Realtime {
    return (this._realtime ??= new Realtime(this.raw));
  }

  get line(): Line {
    return (this._line ??= new Line(this.raw, this.http));
  }

  get stopPoint(): StopPoint {
    return (this._stopPoint ??= new StopPoint(this.raw));
  }

  get journey(): Journey {
    return (this._journey ??= new Journey(this.raw));
  }

  get mode(): Mode {
    return (this._mode ??= new Mode(this.raw));
  }

  get road(): Road {
    return (this._road ??= new Road(this.raw));
  }

  get bikePoint(): BikePoint {
    return (this._bikePoint ??= new BikePoint(this.raw));
  }

  get accidentStats(): AccidentStats {
    return (this._accidentStats ??= new AccidentStats(this.raw));
  }

  get airQuality(): AirQuality {
    return (this._airQuality ??= new AirQuality(this.raw));
  }

  get cabwise(): Cabwise {
    return (this._cabwise ??= new Cabwise(this.raw));
  }

  get search(): Search {
    return (this._search ??= new Search(this.raw));
  }

  get vehicle(): Vehicle {
    return (this._vehicle ??= new Vehicle(this.raw));
  }

  get occupancy(): Occupancy {
    return (this._occupancy ??= new Occupancy(this.raw));
  }

  get place(): Place {
    return (this._place ??= new Place(this.raw));
  }

  get travelTimes(): TravelTimes {
    return (this._travelTimes ??= new TravelTimes(this.raw));
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
