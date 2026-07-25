// run by:
// pnpm dlx ts-node playground/demo/travelTimes.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { TflHttpError } from '../../src/errors';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const formatHttpError = (error: unknown): string => {
  if (error instanceof TflHttpError) {
    return `${error.statusCode} ${error.statusText}${error.tflMessage ? ` — ${error.tflMessage}` : ''}`;
  }
  return error instanceof Error ? error.message : String(error);
};

const baseQuery = {
  z: 12,
  mapCenterLat: 51.5074,
  mapCenterLon: -0.1278,
  pinLat: 51.5154,
  pinLon: -0.1419,
  width: 256,
  height: 256,
  scenarioTitle: 'average',
  timeOfDayId: 'AM',
  modeId: 'tube',
  direction: 'From' as const,
  travelTimeInterval: '15',
};

const main = async (): Promise<void> => {
  printSection('TravelTimes module demo');
  console.log('Note: TravelTimes overlay endpoints are often flaky on TfL’s side.\n');

  try {
    const overlay = await client.travelTimes.getOverlay(baseQuery);
    printSubsection('Overlay');
    console.log(`Type: ${typeof overlay}`);
    console.log(`Keys: ${Object.keys(overlay || {}).slice(0, 10).join(', ') || '(none)'}`);
  } catch (error) {
    printSubsection('Overlay');
    console.log(`⚠️  Overlay unavailable (${formatHttpError(error)})`);
  }

  try {
    const compareOverlay = await client.travelTimes.getCompareOverlay({
      ...baseQuery,
      compareType: 'timeOfDayId',
      compareValue: 'PM',
    });
    printSubsection('Compare overlay');
    console.log(`Type: ${typeof compareOverlay}`);
    console.log(`Keys: ${Object.keys(compareOverlay || {}).slice(0, 10).join(', ') || '(none)'}`);
  } catch (error) {
    printSubsection('Compare overlay');
    console.log(`⚠️  Compare overlay unavailable (${formatHttpError(error)})`);
  }

  printSubsection('Static helpers');
  console.log('travelTimes module loaded; overlay calls are live-map tiles from TfL.');
};

main().catch((error) => {
  console.error('TravelTimes demo failed:', formatHttpError(error));
  process.exit(1);
});
