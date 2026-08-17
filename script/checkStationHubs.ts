import { LINE_STATION_SEQUENCES } from '../src/generated/meta/StationSequence';
import { STATION_HUB_LIST, STATION_HUBS } from '../src/generated/meta/StationHubs';

const expectedStationIds = new Set<string>();
for (const sequence of Object.values(LINE_STATION_SEQUENCES)) {
  if (sequence.modeName === 'river-bus') continue;
  for (const station of sequence.stations) {
    const id = station.id.trim();
    if (id) expectedStationIds.add(id);
  }
}

const failures: string[] = [];

if (STATION_HUB_LIST.length === 0) {
  failures.push('STATION_HUB_LIST is empty');
}

for (const id of expectedStationIds) {
  if (!STATION_HUBS[id]) {
    failures.push(`${id}: missing hub snapshot`);
  }
}

for (const hub of STATION_HUB_LIST) {
  if (hub.members.length === 0) {
    failures.push(`${hub.hubId ?? '(no hub)'}: no members`);
  }
  if (hub.members.some((member) => !member.id || !member.name)) {
    failures.push(`${hub.hubId ?? hub.members[0]?.id ?? '(unknown)'}: unnamed member`);
  }
  for (const member of hub.members) {
    const indexed = STATION_HUBS[member.id];
    if (indexed !== hub) {
      failures.push(`${member.id}: index does not point at its hub`);
    }
  }
  if (hub.hubId && STATION_HUBS[hub.hubId] !== hub) {
    failures.push(`${hub.hubId}: hub id is not indexed`);
  }
  for (const [lineId, memberId] of Object.entries(hub.lineMemberIds)) {
    if (!memberId) failures.push(`${hub.hubId ?? 'hub'}: empty lineMemberIds.${lineId}`);
  }
}

if (failures.length > 0) {
  console.error(`Static station-hub validation failed:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(
  `Validated ${STATION_HUB_LIST.length} station hubs covering ${expectedStationIds.size} sequence stations.`
);
