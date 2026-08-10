import type { BikePointInfo } from '../bikePoint';
import {
  extractStatus,
  findElectricBikes,
} from '../utils/bikePoint';

const prop = (key: string, value: string) => ({
  category: 'Description',
  key,
  sourceSystemKey: 'BikePoints',
  value,
  modified: '2026-08-10T18:46:07.87Z',
});

/** Shape matching a live Unified API BikePoint additionalProperties payload. */
const livePenningtonStreet: BikePointInfo = {
  id: 'BikePoints_490',
  commonName: 'Pennington Street, Wapping',
  placeType: 'BikePoint',
  lat: 51.508622,
  lon: -0.065006,
  additionalProperties: [
    prop('TerminalName', '200090'),
    prop('Installed', 'true'),
    prop('Locked', 'false'),
    prop('InstallDate', ''),
    prop('RemovalDate', ''),
    prop('Temporary', 'false'),
    prop('NbBikes', '13'),
    prop('NbEmptyDocks', '29'),
    prop('NbDocks', '45'),
    prop('NbStandardBikes', '12'),
    prop('NbEBikes', '1'),
  ],
};

describe('bikePoint extractStatus', () => {
  test('reads NbStandardBikes / NbEBikes from live API property keys', () => {
    const status = extractStatus(livePenningtonStreet);

    expect(status.id).toBe('BikePoints_490');
    expect(status.name).toBe('Pennington Street, Wapping');
    expect(status.bikes).toBe(13);
    expect(status.docks).toBe(45);
    expect(status.spaces).toBe(29);
    expect(status.brokenDocks).toBe(3);
    expect(status.standardBikes).toBe(12);
    expect(status.eBikes).toBe(1);
  });

  test('falls back to unprefixed StandardBikes / EBikes keys', () => {
    const fixture: BikePointInfo = {
      id: 'BikePoints_1',
      commonName: 'Legacy fixture',
      additionalProperties: [
        prop('NbBikes', '5'),
        prop('NbDocks', '10'),
        prop('NbEmptyDocks', '4'),
        prop('StandardBikes', '3'),
        prop('EBikes', '2'),
      ],
    };

    const status = extractStatus(fixture);
    expect(status.standardBikes).toBe(3);
    expect(status.eBikes).toBe(2);
    expect(status.brokenDocks).toBe(1);
  });

  test('prefers Nb* keys when both prefixed and unprefixed are present', () => {
    const fixture: BikePointInfo = {
      id: 'BikePoints_2',
      commonName: 'Both keys',
      additionalProperties: [
        prop('NbBikes', '4'),
        prop('NbDocks', '10'),
        prop('NbEmptyDocks', '6'),
        prop('NbStandardBikes', '3'),
        prop('NbEBikes', '1'),
        prop('StandardBikes', '99'),
        prop('EBikes', '99'),
      ],
    };

    const status = extractStatus(fixture);
    expect(status.standardBikes).toBe(3);
    expect(status.eBikes).toBe(1);
  });

  test('preserves additionalProperties when keepTflTypes is true', () => {
    const status = extractStatus(livePenningtonStreet, true);
    expect(status.additionalProperties).toHaveLength(
      livePenningtonStreet.additionalProperties!.length,
    );
    expect(
      status.additionalProperties?.find((p) => p.key === 'NbEBikes')?.value,
    ).toBe('1');
  });
});

describe('findElectricBikes', () => {
  test('matches live NbEBikes property key', () => {
    const none: BikePointInfo = {
      id: 'BikePoints_0',
      commonName: 'No e-bikes',
      additionalProperties: [prop('NbEBikes', '0')],
    };

    expect(findElectricBikes([livePenningtonStreet, none])).toEqual([
      livePenningtonStreet,
    ]);
  });
});
