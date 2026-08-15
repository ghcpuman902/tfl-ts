# Library → UI examples

How to map **tfl-ts** data into a useful London transport UI. The TypeScript files here are small, stack-agnostic references. They are not compiled by this package and do not pull in React, Next.js, or Tailwind.

**See it working:** [API explorer](https://tfl.manglekuo.com/docs/explorer) — call the same endpoints this package wraps, with live responses.

Live React boards: [tfl.manglekuo.com](https://tfl.manglekuo.com/) · source in [ghcpuman902/tfl-components](https://github.com/ghcpuman902/tfl-components)

Install a board into a Next.js app (copies source; installs `tfl-ts` from npm):

```bash
pnpm dlx shadcn@latest add https://tfl.manglekuo.com/r/tube-status-board.json
```

## Tube vs bus (do not mix styling)

| Mode | Identity | Helpers | Layout idea |
|------|----------|---------|-------------|
| **Tube / rail** (tube, Elizabeth, DLR, tram, Overground) | Official brand hex | `getLineInlineStyles`, `getLineCssProps`, severity helpers | Sort → partition disruptions vs good service → colour title + horizontal bar |
| **Bus** | Route number chip | **Do not** use tube colour helpers | Discover stops → filter boardable `490…` IDs → arrivals row: `[chip] [destination] [countdown]` |

For a full React implementation, read [tfl-components](https://github.com/ghcpuman902/tfl-components) or poke the [explorer](https://tfl.manglekuo.com/docs/explorer). The mapping rules below work on any stack; React and Tailwind are optional.

## Files

| File | Purpose |
|------|---------|
| [node-cli.ts](./node-cli.ts) | Runnable Node CLI: search stop → arrivals (console) |
| [caching.ts](./caching.ts) | Suggested TTLs for Next.js / server caches |

## Mapping rules (framework-agnostic)

1. **Fetch once, then style.** Call `line.getStatus` / `stopPoint.getArrivals`, then apply helpers to the returned objects.
2. **Disruptions first.** `sortLinesBySeverityAndOrder` then `isNormalService` to split boards; denser cards for disruptions, compact grid for good service. Read `getWorstCurrentStatus(line.lineStatuses)`, not `lineStatuses[0]`. Severity 20 is scheduled closure and sorts after incidents. Putting "not running" in its own section is a board choice.
3. **Brand as CSS variables.** `getLineCssProps(lineId)` → `--line-color`, dark outline vars. Keep Northern black; outline for contrast (do not invert fill to white).
4. **Bus ≠ tube.** Route chips are generic; stop letter is a small badge; countdown is `Due` / `N min` from `timeToStation`.
5. **Prefer boardable bus stops.** IDs matching `/^490/` support live arrivals; hubs often do not.
