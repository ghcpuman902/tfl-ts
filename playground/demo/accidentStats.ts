// run by:
// pnpm dlx ts-node playground/demo/accidentStats.ts
//
// Legacy module — TfL is retiring AccidentStats on 31 July 2026.
// Data only ever covered 2005–2019. Failures here are expected.
// See: https://techforum.tfl.gov.uk/t/unified-api-tidy-up/6296

import dotenv from 'dotenv';
import TflClient from '../../src/index';
import { TflHttpError } from '../../src/errors';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

/** Last year TfL published via this endpoint (per TfL AccStats notice). */
const LAST_PUBLISHED_YEAR = 2019;

const formatHttpError = (error: unknown): string => {
  if (error instanceof TflHttpError) {
    return `${error.statusCode} ${error.statusText}${error.tflMessage ? ` — ${error.tflMessage}` : ''}`;
  }
  return error instanceof Error ? error.message : String(error);
};

const main = async (): Promise<void> => {
  printSection('AccidentStats (legacy / retiring)');

  console.log(`
This module wraps GET /AccidentStats/{year}.

TfL status (June 2026 tidy-up):
  • Endpoint retires 31 July 2026
  • Only ever had data for 2005–${LAST_PUBLISHED_YEAR}
  • Not a modern live feed — do not build products on it

Alternatives:
  • Historical dump: TfL AccStats archives (2005–${LAST_PUBLISHED_YEAR})
  • Current road safety: https://tfl.gov.uk/corporate/publications-and-reports/road-safety
  • London Datastore / DfT STATS19 datasets
`);

  printSubsection(`Best-effort probe: year ${LAST_PUBLISHED_YEAR}`);
  console.log('(May still return historical rows until retirement; either outcome is fine.)\n');

  try {
    const accidents = await client.accidentStats.get({ year: LAST_PUBLISHED_YEAR });
    console.log(`✅ Historical data still reachable: ${accidents.length} rows for ${LAST_PUBLISHED_YEAR}.`);
    if (accidents[0]) {
      console.log('   Sample:', {
        location: accidents[0].location,
        severity: accidents[0].severity,
        borough: accidents[0].borough,
        date: accidents[0].date,
      });
    }
    console.log('   Reminder: no years after 2019; endpoint goes away 31 July 2026.');
  } catch (error) {
    console.log(`✅ Expected for a retiring feed: ${formatHttpError(error)}`);
    console.log('   Wrapper is fine — TfL is winding this endpoint down.');
  }

  printSubsection('Module status');
  console.log('Kept in tfl-ts for raw/compatibility access only.');
  console.log('Prefer road / stopPoint / line for live transport features.');
};

main().catch((error) => {
  // Even unexpected errors should not look like a product bug in this demo.
  console.error('AccidentStats demo note:', formatHttpError(error));
  process.exit(0);
});
