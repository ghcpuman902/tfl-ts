import type { Prediction } from './index';

/**
 * Countdown maths for arrival boards: project from TfL's own timestamp, err early,
 * never tick up, keep "Due" a few seconds past arrival. Pure: no HTTP, no timers.
 */
export interface CountdownOptions {
  /** Shift every projected arrival; negative shows it earlier. Default 0 (the presets use -15 s bus, -10 s rail). */
  projectionOffsetMs?: number;
  /** Keep a row "Due" this long past its projected arrival before it goes. Default 10_000, clamped 0–30_000. */
  dueGraceMs?: number;
  /** Below this time to go the row says "Due". Default 60_000. */
  dueThresholdMs?: number;
  /** "floor" (default, errs early) or "nearest". */
  rounding?: 'floor' | 'nearest';
  /** Smoothing: ignore later revisions smaller than this. Default 30_000. */
  laterRevisionIgnoreMs?: number;
  /** Smoothing: a later revision slides in at most this many ms per second. Default 500. */
  laterRevisionRateMsPerSec?: number;
  /** Smoothing: an earlier revision is released over this long (a larger drop runs faster). Default 10_000. */
  earlierRevisionReleaseMs?: number;
}

export const COUNTDOWN_DEFAULTS: Required<CountdownOptions> = {
  projectionOffsetMs: 0,
  dueGraceMs: 10_000,
  dueThresholdMs: 60_000,
  rounding: 'floor',
  laterRevisionIgnoreMs: 30_000,
  laterRevisionRateMsPerSec: 500,
  earlierRevisionReleaseMs: 10_000,
};

export const COUNTDOWN_PRESETS: { bus: CountdownOptions; rail: CountdownOptions } = {
  bus: { projectionOffsetMs: -15_000 },
  rail: { projectionOffsetMs: -10_000 },
};

export type CountdownLabel = 'Due' | `${number} min`;

export interface CountdownRow {
  key: string;
  /** Smoothed arrival, epoch ms, with the projection offset applied. */
  arrivalMs: number;
  /** Seconds to go (never below 0). */
  secondsLeft: number;
  label: CountdownLabel;
  /** The prediction this row was last updated from. */
  prediction: Prediction;
}

const resolve = (options?: CountdownOptions): Required<CountdownOptions> => {
  const merged = { ...COUNTDOWN_DEFAULTS };
  for (const [k, v] of Object.entries(options ?? {})) {
    if (v !== undefined) (merged as Record<string, unknown>)[k] = v;
  }
  merged.dueGraceMs = Math.min(30_000, Math.max(0, merged.dueGraceMs));
  return merged;
};

/** Arrival epoch ms: `expectedArrival`, else `timestamp + timeToStation`. Never counts from your fetch time. */
export function predictionArrivalMs(
  p: Pick<Prediction, 'expectedArrival' | 'timestamp' | 'timeToStation'>,
): number | undefined {
  const expected = Date.parse(p.expectedArrival ?? '');
  if (Number.isFinite(expected)) return expected;
  const stamp = Date.parse(p.timestamp ?? '');
  if (Number.isFinite(stamp) && typeof p.timeToStation === 'number') return stamp + p.timeToStation * 1000;
  return undefined;
}

const labelFor = (leftMs: number, o: Required<CountdownOptions>): CountdownLabel => {
  if (leftMs < o.dueThresholdMs) return 'Due';
  const minutes = o.rounding === 'nearest' ? Math.round(leftMs / 60_000) : Math.floor(leftMs / 60_000);
  return `${minutes} min`;
};

/** Stateless label for one arrival (no smoothing). `null` once the row is past its Due grace. */
export function countdownLabel(
  arrivalMs: number,
  nowMs: number,
  options?: CountdownOptions,
): CountdownLabel | null {
  const o = resolve(options);
  if (nowMs > arrivalMs + o.dueGraceMs) return null;
  return labelFor(arrivalMs + o.projectionOffsetMs - nowMs, o);
}

