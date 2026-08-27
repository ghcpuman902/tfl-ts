import { DOC_MANIFEST, catDoc, findDocs, grepDocs, listDocs } from '../bin/docs';

describe('tfl docs CLI', () => {
  test('listDocs returns the full manifest', () => {
    const docs = listDocs();
    expect(docs).toBe(DOC_MANIFEST);
    expect(docs.length).toBeGreaterThan(0);
    expect(docs.map((entry) => entry.id)).toEqual(expect.arrayContaining(['CLAUDE.md', 'AGENTS.md', 'docs/mcp.md']));
  });

  test('every manifest entry resolves to real, non-empty content', () => {
    for (const entry of DOC_MANIFEST) {
      const content = catDoc(entry.id);
      expect(typeof content).toBe('string');
      expect(content.length).toBeGreaterThan(0);
    }
  });

  test('catDoc is case-insensitive and accepts the manifest path as well as id', () => {
    const byId = catDoc('CLAUDE.md');
    const byLowercase = catDoc('claude.md');
    expect(byLowercase).toBe(byId);
    expect(byId).toContain('tfl-ts — Agent Quick Start');
  });

  test('catDoc throws a clear, listing error for unknown ids', () => {
    expect(() => catDoc('does-not-exist.md')).toThrow(/Unknown doc id: does-not-exist\.md/);
    expect(() => catDoc('does-not-exist.md')).toThrow(/CLAUDE\.md/);
  });

  test('findDocs ranks the most relevant doc first', () => {
    const matches = findDocs('mcp');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].id).toBe('docs/mcp.md');
  });

  test('findDocs returns an empty array for a query with no matches', () => {
    expect(findDocs('totally-unrelated-nonsense-query')).toEqual([]);
  });

  test('findDocs returns an empty array for an empty query', () => {
    expect(findDocs('   ')).toEqual([]);
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
});
