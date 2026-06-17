// run by:
// pnpm run demo

import dotenv from 'dotenv';
import TflClient, {
  ENDPOINT_COUNT,
  MODES,
  TflConfigError,
  TflError,
  TflErrorHandler,
  TflHttpError,
  TflNetworkError,
  TflTimeoutError,
  TflValidationError,
  getLineColor,
  getSeverityCategory,
} from '../src/index';
import { printSection, printSubsection, printCommandHint } from './lib/format';

dotenv.config();

const client = new TflClient();

const demonstrateConfigAndConstants = (): void => {
  printSection('1. Client config and v2 constants');
  const config = client.getConfig();
  console.log(`Timeout: ${config.timeout}ms | Retries: ${config.maxRetries}`);
  console.log(`Registered REST operations: ${ENDPOINT_COUNT}`);
  console.log(`Mode metadata entries: ${Object.keys(MODES).length}`);
  console.log('Sample modes:', Object.keys(MODES).slice(0, 6).join(', '));
};

const demonstrateModeAndLine = async (): Promise<void> => {
  printSection('2. Mode and line wrappers');

  const serviceTypes = await client.mode.getActiveServiceTypes();
  printSubsection(`Active service types (${serviceTypes.length})`);
  serviceTypes.slice(0, 3).forEach((type, index) => {
    console.log(`${index + 1}. ${type.serviceType || type.mode || 'Unknown'}`);
  });

  const tubeStatus = await client.line.getStatus({ modes: ['tube'] });
  printSubsection(`Tube line status (${tubeStatus.length} lines)`);
  tubeStatus.slice(0, 3).forEach((line) => {
    const severity = line.lineStatuses?.[0]?.statusSeverity ?? 0;
    const color = getLineColor(line.id || '');
    const category = getSeverityCategory(severity);
    console.log(
      `${line.name}: ${line.lineStatuses?.[0]?.statusSeverityDescription || 'Unknown'} [${category}] ${color.hex}`,
    );
  });
};

const demonstrateStopPoint = async (): Promise<void> => {
  printSection('3. Stop point search and arrivals');

  const query = 'Oxford Circus';
  const stopPointSearchResult = await client.stopPoint.search({ query, modes: ['tube'] });
  const stopPointId = stopPointSearchResult.matches?.[0]?.id;

  if (!stopPointId) {
    console.log(`No stop point found for "${query}"`);
    return;
  }

  console.log(`Stop point: ${stopPointSearchResult.matches?.[0]?.name} (${stopPointId})`);

  const stopDetails = await client.stopPoint.get({ stopPointIds: [stopPointId] });
  console.log(`Stop details fetched: ${stopDetails.length}`);

  const arrivals = await client.stopPoint.getArrivals({ stopPointIds: [stopPointId] });
  const sortedArrivals = [...arrivals].sort(
    (a, b) => (a.timeToStation || 0) - (b.timeToStation || 0),
  );

  printSubsection('Next arrivals');
  sortedArrivals.slice(0, 5).forEach((arrival, index) => {
    const minutes = Math.round((arrival.timeToStation || 0) / 60);
    console.log(
      `${index + 1}. ${arrival.lineName || 'Unknown'} to ${arrival.towards || 'Unknown'} in ${minutes}min`,
    );
  });
};

const demonstrateJourney = async (): Promise<void> => {
  printSection('4. Journey planning');

  const journey = await client.journey.plan({
    from: '1000176',
    to: '1000135',
    mode: ['tube'],
  });

  if (journey.disambiguation) {
    console.log('Disambiguation required — use specific stop IDs from the response.');
    return;
  }

  const fastest = journey.journeys?.[0];
  if (!fastest) {
    console.log('No journeys returned.');
    return;
  }

  console.log(`Duration: ${fastest.duration ?? 'unknown'} minutes`);
  console.log(`Legs: ${fastest.legs?.length ?? 0}`);
  fastest.legs?.slice(0, 3).forEach((leg, index) => {
    console.log(`${index + 1}. [${leg.mode?.name}] ${leg.instruction?.summary}`);
  });
};

const demonstrateRawAndRealtime = async (): Promise<void> => {
  printSection('5. Raw client and realtime');

  const rawStatus = await client.raw.line.statusByIds({ ids: ['central'] });
  console.log(`raw.line.statusByIds -> ${rawStatus.length} line(s)`);

  printSubsection('Realtime polling');
  console.log('Use client.realtime.pollArrivals for bounded REST polling.');
  printCommandHint('pnpm dlx ts-node playground/demo/realtime.ts');
};

const demonstrateErrorHandling = async (): Promise<void> => {
  printSection('6. Error handling');

  try {
    await client.line.getStatus({ lineIds: ['invalid-line-id'] });
  } catch (error) {
    if (error instanceof TflHttpError && error.statusCode === 404) {
      console.log('Handled 404 for invalid line ID');
    }
  }

  try {
    const timeoutClient = new TflClient({ timeout: 1, maxRetries: 0 });
    await timeoutClient.line.getStatus({ modes: ['tube'] });
  } catch (error) {
    if (error instanceof TflTimeoutError) {
      console.log('Handled timeout error');
    }
  }

  try {
    new TflClient({});
  } catch (error) {
    if (error instanceof TflConfigError) {
      console.log('Handled missing credentials error');
    }
  }

  try {
    throw new TflValidationError('Demo validation error', 'lineIds', ['bad-id']);
  } catch (error) {
    if (error instanceof TflError) {
      console.log(`Retryable: ${TflErrorHandler.isRetryableError(error)}`);
    }
  }

  try {
    throw new TflNetworkError('Demo network error', 'ECONNRESET');
  } catch (error) {
    if (error instanceof TflNetworkError) {
      console.log(`Network code: ${error.code}`);
    }
  }
};

const main = async (): Promise<void> => {
  console.log('TfL TypeScript client v2 tour');
  console.log('=============================');

  demonstrateConfigAndConstants();
  await demonstrateModeAndLine();
  await demonstrateStopPoint();
  await demonstrateJourney();
  await demonstrateRawAndRealtime();
  await demonstrateErrorHandling();

  printSection('Next steps');
  printCommandHint('pnpm run playground');
  printCommandHint('pnpm run demo:smoke');
  printCommandHint('pnpm dlx ts-node playground/demo/raw.ts');
};

main().catch((error) => {
  console.error('Demo failed:', error);
  process.exit(1);
});
