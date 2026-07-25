import { TflMcpServer } from '../mcp/server';

const parseToolPayload = (response: { result?: unknown } | null): Record<string, unknown> => {
  const result = response?.result as { content: Array<{ type: string; text: string }> };
  return JSON.parse(result.content[0].text) as Record<string, unknown>;
};

describe('TflMcpServer', () => {
  const server = new TflMcpServer(0);

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
        serverInfo: { name: 'tfl-ts', version: '1.1.0' },
      },
    });
  });

  test('lists a small, curated tool set', async () => {
    const response = await server.handleMessage({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
    });

    const result = response?.result as { tools: Array<{ name: string }> };
    expect(result.tools.map((tool) => tool.name)).toEqual([
      'get_supported_modes',
      'resolve_line_id',
      'resolve_stop_id',
      'get_line_status',
      'get_arrivals',
      'plan_journey',
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

  test('returns tool errors without terminating the server', async () => {
    const response = await server.handleMessage({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'get_arrivals',
        arguments: {},
      },
    });

    expect(response?.result).toMatchObject({ isError: true });
  });
});
