import fs from 'fs';
import path from 'path';
import { Lines } from '../src/generated/meta/Line';

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'generated', 'meta', 'StationSequence.ts');

const INCLUDED_MODES = new Set(['tube', 'elizabeth-line', 'dlr', 'overground', 'tram']);
const DIRECTIONS = ['inbound', 'outbound'] as const;
const SERVICE_TYPES = ['Regular'] as const;
const MAX_CONCURRENCY = 4;
const MAX_ATTEMPTS = 3;

type Direction = (typeof DIRECTIONS)[number];

type RawStop = {
  id?: string;
  name?: string;
  commonName?: string;
};

type RawBranch = {
  branchId?: number;
  nextBranchIds?: number[];
  prevBranchIds?: number[];
  direction?: string;
  serviceType?: string;
  stopPoint?: RawStop[];
};

type RawOrderedRoute = {
  name?: string;
  naptanIds?: string[];
  serviceType?: string;
};

type RawRouteSequence = {
  lineId?: string;
  lineName?: string;
  mode?: string;
  stopPointSequences?: RawBranch[];
  orderedLineRoutes?: RawOrderedRoute[];
};

type StaticStation = {
  id: string;
  name: string;
};

type StaticBranch = {
  id: number;
  direction: Direction;
  serviceType: string;
  nextBranchIds: number[];
  previousBranchIds: number[];
  stationIds: string[];
};

type StaticOrderedRoute = {
  name?: string;
  direction: Direction;
  serviceType: string;
  stationIds: string[];
};

type StaticLineSequence = {
  lineId: string;
  lineName: string;
  modeName: string;
  stations: StaticStation[];
  branches: StaticBranch[];
  orderedRoutes: StaticOrderedRoute[];
};

const stopName = (stop: RawStop): string | undefined => stop.name ?? stop.commonName;

const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const fetchJson = async <T>(url: string): Promise<T> => {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < MAX_ATTEMPTS) {
        await sleep(attempt * 500);
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
};

const routeSequenceUrl = (lineId: string, direction: Direction): string => {
  const params = new URLSearchParams({ serviceTypes: SERVICE_TYPES.join(',') });
  const appId = process.env.TFL_APP_ID;
  const appKey = process.env.TFL_APP_KEY;
  if (appId) params.set('app_id', appId);
  if (appKey) params.set('app_key', appKey);
  return `https://api.tfl.gov.uk/Line/${encodeURIComponent(lineId)}/Route/Sequence/${direction}?${params}`;
};

const validateResponse = (
  expectedLineId: string,
  direction: Direction,
  response: RawRouteSequence
): void => {
  if (response.lineId !== expectedLineId) {
    throw new Error(
      `${expectedLineId} ${direction}: TfL returned lineId ${response.lineId ?? '(missing)'}`
    );
  }

  if (!response.stopPointSequences?.length) {
    throw new Error(`${expectedLineId} ${direction}: no branches returned by TfL`);
  }

  if (!response.orderedLineRoutes?.length) {
    throw new Error(`${expectedLineId} ${direction}: no ordered routes returned by TfL`);
  }

  for (const branch of response.stopPointSequences) {
    const stationIds = (branch.stopPoint ?? []).map((stop) => stop.id).filter(Boolean);
    if (branch.branchId == null || stationIds.length < 2) {
      throw new Error(`${expectedLineId} ${direction}: malformed branch`);
    }
    if ((branch.stopPoint ?? []).some((stop) => !stop.id || !stopName(stop))) {
      throw new Error(`${expectedLineId} ${direction}: branch contains an unnamed station`);
    }
  }

  for (const route of response.orderedLineRoutes) {
    if (!route.naptanIds || route.naptanIds.length < 2) {
      throw new Error(`${expectedLineId} ${direction}: malformed ordered route`);
    }
  }
};

