/**
 * COPY-PASTE REFERENCE — bus arrivals board (showcase-aligned)
 *
 * Paste the data helpers into YOUR server layer (Route Handler / Server Action /
 * API route). Paste the row model into YOUR UI. This file is NOT compiled or run
 * by the tfl-ts package. No React dependency is required by tfl-ts.
 *
 * Data → UI contract (framework-agnostic):
 *   1. Discover: stopPoint.getByGeoPoint / search (modes: ['bus'])
 *   2. Prefer boardable stop IDs matching /^490/ (hubs often lack arrivals)
 *   3. Enrich with stopPoint.get for stop letter / towards when needed
 *   4. Arrivals: stopPoint.getArrivals({ sortBy: 'timeToStation' })
 *   5. UI row: [route chip] [destination + meta] [Due | N min + clock]
 *   6. Do NOT use getLineColor / getLineCssProps for bus route numbers
 *
 * Live reference UI: https://manglekuo.com/showcase/tfl-ts
 * Clone-local HTML board: pnpm run playground → /arrivals (bus preset)
 *
 * Prerequisites in YOUR app:
 *   pnpm add tfl-ts
 *   TFL_APP_ID / TFL_APP_KEY in server env only
 */

import TflClient from 'tfl-ts';

export type BusArrivalRow = {
  lineName?: string;
  destinationName?: string;
  towards?: string;
  direction?: string;
  timeToStation?: number;
  expectedArrival?: string;
  vehicleId?: string;
};

export type NearbyBusStop = {
  id: string;
  name: string;
  stopLetter?: string;
  towards?: string;
  distance?: number;
  lines?: string[];
};

const NEARBY_RADIUS_METERS = 400;
const isBoardableBusStopId = (id: string) => /^490\d/i.test(id);

type AdditionalProperty = { key?: string; value?: string };

const readTowards = (properties?: AdditionalProperty[]): string | undefined => {
  const value = properties?.find((prop) => prop.key?.toLowerCase() === 'towards')?.value;
  return value?.trim() || undefined;
};

const readStopLetter = (stopLetter?: string, indicator?: string): string | undefined => {
  const fromLetter = stopLetter?.trim();
  if (fromLetter) return fromLetter.slice(0, 2).toUpperCase();
  const fromIndicator = indicator?.replace(/^stop\s+/i, '').trim();
  if (fromIndicator && fromIndicator.length <= 2) return fromIndicator.toUpperCase();
  return undefined;
};

/** Map a StopPoint into the fields a stop picker usually needs. */
export const mapBusStop = (stop: {
  id?: string;
  commonName?: string;
  name?: string;
  indicator?: string;
  stopLetter?: string;
  distance?: number;
  lines?: Array<{ name?: string }>;
  additionalProperties?: AdditionalProperty[];
}): NearbyBusStop | null => {
  if (!stop.id) return null;
  return {
    id: stop.id,
    name: (stop.commonName ?? stop.name)?.trim() || 'Unknown stop',
    stopLetter: readStopLetter(stop.stopLetter, stop.indicator),
    towards: readTowards(stop.additionalProperties),
    distance: stop.distance,
    lines: stop.lines?.map((line) => line.name).filter(Boolean) as string[] | undefined,
  };
};

/** Stops within ~400m of a GPS point (truncate lat/lon to ~3 decimals to reduce jitter). */
export const getNearbyBusStops = async (
  lat: number,
  lon: number,
  limit = 8,
): Promise<NearbyBusStop[]> => {
  const client = new TflClient();
  const response = await client.stopPoint.getByGeoPoint({
    lat,
    lon,
    radius: NEARBY_RADIUS_METERS,
    modes: ['bus'],
    returnLines: true,
  });

  return (response.stopPoints ?? [])
    .filter(
      (stop) =>
        stop.id &&
        stop.modes?.includes('bus') &&
        isBoardableBusStopId(stop.id),
    )
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity))
    .slice(0, limit)
    .map(mapBusStop)
    .filter((stop): stop is NearbyBusStop => stop !== null);
};

