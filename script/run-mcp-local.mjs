#!/usr/bin/env node
/**
 * Local MCP launcher for Cursor / Claude Desktop.
 * Loads .env from the repo root, then starts `tfl mcp` over stdio.
 *
 * Usage (from Cursor mcp.json):
 *   "command": "node",
 *   "args": ["/absolute/path/to/tfl-ts/script/run-mcp-local.mjs"]
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { spawn } from 'child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env');
const cliPath = join(root, 'dist', 'bin', 'tfl.js');

const loadEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const text = readFileSync(filePath, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const equals = trimmed.indexOf('=');
    if (equals <= 0) {
      continue;
    }
    const key = trimmed.slice(0, equals).trim();
    let value = trimmed.slice(equals + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
};

loadEnvFile(envPath);

if (!existsSync(cliPath)) {
  console.error(`Missing ${cliPath}. Run: pnpm run build`);
  process.exit(1);
}

if (!process.env.TFL_APP_ID || !process.env.TFL_APP_KEY) {
  console.error('Missing TFL_APP_ID / TFL_APP_KEY. Add them to .env or the MCP env block.');
  process.exit(1);
}

const child = spawn(process.execPath, [cliPath, 'mcp'], {
  cwd: root,
  env: process.env,
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
