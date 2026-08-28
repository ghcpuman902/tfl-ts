import TflClient from '../client';
import { Journey } from '../journey';

process.env.TFL_APP_KEY = 'test-app-key';
delete process.env.TFL_APP_ID;

describe('lazy TflClient wrappers', () => {
  beforeEach(() => {
    Journey.instanceCount = 0;
  });

  test('does not construct Journey until .journey is read', () => {
    const client = new TflClient();
    expect(Journey.instanceCount).toBe(0);
    expect(client.line).toBeDefined();
    expect(Journey.instanceCount).toBe(0);
    expect(client.journey).toBeDefined();
    expect(Journey.instanceCount).toBe(1);
    expect(client.journey).toBe(client.journey);
    expect(Journey.instanceCount).toBe(1);
  });

  test('does not load station sequences until STATION_SEQUENCES is read', () => {
    jest.isolateModules(() => {
      const seqPath = require.resolve('../generated/meta/StationSequence');
      delete require.cache[seqPath];
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { TflClient: IsolatedClient } = require('../client') as typeof import('../client');
      expect(require.cache[seqPath]).toBeUndefined();
      const client = new IsolatedClient();
      expect(require.cache[seqPath]).toBeUndefined();
      expect(client.line.LINE_NAMES.central).toBe('Central');
      expect(require.cache[seqPath]).toBeUndefined();
      expect(client.line.STATION_SEQUENCES.bakerloo.lineName).toBe('Bakerloo');
      expect(Object.keys(require.cache).some((key) => key.includes('StationSequence'))).toBe(
        true,
      );
    });
  });

  test('raw tag getters cache the same object and allocate per tag', () => {
    const client = new TflClient();
    const lineA = client.raw.line;
    const lineB = client.raw.line;
    expect(lineA).toBe(lineB);
    expect(client.raw.travelTime).not.toBe(lineA as unknown);
    expect(typeof client.raw.line.statusByIds).toBe('function');
    expect(typeof client.raw.travelTime.getOverlay).toBe('function');
  });
});
