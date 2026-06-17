#!/usr/bin/env node
import { parseArgs } from 'util';
import TflClient from '../index';
import { ENDPOINTS } from '../generated/endpoints';

const printHelp = (): void => {
  console.log(`tfl-ts CLI

Usage:
  tfl raw <tag>.<method> [--key value ...]
  tfl list [--tag <tag>]
  tfl smoke

Examples:
  tfl raw line.get --ids central
  tfl raw stopPoint.arrivals --id 940GZZLUOXC
  tfl list --tag line
`);
};

const parseCliArgs = (argv: string[]): Record<string, string | string[]> => {
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

const runRaw = async (target: string, args: Record<string, string | string[]>): Promise<void> => {
  const [tag, method] = target.split('.');
  if (!tag || !method) {
    throw new Error('Expected format <tag>.<method>, e.g. line.get');
  }

  const client = new TflClient();
  const namespace = (client.raw as unknown as Record<string, Record<string, (input: Record<string, unknown>) => Promise<unknown>>>)[tag];
  const operation = namespace?.[method];

  if (!operation) {
    throw new Error(`Unknown raw operation: ${tag}.${method}`);
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
    () => client.raw.mode.getActiveServiceTypes({}),
    () => client.raw.line.metaModes({}),
    () => client.raw.stopPoint.metaModes({}),
  ];

  for (const check of checks) {
    await check();
  }

  console.log('Smoke checks passed.');
};

const main = async (): Promise<void> => {
  const { positionals, values } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      tag: { type: 'string' },
      help: { type: 'boolean', short: 'h' },
    },
  });

  if (values.help) {
    printHelp();
    return;
  }

  const command = positionals[0];

  if (command === 'list') {
    listEndpoints(values.tag);
    return;
  }

  if (command === 'smoke') {
    await runSmoke();
    return;
  }

  if (command === 'raw') {
    const target = positionals[1];
    if (!target) {
      throw new Error('Missing raw target. Example: tfl raw line.get --ids central');
    }

    await runRaw(target, parseCliArgs(positionals.slice(2)));
    return;
  }

  printHelp();
};

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