/** Name / street / NaPTAN search; keep boardable 490… IDs when possible. */
export const searchBusStops = async (query: string, maxResults = 6): Promise<NearbyBusStop[]> => {
  const client = new TflClient();
  const result = await client.stopPoint.search({
    query,
    modes: ['bus'],
    maxResults,
  });

  const matches = (result.matches ?? [])
    .filter((match) => match.id && isBoardableBusStopId(match.id))
    .slice(0, maxResults)
    .map((match) => mapBusStop({ id: match.id, commonName: match.name }))
    .filter((stop): stop is NearbyBusStop => stop !== null);

  if (matches.length === 0) return matches;

  // Enrich letter / towards from full stop details when search hits are thin
  try {
    const details = await client.stopPoint.get(matches.map((s) => s.id));
    const detailList = Array.isArray(details) ? details : [details];
    const byId = new Map(
      detailList
        .map(mapBusStop)
        .filter((s): s is NearbyBusStop => s !== null)
        .map((s) => [s.id, s] as const),
    );
    return matches.map((stop) => {
      const detail = byId.get(stop.id);
      if (!detail) return stop;
      return {
        ...stop,
        stopLetter: stop.stopLetter ?? detail.stopLetter,
        towards: stop.towards ?? detail.towards,
        lines: stop.lines?.length ? stop.lines : detail.lines,
        name: stop.name || detail.name,
      };
    });
  } catch {
    return matches;
  }
};

export const getBusArrivals = async (stopPointId: string): Promise<BusArrivalRow[]> => {
  const client = new TflClient();
  const arrivals = await client.stopPoint.getArrivals({
    stopPointIds: [stopPointId],
    sortBy: 'timeToStation',
  });

  return arrivals.map((arrival) => ({
    lineName: arrival.lineName,
    destinationName: arrival.destinationName,
    towards: arrival.towards,
    direction: arrival.direction,
    timeToStation: arrival.timeToStation,
    expectedArrival: arrival.expectedArrival,
    vehicleId: arrival.vehicleId,
  }));
};

export const formatTimeToStation = (seconds?: number): string => {
  if (seconds == null || seconds < 60) return 'Due';
  return `${Math.round(seconds / 60)} min`;
};

export const formatArrivalClock = (iso?: string): string | null => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Illustrative JSX for ONE arrivals row. Paste into your component library.
 * Bus routes use a generic chip — never getLineColor(lineName).
 *
 * ```tsx
 * const BusArrivalRowView = ({ a }: { a: BusArrivalRow }) => {
 *   const clock = formatArrivalClock(a.expectedArrival);
 *   const detail = [a.direction, a.towards, a.vehicleId].filter(Boolean).join(' · ');
 *
 *   return (
 *     <li className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b py-2 text-sm">
 *       <span className="inline-flex min-w-5 items-center justify-center rounded bg-neutral-900 px-1.5 text-[11px] font-bold text-white">
 *         {a.lineName ?? '—'}
 *       </span>
 *       <span className="truncate">
 *         <span className="text-neutral-500">to</span> {a.destinationName ?? '—'}
 *         {detail ? <span className="ml-2 text-xs text-neutral-500">{detail}</span> : null}
 *       </span>
 *       <span className="text-right tabular-nums">
 *         <span className="block font-semibold">{formatTimeToStation(a.timeToStation)}</span>
 *         {clock ? <span className="block text-xs text-neutral-500">{clock}</span> : null}
 *       </span>
 *     </li>
 *   );
 * };
 *
 * // Stop letter badge (TfL convention: red circle, white letter)
 * const StopLetterBadge = ({ letter }: { letter: string }) => (
 *   <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
 *     {letter}
 *   </span>
 * );
 * ```
 */
