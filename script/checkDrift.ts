import fs from 'fs';
import path from 'path';

const SWAGGER_URL = 'https://api.tfl.gov.uk/swagger/docs/v1';
const SPEC_PATH = path.join(__dirname, '..', 'src', 'generated', 'openapi', 'tfl-v1.json');

type SwaggerDoc = {
  paths: Record<string, Record<string, { operationId?: string; tags?: string[] }>>;
};

const loadPaths = (doc: SwaggerDoc): string[] =>
  Object.keys(doc.paths).sort();

const checkDrift = async (): Promise<void> => {
  const committed = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8')) as SwaggerDoc;
  const committedPaths = new Set(loadPaths(committed));

  console.log(`Committed snapshot: ${committedPaths.size} paths`);

  const response = await fetch(SWAGGER_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch live spec: ${response.status}`);
  }

  const live = (await response.json()) as SwaggerDoc;
  const livePaths = new Set(loadPaths(live));

  const added = [...livePaths].filter((p) => !committedPaths.has(p));
  const removed = [...committedPaths].filter((p) => !livePaths.has(p));

  if (added.length === 0 && removed.length === 0) {
    console.log('No REST endpoint drift detected.');
    return;
  }

  if (added.length > 0) {
    console.log('\nAdded in live spec:');
    added.forEach((p) => console.log(`  + ${p}`));
  }

  if (removed.length > 0) {
    console.log('\nRemoved from live spec:');
    removed.forEach((p) => console.log(`  - ${p}`));
  }

  console.log('\nRun `pnpm run sync:spec` and regenerate to update the committed snapshot.');
  process.exit(1);
};

checkDrift().catch((error) => {
  console.error(error);
  process.exit(1);
});
