// run by:
// pnpm dlx ts-node playground/demo/raw.ts

import dotenv from 'dotenv';
import TflClient, { ENDPOINT_COUNT } from '../../src/index';
import { printCommandHint, printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('Raw client escape hatch demo');
  console.log(`ENDPOINT_COUNT: ${ENDPOINT_COUNT}`);

  const modes = await client.raw.mode.getActiveServiceTypes({});
  printSubsection(`Active service types (${modes.length})`);
  modes.forEach((type, index) => {
    console.log(`${index + 1}. ${type.serviceType || type.mode || 'Unknown'}`);
  });

  const lines = await client.raw.line.getByMode({ modes: ['tube'] });
  printSubsection(`Tube lines via raw.line.get (${lines.length})`);

  const status = await client.raw.line.statusByIds({ ids: ['central', 'victoria'] });
  printSubsection(`Line status via raw.line.statusByIds (${status.length})`);
  status.forEach((line) => {
    console.log(`${line.name}: ${line.lineStatuses?.[0]?.statusSeverityDescription || 'Unknown'}`);
  });

  printSubsection('Browse all raw operations');
  printCommandHint('pnpm exec tfl list --tag line');
  printCommandHint('pnpm exec tfl raw line.get --modes tube');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
