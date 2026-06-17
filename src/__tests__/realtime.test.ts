import { pollArrivals } from '../realtime';
import type { RawClient } from '../generated/raw';
import type { TflApiPresentationEntitiesPrediction } from '../generated/types';

describe('pollArrivals', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should poll arrivals and support unsubscribe', async () => {
    const arrivals: TflApiPresentationEntitiesPrediction[] = [
      { lineId: 'central', lineName: 'Central', timeToStation: 60 },
      { lineId: 'victoria', lineName: 'Victoria', timeToStation: 120 },
    ];

    const raw = {
      stopPoint: {
        arrivals: jest.fn().mockResolvedValue(arrivals),
      },
    } as unknown as RawClient;

    const updates: TflApiPresentationEntitiesPrediction[][] = [];
    const stop = pollArrivals(
      raw,
      { stopPointId: '940GZZLUOXC', intervalMs: 1000, lineIds: ['central'] },
      (result) => {
        updates.push(result);
      },
    );

    await Promise.resolve();
    expect(updates[0]).toEqual([arrivals[0]]);

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(2);

    stop();
    jest.advanceTimersByTime(5000);
    await Promise.resolve();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(2);
  });
});
