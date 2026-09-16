import { TflMcpServer } from '../mcp/server';
import { DOC_MANIFEST } from '../docs';

const parseToolPayload = (response: { result?: unknown } | null): Record<string, unknown> => {
  const result = response?.result as { content: Array<{ type: string; text: string }> };
  return JSON.parse(result.content[0].text) as Record<string, unknown>;
};

const parseToolError = (response: { result?: unknown } | null): Record<string, unknown> => {
  const result = response?.result as { isError?: boolean; content: Array<{ type: string; text: string }> };
  expect(result.isError).toBe(true);
  return JSON.parse(result.content[0].text) as Record<string, unknown>;
};

const callDocs = async (
  server: TflMcpServer,
  id: number,
  args: Record<string, unknown>,
): Promise<{ result?: unknown } | null> =>
  server.handleMessage({
    jsonrpc: '2.0',
    id,
    method: 'tools/call',
    params: { name: 'docs', arguments: args },
  });

describe('TflMcpServer', () => {
  const server = new TflMcpServer(0);
  const originalAppKey = process.env.TFL_APP_KEY;

  afterAll(() => {
    if (originalAppKey === undefined) {
      delete process.env.TFL_APP_KEY;
    } else {
      process.env.TFL_APP_KEY = originalAppKey;
    }
  });

  test('initializes with tool capabilities', async () => {
    const response = await server.handleMessage({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: '2025-06-18' },
    });

    expect(response).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: '2025-06-18',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'tfl-ts', version: '1.4.0' },
      },
    });
    const instructions = (response?.result as { instructions?: string }).instructions ?? '';
    expect(instructions).toContain('docs');
  });

  test('lists a small, curated tool set', async () => {
    const response = await server.handleMessage({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
    });

    const result = response?.result as { tools: Array<{ name: string; inputSchema?: Record<string, unknown> }> };
    expect(result.tools.map((tool) => tool.name)).toEqual([
      'get_supported_modes',
      'resolve_line_id',
      'docs',
      'resolve_stop_id',
      'get_line_status',
      'get_arrivals',
      'plan_journey',
    ]);
    const status = result.tools.find((tool) => tool.name === 'get_line_status');
    expect(status?.inputSchema?.anyOf).toEqual([
      { required: ['lineIds'] },
      { required: ['modes'] },
    ]);
    const docs = result.tools.find((tool) => tool.name === 'docs');
    expect(docs?.inputSchema?.anyOf).toEqual([
      { properties: { operation: { const: 'list' } }, required: ['operation'] },
      { properties: { operation: { const: 'read' } }, required: ['operation', 'id'] },
      { properties: { operation: { const: 'find' } }, required: ['operation', 'query'] },
      { properties: { operation: { const: 'grep' } }, required: ['operation', 'pattern'] },
    ]);
  });

  test('ranks exact line matches first and supports mode filter', async () => {
    const response = await server.handleMessage({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'resolve_line_id',
        arguments: { query: 'Central', modes: ['tube'] },
      },
    });

    const payload = parseToolPayload(response);
    expect(payload.best).toEqual(
      expect.objectContaining({ id: 'central', name: 'Central', modeName: 'tube' }),
    );
    expect(payload.matches).toEqual([
      expect.objectContaining({ id: 'central' }),
    ]);
    expect(String(payload.summary)).toContain('central');
  });

  test('ignores notifications', async () => {
    const response = await server.handleMessage({
      jsonrpc: '2.0',
      method: 'notifications/initialized',
    });

    expect(response).toBeNull();
  });

  test('returns structured tool errors without terminating the server', async () => {
    const arrivals = parseToolError(
      await server.handleMessage({
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: {
          name: 'get_arrivals',
          arguments: {},
        },
      }),
    );
    expect(arrivals.code).toBe('TFL_MCP_INVALID_ARGUMENT');
    expect(String(arrivals.message)).toBe('"stopPointId" must be a non-empty string.');
    expect(String(arrivals.fix).length).toBeGreaterThan(0);

    const status = parseToolError(
      await server.handleMessage({
        jsonrpc: '2.0',
        id: 5,
        method: 'tools/call',
        params: {
          name: 'get_line_status',
          arguments: {},
        },
      }),
    );
    expect(status.code).toBe('TFL_MCP_INVALID_ARGUMENT');
    expect(String(status.message)).toMatch(/lineIds/i);
  });

  test('docs list returns the full manifest', async () => {
    const payload = parseToolPayload(await callDocs(server, 10, { operation: 'list' }));
    const docs = payload.docs as Array<{ id: string }>;
    expect(docs).toHaveLength(DOC_MANIFEST.length);
    expect(docs.map((entry) => entry.id)).toEqual(expect.arrayContaining(['CLAUDE.md', 'docs/mcp.md']));
  });

  test('docs find ranks mcp guide first and searches bodies', async () => {
    const mcp = parseToolPayload(await callDocs(server, 11, { operation: 'find', query: 'mcp' }));
    expect((mcp.best as { id: string }).id).toBe('docs/mcp.md');

    const caching = parseToolPayload(await callDocs(server, 12, { operation: 'find', query: 'caching' }));
    const matches = caching.matches as Array<{ id: string }>;
    expect(matches.map((entry) => entry.id)).toContain('docs/agent.md');
  });

  test('docs read returns a paginated slice and nextOffset continues', async () => {
    const first = parseToolPayload(
      await callDocs(server, 13, { operation: 'read', id: 'CLAUDE.md', limit: 20 }),
    );
    expect(String(first.content).length).toBeGreaterThan(0);
    expect(first.truncated).toBe(true);
    expect(first.nextOffset).toBe(20);
    expect(Number(first.totalLines)).toBeGreaterThan(20);

    const second = parseToolPayload(
      await callDocs(server, 14, {
        operation: 'read',
        id: 'CLAUDE.md',
        offset: first.nextOffset,
        limit: 20,
      }),
    );
    expect(second.offset).toBe(20);
    expect(String(second.content)).not.toBe(String(first.content));
  });

  test('docs read unknown id is a tool error', async () => {
    const error = parseToolError(await callDocs(server, 15, { operation: 'read', id: 'does-not-exist.md' }));
    expect(error.code).toBe('TFL_DOCS_UNKNOWN_ID');
    expect(String(error.message)).toMatch(/Unknown doc id/);
    expect(String(error.fix).length).toBeGreaterThan(0);
  });

  test('docs grep finds STATION_HUBS', async () => {
    const payload = parseToolPayload(
      await callDocs(server, 16, { operation: 'grep', pattern: 'STATION_HUBS' }),
    );
    const matches = payload.matches as Array<{ id: string; text: string }>;
    expect(matches.some((match) => match.id === 'CLAUDE.md')).toBe(true);
    matches.forEach((match) => {
      expect(match.text).toContain('STATION_HUBS');
    });
  });

  test('docs grep empty pattern is a tool error', async () => {
    const error = parseToolError(await callDocs(server, 17, { operation: 'grep', pattern: '' }));
    expect(error.code).toBe('TFL_DOCS_INVALID_ARGUMENT');
  });

  test('docs rejects missing required args, no matches, and invalid pagination', async () => {
    expect(parseToolError(await callDocs(server, 18, { operation: 'read' })).code).toBe(
      'TFL_DOCS_INVALID_ARGUMENT',
    );
    expect(
      parseToolError(await callDocs(server, 19, { operation: 'find', query: 'totally-unrelated-nonsense-query' }))
        .code,
    ).toBe('TFL_DOCS_NOT_FOUND');
    expect(
      parseToolError(await callDocs(server, 20, { operation: 'read', id: 'CLAUDE.md', limit: 0 })).code,
    ).toBe('TFL_DOCS_INVALID_ARGUMENT');
  });

  test('docs does not require TfL credentials', async () => {
    delete process.env.TFL_APP_KEY;
    const payload = parseToolPayload(await callDocs(server, 21, { operation: 'list' }));
    expect(Array.isArray(payload.docs)).toBe(true);
    const read = parseToolPayload(await callDocs(server, 22, { operation: 'read', id: 'AGENTS.md', limit: 10 }));
    expect(String(read.content).length).toBeGreaterThan(0);
  });

  test('live tools return TFL_MCP_MISSING_APP_KEY without a key', async () => {
    delete process.env.TFL_APP_KEY;
    const error = parseToolError(
      await server.handleMessage({
        jsonrpc: '2.0',
        id: 23,
        method: 'tools/call',
        params: {
          name: 'get_arrivals',
          arguments: { stopPointId: '940GZZLUOXC' },
        },
      }),
    );
    expect(error.code).toBe('TFL_MCP_MISSING_APP_KEY');
    expect(String(error.message)).toMatch(/Missing TFL_APP_KEY/);
    expect(String(error.fix)).toMatch(/TFL_APP_KEY/);
  });
});
