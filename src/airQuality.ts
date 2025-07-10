import { Api } from './generated/tfl';
import { stripTypeFields } from './utils/stripTypes';



/**
 * Air quality information returned by the TfL API
 * @example
 * {
 *   updatePeriod: "hourly",
 *   updateFrequency: "1 hour",
 *   updateSource: "Ricardo-AEA",
 *   bbox: [51.28, -0.53, 51.69, 0.33],
 *   forecastURL: "https://www.londonair.org.uk/london/asp/forecast.asp",
 *   disclaimerText: "This data is subject to terms and conditions.",
 *   currentForecast: [
 *     {
 *       forecastType: "Current",
 *       forecastID: "Current",
 *       forecastBand: "Low",
 *       forecastSummary: "Air pollution is low",
 *       forecastText: "Air pollution is low across London today.",
 *       nO2Band: "Low",
 *       o3Band: "Low",
 *       pM10Band: "Low",
 *       pM25Band: "Low",
 *       sO2Band: "Low",
 *       forecastURL: "https://www.londonair.org.uk/london/asp/forecast.asp"
 *     }
 *   ]
 * }
 */
export interface AirQualityInfo {
  /** Update period for the air quality data */
  updatePeriod?: string;
  /** Frequency of updates */
  updateFrequency?: string;
  /** Source of the air quality data */
  updateSource?: string;
  /** Bounding box coordinates [minLat, minLon, maxLat, maxLon] */
  bbox?: number[];
  /** URL to the forecast page */
  forecastURL?: string;
  /** Disclaimer text for the data */
  disclaimerText?: string;
  /** Current forecast information */
  currentForecast?: AirQualityForecast[];
  /** Additional air quality information */
  [key: string]: any;
}

/**
 * Air quality forecast information
 * @example
 * {
 *   forecastType: "Current",
 *   forecastID: "Current",
 *   forecastBand: "Low",
 *   forecastSummary: "Air pollution is low",
 *   forecastText: "Air pollution is low across London today.",
 *   nO2Band: "Low",
 *   o3Band: "Low",
 *   pM10Band: "Low",
 *   pM25Band: "Low",
 *   sO2Band: "Low"
 * }
 */
export interface AirQualityForecast {
  /** Type of forecast (e.g., "Current", "Daily") */
  forecastType?: string;
  /** Unique identifier for the forecast */
  forecastID?: string;
  /** Overall air quality band (Low, Moderate, High, Very High) */
  forecastBand?: string;
  /** Summary of the forecast */
  forecastSummary?: string;
  /** Detailed forecast text */
  forecastText?: string;
  /** Nitrogen dioxide band */
  nO2Band?: string;
  /** Ozone band */
  o3Band?: string;
  /** PM10 particulate matter band */
  pM10Band?: string;
  /** PM2.5 particulate matter band */
  pM25Band?: string;
  /** Sulphur dioxide band */
  sO2Band?: string;
  /** URL to detailed forecast information */
  forecastURL?: string;
}

/**
 * Air quality bands used by TfL
 * @example
 * // Check air quality bands
 * const bands = client.airQuality.AIR_QUALITY_BANDS;
 * console.log(bands); // ['Low', 'Moderate', 'High', 'Very High']
 * 
 * // Validate user input before making API calls
 * const userInput = ['Low', 'Invalid'];
 * const validBands = userInput.filter(band => client.airQuality.AIR_QUALITY_BANDS.includes(band as AirQualityBand));
 * if (validBands.length !== userInput.length) {
 *   throw new Error(`Invalid air quality bands: ${userInput.filter(band => !client.airQuality.AIR_QUALITY_BANDS.includes(band as AirQualityBand)).join(', ')}`);
 * }
 */
export type AirQualityBand = 'Low' | 'Moderate' | 'High' | 'Very High';

