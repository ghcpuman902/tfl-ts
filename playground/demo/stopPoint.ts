// run by:
// pnpm dlx ts-node playground/demo/stopPoint.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Stop point module demo');

  const query = 'Oxford Circus';
  const searchResult = await client.stopPoint.search({ query, modes: ['tube'] });
  const stopPointId = searchResult.matches?.[0]?.id;

  printSubsection(`Search "${query}"`);
  (searchResult.matches ?? []).slice(0, 3).forEach((match, index) => {
    console.log(`${index + 1}. ${match.name} (${match.id})`);
  });

  if (!stopPointId) {
    console.log('No stop point found to continue the demo.');
    return;
  }

  const stopDetails = await client.stopPoint.get({ stopPointIds: [stopPointId] });
  printSubsection('Lookup by stopPointIds');
  stopDetails.forEach((stop, index) => {
    console.log(`${index + 1}. ${stop.commonName || stop.id} [${stop.modes?.join(', ') || 'n/a'}]`);
  });

  const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
  printSubsection(`Arrivals (${arrivals.length})`);
  [...arrivals]
    .sort((a, b) => (a.timeToStation || 0) - (b.timeToStation || 0))
    .slice(0, 5)
    .forEach((arrival, index) => {
      const minutes = Math.round((arrival.timeToStation || 0) / 60);
      console.log(
        `${index + 1}. ${arrival.lineName} to ${arrival.towards} in ${minutes}min on ${arrival.platformName || 'n/a'}`,
      );
    });

  printSubsection('Metadata');
  console.log(`Known modes: ${client.stopPoint.MODE_NAMES.length}`);
  console.log(`Sample modes: ${client.stopPoint.MODE_NAMES.slice(0, 6).join(', ')}`);
};

main().catch((error) => {
  console.error('Stop point demo failed:', error);
  process.exit(1);
});
