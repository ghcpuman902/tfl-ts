// run by:
// pnpm dlx ts-node playground/demo/ui.ts

import dotenv from 'dotenv';
import TflClient, {
  ENDPOINT_COUNT,
  getAccessibleSeverityLabel,
  getLineAriaLabel,
  getLineColor,
  getLineCssProps,
  getLineDisplayName,
  getLineStatusSummary,
  getSeverityCategory,
  getSeverityClasses,
  isNormalService,
  sortLinesBySeverityAndOrder,
} from '../../src/index';
import { printSection, printSubsection } from '../lib/format';

dotenv.config();

const client = new TflClient();

const main = async (): Promise<void> => {
  printSection('UI helpers demo');

  printSubsection('Line colors');
  ['central', 'victoria', 'elizabeth'].forEach((lineId) => {
    const color = getLineColor(lineId);
    console.log(`${lineId}: ${color.hex} (${color.text})`);
  });

  printSubsection('Severity helpers');
  [6, 10, 20].forEach((severity) => {
    const classes = getSeverityClasses(severity);
    console.log(
      `${severity} -> ${getSeverityCategory(severity)} | ${classes.text} | ${getAccessibleSeverityLabel(severity, 'Status')}`,
    );
  });

  printSubsection('Line presentation helpers');
  const centralStatuses = [{ statusSeverity: 10, statusSeverityDescription: 'Good Service' }];
  console.log(getLineDisplayName('Central', 'tube'));
  console.log(getLineAriaLabel('Central', centralStatuses));
  console.log(getLineCssProps('victoria'));
  console.log(`Normal service: ${isNormalService(centralStatuses)}`);

  const sampleLines = [
    { id: 'central', name: 'Central', lineStatuses: [{ statusSeverity: 6, statusSeverityDescription: 'Severe Delays' }] },
    { id: 'victoria', name: 'Victoria', lineStatuses: [{ statusSeverity: 10, statusSeverityDescription: 'Good Service' }] },
  ];
  const sorted = sortLinesBySeverityAndOrder(sampleLines as never);
  console.log('Sorted lines:', sorted.map((line) => line.id).join(', '));
  console.log('Status summary:', getLineStatusSummary(sampleLines[0].lineStatuses));

  printSubsection('Registry');
  console.log(`ENDPOINT_COUNT: ${ENDPOINT_COUNT}`);
  console.log(`LINE_NAMES entries: ${Object.keys(client.line.LINE_NAMES).length}`);
};

main().catch((error) => {
  console.error('UI demo failed:', error);
  process.exit(1);
});
