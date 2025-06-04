import { Api, SystemObject } from './tfl';

/** Class for AirQuality service */
class AirQuality {
  private api: Api<{}>;

  /**
   * Creates an instance of AirQuality service.
   * @param api - The TfL API instance
   */
  constructor(api: Api<{}>) {
    this.api = api;
  }

  /**
   * Get air quality information
   */
  async get(): Promise<SystemObject> {
    return this.api.airQuality.airQualityGet().then(response => response.data);
  }
}

// Export the AirQuality module
export { AirQuality };
