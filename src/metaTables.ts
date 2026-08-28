import { Modes, ServiceTypes, DisruptionCategories, Severity } from './generated/meta/Meta';
import { Lines } from './generated/meta/Line';

export type ModeName = (typeof Modes)[number]['modeName'];
export type ServiceType = (typeof ServiceTypes)[number];
export type DisruptionCategory = (typeof DisruptionCategories)[number];
export type TflLineId = (typeof Lines)[number]['id'];

const modeMetadata: Record<
  string,
  {
    isTflService: boolean;
    isFarePaying: boolean;
    isScheduledService: boolean;
  }
> = Modes.reduce(
  (acc, mode) => {
    acc[mode.modeName] = {
      isTflService: mode.isTflService,
      isFarePaying: mode.isFarePaying,
      isScheduledService: mode.isScheduledService,
    };
    return acc;
  },
  {} as Record<
    string,
    {
      isTflService: boolean;
      isFarePaying: boolean;
      isScheduledService: boolean;
    }
  >,
);

const buildLineIds = () => {
  const lineIds: Record<string, Record<string, string>> = {
    tube: {},
    dlr: {},
    overground: {},
    tram: {},
    bus: {},
  };

  Lines.forEach((line) => {
    const modeName = line.modeName;
    if (modeName in lineIds) {
      lineIds[modeName][line.name.toUpperCase()] = line.id;
    }
  });

  return lineIds;
};

const buildSeverityByMode = (): Record<string, Array<{ level: number; description: string }>> => {
  const severityMap: Record<string, Array<{ level: number; description: string }>> = {};

  Severity.forEach((severity) => {
    if (!severityMap[severity.modeName]) {
      severityMap[severity.modeName] = [];
    }
    severityMap[severity.modeName].push({
      level: severity.severityLevel,
      description: severity.description,
    });
  });

  return severityMap;
};

const buildSeverityDescriptions = (): readonly string[] => {
  const descriptions = new Set<string>();
  Severity.forEach((severity) => {
    descriptions.add(severity.description);
  });
  return Array.from(descriptions).sort();
};

export const LINE_IDS = buildLineIds();
export const MODES = modeMetadata;
export const SERVICE_TYPES = {
  REGULAR: 'Regular' as ServiceType,
  NIGHT: 'Night' as ServiceType,
} as const;
export const DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
  ALL: 'all',
} as const;
export const severityByMode = buildSeverityByMode();
export const severityDescriptions = buildSeverityDescriptions();

export type TflMode = keyof typeof MODES;
export type TflServiceType = (typeof SERVICE_TYPES)[keyof typeof SERVICE_TYPES];
export type TflDirection = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];
