/**
 * Occupancy API Module
 */
import {
  TflApiPresentationEntitiesBay,
  TflApiPresentationEntitiesBikePointOccupancy,
  TflApiPresentationEntitiesCarParkOccupancy,
  TflApiPresentationEntitiesChargeConnectorOccupancy,
} from './generated/types';
import { RawClient } from './generated/raw';
import { BatchRequest } from './utils/batchRequest';

export interface OccupancyCarParkByIdQuery {
  carParkId: string;
  keepTflTypes?: boolean;
}

export interface OccupancyChargeConnectorsByIdsQuery {
  chargeConnectorIds: string[];
  keepTflTypes?: boolean;
}

export interface OccupancyBikePointsByIdsQuery {
  bikePointIds: string[];
  keepTflTypes?: boolean;
}

export type TflCarParkOccupancy = TflApiPresentationEntitiesCarParkOccupancy;
export type TflChargeConnectorOccupancy = TflApiPresentationEntitiesChargeConnectorOccupancy;
export type TflBikePointOccupancy = TflApiPresentationEntitiesBikePointOccupancy;
export type TflBay = TflApiPresentationEntitiesBay;

export class Occupancy {
  static readonly API_NAME = 'Occupancy API';
  static readonly TOTAL_ENDPOINTS = 5;

  private batchRequest: BatchRequest;

  constructor(private raw: RawClient) {
    this.batchRequest = new BatchRequest(raw);
  }

  async getCarParkById(options: OccupancyCarParkByIdQuery): Promise<TflCarParkOccupancy> {
    const { carParkId, keepTflTypes = false } = options;
    return this.raw.occupancy.get({ id: carParkId, keepTflTypes });
  }

  async getAllCarParks(options: { keepTflTypes?: boolean } = {}): Promise<TflCarParkOccupancy[]> {
    const { keepTflTypes = false } = options;
    return this.raw.occupancy.occupancyGet({ keepTflTypes });
  }

  async getChargeConnectorsByIds(
    options: OccupancyChargeConnectorsByIdsQuery,
  ): Promise<TflChargeConnectorOccupancy[]> {
    const { chargeConnectorIds, keepTflTypes = false } = options;
    if (!chargeConnectorIds.length) {
      return [];
    }

    return this.batchRequest.processBatch(chargeConnectorIds, async chunk =>
      this.raw.occupancy.getChargeConnectorStatus({ ids: chunk, keepTflTypes }),
    );
  }

  async getAllChargeConnectors(
    options: { keepTflTypes?: boolean } = {},
  ): Promise<TflChargeConnectorOccupancy[]> {
    const { keepTflTypes = false } = options;
    return this.raw.occupancy.getAllChargeConnectorStatus({ keepTflTypes });
  }

  async getBikePointsByIds(options: OccupancyBikePointsByIdsQuery): Promise<TflBikePointOccupancy[]> {
    const { bikePointIds, keepTflTypes = false } = options;
    if (!bikePointIds.length) {
      return [];
    }

    return this.batchRequest.processBatch(bikePointIds, async chunk =>
      this.raw.occupancy.getBikePointsOccupancies({ ids: chunk, keepTflTypes }),
    );
  }
}
