// run by:
// pnpm dlx ts-node playground/demo/search.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Search module demo');

  const query = 'Oxford Circus';
  const searchResult = await client.search.search({ query });
  printSubsection(`General search "${query}"`);
  console.log(`Total: ${searchResult.total ?? 0}`);
  (searchResult.matches ?? []).slice(0, 3).forEach((match, index) => {
    console.log(`${index + 1}. ${match.name} (${match.id})`);
  });

  const busQuery = '25';
  const busSchedules = await client.search.searchBusSchedules({ query: busQuery });
  printSubsection(`Bus schedules "${busQuery}"`);
  console.log(`Total: ${busSchedules.total ?? 0}`);
  (busSchedules.matches ?? []).slice(0, 3).forEach((match, index) => {
    console.log(`${index + 1}. ${match.name} (${match.id})`);
  });

  printSubsection('Metadata');
  console.log('Search providers (constants):', client.search.SEARCH_PROVIDERS.join(', '));
  console.log('Search providers (API):', (await client.search.getMetaSearchProviders()).join(', '));
  console.log('Categories:', (await client.search.getMetaCategories()).join(', '));
  console.log('Sorts:', (await client.search.getMetaSorts()).join(', '));
};

main().catch((error) => {
  console.error('Search demo failed:', error);
  process.exit(1);
});
