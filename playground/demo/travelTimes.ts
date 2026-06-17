// run by:
// pnpm dlx ts-node playground/demo/travelTimes.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const baseQuery = {
  z: 12,
  mapCenterLat: 51.5074,
  mapCenterLon: -0.1278,
  pinLat: 51.5154,
  pinLon: -0.1419,
  width: 256,
  height: 256,
  scenarioTitle: 'TfL ts demo',
  timeOfDayId: 'AM',
  modeId: 'tube',
  direction: 'From' as const,
  travelTimeInterval: '15',
};

const main = async (): Promise<void> => {
  printSection('TravelTimes module demo');

  const overlay = await client.travelTimes.getOverlay(baseQuery);
  printSubsection('Overlay');
  console.log(`Type: ${typeof overlay}`);
  console.log(`Keys: ${Object.keys(overlay).slice(0, 10).join(', ')}`);

  const compareOverlay = await client.travelTimes.getCompareOverlay({
    ...baseQuery,
    compareType: 'timeOfDayId',
    compareValue: 'PM',
  });
  printSubsection('Compare overlay');
  console.log(`Type: ${typeof compareOverlay}`);
  console.log(`Keys: ${Object.keys(compareOverlay).slice(0, 10).join(', ')}`);
};

main().catch((error) => {
  console.error('TravelTimes demo failed:', error);
  process.exit(1);
});
