import fs from 'fs';
import path from 'path';

// Enhanced types for Swagger JSON structure
interface SwaggerParameter {
  name: string;
  in: string;
  description?: string;
  required?: boolean;
  type: string;
  enum?: string[];
}

interface SwaggerResponse {
  description: string;
  schema?: {
    $ref?: string;
    type?: string;
    items?: any;
    properties?: Record<string, any>;
  };
}

interface SwaggerEndpoint {
  get: {
    tags: string[];
    summary: string;
    description?: string;
    parameters?: SwaggerParameter[];
    responses: Record<string, SwaggerResponse>;
  };
}

interface SwaggerJson {
  paths: Record<string, SwaggerEndpoint>;
  definitions: Record<string, any>;
}

const SWAGGER_URL = 'https://api.tfl.gov.uk/swagger/docs/v1';

// Fetch Swagger JSON
async function fetchSwagger(): Promise<SwaggerJson> {
  try {
    const response = await fetch(SWAGGER_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch Swagger JSON: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Swagger JSON:', error);
    process.exit(1);
  }
}

// Enhanced data extraction
function extractRelevantData(swaggerJson: SwaggerJson): Record<string, any> {
  const { paths, definitions } = swaggerJson;
  const extractedData: Record<string, any> = {
    endpoints: {},
    definitions: {}
  };

  const endpointsToExtract = [
    '/Line/Meta/Modes',
    '/Line/Meta/Severity',
    '/Line/Meta/DisruptionCategories',
    '/Line/Meta/ServiceTypes',
    '/Line/{ids}',
    '/Line/Mode/{modes}'
  ];

  // Extract endpoint data
  for (const endpoint of endpointsToExtract) {
    if (paths[endpoint]) {
      extractedData.endpoints[endpoint] = paths[endpoint].get;
      
      // Extract referenced definitions
      const responses = paths[endpoint].get.responses;
      for (const response of Object.values(responses)) {
        if (response.schema?.$ref) {
          const defName = response.schema.$ref.split('/').pop();
          if (defName && definitions[defName]) {
            extractedData.definitions[defName] = definitions[defName];
          }
        }
      }
    }
  }

  return extractedData;
}

// Enhanced type generation
function generateTypeDefinitions(data: Record<string, any>): string {
  let typeDefinitions = `// Generated TypeScript definitions for Tfl API
// Generated on ${new Date().toISOString()}

export interface TflResponse {
  httpStatusCode?: number;
  httpStatus?: string;
  timestamp?: string;
}

`;

  // Generate types for transport modes
  typeDefinitions += `export type TransportMode = 
  | 'tube' 
  | 'bus'
  | 'river-bus'
  | 'overground'
  | 'dlr'
  | 'tram'
  | 'elizabeth-line';

`;

  // Generate Line Status types
  typeDefinitions += `export interface LineStatus extends TflResponse {
  id: string;
  name: string;
  modeName: TransportMode;
  disruptions: Disruption[];
  created: string;
  modified: string;
  lineStatuses: StatusDetail[];
}

export interface Disruption {
  category: string;
  categoryDescription: string;
  description: string;
  created: string;
  affectedRoutes: Route[];
}

export interface StatusDetail {
  statusSeverity: number;
  statusSeverityDescription: string;
  reason?: string;
  validityPeriods: ValidityPeriod[];
}

export interface ValidityPeriod {
  fromDate: string;
  toDate: string;
  isNow: boolean;
}

export interface Route {
  id: string;
  lineId: string;
  routeSectionNaptanEntrySequence: number[];
  name: string;
}

`;

  // Generate types from extracted definitions
  for (const [defName, definition] of Object.entries(data.definitions)) {
    typeDefinitions += generateInterfaceFromDefinition(defName, definition);
  }

  return typeDefinitions;
}

function generateInterfaceFromDefinition(name: string, definition: any): string {
  if (!definition.properties) return '';

  let interfaceStr = `export interface ${name} {\n`;
  
  for (const [propName, prop] of Object.entries(definition.properties)) {
    const isRequired = definition.required?.includes(propName);
    const typeStr = getTypeFromProperty(prop);
    interfaceStr += `  ${propName}${isRequired ? '' : '?'}: ${typeStr};\n`;
  }

  interfaceStr += '}\n\n';
  return interfaceStr;
}

function getTypeFromProperty(prop: any): string {
  if (prop.$ref) {
    return prop.$ref.split('/').pop() || 'any';
  }

  switch (prop.type) {
    case 'string':
      return prop.enum ? prop.enum.map((e: string) => `'${e}'`).join(' | ') : 'string';
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      const itemType = getTypeFromProperty(prop.items);
      return `${itemType}[]`;
    default:
      return 'any';
  }
}

// Save formatted JSON and type definitions
function saveOutput(data: Record<string, any>): void {
  // Save processed Swagger JSON
  const jsonOutputPath = path.join(process.cwd(), 'src/swagger_processed.json');
  fs.writeFileSync(jsonOutputPath, JSON.stringify(data, null, 2));
  console.log('✅ Processed Swagger JSON saved to:', jsonOutputPath);

  // Generate and save type definitions
  const typeDefinitions = generateTypeDefinitions(data);
  const typesOutputPath = path.join(process.cwd(), 'src/types.ts');
  fs.writeFileSync(typesOutputPath, typeDefinitions);
  console.log('✅ Type definitions generated at:', typesOutputPath);
}

// Main Execution
(async function main(): Promise<void> {
  const swaggerJson = await fetchSwagger();
  const extractedData = extractRelevantData(swaggerJson);
  saveOutput(extractedData);
})();