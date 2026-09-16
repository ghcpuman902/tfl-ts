import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';

export interface DocEntry {
  /** Stable identifier used on the command line, e.g. `tfl docs cat CLAUDE.md`. */
  id: string;
  /** Path relative to the package root (works in both the repo and the published npm tarball). */
  path: string;
  title: string;
  audience: string;
}

export interface DocGrepMatch {
  id: string;
  line: number;
  text: string;
}

export interface DocSlice {
  id: string;
  title: string;
  audience: string;
  totalLines: number;
  offset: number;
  limit: number;
  content: string;
  truncated: boolean;
  nextOffset: number | null;
}

export interface DocGrepPage {
  matches: DocGrepMatch[];
  totalMatches: number;
  offset: number;
  limit: number;
  truncated: boolean;
  nextOffset: number | null;
}

export type DocsErrorCode =
  | 'TFL_DOCS_UNKNOWN_ID'
  | 'TFL_DOCS_NOT_FOUND'
  | 'TFL_DOCS_INVALID_ARGUMENT'
  | 'TFL_DOCS_MISSING_FILE';

export class DocsError extends Error {
  readonly code: DocsErrorCode;
  readonly fix: string;

  constructor(code: DocsErrorCode, message: string, fix: string) {
    super(message);
    this.name = 'DocsError';
    this.code = code;
    this.fix = fix;
  }
}

export const FIND_RESULT_LIMIT = 20;
export const DOC_READ_DEFAULT_LIMIT = 80;
export const DOC_GREP_DEFAULT_LIMIT = 50;
export const DOC_PAGE_MAX_LIMIT = 200;

/**
 * Every file listed here must also be listed in `package.json`'s `files` array so it
 * ships in the npm tarball — `tfl docs` only ever reads from an installed package,
 * never from developer-only files like `LLM_context.md` or `.cursor/skills/`.
 */
export const DOC_MANIFEST: DocEntry[] = [
  {
    id: 'CLAUDE.md',
    path: 'CLAUDE.md',
    title: 'Agent quick start',
    audience: 'Any coding agent — start here',
  },
  {
    id: 'AGENTS.md',
    path: 'AGENTS.md',
    title: 'Cross-tool agent quick start',
    audience: 'Agents/tools that look for AGENTS.md specifically',
  },
  {
    id: 'README.md',
    path: 'README.md',
    title: 'Package README',
    audience: 'Humans and agents installing the package',
  },
  {
    id: 'docs/agent.md',
    path: 'docs/agent.md',
    title: 'Full module reference',
    audience: 'AI agents — deep reference',
  },
  {
    id: 'docs/mcp.md',
    path: 'docs/mcp.md',
    title: 'Local MCP server guide',
    audience: 'MCP client users',
  },
  {
    id: 'docs/REALTIME.md',
    path: 'docs/REALTIME.md',
    title: 'Realtime / deferred push polling',
    audience: 'Agents building live boards',
  },
  {
    id: 'docs/MIGRATION-v2.md',
    path: 'docs/MIGRATION-v2.md',
    title: 'v1 to v2 migration guide',
    audience: 'Upgraders',
  },
  {
    id: 'docs/design/agent-friendly-cli.md',
    path: 'docs/design/agent-friendly-cli.md',
    title: 'Why tfl docs and AGENTS.md exist',
    audience: 'Maintainers',
  },
  {
    id: 'docs/design/2.13-bundle.md',
    path: 'docs/design/2.13-bundle.md',
    title: '2.13 tree-shaking bundle ledger',
    audience: 'Maintainers',
  },
  {
    id: 'docs/design/evals.md',
    path: 'docs/design/evals.md',
    title: 'Why use-case evals are rates, not Jest gates',
    audience: 'Maintainers',
  },
  {
    id: 'examples/README.md',
    path: 'examples/README.md',
    title: 'Library to UI mapping',
    audience: 'Agents / UI builders',
  },
  {
    id: '.claude/skills/tfl-ts/SKILL.md',
    path: '.claude/skills/tfl-ts/SKILL.md',
    title: 'Usage patterns and gotchas',
    audience: 'Package consumers (Claude skill)',
  },
  {
    id: 'ERROR.md',
    path: 'ERROR.md',
    title: 'Error shapes and handling',
    audience: 'Anyone handling failures',
  },
  {
    id: 'CHANGELOG.md',
    path: 'CHANGELOG.md',
    title: 'Release notes',
    audience: 'Everyone',
  },
];

