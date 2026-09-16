import { Lines } from './generated/meta/Line';
import { Modes } from './generated/meta/Meta';

export type LineIdCheck = {
  input: string;
  ok: boolean;
  id?: string;
  name?: string;
  modeName?: string;
  suggestion?: string;
  fix?: string;
};

export type ModeNameCheck = {
  input: string;
  ok: boolean;
  modeName?: string;
  suggestion?: string;
  fix?: string;
};

export type IdCheckReport = {
  ok: boolean;
  lines: LineIdCheck[];
  modes: ModeNameCheck[];
};

const normalize = (value: string): string =>
  value.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

const rankLineMatch = (query: string, line: { id: string; name: string }): number => {
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

const suggestLine = (input: string): (typeof Lines)[number] | undefined => {
  const query = normalize(input);
  if (!query) {
    return undefined;
  }
  const ranked = Lines.map((line) => ({ line, rank: rankLineMatch(query, line) }))
    .filter((entry) => entry.rank < 3)
    .sort((left, right) => left.rank - right.rank || left.line.name.localeCompare(right.line.name));
  return ranked[0]?.line;
};

const suggestMode = (input: string): string | undefined => {
  const query = normalize(input);
  if (!query) {
    return undefined;
  }
  const exact = Modes.find((mode) => normalize(mode.modeName) === query);
  if (exact) {
    return exact.modeName;
  }
  const prefix = Modes.find((mode) => normalize(mode.modeName).startsWith(query));
  return prefix?.modeName;
};

export const checkLineId = (input: string): LineIdCheck => {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      input,
      ok: false,
      fix: 'Pass a line id such as "central". Line IDs are lowercase slugs, not display names.',
    };
  }

  const exact = Lines.find((line) => line.id === trimmed);
  if (exact) {
    return {
      input: trimmed,
      ok: true,
      id: exact.id,
      name: exact.name,
      modeName: exact.modeName,
    };
  }

  const suggested = suggestLine(trimmed);
  if (suggested) {
    return {
      input: trimmed,
      ok: false,
      suggestion: suggested.id,
      name: suggested.name,
      modeName: suggested.modeName,
      fix: `Line IDs are lowercase slugs. Use "${suggested.id}", not "${trimmed}".`,
    };
  }

  return {
    input: trimmed,
    ok: false,
    fix: `Unknown line id "${trimmed}". Run "tfl check --line <id>" after resolving a name, or import Lines from "tfl-ts/meta".`,
  };
};

export const checkModeName = (input: string): ModeNameCheck => {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      input,
      ok: false,
      fix: 'Pass a mode such as "tube". Mode names are lowercase slugs.',
    };
  }

  const exact = Modes.find((mode) => mode.modeName === trimmed);
  if (exact) {
    return { input: trimmed, ok: true, modeName: exact.modeName };
  }

  const suggested = suggestMode(trimmed);
  if (suggested) {
    return {
      input: trimmed,
      ok: false,
      suggestion: suggested,
      fix: `Mode names are lowercase slugs. Use "${suggested}", not "${trimmed}".`,
    };
  }

  return {
    input: trimmed,
    ok: false,
    fix: `Unknown mode "${trimmed}". Valid examples: tube, bus, dlr, elizabeth-line, overground.`,
  };
};

export const checkLineIds = (inputs: string[]): LineIdCheck[] => inputs.map(checkLineId);

export const checkModeNames = (inputs: string[]): ModeNameCheck[] => inputs.map(checkModeName);

export const checkIds = (options: { lines?: string[]; modes?: string[] }): IdCheckReport => {
  const lines = checkLineIds(options.lines ?? []);
  const modes = checkModeNames(options.modes ?? []);
  return {
    ok: lines.every((row) => row.ok) && modes.every((row) => row.ok),
    lines,
    modes,
  };
};
