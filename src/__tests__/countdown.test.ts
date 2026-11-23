import {
  COUNTDOWN_PRESETS,
  countdownLabel,
  createCountdownTracker,
  predictionArrivalMs,
} from '../realtime/countdown';
import type { Prediction } from '../realtime';

const T0 = Date.parse('2026-11-19T12:00:00Z');
const pred = (arrivalOffsetS: number, stampOffsetS: number): Prediction => ({
  vehicleId: 'V1',
  naptanId: 'S1',
  lineId: '25',
  timestamp: new Date(T0 + stampOffsetS * 1000).toISOString(),
  expectedArrival: new Date(T0 + arrivalOffsetS * 1000).toISOString(),
  timeToStation: arrivalOffsetS - stampOffsetS,
});

describe('predictionArrivalMs', () => {
  it('uses expectedArrival, else timestamp + timeToStation', () => {
    expect(predictionArrivalMs({ expectedArrival: new Date(T0).toISOString() })).toBe(T0);
    expect(
      predictionArrivalMs({ timestamp: new Date(T0).toISOString(), timeToStation: 90 }),
    ).toBe(T0 + 90_000);
    expect(predictionArrivalMs({})).toBeUndefined();
  });
});

describe('countdownLabel', () => {
  it('floors, says Due under a minute, and goes null after the grace', () => {
    expect(countdownLabel(T0 + 185_000, T0)).toBe('3 min');
    expect(countdownLabel(T0 + 185_000, T0, { rounding: 'nearest' })).toBe('3 min');
    expect(countdownLabel(T0 + 170_000, T0, { rounding: 'nearest' })).toBe('3 min');
    expect(countdownLabel(T0 + 170_000, T0)).toBe('2 min');
    expect(countdownLabel(T0 + 59_000, T0)).toBe('Due');
    expect(countdownLabel(T0 + 70_000, T0, { projectionOffsetMs: -15_000 })).toBe('Due');
    expect(countdownLabel(T0 - 9_000, T0)).toBe('Due');
    expect(countdownLabel(T0 - 11_000, T0)).toBeNull();
    expect(countdownLabel(T0 - 11_000, T0, { dueGraceMs: 20_000 })).toBe('Due');
  });
});

describe('createCountdownTracker', () => {
  const minutes = (t: ReturnType<typeof createCountdownTracker>, now: number): number | undefined =>
    t.view(now)[0]?.secondsLeft;

  it('never ticks up when TfL revises later, but takes an earlier revision at once', () => {
    const t = createCountdownTracker({ projectionOffsetMs: 0 });
    t.ingest([pred(300, -20)], T0, T0);
    let last = Infinity;
    // A later jitter (+20 s) is ignored; a +90 s revision needs two polls and then slides in slowly.
    const polls: [number, Prediction][] = [
      [30, pred(320, 10)],
      [60, pred(390, 40)],
      [90, pred(390, 70)],
    ];
    for (let s = 0; s <= 150; s += 5) {
      const poll = polls.find(([at]) => at === s);
      if (poll) t.ingest([poll[1]], T0 + s * 1000, T0 + s * 1000);
      const left = minutes(t, T0 + s * 1000)!;
      expect(left).toBeLessThanOrEqual(last);
      last = left;
    }
    t.ingest([pred(200, 120)], T0 + 120_000, T0 + 120_000);
    expect(t.view(T0 + 135_000)[0]!.secondsLeft).toBe(65);
  });

  it('keeps a row Due past arrival for the grace, then drops it', () => {
    const t = createCountdownTracker({ projectionOffsetMs: 0 });
    t.ingest([pred(60, 0)], T0, T0);
    expect(t.view(T0 + 65_000)[0]?.label).toBe('Due');
    expect(t.view(T0 + 69_000)[0]?.label).toBe('Due');
    expect(t.view(T0 + 71_000)).toHaveLength(0);
  });

  it('does not bring a dropped vehicle back while the feed still lists it as due', () => {
    const t = createCountdownTracker({ projectionOffsetMs: 0 });
    t.ingest([pred(60, 0)], T0, T0);
    expect(t.view(T0 + 71_000)).toHaveLength(0);
    // The feed keeps the bus, clamped to "now", on later polls.
    t.ingest([pred(80, 80)], T0 + 80_000, T0 + 80_000);
    expect(t.view(T0 + 81_000)).toHaveLength(0);
    // A real new prediction (more than a minute out) brings it back.
    t.ingest([pred(260, 100)], T0 + 100_000, T0 + 100_000);
    expect(t.view(T0 + 101_000)).toHaveLength(1);
  });

  it('starts early with the bus preset', () => {
    const t = createCountdownTracker(COUNTDOWN_PRESETS.bus);
    t.ingest([pred(130, 0)], T0, T0);
    expect(t.view(T0)[0]?.secondsLeft).toBe(115);
  });

  it('ignores a prediction TfL has not recomputed', () => {
    const t = createCountdownTracker({ projectionOffsetMs: 0 });
    t.ingest([pred(300, 0)], T0, T0);
    t.ingest([pred(100, 0)], T0 + 20_000, T0 + 20_000);
    expect(t.view(T0 + 20_000)[0]?.secondsLeft).toBe(280);
  });
});
