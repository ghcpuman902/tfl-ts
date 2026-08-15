import { createInterface } from 'readline';
import TflClient from '../index';
import { Lines } from '../generated/meta/Line';
import { Modes } from '../generated/meta/Meta';
import {
  getLineStatusSummary,
  getWorstCurrentStatus,
  type LineStatusLike,
} from '../utils/ui';

type JsonRpcId = string | number | null;

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: JsonRpcId;
  method: string;
  params?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: JsonRpcId;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties: false;
  };
}

interface CacheEntry {
  expiresAt: number;
  value: unknown;
}

interface LiveEnvelope<T> {
  data: T;
  cacheHit: boolean;
  fetchedAt: string;
}

const SERVER_NAME = 'tfl-ts';
const SERVER_VERSION = '1.1.0';
const DEFAULT_PROTOCOL_VERSION = '2025-06-18';
const SUPPORTED_PROTOCOL_VERSIONS = new Set([
  '2024-11-05',
  '2025-03-26',
  DEFAULT_PROTOCOL_VERSION,
]);
const DEFAULT_MIN_INTERVAL_MS = 250;

const CACHE_TTLS = {
  stopSearch: 24 * 60 * 60 * 1000,
  lineStatus: 60 * 1000,
  arrivals: 15 * 1000,
  journey: 2 * 60 * 1000,
} as const;

const TOOLS: ToolDefinition[] = [
  {
    name: 'get_supported_modes',
    description:
      'List transport modes bundled with tfl-ts. Static metadata only — no TfL API call.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'resolve_line_id',
    description:
      'Resolve a line name to canonical lowercase TfL line IDs. Exact matches rank first. Static metadata only — no TfL API call. Prefer this before get_line_status.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          minLength: 1,
          description: 'Line name or ID, for example "Central" or "central".',
        },
        modes: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional mode filter, for example ["tube"].',
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'resolve_stop_id',
    description:
      'Search TfL for a stop name or NaPTAN code and return compact stop matches. Cached 24h. Use the returned id with get_arrivals.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          minLength: 1,
          description: 'Stop name or 5-digit bus stop code.',
        },
        modes: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional mode filter, for example ["tube"] or ["bus"].',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 10,
          default: 5,
        },
      },
      required: ['query'],
      additionalProperties: false,
    },
  },
  {
    name: 'get_line_status',
    description:
      'Get compact live line status (id, name, status, optional reason). Provide lineIds or modes. Set issuesOnly=true to hide Good Service lines. Cached 60s.',
    inputSchema: {
      type: 'object',
      properties: {
        lineIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Canonical lowercase line IDs, for example ["central"].',
        },
        modes: {
          type: 'array',
          items: { type: 'string' },
          description: 'Transport modes, for example ["tube"].',
        },
        issuesOnly: {
          type: 'boolean',
          default: false,
          description: 'If true, return only lines that are not Good Service.',
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_arrivals',
    description:
      'Get compact live arrivals for one stop ID: line, towards, minutes, platform. Optional lineIds filter. Cached 15s.',
    inputSchema: {
      type: 'object',
      properties: {
        stopPointId: {
          type: 'string',
          minLength: 1,
          description: 'Canonical stop ID, for example "940GZZLUOXC".',
        },
        lineIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional filter, for example ["central", "victoria"].',
        },
        limit: {
          type: 'integer',
          minimum: 1,
          maximum: 20,
          default: 10,
        },
      },
      required: ['stopPointId'],
      additionalProperties: false,
    },
  },
  {
    name: 'plan_journey',
    description:
      'Plan a journey and return a compact summary (duration, fare, natural-language legs). Cached 2 minutes.',
    inputSchema: {
      type: 'object',
      properties: {
        from: {
          type: 'string',
          minLength: 1,
          description: 'Origin stop ID, postcode, or latitude/longitude.',
        },
        to: {
          type: 'string',
          minLength: 1,
          description: 'Destination stop ID, postcode, or latitude/longitude.',
        },
        modes: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional modes, for example ["tube", "bus", "walking"].',
        },
      },
      required: ['from', 'to'],
      additionalProperties: false,
    },
  },
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const requireString = (input: Record<string, unknown>, key: string): string => {
  const value = input[key];
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`"${key}" must be a non-empty string.`);
  }
  return value.trim();
};

