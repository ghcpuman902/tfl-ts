/**
 * Native Node ESM does not guess extensions and rejects directory imports.
 * tsc with module ES2020 leaves `from './foo'` in dist/esm. This pass rewrites
 * those specifiers to `./foo.js` or `./foo/index.js` using the files tsc just
 * emitted. Source stays extensionless so CJS tsc (node10) still resolves.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import path from 'path';

const ROOT = path.join(__dirname, '..');
const ESM_ROOT = path.join(ROOT, 'dist/esm');

const HAS_EXTENSION = /\.(?:js|mjs|cjs|json|node)$/;
const FROM_OR_DYNAMIC_IMPORT =
  /(\bfrom\s+|\bimport\s*\(\s*)(['"])(\.\.?\/[^'"]+)\2/g;

export const resolveRelativeSpecifier = (fromFile: string, specifier: string): string => {
  if (!specifier.startsWith('.')) {
    return specifier;
  }
  if (HAS_EXTENSION.test(specifier)) {
    return specifier;
  }

  const fromDir = path.dirname(fromFile);
  const absolute = path.resolve(fromDir, specifier);
  const asJs = `${absolute}.js`;
  const asJson = `${absolute}.json`;
  const asIndex = path.join(absolute, 'index.js');

  if (existsSync(asJs)) {
    return `${specifier}.js`;
  }
  if (existsSync(asIndex)) {
    return `${specifier}/index.js`;
  }
  if (existsSync(asJson)) {
    return `${specifier}.json`;
  }

  throw new Error(`Cannot resolve ESM specifier ${JSON.stringify(specifier)} from ${fromFile}`);
};

export const rewriteFileContents = (fromFile: string, source: string): string => {
  const withSpecifiers = source.replace(
    FROM_OR_DYNAMIC_IMPORT,
    (full, prefix: string, quote: string, specifier: string) => {
      const next = resolveRelativeSpecifier(fromFile, specifier);
      return `${prefix}${quote}${next}${quote}`;
    },
  );
  const withJsonAttributes = withSpecifiers.replace(
    /(\bfrom\s+)(['"])(\.\.?\/[^'"]+\.json)\2(?!\s*(?:with|assert)\b)/g,
    '$1$2$3$2 with { type: \'json\' }',
  );
  return withJsonAttributes.replace(
    /createRequire\(\s*__filename\s*\)/g,
    'createRequire(import.meta.url)',
  );
};

const walkJsFiles = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkJsFiles(full));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith('.js') && !entry.name.endsWith('.d.ts')) {
      out.push(full);
    }
  }
  return out;
};

const main = (): void => {
  if (!existsSync(ESM_ROOT) || !statSync(ESM_ROOT).isDirectory()) {
    console.error('dist/esm missing. Run tsc -p tsconfig.esm.json first.');
    process.exit(1);
  }

  const files = walkJsFiles(ESM_ROOT);
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    const next = rewriteFileContents(file, source);
    if (next !== source) {
      writeFileSync(file, next);
    }
  }
  console.log(`Rewrote ESM specifiers in ${files.length} files under dist/esm`);
};

if (require.main === module) {
  main();
}
