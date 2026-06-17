# TfL Live Data — Design Spike & Implementation

> **Status:** Tier 1 instant-pull **implemented in v2.2.0**; push/stream deferred  
> **Last updated:** 2026-06-17

## Summary

TfL advertises websocket/streaming for arrival predictions, but these transports are **not in the Unified API OpenAPI spec** (`/swagger/docs/v1`). The REST surface (84 GET endpoints) is what this library auto-generates from.

| Surface | In OpenAPI? | v2.2.0 support |
|---------|-------------|----------------|
| Unified REST arrivals | Yes | **`client.realtime.pollArrivals`**, `pollLineArrivals`, `pollVehicleArrivals` |
| TrackerNet XML | No | Deferred |
| SignalR push (`push-api.tfl.gov.uk`) | No | Deferred |
| URA bus/river stream (Digest auth) | No | Deferred |

---

## Implemented — Tier 1 instant pull (v2.2.0)

### API

```typescript
import TflClient from 'tfl-ts';

const client = new TflClient();

// Multi-stop, sorted, with meta + error handling
const stop = client.realtime.pollArrivals(
  {
    stopPointIds: ['940GZZLUOXC', '940GZZLUVIC'],
    lineIds: ['central', 'victoria'], // client-side filter
    sortBy: 'timeToStation',
    intervalMs: 30_000, // default; matches TfL ~30s cache TTL
    immediate: true,
    signal: abortController.signal,
    keepTflTypes: false,
  },
  (arrivals, meta) => {
    console.log(meta.fetchedAt, meta.tick, arrivals);
    if (meta.hadDeletions) {
      // operationType === 2 stripped from snapshot
    }
  },
  (error, meta) => {
    console.error('poll failed', meta.tick, error);
  },
);

// Later: stop polling and abort in-flight request
stop();
```

### Pollers

| Method | REST backing | Use case |
|--------|--------------|----------|
| `pollArrivals` | `GET /StopPoint/{id}/Arrivals` | One or many stops (batched) |
| `pollLineArrivals` | `GET /Line/{ids}/Arrivals/{stopPointId}` | Server-side line filter at a stop |
| `pollVehicleArrivals` | `GET /Vehicle/{ids}/Arrivals` | Track specific vehicles |

### Behaviour

- **Default interval:** 30s (TfL cache TTL). Warns if `intervalMs < 10_000`.
- **Drift-corrected scheduling:** `setTimeout` chain (not `setInterval`) — next tick after fetch completes.
- **Abort:** per-tick `AbortController`; `unsubscribe()` aborts in-flight; optional external `signal`.
- **Deletions:** `operationType === 2` predictions stripped; `meta.hadDeletions` set.
- **Backoff:** 429 / 5xx errors trigger exponential backoff (5s → 5min cap); polling continues.

### Types exported from `tfl-ts`

`PollMeta`, `PollArrivalsOptions`, `PollLineArrivalsOptions`, `PollVehicleArrivalsOptions`, `OnArrivals`, `OnPollError`, `PollArrivalsUnsubscribe`, `Realtime`.

### Demos

- **CLI:** `pnpm run demo:realtime`
- **Web:** `pnpm run playground` → open `/arrivals` (SSE board via `pollArrivals`)

---

## Deferred — Tier 2–4

### SignalR push (`push-api.tfl.gov.uk`)

- Legacy ASP.NET SignalR (`predictionsRoomHub`, `addLineRooms`, `showPredictions`).
- No public OpenAPI; limited modern client libraries.
- TfL forum (Nov 2025): replacement planned; no near-term shutdown.

### URA bus/river stream (`countdown.api.tfl.gov.uk`)

- HTTP 1.1 chunked stream with **Digest authentication** (separate credentials from `app_key`).
- JSON-like (non-standard) response format.
- [URA PDF](https://content.tfl.gov.uk/tfl-live-bus-river-bus-arrivals-api-documentation.pdf)

### TrackerNet (`api.tfl.gov.uk/TrackerNet/*`)

- London Underground XML services; migrated to `app_key` Aug 2024.
- Not in OpenAPI; overlaps with REST `/StopPoint/{id}/Arrivals` for most use cases.

### Planned future API (not implemented)

```typescript
// Future optional @tfl-ts/realtime-push package
client.realtime.subscribePush(/* SignalR */);
client.realtime.subscribeStream(/* URA Digest stream */);
```

---

## Why not auto-generate realtime

Generation is driven by the committed OpenAPI snapshot. Push/stream endpoints are out-of-band and require hand-written protocol clients with separate auth and lifecycle management.

---

## References

- [TfL Unified API](https://tfl.gov.uk/info-for/open-data-users/api-documentation)
- [Live OpenAPI](https://api.tfl.gov.uk/swagger/docs/v1)
- [URA PDF](https://content.tfl.gov.uk/tfl-live-bus-river-bus-arrivals-api-documentation.pdf)
- [TrackerNet PDF](https://content.tfl.gov.uk/trackernet-data-services-guide-beta.pdf)
- [Tech Forum — SignalR future](https://techforum.tfl.gov.uk/t/questions-about-the-push-signalr-api-realtime-predictions-stream/6071)

## Changelog

| Date | Change |
|------|--------|
| 2026-06-16 | Initial design spike |
| 2026-06-17 | Tier 1 implemented in v2.2.0 (`pollArrivals`, `pollLineArrivals`, `pollVehicleArrivals`, `PollMeta`, playground `/arrivals`) |
