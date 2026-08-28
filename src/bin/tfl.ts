#!/usr/bin/env node
import TflClient from '../index';
import { ENDPOINTS } from '../generated/endpoints';
import { startTflMcpServer } from '../mcp/server';
import { CliError, CLI_EXIT, getCliExitCode, printCliError } from './cliExit';
import { runDocsCommand } from './docs';

const printHelp = (): void => {
  console.log(`tfl-ts CLI

Usage:
  tfl raw <tag>.<method> [--key value ...]
  tfl list [--tag <tag>]
  tfl docs <ls|cat|find|grep> [args]
  tfl smoke
  tfl mcp

Examples:
  tfl raw line.get --ids central
  tfl raw stopPoint.arrivals --id 940GZZLUOXC
  tfl list --tag line
  tfl docs cat CLAUDE.md
  tfl mcp

Run "tfl docs help" for offline agent-documentation lookup.

Exit codes: 0 ok, 1 error, 2 usage, 3 missing TFL_APP_KEY, 4 missing shipped file
`);
};

export const parseCliArgs = (argv: string[]): Record<string, string | string[]> => {
  const result: Record<string, string | string[]> = {};

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      result[key] = 'true';
      continue;
    }

    if (key.endsWith('s') || key === 'ids' || key === 'modes' || key === 'lineIds' || key === 'types') {
      result[key] = next.split(',').map((value) => value.trim()).filter(Boolean);
    } else {
      result[key] = next;
    }
    i += 1;
  }

  return result;
};

const isKnownRawOperation = (tag: string, method: string): boolean =>
  ENDPOINTS.some((endpoint) => endpoint.tagKey === tag && endpoint.methodName === method);

const runRaw = async (target: string, args: Record<string, string | string[]>): Promise<void> => {
  const [tag, method] = target.split('.');
  if (!tag || !method) {
    throw new CliError(
      CLI_EXIT.USAGE,
      'Expected format <tag>.<method>, e.g. line.get',
      'Run "tfl list" to see valid operations.',
    );
  }

  if (!isKnownRawOperation(tag, method)) {
    throw new CliError(
      CLI_EXIT.USAGE,
      `Unknown raw operation: ${tag}.${method}`,
      'Run "tfl list" to see valid tag.method names.',
    );
  }

  const client = new TflClient();
  const namespace = (client.raw as unknown as Record<string, Record<string, (input: Record<string, unknown>) => Promise<unknown>>>)[tag];
  const operation = namespace?.[method];

  if (!operation) {
    throw new CliError(
      CLI_EXIT.USAGE,
      `Unknown raw operation: ${tag}.${method}`,
      'Run "tfl list" to see valid tag.method names.',
    );
  }

  const result = await operation.call(namespace, args);
  console.log(JSON.stringify(result, null, 2));
};

const listEndpoints = (tagFilter?: string): void => {
  const filtered = tagFilter
    ? ENDPOINTS.filter((endpoint) => endpoint.tagKey === tagFilter)
    : ENDPOINTS;

  filtered.forEach((endpoint) => {
    console.log(`${endpoint.tagKey}.${endpoint.methodName} -> ${endpoint.httpMethod} ${endpoint.pathTemplate.replace(/\$\{formatPathParam\(args\.([^)]+)\)\}/g, '{$1}')}`);
  });
};

const runSmoke = async (): Promise<void> => {
  const client = new TflClient();
  const checks = [
    (): Promise<unknown> => client.raw.mode.getActiveServiceTypes({}),
    (): Promise<unknown> => client.raw.line.metaModes({}),
    (): Promise<unknown> => client.raw.stopPoint.metaModes({}),
  ];

  for (const check of checks) {
    await check();
  }

  console.log('Smoke checks passed.');
};

const findFlagValue = (argv: string[], flag: string): string | undefined => {
  const index = argv.indexOf(flag);
  if (index === -1) {
    return undefined;
  }
  return argv[index + 1];
};

// Deliberately avoids Node's util.parseArgs for dispatch: its default strict mode
// rejects any `--flag` it wasn't told about ahead of time, which breaks `raw`'s
// whole point (forwarding arbitrary `--key value` pairs straight to any of the 84
// generated raw operations). Only the subcommand name is a fixed positional; every
// flag after it is interpreted by that subcommand's own parsing.
export const dispatchCli = async (argv: string[]): Promise<void> => {
  if (argv.length === 0 || argv[0] === '--help' || argv[0] === '-h') {
    printHelp();
    return;
  }

  const [command, ...rest] = argv;

  if (command === 'list') {
    listEndpoints(findFlagValue(rest, '--tag'));
    return;
  }

  if (command === 'smoke') {
    await runSmoke();
    return;
  }

  if (command === 'docs') {
    runDocsCommand(rest);
    return;
  }

  if (command === 'mcp') {
    startTflMcpServer();
    return;
  }

  if (command === 'raw') {
    const target = rest[0];
    if (!target) {
      throw new CliError(
        CLI_EXIT.USAGE,
        'Missing raw target. Example: tfl raw line.get --ids central',
        'Run "tfl list" to see valid operations.',
      );
    }

    await runRaw(target, parseCliArgs(rest.slice(1)));
    return;
  }

  throw new CliError(
    CLI_EXIT.USAGE,
    `Unknown command: ${command}\nRun "tfl --help" for usage.`,
    'Valid commands: raw, list, docs, smoke, mcp.',
  );
};

export { CLI_EXIT, CliError, getCliExitCode } from './cliExit';

if (require.main === module) {
  dispatchCli(process.argv.slice(2)).catch((error: unknown) => {
    printCliError(error);
    process.exit(getCliExitCode(error));
  });
}