type Entry = {
  /** Shown arrival (before the offset). */
  shown: number;
  /** Where `shown` is heading. */
  target: number;
  /** Last prediction timestamp used. */
  stamp: number;
  /** A later revision seen once, waiting for a second poll to agree. */
  pendingLater?: number;
  advancedAt: number;
  prediction: Prediction;
};

const keyOf = (p: Prediction): string | undefined => {
  const vehicle = p.vehicleId || p.id;
  if (!vehicle) return undefined;
  return [p.naptanId ?? '', p.lineId ?? '', p.platformName ?? '', vehicle].join('|');
};

/**
 * Stateful per-vehicle smoother. Key = stop | line | platform | vehicle.
 * An earlier revision is accepted at once (released over a few seconds), a later one is held
 * unless two polls in a row agree (then it slides in slowly), so a countdown never ticks up.
 */
export function createCountdownTracker(options?: CountdownOptions): {
  ingest(predictions: readonly Prediction[], serverNowMs: number, clientNowMs?: number): void;
  view(nowMs: number): CountdownRow[];
} {
  const o = resolve(options);
  const entries = new Map<string, Entry>();
  let clockOffset: number | undefined;

  const advance = (e: Entry, now: number): void => {
    const dt = Math.max(0, now - e.advancedAt);
    e.advancedAt = now;
    if (e.shown === e.target) return;
    if (e.target < e.shown) {
      const drop = e.shown - e.target;
      // Release over earlierRevisionReleaseMs; the screen clock already runs 1 s/s, this adds extra.
      const extraPerMs = Math.max(1, drop / Math.max(1, o.earlierRevisionReleaseMs));
      e.shown = Math.max(e.target, e.shown - dt * extraPerMs);
    } else {
      e.shown = Math.min(e.target, e.shown + (dt * o.laterRevisionRateMsPerSec) / 1000);
    }
  };

  return {
    ingest(predictions, serverNowMs, clientNowMs = Date.now()): void {
      const sample = serverNowMs - clientNowMs;
      clockOffset = clockOffset === undefined ? sample : clockOffset * 0.5 + sample * 0.5;
      for (const p of predictions) {
        const key = keyOf(p);
        const arrival = predictionArrivalMs(p);
        if (!key || arrival === undefined) continue;
        const stamp = Date.parse(p.timestamp ?? '');
        const stampMs = Number.isFinite(stamp) ? stamp : serverNowMs;
        const e = entries.get(key);
        if (!e) {
          entries.set(key, {
            shown: arrival,
            target: arrival,
            stamp: stampMs,
            advancedAt: serverNowMs,
            prediction: p,
          });
          continue;
        }
        e.prediction = p;
        if (stampMs <= e.stamp) continue; // TfL has not recomputed it
        e.stamp = stampMs;
        advance(e, serverNowMs);
        const toGo = arrival + o.projectionOffsetMs - serverNowMs;
        if (arrival < e.shown) {
          e.pendingLater = undefined;
          if (toGo < o.dueThresholdMs) e.shown = arrival; // safety: never show Due late
          e.target = arrival;
        } else if (arrival - e.shown < o.laterRevisionIgnoreMs) {
          e.pendingLater = undefined;
          if (e.target > e.shown) e.target = e.shown;
        } else if (e.pendingLater !== undefined && arrival - e.pendingLater < o.laterRevisionIgnoreMs) {
          e.target = arrival; // confirmed twice
          e.pendingLater = undefined;
        } else {
          e.pendingLater = arrival;
        }
      }
    },
    view(nowMs): CountdownRow[] {
      const now = nowMs + (clockOffset ?? 0);
      const rows: CountdownRow[] = [];
      for (const [key, e] of entries) {
        advance(e, now);
        if (now > e.shown + o.dueGraceMs) {
          entries.delete(key);
          continue;
        }
        const arrivalMs = e.shown + o.projectionOffsetMs;
        const left = arrivalMs - now;
        rows.push({
          key,
          arrivalMs,
          secondsLeft: Math.max(0, Math.floor(left / 1000)),
          label: labelFor(left, o),
          prediction: e.prediction,
        });
      }
      return rows.sort((a, b) => a.arrivalMs - b.arrivalMs);
    },
  };
}
