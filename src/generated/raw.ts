// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../core/http';
import { createAccidentStatsRaw } from './raw/accidentStats';
import { createAirQualityRaw } from './raw/airQuality';
import { createBikePointRaw } from './raw/bikePoint';
import { createCabwiseRaw } from './raw/cabwise';
import { createJourneyRaw } from './raw/journey';
import { createLineRaw } from './raw/line';
import { createModeRaw } from './raw/mode';
import { createOccupancyRaw } from './raw/occupancy';
import { createPlaceRaw } from './raw/place';
import { createRoadRaw } from './raw/road';
import { createSearchRaw } from './raw/search';
import { createStopPointRaw } from './raw/stopPoint';
import { createTravelTimeRaw } from './raw/travelTime';
import { createVehicleRaw } from './raw/vehicle';

export class RawClient {
  constructor(private readonly http: TflHttpClient) {}

  private _accidentStats?: ReturnType<typeof createAccidentStatsRaw>;
  get accidentStats() {
    return (this._accidentStats ??= createAccidentStatsRaw(this.http));
  }

  private _airQuality?: ReturnType<typeof createAirQualityRaw>;
  get airQuality() {
    return (this._airQuality ??= createAirQualityRaw(this.http));
  }

  private _bikePoint?: ReturnType<typeof createBikePointRaw>;
  get bikePoint() {
    return (this._bikePoint ??= createBikePointRaw(this.http));
  }

  private _cabwise?: ReturnType<typeof createCabwiseRaw>;
  get cabwise() {
    return (this._cabwise ??= createCabwiseRaw(this.http));
  }

  private _journey?: ReturnType<typeof createJourneyRaw>;
  get journey() {
    return (this._journey ??= createJourneyRaw(this.http));
  }

  private _line?: ReturnType<typeof createLineRaw>;
  get line() {
    return (this._line ??= createLineRaw(this.http));
  }

  private _mode?: ReturnType<typeof createModeRaw>;
  get mode() {
    return (this._mode ??= createModeRaw(this.http));
  }

  private _occupancy?: ReturnType<typeof createOccupancyRaw>;
  get occupancy() {
    return (this._occupancy ??= createOccupancyRaw(this.http));
  }

  private _place?: ReturnType<typeof createPlaceRaw>;
  get place() {
    return (this._place ??= createPlaceRaw(this.http));
  }

  private _road?: ReturnType<typeof createRoadRaw>;
  get road() {
    return (this._road ??= createRoadRaw(this.http));
  }

  private _search?: ReturnType<typeof createSearchRaw>;
  get search() {
    return (this._search ??= createSearchRaw(this.http));
  }

  private _stopPoint?: ReturnType<typeof createStopPointRaw>;
  get stopPoint() {
    return (this._stopPoint ??= createStopPointRaw(this.http));
  }

  private _travelTime?: ReturnType<typeof createTravelTimeRaw>;
  get travelTime() {
    return (this._travelTime ??= createTravelTimeRaw(this.http));
  }

  private _vehicle?: ReturnType<typeof createVehicleRaw>;
  get vehicle() {
    return (this._vehicle ??= createVehicleRaw(this.http));
  }
}
