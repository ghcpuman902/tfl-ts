/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
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
  wellKnownBinary?: Blob;
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
  /** @format int32 */
  travelTime?: number;
  atcoCode?: string;
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
  startElevation?: number;
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
  closureText?: string;
  concernedLines?: TflApiPresentationEntitiesConcernedLine[];
}

/** Represents a line concerned by a disruption with its direction */
export interface TflApiPresentationEntitiesConcernedLine {
  /** The ID of the concerned line (e.g., "piccadilly", "district") */
  id?: string;
  /** The direction of travel affected (e.g., "Inbound", "Outbound") */
  direction?: string;
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

export type TflApiPresentationEntitiesJourneyPlannerSearchCriteriaDateTimeTypeEnum =
  | "Arriving"
  | "Departing";

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
  | "Cycleways"
  | "CycleSuperHighway"
  | "CanalTowpath"
  | "QuietRoad"
  | "ProvisionForCyclists"
  | "BusyRoads"
  | "None"
  | "PushBike"
  | "Quietway"
  | "ShuttleBus"
  | "Ferry"
  | "CableCar";

export type TflApiPresentationEntitiesStopPointSequenceServiceTypeEnum =
  | "Regular"
  | "Night";

export type TflApiPresentationEntitiesPeriodTypeEnum =
  | "Normal"
  | "FrequencyHours"
  | "FrequencyMinutes"
  | "Unknown";

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

/** Does the time given relate to arrival or leaving time? Possible options: "departing" | "arriving" */
export type JourneyJourneyResultsParamsTimeIsEnum = "Arriving" | "Departing";

/** The journey preference eg possible options: "leastinterchange" | "leasttime" | "leastwalking" */
export type JourneyJourneyResultsParamsJourneyPreferenceEnum =
  | "LeastInterchange"
  | "LeastTime"
  | "LeastWalking";

export type JourneyJourneyResultsParamsAccessibilityPreferenceEnum =
  | "NoRequirements"
  | "NoSolidStairs"
  | "NoEscalators"
  | "NoElevators"
  | "StepFreeToVehicle"
  | "StepFreeToPlatform";

/** The walking speed. eg possible options: "slow" | "average" | "fast". */
export type JourneyJourneyResultsParamsWalkingSpeedEnum =
  | "Slow"
  | "Average"
  | "Fast";

/** The cycle preference. eg possible options: "allTheWay" | "leaveAtStation" | "takeOnTransport" | "cycleHire" */
export type JourneyJourneyResultsParamsCyclePreferenceEnum =
  | "None"
  | "LeaveAtStation"
  | "TakeOnTransport"
  | "AllTheWay"
  | "CycleHire";

export type JourneyJourneyResultsParamsBikeProficiencyEnum =
  | "Easy"
  | "Moderate"
  | "Fast";

export type LineRouteParamsServiceTypesEnum = "Regular" | "Night";

export type LineLineRoutesByIdsParamsServiceTypesEnum = "Regular" | "Night";

export type LineRouteByModeParamsServiceTypesEnum = "Regular" | "Night";

export type LineRouteSequenceParamsServiceTypesEnum = "Regular" | "Night";

/** The direction of travel. Can be inbound or outbound. */
export type LineRouteSequenceParamsDirectionEnum =
  | "inbound"
  | "outbound"
  | "all";

export type LineRouteSequenceParamsEnum = "inbound" | "outbound" | "all";

export type LineSearchParamsServiceTypesEnum = "Regular" | "Night";

/** Optional. The direction of travel. Can be inbound or outbound or all. If left blank, and destinationStopId is set, will default to all */
export type LineArrivalsParamsDirectionEnum = "inbound" | "outbound" | "all";

/** The direction of travel. Can be inbound or outbound. */
export type StopPointCrowdingParamsDirectionEnum =
  | "inbound"
  | "outbound"
  | "all";

export type StopPointReachableFromParamsServiceTypesEnum = "Regular" | "Night";

export type StopPointRouteParamsServiceTypesEnum = "Regular" | "Night";

/** The direction of travel. */
export type TravelTimeGetOverlayParamsDirectionEnum = "Average" | "From" | "To";

/** The direction of travel. */
export type TravelTimeGetCompareOverlayParamsDirectionEnum =
  | "Average"
  | "From"
  | "To";
