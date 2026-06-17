import { execSync } from 'child_process';
import path from 'path';

const ROOT = path.join(__dirname, '..');

const checkGenerated = (): void => {
  console.log('Regenerating from committed OpenAPI snapshot...');
  execSync('npm run generate:types && npm run generate:raw && npm run generate:jsdoc', {
    cwd: ROOT,
    stdio: 'inherit',
  });

  console.log('Checking for uncommitted generated file changes...');
  const diff = execSync('git diff --name-only src/generated', { cwd: ROOT, encoding: 'utf8' }).trim();

  if (diff) {
    console.error('Generated artifacts are out of date:\n', diff);
    console.error('Run `pnpm run generate` and commit the changes.');
    process.exit(1);
  }

  console.log('Generated artifacts match committed snapshot.');
};

checkGenerated();