let packageRootOverride: string | undefined;

/** Test-only: point catalogue reads at a fixture directory. Pass undefined to restore. */
export const setDocsPackageRootForTests = (root: string | undefined): void => {
  packageRootOverride = root;
};

const PACKAGE_NAME = 'tfl-ts';

/**
 * Walk from a compiled or source file up to the directory whose package.json
 * `name` is `tfl-ts`. `join(__dirname, '..')` is `src/` in tests and `dist/`
 * after `tsc`, so it cannot be the catalogue root. Nested `dist/cjs/package.json`
 * and `dist/esm/package.json` only set `"type"` and must be skipped.
 */
export const resolveDocsPackageRoot = (fromDir: string): string => {
  let dir = fromDir;
  for (;;) {
    const pkgPath = join(dir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { name?: string };
        if (pkg.name === PACKAGE_NAME) {
          return dir;
        }
      } catch {
        // Keep walking; a truncated package.json is not the catalogue root.
      }
    }

    const parent = dirname(dir);
    if (parent === dir) {
      throw new DocsError(
        'TFL_DOCS_MISSING_FILE',
        `Could not find the tfl-ts package root starting from ${fromDir}.`,
        'Reinstall tfl-ts. Docs ship next to package.json (CLAUDE.md), not under dist/.',
      );
    }
    dir = parent;
  }
};

const packageRoot = (): string => packageRootOverride ?? resolveDocsPackageRoot(__dirname);

const knownIds = (): string => DOC_MANIFEST.map((entry) => entry.id).join(', ');

const resolveEntry = (id: string): DocEntry => {
  const normalized = id.trim().toLowerCase();
  const entry = DOC_MANIFEST.find(
    (candidate) => candidate.id.toLowerCase() === normalized || candidate.path.toLowerCase() === normalized,
  );

  if (!entry) {
    throw new DocsError(
      'TFL_DOCS_UNKNOWN_ID',
      `Unknown doc id: ${id}\nKnown ids: ${knownIds()}`,
      'Run "tfl docs ls" to see valid ids.',
    );
  }

  return entry;
};

export const listDocs = (): DocEntry[] => DOC_MANIFEST;

export const readDoc = (id: string): string => {
  const entry = resolveEntry(id);
  const filePath = join(packageRoot(), entry.path);

  if (!existsSync(filePath)) {
    throw new DocsError(
      'TFL_DOCS_MISSING_FILE',
      `Doc "${entry.id}" is listed in the manifest but missing on disk at ${filePath}.`,
      'Docs ship next to package.json (CLAUDE.md), not under dist/. Reinstall tfl-ts if this is an npm install.',
    );
  }

  return readFileSync(filePath, 'utf8');
};

/** CLI name for `tfl docs cat`. Same as `readDoc`. */
export const catDoc = readDoc;

const splitTerms = (query: string): string[] =>
  query.trim().toLowerCase().split(/\s+/).filter(Boolean);

const containsAllTerms = (haystack: string, terms: string[]): boolean =>
  terms.every((term) => haystack.includes(term));

const metadataRank = (query: string, entry: DocEntry): number => {
  const id = entry.id.toLowerCase();
  const title = entry.title.toLowerCase();
  const audience = entry.audience.toLowerCase();
  const blob = `${id} ${title} ${audience}`;
  const terms = splitTerms(query);

  if (!containsAllTerms(blob, terms)) {
    return -1;
  }

  if (id === query) {
    return 0;
  }
  if (id.startsWith(query)) {
    return 1;
  }
  if (id.includes(query) || title.includes(query)) {
    return 2;
  }
  return 3;
};

export const findDocs = (query: string): DocEntry[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  const terms = splitTerms(normalized);

  return DOC_MANIFEST.map((entry) => {
    const metaRank = metadataRank(normalized, entry);
    if (metaRank >= 0) {
      return { entry, rank: metaRank };
    }

    const body = readDoc(entry.id).toLowerCase();
    const blob = `${entry.id} ${entry.title} ${entry.audience}\n${body}`.toLowerCase();
    if (containsAllTerms(blob, terms)) {
      return { entry, rank: 4 };
    }

    return { entry, rank: -1 };
  })
    .filter(({ rank }) => rank >= 0)
    .sort((a, b) => a.rank - b.rank || a.entry.id.localeCompare(b.entry.id))
    .map(({ entry }) => entry);
};

