# Migration Guide: v1 → v2

tfl-ts v2 introduces a layered architecture that decouples code generation from the published build. Friendly wrappers no longer depend on generated method signatures, and every TfL REST endpoint is always reachable via `client.raw`.

## What changed

| Area | v1 | v2 |
|------|----|----|
| Build | `generate:types` ran during `build` | `build` = `tsc` only |
| Generated client | `src/generated/tfl.ts` (full client) | `types.ts` (types only) + `raw.ts` (owned generator) |
| Escape hatch | None | `client.raw.<tag>.<method>()` |
| Realtime | N/A | `client.realtime.pollArrivals()` (REST polling) |
| CLI | None | `tfl raw`, `tfl list`, `tfl smoke` |
| Version | 1.x | 2.0.0 |

## Quick migration

### 1. Use friendly wrappers (recommended)

Most code can stay on the human-friendly modules (`client.line`, `client.stopPoint`, etc.). Wrappers now call the raw layer internally and use clearer parameter names:

```typescript
// v1 (generated client style)
await client.line.getStatus({ ids: ['central'] });

// v2 (friendly wrapper)
await client.line.getStatus({ lineIds: ['central'] });
```

### 2. Call any endpoint directly via `client.raw`

When you need an endpoint before a wrapper exists, or want the exact OpenAPI operation:

```typescript
// Uniform object-param API
await client.raw.line.statusByIds({ ids: ['central'], detail: true });
await client.raw.stopPoint.arrivals({ id: '940GZZLUOXC' });
await client.raw.mode.getActiveServiceTypes({});
```

Browse operations:

```bash
pnpm exec tfl list
pnpm exec tfl list --tag line
pnpm exec tfl raw line.get --modes tube
```

### 3. Replace direct imports from `generated/tfl`

```typescript
// v1
import type { TflApiPresentationEntitiesLine } from 'tfl-ts/dist/generated/tfl';

// v2
import type { TflApiPresentationEntitiesLine } from 'tfl-ts/dist/generated/types';
```

The deprecated `./generated/tfl` re-export still exists for compatibility but will be removed in a future major release.

### 4. Realtime polling

SignalR/URA push is deferred. Use instant-pull polling instead:

```typescript
const stop = client.realtime.pollArrivals(
  { stopPointId: '940GZZLUOXC', intervalMs: 30000 },
  (arrivals) => console.log(arrivals),
);

// later
stop();
```

See [REALTIME.md](./REALTIME.md) for the deferred push/stream design.

## Maintainer workflow

Generation is explicit and reviewed against a committed OpenAPI snapshot:

```bash
pnpm run sync:spec      # fetch live swagger (maintainer only)
pnpm run generate       # regenerate types + raw + jsdoc + meta
pnpm run check:drift    # compare snapshot vs live REST paths
pnpm run check:generated # verify committed artifacts match generators
pnpm run build          # compile only
```

## Breaking changes checklist

- [ ] Replace `ids` with module-specific names where applicable (`lineIds`, `stopPointIds`, …)
- [ ] Stop importing method types from generated client code
- [ ] Use `client.raw.*` instead of any direct generated API class usage
- [ ] Bump to `tfl-ts@2.0.0` and run your test suite
