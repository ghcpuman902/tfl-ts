import type {
  TflApiPresentationEntitiesDisruptedRoute,
  TflApiPresentationEntitiesDisruption,
  TflApiPresentationEntitiesLine,
  TflApiPresentationEntitiesLineStatus,
  TflApiPresentationEntitiesStopPoint,
} from '../generated/types';

/** A period when a status applies. Dates are ISO 8601 strings from TfL. */
export interface StatusValidityPeriod {
  from?: string;
  to?: string;
  /** TfL marks live operational statuses as current. */
  isNow: boolean;
}

/** A compact stop reference used by detailed disruption responses. */
export interface AffectedStop {
  id?: string;
  naptanId?: string;
  stationNaptanId?: string;
  name?: string;
  platformName?: string;
  stopLetter?: string;
  modes: string[];
  latitude?: number;
  longitude?: number;
}

/** A stop in its TfL-supplied order along an affected route section. */
export interface AffectedRouteStop extends AffectedStop {
  ordinal?: number;
}

/** A route or route section affected by a disruption. */
export interface AffectedRoute {
  id?: string;
  lineId?: string;
  routeCode?: string;
  name?: string;
  direction?: string;
  originName?: string;
  destinationName?: string;
  isEntireRouteSection: boolean;
  validFrom?: string;
  validTo?: string;
  lineString?: string;
  stops: AffectedRouteStop[];
}

/** Detailed disruption information without TfL's generated type names. */
export interface DetailedDisruption {
  category?: string;
  type?: string;
  categoryDescription?: string;
  description?: string;
  summary?: string;
  additionalInfo?: string;
  created?: string;
  lastUpdated?: string;
  closureType?: string;
  affectedRoutes: AffectedRoute[];
  affectedStops: AffectedStop[];
}

/** One service status attached to a line. */
export interface DetailedLineStatus {
  id?: number;
  lineId?: string;
  severity?: number;
  severityDescription?: string;
  reason?: string;
  created?: string;
  modified?: string;
  validityPeriods: StatusValidityPeriod[];
  disruption?: DetailedDisruption;
}

/** A line and its detailed service statuses. */
export interface DetailedLine {
  id?: string;
  name?: string;
  modeName?: string;
  created?: string;
  modified?: string;
  statuses: DetailedLineStatus[];
  disruptions: DetailedDisruption[];
}

const mapStop = (stop: TflApiPresentationEntitiesStopPoint): AffectedStop => ({
  id: stop.id,
  naptanId: stop.naptanId,
  stationNaptanId: stop.stationNaptan,
  name: stop.commonName ?? stop.fullName,
  platformName: stop.platformName,
  stopLetter: stop.stopLetter,
  modes: stop.modes ?? [],
  latitude: stop.lat,
  longitude: stop.lon,
});

const mapRoute = (route: TflApiPresentationEntitiesDisruptedRoute): AffectedRoute => ({
  id: route.id,
  lineId: route.lineId,
  routeCode: route.routeCode,
  name: route.name,
  direction: route.direction,
  originName: route.originationName,
  destinationName: route.destinationName,
  isEntireRouteSection: route.isEntireRouteSection ?? false,
  validFrom: route.validFrom,
  validTo: route.validTo,
  lineString: route.lineString,
  stops: (route.routeSectionNaptanEntrySequence ?? []).map((entry) => ({
    ...mapStop(entry.stopPoint ?? {}),
    ordinal: entry.ordinal,
  })),
});

const mapDisruption = (disruption: TflApiPresentationEntitiesDisruption): DetailedDisruption => ({
  category: disruption.category,
  type: disruption.type,
  categoryDescription: disruption.categoryDescription,
  description: disruption.description,
  summary: disruption.summary,
  additionalInfo: disruption.additionalInfo,
  created: disruption.created,
  lastUpdated: disruption.lastUpdate,
  closureType: disruption.closureText,
  affectedRoutes: (disruption.affectedRoutes ?? []).map(mapRoute),
  affectedStops: (disruption.affectedStops ?? []).map(mapStop),
});

const mapStatus = (status: TflApiPresentationEntitiesLineStatus): DetailedLineStatus => ({
  id: status.id,
  lineId: status.lineId,
  severity: status.statusSeverity,
  severityDescription: status.statusSeverityDescription,
  reason: status.reason,
  created: status.created,
  modified: status.modified,
  validityPeriods: (status.validityPeriods ?? []).map((period) => ({
    from: period.fromDate,
    to: period.toDate,
    isNow: period.isNow ?? false,
  })),
  disruption: status.disruption ? mapDisruption(status.disruption) : undefined,
});

/** Convert detailed TfL line responses into the stable friendly model. */
export const mapDetailedLines = (lines: TflApiPresentationEntitiesLine[]): DetailedLine[] =>
  lines.map((line) => ({
    id: line.id,
    name: line.name,
    modeName: line.modeName,
    created: line.created,
    modified: line.modified,
    statuses: (line.lineStatuses ?? []).map(mapStatus),
    disruptions: (line.disruptions ?? []).map(mapDisruption),
  }));