const optionalStringArray = (input: Record<string, unknown>, key: string): string[] | undefined => {
  const value = input[key];
  if (value === undefined) {
    return undefined;
  }
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`"${key}" must be an array of strings.`);
  }
  return value.map((item) => item.trim()).filter(Boolean);
};

const optionalBoolean = (input: Record<string, unknown>, key: string, defaultValue: boolean): boolean => {
  const value = input[key];
  if (value === undefined) {
    return defaultValue;
  }
  if (typeof value !== 'boolean') {
    throw new Error(`"${key}" must be a boolean.`);
  }
  return value;
};

const optionalLimit = (
  input: Record<string, unknown>,
  defaultValue: number,
  maximum: number,
): number => {
  const value = input.limit;
  if (value === undefined) {
    return defaultValue;
  }
  if (!Number.isInteger(value) || (value as number) < 1 || (value as number) > maximum) {
    throw new Error(`"limit" must be an integer between 1 and ${maximum}.`);
  }
  return value as number;
};

const normalize = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

const minutesUntil = (seconds: number | undefined): number => {
  if (typeof seconds !== 'number' || Number.isNaN(seconds)) {
    return 0;
  }
  return Math.max(0, Math.round(seconds / 60));
};

const rankLineMatch = (
  query: string,
  line: { id: string; name: string },
): number => {
  const id = normalize(line.id);
  const name = normalize(line.name);
  if (id === query || name === query) {
    return 0;
  }
  if (id.startsWith(query) || name.startsWith(query)) {
    return 1;
  }
  if (id.includes(query) || name.includes(query)) {
    return 2;
  }
  return 3;
};

const compactLineStatus = (line: unknown): {
  id: string;
  name: string;
  modeName?: string;
  status: string;
  severity: number;
  hasIssues: boolean;
  reason?: string;
} | null => {
  if (!isRecord(line)) {
    return null;
  }

  const statuses: LineStatusLike[] = Array.isArray(line.lineStatuses)
    ? line.lineStatuses.map((status) => (isRecord(status) ? (status as LineStatusLike) : {}))
    : [];
  const summary = getLineStatusSummary(statuses);
  const worst = getWorstCurrentStatus(statuses);
  const reason =
    worst && typeof worst.reason === 'string' && worst.reason.length > 0
      ? worst.reason.trim()
      : undefined;

  return {
    id: typeof line.id === 'string' ? line.id : '',
    name: typeof line.name === 'string' ? line.name : '',
    modeName: typeof line.modeName === 'string' ? line.modeName : undefined,
    status: summary.worstDescription,
    severity: summary.worstSeverity,
    hasIssues: summary.hasIssues,
    reason,
  };
};

const formatStatusSummary = (
  lines: Array<{ name: string; status: string; reason?: string }>,
): string => {
  if (lines.length === 0) {
    return 'No lines matched.';
  }
  return lines
    .map((line) => {
      const reason = line.reason ? ` — ${line.reason}` : '';
      return `${line.name}: ${line.status}${reason}`;
    })
    .join('\n');
};

const formatArrivalsSummary = (
  arrivals: Array<{ line: string; towards: string; minutes: number; platform: string }>,
): string => {
  if (arrivals.length === 0) {
    return 'No arrivals.';
  }
  return arrivals
    .map((arrival) => {
      const when = arrival.minutes <= 0 ? 'due' : `${arrival.minutes} min`;
      return `${arrival.line} to ${arrival.towards} — ${when} (${arrival.platform})`;
    })
    .join('\n');
};

export class TflMcpServer {
  private client: TflClient | undefined;
  private readonly cache = new Map<string, CacheEntry>();
  private readonly pending = new Map<string, Promise<unknown>>();
  private nextRequestAt = 0;
  private readonly minIntervalMs: number;

