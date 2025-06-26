import fs from 'fs';
import path from 'path';
import { META_DATA } from '../src/generated/jsdoc/Meta';
import { stripTypeFields } from '../src/utils/stripTypes';
import { config } from 'dotenv';

// Load environment variables
config();

// Function to fetch data from TfL API with error handling and retry logic
async function fetchTflData(url: string, retries = 3, delay = 2000): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${retries}...`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API call failed (attempt ${attempt}/${retries}):`, error);
      if (attempt === retries) {
        throw error;
      }
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 1.5; // Exponential backoff
    }
  }
  throw new Error('All retry attempts failed');
}

// Function to add delay between requests
async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to get the category name from endpoint path
function getCategoryFromPath(endpointPath: string): string {
  const pathParts = endpointPath.split('/').filter(Boolean);
  return pathParts[1]; // e.g., "Journey", "Line", "Place", etc.
}

// Function to get the endpoint name from path
function getEndpointNameFromPath(endpointPath: string): string {
  const pathParts = endpointPath.split('/').filter(Boolean);
  return pathParts[pathParts.length - 1]; // e.g., "Modes", "Severity", etc.
}

// Function to clean up the data by removing unnecessary fields
function cleanData(data: any): any {
  // Remove $type fields and clean up empty objects
  const cleaned = stripTypeFields(data, false);
  
  // For arrays, remove objects that are just empty or have only timestamps
  if (Array.isArray(cleaned)) {
    return cleaned.filter(item => {
      if (typeof item === 'object' && item !== null) {
        // Remove objects that are just empty or only have created/modified timestamps
        const keys = Object.keys(item);
        if (keys.length === 0) return false;
        if (keys.length <= 2 && keys.every(key => ['created', 'modified'].includes(key))) return false;
        if (keys.length === 1 && item[keys[0]] === 'Unknown') return false;
      }
      return true;
    });
  }
  
  return cleaned;
}

