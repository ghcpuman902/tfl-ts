/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TflApiPresentationEntitiesAccidentStatsAccidentDetail {
  /** @format int32 */
  id?: number;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
  location?: string;
  /** @format date-time */
  date?: string;
  severity?: string;
  borough?: string;
  casualties?: TflApiPresentationEntitiesAccidentStatsCasualty[];
  vehicles?: TflApiPresentationEntitiesAccidentStatsVehicle[];
}

export interface TflApiPresentationEntitiesAccidentStatsCasualty {
  /** @format int32 */
  age?: number;
  class?: string;
  severity?: string;
  mode?: string;
  ageBand?: string;
}

export interface TflApiPresentationEntitiesAccidentStatsVehicle {
  type?: string;
}

export interface TflApiPresentationEntitiesAccidentStatsAccidentStatsOrderedSummary {
  /** @format int32 */
  year?: number;
  borough?: string;
  /** @format int32 */
  accidents?: number;
}

export type SystemObject = object;

export interface TflApiPresentationEntitiesPlace {
  /** A unique identifier. */
  id?: string;
  /** The unique location of this resource. */
  url?: string;
  /** A human readable name. */
  commonName?: string;
  /**
   * The distance of the place from its search point, if this is the result
   *             of a geographical search, otherwise zero.
   * @format double
   */
  distance?: number;
  /** The type of Place. See /Place/Meta/placeTypes for possible values. */
  placeType?: string;
  /** A bag of additional key/value pairs with extra information about this place. */
  additionalProperties?: TflApiPresentationEntitiesAdditionalProperties[];
  children?: TflApiPresentationEntitiesPlace[];
  childrenUrls?: string[];
  /**
   * WGS84 latitude of the location.
   * @format double
   */
  lat?: number;
  /**
   * WGS84 longitude of the location.
   * @format double
   */
  lon?: number;
}

export interface TflApiPresentationEntitiesAdditionalProperties {
  category?: string;
  key?: string;
  sourceSystemKey?: string;
  value?: string;
  /** @format date-time */
  modified?: string;
}

export interface TflApiPresentationEntitiesCycleSuperhighway {
  /** The Id */
  id?: string;
  /** The long label to show on maps when zoomed in */
  label?: string;
  /** The short label to show on maps */
  labelShort?: string;
  /** A LineString or MultiLineString that forms the route of the highway */
  geography?: SystemDataSpatialDbGeography;
  /** True if the route is split into segments */
  segmented?: boolean;
  /**
   * When the data was last updated
   * @format date-time
   */
  modified?: string;
  /** Cycle route status i.e Proposed, Existing etc */
  status?: TflApiPresentationEntitiesCycleSuperhighwayStatusEnum;
  /** Type of cycle route e.g CycleSuperhighways, Quietways, MiniHollands etc */
  routeType?: TflApiPresentationEntitiesCycleSuperhighwayRouteTypeEnum;
}

export interface SystemDataSpatialDbGeography {
  geography?: SystemDataSpatialDbGeographyWellKnownValue;
}

export interface SystemDataSpatialDbGeographyWellKnownValue {
  /** @format int32 */
  coordinateSystemId?: number;
  wellKnownText?: string;
  /** @format byte */
  wellKnownBinary?: string;
}

export interface TflApiPresentationEntitiesFaresFare {
  /** @format int32 */
  id?: number;
  passengerType?: string;
  /** @format date-time */
  validFrom?: string;
  /** @format date-time */
  validUntil?: string;
  ticketTime?: string;
  ticketType?: string;
  cost?: string;
  /** @format double */
  cap?: number;
  description?: string;
  zone?: string;
  mode?: string;
}

export interface TflApiPresentationEntitiesFaresFaresSection {
  header?: string;
  /** @format int32 */
  index?: number;
  journey?: TflApiPresentationEntitiesFaresJourney;
  rows?: TflApiPresentationEntitiesFaresFareDetails[];
  messages?: TflApiPresentationEntitiesMessage[];
}

export interface TflApiPresentationEntitiesFaresJourney {
  fromStation?: TflApiPresentationEntitiesFaresFareStation;
  toStation?: TflApiPresentationEntitiesFaresFareStation;
}

export interface TflApiPresentationEntitiesFaresFareDetails {
  /** @format int32 */
  boundsId?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  mode?: string;
  passengerType?: string;
  contactlessPAYGOnlyFare?: boolean;
  from?: string;
  to?: string;
  fromStation?: string;
  toStation?: string;
  via?: string;
  routeCode?: string;
  displayName?: string;
  /** @format int32 */
  displayOrder?: number;
  routeDescription?: string;
  validatorInformation?: string;
  operator?: string;
  specialFare?: boolean;
  throughFare?: boolean;
  isTour?: boolean;
  ticketsAvailable?: TflApiPresentationEntitiesFaresTicket[];
  messages?: TflApiPresentationEntitiesMessage[];
}

export interface TflApiPresentationEntitiesMessage {
  /** @format int32 */
  bulletOrder?: number;
  header?: boolean;
  messageText?: string;
  linkText?: string;
  url?: string;
}

export interface TflApiPresentationEntitiesFaresFareStation {
  atcoCode?: string;
  commonName?: string;
  fareCategory?: TflApiPresentationEntitiesFaresFareStationFareCategoryEnum;
}

export interface TflApiPresentationEntitiesFaresTicket {
  passengerType?: string;
  ticketType?: TflApiPresentationEntitiesFaresTicketType;
  ticketTime?: TflApiPresentationEntitiesFaresTicketTime;
  cost?: string;
  description?: string;
  mode?: string;
  /** @format int32 */
  displayOrder?: number;
  messages?: TflApiPresentationEntitiesMessage[];
}

export interface TflApiPresentationEntitiesFaresTicketType {
  type?: string;
  description?: string;
}

export interface TflApiPresentationEntitiesFaresTicketTime {
  type?: string;
  description?: string;
}

export interface TflApiPresentationEntitiesFaresFareBounds {
  /** @format int32 */
  id?: number;
  from?: string;
  to?: string;
  via?: string;
  routeCode?: string;
  description?: string;
  displayName?: string;
  operator?: string;
  /** @format int32 */
  displayOrder?: number;
  isPopularFare?: boolean;
  isPopularTravelCard?: boolean;
  isTour?: boolean;
  messages?: TflApiPresentationEntitiesMessage[];
}

export interface TflApiPresentationEntitiesFaresFaresPeriod {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  viewableDate?: string;
  /** @format date-time */
  endDate?: string;
  isFuture?: boolean;
}

export interface TflApiPresentationEntitiesFaresFaresMode {
  /** @format int32 */
  id?: number;
  name?: string;
  description?: string;
}

export interface TflApiPresentationEntitiesFaresPassengerType {
  type?: string;
  description?: string;
  displayName?: string;
  /** @format int32 */
  displayOrder?: number;
}

export interface TflApiPresentationEntitiesCoordinate {
  /** @format double */
  longitude?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  easting?: number;
  /** @format double */
  northing?: number;
  /** @format int32 */
  xCoord?: number;
  /** @format int32 */
  yCoord?: number;
}

export interface TflApiPresentationEntitiesGeoCodeSearchMatch {
  /** The type of the place e.g. "street_address" */
  types?: string[];
  /** A string describing the formatted address of the place. Adds additional context to the place's Name. */
  address?: string;
  id?: string;
  url?: string;
  name?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
}

export interface TflApiPresentationEntitiesMode {
  isTflService?: boolean;
  isFarePaying?: boolean;
  isScheduledService?: boolean;
  modeName?: string;
  motType?: string;
  network?: string;
}

/** A DTO representing a list of possible journeys. */
export interface TflApiPresentationEntitiesJourneyPlannerItineraryResult {
  journeys?: TflApiPresentationEntitiesJourneyPlannerJourney[];
  lines?: TflApiPresentationEntitiesLine[];
  cycleHireDockingStationData?: TflApiPresentationEntitiesJourneyPlannerJourneyPlannerCycleHireDockingStationData;
  stopMessages?: string[];
  /** @format int32 */
  recommendedMaxAgeMinutes?: number;
  searchCriteria?: TflApiPresentationEntitiesJourneyPlannerSearchCriteria;
  journeyVector?: TflApiPresentationEntitiesJourneyPlannerJourneyVector;
}

/** Object that represents an end to end journey (see schematic). */
export interface TflApiPresentationEntitiesJourneyPlannerJourney {
  /** @format date-time */
  startDateTime?: string;
  /** @format int32 */
  duration?: number;
  /** @format date-time */
  arrivalDateTime?: string;
  description?: string;
  alternativeRoute?: boolean;
  legs?: TflApiPresentationEntitiesJourneyPlannerLeg[];
  fare?: TflApiPresentationEntitiesJourneyPlannerJourneyFare;
}

export interface TflApiPresentationEntitiesLine {
  id?: string;
  name?: string;
  modeName?: string;
  disruptions?: TflApiPresentationEntitiesDisruption[];
  /** @format date-time */
  created?: string;
  /** @format date-time */
  modified?: string;
  lineStatuses?: TflApiPresentationEntitiesLineStatus[];
  routeSections?: TflApiPresentationEntitiesMatchedRoute[];
  serviceTypes?: TflApiPresentationEntitiesLineServiceTypeInfo[];
  crowding?: TflApiPresentationEntitiesCrowding;
}

export interface TflApiPresentationEntitiesJourneyPlannerJourneyPlannerCycleHireDockingStationData {
  /** @format int32 */
  originNumberOfBikes?: number;
  /** @format int32 */
  destinationNumberOfBikes?: number;
  /** @format int32 */
  originNumberOfEmptySlots?: number;
  /** @format int32 */
  destinationNumberOfEmptySlots?: number;
  originId?: string;
  destinationId?: string;
}

export interface TflApiPresentationEntitiesJourneyPlannerSearchCriteria {
  /** @format date-time */
  dateTime?: string;
  dateTimeType?: TflApiPresentationEntitiesJourneyPlannerSearchCriteriaDateTimeTypeEnum;
  timeAdjustments?: TflApiPresentationEntitiesJourneyPlannerTimeAdjustments;
}

export interface TflApiPresentationEntitiesJourneyPlannerJourneyVector {
  from?: string;
  to?: string;
  via?: string;
  uri?: string;
}

export interface TflApiPresentationEntitiesJourneyPlannerLeg {
  /** @format int32 */
  duration?: number;
  speed?: string;
  /**
   * Describes the action the user need to take for this section, E.g. "walk to the
   *             district line"
   */
  instruction?: TflApiPresentationEntitiesInstruction;
  obstacles?: TflApiPresentationEntitiesJourneyPlannerObstacle[];
  /** @format date-time */
  departureTime?: string;
  /** @format date-time */
  arrivalTime?: string;
  /** Represents a point located at a latitude and longitude using the WGS84 co-ordinate system. */
  departurePoint?: TflApiPresentationEntitiesPoint;
  /** Represents a point located at a latitude and longitude using the WGS84 co-ordinate system. */
  arrivalPoint?: TflApiPresentationEntitiesPoint;
  path?: TflApiPresentationEntitiesJourneyPlannerPath;
  routeOptions?: TflApiPresentationEntitiesJourneyPlannerRouteOption[];
  mode?: TflApiPresentationEntitiesIdentifier;
  disruptions?: TflApiPresentationEntitiesDisruption[];
  plannedWorks?: TflApiPresentationEntitiesJourneyPlannerPlannedWork[];
  /** @format double */
  distance?: number;
  isDisrupted?: boolean;
  hasFixedLocations?: boolean;
  /** @format date-time */
  scheduledDepartureTime?: string;
  /** @format date-time */
  scheduledArrivalTime?: string;
  interChangeDuration?: string;
  interChangePosition?: string;
}

export interface TflApiPresentationEntitiesJourneyPlannerJourneyFare {
  /** @format int32 */
  totalCost?: number;
  fares?: TflApiPresentationEntitiesJourneyPlannerFare[];
  caveats?: TflApiPresentationEntitiesJourneyPlannerFareCaveat[];
}

/** Represents a disruption to a route within the transport network. */
export interface TflApiPresentationEntitiesDisruption {
  /** Gets or sets the category of this dispruption. */
  category?: TflApiPresentationEntitiesDisruptionCategoryEnum;
  /** Gets or sets the disruption type of this dispruption. */
  type?: string;
  /** Gets or sets the description of the category. */
  categoryDescription?: string;
  /** Gets or sets the description of this disruption. */
  description?: string;
  /** Gets or sets the summary of this disruption. */
  summary?: string;
  /** Gets or sets the additionaInfo of this disruption. */
  additionalInfo?: string;
  /**
   * Gets or sets the date/time when this disruption was created.
   * @format date-time
   */
  created?: string;
  /**
   * Gets or sets the date/time when this disruption was last updated.
   * @format date-time
   */
  lastUpdate?: string;
  /** Gets or sets the routes affected by this disruption */
  affectedRoutes?: TflApiPresentationEntitiesDisruptedRoute[];
  /** Gets or sets the stops affected by this disruption */
  affectedStops?: TflApiPresentationEntitiesStopPoint[];
  /** Text describing the closure type */
  closureText?: string;
}

