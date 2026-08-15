import type {
  TflApiPresentationEntitiesArrivalDeparture,
  TflApiPresentationEntitiesPrediction,
} from '../generated/types';

export type Prediction = TflApiPresentationEntitiesPrediction;

export type ArrivalCompassBound = 'eastbound' | 'westbound' | 'northbound' | 'southbound';

export type NormalizedArrivalDestination = {
  name?: string;
  source: 'towards' | 'destinationName' | 'none';
};

export type NormalizedArrivalPlatform = {
  raw?: string;
  /** Cleaned platform letter or number — never "Unknown". */
  label?: string;
  compassBound?: ArrivalCompassBound;
  /** True only for TfL's literal "Platform Unknown" (and close variants). */
  isUnknown: boolean;
};

export type NormalizedArrival = Prediction & {
  destination: NormalizedArrivalDestination;
  platform: NormalizedArrivalPlatform;
};

export type NormalizedArrivalDeparture = TflApiPresentationEntitiesArrivalDeparture & {
  platform: NormalizedArrivalPlatform;
};

const COMPASS_BOUNDS = new Set<string>([
  'eastbound',
  'westbound',
  'northbound',
  'southbound',
]);

const COMPASS_BOUND_RE = /^(northbound|southbound|eastbound|westbound)\b/i;

const toCompassBound = (value: string | undefined): ArrivalCompassBound | undefined => {
  if (!value) return undefined;
  const id = value.toLowerCase();
  return COMPASS_BOUNDS.has(id) ? (id as ArrivalCompassBound) : undefined;
};

/**
 * TfL sometimes sends the literal string `"null"` (Liverpool Street bus
 * arrivals) instead of omitting the field. Treat that as empty.
 */
const usableArrivalText = (value?: string): string | undefined => {
  const trimmed = value?.trim();
  if (!trimmed || /^(null|undefined)$/i.test(trimmed)) return undefined;
  return trimmed;
};

/**
 * Prefer a non-empty `towards`, then `destinationName`.
 * TfL often sends `towards: ""` for Elizabeth line and Overground,
 * and `towards: "null"` on some bus terminus predictions.
 */
export const resolveArrivalDestination = (
  prediction: Pick<Prediction, 'towards' | 'destinationName'>
): NormalizedArrivalDestination => {
  const towards = usableArrivalText(prediction.towards);
  if (towards) return { name: towards, source: 'towards' };
  const destinationName = usableArrivalText(prediction.destinationName);
  if (destinationName) return { name: destinationName, source: 'destinationName' };
  return { source: 'none' };
};

/**
 * Parse a TfL `platformName` into a compass bound and a cleaned label.
 * Drops the literal "Unknown" so it never becomes a platform chip.
 */
export const parseArrivalPlatform = (platformName?: string): NormalizedArrivalPlatform => {
  if (platformName == null) {
    return { isUnknown: false };
  }

  const trimmed = platformName.trim();
  if (!trimmed) {
    return { raw: platformName, isUnknown: false };
  }

  const compassBound = toCompassBound(trimmed.match(COMPASS_BOUND_RE)?.[1]);
  const isUnknown = /\bunknown\b/i.test(trimmed);
  if (isUnknown) {
    return { raw: trimmed, compassBound, isUnknown: true };
  }

  const stripped = trimmed
    .replace(COMPASS_BOUND_RE, '')
    .replace(/^\s*[-–—:]\s*/, '')
    .replace(/^platform\s+/i, '')
    .trim();

  return {
    raw: trimmed,
    label: stripped || undefined,
    compassBound,
    isUnknown: false,
  };
};

export const normalizeArrival = (prediction: Prediction): NormalizedArrival => ({
  ...prediction,
  destination: resolveArrivalDestination(prediction),
  platform: parseArrivalPlatform(prediction.platformName),
});

export const normalizeArrivals = (predictions: Prediction[]): NormalizedArrival[] =>
  predictions.map(normalizeArrival);

export const normalizeArrivalDeparture = (
  arrivalDeparture: TflApiPresentationEntitiesArrivalDeparture
): NormalizedArrivalDeparture => ({
  ...arrivalDeparture,
  platform: parseArrivalPlatform(arrivalDeparture.platformName),
});
