import {
  pollArrivals,
  pollLineArrivals,
  pollVehicleArrivals,
} from '../realtime';
import { TflHttpError } from '../errors';
import type { RawClient } from '../generated/raw';
import type { TflApiPresentationEntitiesPrediction } from '../generated/types';

const flushAsync = async (): Promise<void> => {
  for (let i = 0; i < 5; i += 1) {
    await Promise.resolve();
  }
};

describe('pollArrivals', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const central: TflApiPresentationEntitiesPrediction = {
    lineId: 'central',
    lineName: 'Central',
    timeToStation: 60,
    operationType: 1,
  };
  const victoria: TflApiPresentationEntitiesPrediction = {
    lineId: 'victoria',
    lineName: 'Victoria',
    timeToStation: 120,
    operationType: 1,
  };
  const deleted: TflApiPresentationEntitiesPrediction = {
    lineId: 'central',
    lineName: 'Central',
    timeToStation: 30,
    operationType: 2,
  };

  test('should poll arrivals and support unsubscribe', async () => {
    const raw = {
      stopPoint: {
        arrivals: jest.fn().mockResolvedValue([central, victoria]),
      },
    } as unknown as RawClient;

    const updates: TflApiPresentationEntitiesPrediction[][] = [];
    const metas: { tick: number }[] = [];
    const stop = pollArrivals(
      raw,
      { stopPointId: '940GZZLUOXC', intervalMs: 1000, lineIds: ['central'] },
      (result, meta) => {
        updates.push(result);
        metas.push({ tick: meta.tick });
      },
    );

    await flushAsync();
    expect(updates[0]).toEqual([central]);
    expect(metas[0]?.tick).toBe(0);

    jest.advanceTimersByTime(1000);
    await flushAsync();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(2);

    stop();
    jest.advanceTimersByTime(5000);
    await flushAsync();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(2);
  });

  test('should batch multiple stopPointIds', async () => {
    const raw = {
      stopPoint: {
        arrivals: jest
          .fn()
          .mockResolvedValueOnce([central])
          .mockResolvedValueOnce([victoria]),
      },
    } as unknown as RawClient;

    const updates: TflApiPresentationEntitiesPrediction[][] = [];
    pollArrivals(
      raw,
      { stopPointIds: ['940GZZLUOXC', '940GZZLUVIC'] },
      (result) => {
        updates.push(result);
      },
    );

    await flushAsync();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(2);
    expect(updates[0]).toHaveLength(2);
  });

  test('should sort by timeToStation', async () => {
    const raw = {
      stopPoint: {
        arrivals: jest.fn().mockResolvedValue([victoria, central]),
      },
    } as unknown as RawClient;

    const updates: TflApiPresentationEntitiesPrediction[][] = [];
    pollArrivals(
      raw,
      { stopPointId: '940GZZLUOXC', sortBy: 'timeToStation' },
      (result) => {
        updates.push(result);
      },
    );

    await flushAsync();
    expect(updates[0]?.map((a) => a.lineId)).toEqual(['central', 'victoria']);
  });

  test('should filter operationType 2 and set hadDeletions', async () => {
    const raw = {
      stopPoint: {
        arrivals: jest.fn().mockResolvedValue([central, deleted]),
      },
    } as unknown as RawClient;

    let hadDeletions = false;
    pollArrivals(raw, { stopPointId: '940GZZLUOXC' }, (result, meta) => {
      hadDeletions = meta.hadDeletions;
      expect(result).toEqual([central]);
    });

    await flushAsync();
    expect(hadDeletions).toBe(true);
  });

  test('should call onError and continue polling', async () => {
    const raw = {
      stopPoint: {
        arrivals: jest
          .fn()
          .mockRejectedValueOnce(new Error('network'))
          .mockResolvedValueOnce([central]),
      },
    } as unknown as RawClient;

    const errors: unknown[] = [];
    const updates: TflApiPresentationEntitiesPrediction[][] = [];

    pollArrivals(
      raw,
      { stopPointId: '940GZZLUOXC', intervalMs: 1000 },
      (result) => {
        updates.push(result);
      },
      (error) => {
        errors.push(error);
      },
    );

    await flushAsync();
    expect(errors).toHaveLength(1);

    jest.advanceTimersByTime(1000);
    await flushAsync();
    expect(updates).toHaveLength(1);
  });

  test('should backoff on rate limit errors', async () => {
    const rateLimitError = new TflHttpError('rate limited', 429, 'Too Many Requests');
    const raw = {
      stopPoint: {
        arrivals: jest
          .fn()
          .mockRejectedValueOnce(rateLimitError)
          .mockResolvedValueOnce([central]),
      },
    } as unknown as RawClient;

    pollArrivals(
      raw,
      { stopPointId: '940GZZLUOXC', intervalMs: 1000 },
      () => {},
      () => {},
    );

    await flushAsync();
    jest.advanceTimersByTime(1000);
    await flushAsync();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(5000);
    await flushAsync();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(2);
  });

  test('should skip immediate fetch when immediate is false', async () => {
    const raw = {
      stopPoint: {
        arrivals: jest.fn().mockResolvedValue([central]),
      },
    } as unknown as RawClient;

    pollArrivals(
      raw,
      { stopPointId: '940GZZLUOXC', intervalMs: 1000, immediate: false },
      () => {},
    );

    await flushAsync();
    expect(raw.stopPoint.arrivals).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    await flushAsync();
    expect(raw.stopPoint.arrivals).toHaveBeenCalledTimes(1);
  });

  test('should pass abort signal to raw client and abort on unsubscribe', async () => {
    let capturedSignal: AbortSignal | undefined;
    const raw = {
      stopPoint: {
        arrivals: jest.fn().mockImplementation(({ signal }) => {
          capturedSignal = signal;
          return new Promise(() => {});
        }),
      },
    } as unknown as RawClient;

    const stop = pollArrivals(raw, { stopPointId: '940GZZLUOXC' }, () => {});

    await flushAsync();
    expect(capturedSignal).toBeDefined();
    expect(capturedSignal?.aborted).toBe(false);

    stop();
    expect(capturedSignal?.aborted).toBe(true);
  });

  test('should throw when neither stopPointId nor stopPointIds provided', () => {
    const raw = { stopPoint: { arrivals: jest.fn() } } as unknown as RawClient;
    expect(() =>
      pollArrivals(raw, {}, () => {}),
    ).toThrow('pollArrivals requires stopPointId or stopPointIds');
  });
});

