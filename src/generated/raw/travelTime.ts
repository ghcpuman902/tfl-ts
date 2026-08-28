// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  SystemObject,
} from '../types';

export interface TravelTimeGetCompareOverlayArgs {
    z: string | number | boolean | string[];
    mapCenterLat: string | number | boolean | string[];
    mapCenterLon: string | number | boolean | string[];
    pinLat: string | number | boolean | string[];
    pinLon: string | number | boolean | string[];
    width: string | number | boolean | string[];
    height: string | number | boolean | string[];
    scenarioTitle: string | number | boolean | string[];
    timeOfDayId: string | number | boolean | string[];
    modeId: string | number | boolean | string[];
    direction: string | number | boolean | string[];
    travelTimeInterval: string | number | boolean | string[];
    compareType: string | number | boolean | string[];
    compareValue: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface TravelTimeGetOverlayArgs {
    z: string | number | boolean | string[];
    mapCenterLat: string | number | boolean | string[];
    mapCenterLon: string | number | boolean | string[];
    pinLat: string | number | boolean | string[];
    pinLon: string | number | boolean | string[];
    width: string | number | boolean | string[];
    height: string | number | boolean | string[];
    scenarioTitle: string | number | boolean | string[];
    timeOfDayId: string | number | boolean | string[];
    modeId: string | number | boolean | string[];
    direction: string | number | boolean | string[];
    travelTimeInterval: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createTravelTimeRaw = (http: TflHttpClient) => ({
    /**
     * Gets the TravelTime overlay.
     * @operationId TravelTime_GetCompareOverlay
     * @deprecated false
     */
    getCompareOverlay: async (args: TravelTimeGetCompareOverlayArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.scenarioTitle !== undefined) query["scenarioTitle"] = args.scenarioTitle;
    if (args.timeOfDayId !== undefined) query["timeOfDayId"] = args.timeOfDayId;
    if (args.modeId !== undefined) query["modeId"] = args.modeId;
    if (args.direction !== undefined) query["direction"] = args.direction;
    if (args.travelTimeInterval !== undefined) query["travelTimeInterval"] = args.travelTimeInterval;
    if (args.compareType !== undefined) query["compareType"] = args.compareType;
    if (args.compareValue !== undefined) query["compareValue"] = args.compareValue;
    return http.request<SystemObject>({
      method: 'GET',
      path: `/TravelTimes/compareOverlay/${formatPathParam(args.z)}/mapcenter/${formatPathParam(args.mapCenterLat)}/${formatPathParam(args.mapCenterLon)}/pinlocation/${formatPathParam(args.pinLat)}/${formatPathParam(args.pinLon)}/dimensions/${formatPathParam(args.width)}/${formatPathParam(args.height)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets the TravelTime overlay.
     * @operationId TravelTime_GetOverlay
     * @deprecated false
     */
    getOverlay: async (args: TravelTimeGetOverlayArgs): Promise<SystemObject> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.scenarioTitle !== undefined) query["scenarioTitle"] = args.scenarioTitle;
    if (args.timeOfDayId !== undefined) query["timeOfDayId"] = args.timeOfDayId;
    if (args.modeId !== undefined) query["modeId"] = args.modeId;
    if (args.direction !== undefined) query["direction"] = args.direction;
    if (args.travelTimeInterval !== undefined) query["travelTimeInterval"] = args.travelTimeInterval;
    return http.request<SystemObject>({
      method: 'GET',
      path: `/TravelTimes/overlay/${formatPathParam(args.z)}/mapcenter/${formatPathParam(args.mapCenterLat)}/${formatPathParam(args.mapCenterLon)}/pinlocation/${formatPathParam(args.pinLat)}/${formatPathParam(args.pinLon)}/dimensions/${formatPathParam(args.width)}/${formatPathParam(args.height)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
