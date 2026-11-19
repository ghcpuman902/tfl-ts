import { STOP_INDEX } from '../stops';
import { foldStopQueries, foldStopText } from '../stops/fold';
import {
  MATCH_ALL_WORDS,
  MATCH_CONTAINS,
  MATCH_EXACT,
  MATCH_PREFIX,
  MATCH_WORD_PREFIX,
  classifyStopName,
  distanceMeters,
  parseStopSearchQuery,
  searchStops,
} from '../utils/stopSearch';
import { buildTestIndex } from './helpers/stopFixtures';

const index = buildTestIndex();
const names = (query: string, options?: Parameters<typeof searchStops>[2]): string[] =>
  searchStops(index, query, options).map((row) => `${row.name}${row.letter ? ` ${row.letter}` : ''}`);
const ids = (query: string, options?: Parameters<typeof searchStops>[2]): string[] =>
  searchStops(index, query, options).map((row) => row.id);

describe('folding', () => {
  test('case, diacritics, apostrophes, ampersands and punctuation', () => {
    expect(foldStopText("King’s Cross & St. Pancras")).toBe('kings cross and st pancras');
    expect(foldStopText("King's Cross")).toBe(foldStopText('Kings Cross'));
    expect(foldStopText('Théâtre Royal')).toBe('theatre royal');
    expect(foldStopText('  Oxford   Circus / Regent  St ')).toBe('oxford circus regent st');
  });

  test('St/Saint/Street and common abbreviations fold to one form', () => {
    expect(foldStopText('Saint Pancras')).toBe(foldStopText('St Pancras'));
    expect(foldStopText('High Street')).toBe(foldStopText('High St'));
    expect(foldStopText('Rookery Rd')).toBe(foldStopText('Rookery Road'));
    expect(foldStopText('Kings Cross Stn')).toBe(foldStopText('Kings Cross Station'));
    expect(foldStopText('Queens Gdns')).toBe(foldStopText('Queens Gardens'));
    expect(foldStopText('Fish & Chips')).toBe(foldStopText('Fish and Chips'));
  });

  test('a half-typed street also folds to st', () => {
    expect(foldStopQueries('high stre')).toEqual(['high stre', 'high st']);
    expect(foldStopQueries('high st')).toEqual(['high st']);
    expect(foldStopQueries('')).toEqual([]);
  });

  test('match classes: exact < prefix < word-prefix < contains < all words', () => {
    const classes = ['tower hill', 'tower hill station', 'old tower hill', 'stowe road', 'hill tower'].map((name) =>
      classifyStopName(name, ['tower hill']),
    );
    expect(classes).toEqual([MATCH_EXACT, MATCH_PREFIX, MATCH_WORD_PREFIX, -1, MATCH_ALL_WORDS]);
    expect(classifyStopName('stowe road', ['tow'])).toBe(MATCH_CONTAINS);
    expect(classifyStopName('xyz', ['tow'])).toBe(-1);
  });
});

describe('parsing the stop letter', () => {
  test('explicit letters', () => {
    expect(parseStopSearchQuery('kings cross stop E')).toMatchObject({ lettered: { text: ['kings cross'], letter: 'E' }, letterOnly: false });
    expect(parseStopSearchQuery('Rookery Road (Stop Y)')).toMatchObject({ lettered: { text: ['rookery road'], letter: 'Y' } });
    expect(parseStopSearchQuery('stop E')).toMatchObject({ lettered: { text: [], letter: 'E' }, letterOnly: true });
    expect(parseStopSearchQuery('stop ha')).toMatchObject({ lettered: { letter: 'HA' }, letterOnly: true });
  });

  test('a bare trailing letter is tried both ways', () => {
    const parsed = parseStopSearchQuery('kings cross e');
    expect(parsed.whole).toEqual(['kings cross e']);
    expect(parsed.lettered).toEqual({ text: ['kings cross'], letter: 'E' });
  });

  test('plain queries carry no letter', () => {
    expect(parseStopSearchQuery('tower hill').lettered).toBeUndefined();
    expect(parseStopSearchQuery('e').lettered).toBeUndefined();
  });
});

