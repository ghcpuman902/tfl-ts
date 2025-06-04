import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config();

// Define the API endpoint
const API_BASE_URL = 'https://api.tfl.gov.uk';

interface ModeItem {
    $type: string;
    isTflService: boolean;
    isFarePaying: boolean;
    isScheduledService: boolean;
    modeName: string;
}

// Fetch transport modes from the TfL API
async function fetchModes(): Promise<ModeItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/Line/Meta/Modes`);
        if (!response.ok) throw new Error(`Error fetching modes: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch modes:', error);
        throw error;
    }
}

// Fetch service types from the TfL API
async function fetchServiceTypes(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/Line/Meta/ServiceTypes`);
        if (!response.ok) throw new Error(`Error fetching service types: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch service types:', error);
        throw error;
    }
}

// Fetch disruption categories from the TfL API
async function fetchDisruptionCategories(): Promise<string[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/Line/Meta/DisruptionCategories`);
        if (!response.ok) throw new Error(`Error fetching disruption categories: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch disruption categories:', error);
        throw error;
    }
}

interface SeverityItem {
    modeName: string;
    severityLevel: number;
    description: string;
}

// Fetch severity codes from the TfL API
async function fetchSeverityCodes(): Promise<SeverityItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/Line/Meta/Severity`);
        if (!response.ok) throw new Error(`Error fetching severity codes: ${response.statusText}`);
        return await response.json() as SeverityItem[];
    } catch (error) {
        console.error('Failed to fetch severity codes:', error);
        throw error;
    }
}

// Helper function to create a severity type for a specific mode
function createSeverityTypeForMode(items: SeverityItem[], modeName: string): string {
    const modeItems = items.filter(item => item.modeName === modeName);
    const severityEntries = modeItems.map(item => 
        `  | { level: ${item.severityLevel}; description: '${item.description}' }`
    ).join('\n');
    return `export type ${modeName.replace(/-/g, '')}Severity =\n${severityEntries};`;
}

// Helper function to create a union type string
function toUnionType(values: string[]): string {
    return values.map(value => `'${value}'`).join(' | ');
}

// Helper function to create mode-related types
function createModeTypes(modes: ModeItem[]): string {
    const allModes = modes.map(mode => `'${mode.modeName}'`).join(' | ');
    const tflServiceModes = modes.filter(mode => mode.isTflService).map(mode => `'${mode.modeName}'`).join(' | ');
    const farePayingModes = modes.filter(mode => mode.isFarePaying).map(mode => `'${mode.modeName}'`).join(' | ');
    const scheduledServiceModes = modes.filter(mode => mode.isScheduledService).map(mode => `'${mode.modeName}'`).join(' | ');

    return `// Generated from TfL API Mode data
export type ModeName = ${allModes};

export type TflServiceMode = ${tflServiceModes};

export type FarePayingMode = ${farePayingModes};

export type ScheduledServiceMode = ${scheduledServiceModes};

export interface ModeInfo {
    isTflService: boolean;
    isFarePaying: boolean;
    isScheduledService: boolean;
}

export type ModeMetadata = {
    [key in ModeName]: ModeInfo;
};

export const modeMetadata = {
    ${modes.map(mode => `'${mode.modeName}': {
        isTflService: ${mode.isTflService},
        isFarePaying: ${mode.isFarePaying},
        isScheduledService: ${mode.isScheduledService}
    }`).join(',\n    ')}
};`;
}

// Generate TypeScript types based on data
async function generateTypeScriptDefinitions() {
    const outputDir = path.join(__dirname, 'types');
    fs.mkdirSync(outputDir, { recursive: true });

    try {
        const modes = await fetchModes();
        const serviceTypes = await fetchServiceTypes();
        const disruptionCategories = await fetchDisruptionCategories();
        const severityItems = await fetchSeverityCodes();

        // Create mode-related types
        const modesTypeContent = createModeTypes(modes);
        fs.writeFileSync(path.join(outputDir, 'Mode.ts'), modesTypeContent.trim());

        // Create a union type for Service Types
        const serviceTypesContent = `export type ServiceType = ${toUnionType(serviceTypes.map(type => type))};
`;
        fs.writeFileSync(path.join(outputDir, 'ServiceType.ts'), serviceTypesContent.trim());

        // Create a union type for Disruption Categories
        const disruptionCategoriesContent = `export type DisruptionCategory = ${toUnionType(disruptionCategories)};
`;
        fs.writeFileSync(path.join(outputDir, 'DisruptionCategory.ts'), disruptionCategoriesContent.trim());

        // Create severity types for each unique mode in severityItems
        const uniqueModes = [...new Set(severityItems.map(item => item.modeName))];
        const severityContent = uniqueModes.map(modeName => createSeverityTypeForMode(severityItems, modeName)).join('\n\n');
        const severityDescriptionsContent = `// Generated from TfL API Severity data
${severityContent}

export type SeverityByMode = {
    ${uniqueModes.map(modeName => `'${modeName}': ${modeName.replace(/-/g, '')}Severity`).join(';\n    ')};
};

// Legacy type for backward compatibility
export type SeverityDescription = ${toUnionType([...new Set(severityItems.map(item => item.description))])};
`;
        fs.writeFileSync(path.join(outputDir, 'SeverityDescription.ts'), severityDescriptionsContent.trim());

        // Generate the index file
        const indexContent = `
export { 
    ModeName,
    TflServiceMode,
    FarePayingMode,
    ScheduledServiceMode,
    ModeInfo,
    ModeMetadata,
    modeMetadata
} from './Mode';
export { ServiceType } from './ServiceType';
export { DisruptionCategory } from './DisruptionCategory';
export { SeverityDescription, SeverityByMode } from './SeverityDescription';
`.trim();

        fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
        console.log('TypeScript definitions generated successfully.');

    } catch (error) {
        console.error('Failed to generate TypeScript definitions:', error);
    }
}

generateTypeScriptDefinitions();