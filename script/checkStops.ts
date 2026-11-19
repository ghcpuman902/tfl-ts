import { STOP_INDEX_DATA } from '../src/generated/stops/StopIndex';
import { validateStopIndexData } from '../src/stops/decode';
import { STATION_HUBS } from '../src/generated/meta/StationHubs';

const failures = validateStopIndexData(STOP_INDEX_DATA);
const stations = STOP_INDEX_DATA.stationCount;
const busStops = STOP_INDEX_DATA.id.length - stations;

if (stations === 0) failures.push('index has no stations');

// Every station row's hub id must be a hub we know about.
for (let row = 0; row < stations; row++) {
  const hubId = STOP_INDEX_DATA.hubs[STOP_INDEX_DATA.hub[row]];
  if (hubId && !STATION_HUBS[hubId]) failures.push(`${STOP_INDEX_DATA.id[row]}: unknown hub ${hubId}`);
}

if (failures.length > 0) {
  console.error(`Static stop-index validation failed:\n${failures.join('\n')}`);
  process.exit(1);
}

if (busStops === 0) {
  console.warn(
    'Stop index has stations only (no bus stops). Run `pnpm run generate -- --only=stops` with TFL_APP_KEY to add them.',
  );
}
console.log(`Validated stop index: ${stations} stations, ${busStops} bus stops (${STOP_INDEX_DATA.generatedAt}).`);
