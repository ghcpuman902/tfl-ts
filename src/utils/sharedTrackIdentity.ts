import { LINE_STATION_SEQUENCES } from '../generated/meta/StationSequence';
import type { StaticLineId } from '../generated/meta/StationSequence';
import { normalizeLineId } from './ui';
import type { Prediction } from './arrivals';

export type SharedTrackConfidence = 'exclusive-segment' | 'ambiguous';

export type SharedTrackSegments = {
  /** lineId → station ids that appear on only that line among the given set */
  exclusive: Map<string, Set<string>>;
  /** station ids that appear on two or more of the given lines */
  shared: Set<string>;
  /** station id → line ids from the given set that serve it */
  linesByStation: Map<string, readonly string[]>;
};

export type SharedTrackVehicleIdentity = {
  vehicleId: string;
  canonicalLineId?: string;
  confidence: SharedTrackConfidence;
  rawLineIds: readonly string[];
};

export type SharedTrackIdentity =
  | {
      confidence: 'exclusive-segment';
      canonicalLineId: string;
      rawLineId?: string;
      rawLineIds?: readonly string[];
    }
  | {
      confidence: 'ambiguous';
      rawLineIds: readonly string[];
      rawLineId?: string;
    };

export type PredictionWithSharedTrackIdentity = Prediction & {
  sharedTrackIdentity?: SharedTrackIdentity;
};

const stationIdsForLine = (lineId: string): Set<string> => {
  const normalised = normalizeLineId(lineId);
  const sequence = (LINE_STATION_SEQUENCES as Record<string, (typeof LINE_STATION_SEQUENCES)[StaticLineId]>)[
    normalised
  ];
  const ids = new Set<string>();
  if (!sequence) return ids;
  for (const station of sequence.stations) {
    ids.add(station.id);
  }
  for (const branch of sequence.branches) {
    for (const stationId of branch.stationIds) {
      ids.add(stationId);
    }
  }
  return ids;
};

/**
 * Classify every station touched by the given lines as exclusive to one line
 * or shared by two or more. Built from `LINE_STATION_SEQUENCES` — no network.
 */
export const getSharedTrackSegments = (
  lineIds: readonly string[]
): SharedTrackSegments => {
  const exclusive = new Map<string, Set<string>>();
  const shared = new Set<string>();
  const linesByStation = new Map<string, readonly string[]>();
  const normalisedIds = [
    ...new Set(lineIds.map((id) => normalizeLineId(id)).filter(Boolean)),
  ];

  const lineCountByStation = new Map<string, Set<string>>();

  for (const lineId of normalisedIds) {
    const stations = stationIdsForLine(lineId);
    exclusive.set(lineId, new Set());
    for (const stationId of stations) {
      const lines = lineCountByStation.get(stationId) ?? new Set();
      lines.add(lineId);
      lineCountByStation.set(stationId, lines);
    }
  }

  for (const [stationId, lines] of lineCountByStation) {
    const ids = [...lines];
    linesByStation.set(stationId, ids);
    if (ids.length === 1) {
      exclusive.get(ids[0])?.add(stationId);
    } else {
      shared.add(stationId);
    }
  }

  return { exclusive, shared, linesByStation };
};

const exclusiveLineByStation = (
  segments: SharedTrackSegments
): Map<string, string> => {
  const byStation = new Map<string, string>();
  for (const [lineId, stations] of segments.exclusive) {
    for (const stationId of stations) {
      byStation.set(stationId, lineId);
    }
  }
  return byStation;
};

/**
 * Group predictions by `vehicleId` and pick a canonical line only when the
 * vehicle also appears at a station exclusive to one of `lineIds`.
 * No exclusive-segment evidence → `ambiguous` (leave TfL's raw label alone).
 */
export const resolveSharedTrackIdentity = (
  predictions: readonly Prediction[],
  lineIds: readonly string[]
): Map<string, SharedTrackVehicleIdentity> => {
  const segments = getSharedTrackSegments(lineIds);
  const stationToLine = exclusiveLineByStation(segments);
  const byVehicle = new Map<string, Prediction[]>();

  for (const prediction of predictions) {
    const vehicleId = prediction.vehicleId?.trim();
    if (!vehicleId) continue;
    const rows = byVehicle.get(vehicleId);
    if (rows) rows.push(prediction);
    else byVehicle.set(vehicleId, [prediction]);
  }

  const identities = new Map<string, SharedTrackVehicleIdentity>();
  for (const [vehicleId, rows] of byVehicle) {
    const rawLineIds = [
      ...new Set(
        rows
          .map((row) => (row.lineId ? normalizeLineId(row.lineId) : ''))
          .filter(Boolean)
      ),
    ];
    const exclusiveHits = new Set<string>();
    for (const row of rows) {
      const naptanId = row.naptanId?.trim();
      if (!naptanId) continue;
      const exclusiveLine = stationToLine.get(naptanId);
      if (exclusiveLine) exclusiveHits.add(exclusiveLine);
    }

    if (exclusiveHits.size === 1) {
      const [canonicalLineId] = exclusiveHits;
      identities.set(vehicleId, {
        vehicleId,
        canonicalLineId,
        confidence: 'exclusive-segment',
        rawLineIds,
      });
      continue;
    }

    identities.set(vehicleId, {
      vehicleId,
      confidence: 'ambiguous',
      rawLineIds,
    });
  }

  return identities;
};

/**
 * Tag predictions with an additive `sharedTrackIdentity`. Raw `lineId` /
 * `lineName` stay as TfL sent them.
 *
 * Exclusive-segment evidence → `canonicalLineId`. Vehicles seen on two or
 * more of `lineIds` with no exclusive hit → `ambiguous` + `rawLineIds`
 * (for a multi-line chip). Single-line rows with no exclusive evidence stay
 * untagged.
 *
 * Pass `evidence` when the rows to tag are a subset (one stop) of a
 * network-wide poll used to classify vehicles.
 */
export const withSharedTrackIdentity = (
  predictions: readonly Prediction[],
  lineIds: readonly string[],
  evidence: readonly Prediction[] = predictions
): PredictionWithSharedTrackIdentity[] => {
  const identities = resolveSharedTrackIdentity(evidence, lineIds);
  const lineSet = new Set(
    lineIds.map((id) => normalizeLineId(id)).filter(Boolean)
  );
  return predictions.map((prediction) => {
    const rawLine = prediction.lineId ? normalizeLineId(prediction.lineId) : '';
    if (!rawLine || !lineSet.has(rawLine)) return prediction;
    const vehicleId = prediction.vehicleId?.trim();
    if (!vehicleId) return prediction;
    const identity = identities.get(vehicleId);
    if (!identity) return prediction;

    const existing = (prediction as PredictionWithSharedTrackIdentity)
      .sharedTrackIdentity;
    if (
      existing?.confidence === 'exclusive-segment' &&
      identity.confidence !== 'exclusive-segment'
    ) {
      return prediction;
    }

    if (identity.confidence === 'exclusive-segment' && identity.canonicalLineId) {
      return {
        ...prediction,
        sharedTrackIdentity: {
          canonicalLineId: identity.canonicalLineId,
          confidence: 'exclusive-segment',
          rawLineId: prediction.lineId,
          rawLineIds: identity.rawLineIds,
        },
      };
    }

    if (identity.confidence === 'ambiguous' && identity.rawLineIds.length >= 2) {
      return {
        ...prediction,
        sharedTrackIdentity: {
          confidence: 'ambiguous',
          rawLineId: prediction.lineId,
          rawLineIds: identity.rawLineIds,
        },
      };
    }

    return prediction;
  });
};
