import { execFileSync } from 'child_process';
import path from 'path';
import { checkIds } from '../src/checkIds';
import TflClient from '../src/client';
import { findDocs, readDoc } from '../src/docs';
import { getLineColor, sortLinesBySeverityAndOrder } from '../src/ui';
import { observe, skipAll, type Observation, type Scenario } from './types';

const ROOT = path.join(__dirname, '..');
const BIN = path.join(ROOT, 'dist/cjs/bin/tfl.js');

const OXFORD_CIRCUS = '940GZZLUOXC';
const BOND_STREET = '940GZZLUBND';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const liveError = (error: unknown): string => {
  if (error instanceof Error && /429|Too Many Requests/i.test(error.message)) {
    return 'TfL rate-limited this trial (429).';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const idResolution: Scenario = {
  id: 'id-resolution',
  useCase: 'Someone types "Central" or "Tube" into a status board.',
  kind: 'offline',
  agentPrompt: 'Show me whether the Central line is running. I only know the name, not the id.',
  expectedMoves: [
    'tfl check --line Central (or checkLineId / resolve_line_id)',
    'Call getStatus with lineIds: ["central"], never "Central"',
  ],
  run: async () => {
    const display = checkIds({ lines: ['Central', 'central'], modes: ['Tube', 'tube'] });
    return [
      observe('central-ok', 'canonical "central" is valid', display.lines.some((row) => row.input === 'central' && row.ok)),
      observe(
        'Central-rejected',
        'display-case "Central" is rejected with suggestion central',
        display.lines.some((row) => row.input === 'Central' && !row.ok && row.suggestion === 'central'),
      ),
      observe('tube-ok', 'canonical "tube" is valid', display.modes.some((row) => row.input === 'tube' && row.ok)),
      observe(
        'Tube-rejected',
        'display-case "Tube" is rejected with suggestion tube',
        display.modes.some((row) => row.input === 'Tube' && !row.ok && row.suggestion === 'tube'),
      ),
    ];
  },
};

const docsRecovery: Scenario = {
  id: 'docs-recovery',
  useCase: 'An agent has lost the repo from context and needs the caching rule.',
  kind: 'offline',
  agentPrompt: 'I installed tfl-ts. How long should I cache line status? I do not have the git clone.',
  expectedMoves: ['tfl docs find caching', 'tfl docs cat on the top hit', 'Do not invent a TTL'],
  run: async () => {
    const hits = findDocs('caching');
    const agents = readDoc('AGENTS.md');
    return [
      observe('find-hits', 'findDocs("caching") returns at least one shipped doc', hits.length > 0),
      observe(
        'find-ranks-known',
        'a known caching doc is in the hit list',
        hits.some((entry) => entry.id === 'docs/agent.md' || entry.id === 'CLAUDE.md' || entry.id === 'docs/mcp.md'),
      ),
      observe('agents-mentions-cache-split', 'AGENTS.md still separates static meta from live calls', /static metadata vs live API/i.test(agents) || /Static \(no network\)/.test(agents)),
    ];
  },
};

const listInventory: Scenario = {
  id: 'list-inventory',
  useCase: 'An agent needs the raw operation name for line status.',
  kind: 'offline',
  agentPrompt: 'What is the raw method for current status of one line? Do not guess.',
  expectedMoves: ['tfl list --tag line (JSON)', 'Use line.statusByIds, not a made-up name'],
  run: async () => {
    try {
      const stdout = execFileSync(process.execPath, [BIN, 'list', '--tag', 'line'], {
        encoding: 'utf8',
        cwd: ROOT,
      });
      const parsed = JSON.parse(stdout) as unknown;
      const rows = Array.isArray(parsed) ? parsed : [];
      const status = rows.find(
        (row) => isRecord(row) && row.tag === 'line' && row.method === 'statusByIds',
      );
      return [
        observe('json', 'tfl list --tag line prints a JSON array', Array.isArray(parsed), {
          note: existsNote(BIN),
        }),
        observe(
          'statusByIds',
          'inventory includes line.statusByIds',
          isRecord(status) && typeof status.path === 'string',
        ),
      ];
    } catch (error) {
      return [
        observe('json', 'tfl list --tag line prints a JSON array', false, {
          note: error instanceof Error ? error.message : String(error),
        }),
      ];
    }
  },
};

const existsNote = (bin: string): string | undefined =>
  require('fs').existsSync(bin) ? undefined : `compiled CLI missing at ${bin}; run pnpm run build`;

const statusBoard: Scenario = {
  id: 'tube-status-board',
  useCase: 'A station board shows every tube line, disruptions first, official colours.',
  kind: 'live',
  agentPrompt: 'Build a tube status board for a departure screen. Official colours. Disruptions above Good Service.',
  expectedMoves: [
    'client.line.getStatus({ modes: ["tube"] })',
    'sortLinesBySeverityAndOrder / getWorstCurrentStatus, not lineStatuses[0]',
    'getLineColor from tfl-ts/ui, not from the barrel',
  ],
  run: async () => {
    const claims = [
      { id: 'array', claim: 'getStatus({ modes: ["tube"] }) returned an array' },
      { id: 'enough-lines', claim: 'at least 9 tube lines came back (TfL usually sends 11)' },
      { id: 'ids', claim: 'every row has a string id' },
      { id: 'colours', claim: 'getLineColor(id) returns a #hex for each id' },
      { id: 'sort', claim: 'sortLinesBySeverityAndOrder returns the same count without throwing' },
    ];
    try {
      const client = new TflClient();
      const raw = await client.line.getStatus({ modes: ['tube'] });
      const lines = Array.isArray(raw) ? raw : [];
      const ids = lines.map((line) => (isRecord(line) && typeof line.id === 'string' ? line.id : ''));
      const sorted = sortLinesBySeverityAndOrder(
        lines.filter(isRecord).map((line) => ({
          id: typeof line.id === 'string' ? line.id : undefined,
          lineStatuses: Array.isArray(line.lineStatuses)
            ? line.lineStatuses.map((status) => (isRecord(status) ? status : {}))
            : [],
        })),
      );
      return [
        observe('array', claims[0].claim, Array.isArray(raw), { note: `n=${lines.length}` }),
        observe('enough-lines', claims[1].claim, lines.length >= 9, { note: `n=${lines.length}` }),
        observe('ids', claims[2].claim, ids.length > 0 && ids.every((id) => id.length > 0)),
        observe(
          'colours',
          claims[3].claim,
          ids.filter(Boolean).every((id) => /^#[0-9A-Fa-f]{6}$/.test(getLineColor(id).hex)),
        ),
        observe('sort', claims[4].claim, sorted.length === lines.length),
      ];
    } catch (error) {
      return skipAll(liveError(error), claims);
    }
  },
};

const arrivals: Scenario = {
  id: 'oxford-circus-arrivals',
  useCase: 'A passenger at Oxford Circus wants the next trains.',
  kind: 'live',
  agentPrompt: 'Next arrivals at Oxford Circus tube. I do not have the stop id memorised, but you may use the well-known one if you already resolved it.',
  expectedMoves: [
    'Prefer a known id 940GZZLUOXC or search then getArrivals',
    'Do not treat an empty array as an error',
    'Do not poll faster than about 10–15s',
  ],
  run: async () => {
    const claims = [
      { id: 'array', claim: 'getArrivals returned an array (empty is allowed)' },
      { id: 'shape', claim: 'when predictions exist, each has a line id or name and a timeToStation number' },
    ];
    try {
      const client = new TflClient();
      const raw = await client.stopPoint.getArrivals({ stopPointIds: [OXFORD_CIRCUS] });
      const rows = Array.isArray(raw) ? raw : [];
      const shaped =
        rows.length === 0 ||
        rows.every((row) => {
          if (!isRecord(row)) {
            return false;
          }
          const hasLine = typeof row.lineId === 'string' || typeof row.lineName === 'string';
          return hasLine && typeof row.timeToStation === 'number';
        });
      return [
        observe('array', claims[0].claim, Array.isArray(raw), { note: `n=${rows.length}` }),
        observe('shape', claims[1].claim, shaped, {
          skip: rows.length === 0,
          note: rows.length === 0 ? 'No predictions this trial. Common late at night. Not a product bug.' : `n=${rows.length}`,
        }),
      ];
    } catch (error) {
      return skipAll(liveError(error), claims);
    }
  },
};

const journey: Scenario = {
  id: 'journey-oxc-bond',
  useCase: 'Plan Oxford Circus to Bond Street.',
  kind: 'live',
  agentPrompt: 'How do I get from Oxford Circus to Bond Street right now? Use stop ids if you have them.',
  expectedMoves: [
    `journey.plan({ from: "${OXFORD_CIRCUS}", to: "${BOND_STREET}" })`,
    'Read journeys or disambiguation, not a guessed walk time',
  ],
  run: async () => {
    const claims = [
      { id: 'payload', claim: 'plan() returned an object' },
      { id: 'usable', claim: 'payload has journeys or a disambiguation block' },
      { id: 'duration', claim: 'when a journey exists, duration is a number' },
    ];
    try {
      const client = new TflClient();
      const raw = await client.journey.plan({ from: OXFORD_CIRCUS, to: BOND_STREET });
      const record = isRecord(raw) ? raw : {};
      const journeys = Array.isArray(record.journeys) ? record.journeys : [];
      const hasDisambiguation = isRecord(record.disambiguation);
      const durationOk =
        journeys.length === 0 ||
        journeys.some((item) => isRecord(item) && typeof item.duration === 'number');
      return [
        observe('payload', claims[0].claim, isRecord(raw)),
        observe('usable', claims[1].claim, journeys.length > 0 || hasDisambiguation, {
          note: `journeys=${journeys.length} disambiguation=${hasDisambiguation}`,
        }),
        observe('duration', claims[2].claim, durationOk, {
          skip: journeys.length === 0,
          note: journeys.length === 0 ? 'Planner returned no journeys this trial.' : undefined,
        }),
      ];
    } catch (error) {
      return skipAll(liveError(error), claims);
    }
  },
};

export const SCENARIOS: Scenario[] = [
  idResolution,
  docsRecovery,
  listInventory,
  statusBoard,
  arrivals,
  journey,
];