export const grepDocs = (pattern: string, options: { caseInsensitive?: boolean } = {}): DocGrepMatch[] => {
  if (!pattern) {
    throw new DocsError(
      'TFL_DOCS_INVALID_ARGUMENT',
      'Expected a search pattern. Example: tfl docs grep STATION_HUBS',
      'Pass a literal substring. Use -i for case-insensitive search.',
    );
  }

  const needle = options.caseInsensitive ? pattern.toLowerCase() : pattern;
  const matches: DocGrepMatch[] = [];

  for (const entry of DOC_MANIFEST) {
    const content = readDoc(entry.id);
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      const haystack = options.caseInsensitive ? line.toLowerCase() : line;
      if (haystack.includes(needle)) {
        matches.push({ id: entry.id, line: index + 1, text: line.trim() });
      }
    });
  }

  return matches;
};

const validatePage = (
  offset: number | undefined,
  limit: number | undefined,
  defaultLimit: number,
): { offset: number; limit: number } => {
  const resolvedOffset = offset ?? 0;
  const resolvedLimit = limit ?? defaultLimit;

  if (!Number.isInteger(resolvedOffset) || resolvedOffset < 0) {
    throw new DocsError(
      'TFL_DOCS_INVALID_ARGUMENT',
      '"offset" must be an integer >= 0.',
      'Pass offset: 0 to start at the beginning.',
    );
  }

  if (!Number.isInteger(resolvedLimit) || resolvedLimit < 1 || resolvedLimit > DOC_PAGE_MAX_LIMIT) {
    throw new DocsError(
      'TFL_DOCS_INVALID_ARGUMENT',
      `"limit" must be an integer between 1 and ${DOC_PAGE_MAX_LIMIT}.`,
      `Pass a limit between 1 and ${DOC_PAGE_MAX_LIMIT}.`,
    );
  }

  return { offset: resolvedOffset, limit: resolvedLimit };
};

export const readDocSlice = (
  id: string,
  options: { offset?: number; limit?: number } = {},
): DocSlice => {
  const entry = resolveEntry(id);
  const { offset, limit } = validatePage(options.offset, options.limit, DOC_READ_DEFAULT_LIMIT);
  const lines = readDoc(entry.id).split('\n');
  const slice = lines.slice(offset, offset + limit);
  const nextIndex = offset + slice.length;
  const truncated = nextIndex < lines.length;

  return {
    id: entry.id,
    title: entry.title,
    audience: entry.audience,
    totalLines: lines.length,
    offset,
    limit,
    content: slice.join('\n'),
    truncated,
    nextOffset: truncated ? nextIndex : null,
  };
};

export const grepDocsPage = (
  pattern: string,
  options: { caseInsensitive?: boolean; offset?: number; limit?: number } = {},
): DocGrepPage => {
  const { offset, limit } = validatePage(options.offset, options.limit, DOC_GREP_DEFAULT_LIMIT);
  const allMatches = grepDocs(pattern, { caseInsensitive: options.caseInsensitive });
  const matches = allMatches.slice(offset, offset + limit);
  const nextIndex = offset + matches.length;
  const truncated = nextIndex < allMatches.length;

  return {
    matches,
    totalMatches: allMatches.length,
    offset,
    limit,
    truncated,
    nextOffset: truncated ? nextIndex : null,
  };
};

export const requireFindMatches = (query: string): DocEntry[] => {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new DocsError(
      'TFL_DOCS_INVALID_ARGUMENT',
      'Missing query. Example: tfl docs find mcp',
      'Pass a keyword from a doc id, title, audience, or body.',
    );
  }

  const matches = findDocs(trimmed);
  if (matches.length === 0) {
    throw new DocsError(
      'TFL_DOCS_NOT_FOUND',
      `No docs matched "${trimmed}".`,
      'Run "tfl docs ls" to see everything available.',
    );
  }

  return matches;
};

export const requireGrepMatches = (
  pattern: string,
  options: { caseInsensitive?: boolean } = {},
): DocGrepMatch[] => {
  const matches = grepDocs(pattern, options);
  if (matches.length === 0) {
    throw new DocsError(
      'TFL_DOCS_NOT_FOUND',
      `No matches for "${pattern}".`,
      'Try a shorter literal substring, or pass -i for case-insensitive search.',
    );
  }

  return matches;
};
