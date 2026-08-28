// Auto-generated raw TfL API client. Do not edit manually.
// Source: openapi/tfl-v1.json (sha256: 266abe0486b0abde0a4ec32c0dacdbd34b2629fa14ee4600db6934b5fa46a854)
// Generation timestamps: see ./generated.meta.json

import type { TflHttpClient } from '../../core/http';
import { formatPathParam } from './_shared';
import type {
  TflApiPresentationEntitiesJourneyPlannerItineraryResult,
  TflApiPresentationEntitiesMode,
} from '../types';

export interface JourneyJourneyResultsArgs {
    from: string | number | boolean | string[];
    to: string | number | boolean | string[];
    via?: string | number | boolean | string[];
    nationalSearch?: string | number | boolean | string[];
    date?: string | number | boolean | string[];
    time?: string | number | boolean | string[];
    timeIs?: string | number | boolean | string[];
    journeyPreference?: string | number | boolean | string[];
    mode?: string | number | boolean | string[];
    accessibilityPreference?: string | number | boolean | string[];
    fromName?: string | number | boolean | string[];
    toName?: string | number | boolean | string[];
    viaName?: string | number | boolean | string[];
    maxTransferMinutes?: string | number | boolean | string[];
    maxWalkingMinutes?: string | number | boolean | string[];
    walkingSpeed?: string | number | boolean | string[];
    cyclePreference?: string | number | boolean | string[];
    adjustment?: string | number | boolean | string[];
    bikeProficiency?: string | number | boolean | string[];
    alternativeCycle?: string | number | boolean | string[];
    alternativeWalking?: string | number | boolean | string[];
    applyHtmlMarkup?: string | number | boolean | string[];
    useMultiModalCall?: string | number | boolean | string[];
    walkingOptimization?: string | number | boolean | string[];
    taxiOnlyTrip?: string | number | boolean | string[];
    routeBetweenEntrances?: string | number | boolean | string[];
    useRealTimeLiveArrivals?: string | number | boolean | string[];
    calcOneDirection?: string | number | boolean | string[];
    includeAlternativeRoutes?: string | number | boolean | string[];
    overrideMultiModalScenario?: string | number | boolean | string[];
    combineTransferLegs?: string | number | boolean | string[];
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export interface JourneyMetaArgs {
    keepTflTypes?: boolean;
    signal?: AbortSignal;
}

export const createJourneyRaw = (http: TflHttpClient) => ({
    /**
     * Perform a Journey Planner search from the parameters specified in simple types
     * @operationId Journey_JourneyResults
     * @deprecated false
     */
    journeyResults: async (args: JourneyJourneyResultsArgs): Promise<TflApiPresentationEntitiesJourneyPlannerItineraryResult> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};
    if (args.via !== undefined) query["via"] = args.via;
    if (args.nationalSearch !== undefined) query["nationalSearch"] = args.nationalSearch;
    if (args.date !== undefined) query["date"] = args.date;
    if (args.time !== undefined) query["time"] = args.time;
    if (args.timeIs !== undefined) query["timeIs"] = args.timeIs;
    if (args.journeyPreference !== undefined) query["journeyPreference"] = args.journeyPreference;
    if (args.mode !== undefined) query["mode"] = args.mode;
    if (args.accessibilityPreference !== undefined) query["accessibilityPreference"] = args.accessibilityPreference;
    if (args.fromName !== undefined) query["fromName"] = args.fromName;
    if (args.toName !== undefined) query["toName"] = args.toName;
    if (args.viaName !== undefined) query["viaName"] = args.viaName;
    if (args.maxTransferMinutes !== undefined) query["maxTransferMinutes"] = args.maxTransferMinutes;
    if (args.maxWalkingMinutes !== undefined) query["maxWalkingMinutes"] = args.maxWalkingMinutes;
    if (args.walkingSpeed !== undefined) query["walkingSpeed"] = args.walkingSpeed;
    if (args.cyclePreference !== undefined) query["cyclePreference"] = args.cyclePreference;
    if (args.adjustment !== undefined) query["adjustment"] = args.adjustment;
    if (args.bikeProficiency !== undefined) query["bikeProficiency"] = args.bikeProficiency;
    if (args.alternativeCycle !== undefined) query["alternativeCycle"] = args.alternativeCycle;
    if (args.alternativeWalking !== undefined) query["alternativeWalking"] = args.alternativeWalking;
    if (args.applyHtmlMarkup !== undefined) query["applyHtmlMarkup"] = args.applyHtmlMarkup;
    if (args.useMultiModalCall !== undefined) query["useMultiModalCall"] = args.useMultiModalCall;
    if (args.walkingOptimization !== undefined) query["walkingOptimization"] = args.walkingOptimization;
    if (args.taxiOnlyTrip !== undefined) query["taxiOnlyTrip"] = args.taxiOnlyTrip;
    if (args.routeBetweenEntrances !== undefined) query["routeBetweenEntrances"] = args.routeBetweenEntrances;
    if (args.useRealTimeLiveArrivals !== undefined) query["useRealTimeLiveArrivals"] = args.useRealTimeLiveArrivals;
    if (args.calcOneDirection !== undefined) query["calcOneDirection"] = args.calcOneDirection;
    if (args.includeAlternativeRoutes !== undefined) query["includeAlternativeRoutes"] = args.includeAlternativeRoutes;
    if (args.overrideMultiModalScenario !== undefined) query["overrideMultiModalScenario"] = args.overrideMultiModalScenario;
    if (args.combineTransferLegs !== undefined) query["combineTransferLegs"] = args.combineTransferLegs;
    return http.request<TflApiPresentationEntitiesJourneyPlannerItineraryResult>({
      method: 'GET',
      path: `/Journey/JourneyResults/${formatPathParam(args.from)}/to/${formatPathParam(args.to)}`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },

    /**
     * Gets a list of all of the available journey planner modes
     * @operationId Journey_Meta
     * @deprecated false
     */
    meta: async (args: JourneyMetaArgs = {}): Promise<TflApiPresentationEntitiesMode[]> => {
    const query: Record<string, string | number | boolean | string[] | undefined> = {};

    return http.request<TflApiPresentationEntitiesMode[]>({
      method: 'GET',
      path: `/Journey/Meta/Modes`,
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });
    },
});
