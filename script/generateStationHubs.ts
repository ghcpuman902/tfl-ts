import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { LINE_STATION_SEQUENCES } from '../src/generated/meta/StationSequence';
import type { StationHubInfo, StationHubMember } from '../src/generated/meta/StationHubs';
import { normalizeLineId } from '../src/utils/ui';

config();

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'generated', 'meta', 'StationHubs.ts');
const MAX_CONCURRENCY = 2;
const MAX_ATTEMPTS = 6;
const MIN_REQUEST_GAP_MS = 200;

type RawLineRef = { id?: string; name?: string };

type RawLineGroup = {
  naptanIdReference?: string;
  stationAtcoCode?: string;
  lineIdentifier?: string[];
};

type RawStop = {
  id?: string;
  naptanId?: string;
  commonName?: string;
  fullName?: string;
  stopType?: string;
  placeType?: string;
  modes?: string[];
  lines?: RawLineRef[];
  hubNaptanCode?: string;
  children?: RawStop[];
  lineGroup?: RawLineGroup[];
};

const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const isDroppedType = (type?: string): boolean =>
  /access|entrance|gate|unmarked|boarding/i.test(type ?? '');

const isStationType = (type?: string): boolean =>
  /station|interchange|ferryport/i.test(type ?? '');

const stopId = (stop: RawStop): string | undefined => stop.id ?? stop.naptanId;

const stopName = (stop: RawStop): string | undefined => stop.commonName ?? stop.fullName;

let nextRequestAt = 0;

const waitForRateSlot = async (): Promise<void> => {
  const now = Date.now();
  const startAt = Math.max(now, nextRequestAt);
  nextRequestAt = startAt + MIN_REQUEST_GAP_MS;
  if (startAt > now) {
    await sleep(startAt - now);
  }
};

const fetchJson = async <T>(url: string): Promise<T> => {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await waitForRateSlot();
      const response = await fetch(url);
      if (response.status === 429) {
        const retryAfter = Number(response.headers.get('retry-after'));
        const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : Math.min(attempt * 4000, 20000);
        throw new Error(`HTTP 429 Too Many Requests (retry in ${waitMs}ms)`);
      }
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < MAX_ATTEMPTS) {
        const retryMatch = lastError.message.match(/retry in (\d+)ms/);
        const waitMs = retryMatch ? Number(retryMatch[1]) : attempt * 500;
        await sleep(waitMs);
      }
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
};

const stopPointUrl = (id: string): string => {
  const params = new URLSearchParams();
  const appId = process.env.TFL_APP_ID;
  const appKey = process.env.TFL_APP_KEY;
  if (appId) params.set('app_id', appId);
  if (appKey) params.set('app_key', appKey);
  const query = params.toString();
  return `https://api.tfl.gov.uk/StopPoint/${encodeURIComponent(id)}${query ? `?${query}` : ''}`;
};

const collectSequenceStations = (): {
  stationIds: string[];
  linesByStation: Map<string, Set<string>>;
  nameByStation: Map<string, string>;
} => {
  const linesByStation = new Map<string, Set<string>>();
  const nameByStation = new Map<string, string>();

  for (const sequence of Object.values(LINE_STATION_SEQUENCES)) {
    for (const station of sequence.stations) {
      const id = station.id.trim();
      if (!id) continue;
      nameByStation.set(id, station.name);
      const lines = linesByStation.get(id) ?? new Set<string>();
      lines.add(sequence.lineId);
      linesByStation.set(id, lines);
    }
  }

  return {
    stationIds: [...linesByStation.keys()].sort(),
    linesByStation,
    nameByStation,
  };
};

const keepAsMember = (
  stop: RawStop,
  sequenceIds: ReadonlySet<string>
): boolean => {
  const id = stopId(stop);
  if (!id) return false;
  if (isDroppedType(stop.stopType) || isDroppedType(stop.placeType)) return false;
  if (sequenceIds.has(id)) return true;
  return isStationType(stop.stopType) || isStationType(stop.placeType);
};

const toMember = (
  stop: RawStop,
  linesByStation: Map<string, Set<string>>,
  nameByStation: Map<string, string>
): StationHubMember | undefined => {
  const id = stopId(stop);
  if (!id) return undefined;
  const name = stopName(stop) ?? nameByStation.get(id);
  if (!name) return undefined;
  const sequenceLines = linesByStation.get(id);
  const apiLines = (stop.lines ?? []).map((line) => line.id).filter((line): line is string => Boolean(line));
  const lines = [...new Set([...(sequenceLines ?? []), ...apiLines])].sort();
  return {
    id,
    name,
    stopType: stop.stopType ?? stop.placeType ?? '',
    modes: [...(stop.modes ?? [])].sort(),
    lines,
  };
};