describe('searchStops ranking', () => {
  test('"tow" returns Tower Hill and Tower Gateway first, stations above bus stops', () => {
    const results = searchStops(index, 'tow');
    expect(results.slice(0, 2).map((row) => row.id).sort()).toEqual(['940GZZLUTWH', 'HUBTOG']);
    expect(results[0].kind).toBe('station');
    expect(results[1].kind).toBe('station');
    // Then the bus stops that also start with "tow": Tower Hill Station and Town Hall.
    expect(results.slice(2, 5).map((row) => row.name)).toEqual(['Tower Hill Station', 'Tower Hill Station', 'Town Hall']);
    // "Stowe Road" only contains it, so it comes after every prefix match.
    expect(results.map((row) => row.name).indexOf('Stowe Road')).toBeGreaterThan(4);
  });

  test('"kings cross" gives the station/hub first, then the King\'s Cross bus stops', () => {
    const results = searchStops(index, 'kings cross');
    expect(results[0].id).toBe('HUBKGX');
    expect(results[1].kind).toBe('bus');
    const stops = results.slice(1).filter((row) => row.name.startsWith("King's Cross"));
    // No `near`: name A–Z, then letter. Station-named stops D, E, R are in letter order.
    const stationStops = stops.filter((row) => row.name === "King's Cross Station").map((row) => row.letter);
    expect(stationStops).toEqual(['D', 'E', 'R']);
  });

  test('"kings cross E" pins stop E first', () => {
    const results = searchStops(index, 'kings cross E');
    expect(results[0]).toMatchObject({ id: '490000129E', letter: 'E' });
    // The rest still follow, with the station/hub among them.
    expect(results.map((row) => row.id)).toContain('HUBKGX');
    expect(searchStops(index, 'kings cross stop E')[0].id).toBe('490000129E');
    expect(searchStops(index, "King's Cross (Stop R)")[0].id).toBe('490000129R');
  });

  test('"stop E" alone lists only stops painted E, nearest first with a point', () => {
    const results = searchStops(index, 'stop E', { near: { lat: 51.5308, lon: -0.1238 } });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((row) => row.letter === 'E')).toBe(true);
    expect(results[0].id).toBe('490000129E');
  });

  test('a bare trailing letter does not hide a plain name match', () => {
    // "tower hill s" could be a stop S, or a word starting with s; the rows still match.
    expect(ids('tower h')).toEqual(expect.arrayContaining(['940GZZLUTWH']));
    expect(names('seven k')[0]).toBe('Seven Kings');
  });

  test('exact beats prefix beats contains', () => {
    expect(names('angel')[0]).toBe('Angel');
    expect(names('seven kings')[0]).toBe('Seven Kings');
    expect(ids('tower hill')[0]).toBe('940GZZLUTWH'); // station before bus stop named Tower Hill Station
  });

  test('folding makes King\'s, Kings, & and Saint equivalent', () => {
    expect(ids("king's cross")).toEqual(ids('kings cross'));
    expect(ids('KINGS CROSS')).toEqual(ids('kings cross'));
    expect(ids('st pancras')).toEqual(ids('saint pancras'));
    // Match class outranks "station first": bus stops *starting* with "St Pancras"
    // are prefix matches, while the hub only has it at a word boundary.
    const stPancras = searchStops(index, 'st pancras');
    expect(stPancras[0].name).toBe('St Pancras International Station');
    expect(stPancras.findIndex((row) => row.id === 'HUBKGX')).toBeGreaterThan(0);
    expect(ids('kings cross and st')[0]).toBe('HUBKGX');
    expect(ids('theatre royal rd')[0]).toBe('490000777Z');
    expect(ids('THEATRE ROYAL ROAD')[0]).toBe('490000777Z');
  });

  test('word order does not matter once every word is present', () => {
    expect(ids('caledonian kings')).toContain('490001172X');
  });

  test('breaks ties by distance to `near`, then A–Z', () => {
    const nearTower = searchStops(index, 'tower', { near: { lat: 51.5105, lon: -0.0745 } });
    expect(nearTower.map((row) => row.id).slice(0, 2)).toEqual(['HUBTOG', '940GZZLUTWH']); // Gateway is closer
    expect(nearTower[0].distance).toBeLessThan(nearTower[1].distance as number);
    expect(Number.isInteger(nearTower[0].distance)).toBe(true);

    const nearHill = searchStops(index, 'tower', { near: { lat: 51.50998, lon: -0.07655 } });
    expect(nearHill.map((row) => row.id).slice(0, 2)).toEqual(['940GZZLUTWH', 'HUBTOG']);

    // Without `near`, A–Z: Tower Gateway before Tower Hill.
    expect(ids('tower').slice(0, 2)).toEqual(['HUBTOG', '940GZZLUTWH']);
    expect(searchStops(index, 'tower')[0].distance).toBeUndefined();
  });

  test('is deterministic', () => {
    const first = searchStops(index, 'ki');
    for (let i = 0; i < 3; i++) expect(searchStops(index, 'ki')).toEqual(first);
    expect(searchStops(buildTestIndex(), 'ki')).toEqual(first);
  });

  test('limit, kinds, and empty queries', () => {
    expect(searchStops(index, 'tower', { limit: 1 })).toHaveLength(1);
    expect(searchStops(index, 'tower', { limit: 0 })).toEqual([]);
    expect(searchStops(index, 'tow', { kinds: ['bus'] }).every((row) => row.kind === 'bus')).toBe(true);
    expect(searchStops(index, 'tow', { kinds: ['station'] }).every((row) => row.kind === 'station')).toBe(true);
    expect(searchStops(index, '')).toEqual([]);
    expect(searchStops(index, '   ')).toEqual([]);
    expect(searchStops(index, 'zzzzqq')).toEqual([]);
    const nearest = searchStops(index, '', { near: { lat: 51.5308, lon: -0.1238 }, limit: 3 });
    expect(nearest).toHaveLength(3);
    expect(nearest.map((row) => row.distance)).toEqual([...nearest.map((row) => row.distance)].sort((a, b) => (a as number) - (b as number)));
  });

  test('does not mutate the index rows it returns', () => {
    const [first] = searchStops(index, 'tower hill');
    (first as { name: string }).name = 'changed';
    expect(searchStops(index, 'tower hill')[0].name).toBe('Tower Hill');
  });
});