export interface TflApiPresentationEntitiesLineStatus {
  /** @format int32 */
  id?: number;
  lineId?: string;
  /** @format int32 */
  statusSeverity?: number;
  statusSeverityDescription?: string;
  reason?: string;
  /** @format date-time */
  created?: string;
  /** @format date-time */
  modified?: string;
  validityPeriods?: TflApiPresentationEntitiesValidityPeriod[];
  /** Represents a disruption to a route within the transport network. */
  disruption?: TflApiPresentationEntitiesDisruption;
}

/** Description of a Route used in Route search results. */
export interface TflApiPresentationEntitiesMatchedRoute {
  /** The route code */
  routeCode?: string;
  /** Name such as "72" */
  name?: string;
  /** Inbound or Outbound */
  direction?: string;
  /** The name of the Origin StopPoint */
  originationName?: string;
  /** The name of the Destination StopPoint */
  destinationName?: string;
  /** The Id (NaPTAN code) of the Origin StopPoint */
  originator?: string;
  /** The Id (NaPTAN code) or the Destination StopPoint */
  destination?: string;
  /** Regular or Night */
  serviceType?: string;
  /**
   * The DateTime that the Service containing this Route is valid until.
   * @format date-time
   */
  validTo?: string;
  /**
   * The DateTime that the Service containing this Route is valid from.
   * @format date-time
   */
  validFrom?: string;
}

export interface TflApiPresentationEntitiesLineServiceTypeInfo {
  name?: string;
  uri?: string;
}

export interface TflApiPresentationEntitiesCrowding {
  /** Busiest times at a station (static information) */
  passengerFlows?: TflApiPresentationEntitiesPassengerFlow[];
  /** Train Loading on a scale 1-6, 1 being "Very quiet" and 6 being "Exceptionally busy" (static information) */
  trainLoadings?: TflApiPresentationEntitiesTrainLoading[];
}

export interface TflApiPresentationEntitiesJourneyPlannerTimeAdjustments {
  earliest?: TflApiPresentationEntitiesJourneyPlannerTimeAdjustment;
  earlier?: TflApiPresentationEntitiesJourneyPlannerTimeAdjustment;
  later?: TflApiPresentationEntitiesJourneyPlannerTimeAdjustment;
  latest?: TflApiPresentationEntitiesJourneyPlannerTimeAdjustment;
}

export interface TflApiPresentationEntitiesInstruction {
  summary?: string;
  detailed?: string;
  steps?: TflApiPresentationEntitiesInstructionStep[];
}

export interface TflApiPresentationEntitiesJourneyPlannerObstacle {
  type?: string;
  incline?: string;
  /** @format int32 */
  stopId?: number;
  position?: string;
}

/** Represents a point located at a latitude and longitude using the WGS84 co-ordinate system. */
export interface TflApiPresentationEntitiesPoint {
  /**
   * WGS84 latitude of the location.
   * @format double
   */
  lat?: number;
  /**
   * WGS84 longitude of the location.
   * @format double
   */
  lon?: number;
}

export interface TflApiPresentationEntitiesJourneyPlannerPath {
  lineString?: string;
  stopPoints?: TflApiPresentationEntitiesIdentifier[];
  elevation?: TflApiCommonJourneyPlannerJpElevation[];
}

export interface TflApiPresentationEntitiesJourneyPlannerRouteOption {
  /** The Id of the route */
  id?: string;
  /** Name such as "72" */
  name?: string;
  directions?: string[];
  /** The line identifier (e.g. District Line), from where you can obtain line status information e.g. the rainbow board status "good service". */
  lineIdentifier?: TflApiPresentationEntitiesIdentifier;
  /** The direction of the route, i.e. outbound or inbound. */
  direction?: string;
}

export interface TflApiPresentationEntitiesIdentifier {
  id?: string;
  name?: string;
  uri?: string;
  fullName?: string;
  type?: string;
  crowding?: TflApiPresentationEntitiesCrowding;
  routeType?: TflApiPresentationEntitiesIdentifierRouteTypeEnum;
  status?: TflApiPresentationEntitiesIdentifierStatusEnum;
  motType?: string;
  network?: string;
}

export interface TflApiPresentationEntitiesJourneyPlannerPlannedWork {
  id?: string;
  description?: string;
  /** @format date-time */
  createdDateTime?: string;
  /** @format date-time */
  lastUpdateDateTime?: string;
}

export interface TflApiPresentationEntitiesJourneyPlannerFare {
  /** @format int32 */
  lowZone?: number;
  /** @format int32 */
  highZone?: number;
  /** @format int32 */
  cost?: number;
  chargeProfileName?: string;
  isHopperFare?: boolean;
  chargeLevel?: string;
  /** @format int32 */
  peak?: number;
  /** @format int32 */
  offPeak?: number;
  taps?: TflApiPresentationEntitiesJourneyPlannerFareTap[];
}

export interface TflApiPresentationEntitiesJourneyPlannerFareCaveat {
  text?: string;
  type?: string;
}

/** keep old RouteSection name so as not to break contract */
export interface TflApiPresentationEntitiesDisruptedRoute {
  /** The Id of the route */
  id?: string;
  /** The Id of the Line */
  lineId?: string;
  /** The route code */
  routeCode?: string;
  /** Name such as "72" */
  name?: string;
  /** The co-ordinates of the route's path as a geoJSON lineString */
  lineString?: string;
  /** Inbound or Outbound */
  direction?: string;
  /** The name of the Origin StopPoint */
  originationName?: string;
  /** The name of the Destination StopPoint */
  destinationName?: string;
  /** (where applicable) via Charing Cross / Bank / King's Cross / Embankment / Newbury Park / Woodford */
  via?: TflApiPresentationEntitiesRouteSectionNaptanEntrySequence;
  /** Whether this represents the entire route section */
  isEntireRouteSection?: boolean;
  /**
   * The DateTime that the Service containing this Route is valid until.
   * @format date-time
   */
  validTo?: string;
  /**
   * The DateTime that the Service containing this Route is valid from.
   * @format date-time
   */
  validFrom?: string;
  routeSectionNaptanEntrySequence?: TflApiPresentationEntitiesRouteSectionNaptanEntrySequence[];
}

export interface TflApiPresentationEntitiesStopPoint {
  naptanId?: string;
  platformName?: string;
  /** The indicator of the stop point e.g. "Stop K" */
  indicator?: string;
  /** The stop letter, if it could be cleansed from the Indicator e.g. "K" */
  stopLetter?: string;
  modes?: string[];
  icsCode?: string;
  smsCode?: string;
  stopType?: string;
  stationNaptan?: string;
  accessibilitySummary?: string;
  hubNaptanCode?: string;
  lines?: TflApiPresentationEntitiesIdentifier[];
  lineGroup?: TflApiPresentationEntitiesLineGroup[];
  lineModeGroups?: TflApiPresentationEntitiesLineModeGroup[];
  fullName?: string;
  naptanMode?: string;
  status?: boolean;
  individualStopId?: string;
  /** A unique identifier. */
  id?: string;
  /** The unique location of this resource. */
  url?: string;
  /** A human readable name. */
  commonName?: string;
  /**
   * The distance of the place from its search point, if this is the result
   *             of a geographical search, otherwise zero.
   * @format double
   */
  distance?: number;
  /** The type of Place. See /Place/Meta/placeTypes for possible values. */
  placeType?: string;
  /** A bag of additional key/value pairs with extra information about this place. */
  additionalProperties?: TflApiPresentationEntitiesAdditionalProperties[];
  children?: TflApiPresentationEntitiesPlace[];
  childrenUrls?: string[];
  /**
   * WGS84 latitude of the location.
   * @format double
   */
  lat?: number;
  /**
   * WGS84 longitude of the location.
   * @format double
   */
  lon?: number;
}

/** Represents a period for which a planned works is valid. */
export interface TflApiPresentationEntitiesValidityPeriod {
  /**
   * Gets or sets the start date.
   * @format date-time
   */
  fromDate?: string;
  /**
   * Gets or sets the end date.
   * @format date-time
   */
  toDate?: string;
  /** If true is a realtime status rather than planned or info */
  isNow?: boolean;
}

export interface TflApiPresentationEntitiesPassengerFlow {
  /** Time in 24hr format with 15 minute intervals e.g. 0500-0515, 0515-0530 etc. */
  timeSlice?: string;
  /**
   * Count of passenger flow towards a platform
   * @format int32
   */
  value?: number;
}

export interface TflApiPresentationEntitiesTrainLoading {
  /** The Line Name e.g. "Victoria" */
  line?: string;
  /** Direction of the Line e.g. NB, SB, WB etc. */
  lineDirection?: string;
  /** Direction displayed on the platform e.g. NB, SB, WB etc. */
  platformDirection?: string;
  /** Direction in regards to Journey Planner i.e. inbound or outbound */
  direction?: string;
  /** Naptan of the adjacent station */
  naptanTo?: string;
  /** Time in 24hr format with 15 minute intervals e.g. 0500-0515, 0515-0530 etc. */
  timeSlice?: string;
  /**
   * Scale between 1-6,
   *              1 = Very quiet, 2 = Quiet, 3 = Fairly busy, 4 = Busy, 5 = Very busy, 6 = Exceptionally busy
   * @format int32
   */
  value?: number;
}

export interface TflApiPresentationEntitiesJourneyPlannerTimeAdjustment {
  date?: string;
  time?: string;
  timeIs?: string;
  uri?: string;
}

export interface TflApiPresentationEntitiesInstructionStep {
  description?: string;
  turnDirection?: string;
  streetName?: string;
  /** @format int32 */
  distance?: number;
  /** @format int32 */
  cumulativeDistance?: number;
  /** @format int32 */
  skyDirection?: number;
  skyDirectionDescription?: TflApiPresentationEntitiesInstructionStepSkyDirectionDescriptionEnum;
  /** @format int32 */
  cumulativeTravelTime?: number;
  /** @format double */
  latitude?: number;
  /** @format double */
  longitude?: number;
  pathAttribute?: TflApiPresentationEntitiesPathAttribute;
  descriptionHeading?: string;
  trackType?: TflApiPresentationEntitiesInstructionStepTrackTypeEnum;
}

export interface TflApiCommonJourneyPlannerJpElevation {
  /** @format int32 */
  distance?: number;
  /** @format double */
  startLat?: number;
  /** @format double */
  startLon?: number;
  /** @format double */
  endLat?: number;
  /** @format double */
  endLon?: number;
  /** @format int32 */
  heightFromPreviousPoint?: number;
  /** @format double */
  gradient?: number;
}

export interface TflApiPresentationEntitiesJourneyPlannerFareTap {
  atcoCode?: string;
  tapDetails?: TflApiPresentationEntitiesJourneyPlannerFareTapDetails;
}

export interface TflApiPresentationEntitiesRouteSectionNaptanEntrySequence {
  /** @format int32 */
  ordinal?: number;
  stopPoint?: TflApiPresentationEntitiesStopPoint;
}

export interface TflApiPresentationEntitiesLineGroup {
  naptanIdReference?: string;
  stationAtcoCode?: string;
  lineIdentifier?: string[];
}

export interface TflApiPresentationEntitiesLineModeGroup {
  modeName?: string;
  lineIdentifier?: string[];
}

export interface TflApiPresentationEntitiesPathAttribute {
  name?: string;
  value?: string;
}

export interface TflApiPresentationEntitiesJourneyPlannerFareTapDetails {
  modeType?: string;
  validationType?: string;
  hostDeviceType?: string;
  busRouteId?: string;
  /** @format int32 */
  nationalLocationCode?: number;
  /** @format date-time */
  tapTimestamp?: string;
}

export interface TflApiPresentationEntitiesStatusSeverity {
  modeName?: string;
  /** @format int32 */
  severityLevel?: number;
  description?: string;
}

export interface TflApiPresentationEntitiesRouteSequence {
  lineId?: string;
  lineName?: string;
  direction?: string;
  isOutboundOnly?: boolean;
  mode?: string;
  lineStrings?: string[];
  stations?: TflApiPresentationEntitiesMatchedStop[];
  stopPointSequences?: TflApiPresentationEntitiesStopPointSequence[];
  orderedLineRoutes?: TflApiPresentationEntitiesOrderedRoute[];
}

export interface TflApiPresentationEntitiesMatchedStop {
  /** @format int32 */
  routeId?: number;
  parentId?: string;
  stationId?: string;
  icsId?: string;
  topMostParentId?: string;
  direction?: string;
  towards?: string;
  modes?: string[];
  stopType?: string;
  stopLetter?: string;
  zone?: string;
  accessibilitySummary?: string;
  hasDisruption?: boolean;
  lines?: TflApiPresentationEntitiesIdentifier[];
  status?: boolean;
  id?: string;
  url?: string;
  name?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
}

export interface TflApiPresentationEntitiesStopPointSequence {
  lineId?: string;
  lineName?: string;
  direction?: string;
  /**
   * The id of this branch.
   * @format int32
   */
  branchId?: number;
  /**
   * The ids of the next branch(es) in the sequence. Note that the next and previous branch id can be
   *             identical in the case of a looped route e.g. the Circle line.
   */
  nextBranchIds?: number[];
  /**
   * The ids of the previous branch(es) in the sequence. Note that the next and previous branch id can be
   *             identical in the case of a looped route e.g. the Circle line.
   */
  prevBranchIds?: number[];
  stopPoint?: TflApiPresentationEntitiesMatchedStop[];
  serviceType?: TflApiPresentationEntitiesStopPointSequenceServiceTypeEnum;
}

