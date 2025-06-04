import { Api, TflApiPresentationEntitiesAccidentStatsAccidentDetail as TflAccidentDetail } from './tfl';

/** Interface for accident stats queries */
interface AccidentStatsQuery {
  year: number;
}

/** Class for AccidentStats service */
class AccidentStats {
  private api: Api<{}>;

  /**
   * Creates an instance of AccidentStats service.
   * @param api - The TfL API instance
   */
  constructor(api: Api<{}>) {
    this.api = api;
  }

  /**
   * Get accident statistics for a specific year
   */
  async get(options: AccidentStatsQuery): Promise<TflAccidentDetail[]> {
    const { year } = options;
    return this.api.accidentStats.accidentStatsGet(year).then(response => response.data);
  }
}

// Export the AccidentStats module
export { AccidentStats, AccidentStatsQuery };
