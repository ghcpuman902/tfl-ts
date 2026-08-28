import { createRequire } from 'node:module';

type SequencesModule = typeof import('../generated/meta/StationSequence');

/**
 * Load station topology without a static import, so `Line` / `getStatus()` do
 * not pull `StationSequence.ts` into the module graph until this runs.
 */
export const loadStationSequences = (): SequencesModule => {
  const require = createRequire(__filename);
  return require('../generated/meta/StationSequence') as SequencesModule;
};
