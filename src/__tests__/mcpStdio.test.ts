import { spawn, type ChildProcessWithoutNullStreams } from 'child_process';
import path from 'path';
import { createInterface } from 'readline';

const ROOT = path.join(__dirname, '../..');
const BIN = path.join(ROOT, 'dist/cjs/bin/tfl.js');

type Response = { id: number; result?: Record<string, unknown>; error?: { code: number } };

type Tool = {
  name: string;
  title?: string;
  inputSchema?: { type?: string; properties?: Record<string, unknown>; required?: string[] };
  annotations?: Record<string, unknown>;
};

const toolText = (response: Response): { isError?: boolean; payload: Record<string, unknown> } => {
  const result = response.result as { isError?: boolean; content: Array<{ text: string }> };
  return { isError: result.isError, payload: JSON.parse(result.content[0].text) };
};

describe('compiled `tfl mcp` over stdio with no key (run pnpm run build before pnpm test)', () => {
  let child: ChildProcessWithoutNullStreams;
  const waiting = new Map<number, (response: Response) => void>();
  let nextId = 1;

  const request = (method: string, params?: unknown): Promise<Response> => {
    const id = nextId++;
    return new Promise((resolve) => {
      waiting.set(id, resolve);
      child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
    });
  };

  beforeAll(() => {
    const env = { ...process.env };
    delete env.TFL_APP_KEY;
    delete env.TFL_APP_ID;
    child = spawn(process.execPath, [BIN, 'mcp'], { cwd: ROOT, env });
    createInterface({ input: child.stdout }).on('line', (line) => {
      const response = JSON.parse(line) as Response;
      waiting.get(response.id)?.(response);
      waiting.delete(response.id);
    });
  });

  afterAll(() => {
    child.kill();
  });

  test('initialize declares tools, resources and prompts', async () => {
    const response = await request('initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'jest', version: '0' },
    });
    expect(response.result).toMatchObject({
      protocolVersion: '2025-06-18',
      serverInfo: { name: 'tfl-ts' },
      capabilities: { tools: {}, resources: {}, prompts: {} },
    });
    child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' })}\n`);
  });

  test('tools/list: 7 read-only tools with object input schemas', async () => {
    const { result } = await request('tools/list');
    const tools = (result as { tools: Tool[] }).tools;
    expect(tools).toHaveLength(7);
    for (const tool of tools) {
      expect(tool.inputSchema?.type).toBe('object');
      expect(typeof tool.inputSchema?.properties).toBe('object');
      for (const key of tool.inputSchema?.required ?? []) {
        expect(tool.inputSchema?.properties).toHaveProperty(key);
      }
      expect(tool.title).toEqual(expect.any(String));
      expect(tool.annotations).toMatchObject({
        title: tool.title,
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
      });
    }
    const offline = tools.filter((tool) => tool.annotations?.openWorldHint === false).map((tool) => tool.name);
    expect(offline.sort()).toEqual(['docs', 'get_supported_modes', 'resolve_line_id']);
  });

  test('resources and prompts list empty', async () => {
    expect((await request('resources/list')).result).toEqual({ resources: [] });
    expect((await request('resources/templates/list')).result).toEqual({ resourceTemplates: [] });
    expect((await request('prompts/list')).result).toEqual({ prompts: [] });
  });

  test('an offline tool answers without a key', async () => {
    const response = await request('tools/call', {
      name: 'resolve_line_id',
      arguments: { query: 'Central', modes: ['tube'] },
    });
    const { isError, payload } = toolText(response);
    expect(isError).toBeUndefined();
    expect(payload.best).toMatchObject({ id: 'central' });
  });

  test('a live tool returns the missing-key tool error', async () => {
    const response = await request('tools/call', {
      name: 'get_line_status',
      arguments: { lineIds: ['central'] },
    });
    const { isError, payload } = toolText(response);
    expect(isError).toBe(true);
    expect(payload).toMatchObject({ code: 'TFL_MCP_MISSING_APP_KEY', fix: expect.stringContaining('TFL_APP_KEY') });
  });
});
