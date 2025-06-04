import { Api } from './tfl'; // Previously set up to automatically add credentials
import { Line } from './line';
import { AccidentStats } from './accidentStats';
import { AirQuality } from './airQuality';

interface TflClientConfig {
  appId?: string;
  appKey?: string;
}

class TflClient {
  private api: Api<{}>;
  public line: Line;
  public accidentStats: AccidentStats;
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

    this.line = new Line(this.api); // Instantiate specific domain module
    this.accidentStats = new AccidentStats(this.api);
    this.airQuality = new AirQuality(this.api);
  }
}

export default TflClient;