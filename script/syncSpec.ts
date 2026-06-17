import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const SWAGGER_URL = 'https://api.tfl.gov.uk/swagger/docs/v1';
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'generated', 'openapi');
const SPEC_PATH = path.join(OUTPUT_DIR, 'tfl-v1.json');
const META_PATH = path.join(OUTPUT_DIR, 'spec.meta.json');

const syncSpec = async (): Promise<void> => {
  console.log(`Fetching OpenAPI spec from ${SWAGGER_URL}...`);
  const response = await fetch(SWAGGER_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch spec: ${response.status} ${response.statusText}`);
  }

  const body = await response.text();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(SPEC_PATH, body);

  const sha256 = crypto.createHash('sha256').update(body).digest('hex');
  const parsed = JSON.parse(body) as { paths: Record<string, unknown> };
  const meta = {
    fetchedAt: new Date().toISOString(),
    sha256,
    source: SWAGGER_URL,
    pathCount: Object.keys(parsed.paths).length,
  };

  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));
  console.log(`Saved ${SPEC_PATH} (${meta.pathCount} paths, sha256=${sha256.slice(0, 12)}...)`);
};

syncSpec().catch((error) => {
  console.error(error);
  process.exit(1);
});
