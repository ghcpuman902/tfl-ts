import { readFileSync } from 'fs';
import path from 'path';

type ServerJson = {
  $schema: string;
  name: string;
  description: string;
  version: string;
  packages: Array<{
    registryType: string;
    registryBaseUrl?: string;
    identifier: string;
    version: string;
    transport: { type: string };
    packageArguments?: Array<{ type: string; value?: string }>;
    environmentVariables?: Array<{ name: string; isRequired?: boolean; isSecret?: boolean }>;
  }>;
};

describe('MCP registry server.json', () => {
  const root = path.join(__dirname, '../..');
  const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as {
    name: string;
    version: string;
    mcpName: string;
    files: string[];
    bin: Record<string, string>;
  };
  const server = JSON.parse(readFileSync(path.join(root, 'server.json'), 'utf8')) as ServerJson;

  test('mcpName matches the registry server name and this package version', () => {
    expect(pkg.mcpName).toBe('io.github.ghcpuman902/tfl-ts');
    expect(server.name).toBe(pkg.mcpName);
    expect(server.version).toBe(pkg.version);
    expect(server.version).toBe('2.15.2');
    expect(server.description.length).toBeGreaterThan(0);
    expect(server.description.length).toBeLessThanOrEqual(100);
    expect(server.$schema).toBe(
      'https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json',
    );
    expect(pkg.files).toContain('server.json');
  });

  test('npm package entry launches the tfl mcp stdio bin', () => {
    expect(pkg.bin.tfl).toBe('./dist/cjs/bin/tfl.js');
    expect(server.packages).toHaveLength(1);
    const entry = server.packages[0];
    expect(entry.registryType).toBe('npm');
    expect(entry.registryBaseUrl).toBe('https://registry.npmjs.org');
    expect(entry.identifier).toBe(pkg.name);
    expect(entry.version).toBe(pkg.version);
    expect(entry.transport.type).toBe('stdio');
    expect(entry.packageArguments).toEqual([{ type: 'positional', value: 'mcp' }]);
    expect(entry.environmentVariables?.map((variable) => variable.name)).toEqual([
      'TFL_APP_KEY',
      'TFL_MCP_MIN_INTERVAL_MS',
    ]);
    const appKey = entry.environmentVariables?.find((variable) => variable.name === 'TFL_APP_KEY');
    expect(appKey?.isRequired).toBe(true);
    expect(appKey?.isSecret).toBe(true);
    const interval = entry.environmentVariables?.find(
      (variable) => variable.name === 'TFL_MCP_MIN_INTERVAL_MS',
    );
    expect(interval?.isRequired).toBe(false);
    expect(interval?.isSecret).toBe(false);
  });
});
