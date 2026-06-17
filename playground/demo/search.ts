// run by:
// pnpm dlx ts-node playground/demo/search.ts

import TflClient from '../../src/index';
import dotenv from 'dotenv';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Search demo');
    console.log('===========');

    const query = 'Oxford Circus';
    const searchResult = await client.search.search({ query });
    console.log(`General search "${query}" -> total: ${searchResult.total ?? 0}`);
    (searchResult.matches ?? []).slice(0, 3).forEach((match, index) => {
      console.log(`${index + 1}. ${match.name} (${match.id})`);
    });

    const busQuery = '25';
    const busSchedules = await client.search.searchBusSchedules({ query: busQuery });
    console.log(`\nBus schedules "${busQuery}" -> total: ${busSchedules.total ?? 0}`);
    (busSchedules.matches ?? []).slice(0, 3).forEach((match, index) => {
      console.log(`${index + 1}. ${match.name} (${match.id})`);
    });

    console.log('\nMetadata');
    console.log('Search providers (constants):', client.search.SEARCH_PROVIDERS);
    console.log('Search providers (API):', await client.search.getMetaSearchProviders());
    console.log('Categories:', await client.search.getMetaCategories());
    console.log('Sorts:', await client.search.getMetaSorts());
  } catch (error) {
    console.error('Search demo failed:', error);
  }
};

main();
import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const main = async () => {
  try {
    console.log('Search demo');
    console.log('===========');

    const generalResults = await client.search.search({ query: 'Oxford Circus' });
    const firstMatches = (generalResults.matches || []).slice(0, 3);

    console.log('\nGeneral search ("Oxford Circus")');
    console.log(`Total matches: ${generalResults.total ?? firstMatches.length}`);
    firstMatches.forEach((match, index) => {
      console.log(`${index + 1}. ${match.name} (${match.url || 'no-url'})`);
    });

    const busScheduleResults = await client.search.searchBusSchedules({ query: '25' });
    console.log('\nBus schedule search ("25")');
    console.log(`Total matches: ${busScheduleResults.total ?? busScheduleResults.matches?.length ?? 0}`);

    console.log('\nSearch metadata');
    console.log(`Configured providers in client metadata: ${client.search.SEARCH_PROVIDERS.join(', ')}`);
    console.log(`API providers: ${(await client.search.getMetaSearchProviders()).join(', ')}`);
    console.log(`API categories: ${(await client.search.getMetaCategories()).join(', ')}`);
    console.log(`API sorts: ${(await client.search.getMetaSorts()).join(', ')}`);
  } catch (error) {
    console.error('Search demo failed:', error);
  }
};

main();
