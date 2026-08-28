// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  SystemObject,
  TflApiPresentationEntitiesPlace,
  TflApiPresentationEntitiesPlaceCategory,
  TflApiPresentationEntitiesStopPoint,
} from '../types';

export interface PlaceGetArgs {
    id: string | number | boolean | string[];
    includeChildren?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetAtArgs {
    type: string | number | boolean | string[];
    lat: string | number | boolean | string[];
    lon: string | number | boolean | string[];
    "location.lat": string | number | boolean | string[];
    "location.lon": string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetByGeoArgs {
    radius?: string | number | boolean | string[];
    categories?: string | number | boolean | string[];
    includeChildren?: string | number | boolean | string[];
    type?: string | number | boolean | string[];
    activeOnly?: string | number | boolean | string[];
    numberOfPlacesToReturn?: string | number | boolean | string[];
    "placeGeo.swLat"?: string | number | boolean | string[];
    "placeGeo.swLon"?: string | number | boolean | string[];
    "placeGeo.neLat"?: string | number | boolean | string[];
    "placeGeo.neLon"?: string | number | boolean | string[];
    "placeGeo.lat"?: string | number | boolean | string[];
    "placeGeo.lon"?: string | number | boolean | string[];
    lat?: string | number | boolean | string[];
    lon?: string | number | boolean | string[];
    swLat?: string | number | boolean | string[];
    swLon?: string | number | boolean | string[];
    neLat?: string | number | boolean | string[];
    neLon?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetByTypeArgs {
    types: string | number | boolean | string[];
    activeOnly?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetOverlayArgs {
    type: string | number | boolean | string[];
    z: string | number | boolean | string[];
    lat: string | number | boolean | string[];
    lon: string | number | boolean | string[];
    width: string | number | boolean | string[];
    height: string | number | boolean | string[];
    "location.lat": string | number | boolean | string[];
    "location.lon": string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceGetStreetsByPostCodeArgs {
    postcode: string | number | boolean | string[];
    "postcodeInput.postcode"?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceMetaCategoriesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceMetaPlaceTypesArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface PlaceSearchArgs {
    name: string | number | boolean | string[];
    types?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createPlaceRaw = (http: TflHttpClient) => ({
    /**
     * Gets the place with the given id.
     * @operationId Place_Get
     * @deprecated false
     */
    get: async (args: PlaceGetArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.includeChildren !== undefined) query["includeChildren"] = args.includeChildren;
    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/Place/${formatPathParam(args.id)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets any places of the given type whose geography intersects the given latitude and longitude. In practice this means the Place
            must be polygonal e.g. a BoroughBoundary.
     * @operationId Place_GetAt
     * @deprecated false
     */
    getAt: async (args: PlaceGetAtArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args["location.lat"] !== undefined) query["location.lat"] = args["location.lat"];
    if (args["location.lon"] !== undefined) query["location.lon"] = args["location.lon"];
    return http.request<SystemObject>({
      method: 'GET',
      path: `/Place/${formatPathParam(args.type)}/At/${formatPathParam(args.lat)}/${formatPathParam(args.lon)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the places that lie within a geographic region. The geographic region of interest can either be specified
            by using a lat/lon geo-point and a radius in metres to return places within the locus defined by the lat/lon of
            its centre or alternatively, by the use of a bounding box defined by the lat/lon of its north-west and south-east corners.
            Optionally filters on type and can strip properties for a smaller payload.
     * @operationId Place_GetByGeo
     * @deprecated false
     */
    getByGeo: async (args: PlaceGetByGeoArgs = {}): Promise<TflApiPresentationEntitiesStopPoint[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.radius !== undefined) query["radius"] = args.radius;
    if (args.categories !== undefined) query["categories"] = args.categories;
    if (args.includeChildren !== undefined) query["includeChildren"] = args.includeChildren;
    if (args.type !== undefined) query["type"] = args.type;
    if (args.activeOnly !== undefined) query["activeOnly"] = args.activeOnly;
    if (args.numberOfPlacesToReturn !== undefined) query["numberOfPlacesToReturn"] = args.numberOfPlacesToReturn;
    if ((args["placeGeo.swLat"] !== undefined ? args["placeGeo.swLat"] : args.swLat) !== undefined) query["swLat"] = (args["placeGeo.swLat"] !== undefined ? args["placeGeo.swLat"] : args.swLat);
    if ((args["placeGeo.swLon"] !== undefined ? args["placeGeo.swLon"] : args.swLon) !== undefined) query["swLon"] = (args["placeGeo.swLon"] !== undefined ? args["placeGeo.swLon"] : args.swLon);
    if ((args["placeGeo.neLat"] !== undefined ? args["placeGeo.neLat"] : args.neLat) !== undefined) query["neLat"] = (args["placeGeo.neLat"] !== undefined ? args["placeGeo.neLat"] : args.neLat);
    if ((args["placeGeo.neLon"] !== undefined ? args["placeGeo.neLon"] : args.neLon) !== undefined) query["neLon"] = (args["placeGeo.neLon"] !== undefined ? args["placeGeo.neLon"] : args.neLon);
    if ((args["placeGeo.lat"] !== undefined ? args["placeGeo.lat"] : args.lat) !== undefined) query["lat"] = (args["placeGeo.lat"] !== undefined ? args["placeGeo.lat"] : args.lat);
    if ((args["placeGeo.lon"] !== undefined ? args["placeGeo.lon"] : args.lon) !== undefined) query["lon"] = (args["placeGeo.lon"] !== undefined ? args["placeGeo.lon"] : args.lon);
    return http.request<TflApiPresentationEntitiesStopPoint[]>({
      method: 'GET',
      path: `/Place`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all places of a given type
     * @operationId Place_GetByType
     * @deprecated false
     */
    getByType: async (args: PlaceGetByTypeArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.activeOnly !== undefined) query["activeOnly"] = args.activeOnly;
    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/Place/Type/${formatPathParam(args.types)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the place overlay for a given set of co-ordinates and a given width/height.
     * @operationId Place_GetOverlay
     * @deprecated false
     */
    getOverlay: async (args: PlaceGetOverlayArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args["location.lat"] !== undefined) query["location.lat"] = args["location.lat"];
    if (args["location.lon"] !== undefined) query["location.lon"] = args["location.lon"];
    return http.request<SystemObject>({
      method: 'GET',
      path: `/Place/${formatPathParam(args.type)}/overlay/${formatPathParam(args.z)}/${formatPathParam(args.lat)}/${formatPathParam(args.lon)}/${formatPathParam(args.width)}/${formatPathParam(args.height)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the set of streets associated with a post code.
     * @operationId Place_GetStreetsByPostCode
     * @deprecated false
     */
    getStreetsByPostCode: async (args: PlaceGetStreetsByPostCodeArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args["postcodeInput.postcode"] !== undefined) query["postcodeInput.postcode"] = args["postcodeInput.postcode"];
    return http.request<SystemObject>({
      method: 'GET',
      path: `/Place/Address/Streets/${formatPathParam(args.postcode)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of all of the available place property categories and keys.
     * @operationId Place_MetaCategories
     * @deprecated false
     */
    metaCategories: async (args: PlaceMetaCategoriesArgs = {}): Promise<TflApiPresentationEntitiesPlaceCategory[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPlaceCategory[]>({
      method: 'GET',
      path: `/Place/Meta/Categories`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of the available types of Place.
     * @operationId Place_MetaPlaceTypes
     * @deprecated false
     */
    metaPlaceTypes: async (args: PlaceMetaPlaceTypesArgs = {}): Promise<TflApiPresentationEntitiesPlaceCategory[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesPlaceCategory[]>({
      method: 'GET',
      path: `/Place/Meta/PlaceTypes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets all places that matches the given query
     * @operationId Place_Search
     * @deprecated false
     */
    search: async (args: PlaceSearchArgs): Promise<TflApiPresentationEntitiesPlace[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.name !== undefined) query["name"] = args.name;
    if (args.types !== undefined) query["types"] = args.types;
    return http.request<TflApiPresentationEntitiesPlace[]>({
      method: 'GET',
      path: `/Place/Search`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