describe('pollLineArrivals', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call raw.line.arrivals', async () => {
    const arrivals = [{ lineId: 'central', timeToStation: 90 }];
    const raw = {
      line: {
        arrivals: jest.fn().mockResolvedValue(arrivals),
      },
    } as unknown as RawClient;

    const updates: TflApiPresentationEntitiesPrediction[][] = [];
    pollLineArrivals(
      raw,
      { lineIds: ['central'], stopPointId: '940GZZLUOXC' },
      (result) => {
        updates.push(result);
      },
    );

    await flushAsync();
    expect(raw.line.arrivals).toHaveBeenCalledWith(
      expect.objectContaining({
        ids: ['central'],
        stopPointId: '940GZZLUOXC',
      }),
    );
    expect(updates[0]).toEqual(arrivals);
  });
});

describe('pollVehicleArrivals', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call raw.vehicle.get', async () => {
    const arrivals = [{ vehicleId: '006', timeToStation: 200 }];
    const raw = {
      vehicle: {
        get: jest.fn().mockResolvedValue(arrivals),
      },
    } as unknown as RawClient;

    const updates: TflApiPresentationEntitiesPrediction[][] = [];
    pollVehicleArrivals(
      raw,
      { vehicleIds: ['006'] },
      (result) => {
        updates.push(result);
      },
    );

    await flushAsync();
    expect(raw.vehicle.get).toHaveBeenCalledWith(
      expect.objectContaining({ ids: ['006'] }),
    );
    expect(updates[0]).toEqual(arrivals);
  });
});
