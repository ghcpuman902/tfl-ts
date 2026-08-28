import {
  DocsError,
  FIND_RESULT_LIMIT,
  catDoc,
  listDocs,
  requireFindMatches,
  requireGrepMatches,
} from '../docs';

const printDocsHelp = (): void => {
  console.log(`tfl docs — read tfl-ts's own agent-facing documentation offline

Usage:
  tfl docs ls                  List every bundled doc
  tfl docs cat <id>            Print a doc's full content
  tfl docs find <query>        Find the doc to read next by id, title, audience, or body
  tfl docs grep [-i] <pattern> Search doc content; case-sensitive unless -i is used

Examples:
  tfl docs ls
  tfl docs cat CLAUDE.md
  tfl docs find caching
  tfl docs grep -i station_hubs
`);
};

const formatEntry = (id: string, title: string, audience: string): string =>
  `${id.padEnd(40)} ${title} (${audience})`;

export const runDocsCommand = (args: string[]): void => {
  const [subcommand, ...rest] = args;

  if (!subcommand || subcommand === 'help' || subcommand === '--help' || subcommand === '-h') {
    printDocsHelp();
    return;
  }

  if (subcommand === 'ls') {
    listDocs().forEach((entry) => {
      console.log(formatEntry(entry.id, entry.title, entry.audience));
    });
    return;
  }

  if (subcommand === 'cat') {
    const id = rest[0];
    if (!id) {
      throw new DocsError(
        'TFL_DOCS_INVALID_ARGUMENT',
        'Missing doc id. Example: tfl docs cat CLAUDE.md',
        'Run "tfl docs ls" to see valid ids.',
      );
    }
    console.log(catDoc(id));
    return;
  }

  if (subcommand === 'find') {
    const query = rest.join(' ');
    const matches = requireFindMatches(query);
    const shown = matches.slice(0, FIND_RESULT_LIMIT);
    shown.forEach((entry) => {
      console.log(formatEntry(entry.id, entry.title, entry.audience));
    });
    const omitted = matches.length - shown.length;
    if (omitted > 0) {
      console.log(`${omitted} more match(es) omitted. Add a word to narrow the query.`);
    }
    return;
  }

  if (subcommand === 'grep') {
    const caseInsensitive = rest[0] === '-i';
    const patternParts = caseInsensitive ? rest.slice(1) : rest;
    const pattern = patternParts.join(' ');
    const matches = requireGrepMatches(pattern, { caseInsensitive });
    matches.forEach((match) => {
      console.log(`${match.id}:${match.line}: ${match.text}`);
    });
    return;
  }

  throw new DocsError(
    'TFL_DOCS_INVALID_ARGUMENT',
    `Unknown docs subcommand: ${subcommand}\n\nRun "tfl docs help" for usage.`,
    'Valid subcommands: ls, cat, find, grep, help.',
  );
};
