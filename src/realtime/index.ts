import { RawClient } from '../generated/raw';
import type { TflApiPresentationEntitiesPrediction } from '../generated/types';

export interface PollArrivalsOptions {
  stopPointId: string;
  lineIds?: string[];
  intervalMs?: number;
  keepTflTypes?: boolean;
}

export type PollArrivalsUnsubscribe = () => void;

/**
 * Instant-pull polling helper for stop point arrivals.
 * SignalR push and URA streaming are deferred to a future release.
 */
export const pollArrivals = (
  raw: RawClient,
  options: PollArrivalsOptions,
  onUpdate: (arrivals: TflApiPresentationEntitiesPrediction[]) => void | Promise<void>,
): PollArrivalsUnsubscribe => {
  const { stopPointId, lineIds, intervalMs = 30000, keepTflTypes = false } = options;
  let active = true;

  const fetchArrivals = async (): Promise<void> => {
    if (!active) {
      return;
    }

    try {
      const arrivals = await raw.stopPoint.arrivals({
        id: stopPointId,
        keepTflTypes,
      });
      const filtered = lineIds?.length
        ? arrivals.filter((arrival) => lineIds.includes(arrival.lineId || ''))
        : arrivals;
      await onUpdate(filtered);
    } catch (error) {
      console.error('pollArrivals fetch failed:', error);
    }
  };

  void fetchArrivals();
  const timer = setInterval(() => {
    void fetchArrivals();
  }, intervalMs);

  return () => {
    active = false;
    clearInterval(timer);
  };
};

export class Realtime {
  constructor(private readonly raw: RawClient) {}

  pollArrivals = (
    options: PollArrivalsOptions,
    onUpdate: (arrivals: TflApiPresentationEntitiesPrediction[]) => void | Promise<void>,
  ): PollArrivalsUnsubscribe => pollArrivals(this.raw, options, onUpdate);
}