/**
 * ⚠️ **DEPRECATED API - NOT RECOMMENDED FOR USE**
 * 
 * Access real-time air quality data for London.
 * 
 * This API appears to be poorly maintained on TfL's side and may not return
 * current or reliable data. 
 * 
 * **RECOMMENDED ALTERNATIVES:**
 * 
 * For comprehensive and up-to-date air quality data, please use:
 * 
 * 1. **London Air API** - https://londonair.org.uk/Londonair/API/
 *    - Live air quality data feeds
 *    - Current and forecast air quality information
 *    - Machine-readable formats (XML/JSON)
 *    - Comprehensive documentation and help
 * 
 * 2. **London Datastore Air Quality** - https://data.london.gov.uk/air-quality/
 *    - London Atmospheric Emissions Inventory (LAEI)
 *    - London Local Air Quality Management (LLAQM)
 *    - Diffusion tube data
 *    - Air quality fact sheets and reports
 *    - NO2 focus areas and concentration maps
 * 
 * This API provides air quality information including current forecasts,
 * pollutant levels, and health advice. The data is provided by Ricardo-AEA
 * and updated hourly.
 * 
 * @example
 * // Get current air quality data
 * const airQuality = await client.airQuality.get();
 * console.log(`Current air quality: ${airQuality.currentForecast?.[0]?.forecastBand}`);
 * 
 * // Get air quality with type fields preserved
 * const airQuality = await client.airQuality.get({ keepTflTypes: true });
 * 
 * // Access static metadata (no HTTP request)
 * const bands = client.airQuality.AIR_QUALITY_BANDS;
 * const endpoints = client.airQuality.ENDPOINTS;
 * 
 * // Validate user input before making API calls
 * const userInput = ['Low', 'Invalid'];
 * const validBands = userInput.filter(band => client.airQuality.AIR_QUALITY_BANDS.includes(band as AirQualityBand));
 * if (validBands.length !== userInput.length) {
 *   throw new Error(`Invalid air quality bands: ${userInput.filter(band => !client.airQuality.AIR_QUALITY_BANDS.includes(band as AirQualityBand)).join(', ')}`);
 * }
 */
export class AirQuality {
  /** Available air quality bands (static, no HTTP request needed) */
  public readonly AIR_QUALITY_BANDS: readonly AirQualityBand[] = [
    'Low', 'Moderate', 'High', 'Very High'
  ] as const;

  /** Air quality band descriptions (static, no HTTP request needed) */
  public readonly AIR_QUALITY_BAND_DESCRIPTIONS = {
    'Low': 'Air pollution is low',
    'Moderate': 'Air pollution is moderate',
    'High': 'Air pollution is high',
    'Very High': 'Air pollution is very high'
  } as const;

  /** Pollutant types monitored by TfL (static, no HTTP request needed) */
  public readonly POLLUTANT_TYPES = [
    'NO2', 'O3', 'PM10', 'PM25', 'SO2'
  ] as const;

  constructor(private api: Api<{}>) {}

  /**
   * Gets air quality data feed
   * 
   * ⚠️ **WARNING: This method is part of a deprecated API.**
   * See the class documentation above for details and recommended alternatives.
   * 
   * This method returns comprehensive air quality information for London,
   * including current forecasts, pollutant levels, and health advice.
   * The data is provided by Ricardo-AEA and updated hourly.
   * 
   * @param options - Options for the request
   * @returns Promise resolving to air quality information
   * @example
   * // Get current air quality data
   * const airQuality = await client.airQuality.get();
   * 
   * // Get air quality with type fields preserved
   * const airQuality = await client.airQuality.get({ keepTflTypes: true });
   * 
   * // Process air quality data
   * if (airQuality.currentForecast?.[0]) {
   *   const forecast = airQuality.currentForecast[0];
   *   console.log(`Air Quality: ${forecast.forecastBand}`);
   *   console.log(`Summary: ${forecast.forecastSummary}`);
   *   console.log(`Details: ${forecast.forecastText}`);
   *   
   *   // Check specific pollutants
   *   console.log(`NO2 Level: ${forecast.nO2Band}`);
   *   console.log(`Ozone Level: ${forecast.o3Band}`);
   *   console.log(`PM10 Level: ${forecast.pM10Band}`);
   *   console.log(`PM2.5 Level: ${forecast.pM25Band}`);
   * }
   * 
   * // Access bounding box for London area
   * if (airQuality.bbox) {
   *   const [minLat, minLon, maxLat, maxLon] = airQuality.bbox;
   *   console.log(`London area: ${minLat},${minLon} to ${maxLat},${maxLon}`);
   * }
   * 
   * // Get forecast URL for more details
   * if (airQuality.forecastURL) {
   *   console.log(`Detailed forecast: ${airQuality.forecastURL}`);
   * }
   * 
   * // Validate air quality bands
   * const band = airQuality.currentForecast?.[0]?.forecastBand;
   * if (band && !client.airQuality.AIR_QUALITY_BANDS.includes(band as AirQualityBand)) {
   *   console.log(`Unknown air quality band: ${band}`);
   * }
   */
  async get(options: { keepTflTypes?: boolean } = {}): Promise<AirQualityInfo> {
    return this.api.airQuality.airQualityGet()
      .then(response => stripTypeFields(response.data, options.keepTflTypes));
  }