  constructor(minIntervalMs = Number(process.env.TFL_MCP_MIN_INTERVAL_MS) || DEFAULT_MIN_INTERVAL_MS) {
    this.minIntervalMs = Math.max(0, minIntervalMs);
  }

  async handleMessage(message: JsonRpcRequest): Promise<JsonRpcResponse | null> {
    if (message.id === undefined) {
      return null;
    }

    try {
      if (message.method === 'initialize') {
        const params = isRecord(message.params) ? message.params : {};
        const requestedVersion =
          typeof params.protocolVersion === 'string' ? params.protocolVersion : '';
        const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.has(requestedVersion)
          ? requestedVersion
          : DEFAULT_PROTOCOL_VERSION;

        return this.success(message.id, {
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
          instructions:
            'Prefer static tools (resolve_line_id, get_supported_modes) before live tools. Live tools return compact JSON with a human-readable "summary" field. Use the user’s local TfL credentials; responses are cached and rate-limited.',
        });
      }

      if (message.method === 'ping') {
        return this.success(message.id, {});
      }

      if (message.method === 'tools/list') {
        return this.success(message.id, { tools: TOOLS });
      }

      if (message.method === 'tools/call') {
        return this.success(message.id, await this.callTool(message.params));
      }

      return this.failure(message.id, -32601, `Method not found: ${message.method}`);
    } catch (error) {
      return this.failure(
        message.id,
        -32603,
        error instanceof Error ? error.message : 'Unknown MCP server error.',
      );
    }
  }

