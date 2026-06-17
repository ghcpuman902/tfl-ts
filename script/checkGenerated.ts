import { execSync } from 'child_process';
import path from 'path';

const ROOT = path.join(__dirname, '..');

/** Files that may change on every generate run (timestamps only). */
const EXCLUDED_FROM_DRIFT_CHECK = new Set([
  'src/generated/generated.meta.json',
]);

const checkGenerated = (): void => {
  console.log('Regenerating from committed OpenAPI snapshot...');
  execSync('pnpm run generate:types && pnpm run generate:raw && pnpm run generate:jsdoc', {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, TFL_SKIP_GENERATED_META: '1' },
  });

  console.log('Checking for uncommitted generated file changes...');
  const diff = execSync('git diff --name-only src/generated', { cwd: ROOT, encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean)
    .filter((file) => !EXCLUDED_FROM_DRIFT_CHECK.has(file));

  if (diff.length > 0) {
    console.error('Generated artifacts are out of date:\n', diff.join('\n'));
    console.error('Run `pnpm run generate` and commit the changes.');
    process.exit(1);
  }

  console.log('Generated artifacts match committed snapshot.');
  console.log(
    '(generated.meta.json is not updated during verification; run `pnpm run generate` to refresh timestamps.)',
  );
};

checkGenerated();
