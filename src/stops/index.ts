/**
 * `tfl-ts/meta/stops`: static index of every station and London bus stop, plus
 * pure search and live-merge helpers. No network, no key. Opt in by importing
 * this subpath; the main entry and `tfl-ts/meta` do not include it.
 *
 * @example
 * import { STOP_INDEX, searchStops, mergeLiveResults } from 'tfl-ts/meta/stops';
 *
 * const instant = searchStops(STOP_INDEX, 'kings cross');      // synchronous
 * const rows = mergeLiveResults(instant, liveSearchMatches);   // later, when TfL answers
 */

import { STOP_INDEX_DATA } from '../generated/stops/StopIndex';
import { createStopIndex } from './decode';

export { STOP_INDEX_FORMAT } from './types';
export type {
  LiveStopHit,
  StationSeed,
  StopIndex,
  StopIndexData,
  StopKind,
  StopRow,
} from './types';
export { createStopIndex, validateStopIndexData } from './decode';
export { foldStopQueries, foldStopText, foldStopTokens } from './fold';
export {
  DEFAULT_STOP_SEARCH_LIMIT,
  distanceMeters,
  parseStopSearchQuery,
  searchStops,
} from '../utils/stopSearch';
export type { SearchStopsOptions } from '../utils/stopSearch';
export { findHighlightedIndex, mergeLiveResults } from '../utils/stopMerge';
export type { MergeLiveOptions } from '../utils/stopMerge';

/** The bundled index: stations and bus stops, as of `STOP_INDEX.generatedAt`. */
export const STOP_INDEX = createStopIndex(STOP_INDEX_DATA);
