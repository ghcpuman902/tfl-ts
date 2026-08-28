/**
 * Loaded by nativeEsm.test.ts under stock Node ESM (not Jest).
 * Self-referencing the package name exercises the exports map.
 */
process.env.TFL_APP_KEY = process.env.TFL_APP_KEY || 'test-app-key';

const ui = await import('tfl-ts/ui');
if (typeof ui.getLineColor !== 'function') {
  throw new Error('tfl-ts/ui getLineColor missing');
}

const meta = await import('tfl-ts/meta');
if (!meta.LINE_STATION_SEQUENCES?.central) {
  throw new Error('tfl-ts/meta LINE_STATION_SEQUENCES missing');
}
if (!Array.isArray(meta.Lines) || meta.Lines.length === 0) {
  throw new Error('tfl-ts/meta Lines missing');
}

const { default: TflClient, getLineColor } = await import('tfl-ts');
if (typeof TflClient !== 'function') {
  throw new Error('tfl-ts default export is not TflClient');
}
if (typeof getLineColor !== 'function') {
  throw new Error('tfl-ts barrel getLineColor missing');
}

const client = new TflClient();
if (client.line.STATION_SEQUENCES.bakerloo.lineName !== 'Bakerloo') {
  throw new Error('client.line.STATION_SEQUENCES failed under ESM');
}

console.log('native-esm-ok');