  private async callTool(params: unknown): Promise<unknown> {
    if (!isRecord(params) || typeof params.name !== 'string') {
      throw new Error('tools/call requires a tool "name".');
    }

    const input = isRecord(params.arguments) ? params.arguments : {};

    try {
      const result = await this.executeTool(params.name, input);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'Unknown tool error.',
          },
        ],
        isError: true,
      };
    }
  }

  private async executeTool(name: string, input: Record<string, unknown>): Promise<unknown> {
    if (name === 'get_supported_modes') {
      const modes = Modes.map((mode) => mode.modeName);
      return {
        summary: modes.join(', '),
        modes: Modes.map((mode) => ({
          modeName: mode.modeName,
          isTflService: mode.isTflService,
          isFarePaying: mode.isFarePaying,
          isScheduledService: mode.isScheduledService,
        })),
      };
    }

    if (name === 'resolve_line_id') {
      const query = normalize(requireString(input, 'query'));
      const modes = optionalStringArray(input, 'modes');
      const matches = Lines.filter((line) => {
        if (modes?.length && !modes.includes(line.modeName)) {
          return false;
        }
        return rankLineMatch(query, line) < 3;
      })
        .sort((left, right) => {
          const rankDiff = rankLineMatch(query, left) - rankLineMatch(query, right);
          if (rankDiff !== 0) {
            return rankDiff;
          }
          return left.name.localeCompare(right.name);
        })
        .slice(0, 10)
        .map((line) => ({ id: line.id, name: line.name, modeName: line.modeName }));

      return {
        summary:
          matches.length === 0
            ? `No lines matched "${input.query}".`
            : matches.map((line) => `${line.id} (${line.name}, ${line.modeName})`).join('\n'),
        matches,
        best: matches[0] ?? null,
      };
    }

    if (name === 'resolve_stop_id') {
      const query = requireString(input, 'query');
      const modes = optionalStringArray(input, 'modes');
      const limit = optionalLimit(input, 5, 10);
      const cacheKey = `stop:${normalize(query)}:${(modes ?? []).sort().join(',')}`;
      const live = await this.runLive(cacheKey, CACHE_TTLS.stopSearch, async () =>
        this.getClient().stopPoint.search({ query, modes }),
      );
      const rawMatches =
        isRecord(live.data) && Array.isArray(live.data.matches) ? live.data.matches : [];
      const matches = rawMatches.slice(0, limit).map((match) => {
        if (!isRecord(match)) {
          return { id: '', name: '' };
        }
        return {
          id: typeof match.id === 'string' ? match.id : '',
          name: typeof match.name === 'string' ? match.name : '',
          modes: Array.isArray(match.modes) ? match.modes.filter((item) => typeof item === 'string') : [],
          lat: typeof match.lat === 'number' ? match.lat : undefined,
          lon: typeof match.lon === 'number' ? match.lon : undefined,
          zone: typeof match.zone === 'string' ? match.zone : undefined,
        };
      });

      return {
        summary:
          matches.length === 0
            ? `No stops matched "${query}".`
            : matches.map((match) => `${match.id} — ${match.name}`).join('\n'),
        matches,
        best: matches[0] ?? null,
        cacheHit: live.cacheHit,
        fetchedAt: live.fetchedAt,
      };
    }

    if (name === 'get_line_status') {
      const lineIds = optionalStringArray(input, 'lineIds');
      const modes = optionalStringArray(input, 'modes');
      const issuesOnly = optionalBoolean(input, 'issuesOnly', false);
      if (!lineIds?.length && !modes?.length) {
        throw new Error('Provide at least one "lineIds" or "modes" value.');
      }

      const cacheKey = `status:${(lineIds ?? []).sort().join(',')}:${(modes ?? []).sort().join(',')}`;
      const live = await this.runLive(cacheKey, CACHE_TTLS.lineStatus, () =>
        this.getClient().line.getStatus({ lineIds, modes }),
      );

      const compacted = (Array.isArray(live.data) ? live.data : [])
        .map(compactLineStatus)
        .filter((line): line is NonNullable<typeof line> => line !== null)
        .filter((line) => (issuesOnly ? line.hasIssues : true));

      return {
        summary: formatStatusSummary(compacted),
        lines: compacted,
        issuesOnly,
        cacheHit: live.cacheHit,
        fetchedAt: live.fetchedAt,
      };
    }

    if (name === 'get_arrivals') {
      const stopPointId = requireString(input, 'stopPointId');
      const lineIds = optionalStringArray(input, 'lineIds');
      const limit = optionalLimit(input, 10, 20);
      const live = await this.runLive(
        `arrivals:${stopPointId}`,
        CACHE_TTLS.arrivals,
        () => this.getClient().stopPoint.getArrivals({ stopPointIds: [stopPointId] }),
      );

      const arrivals = (Array.isArray(live.data) ? live.data : [])
        .filter((arrival) => {
          if (!isRecord(arrival)) {
            return false;
          }
          if (!lineIds?.length) {
            return true;
          }
          const lineId = typeof arrival.lineId === 'string' ? arrival.lineId : '';
          return lineIds.includes(lineId);
        })
        .sort((first, second) => {
          const firstTime =
            isRecord(first) && typeof first.timeToStation === 'number'
              ? first.timeToStation
              : Number.MAX_SAFE_INTEGER;
          const secondTime =
            isRecord(second) && typeof second.timeToStation === 'number'
              ? second.timeToStation
              : Number.MAX_SAFE_INTEGER;
          return firstTime - secondTime;
        })
        .slice(0, limit)
        .map((arrival) => {
          const record = arrival as Record<string, unknown>;
          return {
            line: typeof record.lineName === 'string' ? record.lineName : 'Unknown',
            lineId: typeof record.lineId === 'string' ? record.lineId : undefined,
            towards: typeof record.towards === 'string' ? record.towards : 'Unknown',
            minutes: minutesUntil(
              typeof record.timeToStation === 'number' ? record.timeToStation : undefined,
            ),
            platform: typeof record.platformName === 'string' ? record.platformName : 'n/a',
          };
        });

      return {
        summary: formatArrivalsSummary(arrivals),
        stopPointId,
        arrivals,
        cacheHit: live.cacheHit,
        fetchedAt: live.fetchedAt,
      };
    }

    if (name === 'plan_journey') {
      const from = requireString(input, 'from');
      const to = requireString(input, 'to');
      const modes = optionalStringArray(input, 'modes');
      const cacheKey = `journey:${from}:${to}:${(modes ?? []).sort().join(',')}`;
      const live = await this.runLive(cacheKey, CACHE_TTLS.journey, () =>
        this.getClient().journey.plan({ from, to, mode: modes }),
      );

      const client = this.getClient();
      const journeysRaw = isRecord(live.data) && Array.isArray(live.data.journeys)
        ? live.data.journeys
        : [];
      const journeys = journeysRaw.slice(0, 3).map((journey, index) => {
        const record = isRecord(journey) ? journey : {};
        const durationMinutes =
          typeof record.duration === 'number' ? Math.round(record.duration) : undefined;
        const farePence =
          isRecord(record.fare) && typeof record.fare.totalCost === 'number'
            ? record.fare.totalCost
            : undefined;
        const description = client.journey.generateNaturalDescription(journey as never);
        return {
          option: String.fromCharCode(65 + index),
          durationMinutes,
          farePounds: typeof farePence === 'number' ? Number((farePence / 100).toFixed(2)) : undefined,
          summary: description,
          legs: Array.isArray(record.legs)
            ? record.legs.map((leg, legIndex) =>
                client.journey.generateNaturalInstruction(leg as never, legIndex === 0),
              )
            : [],
        };
      });

      const summary =
        journeys.length === 0
          ? 'No journeys found.'
          : journeys
              .map((journey) => {
                const fare =
                  typeof journey.farePounds === 'number' ? `, £${journey.farePounds.toFixed(2)}` : '';
                const duration =
                  typeof journey.durationMinutes === 'number' ? `${journey.durationMinutes} min` : 'n/a';
                return `Option ${journey.option}: ${duration}${fare}\n${journey.summary}`;
              })
              .join('\n\n');

      return {
        summary,
        journeys,
        disambiguation: isRecord(live.data) ? live.data.disambiguation ?? null : null,
        cacheHit: live.cacheHit,
        fetchedAt: live.fetchedAt,
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  }

  private getClient(): TflClient {
    if (!this.client) {
      this.client = new TflClient();
    }
    return this.client;
  }

  private async runLive<T>(
    cacheKey: string,
    ttlMs: number,
    operation: () => Promise<T>,
  ): Promise<LiveEnvelope<T>> {
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return {
        data: cached.value as T,
        cacheHit: true,
        fetchedAt: new Date(cached.expiresAt - ttlMs).toISOString(),
      };
    }

    const existing = this.pending.get(cacheKey);
    if (existing) {
      const data = (await existing) as T;
      return { data, cacheHit: false, fetchedAt: new Date().toISOString() };
    }

    const request = (async (): Promise<T> => {
      await this.waitForRateLimit();
      const value = await operation();
      this.cache.set(cacheKey, { expiresAt: Date.now() + ttlMs, value });
      return value;
    })();

    this.pending.set(cacheKey, request);

    try {
      const data = await request;
      return { data, cacheHit: false, fetchedAt: new Date().toISOString() };
    } finally {
      this.pending.delete(cacheKey);
    }
  }

  private async waitForRateLimit(): Promise<void> {
    const now = Date.now();
    const waitMs = Math.max(0, this.nextRequestAt - now);
    this.nextRequestAt = Math.max(now, this.nextRequestAt) + this.minIntervalMs;
    if (waitMs > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, waitMs));
    }
  }

  private success(id: JsonRpcId, result: unknown): JsonRpcResponse {
    return { jsonrpc: '2.0', id, result };
  }

  private failure(id: JsonRpcId, code: number, message: string): JsonRpcResponse {
    return { jsonrpc: '2.0', id, error: { code, message } };
  }
}

export const startTflMcpServer = (): void => {
  const server = new TflMcpServer();
  const lines = createInterface({ input: process.stdin, crlfDelay: Infinity });

  lines.on('line', async (line) => {
    if (!line.trim()) {
      return;
    }

    let response: JsonRpcResponse | null;
    try {
      const message = JSON.parse(line) as JsonRpcRequest;
      response = await server.handleMessage(message);
    } catch (error) {
      response = {
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: error instanceof Error ? error.message : 'Invalid JSON.',
        },
      };
    }

    if (response) {
      process.stdout.write(`${JSON.stringify(response)}\n`);
    }
  });

  process.stdin.resume();
};
