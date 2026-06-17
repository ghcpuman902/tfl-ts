// run by:
// pnpm dlx ts-node playground/demo/road.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Road module demo');

  printSubsection('Static metadata');
  console.log(`Road categories: ${client.road.ROAD_CATEGORIES.join(', ')}`);
  console.log(`Severity descriptions: ${client.road.ROAD_SEVERITY_DESCRIPTIONS.join(', ')}`);

  const allRoads = await client.road.get();
  printSubsection(`All roads (${allRoads.length})`);
  allRoads.slice(0, 5).forEach((road, index) => {
    console.log(`${index + 1}. ${road.displayName || road.id} — ${road.statusSeverityDescription || 'Unknown'}`);
  });

  const sampleIds = allRoads
    .map((road) => road.id)
    .filter((id): id is string => Boolean(id))
    .slice(0, 2);

  if (sampleIds.length > 0) {
    const status = await client.road.getStatus({ ids: sampleIds });
    printSubsection(`Road status for ${sampleIds.join(', ')}`);
    status.forEach((road, index) => {
      console.log(`${index + 1}. ${road.displayName || road.id}: ${road.statusSeverityDescription}`);
    });

    const disruptions = await client.road.getDisruptions({
      ids: sampleIds,
      stripContent: true,
    });
    printSubsection(`Road disruptions (${disruptions.length})`);
    disruptions.slice(0, 3).forEach((disruption, index) => {
      console.log(`${index + 1}. ${disruption.category || 'Disruption'} — ${disruption.severity || 'n/a'}`);
    });
  }
};

main().catch((error) => {
  console.error('Road demo failed:', error);
  process.exit(1);
});
