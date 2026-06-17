/**
 * Place API Module
 *
 * Search scope differences:
 * - `client.stopPoint.search()` focuses on stop points
 * - `client.bikePoint.search()` focuses on bike points
 * - `client.place.search()` searches place entities
 * - `client.search.search()` performs wider site search
 */
import {
  SystemObject,
  TflApiPresentationEntitiesPlace,
  TflApiPresentationEntitiesPlaceCategory,
  TflApiPresentationEntitiesStopPoint,
} from './generated/types';
import { RawClient } from './generated/raw';
import { Categories, PlaceTypes } from './generated/meta/Meta';
import { BatchRequest } from './utils/batchRequest';

type GeoRadius = { lat: number; lon: number; radius?: number };
type GeoBounds = { swLat: number; swLon: number; neLat: number; neLon: number };
type PlaceGeoShape = GeoRadius | GeoBounds;
type PlaceGeoOptions = PlaceGeoBaseQuery & PlaceGeoShape;

export interface PlaceStreetsByPostcodeQuery {
  postcode: string;
  postcodeInputPostcode?: string;
  keepTflTypes?: boolean;
}

export interface PlaceByTypeQuery {
  placeTypes: string[];
  activeOnly?: boolean;
  keepTflTypes?: boolean;
}

export interface PlaceByIdQuery {
  placeId: string;
  includeChildren?: boolean;
  keepTflTypes?: boolean;
}

interface PlaceGeoBaseQuery {
  categories?: string[];
  includeChildren?: boolean;
  placeTypes?: string[];
  activeOnly?: boolean;
  numberOfPlacesToReturn?: number;
  keepTflTypes?: boolean;
}

export type PlaceByGeoQuery = PlaceGeoOptions;

export interface PlaceAtQuery {
  placeType: string;
  lat: number;
  lon: number;
  keepTflTypes?: boolean;
}

export interface PlaceOverlayQuery {
  placeType: string;
  z: number;
  lat: number;
  lon: number;
  width: number;
  height: number;
  keepTflTypes?: boolean;
}

export interface PlaceSearchQuery {
  name: string;
  placeTypes?: string[];
  keepTflTypes?: boolean;
}

export type TflPlace = TflApiPresentationEntitiesPlace;
export type TflPlaceCategory = TflApiPresentationEntitiesPlaceCategory;
export type TflGeoPlace = TflApiPresentationEntitiesStopPoint;

const isBoundsQuery = (query: PlaceGeoOptions): query is PlaceGeoBaseQuery & GeoBounds =>
  'swLat' in query && 'swLon' in query && 'neLat' in query && 'neLon' in query;

export class Place {
  static readonly API_NAME = 'Place API';
  static readonly TOTAL_ENDPOINTS = 9;

  public readonly PLACE_TYPES: readonly typeof PlaceTypes[number][] = PlaceTypes;
  public readonly CATEGORIES: readonly typeof Categories[number][] = Categories;

  private batchRequest: BatchRequest;

  constructor(private raw: RawClient) {
    this.batchRequest = new BatchRequest(raw, { chunkSize: 12 });
  }

  async getMetaCategories(options: { keepTflTypes?: boolean } = {}): Promise<TflPlaceCategory[]> {
    const { keepTflTypes = false } = options;
    return this.raw.place.metaCategories({ keepTflTypes });
  }

  async getMetaPlaceTypes(options: { keepTflTypes?: boolean } = {}): Promise<TflPlaceCategory[]> {
    const { keepTflTypes = false } = options;
    return this.raw.place.metaPlaceTypes({ keepTflTypes });
  }

  async getStreetsByPostcode(options: PlaceStreetsByPostcodeQuery): Promise<SystemObject> {
    const { postcode, postcodeInputPostcode, keepTflTypes = false } = options;
    return this.raw.place.getStreetsByPostCode({
      postcode,
      ...(postcodeInputPostcode !== undefined && { "postcodeInput.postcode": postcodeInputPostcode }),
      keepTflTypes,
    });
  }

  async getByType(options: PlaceByTypeQuery): Promise<TflPlace[]> {
    const { placeTypes, activeOnly, keepTflTypes = false } = options;
    if (!placeTypes.length) {
      return [];
    }

    return this.batchRequest.processBatch(placeTypes, async chunk =>
      this.raw.place.getByType({ types: chunk, activeOnly, keepTflTypes }),
    );
  }

  async getById(options: PlaceByIdQuery): Promise<TflPlace[]> {
    const { placeId, includeChildren, keepTflTypes = false } = options;
    return this.raw.place.get({ id: placeId, includeChildren, keepTflTypes });
  }

  async getByGeo(options: PlaceByGeoQuery): Promise<TflGeoPlace[]> {
    const { keepTflTypes = false, ...rest } = options;
    const geoOptions = rest as PlaceGeoOptions;
    return this.raw.place.getByGeo({ ...this.buildGeoQuery(geoOptions), keepTflTypes });
  }

  async getAt(options: PlaceAtQuery): Promise<SystemObject> {
    const { placeType, lat, lon, keepTflTypes = false } = options;
    const latString = String(lat);
    const lonString = String(lon);

    return this.raw.place.getAt({
      type: placeType,
      lat: latString,
      lon: lonString,
      "location.lat": lat,
      "location.lon": lon,
      keepTflTypes,
    });
  }

  async getOverlay(options: PlaceOverlayQuery): Promise<SystemObject> {
    const { placeType, z, lat, lon, width, height, keepTflTypes = false } = options;
    const latString = String(lat);
    const lonString = String(lon);

    return this.raw.place.getOverlay({
      type: placeType,
      z,
      lat: latString,
      lon: lonString,
      width,
      height,
      "location.lat": lat,
      "location.lon": lon,
      keepTflTypes,
    });
  }

  async search(options: PlaceSearchQuery): Promise<TflPlace[]> {
    const { name, placeTypes, keepTflTypes = false } = options;
    return this.raw.place.search({ name, types: placeTypes, keepTflTypes });
  }

  private buildGeoQuery(options: PlaceGeoOptions): {
    radius?: number;
    categories?: string[];
    includeChildren?: boolean;
    type?: string[];
    activeOnly?: boolean;
    numberOfPlacesToReturn?: number;
    "placeGeo.swLat"?: number;
    "placeGeo.swLon"?: number;
    "placeGeo.neLat"?: number;
    "placeGeo.neLon"?: number;
    "placeGeo.lat"?: number;
    "placeGeo.lon"?: number;
  } {
    const base = {
      categories: options.categories,
      includeChildren: options.includeChildren,
      type: options.placeTypes,
      activeOnly: options.activeOnly,
      numberOfPlacesToReturn: options.numberOfPlacesToReturn,
    };

    if (isBoundsQuery(options)) {
      return {
        ...base,
        "placeGeo.swLat": options.swLat,
        "placeGeo.swLon": options.swLon,
        "placeGeo.neLat": options.neLat,
        "placeGeo.neLon": options.neLon,
      };
    }

    return {
      ...base,
      "placeGeo.lat": options.lat,
      "placeGeo.lon": options.lon,
      radius: options.radius,
    };
  }
}
