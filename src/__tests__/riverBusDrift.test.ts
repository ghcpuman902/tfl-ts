import { LINE_STATION_SEQUENCES } from '../index';

/**
 * Online drift guard: the river-bus snapshot against TfL's live ordered routes.
 * Off by default. Run with TFL_LIVE_DRIFT=1 and a real TFL_APP_KEY:
 *   TFL_LIVE_DRIFT=1 pnpm exec jest riverBusDrift
 * When it fails, regenerate: pnpm run generate -- --only=station-sequences
 */
const live = process.env.TFL_LIVE_DRIFT === '1' && Boolean(process.env.TFL_APP_KEY);
const RIVER_BUS_LINES = ['rb1', 'rb4', 'rb6', 'woolwich-ferry'] as const;
const DIRECTIONS = ['inbound', 'outbound'] as const;

type OrderedRoute = { name?: string; naptanIds?: string[]; serviceType?: string };
type Shape = { direction: string; stationIds: readonly string[] };

const shapes = (routes: readonly Shape[]): string[] =>
  routes.map((route) => `${route.direction} ${route.stationIds.join(',')}`).sort();

(live ? describe : describe.skip)('river-bus snapshot matches live TfL (TFL_LIVE_DRIFT=1)', () => {
  jest.setTimeout(30_000);

  test.each(RIVER_BUS_LINES)('%s ordered routes', async (lineId) => {
    const read: Shape[] = [];
    for (const direction of DIRECTIONS) {
      const params = new URLSearchParams({ serviceTypes: 'Regular' });
      params.set('app_key', process.env.TFL_APP_KEY ?? '');
      const response = await fetch(
        `https://api.tfl.gov.uk/Line/${lineId}/Route/Sequence/${direction}?${params}`,
      );
      // Never print the URL: it carries the key.
      if (!response.ok) throw new Error(`TfL answered ${response.status} for ${lineId} ${direction}`);
      const body = (await response.json()) as { orderedLineRoutes?: OrderedRoute[] };
      for (const route of body.orderedLineRoutes ?? []) {
        if (route.serviceType && route.serviceType !== 'Regular') continue;
        read.push({ direction, stationIds: route.naptanIds ?? [] });
      }
    }
    const snapshot = LINE_STATION_SEQUENCES[lineId].orderedRoutes as readonly Shape[];
    expect(shapes(snapshot)).toEqual(shapes(read));
  });
});
