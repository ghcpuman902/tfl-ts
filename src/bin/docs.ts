import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface DocEntry {
  /** Stable identifier used on the command line, e.g. `tfl docs cat CLAUDE.md`. */
  id: string;
  /** Path relative to the package root (works in both the repo and the published npm tarball). */
  path: string;
  title: string;
  audience: string;
}

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
    title: 'Cross-tool agent entry point',
    audience: 'Agents/tools that look for AGENTS.md specifically',
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

const packageRoot = (): string => join(__dirname, '..', '..');

const resolveEntry = (id: string): DocEntry => {
  const normalized = id.trim().toLowerCase();
  const entry = DOC_MANIFEST.find(
    (candidate) => candidate.id.toLowerCase() === normalized || candidate.path.toLowerCase() === normalized,
  );

  if (!entry) {
    const known = DOC_MANIFEST.map((candidate) => candidate.id).join(', ');
    throw new Error(`Unknown doc id: ${id}\nKnown ids: ${known}`);
  }

  return entry;
};

export const listDocs = (): DocEntry[] => DOC_MANIFEST;

export const catDoc = (id: string): string => {
  const entry = resolveEntry(id);
  const filePath = join(packageRoot(), entry.path);

  if (!existsSync(filePath)) {
    throw new Error(`Doc "${entry.id}" is listed in the manifest but missing on disk at ${filePath}.`);
  }

  return readFileSync(filePath, 'utf8');
};

const rankMatch = (query: string, entry: DocEntry): number => {
  const id = entry.id.toLowerCase();
  const title = entry.title.toLowerCase();
  const audience = entry.audience.toLowerCase();

  if (id === query) {
    return 0;
  }
  if (id.startsWith(query)) {
    return 1;
  }
  if (id.includes(query) || title.includes(query)) {
    return 2;
  }
  if (audience.includes(query)) {
    return 3;
  }
  return -1;
};

export const findDocs = (query: string): DocEntry[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }

  return DOC_MANIFEST.map((entry) => ({ entry, rank: rankMatch(normalized, entry) }))
    .filter(({ rank }) => rank >= 0)
    .sort((a, b) => a.rank - b.rank || a.entry.id.localeCompare(b.entry.id))
    .map(({ entry }) => entry);
};

export interface DocGrepMatch {
  id: string;
  line: number;
  text: string;
}

export const grepDocs = (pattern: string, options: { caseInsensitive?: boolean } = {}): DocGrepMatch[] => {
  if (!pattern) {
    throw new Error('Expected a search pattern. Example: tfl docs grep STATION_HUBS');
  }

  const needle = options.caseInsensitive ? pattern.toLowerCase() : pattern;
  const matches: DocGrepMatch[] = [];

  for (const entry of DOC_MANIFEST) {
    let content: string;
    try {
      content = catDoc(entry.id);
    } catch {
      continue;
    }

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

const printDocsHelp = (): void => {
  console.log(`tfl docs — read tfl-ts's own agent-facing documentation offline

Usage:
  tfl docs ls                  List every bundled doc
  tfl docs cat <id>            Print a doc's full content
  tfl docs find <query>        Find the doc to read next by id, title, or audience
  tfl docs grep [-i] <pattern> Search doc content; case-sensitive unless -i is used

Examples:
  tfl docs ls
  tfl docs cat CLAUDE.md
  tfl docs find mcp
  tfl docs grep -i station_hubs
`);
};

export const runDocsCommand = (args: string[]): void => {
  const [subcommand, ...rest] = args;

  if (!subcommand || subcommand === 'help' || subcommand === '--help' || subcommand === '-h') {
    printDocsHelp();
    return;
  }

  if (subcommand === 'ls') {
    listDocs().forEach((entry) => {
      console.log(`${entry.id.padEnd(32)} ${entry.title} (${entry.audience})`);
    });
    return;
  }

  if (subcommand === 'cat') {
    const id = rest[0];
    if (!id) {
      throw new Error('Missing doc id. Example: tfl docs cat CLAUDE.md');
    }
    console.log(catDoc(id));
    return;
  }

  if (subcommand === 'find') {
    const query = rest.join(' ');
    if (!query) {
      throw new Error('Missing query. Example: tfl docs find mcp');
    }
    const matches = findDocs(query);
    if (matches.length === 0) {
      console.log(`No docs matched "${query}". Run "tfl docs ls" to see everything available.`);
      return;
    }
    matches.forEach((entry) => {
      console.log(`${entry.id.padEnd(32)} ${entry.title} (${entry.audience})`);
    });
    return;
  }

  if (subcommand === 'grep') {
    const caseInsensitive = rest[0] === '-i';
    const patternParts = caseInsensitive ? rest.slice(1) : rest;
    const pattern = patternParts.join(' ');
    const matches = grepDocs(pattern, { caseInsensitive });
    if (matches.length === 0) {
      console.log(`No matches for "${pattern}".`);
      return;
    }
    matches.forEach((match) => {
      console.log(`${match.id}:${match.line}: ${match.text}`);
    });
    return;
  }

  throw new Error(`Unknown docs subcommand: ${subcommand}\n\nRun "tfl docs help" for usage.`);
};
