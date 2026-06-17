import { RawClient } from '../generated/raw';
import type { TflApiPresentationEntitiesPrediction } from '../generated/types';
import { TflHttpError } from '../errors';

export type Prediction = TflApiPresentationEntitiesPrediction;

export type ArrivalSortBy = 'timeToStation' | 'lineName' | 'destinationName';
export type ArrivalSortOrder = 'asc' | 'desc';

export interface PollMeta {
  fetchedAt: Date;
  stopPointIds: string[];
  hadDeletions: boolean;
  tick: number;
}

export interface BasePollOptions {
  lineIds?: string[];
  sortBy?: ArrivalSortBy;
  sortOrder?: ArrivalSortOrder;
  intervalMs?: number;
  immediate?: boolean;
  signal?: AbortSignal;
  keepTflTypes?: boolean;
}

export interface PollArrivalsOptions extends BasePollOptions {
  /** Single stop (back-compat). Use `stopPointIds` for multiple stops. */
  stopPointId?: string;
  stopPointIds?: string[];
}

export interface PollLineArrivalsOptions extends BasePollOptions {
  lineIds: string[];
  stopPointId: string;
  direction?: 'inbound' | 'outbound' | 'all';
}

export interface PollVehicleArrivalsOptions extends BasePollOptions {
  vehicleIds: string[];
}

export type OnArrivals = (
  arrivals: Prediction[],
  meta: PollMeta,
) => void | Promise<void>;

export type OnPollError = (error: unknown, meta: PollMeta) => void;

export type PollArrivalsUnsubscribe = () => void;

const DEFAULT_INTERVAL_MS = 30_000;
const MIN_RECOMMENDED_INTERVAL_MS = 10_000;
const MAX_BACKOFF_MS = 5 * 60 * 1000;
const INITIAL_BACKOFF_MS = 5_000;

const resolveStopPointIds = (options: PollArrivalsOptions): string[] => {
  if (options.stopPointIds?.length) {
    return options.stopPointIds;
  }
  if (options.stopPointId) {
    return [options.stopPointId];
  }
  throw new Error('pollArrivals requires stopPointId or stopPointIds');
};

const sortArrivals = (
  arrivals: Prediction[],
  sortBy?: ArrivalSortBy,
  sortOrder: ArrivalSortOrder = 'asc',
): Prediction[] => {
  if (!sortBy) {
    return arrivals;
  }

  const multiplier = sortOrder === 'desc' ? -1 : 1;

  return [...arrivals].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'timeToStation':
        aValue = a.timeToStation ?? 0;
        bValue = b.timeToStation ?? 0;
        break;
      case 'lineName':
        aValue = a.lineName ?? '';
        bValue = b.lineName ?? '';
        break;
      case 'destinationName':
        aValue = a.destinationName ?? '';
        bValue = b.destinationName ?? '';
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * multiplier;
    }

    return ((aValue as number) - (bValue as number)) * multiplier;
  });
};

const processArrivals = (
  raw: Prediction[],
  options: BasePollOptions,
): { arrivals: Prediction[]; hadDeletions: boolean } => {
  const hadDeletions = raw.some((arrival) => arrival.operationType === 2);
  let arrivals = raw.filter((arrival) => arrival.operationType !== 2);

  if (options.lineIds?.length) {
    arrivals = arrivals.filter((arrival) =>
      options.lineIds!.includes(arrival.lineId ?? ''),
    );
  }

  arrivals = sortArrivals(arrivals, options.sortBy, options.sortOrder);

  return { arrivals, hadDeletions };
};

const shouldBackoff = (error: unknown): boolean =>
  error instanceof TflHttpError &&
  (error.isRateLimitError() || error.isServerError());

interface PollerConfig<TOptions extends BasePollOptions> {
  raw: RawClient;
  options: TOptions;
  stopPointIds: string[];
  intervalMs: number;
  immediate: boolean;
  fetchPredictions: (
    signal: AbortSignal,
    options: TOptions,
  ) => Promise<Prediction[]>;
  onUpdate: OnArrivals;
  onError?: OnPollError;
}

