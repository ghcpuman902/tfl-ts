# Library → UI examples

Copy-paste patterns for mapping **tfl-ts** data to a useful London transport UI. These files are **reference** (markdown + annotated TypeScript). They are not compiled by this package and do **not** add React, Next.js, or Tailwind as dependencies.

Live polished React demo (external): [manglekuo.com/showcase/tfl-ts](https://manglekuo.com/showcase/tfl-ts)

To try a local HTML board after cloning this repo (devDependencies only):

```bash
pnpm install
pnpm run playground   # http://localhost:3000 — /status and /arrivals
```

## Tube vs bus (do not mix styling)

| Mode | Identity | Helpers | Layout idea |
|------|----------|---------|-------------|
| **Tube / rail** (tube, Elizabeth, DLR, tram, Overground) | Official brand hex | `getLineInlineStyles`, `getLineCssProps`, severity helpers | Sort → partition disruptions vs good service → color title + horizontal bar |
| **Bus** | Route number chip | **Do not** use tube color helpers | Discover stops → filter boardable `490…` IDs → arrivals row: `[chip] [destination] [countdown]` |

Agents: open the files below on GitHub (or in `node_modules/tfl-ts/examples/` after install). Adapt the data→UI contract to any stack — React/Tailwind optional.

## Files

| File | Purpose |
|------|---------|
| [nextjs-app-router.ts](./nextjs-app-router.ts) | Tube/rail status board paste-into-your-app snippet (showcase-aligned) |
| [bus-arrivals-ui.ts](./bus-arrivals-ui.ts) | Bus stop discovery + arrivals board mapping (showcase-aligned) |
| [node-cli.ts](./node-cli.ts) | Runnable Node CLI: search stop → arrivals (console) |
| [caching.ts](./caching.ts) | Suggested TTLs for Next.js / server caches |

## Mapping rules (framework-agnostic)

1. **Fetch once, then style.** Call `line.getStatus` / `stopPoint.getArrivals`, then apply helpers to the returned objects.
2. **Disruptions first.** `sortLinesBySeverityAndOrder` then `isNormalService` to split boards; denser cards for disruptions, compact grid for good service.
3. **Brand as CSS variables.** `getLineCssProps(lineId)` → `--line-color`, dark outline vars. Keep Northern black; outline for contrast (do not invert fill to white).
4. **Bus ≠ tube.** Route chips are generic; stop letter is a small badge; countdown is `Due` / `N min` from `timeToStation`.
5. **Prefer boardable bus stops.** IDs matching `/^490/` support live arrivals; hubs often do not.