  /**
   * Get air quality band description
   * 
   * This method returns a human-readable description for a given air quality band.
   * 
   * @param band - The air quality band
   * @returns Description of the air quality band
   * @example
   * // Get description for air quality band
   * const description = client.airQuality.getBandDescription('High');
   * console.log(description); // "Air pollution is high"
   * 
   * // Use in conditional logic
   * const airQuality = await client.airQuality.get();
   * const band = airQuality.currentForecast?.[0]?.forecastBand;
   * if (band) {
   *   const description = client.airQuality.getBandDescription(band as AirQualityBand);
   *   console.log(`Current air quality: ${description}`);
   * }
   * 
   * // Validate band before using
   * const userBand = 'High';
   * if (client.airQuality.AIR_QUALITY_BANDS.includes(userBand as AirQualityBand)) {
   *   const description = client.airQuality.getBandDescription(userBand as AirQualityBand);
   *   console.log(description);
   * } else {
   *   console.log('Invalid air quality band');
   * }
   */
  getBandDescription(band: AirQualityBand): string {
    return this.AIR_QUALITY_BAND_DESCRIPTIONS[band] || 'Unknown air quality level';
  }

  /**
   * Check if air quality band indicates poor air quality
   * 
   * This method helps determine if the air quality is concerning
   * by checking if the band is 'High' or 'Very High'.
   * 
   * @param band - The air quality band to check
   * @returns True if air quality is poor (High or Very High)
   * @example
   * // Check if air quality is poor
   * const airQuality = await client.airQuality.get();
   * const band = airQuality.currentForecast?.[0]?.forecastBand as AirQualityBand;
   * 
   * if (band && client.airQuality.isPoorAirQuality(band)) {
   *   console.log('⚠️ Air quality is poor - consider limiting outdoor activities');
   * } else {
   *   console.log('✅ Air quality is good');
   * }
   * 
   * // Validate band before checking
   * const userBand = 'High';
   * if (client.airQuality.AIR_QUALITY_BANDS.includes(userBand as AirQualityBand)) {
   *   const isPoor = client.airQuality.isPoorAirQuality(userBand as AirQualityBand);
   *   console.log(`Is poor air quality: ${isPoor}`);
   * }
   */
  isPoorAirQuality(band: AirQualityBand): boolean {
    return band === 'High' || band === 'Very High';
  }

  /**
   * Get health advice based on air quality band
   * 
   * This method provides health advice appropriate for the given air quality level.
   * 
   * @param band - The air quality band
   * @returns Health advice for the air quality level
   * @example
   * // Get health advice
   * const airQuality = await client.airQuality.get();
   * const band = airQuality.currentForecast?.[0]?.forecastBand as AirQualityBand;
   * 
   * if (band) {
   *   const advice = client.airQuality.getHealthAdvice(band);
   *   console.log(`Health advice: ${advice}`);
   * }
   * 
   * // Validate band before getting advice
   * const userBand = 'Moderate';
   * if (client.airQuality.AIR_QUALITY_BANDS.includes(userBand as AirQualityBand)) {
   *   const advice = client.airQuality.getHealthAdvice(userBand as AirQualityBand);
   *   console.log(`Health advice: ${advice}`);
   * } else {
   *   console.log('Invalid air quality band');
   * }
   */
  getHealthAdvice(band: AirQualityBand): string {
    const advice = {
      'Low': 'Air quality is good. No health impacts expected.',
      'Moderate': 'Air quality is acceptable. Sensitive individuals may experience minor symptoms.',
      'High': 'Air quality is poor. Consider reducing outdoor activities, especially for sensitive groups.',
      'Very High': 'Air quality is very poor. Avoid outdoor activities, especially for sensitive groups.'
    };
    return advice[band] || 'No specific advice available for this air quality level.';
  }
}

// Export the AirQuality module and all interfaces
export { 
  // No specific query interfaces needed for AirQuality (only has one endpoint)
};
