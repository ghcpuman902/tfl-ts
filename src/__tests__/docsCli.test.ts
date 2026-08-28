import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  DOC_MANIFEST,
  DocsError,
  catDoc,
  findDocs,
  grepDocs,
  grepDocsPage,
  listDocs,
  readDoc,
  readDocSlice,
  resolveDocsPackageRoot,
  setDocsPackageRootForTests,
} from '../docs';
import { runDocsCommand } from '../bin/docs';

const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8')) as {
  files: string[];
};

const isCoveredByPackageFiles = (docPath: string, files: string[]): boolean =>
  files.some((entry) => {
    if (entry.endsWith('/')) {
      return docPath.startsWith(entry);
    }
    return docPath === entry;
  });

describe('tfl docs catalogue', () => {
  afterEach(() => {
    setDocsPackageRootForTests(undefined);
  });

  test('listDocs returns the full manifest with unique ids', () => {
    const docs = listDocs();
    expect(docs).toBe(DOC_MANIFEST);
    expect(docs.length).toBeGreaterThan(0);
    const ids = docs.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(
      expect.arrayContaining(['CLAUDE.md', 'AGENTS.md', 'README.md', 'docs/mcp.md', 'docs/design/agent-friendly-cli.md']),
    );
  });

  test('every manifest path is covered by package.json files', () => {
    for (const entry of DOC_MANIFEST) {
      expect(isCoveredByPackageFiles(entry.path, packageJson.files)).toBe(true);
    }
  });

  test('every manifest entry resolves to real, non-empty content', () => {
    for (const entry of DOC_MANIFEST) {
      const content = catDoc(entry.id);
      expect(typeof content).toBe('string');
      expect(content.length).toBeGreaterThan(0);
    }
  });

  test('README.md and the design note can be read', () => {
    expect(readDoc('README.md')).toContain('tfl-ts');
    expect(readDoc('docs/design/agent-friendly-cli.md')).toContain('vgpu');
  });

  test('catDoc is case-insensitive and accepts the manifest path as well as id', () => {
    const byId = catDoc('CLAUDE.md');
    const byLowercase = catDoc('claude.md');
    expect(byLowercase).toBe(byId);
    expect(byId).toContain('tfl-ts — Agent Quick Start');
  });

  test('catDoc throws a listing error for unknown ids', () => {
    expect(() => catDoc('does-not-exist.md')).toThrow(DocsError);
    expect(() => catDoc('does-not-exist.md')).toThrow(/Unknown doc id: does-not-exist\.md/);
    expect(() => catDoc('does-not-exist.md')).toThrow(/CLAUDE\.md/);
    try {
      catDoc('does-not-exist.md');
    } catch (error) {
      expect(error).toBeInstanceOf(DocsError);
      expect((error as DocsError).code).toBe('TFL_DOCS_UNKNOWN_ID');
    }
  });

  test('findDocs ranks the most relevant doc first', () => {
    const matches = findDocs('mcp');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].id).toBe('docs/mcp.md');
  });

  test('resolveDocsPackageRoot skips dist/*/package.json and finds name tfl-ts', () => {
    const root = mkdtempSync(join(tmpdir(), 'tfl-docs-root-'));
    try {
      writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'tfl-ts', version: '0.0.0' }));
      writeFileSync(join(root, 'CLAUDE.md'), 'fixture quick start\n');
      mkdirSync(join(root, 'dist/cjs'), { recursive: true });
      mkdirSync(join(root, 'dist/esm'), { recursive: true });
      writeFileSync(join(root, 'dist/cjs/package.json'), JSON.stringify({ type: 'commonjs' }));
      writeFileSync(join(root, 'dist/esm/package.json'), JSON.stringify({ type: 'module' }));

      expect(resolveDocsPackageRoot(join(root, 'dist/cjs'))).toBe(root);
      expect(resolveDocsPackageRoot(join(root, 'dist/esm'))).toBe(root);

      setDocsPackageRootForTests(root);
      expect(catDoc('CLAUDE.md')).toContain('fixture quick start');
    } finally {
      setDocsPackageRootForTests(undefined);
      rmSync(root, { recursive: true, force: true });
    }
  });

  test('findDocs falls back to document bodies', () => {
    const caching = findDocs('caching');
    expect(caching.map((entry) => entry.id)).toContain('docs/agent.md');

    const hubs = findDocs('STATION_HUBS');
    expect(hubs.length).toBeGreaterThan(0);
    expect(hubs.some((entry) => entry.id === 'CLAUDE.md' || entry.id === 'AGENTS.md')).toBe(true);
  });

  test('findDocs multi-word queries require every term', () => {
    const narrowed = findDocs('caching guidance');
    expect(narrowed.map((entry) => entry.id)).toContain('docs/agent.md');
    expect(findDocs('caching guidance').length).toBeLessThanOrEqual(findDocs('caching').length);
  });

  test('findDocs ranking is deterministic', () => {
    const first = findDocs('mcp').map((entry) => entry.id);
    const second = findDocs('mcp').map((entry) => entry.id);
    expect(first).toEqual(second);
  });

  test('findDocs returns an empty array for a query with no matches', () => {
    expect(findDocs('totally-unrelated-nonsense-query')).toEqual([]);
  });

  test('findDocs returns an empty array for an empty query', () => {
    expect(findDocs('   ')).toEqual([]);
  });

  test('runDocsCommand throws TFL_DOCS_NOT_FOUND for find and grep misses', () => {
    try {
      runDocsCommand(['find', 'totally-unrelated-nonsense-query']);
      throw new Error('expected throw');
    } catch (error) {
      expect(error).toBeInstanceOf(DocsError);
      expect((error as DocsError).code).toBe('TFL_DOCS_NOT_FOUND');
    }

    try {
      runDocsCommand(['grep', 'totally-unrelated-nonsense-token-zzzz']);
      throw new Error('expected throw');
    } catch (error) {
      expect(error).toBeInstanceOf(DocsError);
      expect((error as DocsError).code).toBe('TFL_DOCS_NOT_FOUND');
    }
  });

  test('grepDocs finds a known term across multiple docs, case-sensitively by default', () => {
    const matches = grepDocs('STATION_HUBS');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some((match) => match.id === 'CLAUDE.md')).toBe(true);
    matches.forEach((match) => {
      expect(match.text).toEqual(expect.stringContaining('STATION_HUBS'));
    });
  });

  test('grepDocs case-insensitive mode matches regardless of case', () => {
    const caseSensitive = grepDocs('station_hubs');
    const caseInsensitive = grepDocs('station_hubs', { caseInsensitive: true });
    expect(caseInsensitive.length).toBeGreaterThanOrEqual(caseSensitive.length);
    expect(caseInsensitive.some((match) => match.text.includes('STATION_HUBS'))).toBe(true);
  });

  test('grepDocs throws for an empty pattern', () => {
    expect(() => grepDocs('')).toThrow(/Expected a search pattern/);
  });

  test('grepDocs does not swallow missing manifest files', () => {
    const root = mkdtempSync(join(tmpdir(), 'tfl-docs-'));
    setDocsPackageRootForTests(root);
    try {
      expect(() => grepDocs('STATION_HUBS')).toThrow(DocsError);
      expect(() => grepDocs('STATION_HUBS')).toThrow(/missing on disk/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  test('readDocSlice paginates first, middle, and final windows', () => {
    const full = readDoc('CLAUDE.md').split('\n');
    const first = readDocSlice('CLAUDE.md', { offset: 0, limit: 10 });
    expect(first.offset).toBe(0);
    expect(first.limit).toBe(10);
    expect(first.totalLines).toBe(full.length);
    expect(first.content.split('\n')).toEqual(full.slice(0, 10));
    expect(first.truncated).toBe(true);
    expect(first.nextOffset).toBe(10);

    const middle = readDocSlice('CLAUDE.md', { offset: 10, limit: 10 });
    expect(middle.content.split('\n')).toEqual(full.slice(10, 20));
    expect(middle.nextOffset).toBe(20);

    const lastWindow = Math.max(0, full.length - 5);
    const last = readDocSlice('CLAUDE.md', { offset: lastWindow, limit: 10 });
    expect(last.truncated).toBe(false);
    expect(last.nextOffset).toBeNull();
    expect(last.content.split('\n')).toEqual(full.slice(lastWindow));
  });

  test('readDocSlice handles out-of-range offset and invalid limits', () => {
    const full = readDoc('CLAUDE.md').split('\n');
    const pastEnd = readDocSlice('CLAUDE.md', { offset: full.length + 10, limit: 20 });
    expect(pastEnd.content).toBe('');
    expect(pastEnd.truncated).toBe(false);
    expect(pastEnd.nextOffset).toBeNull();

    expect(() => readDocSlice('CLAUDE.md', { offset: -1 })).toThrow(DocsError);
    expect(() => readDocSlice('CLAUDE.md', { limit: 0 })).toThrow(DocsError);
    expect(() => readDocSlice('CLAUDE.md', { limit: 201 })).toThrow(DocsError);
  });

  test('grepDocsPage reports total, truncation, and next offset', () => {
    const all = grepDocs('the', { caseInsensitive: true });
    expect(all.length).toBeGreaterThan(5);
    const page = grepDocsPage('the', { caseInsensitive: true, offset: 0, limit: 3 });
    expect(page.totalMatches).toBe(all.length);
    expect(page.matches).toEqual(all.slice(0, 3));
    expect(page.truncated).toBe(true);
    expect(page.nextOffset).toBe(3);

    const rest = grepDocsPage('the', { caseInsensitive: true, offset: 3, limit: 200 });
    expect(rest.matches.length).toBeGreaterThan(0);
    expect(rest.totalMatches).toBe(all.length);
    if (all.length > 203) {
      expect(rest.truncated).toBe(true);
      expect(rest.nextOffset).toBe(203);
    } else {
      expect(rest.truncated).toBe(false);
      expect(rest.nextOffset).toBeNull();
      expect(rest.matches.length).toBe(all.length - 3);
    }
  });

  test('AGENTS.md and CLAUDE.md share the critical facts', () => {
    const agents = readDoc('AGENTS.md');
    const claude = readDoc('CLAUDE.md');
    const required = ['LINE_STATION_SEQUENCES', 'STATION_HUBS', 'client.raw', 'pnpm run build', 'tfl docs', 'tfl-ts/ui'];
    for (const token of required) {
      expect(agents).toContain(token);
      expect(claude).toContain(token);
    }
  });
});