export interface TflApiPresentationEntitiesOrderedRoute {
  name?: string;
  naptanIds?: string[];
  serviceType?: string;
}

export interface TflApiCommonDateRange {
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface TflApiPresentationEntitiesRouteSearchResponse {
  input?: string;
  searchMatches?: TflApiPresentationEntitiesRouteSearchMatch[];
}

export interface TflApiPresentationEntitiesRouteSearchMatch {
  lineId?: string;
  mode?: string;
  lineName?: string;
  lineRouteSection?: TflApiPresentationEntitiesLineRouteSection[];
  matchedRouteSections?: TflApiPresentationEntitiesMatchedRouteSections[];
  matchedStops?: TflApiPresentationEntitiesMatchedStop[];
  id?: string;
  url?: string;
  name?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
}

export interface TflApiPresentationEntitiesLineRouteSection {
  /** @format int32 */
  routeId?: number;
  direction?: string;
  destination?: string;
  fromStation?: string;
  toStation?: string;
  serviceType?: string;
  vehicleDestinationText?: string;
}

export interface TflApiPresentationEntitiesMatchedRouteSections {
  /** @format int32 */
  id?: number;
}

export interface TflApiPresentationEntitiesTimetableResponse {
  lineId?: string;
  lineName?: string;
  direction?: string;
  pdfUrl?: string;
  stations?: TflApiPresentationEntitiesMatchedStop[];
  stops?: TflApiPresentationEntitiesMatchedStop[];
  timetable?: TflApiPresentationEntitiesTimetable;
  disambiguation?: TflApiPresentationEntitiesTimetablesDisambiguation;
  statusErrorMessage?: string;
}

export interface TflApiPresentationEntitiesTimetable {
  departureStopId?: string;
  routes?: TflApiPresentationEntitiesTimetableRoute[];
}

export interface TflApiPresentationEntitiesTimetablesDisambiguation {
  disambiguationOptions?: TflApiPresentationEntitiesTimetablesDisambiguationOption[];
}

export interface TflApiPresentationEntitiesTimetableRoute {
  stationIntervals?: TflApiPresentationEntitiesStationInterval[];
  schedules?: TflApiPresentationEntitiesSchedule[];
}

export interface TflApiPresentationEntitiesTimetablesDisambiguationOption {
  description?: string;
  uri?: string;
}

export interface TflApiPresentationEntitiesStationInterval {
  id?: string;
  intervals?: TflApiPresentationEntitiesInterval[];
}

export interface TflApiPresentationEntitiesSchedule {
  name?: string;
  knownJourneys?: TflApiPresentationEntitiesKnownJourney[];
  firstJourney?: TflApiPresentationEntitiesKnownJourney;
  lastJourney?: TflApiPresentationEntitiesKnownJourney;
  periods?: TflApiPresentationEntitiesPeriod[];
}

export interface TflApiPresentationEntitiesInterval {
  stopId?: string;
  /** @format double */
  timeToArrival?: number;
}

export interface TflApiPresentationEntitiesKnownJourney {
  hour?: string;
  minute?: string;
  /** @format int32 */
  intervalId?: number;
}

export interface TflApiPresentationEntitiesPeriod {
  type?: TflApiPresentationEntitiesPeriodTypeEnum;
  fromTime?: TflApiPresentationEntitiesTwentyFourHourClockTime;
  toTime?: TflApiPresentationEntitiesTwentyFourHourClockTime;
  frequency?: TflApiPresentationEntitiesServiceFrequency;
}

export interface TflApiPresentationEntitiesTwentyFourHourClockTime {
  hour?: string;
  minute?: string;
}

export interface TflApiPresentationEntitiesServiceFrequency {
  /** @format double */
  lowestFrequency?: number;
  /** @format double */
  highestFrequency?: number;
}

/** DTO to capture the prediction details */
export interface TflApiPresentationEntitiesPrediction {
  /** The identitier for the prediction */
  id?: string;
  /**
   * The type of the operation (1: is new or has been updated, 2: should be deleted from any client cache)
   * @format int32
   */
  operationType?: number;
  /** The actual vehicle in transit (for train modes, the leading car of the rolling set) */
  vehicleId?: string;
  /** Identifier for the prediction */
  naptanId?: string;
  /** Station name */
  stationName?: string;
  /** Unique identifier for the Line */
  lineId?: string;
  /** Line Name */
  lineName?: string;
  /** Platform name (for bus, this is the stop letter) */
  platformName?: string;
  /** Direction (unified to inbound/outbound) */
  direction?: string;
  /** Bearing (between 0 to 359) */
  bearing?: string;
  /** TripId is used to assemble the primary key */
  tripId?: string;
  /** Data base version */
  baseVersion?: string;
  /** Naptan Identifier for the prediction's destination */
  destinationNaptanId?: string;
  /** Name of the destination */
  destinationName?: string;
  /**
   * Timestamp for when the prediction was inserted/modified (source column drives what objects are broadcast on each iteration)
   * @format date-time
   */
  timestamp?: string;
  /**
   * Prediction of the Time to station in seconds
   * @format int32
   */
  timeToStation?: number;
  /** The current location of the vehicle. */
  currentLocation?: string;
  /** Routing information or other descriptive text about the path of the vehicle towards the destination */
  towards?: string;
  /**
   * The expected arrival time of the vehicle at the stop/station
   * @format date-time
   */
  expectedArrival?: string;
  /**
   * The expiry time for the prediction
   * @format date-time
   */
  timeToLive?: string;
  /** The mode name of the station/line the prediction relates to */
  modeName?: string;
  /** Keep the original timestamp from MongoDb fo debugging purposes */
  timing?: TflApiPresentationEntitiesPredictionTiming;
}

export interface TflApiPresentationEntitiesPredictionTiming {
  countdownServerAdjustment?: string;
  /** @format date-time */
  source?: string;
  /** @format date-time */
  insert?: string;
  /** @format date-time */
  read?: string;
  /** @format date-time */
  sent?: string;
  /** @format date-time */
  received?: string;
}

export interface TflApiPresentationEntitiesActiveServiceType {
  mode?: string;
  serviceType?: string;
}

/** Represent travel network status */
export interface TflApiPresentationEntitiesNetworkStatus {
  operator?: string;
  status?: string;
  message?: string;
  /** @format int32 */
  statusLevel?: number;
}

export interface TflApiPresentationEntitiesCarParkOccupancy {
  id?: string;
  bays?: TflApiPresentationEntitiesBay[];
  name?: string;
  carParkDetailsUrl?: string;
}

export interface TflApiPresentationEntitiesBay {
  bayType?: string;
  /** @format int32 */
  bayCount?: number;
  /** @format int32 */
  free?: number;
  /** @format int32 */
  occupied?: number;
}

export interface TflApiPresentationEntitiesChargeConnectorOccupancy {
  /** @format int32 */
  id?: number;
  sourceSystemPlaceId?: string;
  status?: string;
}

/** Bike point occupancy */
export interface TflApiPresentationEntitiesBikePointOccupancy {
  /** Id of the bike point such as BikePoints_1 */
  id?: string;
  /** Name / Common name of the bike point */
  name?: string;
  /**
   * Total bike counts
   * @format int32
   */
  bikesCount?: number;
  /**
   * Empty docks
   * @format int32
   */
  emptyDocks?: number;
  /**
   * Total docks available
   * @format int32
   */
  totalDocks?: number;
  /**
   * Total standard bikes count
   * @format int32
   */
  standardBikesCount?: number;
  /**
   * Total ebikes count
   * @format int32
   */
  eBikesCount?: number;
}

export interface TflApiPresentationEntitiesPlaceCategory {
  category?: string;
  availableKeys?: string[];
}

export interface TflApiPresentationEntitiesSearchResponse {
  query?: string;
  /** @format int32 */
  from?: number;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  pageSize?: number;
  provider?: string;
  /** @format int32 */
  total?: number;
  matches?: TflApiPresentationEntitiesSearchMatch[];
  /** @format double */
  maxScore?: number;
}

export interface TflApiPresentationEntitiesSearchMatch {
  id?: string;
  url?: string;
  name?: string;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
}

export interface TflApiCommonPostcodeInput {
  /** @pattern ^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$ */
  postcode?: string;
}

export interface TflApiPresentationEntitiesPlacePolygon {
  geoPoints?: TflApiCommonGeoPoint[];
  commonName?: string;
}

export interface TflApiCommonGeoPoint {
  /** @format double */
  lat: number;
  /** @format double */
  lon: number;
}

export interface TflApiCommonPlaceGeo {
  /** @format double */
  swLat?: number;
  /** @format double */
  swLon?: number;
  /** @format double */
  neLat?: number;
  /** @format double */
  neLon?: number;
  /** @format double */
  lat?: number;
  /** @format double */
  lon?: number;
}

export interface TflApiPresentationEntitiesRoadCorridor {
  /** The Id of the Corridor e.g. "A406" */
  id?: string;
  /**
   * The display name of the Corridor e.g. "North Circular (A406)". This
   *             may be identical to the Id.
   */
  displayName?: string;
  /** The group name of the Corridor e.g. "Central London". Most corridors are not grouped, in which case this field can be null. */
  group?: string;
  /** Standard multi-mode status severity code */
  statusSeverity?: string;
  /** Description of the status severity as applied to RoadCorridors */
  statusSeverityDescription?: string;
  /**
   * The Bounds of the Corridor, given by the south-east followed by the north-west co-ordinate
   *             pair in geoJSON format e.g. "[[-1.241531,51.242151],[1.641223,53.765721]]"
   */
  bounds?: string;
  /**
   * The Envelope of the Corridor, given by the corner co-ordinates of a rectangular (four-point) polygon
   *             in geoJSON format e.g. "[[-1.241531,51.242151],[-1.241531,53.765721],[1.641223,53.765721],[1.641223,51.242151]]"
   */
  envelope?: string;
  /**
   * The start of the period over which status has been aggregated, or null if this is the current corridor status.
   * @format date-time
   */
  statusAggregationStartDate?: string;
  /**
   * The end of the period over which status has been aggregated, or null if this is the current corridor status.
   * @format date-time
   */
  statusAggregationEndDate?: string;
  /** URL to retrieve this Corridor. */
  url?: string;
}

export interface TflApiCommonDateRangeNullable {
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface TflApiPresentationEntitiesRoadDisruption {
  /** Unique identifier for the road disruption */
  id?: string;
  /** URL to retrieve this road disruption */
  url?: string;
  /** Latitude and longitude (WGS84) of the centroid of the disruption, stored in a geoJSON-formatted string. */
  point?: string;
  /** A description of the severity of the disruption. */
  severity?: string;
  /**
   * An ordinal of the disruption based on severity, level of interest and corridor.
   * @format int32
   */
  ordinal?: number;
  /** Describes the nature of disruption e.g. Traffic Incidents, Works */
  category?: string;
  /** Describes the sub-category of disruption e.g. Collapsed Manhole, Abnormal Load */
  subCategory?: string;
  /** Full text of comments describing the disruption, including details of any road closures and diversions, where appropriate. */
  comments?: string;
  /**
   * Text of the most recent update from the LSTCC on the state of the
   *              disruption, including the current traffic impact and any advice to
   *              road users.
   */
  currentUpdate?: string;
  /**
   * The time when the last CurrentUpdate description was recorded,
   *             or null if no CurrentUpdate has been applied.
   * @format date-time
   */
  currentUpdateDateTime?: string;
  /** The Ids of affected corridors, if any. */
  corridorIds?: string[];
  /**
   * The date and time which the disruption started. For a planned disruption (i.e. planned road works) this date will be in the future.
   *             For unplanned disruptions, this will default to the date on which the disruption was first recorded, but may be adjusted by the operator.
   * @format date-time
   */
  startDateTime?: string;
  /**
   * The date and time on which the disruption ended. For planned disruptions, this date will have a valid value. For unplanned
   *             disruptions in progress, this field will be omitted.
   * @format date-time
   */
  endDateTime?: string;
  /**
   * The date and time on which the disruption was last modified in the system. This information can reliably be used by a developer to quickly
   *             compare two instances of the same disruption to determine if it has been changed.
   * @format date-time
   */
  lastModifiedTime?: string;
  /**
   * This describes the level of potential impact on traffic operations of the disruption.
   *             High = e.g. a one-off disruption on a major or high profile route which will require a high level of operational attention
   *             Medium = This is the default value
   *             Low = e.g. a frequently occurring disruption which is well known
   */
  levelOfInterest?: string;
  /** Main road name / number (borough) or preset area name where the disruption is located. This might be useful for a map popup where space is limited. */
  location?: string;
  /**
   * This describes the status of the disruption.
   *             Active = currently in progress
   *             Active Long Term = currently in progress and long term
   *             Scheduled = scheduled to start within the next 180 days
   *             Recurring Works = planned maintenance works that follow a regular routine or pattern and whose next occurrence is to start within the next 180 days.
   *             Recently Cleared = recently cleared in the last 24 hours
   *             Note that the status of Scheduled or Recurring Works disruptions will change to Active when they start, and will change status again when they end.
   */
  status?: string;
  /**
   * Geography version of Point for output as GeoJSON.
   *             Can not use Geometry in a consistent way as non-TIMS disruptions do not have a polygon
   */
  geography?: SystemDataSpatialDbGeography;
  /**
   * GeoJSON formatted latitude/longitude (WGS84) pairs forming an enclosed polyline or polygon. The polygon will only be included where affected streets information
   *             is not available for the disruption, would be inappropriate (e.g. a very large number of streets), or is centred on an area without streets (e.g. a football stadium).
   */
  geometry?: SystemDataSpatialDbGeography;
  /** A collection of zero or more streets affected by the disruption. */
  streets?: TflApiPresentationEntitiesStreet[];
  /** True if the disruption is planned on a future date that is open to change */
  isProvisional?: boolean;
  /**
   * True if any of the affected Streets have a "Full Closure" status, false otherwise. A RoadDisruption that has HasClosures is considered a
   *             Severe or Serious disruption for severity filtering purposes.
   */
  hasClosures?: boolean;
  /** The text of any associated link */
  linkText?: string;
  /** The url of any associated link */
  linkUrl?: string;
  /** Any associated road project */
  roadProject?: TflApiPresentationEntitiesRoadProject;
  /**
   * TDM Additional properties
   * @format date-time
   */
  publishStartDate?: string;
  /** @format date-time */
  publishEndDate?: string;
  timeFrame?: string;
  roadDisruptionLines?: TflApiPresentationEntitiesRoadDisruptionLine[];
  roadDisruptionImpactAreas?: TflApiPresentationEntitiesRoadDisruptionImpactArea[];
  recurringSchedules?: TflApiPresentationEntitiesRoadDisruptionSchedule[];
}

export interface TflApiPresentationEntitiesStreet {
  /** Street name */
  name?: string;
  /**
   * Type of road closure. Some example values:
   *             Open = road is open, not blocked, not closed, not restricted. It maybe that the disruption has been moved out of the carriageway.
   *             Partial Closure = road is partially blocked, closed or restricted.
   *             Full Closure = road is fully blocked or closed.
   */
  closure?: string;
  /**
   * The direction of the disruption on the street. Some example values:
   *             All Directions
   *             All Approaches
   *             Clockwise
   *             Anti-Clockwise
   *             Northbound
   *             Eastbound
   *             Southbound
   *             Westbound
   *             Both Directions
   */
  directions?: string;
  /** Geographic description of the sections of this street that are affected. */
  segments?: TflApiPresentationEntitiesStreetSegment[];
  /**
   * The ID from the source system of the disruption that this street belongs to.
   * @format int64
   */
  sourceSystemId?: number;
  /** The key of the source system of the disruption that this street belongs to. */
  sourceSystemKey?: string;
}

export interface TflApiPresentationEntitiesRoadProject {
  projectId?: string;
  schemeName?: string;
  projectName?: string;
  projectDescription?: string;
  projectPageUrl?: string;
  consultationPageUrl?: string;
  /** @format date-time */
  consultationStartDate?: string;
  /** @format date-time */
  consultationEndDate?: string;
  /** @format date-time */
  constructionStartDate?: string;
  /** @format date-time */
  constructionEndDate?: string;
  boroughsBenefited?: string[];
  cycleSuperhighwayId?: string;
  phase?: TflApiPresentationEntitiesRoadProjectPhaseEnum;
  contactName?: string;
  contactEmail?: string;
  externalPageUrl?: string;
  projectSummaryPageUrl?: string;
}

export interface TflApiPresentationEntitiesRoadDisruptionLine {
  /** @format int32 */
  id?: number;
  roadDisruptionId?: string;
  isDiversion?: boolean;
  multiLineString?: SystemDataSpatialDbGeography;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  startTime?: string;
  endTime?: string;
}

export interface TflApiPresentationEntitiesRoadDisruptionImpactArea {
  /** @format int32 */
  id?: number;
  roadDisruptionId?: string;
  polygon?: SystemDataSpatialDbGeography;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  startTime?: string;
  endTime?: string;
}

export interface TflApiPresentationEntitiesRoadDisruptionSchedule {
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  endTime?: string;
}

export interface TflApiPresentationEntitiesStreetSegment {
  /** A 16 digit unique integer identifying a OS ITN (Ordnance Survey Integrated Transport Network) road link. */
  toid?: string;
  /** geoJSON formatted LineString containing two latitude/longitude (WGS84) pairs that identify the start and end points of the street segment. */
  lineString?: string;
  /**
   * The ID from the source system of the disruption that this street belongs to.
   * @format int64
   */
  sourceSystemId?: number;
  /** The key of the source system of the disruption that this street belongs to. */
  sourceSystemKey?: string;
}

export interface TflApiPresentationEntitiesRedirect {
  shortUrl?: string;
  longUrl?: string;
  active?: boolean;
}

export interface TflApiPresentationEntitiesStopPointCategory {
  category?: string;
  availableKeys?: string[];
}

export interface TflApiPresentationEntitiesLineServiceType {
  lineName?: string;
  lineSpecificServiceTypes?: TflApiPresentationEntitiesLineSpecificServiceType[];
}

export interface TflApiPresentationEntitiesLineSpecificServiceType {
  serviceType?: TflApiPresentationEntitiesLineServiceTypeInfo;
  stopServesServiceType?: boolean;
}

/** DTO to capture the prediction details */
export interface TflApiPresentationEntitiesArrivalDeparture {
  /** Platform name (for bus, this is the stop letter) */
  platformName?: string;
  /** Naptan Identifier for the prediction's destination */
  destinationNaptanId?: string;
  /** Name of the destination */
  destinationName?: string;
  /** Identifier for the prediction */
  naptanId?: string;
  /** Station name */
  stationName?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  estimatedTimeOfArrival?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  scheduledTimeOfArrival?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  estimatedTimeOfDeparture?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  scheduledTimeOfDeparture?: string;
  /** Estimated time of arrival */
  minutesAndSecondsToArrival?: string;
  /** Estimated time of arrival */
  minutesAndSecondsToDeparture?: string;
  /** Reason for cancellation or delay */
  cause?: string;
  /** Status of departure */
  departureStatus?: TflApiPresentationEntitiesArrivalDepartureDepartureStatusEnum;
  /** Keep the original timestamp from MongoDb fo debugging purposes */
  timing?: TflApiPresentationEntitiesPredictionTiming;
}

/** DTO to capture the prediction details */
export interface TflApiPresentationEntitiesArrivalDepartureWithLine {
  /** Train operating company LineId */
  lineId?: string;
  /** Train operating company LineName */
  lineName?: string;
  /** Train operating company VehicleId */
  vehicleId?: string;
  /** Platform name (for bus, this is the stop letter) */
  platformName?: string;
  /** Naptan Identifier for the prediction's destination */
  destinationNaptanId?: string;
  /** Name of the destination */
  destinationName?: string;
  /** Identifier for the prediction */
  naptanId?: string;
  /** Station name */
  stationName?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  estimatedTimeOfArrival?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  scheduledTimeOfArrival?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  estimatedTimeOfDeparture?: string;
  /**
   * Estimated time of arrival
   * @format date-time
   */
  scheduledTimeOfDeparture?: string;
  /** Estimated time of arrival */
  minutesAndSecondsToArrival?: string;
  /** Estimated time of arrival */
  minutesAndSecondsToDeparture?: string;
  /** Reason for cancellation or delay */
  cause?: string;
  /** Status of departure */
  departureStatus?: TflApiPresentationEntitiesArrivalDepartureWithLineDepartureStatusEnum;
  /** Keep the original timestamp from MongoDb fo debugging purposes */
  timing?: TflApiPresentationEntitiesPredictionTiming;
}

export interface TflApiPresentationEntitiesStopPointRouteSection {
  naptanId?: string;
  lineId?: string;
  mode?: string;
  /** @format date-time */
  validFrom?: string;
  /** @format date-time */
  validTo?: string;
  direction?: string;
  routeSectionName?: string;
  lineString?: string;
  isActive?: boolean;
  serviceType?: string;
  vehicleDestinationText?: string;
  destinationName?: string;
}

export interface TflApiPresentationEntitiesDisruptedPoint {
  atcoCode?: string;
  /** @format date-time */
  fromDate?: string;
  /** @format date-time */
  toDate?: string;
  description?: string;
  commonName?: string;
  type?: string;
  mode?: string;
  stationAtcoCode?: string;
  appearance?: string;
  additionalInformation?: string;
}

/** A paged response containing StopPoints */
export interface TflApiPresentationEntitiesStopPointsResponse {
  /** The centre latitude/longitude of this list of StopPoints */
  centrePoint?: number[];
  /** Collection of stop points */
  stopPoints?: TflApiPresentationEntitiesStopPoint[];
  /**
   * The maximum size of the page in this response i.e. the maximum number of StopPoints
   * @format int32
   */
  pageSize?: number;
  /**
   * The total number of StopPoints available across all pages
   * @format int32
   */
  total?: number;
  /**
   * The index of this page
   * @format int32
   */
  page?: number;
}

export interface TflApiPresentationEntitiesFaresRecommendationResponse {
  recommendations?: TflApiPresentationEntitiesFaresRecommendation[];
}

export interface TflApiPresentationEntitiesFaresRecommendation {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  rule?: number;
  /** @format int32 */
  rank?: number;
  fareType?: string;
  product?: string;
  ticketType?: string;
  ticketTime?: string;
  productType?: string;
  discountCard?: string;
  zones?: string;
  cost?: string;
  priceDescription?: string;
  priceComparison?: string;
  recommendedTopUp?: string;
  notes?: TflApiPresentationEntitiesMessage[];
  keyFeatures?: TflApiPresentationEntitiesMessage[];
  gettingYourTicket?: TflApiPresentationEntitiesMessage[];
  /** @format double */
  singleFare?: number;
}

export interface TflApiCommonApiVersionInfo {
  label?: string;
  /** @format date-time */
  timestamp?: string;
  version?: string;
  assemblies?: string[];
}

/** Cycle route status i.e Proposed, Existing etc */
export type TflApiPresentationEntitiesCycleSuperhighwayStatusEnum =
  | "Unknown"
  | "All"
  | "Open"
  | "In Progress"
  | "Planned"
  | "Planned - Subject to feasibility and consultation."
  | "Not Open";

/** Type of cycle route e.g CycleSuperhighways, Quietways, MiniHollands etc */
export type TflApiPresentationEntitiesCycleSuperhighwayRouteTypeEnum =
  | "Unknown"
  | "All"
  | "Cycle Superhighways"
  | "Quietways"
  | "Cycleways"
  | "Mini-Hollands"
  | "Central London Grid"
  | "Streetspace Route";

export type TflApiPresentationEntitiesFaresFareStationFareCategoryEnum =
  | "Cash"
  | "Oyster"
  | "Contactless"
  | "ContactlessOnly"
  | "All";

export type TflApiPresentationEntitiesJourneyPlannerSearchCriteriaDateTimeTypeEnum = "Arriving" | "Departing";

/** Gets or sets the category of this dispruption. */
export type TflApiPresentationEntitiesDisruptionCategoryEnum =
  | "Undefined"
  | "RealTime"
  | "PlannedWork"
  | "Information"
  | "Event"
  | "Crowding"
  | "StatusAlert";

export type TflApiPresentationEntitiesIdentifierRouteTypeEnum =
  | "Unknown"
  | "All"
  | "Cycle Superhighways"
  | "Quietways"
  | "Cycleways"
  | "Mini-Hollands"
  | "Central London Grid"
  | "Streetspace Route";

export type TflApiPresentationEntitiesIdentifierStatusEnum =
  | "Unknown"
  | "All"
  | "Open"
  | "In Progress"
  | "Planned"
  | "Planned - Subject to feasibility and consultation."
  | "Not Open";

export type TflApiPresentationEntitiesInstructionStepSkyDirectionDescriptionEnum =
  | "North"
  | "NorthEast"
  | "East"
  | "SouthEast"
  | "South"
  | "SouthWest"
  | "West"
  | "NorthWest";

export type TflApiPresentationEntitiesInstructionStepTrackTypeEnum =
  | "CycleSuperHighway"
  | "CanalTowpath"
  | "QuietRoad"
  | "ProvisionForCyclists"
  | "BusyRoads"
  | "None"
  | "PushBike"
  | "Quietway";

export type TflApiPresentationEntitiesStopPointSequenceServiceTypeEnum = "Regular" | "Night";

export type TflApiPresentationEntitiesPeriodTypeEnum = "Normal" | "FrequencyHours" | "FrequencyMinutes" | "Unknown";

export type TflApiPresentationEntitiesRoadProjectPhaseEnum =
  | "Unscoped"
  | "Concept"
  | "ConsultationEnded"
  | "Consultation"
  | "Construction"
  | "Complete";

/** Status of departure */
export type TflApiPresentationEntitiesArrivalDepartureDepartureStatusEnum =
  | "OnTime"
  | "Delayed"
  | "Cancelled"
  | "NotStoppingAtStation";

/** Status of departure */
export type TflApiPresentationEntitiesArrivalDepartureWithLineDepartureStatusEnum =
  | "OnTime"
  | "Delayed"
  | "Cancelled"
  | "NotStoppingAtStation";

export interface BikePointSearchParams {
  /** The search term e.g. "St. James" */
  query: string;
}

export interface CabwiseGetParams {
  /**
   * Latitude
   * @format double
   */
  lat: number;
  /**
   * Longitude
   * @format double
   */
  lon: number;
  /** Operator Type e.g Minicab, Executive, Limousine */
  optype?: string;
  /** Wheelchair accessible */
  wc?: string;
  /**
   * The radius of the bounding circle in metres
   * @format double
   */
  radius?: number;
  /** Trading name of operating company */
  name?: string;
  /**
   * An optional parameter to limit the number of results return. Default and maximum is 20.
   * @format int32
   */
  maxResults?: number;
  /** Legacy Format */
  legacyFormat?: boolean;
  /** Force Xml */
  forceXml?: boolean;
  /** Twenty Four Seven Only */
  twentyFourSevenOnly?: boolean;
}

export interface JourneyJourneyResultsParams {
  /** Travel through point on the journey. Can be WGS84 coordinates expressed as "lat,long", a UK postcode, a Naptan (StopPoint) id, an ICS StopId, or a free-text string (will cause disambiguation unless it exactly matches a point of interest name). */
  via?: string;
  /** Does the journey cover stops outside London? eg. "nationalSearch=true" */
  nationalSearch?: boolean;
  /** The date must be in yyyyMMdd format */
  date?: string;
  /** The time must be in HHmm format */
  time?: string;
  /** Does the time given relate to arrival or leaving time? Possible options: "departing" | "arriving" */
  timeIs?: TimeIsEnum;
  /** The journey preference eg possible options: "leastinterchange" | "leasttime" | "leastwalking" */
  journeyPreference?: JourneyPreferenceEnum;
  /** The mode must be a comma separated list of modes. eg possible options: "public-bus,overground,train,tube,coach,dlr,cablecar,tram,river,walking,cycle" */
  mode?: string[];
  /** The accessibility preference must be a comma separated list eg. "noSolidStairs,noEscalators,noElevators,stepFreeToVehicle,stepFreeToPlatform" */
  accessibilityPreference?: AccessibilityPreferenceEnum[];
  /** An optional name to associate with the origin of the journey in the results. */
  fromName?: string;
  /** An optional name to associate with the destination of the journey in the results. */
  toName?: string;
  /** An optional name to associate with the via point of the journey in the results. */
  viaName?: string;
  /** The max walking time in minutes for transfer eg. "120" */
  maxTransferMinutes?: string;
  /** The max walking time in minutes for journeys eg. "120" */
  maxWalkingMinutes?: string;
  /** The walking speed. eg possible options: "slow" | "average" | "fast". */
  walkingSpeed?: WalkingSpeedEnum;
  /** The cycle preference. eg possible options: "allTheWay" | "leaveAtStation" | "takeOnTransport" | "cycleHire" */
  cyclePreference?: CyclePreferenceEnum;
  /** Time adjustment command. eg possible options: "TripFirst" | "TripLast" */
  adjustment?: string;
  /** A comma separated list of cycling proficiency levels. eg possible options: "easy,moderate,fast" */
  bikeProficiency?: BikeProficiencyEnum[];
  /** Option to determine whether to return alternative cycling journey */
  alternativeCycle?: boolean;
  /** Option to determine whether to return alternative walking journey */
  alternativeWalking?: boolean;
  /** Flag to determine whether certain text (e.g. walking instructions) should be output with HTML tags or not. */
  applyHtmlMarkup?: boolean;
  /** A boolean to indicate whether or not to return 3 public transport journeys, a bus journey, a cycle hire journey, a personal cycle journey and a walking journey */
  useMultiModalCall?: boolean;
  /** A boolean to indicate whether to optimize journeys using walking */
  walkingOptimization?: boolean;
  /** A boolean to indicate whether to return one or more taxi journeys. Note, setting this to true will override "useMultiModalCall". */
  taxiOnlyTrip?: boolean;
  /** A boolean to indicate whether public transport routes should include directions between platforms and station entrances. */
  routeBetweenEntrances?: boolean;
  /** A boolean to indicate if we want to receive real time live arrivals data where available. */
  useRealTimeLiveArrivals?: boolean;
  /** A boolean to make Journey Planner calculate journeys in one temporal direction only. In other words, only calculate journeys after the 'depart' time, or before the 'arrive' time. By default, the Journey Planner engine (EFA) calculates journeys in both temporal directions. */
  calcOneDirection?: boolean;
  /** A boolean to make Journey Planner return alternative routes. Alternative routes are calculated by removing one or more lines included in the fastest route and re-calculating. By default, these journeys will not be returned. */
  includeAlternativeRoutes?: boolean;
  /**
   * An optional integer to indicate what multi modal scenario we want to use.
   * @format int32
   */
  overrideMultiModalScenario?: number;
  /** A boolean to indicate whether walking leg to station entrance and walking leg from station entrance to platform should be combined. Defaults to true */
  combineTransferLegs?: boolean;
  /** Origin of the journey. Can be WGS84 coordinates expressed as "lat,long", a UK postcode, a Naptan (StopPoint) id, an ICS StopId, or a free-text string (will cause disambiguation unless it exactly matches a point of interest name). */
  from: string;
  /** Destination of the journey. Can be WGS84 coordinates expressed as "lat,long", a UK postcode, a Naptan (StopPoint) id, an ICS StopId, or a free-text string (will cause disambiguation unless it exactly matches a point of interest name). */
  to: string;
}

/** Does the time given relate to arrival or leaving time? Possible options: "departing" | "arriving" */
export type TimeIsEnum = "Arriving" | "Departing";

/** The journey preference eg possible options: "leastinterchange" | "leasttime" | "leastwalking" */
export type JourneyPreferenceEnum = "LeastInterchange" | "LeastTime" | "LeastWalking";

export type AccessibilityPreferenceEnum =
  | "NoRequirements"
  | "NoSolidStairs"
  | "NoEscalators"
  | "NoElevators"
  | "StepFreeToVehicle"
  | "StepFreeToPlatform";

/** The walking speed. eg possible options: "slow" | "average" | "fast". */
export type WalkingSpeedEnum = "Slow" | "Average" | "Fast";

/** The cycle preference. eg possible options: "allTheWay" | "leaveAtStation" | "takeOnTransport" | "cycleHire" */
export type CyclePreferenceEnum = "None" | "LeaveAtStation" | "TakeOnTransport" | "AllTheWay" | "CycleHire";

export type BikeProficiencyEnum = "Easy" | "Moderate" | "Fast";

/** Does the time given relate to arrival or leaving time? Possible options: "departing" | "arriving" */
export type JourneyJourneyResultsParams1TimeIsEnum = "Arriving" | "Departing";

/** The journey preference eg possible options: "leastinterchange" | "leasttime" | "leastwalking" */
export type JourneyJourneyResultsParams1JourneyPreferenceEnum = "LeastInterchange" | "LeastTime" | "LeastWalking";

export type JourneyJourneyResultsParams1AccessibilityPreferenceEnum =
  | "NoRequirements"
  | "NoSolidStairs"
  | "NoEscalators"
  | "NoElevators"
  | "StepFreeToVehicle"
  | "StepFreeToPlatform";

/** The walking speed. eg possible options: "slow" | "average" | "fast". */
export type JourneyJourneyResultsParams1WalkingSpeedEnum = "Slow" | "Average" | "Fast";

/** The cycle preference. eg possible options: "allTheWay" | "leaveAtStation" | "takeOnTransport" | "cycleHire" */
export type JourneyJourneyResultsParams1CyclePreferenceEnum =
  | "None"
  | "LeaveAtStation"
  | "TakeOnTransport"
  | "AllTheWay"
  | "CycleHire";

export type JourneyJourneyResultsParams1BikeProficiencyEnum = "Easy" | "Moderate" | "Fast";

export interface LineRouteParams {
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum[];
}

export type ServiceTypesEnum = "Regular" | "Night";

export type LineRouteParams1ServiceTypesEnum = "Regular" | "Night";

export interface LineLineRoutesByIdsParams {
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum1[];
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string[];
}

export type ServiceTypesEnum1 = "Regular" | "Night";

export type LineLineRoutesByIdsParams1ServiceTypesEnum = "Regular" | "Night";

export interface LineRouteByModeParams {
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum2[];
  /** A comma-separated list of modes e.g. tube,dlr */
  modes: string[];
}

export type ServiceTypesEnum2 = "Regular" | "Night";

export type LineRouteByModeParams1ServiceTypesEnum = "Regular" | "Night";

export interface LineRouteSequenceParams {
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum3[];
  /** That excludes crowding from line disruptions. Can be true or false. */
  excludeCrowding?: boolean;
  /** A single line id e.g. victoria */
  id: string;
  /** The direction of travel. Can be inbound or outbound. */
  direction: DirectionEnum;
}

export type ServiceTypesEnum3 = "Regular" | "Night";

/** The direction of travel. Can be inbound or outbound. */
export type DirectionEnum = "inbound" | "outbound" | "all";

export type LineRouteSequenceParams1ServiceTypesEnum = "Regular" | "Night";

/** The direction of travel. Can be inbound or outbound. */
export type LineRouteSequenceParams1DirectionEnum = "inbound" | "outbound" | "all";

export type LineRouteSequenceParams1Enum = "inbound" | "outbound" | "all";

export interface LineStatusParams {
  /** Include details of the disruptions that are causing the line status including the affected stops and routes */
  detail?: boolean;
  startDate: string;
  endDate: string;
  /** @format date-time */
  dateRangeStartDate?: string;
  /** @format date-time */
  dateRangeEndDate?: string;
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string[];
}

export interface LineStatusByIdsParams {
  /** Include details of the disruptions that are causing the line status including the affected stops and routes */
  detail?: boolean;
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string[];
}

export interface LineSearchParams {
  /** Optionally filter by the specified modes */
  modes?: string[];
  /** A comma seperated list of service types to filter on. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum4[];
  /** Search term e.g victoria */
  query: string;
}

export type ServiceTypesEnum4 = "Regular" | "Night";

export type LineSearchParams1ServiceTypesEnum = "Regular" | "Night";

export interface LineStatusByModeParams {
  /** Include details of the disruptions that are causing the line status including the affected stops and routes */
  detail?: boolean;
  /** If specified, ensures that only those line status(es) are returned within the lines that have disruptions with the matching severity level. */
  severityLevel?: string;
  /** A comma-separated list of modes to filter by. e.g. tube,dlr */
  modes: string[];
}

export interface LineStopPointsParams {
  /** If the national-rail line is requested, this flag will filter the national rail stations so that only those operated by TfL are returned */
  tflOperatedNationalRailStationsOnly?: boolean;
  /** A single line id e.g. victoria */
  id: string;
}

export interface LineArrivalsParams {
  /** Optional. The direction of travel. Can be inbound or outbound or all. If left blank, and destinationStopId is set, will default to all */
  direction?: DirectionEnum1;
  /** Optional. Id of destination stop */
  destinationStationId?: string;
  /** A comma-separated list of line ids e.g. victoria,circle,N133. Max. approx. 20 ids. */
  ids: string[];
  /** Optional. Id of stop to get arrival predictions for (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  stopPointId: string;
}

/** Optional. The direction of travel. Can be inbound or outbound or all. If left blank, and destinationStopId is set, will default to all */
export type DirectionEnum1 = "inbound" | "outbound" | "all";

/** Optional. The direction of travel. Can be inbound or outbound or all. If left blank, and destinationStopId is set, will default to all */
export type LineArrivalsParams1DirectionEnum = "inbound" | "outbound" | "all";

export interface ModeArrivalsParams {
  /**
   * A number of arrivals to return for each stop, -1 to return all available.
   * @format int32
   */
  count?: number;
  /** A mode name e.g. tube, dlr */
  mode: string;
}

export interface PlaceGetStreetsByPostCodeParams {
  postcode: string;
  /** @pattern ^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$ */
  postcodeInputPostcode?: string;
}

export interface PlaceGetByTypeParams {
  /** An optional parameter to limit the results to active records only (Currently only the 'VariableMessageSign' place type is supported) */
  activeOnly?: boolean;
  /**
   * A comma-separated list of the types to return. Max. approx 12 types.
   *             A valid list of place types can be obtained from the /Place/Meta/placeTypes endpoint.
   */
  types: string[];
}

export interface PlaceGetParams {
  /** Defaults to false. If true child places e.g. individual charging stations at a charge point while be included, otherwise just the URLs of any child places will be returned */
  includeChildren?: boolean;
  /** The id of the place, you can use the /Place/Types/{types} endpoint to get a list of places for a given type including their ids */
  id: string;
}

export interface PlaceGetByGeoParams {
  /**
   * The radius of the bounding circle in metres when only lat/lon are specified.
   * @format double
   */
  radius?: number;
  /** An optional list of comma separated property categories to return in the Place's property bag. If null or empty, all categories of property are returned. Pass the keyword "none" to return no properties (a valid list of categories can be obtained from the /Place/Meta/categories endpoint) */
  categories?: string[];
  /** Defaults to false. If true child places e.g. individual charging stations at a charge point while be included, otherwise just the URLs of any child places will be returned */
  includeChildren?: boolean;
  /** Place types to filter on, or null to return all types */
  type?: string[];
  /** An optional parameter to limit the results to active records only (Currently only the 'VariableMessageSign' place type is supported) */
  activeOnly?: boolean;
  /**
   * If specified, limits the number of returned places equal to the given value
   * @format int32
   */
  numberOfPlacesToReturn?: number;
  /** @format double */
  placeGeoSwLat?: number;
  /** @format double */
  placeGeoSwLon?: number;
  /** @format double */
  placeGeoNeLat?: number;
  /** @format double */
  placeGeoNeLon?: number;
  /** @format double */
  placeGeoLat?: number;
  /** @format double */
  placeGeoLon?: number;
}

export interface PlaceGetAtParams {
  lat: string;
  lon: string;
  /** @format double */
  locationLat: number;
  /** @format double */
  locationLon: number;
  /** The place type (a valid list of place types can be obtained from the /Place/Meta/placeTypes endpoint) */
  type: string[];
}

export interface PlaceGetOverlayParams {
  lat: string;
  lon: string;
  /** @format double */
  locationLat: number;
  /** @format double */
  locationLon: number;
  /**
   * The zoom level
   * @format int32
   */
  z: number;
  /** The place type (a valid list of place types can be obtained from the /Place/Meta/placeTypes endpoint) */
  type: string[];
  /**
   * The width of the requested overlay.
   * @format int32
   */
  width: number;
  /**
   * The height of the requested overlay.
   * @format int32
   */
  height: number;
}

export interface PlaceSearchParams {
  /** The name of the place, you can use the /Place/Types/{types} endpoint to get a list of places for a given type including their names. */
  name: string;
  /** A comma-separated list of the types to return. Max. approx 12 types. */
  types?: string[];
}

export interface RoadStatusParams {
  /** @format date-time */
  dateRangeNullableStartDate?: string;
  /** @format date-time */
  dateRangeNullableEndDate?: string;
  /** Comma-separated list of road identifiers e.g. "A406, A2" or use "all" to ignore id filter (a full list of supported road identifiers can be found at the /Road/ endpoint) */
  ids: string[];
}

export interface RoadDisruptionParams {
  /** Optional, defaults to false. When true, removes every property/node except for id, point, severity, severityDescription, startDate, endDate, corridor details, location, comments and streets */
  stripContent?: boolean;
  /** an optional list of Severity names to filter on (a valid list of severities can be obtained from the /Road/Meta/severities endpoint) */
  severities?: string[];
  /** an optional list of category names to filter on (a valid list of categories can be obtained from the /Road/Meta/categories endpoint) */
  categories?: string[];
  /** Optional, defaults to true. When true, always includes disruptions that have road closures, regardless of the severity filter. When false, the severity filter works as normal. */
  closures?: boolean;
  /** Comma-separated list of road identifiers e.g. "A406, A2" use all for all to ignore id filter (a full list of supported road identifiers can be found at the /Road/ endpoint) */
  ids: string[];
}

export interface RoadDisruptedStreetsParams {
  /**
   * Optional, the start time to filter on.
   * @format date-time
   */
  startDate: string;
  /**
   * Optional, The end time to filter on.
   * @format date-time
   */
  endDate: string;
}

export interface RoadDisruptionByIdParams {
  /** Optional, defaults to false. When true, removes every property/node except for id, point, severity, severityDescription, startDate, endDate, corridor details, location and comments. */
  stripContent?: boolean;
  /** Comma-separated list of disruption identifiers to filter by. */
  disruptionIds: string[];
}

export interface SearchGetParams {
  /** The search query */
  query: string;
}

export interface SearchBusSchedulesParams {
  /** The search query */
  query: string;
}

export interface StopPointGetParams {
  /** Include the crowding data (static). To Filter further use: /StopPoint/{ids}/Crowding/{line} */
  includeCrowdingData?: boolean;
  /**
   * A comma-separated list of stop point ids (station naptan code e.g. 940GZZLUASL). Max. approx. 20 ids.
   *             You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name.
   */
  ids: string[];
}

export interface StopPointGet2Params {
  /** A comcomma-separated value representing the place types. */
  placeTypes: string[];
  /** A naptan id for a stop point (station naptan code e.g. 940GZZLUASL). */
  id: string;
}

export interface StopPointCrowdingParams {
  /** The direction of travel. Can be inbound or outbound. */
  direction: DirectionEnum2;
  /** The Naptan id of the stop */
  id: string;
  /** A particular line e.g. victoria, circle, northern etc. */
  line: string;
}

/** The direction of travel. Can be inbound or outbound. */
export type DirectionEnum2 = "inbound" | "outbound" | "all";

/** The direction of travel. Can be inbound or outbound. */
export type StopPointCrowdingParams1DirectionEnum = "inbound" | "outbound" | "all";

export interface StopPointGetServiceTypesParams {
  /** The Naptan id of the stop */
  id: string;
  /** The lines which contain the given Naptan id (all lines relevant to the given stoppoint if empty) */
  lineIds?: string[];
  /** The modes which the lines are relevant to (all if empty) */
  modes?: string[];
}

export interface StopPointArrivalDeparturesParams {
  /** A comma-separated list of line ids e.g. elizabeth, london-overground, thameslink */
  lineIds: string[];
  /** A StopPoint id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
}

export interface StopPointReachableFromParams {
  /** A comma-separated list of service types to filter on. If not specified. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum5[];
  /** The id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) of the stop point to filter by */
  id: string;
  /** Line id of the line to filter by (e.g. victoria) */
  lineId: string;
}

export type ServiceTypesEnum5 = "Regular" | "Night";

export type StopPointReachableFromParams1ServiceTypesEnum = "Regular" | "Night";

export interface StopPointRouteParams {
  /** A comma-separated list of service types to filter on. If not specified. Supported values: Regular, Night. Defaulted to 'Regular' if not specified */
  serviceTypes?: ServiceTypesEnum6[];
  /** A stop point id (station naptan codes e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
}

export type ServiceTypesEnum6 = "Regular" | "Night";

export type StopPointRouteParams1ServiceTypesEnum = "Regular" | "Night";

export interface StopPointDisruptionByModeParams {
  includeRouteBlockedStops?: boolean;
  /** A comma-seperated list of modes e.g. tube,dlr */
  modes: string[];
}

export interface StopPointDisruptionParams {
  /** Specify true to return disruptions for entire family, or false to return disruptions for just this stop point. Defaults to false. */
  getFamily?: boolean;
  includeRouteBlockedStops?: boolean;
  /** Specify true to associate all disruptions with parent stop point. (Only applicable when getFamily is true). */
  flattenResponse?: boolean;
  /**
   * A comma-seperated list of stop point ids. Max. approx. 20 ids.
   *             You can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name.
   */
  ids: string[];
}

export interface StopPointDirectionParams {
  /** Optional line id filter e.g. victoria */
  lineId?: string;
  /** Originating stop id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  id: string;
  /** Destination stop id (station naptan code e.g. 940GZZLUASL, you can use /StopPoint/Search/{query} endpoint to find a stop point id from a station name) */
  toStopPointId: string;
}

export interface StopPointGetByGeoPointParams {
  /** a list of stopTypes that should be returned (a list of valid stop types can be obtained from the StopPoint/meta/stoptypes endpoint) */
  stopTypes: string[];
  /**
   * the radius of the bounding circle in metres (default : 200)
   * @format int32
   */
  radius?: number;
  /** Re-arrange the output into a parent/child hierarchy */
  useStopPointHierarchy?: boolean;
  /** the list of modes to search (comma separated mode names e.g. tube,dlr) */
  modes?: string[];
  /** an optional list of comma separated property categories to return in the StopPoint's property bag. If null or empty, all categories of property are returned. Pass the keyword "none" to return no properties (a valid list of categories can be obtained from the /StopPoint/Meta/categories endpoint) */
  categories?: string[];
  /** true to return the lines that each stop point serves as a nested resource */
  returnLines?: boolean;
  /** @format double */
  locationLat: number;
  /** @format double */
  locationLon: number;
}

export interface StopPointGetByModeParams {
  /**
   * The data set page to return. Page 1 equates to the first 1000 stop points, page 2 equates to 1001-2000 etc. Must be entered for bus mode as data set is too large.
   * @format int32
   */
  page?: number;
  /** A comma-seperated list of modes e.g. tube,dlr */
  modes: string[];
}

export interface StopPointSearchParams {
  /** An optional, parameter separated list of the modes to filter by */
  modes?: string[];
  /** True to only return stations in that have Fares data available for single fares to another station. */
  faresOnly?: boolean;
  /**
   * An optional result limit, defaulting to and with a maximum of 50. Since children of the stop point heirarchy are returned for matches,
   *             it is possible that the flattened result set will contain more than 50 items.
   * @format int32
   */
  maxResults?: number;
  /** An optional, parameter separated list of the lines to filter by */
  lines?: string[];
  /** If true, returns results including HUBs. */
  includeHubs?: boolean;
  /** If the national-rail mode is included, this flag will filter the national rail stations so that only those operated by TfL are returned */
  tflOperatedNationalRailStationsOnly?: boolean;
  /** The query string, case-insensitive. Leading and trailing wildcards are applied automatically. */
  query: string;
}

export interface StopPointSearch2Params {
  /** The query string, case-insensitive. Leading and trailing wildcards are applied automatically. */
  query: string;
  /** An optional, parameter separated list of the modes to filter by */
  modes?: string[];
  /** True to only return stations in that have Fares data available for single fares to another station. */
  faresOnly?: boolean;
  /**
   * An optional result limit, defaulting to and with a maximum of 50. Since children of the stop point heirarchy are returned for matches,
   *             it is possible that the flattened result set will contain more than 50 items.
   * @format int32
   */
  maxResults?: number;
  /** An optional, parameter separated list of the lines to filter by */
  lines?: string[];
  /** If true, returns results including HUBs. */
  includeHubs?: boolean;
  /** If the national-rail mode is included, this flag will filter the national rail stations so that only those operated by TfL are returned */
  tflOperatedNationalRailStationsOnly?: boolean;
}

export interface StopPointGetBySmsParams {
  /** If set to "web", a 302 redirect to relevant website bus stop page is returned. Valid values are : web. All other values are ignored. */
  output?: string;
  /** A 5-digit Countdown Bus Stop Code e.g. 73241, 50435, 56334. */
  id: string;
}

export interface TravelTimeGetOverlayParams {
  /** The title of the scenario. */
  scenarioTitle: string;
  /** The id for the time of day (AM/INTER/PM) */
  timeOfDayId: string;
  /** The id of the mode. */
  modeId: string;
  /** The direction of travel. */
  direction: DirectionEnum3;
  /**
   * The total minutes between the travel time bands
   * @format int32
   */
  travelTimeInterval: number;
  /**
   * The zoom level.
   * @format int32
   */
  z: number;
  /**
   * The latitude of the pin.
   * @format double
   */
  pinLat: number;
  /**
   * The longitude of the pin.
   * @format double
   */
  pinLon: number;
  /**
   * The map center latitude.
   * @format double
   */
  mapCenterLat: number;
  /**
   * The map center longitude.
   * @format double
   */
  mapCenterLon: number;
  /**
   * The width of the requested overlay.
   * @format int32
   */
  width: number;
  /**
   * The height of the requested overlay.
   * @format int32
   */
  height: number;
}

/** The direction of travel. */
export type DirectionEnum3 = "Average" | "From" | "To";

/** The direction of travel. */
export type TravelTimeGetOverlayParams1DirectionEnum = "Average" | "From" | "To";

export interface TravelTimeGetCompareOverlayParams {
  /** The title of the scenario. */
  scenarioTitle: string;
  /** The id for the time of day (AM/INTER/PM) */
  timeOfDayId: string;
  /** The id of the mode. */
  modeId: string;
  /** The direction of travel. */
  direction: DirectionEnum4;
  /**
   * The total minutes between the travel time bands
   * @format int32
   */
  travelTimeInterval: number;
  compareType: string;
  compareValue: string;
  /**
   * The zoom level.
   * @format int32
   */
  z: number;
  /**
   * The latitude of the pin.
   * @format double
   */
  pinLat: number;
  /**
   * The longitude of the pin.
   * @format double
   */
  pinLon: number;
  /**
   * The map center latitude.
   * @format double
   */
  mapCenterLat: number;
  /**
   * The map center longitude.
   * @format double
   */
  mapCenterLon: number;
  /**
   * The width of the requested overlay.
   * @format int32
   */
  width: number;
  /**
   * The height of the requested overlay.
   * @format int32
   */
  height: number;
}

/** The direction of travel. */
export type DirectionEnum4 = "Average" | "From" | "To";

/** The direction of travel. */
export type TravelTimeGetCompareOverlayParams1DirectionEnum = "Average" | "From" | "To";

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.digital.tfl.gov.uk";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Transport for London Unified API
 * @version v1
 * @baseUrl https://api.digital.tfl.gov.uk
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  accidentStats = {
    /**
     * No description
     *
     * @tags AccidentStats
     * @name AccidentStatsGet
     * @summary Gets all accident details for accidents occuring in the specified year
     * @request GET:/AccidentStats/{year}
     */
    accidentStatsGet: (year: number, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesAccidentStatsAccidentDetail[], any>({
        path: `/AccidentStats/${year}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  airQuality = {
    /**
     * No description
     *
     * @tags AirQuality
     * @name AirQualityGet
     * @summary Gets air quality data feed
     * @request GET:/AirQuality
     */
    airQualityGet: (params: RequestParams = {}) =>
      this.request<SystemObject, any>({
        path: `/AirQuality`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  bikePoint = {
    /**
 * No description
 *
 * @tags BikePoint
 * @name BikePointGetAll
 * @summary Gets all bike point locations. The Place object has an addtionalProperties array which contains the nbBikes, nbDocks and nbSpaces
            numbers which give the status of the BikePoint. A mismatch in these numbers i.e. nbDocks - (nbBikes + nbSpaces) != 0 indicates broken docks.
 * @request GET:/BikePoint
 */
    bikePointGetAll: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/BikePoint`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags BikePoint
     * @name BikePointGet
     * @summary Gets the bike point with the given id.
     * @request GET:/BikePoint/{id}
     */
    bikePointGet: (id: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace, any>({
        path: `/BikePoint/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags BikePoint
 * @name BikePointSearch
 * @summary Search for bike stations by their name, a bike point's name often contains information about the name of the street
            or nearby landmarks, for example. Note that the search result does not contain the PlaceProperties i.e. the status
            or occupancy of the BikePoint, to get that information you should retrieve the BikePoint by its id on /BikePoint/id.
 * @request GET:/BikePoint/Search
 */
    bikePointSearch: (query: BikePointSearchParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/BikePoint/Search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  cabwise = {
    /**
     * No description
     *
     * @tags Cabwise
     * @name CabwiseGet
     * @summary Gets taxis and minicabs contact information
     * @request GET:/Cabwise/search
     */
    cabwiseGet: (query: CabwiseGetParams, params: RequestParams = {}) =>
      this.request<SystemObject, any>({
        path: `/Cabwise/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  journey = {
    /**
     * No description
     *
     * @tags Journey
     * @name JourneyMeta
     * @summary Gets a list of all of the available journey planner modes
     * @request GET:/Journey/Meta/Modes
     */
    journeyMeta: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesMode[], any>({
        path: `/Journey/Meta/Modes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Journey
     * @name JourneyJourneyResults
     * @summary Perform a Journey Planner search from the parameters specified in simple types
     * @request GET:/Journey/JourneyResults/{from}/to/{to}
     */
    journeyJourneyResults: ({ from, to, ...query }: JourneyJourneyResultsParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesJourneyPlannerItineraryResult, any>({
        path: `/Journey/JourneyResults/${from}/to/${to}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  line = {
    /**
     * No description
     *
     * @tags Line
     * @name LineMetaModes
     * @summary Gets a list of valid modes
     * @request GET:/Line/Meta/Modes
     */
    lineMetaModes: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesMode[], any>({
        path: `/Line/Meta/Modes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineMetaSeverity
     * @summary Gets a list of valid severity codes
     * @request GET:/Line/Meta/Severity
     */
    lineMetaSeverity: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStatusSeverity[], any>({
        path: `/Line/Meta/Severity`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineMetaDisruptionCategories
     * @summary Gets a list of valid disruption categories
     * @request GET:/Line/Meta/DisruptionCategories
     */
    lineMetaDisruptionCategories: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/Line/Meta/DisruptionCategories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineMetaServiceTypes
     * @summary Gets a list of valid ServiceTypes to filter on
     * @request GET:/Line/Meta/ServiceTypes
     */
    lineMetaServiceTypes: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/Line/Meta/ServiceTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineGet
     * @summary Gets lines that match the specified line ids.
     * @request GET:/Line/{ids}
     */
    lineGet: (ids: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/${ids}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineGetByMode
     * @summary Gets lines that serve the given modes.
     * @request GET:/Line/Mode/{modes}
     */
    lineGetByMode: (modes: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/Mode/${modes}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineRoute
     * @summary Get all valid routes for all lines, including the name and id of the originating and terminating stops for each route.
     * @request GET:/Line/Route
     */
    lineRoute: (query: LineRouteParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/Route`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineLineRoutesByIds
     * @summary Get all valid routes for given line ids, including the name and id of the originating and terminating stops for each route.
     * @request GET:/Line/{ids}/Route
     */
    lineLineRoutesByIds: ({ ids, ...query }: LineLineRoutesByIdsParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/${ids}/Route`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineRouteByMode
     * @summary Gets all lines and their valid routes for given modes, including the name and id of the originating and terminating stops for each route
     * @request GET:/Line/Mode/{modes}/Route
     */
    lineRouteByMode: ({ modes, ...query }: LineRouteByModeParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/Mode/${modes}/Route`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineRouteSequence
     * @summary Gets all valid routes for given line id, including the sequence of stops on each route.
     * @request GET:/Line/{id}/Route/Sequence/{direction}
     */
    lineRouteSequence: ({ id, direction, ...query }: LineRouteSequenceParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRouteSequence, any>({
        path: `/Line/${id}/Route/Sequence/${direction}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineStatus
     * @summary Gets the line status for given line ids during the provided dates e.g Minor Delays
     * @request GET:/Line/{ids}/Status/{StartDate}/to/{EndDate}
     */
    lineStatus: ({ ids, startDate, endDate, ...query }: LineStatusParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/${ids}/Status/${startDate}/to/${endDate}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineStatusByIds
     * @summary Gets the line status of for given line ids e.g Minor Delays
     * @request GET:/Line/{ids}/Status
     */
    lineStatusByIds: ({ ids, ...query }: LineStatusByIdsParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/${ids}/Status`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineSearch
     * @summary Search for lines or routes matching the query string
     * @request GET:/Line/Search/{query}
     */
    lineSearch: ({ query, ...queryParams }: LineSearchParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRouteSearchResponse, any>({
        path: `/Line/Search/${query}`,
        method: "GET",
        query: queryParams,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Line
 * @name LineStatusBySeverity
 * @summary Gets the line status for all lines with a given severity
            A list of valid severity codes can be obtained from a call to Line/Meta/Severity
 * @request GET:/Line/Status/{severity}
 */
    lineStatusBySeverity: (severity: number, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/Status/${severity}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineStatusByMode
     * @summary Gets the line status of for all lines for the given modes
     * @request GET:/Line/Mode/{modes}/Status
     */
    lineStatusByMode: ({ modes, ...query }: LineStatusByModeParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLine[], any>({
        path: `/Line/Mode/${modes}/Status`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineStopPoints
     * @summary Gets a list of the stations that serve the given line id
     * @request GET:/Line/{id}/StopPoints
     */
    lineStopPoints: ({ id, ...query }: LineStopPointsParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/Line/${id}/StopPoints`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineTimetable
     * @summary Gets the timetable for a specified station on the give line
     * @request GET:/Line/{id}/Timetable/{fromStopPointId}
     */
    lineTimetable: (fromStopPointId: string, id: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesTimetableResponse, any>({
        path: `/Line/${id}/Timetable/${fromStopPointId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineTimetableTo
     * @summary Gets the timetable for a specified station on the give line with specified destination
     * @request GET:/Line/{id}/Timetable/{fromStopPointId}/to/{toStopPointId}
     */
    lineTimetableTo: (fromStopPointId: string, id: string, toStopPointId: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesTimetableResponse, any>({
        path: `/Line/${id}/Timetable/${fromStopPointId}/to/${toStopPointId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineDisruption
     * @summary Get disruptions for the given line ids
     * @request GET:/Line/{ids}/Disruption
     */
    lineDisruption: (ids: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesDisruption[], any>({
        path: `/Line/${ids}/Disruption`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineDisruptionByMode
     * @summary Get disruptions for all lines of the given modes.
     * @request GET:/Line/Mode/{modes}/Disruption
     */
    lineDisruptionByMode: (modes: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesDisruption[], any>({
        path: `/Line/Mode/${modes}/Disruption`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Line
     * @name LineArrivals
     * @summary Get the list of arrival predictions for given line ids based at the given stop
     * @request GET:/Line/{ids}/Arrivals/{stopPointId}
     */
    lineArrivals: ({ ids, stopPointId, ...query }: LineArrivalsParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPrediction[], any>({
        path: `/Line/${ids}/Arrivals/${stopPointId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  mode = {
    /**
 * No description
 *
 * @tags Mode
 * @name ModeGetActiveServiceTypes
 * @summary Returns the service type active for a mode.
            Currently only supports tube
 * @request GET:/Mode/ActiveServiceTypes
 */
    modeGetActiveServiceTypes: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesActiveServiceType[], any>({
        path: `/Mode/ActiveServiceTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mode
     * @name ModeArrivals
     * @summary Gets the next arrival predictions for all stops of a given mode
     * @request GET:/Mode/{mode}/Arrivals
     */
    modeArrivals: ({ mode, ...query }: ModeArrivalsParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPrediction[], any>({
        path: `/Mode/${mode}/Arrivals`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  occupancy = {
    /**
     * No description
     *
     * @tags Occupancy
     * @name OccupancyGet
     * @summary Gets the occupancy for a car park with a given id
     * @request GET:/Occupancy/CarPark/{id}
     */
    occupancyGet: (id: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesCarParkOccupancy, any>({
        path: `/Occupancy/CarPark/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Occupancy
     * @name OccupancyGet2
     * @summary Gets the occupancy for all car parks that have occupancy data
     * @request GET:/Occupancy/CarPark
     * @originalName occupancyGet
     * @duplicate
     */
    occupancyGet2: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesCarParkOccupancy[], any>({
        path: `/Occupancy/CarPark`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Occupancy
     * @name OccupancyGetChargeConnectorStatus
     * @summary Gets the occupancy for a charge connectors with a given id (sourceSystemPlaceId)
     * @request GET:/Occupancy/ChargeConnector/{ids}
     */
    occupancyGetChargeConnectorStatus: (ids: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesChargeConnectorOccupancy[], any>({
        path: `/Occupancy/ChargeConnector/${ids}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Occupancy
     * @name OccupancyGetAllChargeConnectorStatus
     * @summary Gets the occupancy for all charge connectors
     * @request GET:/Occupancy/ChargeConnector
     */
    occupancyGetAllChargeConnectorStatus: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesChargeConnectorOccupancy[], any>({
        path: `/Occupancy/ChargeConnector`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Occupancy
     * @name OccupancyGetBikePointsOccupancies
     * @summary Get the occupancy for bike points.
     * @request GET:/Occupancy/BikePoints/{ids}
     */
    occupancyGetBikePointsOccupancies: (ids: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesBikePointOccupancy[], any>({
        path: `/Occupancy/BikePoints/${ids}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  place = {
    /**
     * No description
     *
     * @tags Place
     * @name PlaceMetaCategories
     * @summary Gets a list of all of the available place property categories and keys.
     * @request GET:/Place/Meta/Categories
     */
    placeMetaCategories: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlaceCategory[], any>({
        path: `/Place/Meta/Categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Place
     * @name PlaceMetaPlaceTypes
     * @summary Gets a list of the available types of Place.
     * @request GET:/Place/Meta/PlaceTypes
     */
    placeMetaPlaceTypes: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlaceCategory[], any>({
        path: `/Place/Meta/PlaceTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Place
     * @name PlaceGetStreetsByPostCode
     * @summary Gets the set of streets associated with a post code.
     * @request GET:/Place/Address/Streets/{Postcode}
     */
    placeGetStreetsByPostCode: ({ postcode, ...query }: PlaceGetStreetsByPostCodeParams, params: RequestParams = {}) =>
      this.request<SystemObject, any>({
        path: `/Place/Address/Streets/${postcode}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Place
     * @name PlaceGetByType
     * @summary Gets all places of a given type
     * @request GET:/Place/Type/{types}
     */
    placeGetByType: ({ types, ...query }: PlaceGetByTypeParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/Place/Type/${types}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Place
     * @name PlaceGet
     * @summary Gets the place with the given id.
     * @request GET:/Place/{id}
     */
    placeGet: ({ id, ...query }: PlaceGetParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/Place/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Place
 * @name PlaceGetByGeo
 * @summary Gets the places that lie within a geographic region. The geographic region of interest can either be specified
            by using a lat/lon geo-point and a radius in metres to return places within the locus defined by the lat/lon of
            its centre or alternatively, by the use of a bounding box defined by the lat/lon of its north-west and south-east corners.
            Optionally filters on type and can strip properties for a smaller payload.
 * @request GET:/Place
 */
    placeGetByGeo: (query: PlaceGetByGeoParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/Place`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Place
 * @name PlaceGetAt
 * @summary Gets any places of the given type whose geography intersects the given latitude and longitude. In practice this means the Place
            must be polygonal e.g. a BoroughBoundary.
 * @request GET:/Place/{type}/At/{Lat}/{Lon}
 */
    placeGetAt: ({ type, lat, lon, ...query }: PlaceGetAtParams, params: RequestParams = {}) =>
      this.request<SystemObject, any>({
        path: `/Place/${type}/At/${lat}/${lon}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Place
     * @name PlaceGetOverlay
     * @summary Gets the place overlay for a given set of co-ordinates and a given width/height.
     * @request GET:/Place/{type}/overlay/{z}/{Lat}/{Lon}/{width}/{height}
     */
    placeGetOverlay: (
      { z, type, width, height, lat, lon, ...query }: PlaceGetOverlayParams,
      params: RequestParams = {},
    ) =>
      this.request<SystemObject, any>({
        path: `/Place/${type}/overlay/{z}/${lat}/${lon}/${width}/${height}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Place
     * @name PlaceSearch
     * @summary Gets all places that matches the given query
     * @request GET:/Place/Search
     */
    placeSearch: (query: PlaceSearchParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/Place/Search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  road = {
    /**
     * No description
     *
     * @tags Road
     * @name RoadGet
     * @summary Gets all roads managed by TfL
     * @request GET:/Road
     */
    roadGet: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRoadCorridor[], any>({
        path: `/Road`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadGet2
     * @summary Gets the road with the specified id (e.g. A1)
     * @request GET:/Road/{ids}
     * @originalName roadGet
     * @duplicate
     */
    roadGet2: (ids: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRoadCorridor[], any>({
        path: `/Road/${ids}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadStatus
     * @summary Gets the specified roads with the status aggregated over the date range specified, or now until the end of today if no dates are passed.
     * @request GET:/Road/{ids}/Status
     */
    roadStatus: ({ ids, ...query }: RoadStatusParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRoadCorridor[], any>({
        path: `/Road/${ids}/Status`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadDisruption
     * @summary Get active disruptions, filtered by road ids
     * @request GET:/Road/{ids}/Disruption
     */
    roadDisruption: ({ ids, ...query }: RoadDisruptionParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRoadDisruption[], any>({
        path: `/Road/${ids}/Disruption`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadDisruptedStreets
     * @summary Gets a list of disrupted streets. If no date filters are provided, current disruptions are returned.
     * @request GET:/Road/all/Street/Disruption
     */
    roadDisruptedStreets: (query: RoadDisruptedStreetsParams, params: RequestParams = {}) =>
      this.request<SystemObject, any>({
        path: `/Road/all/Street/Disruption`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadDisruptionById
     * @summary Gets a list of active disruptions filtered by disruption Ids.
     * @request GET:/Road/all/Disruption/{disruptionIds}
     */
    roadDisruptionById: ({ disruptionIds, ...query }: RoadDisruptionByIdParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesRoadDisruption, any>({
        path: `/Road/all/Disruption/${disruptionIds}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadMetaCategories
     * @summary Gets a list of valid RoadDisruption categories
     * @request GET:/Road/Meta/Categories
     */
    roadMetaCategories: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/Road/Meta/Categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Road
     * @name RoadMetaSeverities
     * @summary Gets a list of valid RoadDisruption severity codes
     * @request GET:/Road/Meta/Severities
     */
    roadMetaSeverities: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStatusSeverity[], any>({
        path: `/Road/Meta/Severities`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  search = {
    /**
 * No description
 *
 * @tags Search
 * @name SearchGet
 * @summary Search the site for occurrences of the query string. The maximum number of results returned is equal to the maximum page size
            of 100. To return subsequent pages, use the paginated overload.
 * @request GET:/Search
 */
    searchGet: (query: SearchGetParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesSearchResponse, any>({
        path: `/Search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search
     * @name SearchBusSchedules
     * @summary Searches the bus schedules folder on S3 for a given bus number.
     * @request GET:/Search/BusSchedules
     */
    searchBusSchedules: (query: SearchBusSchedulesParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesSearchResponse, any>({
        path: `/Search/BusSchedules`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search
     * @name SearchMetaSearchProviders
     * @summary Gets the available searchProvider names.
     * @request GET:/Search/Meta/SearchProviders
     */
    searchMetaSearchProviders: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/Search/Meta/SearchProviders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search
     * @name SearchMetaCategories
     * @summary Gets the available search categories.
     * @request GET:/Search/Meta/Categories
     */
    searchMetaCategories: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/Search/Meta/Categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Search
     * @name SearchMetaSorts
     * @summary Gets the available sorting options.
     * @request GET:/Search/Meta/Sorts
     */
    searchMetaSorts: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/Search/Meta/Sorts`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  stopPoint = {
    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointMetaCategories
     * @summary Gets the list of available StopPoint additional information categories
     * @request GET:/StopPoint/Meta/Categories
     */
    stopPointMetaCategories: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPointCategory[], any>({
        path: `/StopPoint/Meta/Categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointMetaStopTypes
     * @summary Gets the list of available StopPoint types
     * @request GET:/StopPoint/Meta/StopTypes
     */
    stopPointMetaStopTypes: (params: RequestParams = {}) =>
      this.request<string[], any>({
        path: `/StopPoint/Meta/StopTypes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointMetaModes
     * @summary Gets the list of available StopPoint modes
     * @request GET:/StopPoint/Meta/Modes
     */
    stopPointMetaModes: (params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesMode[], any>({
        path: `/StopPoint/Meta/Modes`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGet
     * @summary Gets a list of StopPoints corresponding to the given list of stop ids.
     * @request GET:/StopPoint/{ids}
     */
    stopPointGet: ({ ids, ...query }: StopPointGetParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/StopPoint/${ids}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGet2
     * @summary Get a list of places corresponding to a given id and place types.
     * @request GET:/StopPoint/{id}/placeTypes
     * @originalName stopPointGet
     * @duplicate
     */
    stopPointGet2: ({ id, ...query }: StopPointGet2Params, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/StopPoint/${id}/placeTypes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointCrowding
     * @summary Gets all the Crowding data (static) for the StopPointId, plus crowding data for a given line and optionally a particular direction.
     * @request GET:/StopPoint/{id}/Crowding/{line}
     */
    stopPointCrowding: ({ id, line, ...query }: StopPointCrowdingParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/StopPoint/${id}/Crowding/${line}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetByType
     * @summary Gets all stop points of a given type
     * @request GET:/StopPoint/Type/{types}
     */
    stopPointGetByType: (types: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/StopPoint/Type/${types}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetByTypeWithPagination
     * @summary Gets all the stop points of given type(s) with a page number
     * @request GET:/StopPoint/Type/{types}/page/{page}
     */
    stopPointGetByTypeWithPagination: (types: string[], page: number, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/StopPoint/Type/${types}/page/${page}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetServiceTypes
     * @summary Gets the service types for a given stoppoint
     * @request GET:/StopPoint/ServiceTypes
     */
    stopPointGetServiceTypes: (query: StopPointGetServiceTypesParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesLineServiceType[], any>({
        path: `/StopPoint/ServiceTypes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointArrivals
     * @summary Gets the list of arrival predictions for the given stop point id
     * @request GET:/StopPoint/{id}/Arrivals
     */
    stopPointArrivals: (id: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPrediction[], any>({
        path: `/StopPoint/${id}/Arrivals`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointArrivalDepartures
     * @summary Gets the list of arrival and departure predictions for the given stop point id (overground, Elizabeth line and thameslink only)
     * @request GET:/StopPoint/{id}/ArrivalDepartures
     */
    stopPointArrivalDepartures: ({ id, ...query }: StopPointArrivalDeparturesParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesArrivalDeparture[], any>({
        path: `/StopPoint/${id}/ArrivalDepartures`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointReachableFrom
     * @summary Gets Stopoints that are reachable from a station/line combination.
     * @request GET:/StopPoint/{id}/CanReachOnLine/{lineId}
     */
    stopPointReachableFrom: ({ id, lineId, ...query }: StopPointReachableFromParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPoint[], any>({
        path: `/StopPoint/${id}/CanReachOnLine/${lineId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointRoute
     * @summary Returns the route sections for all the lines that service the given stop point ids
     * @request GET:/StopPoint/{id}/Route
     */
    stopPointRoute: ({ id, ...query }: StopPointRouteParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPointRouteSection[], any>({
        path: `/StopPoint/${id}/Route`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointDisruptionByMode
     * @summary Gets a distinct list of disrupted stop points for the given modes
     * @request GET:/StopPoint/Mode/{modes}/Disruption
     */
    stopPointDisruptionByMode: ({ modes, ...query }: StopPointDisruptionByModeParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesDisruptedPoint[], any>({
        path: `/StopPoint/Mode/${modes}/Disruption`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointDisruption
     * @summary Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have.
     * @request GET:/StopPoint/{ids}/Disruption
     */
    stopPointDisruption: ({ ids, ...query }: StopPointDisruptionParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesDisruptedPoint[], any>({
        path: `/StopPoint/${ids}/Disruption`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointDirection
     * @summary Returns the canonical direction, "inbound" or "outbound", for a given pair of stop point Ids in the direction from -&gt; to.
     * @request GET:/StopPoint/{id}/DirectionTo/{toStopPointId}
     */
    stopPointDirection: ({ id, toStopPointId, ...query }: StopPointDirectionParams, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/StopPoint/${id}/DirectionTo/${toStopPointId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetByGeoPoint
     * @summary Gets a list of StopPoints within {radius} by the specified criteria
     * @request GET:/StopPoint
     */
    stopPointGetByGeoPoint: (query: StopPointGetByGeoPointParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPointsResponse, any>({
        path: `/StopPoint`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetByMode
     * @summary Gets a list of StopPoints filtered by the modes available at that StopPoint.
     * @request GET:/StopPoint/Mode/{modes}
     */
    stopPointGetByMode: ({ modes, ...query }: StopPointGetByModeParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesStopPointsResponse, any>({
        path: `/StopPoint/Mode/${modes}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointSearch
     * @summary Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code.
     * @request GET:/StopPoint/Search/{query}
     */
    stopPointSearch: ({ query, ...queryParams }: StopPointSearchParams, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesSearchResponse, any>({
        path: `/StopPoint/Search/${query}`,
        method: "GET",
        query: queryParams,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointSearch2
     * @summary Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code.
     * @request GET:/StopPoint/Search
     * @originalName stopPointSearch
     * @duplicate
     */
    stopPointSearch2: (query: StopPointSearch2Params, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesSearchResponse, any>({
        path: `/StopPoint/Search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetBySms
     * @summary Gets a StopPoint for a given sms code.
     * @request GET:/StopPoint/Sms/{id}
     */
    stopPointGetBySms: ({ id, ...query }: StopPointGetBySmsParams, params: RequestParams = {}) =>
      this.request<SystemObject, any>({
        path: `/StopPoint/Sms/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetTaxiRanksByIds
     * @summary Gets a list of taxi ranks corresponding to the given stop point id.
     * @request GET:/StopPoint/{stopPointId}/TaxiRanks
     */
    stopPointGetTaxiRanksByIds: (stopPointId: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/StopPoint/${stopPointId}/TaxiRanks`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags StopPoint
     * @name StopPointGetCarParksById
     * @summary Get car parks corresponding to the given stop point id.
     * @request GET:/StopPoint/{stopPointId}/CarParks
     */
    stopPointGetCarParksById: (stopPointId: string, params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPlace[], any>({
        path: `/StopPoint/${stopPointId}/CarParks`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  travelTimes = {
    /**
     * No description
     *
     * @tags TravelTime
     * @name TravelTimeGetOverlay
     * @summary Gets the TravelTime overlay.
     * @request GET:/TravelTimes/overlay/{z}/mapcenter/{mapCenterLat}/{mapCenterLon}/pinlocation/{pinLat}/{pinLon}/dimensions/{width}/{height}
     */
    travelTimeGetOverlay: (
      { z, pinLat, pinLon, mapCenterLat, mapCenterLon, width, height, ...query }: TravelTimeGetOverlayParams,
      params: RequestParams = {},
    ) =>
      this.request<SystemObject, any>({
        path: `/TravelTimes/overlay/{z}/mapcenter/${mapCenterLat}/${mapCenterLon}/pinlocation/${pinLat}/${pinLon}/dimensions/${width}/${height}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TravelTime
     * @name TravelTimeGetCompareOverlay
     * @summary Gets the TravelTime overlay.
     * @request GET:/TravelTimes/compareOverlay/{z}/mapcenter/{mapCenterLat}/{mapCenterLon}/pinlocation/{pinLat}/{pinLon}/dimensions/{width}/{height}
     */
    travelTimeGetCompareOverlay: (
      { z, pinLat, pinLon, mapCenterLat, mapCenterLon, width, height, ...query }: TravelTimeGetCompareOverlayParams,
      params: RequestParams = {},
    ) =>
      this.request<SystemObject, any>({
        path: `/TravelTimes/compareOverlay/{z}/mapcenter/${mapCenterLat}/${mapCenterLon}/pinlocation/${pinLat}/${pinLon}/dimensions/${width}/${height}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  vehicle = {
    /**
     * No description
     *
     * @tags Vehicle
     * @name VehicleGet
     * @summary Gets the predictions for a given list of vehicle Id's.
     * @request GET:/Vehicle/{ids}/Arrivals
     */
    vehicleGet: (ids: string[], params: RequestParams = {}) =>
      this.request<TflApiPresentationEntitiesPrediction[], any>({
        path: `/Vehicle/${ids}/Arrivals`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
