import { Api } from './generated/tfl';
import { Line } from './line';
import { AccidentStats } from './accidentStats';
import { AirQuality } from './airQuality';
import { Journey } from './journey';
import { StopPoint } from './stopPoint';
import { Mode } from './mode';
import { Road } from './road';
import { Modes, ServiceTypes, DisruptionCategories } from './generated/meta/Meta';

// Generate types from the generated meta data
type ModeName = typeof Modes[number]['modeName'];
type ServiceType = typeof ServiceTypes[number];
type DisruptionCategory = typeof DisruptionCategories[number];

// Create mode metadata from the generated Modes data
const modeMetadata: Record<string, any> = Modes.reduce((acc, mode) => {
  acc[mode.modeName] = {
    isTflService: mode.isTflService,
    isFarePaying: mode.isFarePaying,
    isScheduledService: mode.isScheduledService
  };
  return acc;
}, {} as Record<string, any>);

// Tfl Line IDs
const LINE_IDS = {
  tube: {
    BAKERLOO: 'bakerloo',
    CENTRAL: 'central',
    CIRCLE: 'circle',
    DISTRICT: 'district',
    HAMMERSMITH_CITY: 'hammersmith-city',
    JUBILEE: 'jubilee',
    METROPOLITAN: 'metropolitan',
    NORTHERN: 'northern',
    PICCADILLY: 'piccadilly',
    VICTORIA: 'victoria',
    WATERLOO_CITY: 'waterloo-city',
    ELIZABETH: 'elizabeth'
  },
  dlr: {
    DLR: 'dlr'
  },
  overground: {
    OVERGROUND: 'london-overground'
  },
  tram: {
    TRAM: 'tram'
  },
  bus: {
    BUS: 'bus'
  }
} as const;

// Tfl Transport Modes
const MODES = modeMetadata;

// Tfl Service Types
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

// Type for line IDs
export type TflLineId = typeof LINE_IDS[keyof typeof LINE_IDS][keyof typeof LINE_IDS[keyof typeof LINE_IDS]];

// Type for transport modes
export type TflMode = keyof typeof MODES;

// Type for service types
export type TflServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];

// Type for directions
export type TflDirection = typeof DIRECTIONS[keyof typeof DIRECTIONS];

interface TflClientConfig {
  appId?: string;
  appKey?: string;
}

class TflClient {
  private api: Api<{}>;
  
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
   * Access accident statistics for London roads.
   */
  public accidentStats: AccidentStats;

  /**
   * Access real-time air quality data for London.
   */
  public airQuality: AirQuality;

  constructor(config?: TflClientConfig) {
    const appId = config?.appId || process.env.TFL_APP_ID;
    const appKey = config?.appKey || process.env.TFL_APP_KEY;

    if (!appId || !appKey) {
      throw new Error(
        "Missing TFL API credentials. Please either:\n" +
        "1. Create a .env file in the root directory with:\n" +
        "   TFL_APP_ID=your-app-id\n" +
        "   TFL_APP_KEY=your-app-key\n" +
        "2. Or pass the credentials directly:\n" +
        "   new TflClient({ appId: 'your-app-id', appKey: 'your-app-key' })\n" +
        "You can get these credentials by registering at https://api-portal.tfl.gov.uk/"
      );
    }

    this.api = new Api({
      baseUrl: "https://api.tfl.gov.uk",
      customFetch: (input, init) => {
        const url = new URL(input.toString());
        url.searchParams.set("app_id", appId);
        url.searchParams.set("app_key", appKey);
        return fetch(url, init);
      }
    });

    // Initialize core transport services
    this.line = new Line(this.api);
    this.stopPoint = new StopPoint(this.api);
    this.journey = new Journey(this.api);
    this.mode = new Mode(this.api);
    this.road = new Road(this.api);

    // Initialize additional services
    this.accidentStats = new AccidentStats(this.api);
    this.airQuality = new AirQuality(this.api);
  }
}

export default TflClient;
export {
  LINE_IDS,
  MODES,
  SERVICE_TYPES,
  DIRECTIONS
};
export type { ModeName, ServiceType, DisruptionCategory };