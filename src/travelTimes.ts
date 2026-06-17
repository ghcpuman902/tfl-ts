/**
 * Travel Times API Module
 *
 * Provides travel-time overlay data for map visualization use cases.
 * For route planning between two points, use `client.journey`.
 */
import {
  SystemObject,
} from './generated/types';
import { RawClient } from './generated/raw';

type TravelDirection = 'Average' | 'From' | 'To';

export interface TravelTimeOverlayQuery {
  z: number;
  pinLat: number;
  pinLon: number;
  mapCenterLat: number;
  mapCenterLon: number;
  width: number;
  height: number;
  scenarioTitle: string;
  timeOfDayId: string;
  modeId: string;
  direction: TravelDirection;
  travelTimeInterval: string;
  keepTflTypes?: boolean;
}

export interface TravelTimeCompareOverlayQuery extends TravelTimeOverlayQuery {
  compareType: string;
  compareValue: string;
  keepTflTypes?: boolean;
}

export class TravelTimes {
  static readonly API_NAME = 'TravelTimes API';
  static readonly TOTAL_ENDPOINTS = 2;

  public readonly DIRECTIONS: readonly TravelDirection[] = ['Average', 'From', 'To'];
  public readonly COMPARE_DIRECTIONS: readonly TravelDirection[] = ['Average', 'From', 'To'];

  constructor(private raw: RawClient) {}

  async getOverlay(options: TravelTimeOverlayQuery): Promise<SystemObject> {
    const { keepTflTypes = false, ...params } = options;
    return this.raw.travelTime.getOverlay({
      ...params,
      keepTflTypes,
    });
  }

  async getCompareOverlay(options: TravelTimeCompareOverlayQuery): Promise<SystemObject> {
    const { keepTflTypes = false, ...params } = options;
    return this.raw.travelTime.getCompareOverlay({
      ...params,
      keepTflTypes,
    });
  }
}
