/**
 * Loaded by nativeEsm.test.ts under stock Node CJS (not Jest).
 * Self-referencing the package name exercises the exports map.
 */
process.env.TFL_APP_KEY = process.env.TFL_APP_KEY || 'test-app-key';

const TflClient = require('tfl-ts');
const Client = TflClient.default ?? TflClient;
if (typeof Client !== 'function') {
  throw new Error('require(tfl-ts) missing TflClient');
}

const lineMod = require('tfl-ts/dist/generated/meta/Line.js');
if (!Array.isArray(lineMod.Lines) || lineMod.Lines.length === 0) {
  throw new Error('require(tfl-ts/dist/generated/meta/Line.js) missing Lines');
}

const rawMod = require('tfl-ts/dist/generated/raw.js');
if (typeof rawMod.RawClient !== 'function') {
  throw new Error('require(tfl-ts/dist/generated/raw.js) missing RawClient');
}

console.log('native-cjs-ok');
