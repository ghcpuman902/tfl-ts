import { DocsError } from '../docs';
import { TflConfigError } from '../errors';

/**
 * CLI process exit codes. Success stays 0. Every failure is non-zero, so
 * `exit !== 0` still means "it failed". Codes other than 1 are new in 2.14:
 * scripts that compared `exit === 1` need to branch on these values instead.
 */
export const CLI_EXIT = {
  OK: 0,
  /** Command ran, then failed (API error, docs find/grep with no matches). */
  ERROR: 1,
  /** Bad invocation: unknown command, missing args, unknown raw operation. */
  USAGE: 2,
  /** Missing TFL_APP_KEY / TflConfigError. */
  CONFIG: 3,
  /** A DOC_MANIFEST file is listed but absent on disk. */
  MISSING_FILE: 4,
} as const;

export type CliExitCode = (typeof CLI_EXIT)[keyof typeof CLI_EXIT];

export class CliError extends Error {
  readonly exitCode: CliExitCode;
  readonly fix?: string;

  constructor(exitCode: CliExitCode, message: string, fix?: string) {
    super(message);
    this.name = 'CliError';
    this.exitCode = exitCode;
    if (fix !== undefined) {
      this.fix = fix;
    }
  }
}

export const getCliExitCode = (error: unknown): number => {
  if (error instanceof CliError) {
    return error.exitCode;
  }
  if (error instanceof DocsError) {
    if (error.code === 'TFL_DOCS_MISSING_FILE') {
      return CLI_EXIT.MISSING_FILE;
    }
    if (error.code === 'TFL_DOCS_INVALID_ARGUMENT' || error.code === 'TFL_DOCS_UNKNOWN_ID') {
      return CLI_EXIT.USAGE;
    }
    return CLI_EXIT.ERROR;
  }
  if (error instanceof TflConfigError) {
    return CLI_EXIT.CONFIG;
  }
  return CLI_EXIT.ERROR;
};

export const printCliError = (error: unknown): void => {
  if (error instanceof DocsError) {
    console.error(error.message);
    console.error(error.fix);
    return;
  }
  if (error instanceof CliError) {
    console.error(error.message);
    if (error.fix) {
      console.error(error.fix);
    }
    return;
  }
  console.error(error instanceof Error ? error.message : error);
};
