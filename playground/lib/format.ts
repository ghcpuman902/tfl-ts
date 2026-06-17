export const printSection = (title: string): void => {
  console.log(`\n${title}`);
  console.log('='.repeat(Math.min(title.length, 60)));
};

export const printSubsection = (title: string): void => {
  console.log(`\n→ ${title}`);
};

export const printCommandHint = (command: string): void => {
  console.log(`\nRun: ${command}`);
};
