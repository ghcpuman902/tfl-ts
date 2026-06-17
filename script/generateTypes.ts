import { execSync } from 'child_process';
import path from 'path';
import { readFileSync } from 'fs';
import { recordGeneratedArtifact } from './generatedMeta';

const ROOT = path.join(__dirname, '..');
const PACKAGE_JSON = path.join(ROOT, 'package.json');

const main = (): void => {
  execSync(
    'swagger-typescript-api generate -p ./src/generated/openapi/tfl-v1.json -o ./src/generated -n types.ts --no-client --generate-union-enums --patch --extract-enums',
    { cwd: ROOT, stdio: 'inherit' },
  );

  const pkg = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8')) as {
    devDependencies?: Record<string, string>;
  };
  const toolVersion = pkg.devDependencies?.['swagger-typescript-api'] ?? 'unknown';

  recordGeneratedArtifact('types', {
    tool: 'swagger-typescript-api',
    toolVersion,
  });

  console.log('Recorded types generation in src/generated/generated.meta.json');
};

main();
