/**
 * Text folding for stop search. Pure, no data.
 *
 * `foldStopText("King’s Cross St. Pancras")` → `"kings cross st pancras"`.
 *
 * Folds: case, diacritics, apostrophes (King's → Kings), `&` → `and`,
 * punctuation to spaces, and common street abbreviations to one canonical word
 * (Rd → road, Stn → station). `St` and `Saint` both fold to `st`; so does
 * `Street`, because on a bus stop sign `St` is far more often a street.
 */

const ABBREVIATIONS: Readonly<Record<string, string>> = {
  saint: 'st',
  street: 'st',
  rd: 'road',
  ave: 'avenue',
  av: 'avenue',
  ln: 'lane',
  sq: 'square',
  pl: 'place',
  cres: 'crescent',
  gdn: 'gardens',
  gdns: 'gardens',
  garden: 'gardens',
  pk: 'park',
  stn: 'station',
  hosp: 'hospital',
  cl: 'close',
  ct: 'court',
  ter: 'terrace',
  terr: 'terrace',
  dr: 'drive',
  mt: 'mount',
  bdy: 'broadway',
  jct: 'junction',
  univ: 'university',
  ctr: 'centre',
  cntr: 'centre',
  center: 'centre',
  sch: 'school',
};

const COMBINING_MARKS = /[̀-ͯ]/g;
const APOSTROPHES = /['’‘`´ʼ]/g;
const NON_ALNUM = /[^a-z0-9]+/g;

/** Fold one raw word to its canonical token. */
const foldToken = (token: string): string => ABBREVIATIONS[token] ?? token;

/** Tokens of `value` after folding. */
export const foldStopTokens = (value: string): string[] => {
  const base = value
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(APOSTROPHES, '')
    .replace(/&/g, ' and ')
    .replace(NON_ALNUM, ' ')
    .trim();
  if (!base) return [];
  return base.split(' ').map(foldToken);
};

/** Folded, space-joined form used for matching names. */
export const foldStopText = (value: string): string => foldStopTokens(value).join(' ');

/**
 * Folded forms of a user query. Usually one. When the last word is a half-typed
 * `street` (`str`, `stre`, `stree`) a second form folds it to `st`, so
 * `high str` still finds `High St`. The caller takes the best match of the forms.
 */
export const foldStopQueries = (value: string): string[] => {
  const tokens = foldStopTokens(value);
  if (tokens.length === 0) return [];
  const plain = tokens.join(' ');
  const last = tokens[tokens.length - 1];
  if (last.length >= 3 && last.length < 6 && 'street'.startsWith(last)) {
    return [plain, [...tokens.slice(0, -1), 'st'].join(' ')];
  }
  return [plain];
};