describe('searchStops on the bundled index', () => {
  test('"tow" puts Tower Hill and Tower Gateway first', () => {
    const results = searchStops(STOP_INDEX, 'tow');
    expect(results.slice(0, 2).map((row) => row.name).sort()).toEqual(['Tower Gateway', 'Tower Hill']);
    expect(results[0].kind).toBe('station');
  });

  test('finds a station through diacritic-free, abbreviation-free typing', () => {
    expect(searchStops(STOP_INDEX, 'kings cross')[0].id).toBe('HUBKGX');
    // Station-only, so the many bus stops named "St Pancras …" cannot push it past the limit.
    expect(searchStops(STOP_INDEX, 'st pancras', { kinds: ['station'] })[0].id).toBe('HUBKGX');
    expect(searchStops(STOP_INDEX, 'angel')[0].name).toBe('Angel');
  });

  test('distanceMeters is a plausible great-circle distance', () => {
    // Tower Hill to Tower Gateway is a few hundred metres.
    const metres = distanceMeters({ lat: 51.50998, lon: -0.07655 }, { lat: 51.51062, lon: -0.07481 });
    expect(metres).toBeGreaterThan(100);
    expect(metres).toBeLessThan(250);
    expect(distanceMeters({ lat: 51.5, lon: -0.1 }, { lat: 51.5, lon: -0.1 })).toBe(0);
  });
});
