/**
 * Next.js caching example — wrap TfL calls with appropriate TTLs
 *
 * Copy patterns into a Next.js 15+ app. Uses `unstable_cache` for
 * server-side deduplication and ISR-style revalidation.
 *
 * Prerequisites:
 *   pnpm add tfl-ts
 *   Set TFL_APP_ID and TFL_APP_KEY in .env.local
 */

import { unstable_cache } from 'next/cache';
import TflClient, { sortLinesBySeverityAndOrder } from 'tfl-ts';

// ─── Line status: cache 60s ────────────────────────────────────────────────
// Status changes when disruptions occur; 60s is a good balance.

export const getCachedTubeStatus = unstable_cache(
  async () => {
    const client = new TflClient();
    const statuses = await client.line.getStatus({ modes: ['tube'] });
    return sortLinesBySeverityAndOrder(statuses);
  },
  ['tfl-tube-status'],
  { revalidate: 60, tags: ['tfl-status'] },
);

// ─── Arrivals per stop: cache 15s ──────────────────────────────────────────
// Arrivals are real-time; keep TTL short.

export const getCachedArrivals = (stopPointId: string) =>
  unstable_cache(
    async () => {
      const client = new TflClient();
      const arrivals = await client.stopPoint.getArrivals({
        stopPointIds: [stopPointId],
      });
      return [...arrivals].sort(
        (a, b) => (a.timeToStation ?? 0) - (b.timeToStation ?? 0),
      );
    },
    [`tfl-arrivals-${stopPointId}`],
    { revalidate: 15, tags: [`tfl-arrivals-${stopPointId}`] },
  )();

// ─── Stop ID resolution: cache 24h ───────────────────────────────────────────
// Stop IDs are stable; search results rarely change.

export const getCachedStopId = (query: string, modes: string[]) =>
  unstable_cache(
    async () => {
      const client = new TflClient();
      const result = await client.stopPoint.search({ query, modes });
      const id = result.matches?.[0]?.id;
      if (!id) throw new Error(`Stop not found: ${query}`);
      return { id, name: result.matches?.[0]?.name ?? query };
    },
    [`tfl-stop-search-${query}-${modes.join(',')}`],
    { revalidate: 86400, tags: ['tfl-stop-search'] },
  )();

// ─── Usage in a Server Component ───────────────────────────────────────────
//
// export default async function BoardPage() {
//   const { id: stopId } = await getCachedStopId('Oxford Circus', ['tube']);
//   const [status, arrivals] = await Promise.all([
//     getCachedTubeStatus(),
//     getCachedArrivals(stopId),
//   ]);
//   // render…
// }

// ─── Invalidation (on-demand) ──────────────────────────────────────────────
//
// import { revalidateTag } from 'next/cache';
//
// // After a user reports stale data:
// revalidateTag('tfl-status');
// revalidateTag(`tfl-arrivals-${stopId}`);

// ─── What NOT to cache ───────────────────────────────────────────────────────
//
// - Static metadata (LINE_NAMES, MODE_NAMES) — already bundled, read synchronously
// - Arrivals longer than 15s for live countdown displays
// - Journey results without including departure time in the cache key
