/**
 * Vehicle API Module
 */
import { TflApiPresentationEntitiesPrediction } from './generated/types';
import { RawClient } from './generated/raw';
import { BatchRequest } from './utils/batchRequest';

export interface VehicleArrivalsQuery {
  vehicleIds: string[];
  keepTflTypes?: boolean;
}

export type TflPrediction = TflApiPresentationEntitiesPrediction;

export class Vehicle {
  static readonly API_NAME = 'Vehicle API';
  static readonly TOTAL_ENDPOINTS = 1;

  private batchRequest: BatchRequest;

  constructor(private raw: RawClient) {
    this.batchRequest = new BatchRequest(raw);
  }

  async getArrivals(options: VehicleArrivalsQuery): Promise<TflPrediction[]> {
    const { vehicleIds, keepTflTypes = false } = options;
    if (!vehicleIds.length) {
      return [];
    }

    return this.batchRequest.processBatch(vehicleIds, async chunk =>
      this.raw.vehicle.get({ ids: chunk, keepTflTypes }),
    );
  }
}
