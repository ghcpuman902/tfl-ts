import { spawnSync } from 'child_process';
import path from 'path';
import { readFileSync } from 'fs';
import { recordGeneratedArtifact } from './generatedMeta';

const ROOT = path.join(__dirname, '..');
const PACKAGE_JSON = path.join(ROOT, 'package.json');

/** Benign swagger-typescript-api noise when using --no-client (route rename / default templates). */
const BENIGN_PATTERNS: RegExp[] = [
  /already has method .* renamed to .*\d\(\)/,
  /Code generator will use the default template/,
];

const filterGeneratorOutput = (output: string): string =>
  output
    .split('\n')
    .filter((line) => !BENIGN_PATTERNS.some((pattern) => pattern.test(line)))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();

const main = (): void => {
  const result = spawnSync(
    'swagger-typescript-api',
    [
      'generate',
      '-p',
      './src/generated/openapi/tfl-v1.json',
      '-o',
      './src/generated',
      '-n',
      'types.ts',
      '--no-client',
      '--enum-style=union',
      '--patch',
      '--extract-enums',
    ],
    { cwd: ROOT, encoding: 'utf8' },
  );

  const combined = [result.stdout, result.stderr].filter(Boolean).join('\n');
  const filtered = filterGeneratorOutput(combined);

  if (filtered) {
    process.stdout.write(`${filtered}\n`);
  }

  if (result.status !== 0) {
    if (combined && filtered !== combined) {
      process.stderr.write('\n--- full generator output ---\n');
      process.stderr.write(combined);
    }
    process.exit(result.status ?? 1);
  }

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
