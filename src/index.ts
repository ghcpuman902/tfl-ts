export { default, TflClient } from './client';
export type { TflClientConfig } from './client';

export {
  LINE_IDS,
  MODES,
  SERVICE_TYPES,
  DIRECTIONS,
  severityByMode,
  severityDescriptions,
} from './meta';
export type {
  ModeName,
  ServiceType,
  DisruptionCategory,
  TflLineId,
  TflMode,
  TflServiceType,
  TflDirection,
} from './meta';
export type {
  AutocompleteString,
  ModeInput,
  ServiceTypeInput,
  LineIdInput,
  NamedLineId,
} from './utils/autocomplete';
export { mapDetailedLines } from './utils/detailedStatus';
export type {
  AffectedRoute,
  AffectedRouteStop,
  AffectedStop,
  DetailedDisruption,
  DetailedLine,
  DetailedLineStatus,
  StatusValidityPeriod,
} from './utils/detailedStatus';
export {
  normalizeArrival,
  normalizeArrivals,
  normalizeArrivalDeparture,
  parseArrivalPlatform,
  resolveArrivalDestination,
} from './utils/arrivals';
export { normalizeStopPoint, normalizeStopPoints, parseCompassPoint } from './utils/stopPoint';
export type {
  NormalizedStopPoint,
  NormalizedStopPointFields,
  StopPointLike,
} from './utils/stopPoint';
export { parseAdditionalPropertyValue } from './utils/additionalProperties';
export type {
  AdditionalPropertyPrecision,
  ParsedAdditionalPropertyValue,
} from './utils/additionalProperties';
export {
  busSearchNameMatches,
  isBoardableBusStopId,
  isSmsCodeQuery,
  parseBusStopSearchQuery,
  pickNamedExpandableMatches,
  preferStopsMatchingSearch,
  rankStopsBySearchLetter,
  resolveBusNameSearchHits,
} from './utils/busStopSearch';
export type { BoardableBusStop, SearchBusStopsOptions } from './utils/busStopSearch';
export type {
  ArrivalCompassBound,
  NormalizedArrival,
  NormalizedArrivalDeparture,
  NormalizedArrivalDestination,
  NormalizedArrivalPlatform,
} from './utils/arrivals';
export {
  getSharedTrackSegments,
  resolveSharedTrackIdentity,
  withSharedTrackIdentity,
} from './utils/sharedTrackIdentity';
export type {
  PredictionWithSharedTrackIdentity,
  SharedTrackConfidence,
  SharedTrackIdentity,
  SharedTrackSegments,
  SharedTrackVehicleIdentity,
} from './utils/sharedTrackIdentity';
export { resolveArrivalsStopId, resolveArrivalsStopIds } from './meta';
export type { DetailedLineStatusQuery, LineStatusQuery } from './line';
export {
  LINE_STATION_SEQUENCES,
  STATION_SEQUENCES_GENERATED_AT,
} from './meta';
export type { StaticLineId, StaticLineStationSequence } from './meta';
export {
  STATION_HUBS,
  STATION_HUB_LIST,
  STATION_HUBS_GENERATED_AT,
} from './meta';
export type { StationHubInfo, StationHubMember } from './meta';
export {
  TflError,
  TflHttpError,
  TflNetworkError,
  TflValidationError,
  TflTimeoutError,
  TflConfigError,
  TflErrorHandler,
} from './errors';
export type { TflApiErrorBody } from './errors';
export { RawClient } from './generated/raw';
export { ENDPOINTS, ENDPOINT_COUNT } from './generated/endpoints';
export type { EndpointDefinition } from './generated/endpoints';
export { Realtime, pollArrivals, pollLineArrivals, pollVehicleArrivals } from './realtime';
export type {
  PollMeta,
  PollArrivalsOptions,
  PollLineArrivalsOptions,
  PollVehicleArrivalsOptions,
  PollArrivalsUnsubscribe,
  OnArrivals,
  OnPollError,
  ArrivalSortBy,
  ArrivalSortOrder,
  Prediction as RealtimePrediction,
} from './realtime';
export {
  getLineColor,
  getLineCssProps,
  getLineInlineStyles,
  getLineDarkReadableStyles,
  hardOutlineTextShadow,
  hardOutlineBoxShadow,
  normalizeLineId,
  getSeverityCategory,
  getSeverityClasses,
  getAccessibleSeverityLabel,
  sortLinesBySeverityAndOrder,
  getLineStatusSummary,
  getStatusKind,
  getWorstCurrentStatus,
  getCurrentLineStatuses,
  isNormalService,
  isScheduledClosure,
  hasNightService,
  getLineAriaLabel,
  getLineDisplayName,
  LINE_COLORS,
  LINE_DARK_TEXT_STROKE_WIDTH_PX,
  SEVERITY_MAPPING,
  LINE_ORDER,
  STATUS_KIND_ORDER,
} from './ui';
export type {
  LineDarkContrastMode,
  LineDarkContrastOptions,
  LineDarkReadableStyles,
  StatusKind,
  LineStatusLike,
  CurrentStatusOptions,
} from './ui';
export {
  getPropertyValue,
  findElectricBikes,
  sortByDistance,
  findClosestWithBikes,
} from './utils/bikePoint';
