// this code is run by user during build time, so it can use fs and path
// the end user import the generated code as a module, not this file

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

type SwaggerParameter = {
  name: string;
  description?: string;
  required?: boolean;
  type?: string;
  // in: 'query' | 'path' | ... <- omitted because not useful here
};

type SwaggerPathMethod = {
  tags?: string[];
  summary?: string;
  parameters?: SwaggerParameter[];
  produces?: string[];
  responses?: any;
  deprecated?: boolean;
};

type SwaggerDoc = {
  paths: { [path: string]: { [method: string]: SwaggerPathMethod } };
};

type EndpointData = {
  path: string;
  method: string;
  summary: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description?: string;
  }>;
  returnType?: string;
  deprecated?: boolean;
  tags?: string[];
};

type SectionData = {
  section: string;
  endpoints: EndpointData[];
};

const SWAGGER_URL = "https://api.tfl.gov.uk/swagger/docs/v1";
const OUTPUT_DIR = "src/generated/jsdoc";

function jsDocEscape(s: string | undefined) {
  if (!s) return "";
  return s.replace(/\r?\n|\r/g, " ").replace(/\*\//g, "*\\/");
}

function extractType(param: SwaggerParameter) {
  // Map swagger types to JS types where possible
  if (param.type === "integer") return "number";
  if (param.type === "boolean" || param.type === "number" || param.type === "string") return param.type;
  return "any";
}

function extractReturnType(details: SwaggerPathMethod): string | undefined {
  const resp200 = details.responses && details.responses["200"];
  if (resp200 && resp200.schema) {
    if (resp200.schema["$ref"]) {
      // $ref style
      return resp200.schema["$ref"].split(".").slice(-1)[0] // get last type segment
        .replace(/[^a-zA-Z0-9_]/g, "");
    } else if (resp200.schema["type"] === "array" && resp200.schema["items"] && resp200.schema["items"]["$ref"]) {
      return resp200.schema["items"]["$ref"].split(".").slice(-1)[0] + "[]";
    } else {
      return resp200.schema["type"] || undefined;
    }
  }
  return undefined;
}

function parseEndpointData(
  method: string,
  path: string,
  details: SwaggerPathMethod
): EndpointData {
  return {
    path,
    method: method.toUpperCase(),
    summary: details.summary || "(No summary)",
    parameters: (details.parameters || []).map((p) => ({
      name: p.name,
      type: extractType(p),
      required: !!p.required,
      description: p.description,
    })),
    returnType: extractReturnType(details),
    deprecated: details.deprecated,
    tags: details.tags,
  };
}

function getSectionFromPath(path: string): { section: string; isMeta: boolean } {
  // Remove leading slash and split by slashes
  const parts = path.replace(/^\//, '').split('/');
  
  // Check if it's a meta endpoint (contains "Meta" in the path)
  const isMeta = parts.some(part => part.toLowerCase() === 'meta');
  
  // Get the main section (first part of the path)
  const section = parts[0] || 'root';
  
  return { section, isMeta };
}

function ensureDirectoryExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function generateTypeScriptContent(data: any, variableName: string): string {
  return `// Auto-generated from TfL Swagger API
// Generated at: ${new Date().toISOString()}

export const ${variableName} = ${JSON.stringify(data, null, 2)} as const;

export type ${variableName}Type = typeof ${variableName};
`;
}

async function main() {
  const resp = await fetch(SWAGGER_URL);
  if (!resp.ok) {
    throw new Error(`Failed to fetch: ${resp.statusText}`);
  }
  const doc: SwaggerDoc = await resp.json();

  // Organize endpoints by section
  const sections: Map<string, EndpointData[]> = new Map();
  const metaEndpoints: EndpointData[] = [];

  for (const path in doc.paths) {
    const methods = doc.paths[path];
    for (const method in methods) {
      if (method !== "get") continue; // get endpoints only
      const details = methods[method];
      const endpointData = parseEndpointData(method, path, details);
      const { section, isMeta } = getSectionFromPath(path);

      if (isMeta) {
        metaEndpoints.push(endpointData);
      } else {
        if (!sections.has(section)) {
          sections.set(section, []);
        }
        sections.get(section)!.push(endpointData);
      }
    }
  }

  // Ensure output directory exists
  ensureDirectoryExists(OUTPUT_DIR);

  // Write meta endpoints to Meta.ts
  if (metaEndpoints.length > 0) {
    const metaData = {
      section: "Meta",
      endpoints: metaEndpoints,
      totalEndpoints: metaEndpoints.length,
      generatedAt: new Date().toISOString(),
    };
    
    const metaPath = join(OUTPUT_DIR, "Meta.ts");
    const metaContent = generateTypeScriptContent(metaData, "META_DATA");
    writeFileSync(metaPath, metaContent);
    console.log(`✓ Written ${metaEndpoints.length} meta endpoints to ${metaPath}`);
  }

  // Write each section to its own TypeScript file
  for (const [section, endpoints] of sections) {
    const sectionData = {
      section,
      endpoints,
      totalEndpoints: endpoints.length,
      generatedAt: new Date().toISOString(),
    };
    
    const sectionPath = join(OUTPUT_DIR, `${section}.ts`);
    const sectionContent = generateTypeScriptContent(sectionData, `${section.toUpperCase()}_DATA`);
    writeFileSync(sectionPath, sectionContent);
    console.log(`✓ Written ${endpoints.length} endpoints to ${sectionPath}`);
  }

  // Create an index file with summary
  const indexData = {
    sections: Array.from(sections.keys()),
    totalSections: sections.size,
    totalEndpoints: Array.from(sections.values()).reduce((sum, endpoints) => sum + endpoints.length, 0),
    metaEndpoints: metaEndpoints.length,
    generatedAt: new Date().toISOString(),
  };
  
  const indexPath = join(OUTPUT_DIR, "index.ts");
  const indexContent = generateTypeScriptContent(indexData, "INDEX_DATA");
  writeFileSync(indexPath, indexContent);
  console.log(`✓ Written index summary to ${indexPath}`);
  
  console.log(`\n🎉 Generated ${sections.size} section files and 1 meta file with ${indexData.totalEndpoints + indexData.metaEndpoints} total endpoints`);
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});