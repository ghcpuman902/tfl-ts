/**
 * Regenerate src/generated/stops/StopIndex.ts: every station plus every London
 * bus stop, for `tfl-ts/meta/stops`.
 *
 *   pnpm run generate -- --only=stops          # needs TFL_APP_KEY, about 25 requests
 *   pnpm exec ts-node script/generateStops.ts --offline   # stations only, no network
 *
 * The key is read from the environment and never printed.
 */
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { gzipSync } from 'zlib';
import {
  buildStopIndex,
  encodeStopIndex,
  stationRowsFromSeeds,
  stationSeedsFromGeoJson,
} from '../src/stops/build';
import type { StopIndexData } from '../src/stops/types';

config();

const ROOT = path.join(__dirname, '..');
const SEED_PATH = path.join(ROOT, 'script', 'data', 'all-stations.geojson');
const OUTPUT_PATH = path.join(ROOT, 'src', 'generated', 'stops', 'StopIndex.ts');

/** One column per line keeps diffs reviewable without bloating the file. */
export const renderStopIndexModule = (data: StopIndexData): string => {
  const body = (Object.keys(data) as Array<keyof StopIndexData>)
    .map((key) => `  ${JSON.stringify(key)}: ${JSON.stringify(data[key])},`)
    .join('\n');
  return (
    `// Generated from TfL StopPoint data. Do not edit by hand.\n` +
    `// Stations (script/data/all-stations.geojson) + London bus stops, columnar. Format: see src/stops/types.ts.\n` +
    `// Regenerate with: pnpm run generate -- --only=stops\n\n` +
    `import type { StopIndexData } from '../../stops/types';\n\n` +
    `export const STOP_INDEX_DATA: StopIndexData = {\n${body}\n};\n`
  );
};

const main = async (): Promise<void> => {
  const offline = process.argv.includes('--offline');
  const seeds = stationSeedsFromGeoJson(JSON.parse(fs.readFileSync(SEED_PATH, 'utf8')));
  console.log(`Station seed: ${seeds.length} stations`);

  let data: StopIndexData;
  if (offline) {
    data = encodeStopIndex(stationRowsFromSeeds(seeds));
    console.log('Offline: stations only, no bus stops.');
  } else {
    const appKey = process.env.TFL_APP_KEY;
    if (!appKey) {
      throw new Error(
        'Missing TFL_APP_KEY. Subscribe to "500 Requests per min" at https://api-portal.tfl.gov.uk/, then Profile → Show Primary key.\nSet TFL_APP_KEY in .env',
      );
    }
    let lastPhase = '';
    const { data: built, stats } = await buildStopIndex({
      appKey,
      stations: seeds,
      onProgress: ({ phase, done, total }) => {
        if (phase !== lastPhase) {
          if (lastPhase) process.stdout.write('\n');
          lastPhase = phase;
        }
        process.stdout.write(`\r[${phase}] ${done}${total ? `/${total}` : ''}   `);
      },
    });
    process.stdout.write('\n');
    data = built;
    console.log(
      `Fetched ${stats.requests} requests (${stats.retries} retries): ${stats.pages} pages, ` +
        `${stats.routeSequencesFetched} route sequences, ${stats.hubsFetched} hubs, ${stats.skipped} listing entries skipped.`,
    );
  }

  const content = renderStopIndexModule(data);
  const json = JSON.stringify(data);
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  const temporaryPath = `${OUTPUT_PATH}.tmp`;
  fs.writeFileSync(temporaryPath, content);
  fs.renameSync(temporaryPath, OUTPUT_PATH);
  console.log(
    `Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}: ${data.id.length} rows ` +
      `(${data.stationCount} stations, ${data.id.length - data.stationCount} bus stops), ` +
      `${json.length} bytes JSON, ${gzipSync(json).length} bytes gzip.`,
  );
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