const mergeResponses = (
  lineId: string,
  lineName: string,
  modeName: string,
  responses: Array<{ direction: Direction; data: RawRouteSequence }>
): StaticLineSequence => {
  const stationsById = new Map<string, StaticStation>();
  const branches: StaticBranch[] = [];
  const orderedRoutes: StaticOrderedRoute[] = [];

  for (const { direction, data } of responses) {
    for (const branch of data.stopPointSequences ?? []) {
      const stops = branch.stopPoint ?? [];
      for (const stop of stops) {
        const name = stopName(stop);
        if (stop.id && name) {
          stationsById.set(stop.id, { id: stop.id, name });
        }
      }
      branches.push({
        id: branch.branchId!,
        direction,
        serviceType: branch.serviceType ?? SERVICE_TYPES[0],
        nextBranchIds: branch.nextBranchIds ?? [],
        previousBranchIds: branch.prevBranchIds ?? [],
        stationIds: stops.map((stop) => stop.id!),
      });
    }

    for (const route of data.orderedLineRoutes ?? []) {
      orderedRoutes.push({
        name: route.name,
        direction,
        serviceType: route.serviceType ?? SERVICE_TYPES[0],
        stationIds: route.naptanIds!,
      });
    }
  }

  const referencedIds = new Set([
    ...branches.flatMap((branch) => branch.stationIds),
    ...orderedRoutes.flatMap((route) => route.stationIds),
  ]);
  const unresolved = [...referencedIds].filter((id) => !stationsById.has(id));
  if (unresolved.length > 0) {
    throw new Error(
      `${lineId}: ${unresolved.length} ordered station IDs have no name (${unresolved.slice(0, 5).join(', ')})`
    );
  }

  return {
    lineId,
    lineName,
    modeName,
    stations: [...stationsById.values()].sort((a, b) => a.name.localeCompare(b.name, 'en-GB')),
    branches,
    orderedRoutes,
  };
};

const fetchLine = async (line: {
  id: string;
  name: string;
  modeName: string;
}): Promise<StaticLineSequence> => {
  const responses = await Promise.all(
    DIRECTIONS.map(async (direction) => {
      const data = await fetchJson<RawRouteSequence>(routeSequenceUrl(line.id, direction));
      validateResponse(line.id, direction, data);
      return { direction, data };
    })
  );

  return mergeResponses(line.id, line.name, line.modeName, responses);
};

const mapConcurrent = async <T, R>(
  values: readonly T[],
  limit: number,
  mapper: (value: T) => Promise<R>
): Promise<R[]> => {
  const output = new Array<R>(values.length);
  let nextIndex = 0;

  const worker = async (): Promise<void> => {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      output[index] = await mapper(values[index]);
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, () => worker()));
  return output;
};

const render = (sequences: StaticLineSequence[]): string => {
  const byLineId = Object.fromEntries(sequences.map((sequence) => [sequence.lineId, sequence]));
  return (
    `// Generated from TfL route-sequence data. Do not edit by hand.\n` +
    `// Static topology only: station identity, order, and branches; no operational state.\n` +
    `// Regenerate with: pnpm run generate:station-sequences\n\n` +
    `export const STATION_SEQUENCES_GENERATED_AT = ${JSON.stringify(new Date().toISOString())};\n\n` +
    `export const LINE_STATION_SEQUENCES = ${JSON.stringify(byLineId, null, 2)} as const;\n\n` +
    `export type StaticLineId = keyof typeof LINE_STATION_SEQUENCES;\n` +
    `export type StaticLineStationSequence = (typeof LINE_STATION_SEQUENCES)[StaticLineId];\n`
  );
};

const main = async (): Promise<void> => {
  const lines = Lines.filter((line) => INCLUDED_MODES.has(line.modeName)).map((line) => ({
    id: line.id,
    name: line.name,
    modeName: line.modeName,
  }));

  console.log(`Fetching station sequences for ${lines.length} lines...`);
  const sequences = await mapConcurrent(lines, MAX_CONCURRENCY, async (line) => {
    const sequence = await fetchLine(line);
    console.log(`  ${line.id}: ${sequence.stations.length} stations`);
    return sequence;
  });

  const content = render(sequences);
  const temporaryPath = `${OUTPUT_PATH}.tmp`;
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(temporaryPath, content);
  fs.renameSync(temporaryPath, OUTPUT_PATH);
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
