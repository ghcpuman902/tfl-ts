/**
 * Valid Tfl Line IDs
 * @example
 * // Get specific lines
 * const lines = await client.line.get({ ids: ['central', 'victoria'] });
 */
export type TflLineId =
  // Tube lines
  | 'bakerloo'
  | 'central'
  | 'circle'
  | 'district'
  | 'elizabeth'
  | 'hammersmith-city'
  | 'jubilee'
  | 'metropolitan'
  | 'northern'
  | 'piccadilly'
  | 'victoria'
  | 'waterloo-city'
  // DLR
  | 'dlr'
  // London Overground
  | 'london-overground'
  // Tfl Rail
  | 'tfl-rail'
  // Tram
  | 'tram'
  // Bus
  | 'bus'
  // Cable Car
  | 'cable-car'
  // River Bus
  | 'river-bus'
  // River Tour
  | 'river-tour';

/**
 * Map of line IDs to their display names
 */
export const LINE_NAMES: Record<TflLineId, string> = {
  'bakerloo': 'Bakerloo',
  'central': 'Central',
  'circle': 'Circle',
  'district': 'District',
  'elizabeth': 'Elizabeth',
  'hammersmith-city': 'Hammersmith & City',
  'jubilee': 'Jubilee',
  'metropolitan': 'Metropolitan',
  'northern': 'Northern',
  'piccadilly': 'Piccadilly',
  'victoria': 'Victoria',
  'waterloo-city': 'Waterloo & City',
  'dlr': 'DLR',
  'london-overground': 'London Overground',
  'tfl-rail': 'Tfl Rail',
  'tram': 'Tram',
  'bus': 'Bus',
  'cable-car': 'Cable Car',
  'river-bus': 'River Bus',
  'river-tour': 'River Tour'
} as const;

/**
 * Get the display name for a line ID
 * @param id - The line ID
 * @returns The display name of the line
 * @example
 * const name = getLineName('central'); // Returns "Central"
 */
export const getLineName = (id: TflLineId): string => LINE_NAMES[id]; 