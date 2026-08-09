import { Lines } from '../src/generated/meta/Line';
import { LINE_STATION_SEQUENCES } from '../src/generated/meta/StationSequence';

const INCLUDED_MODES = new Set(['tube', 'elizabeth-line', 'dlr', 'overground', 'tram']);

type Sequence = {
  lineId: string;
  stations: readonly { id: string; name: string }[];
  branches: readonly {
    direction: string;
    stationIds: readonly string[];
  }[];
  orderedRoutes: readonly {
    direction: string;
    stationIds: readonly string[];
  }[];
};

const sequences = LINE_STATION_SEQUENCES as Record<string, Sequence>;
const expectedLineIds = Lines.filter((line) => INCLUDED_MODES.has(line.modeName)).map(
  (line) => line.id
);
const expectedLineIdSet = new Set<string>(expectedLineIds);
const failures: string[] = [];

for (const lineId of expectedLineIds) {
  const sequence = sequences[lineId];
  if (!sequence) {
    failures.push(`${lineId}: missing snapshot`);
    continue;
  }

  const stationIds = new Set(sequence.stations.map((station) => station.id));
  if (sequence.stations.length < 2) failures.push(`${lineId}: fewer than two stations`);
  if (sequence.stations.some((station) => !station.id || !station.name)) {
    failures.push(`${lineId}: unnamed station`);
  }

  for (const direction of ['inbound', 'outbound']) {
    if (!sequence.branches.some((branch) => branch.direction === direction)) {
      failures.push(`${lineId}: no ${direction} branch`);
    }
    if (!sequence.orderedRoutes.some((route) => route.direction === direction)) {
      failures.push(`${lineId}: no ${direction} ordered route`);
    }
  }

  const referencedIds = [
    ...sequence.branches.flatMap((branch) => branch.stationIds),
    ...sequence.orderedRoutes.flatMap((route) => route.stationIds),
  ];
  const unresolved = referencedIds.filter((id) => !stationIds.has(id));
  if (unresolved.length > 0) {
    failures.push(`${lineId}: unresolved IDs ${[...new Set(unresolved)].join(', ')}`);
  }
}

const unexpected = Object.keys(sequences).filter((lineId) => !expectedLineIdSet.has(lineId));
if (unexpected.length > 0) failures.push(`unexpected lines: ${unexpected.join(', ')}`);

if (failures.length > 0) {
  console.error(`Static station-sequence validation failed:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(
  `Validated ${expectedLineIds.length} static line topologies with station names, branches, and ordered routes.`
);
