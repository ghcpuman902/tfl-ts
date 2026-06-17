// run by:
// pnpm dlx ts-node playground/demo/raw.ts

import dotenv from 'dotenv';
import TflClient from '../../src/index';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  console.log('🔧 Raw client escape hatch demo');
  console.log('================================\n');

  const modes = await client.raw.mode.getActiveServiceTypes({});
  console.log(`Active service types: ${modes.length}`);

  const lines = await client.raw.line.get({ modes: ['tube'] });
  console.log(`Tube lines via raw.line.get: ${lines.length}`);

  const status = await client.raw.line.statusByIds({ ids: ['central', 'victoria'] });
  console.log(`Line status via raw.line.statusByIds: ${status.length}`);

  console.log('\n💡 Every REST endpoint is reachable as client.raw.<tag>.<method>()');
  console.log('   Run `pnpm exec tfl list --tag line` to browse all raw operations.');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
