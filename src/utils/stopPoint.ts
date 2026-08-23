import type { TflApiPresentationEntitiesStopPoint } from '../generated/types';

/**
 * Identity fields we lift off StopPoint `additionalProperties`.
 * `Towards` and `CompassPoint` are the Direction keys from
 * `GET /StopPoint/Meta/Categories`. `smsCode` is first-class on StopPoint
 * and is sometimes only present as `SmsCode` in the bag.
 *
 * Do not confuse `compassPoint` with Prediction.`bearing` (vehicle heading
 * 0–359). There is no StopPoint `Bearing` additional-property key.
 */
export type StopPointLike = {
  towards?: string;
  smsCode?: string;
  indicator?: string;
  stopLetter?: string;
  additionalProperties?: Array<{ key?: string; value?: string }>;
  children?: StopPointLike[];
};

export type NormalizedStopPointFields = {
  /** Destination wording. From `towards` or additionalProperties `Towards`. */
  towards?: string;
  /**
   * Stop flag compass (`N`, `NE`, …). From additionalProperties
   * `CompassPoint`, or a `->N`-style indicator when TfL could not cleanse
   * a painted stop letter.
   */
  compassPoint?: string;
  /** Degrees clockwise from north for {@link compassPoint}. */
  compassBearingDegrees?: number;
  /** Five-digit countdown code. First-class `smsCode` or bag `SmsCode`. */
  smsCode?: string;
};

export type NormalizedStopPoint<T extends StopPointLike = TflApiPresentationEntitiesStopPoint> =
  T & NormalizedStopPointFields;

const COMPASS_DEGREES: Record<string, number> = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

const COMPASS_TOKEN = 'N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW';
const COMPASS_POINT_RE = new RegExp(`^(${COMPASS_TOKEN})$`, 'i');
const COMPASS_ARROW_RE = new RegExp(`^->(${COMPASS_TOKEN})$`, 'i');

/**
 * TfL sometimes sends the literal string `"null"` instead of omitting a field.
 */
const usableText = (value?: string | null): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed || /^(null|undefined)$/i.test(trimmed)) return undefined;
  return trimmed;
};

const readProp = (
  properties: StopPointLike['additionalProperties'],
  key: string
): string | undefined => {
  const value = properties?.find((prop) => prop.key?.toLowerCase() === key.toLowerCase())?.value;
  return usableText(value);
};

const compassFromToken = (token: string): NormalizedStopPointFields | undefined => {
  const compassPoint = token.toUpperCase();
  const degrees = COMPASS_DEGREES[compassPoint];
  if (degrees === undefined) return undefined;
  return { compassPoint, compassBearingDegrees: degrees };
};

/**
 * Parse a CompassPoint bag value (`NE`, `W`) or a `->W` indicator.
 * Bare painted letters belong on `stopLetter` — do not pass those here.
 */
export const parseCompassPoint = (raw?: string | null): NormalizedStopPointFields | undefined => {
  const trimmed = usableText(raw)?.replace(/\s+/g, '');
  if (!trimmed) return undefined;
  const point = trimmed.match(COMPASS_POINT_RE)?.[1];
  if (point) return compassFromToken(point);
  const arrow = trimmed.match(COMPASS_ARROW_RE)?.[1];
  if (arrow) return compassFromToken(arrow);
  return undefined;
};

const compassFromIndicator = (raw?: string | null): NormalizedStopPointFields | undefined => {
  const trimmed = usableText(raw)?.replace(/\s+/g, '');
  if (!trimmed) return undefined;
  const arrow = trimmed.match(COMPASS_ARROW_RE)?.[1];
  return arrow ? compassFromToken(arrow) : undefined;
};

/**
 * Lift Direction / SMS fields onto the StopPoint. Leaves Facility,
 * Accessibility, and the rest of `additionalProperties` untouched.
 *
 * `get()` / `getByGeoPoint` apply this. `client.raw.stopPoint.*` does not.
 */
export const normalizeStopPoint = <T extends StopPointLike>(stop: T): NormalizedStopPoint<T> => {
  const towards = usableText(stop.towards) ?? readProp(stop.additionalProperties, 'Towards');
  const smsCode = usableText(stop.smsCode) ?? readProp(stop.additionalProperties, 'SmsCode');
  const compass =
    parseCompassPoint(readProp(stop.additionalProperties, 'CompassPoint')) ??
    compassFromIndicator(stop.indicator) ??
    compassFromIndicator(stop.stopLetter);

  const children = stop.children?.map((child) => normalizeStopPoint(child));

  return {
    ...stop,
    towards,
    smsCode,
    compassPoint: compass?.compassPoint,
    compassBearingDegrees: compass?.compassBearingDegrees,
    ...(children ? { children } : {}),
  };
};

export const normalizeStopPoints = <T extends StopPointLike>(
  stops: T[]
): NormalizedStopPoint<T>[] => stops.map(normalizeStopPoint);