// Generate TypeScript definitions based on actual TfL API data
async function generateTypeScriptDefinitions() {
  const outputDir = path.join(__dirname, '..', 'src', 'generated');
  fs.mkdirSync(outputDir, { recursive: true });

  // Get API credentials
  const appId = process.env.TFL_APP_ID;
  const appKey = process.env.TFL_APP_KEY;

  if (!appId || !appKey) {
    throw new Error(
      "Missing TFL API credentials. Please create a .env file with:\n" +
      "TFL_APP_ID=your-app-id\n" +
      "TFL_APP_KEY=your-app-key\n" +
      "You can get these credentials by registering at https://api-portal.tfl.gov.uk/"
    );
  }

  try {
    console.log('Fetching data from TfL API using META_DATA endpoints...');
    
    // Group endpoints by category
    const endpointsByCategory: Record<string, any[]> = {};
    
    META_DATA.endpoints.forEach(endpoint => {
      const category = getCategoryFromPath(endpoint.path);
      if (!endpointsByCategory[category]) {
        endpointsByCategory[category] = [];
      }
      endpointsByCategory[category].push(endpoint);
    });

    // Fetch data for each category
    const treeStructure: Record<string, any> = {};
    
    for (const [category, endpoints] of Object.entries(endpointsByCategory)) {
      console.log(`\nProcessing category: ${category}`);
      treeStructure[category] = {};
      
      for (const endpoint of endpoints) {
        const endpointName = getEndpointNameFromPath(endpoint.path);
        console.log(`  Fetching ${endpointName} from ${endpoint.path}...`);
        
        try {
          // Build the full URL with credentials
          const baseUrl = 'https://api.tfl.gov.uk';
          const url = `${baseUrl}${endpoint.path}?app_id=${appId}&app_key=${appKey}`;
          
          const rawData = await fetchTflData(url);
          
          // Clean the data and remove the top-level wrapper
          const cleanedData = cleanData(rawData);
          
          // Save the cleaned data directly (no top-level data wrapper)
          treeStructure[category][endpointName] = {
            data: cleanedData,
            endpoint: endpoint.path,
            fetchedAt: new Date().toISOString()
          };
          
          // Add delay between requests to avoid rate limiting
          await delay(1000);
          
        } catch (error) {
          console.error(`Failed to fetch ${endpointName}:`, error);
          // Continue with other endpoints even if one fails
          treeStructure[category][endpointName] = { 
            data: [], 
            error: error instanceof Error ? error.message : 'Unknown error',
            endpoint: endpoint.path,
            fetchedAt: new Date().toISOString()
          };
        }
      }
    }

    // Add special case for Lines data (not in META_DATA but needed)
    console.log('\nFetching additional Lines data...');
    try {
      // Get all available modes first
      const modesUrl = `https://api.tfl.gov.uk/Line/Meta/Modes?app_id=${appId}&app_key=${appKey}`;
      const modesData = await fetchTflData(modesUrl);
      const modeNames = modesData.map((mode: any) => mode.modeName).join(',');
      
      // Fetch lines for ALL modes, not just hardcoded ones
      const linesUrl = `https://api.tfl.gov.uk/Line/Mode/${modeNames}?app_id=${appId}&app_key=${appKey}`;
      const rawLines = await fetchTflData(linesUrl);
      const cleanedLines = cleanData(rawLines);
      
      if (!treeStructure.Line) {
        treeStructure.Line = {};
      }
      treeStructure.Line.Lines = {
        data: cleanedLines,
        endpoint: `/Line/Mode/${modeNames}`,
        fetchedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to fetch Lines data:', error);
      if (!treeStructure.Line) {
        treeStructure.Line = {};
      }
      treeStructure.Line.Lines = { 
        data: [], 
        error: error instanceof Error ? error.message : 'Unknown error',
        endpoint: '/Line/Mode/all-modes',
        fetchedAt: new Date().toISOString()
      };
    }

    console.log('Successfully fetched all data from TfL API');

    // Write the tree structure to a JSON file
    const treeJsonPath = path.join(outputDir, 'meta-tree.json');
    fs.writeFileSync(treeJsonPath, JSON.stringify(treeStructure, null, 2));
    console.log(`Tree structure written to ${treeJsonPath}`);

    // Generate TypeScript files from the tree structure
    generateTypeScriptFiles(treeStructure, outputDir);

    console.log('TypeScript definitions generated successfully from live TfL API data.');

  } catch (error) {
    console.error('Failed to generate TypeScript definitions:', error);
    process.exit(1);
  }
}

// Generate TypeScript files from the tree structure
function generateTypeScriptFiles(treeStructure: any, outputDir: string) {
  // Create meta subdirectory
  const metaDir = path.join(outputDir, 'meta');
  fs.mkdirSync(metaDir, { recursive: true });

  // Group endpoints by category
  for (const [category, endpoints] of Object.entries(treeStructure)) {
    const fileName = `${category}.ts`;
    const filePath = path.join(metaDir, fileName);
    
    let content = `// Generated from TfL API ${category} data\n// Generated at: ${new Date().toISOString()}\n\n`;
    
    console.log(`Generating ${fileName}...`);
    
    // Add data for all endpoints in this category
    for (const [endpointName, endpointData] of Object.entries(endpoints as any)) {
      console.log(`  Processing ${endpointName}...`);
      
      // Export the cleaned data directly (no top-level wrapper)
      content += `export const ${endpointName} = ${JSON.stringify((endpointData as any).data, null, 2)} as const;\n\n`;
    }
    
    fs.writeFileSync(filePath, content.trim());
  }

  // Generate index file
  const indexContent = `
// Auto-generated index file for all TfL API types
// Generated at: ${new Date().toISOString()}
export * as Journey from './meta/Journey';
export * as Line from './meta/Line';
export * as Place from './meta/Place';
export * as Road from './meta/Road';
export * as Search from './meta/Search';
export * as StopPoint from './meta/StopPoint';
`.trim();

  fs.writeFileSync(path.join(outputDir, 'meta.ts'), indexContent);
}

generateTypeScriptDefinitions();