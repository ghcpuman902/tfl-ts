# Realtime Design Spike

## Summary

TfL advertises websocket/streaming capabilities for arrival predictions, but these transports are **not described in the Unified API OpenAPI spec** (`/swagger/docs/v1`). The REST surface remains 84 GET endpoints and is what this library auto-generates from.

## Current support (v2)

- `client.realtime.pollArrivals()` uses **instant pull** via REST `StopPoint/{id}/Arrivals`.
- This covers bus, river bus, tube, and other modes without extra credentials.

## Deferred transports

### SignalR push (`push-api.tfl.gov.uk`)

- Legacy ASP.NET SignalR protocol.
- Used internally by tfl.gov.uk for live boards.
- No public OpenAPI; limited modern client libraries.
- TfL forum indicates replacement is planned before shutdown.

### URA bus/river stream

- Separate HTTP chunked stream with **Digest authentication**.
- Requires username/password issued by TfL (not the standard `app_key`).
- Documented in TfL's URA PDF, not in swagger.

## Planned future module

When implemented, reserve:

```typescript
client.realtime.subscribePush(/* SignalR - future */)
client.realtime.subscribeStream(/* URA - future, digest auth */)
```

Until then, use:

```typescript
const stop = client.realtime.pollArrivals({ stopPointId: '940GZZLUOXC', intervalMs: 15000 }, (arrivals) => {
  console.log(arrivals);
});
```

## Why not auto-generate realtime

Generation is driven by the committed OpenAPI snapshot. Push/stream endpoints are out-of-band and require hand-written protocol clients with separate auth and lifecycle management.