const isHubRootNode = (stop: RawStop): boolean =>
  Boolean(stop.hubNaptanCode) && stopId(stop) === stop.hubNaptanCode;

const collectMembers = (
  stop: RawStop,
  sequenceIds: ReadonlySet<string>,
  linesByStation: Map<string, Set<string>>,
  nameByStation: Map<string, string>
): StationHubMember[] => {
  const byId = new Map<string, StationHubMember>();
  const consider = (candidate: RawStop): void => {
    if (!keepAsMember(candidate, sequenceIds)) return;
    const member = toMember(candidate, linesByStation, nameByStation);
    if (member) byId.set(member.id, member);
  };

  // The hub root (TfL's TransportInterchange node, e.g. HUBLST) aggregates every
  // mode at the site, buses included. It duplicates hubId/hubName if kept as a
  // member, so only its children (the physical stations) become members.
  if (!isHubRootNode(stop)) {
    consider(stop);
  }
  for (const child of stop.children ?? []) {
    consider(child);
  }
  return [...byId.values()];
};

const collectLineMemberIds = (stop: RawStop): Record<string, string> => {
  const lineMemberIds: Record<string, string> = {};
  for (const group of stop.lineGroup ?? []) {
    const memberId = group.naptanIdReference ?? group.stationAtcoCode;
    if (!memberId) continue;
    for (const lineId of group.lineIdentifier ?? []) {
      const normalized = normalizeLineId(lineId);
      const existing = lineMemberIds[normalized];
      if (!existing || existing === stop.hubNaptanCode) {
        lineMemberIds[normalized] = memberId;
      }
    }
  }
  return lineMemberIds;
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

const mergeHubs = (
  fetched: Array<{ queriedId: string; stop: RawStop }>,
  sequenceIds: ReadonlySet<string>,
  linesByStation: Map<string, Set<string>>,
  nameByStation: Map<string, string>
): StationHubInfo[] => {
  type Acc = {
    hubId?: string;
    hubName?: string;
    members: Map<string, StationHubMember>;
    lineMemberIds: Record<string, string>;
  };

  const byKey = new Map<string, Acc>();

  const keyFor = (stop: RawStop, queriedId: string): string =>
    stop.hubNaptanCode ?? stopId(stop) ?? queriedId;

  for (const { queriedId, stop } of fetched) {
    const key = keyFor(stop, queriedId);
    const existing = byKey.get(key) ?? {
      hubId: stop.hubNaptanCode,
      hubName: stop.hubNaptanCode ? stopName(stop) : undefined,
      members: new Map<string, StationHubMember>(),
      lineMemberIds: {},
    };

    if (!existing.hubId && stop.hubNaptanCode) existing.hubId = stop.hubNaptanCode;
    if (!existing.hubName && stop.hubNaptanCode) existing.hubName = stopName(stop);

    for (const member of collectMembers(stop, sequenceIds, linesByStation, nameByStation)) {
      const prior = existing.members.get(member.id);
      existing.members.set(member.id, {
        id: member.id,
        name: member.name,
        stopType: member.stopType || prior?.stopType || '',
        modes: [...new Set([...(prior?.modes ?? []), ...member.modes])].sort(),
        lines: [...new Set([...(prior?.lines ?? []), ...member.lines])].sort(),
      });
    }

    const queriedName = nameByStation.get(queriedId);
    if (queriedName && !existing.members.has(queriedId)) {
      existing.members.set(queriedId, {
        id: queriedId,
        name: queriedName,
        stopType: '',
        modes: [],
        lines: [...(linesByStation.get(queriedId) ?? [])].sort(),
      });
    }

    Object.assign(existing.lineMemberIds, collectLineMemberIds(stop));
    byKey.set(key, existing);
  }

  for (const hub of byKey.values()) {
    for (const member of hub.members.values()) {
      for (const lineId of member.lines) {
        const normalized = normalizeLineId(lineId);
        const existing = hub.lineMemberIds[normalized];
        if (!existing || existing === hub.hubId) {
          hub.lineMemberIds[normalized] = member.id;
        }
      }
    }
  }

  return [...byKey.values()]
    .map((hub) => {
      const members = [...hub.members.values()].sort((a, b) => a.id.localeCompare(b.id));
      // TfL's raw lineGroup mixes bus routes into the same list as rail/tube
      // lines (naptanIdReference pointing at a bus stop ATCO code). Keep only
      // entries that resolve to a real station member or the hub itself, which
      // drops bus routes without needing to guess at line-id patterns.
      const memberIds = new Set(members.map((member) => member.id));
      if (hub.hubId) memberIds.add(hub.hubId);
      const lineMemberIds = Object.fromEntries(
        Object.entries(hub.lineMemberIds)
          .filter(([, memberId]) => memberIds.has(memberId))
          .sort(([a], [b]) => a.localeCompare(b))
      );
      return {
        ...(hub.hubId ? { hubId: hub.hubId } : {}),
        ...(hub.hubName ? { hubName: hub.hubName } : {}),
        members,
        lineMemberIds,
      };
    })
    .sort((a, b) => (a.hubId ?? a.members[0]?.id ?? '').localeCompare(b.hubId ?? b.members[0]?.id ?? ''));
};

const render = (hubs: StationHubInfo[]): string =>
  `// Generated from TfL StopPoint hub data. Do not edit by hand.\n` +
  `// Static topology only: hub membership and per-line arrival StopPoint ids; no operational state.\n` +
  `// Regenerate with: pnpm run generate -- --only=station-hubs\n\n` +
  `export type StationHubMember = {\n` +
  `  id: string;\n` +
  `  name: string;\n` +
  `  stopType: string;\n` +
  `  modes: readonly string[];\n` +
  `  lines: readonly string[];\n` +
  `};\n\n` +
  `export type StationHubInfo = {\n` +
  `  hubId?: string;\n` +
  `  hubName?: string;\n` +
  `  members: readonly StationHubMember[];\n` +
  `  lineMemberIds: Readonly<Record<string, string>>;\n` +
  `};\n\n` +
  `export const STATION_HUBS_GENERATED_AT = ${JSON.stringify(new Date().toISOString())};\n\n` +
  `export const STATION_HUB_LIST: readonly StationHubInfo[] = ${JSON.stringify(hubs, null, 2)};\n\n` +
  `const indexHubs = (hubs: readonly StationHubInfo[]): Readonly<Record<string, StationHubInfo>> => {\n` +
  `  const index: Record<string, StationHubInfo> = {};\n` +
  `  for (const hub of hubs) {\n` +
  `    if (hub.hubId) index[hub.hubId] = hub;\n` +
  `    for (const member of hub.members) {\n` +
  `      index[member.id] = hub;\n` +
  `    }\n` +
  `  }\n` +
  `  return index;\n` +
  `};\n\n` +
  `export const STATION_HUBS: Readonly<Record<string, StationHubInfo>> = indexHubs(STATION_HUB_LIST);\n`;

const unwrapStop = (payload: RawStop | RawStop[]): RawStop => {
  if (Array.isArray(payload)) {
    if (!payload[0]) throw new Error('TfL returned an empty StopPoint array');
    return payload[0];
  }
  return payload;
};

const main = async (): Promise<void> => {
  if (!process.env.TFL_APP_KEY) {
    throw new Error(
      'Missing TFL_APP_KEY. Subscribe to "500 Requests per min" at https://api-portal.tfl.gov.uk/, then Profile → Show Primary key.\nSet TFL_APP_KEY in .env'
    );
  }

  const { stationIds, linesByStation, nameByStation } = collectSequenceStations();
  const sequenceIds = new Set(stationIds);
  console.log(`Fetching StopPoint hubs for ${stationIds.length} stations...`);

  const fetched = await mapConcurrent(stationIds, MAX_CONCURRENCY, async (id) => {
    const payload = await fetchJson<RawStop | RawStop[]>(stopPointUrl(id));
    const stop = unwrapStop(payload);
    process.stdout.write('.');
    return { queriedId: id, stop };
  });
  process.stdout.write('\n');

  const hubs = mergeHubs(fetched, sequenceIds, linesByStation, nameByStation);
  const content = render(hubs);
  const temporaryPath = `${OUTPUT_PATH}.tmp`;
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(temporaryPath, content);
  fs.renameSync(temporaryPath, OUTPUT_PATH);
  console.log(`Wrote ${path.relative(process.cwd(), OUTPUT_PATH)} (${hubs.length} hubs)`);
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
