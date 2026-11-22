# Countdowns that don't jump

`createCountdownTracker`, `countdownLabel` and `CountdownOptions` (target: 2.17.0, not yet published). Pure maths: no HTTP, no timers.

API calls in tfl-ts still return raw TfL data. The countdown tracker is opt-in: import it only if you want smoothing and early bias; nothing changes for callers who don't.

## 1. Why TfL times look a minute behind
Every prediction carries `timestamp` (when TfL computed it) and `timeToStation`, counted from that timestamp. By the time you render it, 45–150 s have passed: TfL origin (about 52 s), its edge cache (up to 59 s), your own cache and your poll. Measured on 19 Nov 2026 (07:09–07:23 London): about 98 s old at render, typically. Counting `timeToStation` from your fetch time makes every time too generous by that age. Measured buses before the fix: median +68 s late.

## 2. How tfl-ts projects
Arrival = `timestamp + timeToStation` (equal to `expectedArrival`). `predictionArrivalMs(p)` returns it. Show `arrival − now` against a clock you trust; never `fetchTime + timeToStation`.

## 3. Err early
- Rounding: `floor` (3 min 59 s shows "3 min"), so the label is 0–59 s early. `"nearest"` is available.
- `dueThresholdMs` (60 s): under it the row says "Due".
- `projectionOffsetMs`: shifts every arrival earlier (negative). Presets: bus −15 s, rail −10 s. Default 0 (raw TfL).

| True time to go | Bus preset label |
|---|---|
| 4 min 20 s | 4 min |
| 3 min 05 s | 2 min |
| 1 min 10 s | Due |

## 4. Smoothing
The tracker keeps one shown arrival per vehicle (key: stop, line, platform, vehicle).
- A revision earlier than shown is taken at once, released over `earlierRevisionReleaseMs` (a bigger drop runs faster). Inside the Due window it snaps, so "Due" is never late.
- A later revision smaller than `laterRevisionIgnoreMs` (30 s) is ignored as jitter.
- A larger later revision waits for a second poll to agree, then slides in at `laterRevisionRateMsPerSec` (the countdown slows, it does not tick up).
- A prediction with an unchanged `timestamp` is not a new answer and is ignored.

## 5. Due grace
A row stays "Due" for `dueGraceMs` (default 10 s, 0–30 s) past its arrival, so a bus a few seconds late does not vanish. After that `view()` drops it and `countdownLabel` returns `null`.

## 6. Customise
```ts
import { createCountdownTracker, COUNTDOWN_PRESETS } from 'tfl-ts';

const tracker = createCountdownTracker({ ...COUNTDOWN_PRESETS.bus, dueGraceMs: 0 });
tracker.ingest(predictions, serverNowMs);   // after each poll
const rows = tracker.view(Date.now());      // on every repaint: { key, arrivalMs, secondsLeft, label, prediction }
```
| Option | Default | Range / values |
|---|---|---|
| `projectionOffsetMs` | 0 | negative = earlier |
| `dueGraceMs` | 10000 | 0–30000 |
| `dueThresholdMs` | 60000 | ms |
| `rounding` | `"floor"` | `"floor"`, `"nearest"` |
| `laterRevisionIgnoreMs` | 30000 | ms |
| `laterRevisionRateMsPerSec` | 500 | ms per s |
| `earlierRevisionReleaseMs` | 10000 | ms |

Raw TfL, no early bias: `{ projectionOffsetMs: 0, rounding: "nearest", dueGraceMs: 0 }`.

## 7. Measuring it yourself
Record the predictions you poll and the feed's last `expectedArrival` for each vehicle once it leaves (the proxy for the true arrival). Replay the polls through a tracker at 1 s steps and compare the shown arrival with the true one: signed error (median, p10, p90), the share within ±15 s, how often the displayed minute rises, and how often "Due" showed after arrival.

**Ship gates** (per ~15 min window): minute shown later than reality ≤5% soft / ≤8% hard; late share ≤20% rail / ≤5% bus; upward minute jumps ≤3 (investigate if more); our projection median within ±2 s of the −10 s rail / −15 s bus presets.

**Diagnostic metrics** (not ship gates): share within ±15 s, and |median| / p90 of total error. TfL's own revision alone makes a tight ±15 s bar unreachable.