const createPoller = <TOptions extends BasePollOptions>(
  config: PollerConfig<TOptions>,
): PollArrivalsUnsubscribe => {
  const {
    options,
    stopPointIds,
    intervalMs,
    immediate,
    fetchPredictions,
    onUpdate,
    onError,
  } = config;

  let active = true;
  let tick = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let inFlightController: AbortController | undefined;
  let backoffMs = 0;

  const clearScheduled = (): void => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  const abortInFlight = (): void => {
    inFlightController?.abort();
    inFlightController = undefined;
  };

  const scheduleNext = (delayMs: number): void => {
    if (!active) {
      return;
    }
    clearScheduled();
    timeoutId = setTimeout(() => {
      void runTick();
    }, delayMs);
  };

  const runTick = async (): Promise<void> => {
    if (!active) {
      return;
    }

    const controller = new AbortController();
    inFlightController = controller;

    if (options.signal) {
      if (options.signal.aborted) {
        return;
      }
      options.signal.addEventListener(
        'abort',
        () => controller.abort(),
        { once: true },
      );
    }

    const currentTick = tick;
    tick += 1;

    try {
      const rawArrivals = await fetchPredictions(controller.signal, options);
      if (!active) {
        return;
      }

      const { arrivals, hadDeletions } = processArrivals(rawArrivals, options);
      await onUpdate(arrivals, {
        fetchedAt: new Date(),
        stopPointIds,
        hadDeletions,
        tick: currentTick,
      });
      backoffMs = 0;
    } catch (error) {
      if (!active || controller.signal.aborted) {
        return;
      }

      onError?.(error, {
        fetchedAt: new Date(),
        stopPointIds,
        hadDeletions: false,
        tick: currentTick,
      });

      if (shouldBackoff(error)) {
        backoffMs = backoffMs === 0 ? INITIAL_BACKOFF_MS : Math.min(backoffMs * 2, MAX_BACKOFF_MS);
      }
    } finally {
      if (inFlightController === controller) {
        inFlightController = undefined;
      }
    }

    if (!active) {
      return;
    }

    const delay = backoffMs > 0 ? backoffMs : intervalMs;
    scheduleNext(delay);
  };

  if (intervalMs < MIN_RECOMMENDED_INTERVAL_MS) {
    console.warn(
      `pollArrivals: intervalMs=${intervalMs} is below TfL's ~30s cache TTL; ` +
        `consider ${DEFAULT_INTERVAL_MS}ms to avoid rate limits.`,
    );
  }

  if (immediate) {
    void runTick();
  } else {
    scheduleNext(intervalMs);
  }

  if (options.signal) {
    options.signal.addEventListener(
      'abort',
      () => {
        active = false;
        clearScheduled();
        abortInFlight();
      },
      { once: true },
    );
  }

  return () => {
    active = false;
    clearScheduled();
    abortInFlight();
  };
};

/**
 * Instant-pull polling helper for stop point arrivals.
 * SignalR push and URA streaming are deferred to a future release.
 */
export const pollArrivals = (
  raw: RawClient,
  options: PollArrivalsOptions,
  onUpdate: OnArrivals,
  onError?: OnPollError,
): PollArrivalsUnsubscribe => {
  const stopPointIds = resolveStopPointIds(options);
  const {
    intervalMs = DEFAULT_INTERVAL_MS,
    immediate = true,
    keepTflTypes = false,
  } = options;

  return createPoller({
    raw,
    options,
    stopPointIds,
    intervalMs,
    immediate,
    fetchPredictions: async (signal) => {
      const results = await Promise.all(
        stopPointIds.map((id) =>
          raw.stopPoint.arrivals({ id, keepTflTypes, signal }),
        ),
      );
      return results.flat();
    },
    onUpdate,
    onError,
  });
};

/**
 * Poll arrivals filtered by line at a specific stop (server-side line filter).
 */
export const pollLineArrivals = (
  raw: RawClient,
  options: PollLineArrivalsOptions,
  onUpdate: OnArrivals,
  onError?: OnPollError,
): PollArrivalsUnsubscribe => {
  const {
    lineIds,
    stopPointId,
    intervalMs = DEFAULT_INTERVAL_MS,
    immediate = true,
    keepTflTypes = false,
    direction,
  } = options;

  return createPoller({
    raw,
    options,
    stopPointIds: [stopPointId],
    intervalMs,
    immediate,
    fetchPredictions: async (signal, opts) =>
      raw.line.arrivals({
        ids: lineIds,
        stopPointId,
        direction: opts.direction,
        keepTflTypes,
        signal,
      }),
    onUpdate,
    onError,
  });
};

/**
 * Poll arrivals for specific vehicle IDs.
 */
export const pollVehicleArrivals = (
  raw: RawClient,
  options: PollVehicleArrivalsOptions,
  onUpdate: OnArrivals,
  onError?: OnPollError,
): PollArrivalsUnsubscribe => {
  const {
    vehicleIds,
    intervalMs = DEFAULT_INTERVAL_MS,
    immediate = true,
    keepTflTypes = false,
  } = options;

  return createPoller({
    raw,
    options,
    stopPointIds: [],
    intervalMs,
    immediate,
    fetchPredictions: async (signal) =>
      raw.vehicle.get({ ids: vehicleIds, keepTflTypes, signal }),
    onUpdate,
    onError,
  });
};

/**
 * Instant-pull realtime helpers (REST polling).
 * Push/stream transports (SignalR, URA) are deferred — see docs/REALTIME.md.
 */
export class Realtime {
  constructor(private readonly raw: RawClient) {}

  pollArrivals = (
    options: PollArrivalsOptions,
    onUpdate: OnArrivals,
    onError?: OnPollError,
  ): PollArrivalsUnsubscribe => pollArrivals(this.raw, options, onUpdate, onError);

  pollLineArrivals = (
    options: PollLineArrivalsOptions,
    onUpdate: OnArrivals,
    onError?: OnPollError,
  ): PollArrivalsUnsubscribe =>
    pollLineArrivals(this.raw, options, onUpdate, onError);

  pollVehicleArrivals = (
    options: PollVehicleArrivalsOptions,
    onUpdate: OnArrivals,
    onError?: OnPollError,
  ): PollArrivalsUnsubscribe =>
    pollVehicleArrivals(this.raw, options, onUpdate, onError);
}
