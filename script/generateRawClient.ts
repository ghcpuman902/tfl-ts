import fs from 'fs';
import path from 'path';
import { readSpecProvenance, recordGeneratedArtifact } from './generatedMeta';

type SwaggerParameter = {
  name: string;
  in: 'path' | 'query' | 'header' | 'body';
  required?: boolean;
  type?: string;
  description?: string;
};

type SwaggerOperation = {
  tags?: string[];
  summary?: string;
  operationId?: string;
  deprecated?: boolean;
  parameters?: SwaggerParameter[];
  responses?: Record<string, { schema?: { $ref?: string; type?: string; items?: { $ref?: string } } }>;
};

type SwaggerDoc = {
  paths: Record<string, Record<string, SwaggerOperation>>;
};

type EndpointDef = {
  operationId: string;
  methodName: string;
  tag: string;
  tagKey: string;
  httpMethod: string;
  pathTemplate: string;
  pathParamMap: Record<string, string>;
  pathParams: string[];
  queryParams: string[];
  requiredParams: string[];
  returnType: string;
  deprecated: boolean;
  summary: string;
};

const SPEC_PATH = path.join(__dirname, '..', 'src', 'generated', 'openapi', 'tfl-v1.json');

const GENERATION_META_HINT = '// Generation timestamps: see ./generated.meta.json';
const ENDPOINTS_PATH = path.join(__dirname, '..', 'src', 'generated', 'endpoints.ts');
const RAW_PATH = path.join(__dirname, '..', 'src', 'generated', 'raw.ts');

const toCamelCase = (value: string): string =>
  value.replace(/[-_](.)/g, (_, char: string) => char.toUpperCase()).replace(/^./, (c) => c.toLowerCase());

const toPascalCase = (value: string): string => {
  const camel = toCamelCase(value);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

const refToTypeName = (ref: string): string => ref.split('/').pop()?.replace(/\./g, '') ?? 'unknown';

const resolveReturnType = (operation: SwaggerOperation): string => {
  const schema = operation.responses?.['200']?.schema;
  if (!schema) {
    return 'unknown';
  }

  if (schema.$ref) {
    return refToTypeName(schema.$ref);
  }

  if (schema.type === 'array') {
    if (schema.items?.$ref) {
      return `${refToTypeName(schema.items.$ref)}[]`;
    }
    return 'unknown[]';
  }

  if (schema.type === 'string' || schema.type === 'number' || schema.type === 'boolean') {
    return schema.type;
  }

  if (schema.type === 'object') {
    return 'Record<string, unknown>';
  }

  return schema.type ?? 'unknown';
};

const deriveMethodName = (tag: string, operationId: string): string => {
  const tagPrefix = `${tag}_`;
  const stripped = operationId.startsWith(tagPrefix)
    ? operationId.slice(tagPrefix.length)
    : operationId.replace(new RegExp(`^${tag}`, 'i'), '');

  return toCamelCase(stripped || operationId);
};

const resolveParamName = (placeholder: string, parameters: SwaggerParameter[]): string => {
  const exact = parameters.find((param) => param.name === placeholder);
  if (exact) {
    return exact.name;
  }

  const caseInsensitive = parameters.find(
    (param) => param.name.toLowerCase() === placeholder.toLowerCase(),
  );
  if (caseInsensitive) {
    return caseInsensitive.name;
  }

  const camelCase = placeholder.charAt(0).toLowerCase() + placeholder.slice(1);
  const camelMatch = parameters.find((param) => param.name === camelCase);
  if (camelMatch) {
    return camelMatch.name;
  }

  return placeholder;
};

const buildPathTemplate = (pathValue: string, pathParamMap: Record<string, string>): string =>
  pathValue.replace(/\{([^}]+)\}/g, (_, placeholder: string) => {
    const paramName = pathParamMap[placeholder] ?? placeholder;
    const accessor = paramName.includes('.') ? `args[${JSON.stringify(paramName)}]` : `args.${paramName}`;
    return `\${formatPathParam(${accessor})}`;
  });

const buildEndpoints = (doc: SwaggerDoc): EndpointDef[] => {
  const endpoints: EndpointDef[] = [];
  const usedNames = new Map<string, Set<string>>();

  for (const [pathValue, methods] of Object.entries(doc.paths)) {
    for (const [httpMethod, operation] of Object.entries(methods)) {
      if (httpMethod.toLowerCase() !== 'get') {
        continue;
      }

      const tag = operation.tags?.[0] ?? pathValue.split('/').filter(Boolean)[0] ?? 'root';
      const tagKey = toCamelCase(tag);
      let methodName = deriveMethodName(tag, operation.operationId ?? `${tag}_${httpMethod}`);

      if (!usedNames.has(tagKey)) {
        usedNames.set(tagKey, new Set());
      }

      const tagMethods = usedNames.get(tagKey)!;
      if (tagMethods.has(methodName)) {
        methodName = toCamelCase(operation.operationId ?? methodName);
      }
      tagMethods.add(methodName);

      const parameters = operation.parameters ?? [];
      const pathParams = parameters.filter((p) => p.in === 'path').map((p) => p.name);
      const queryParams = parameters.filter((p) => p.in === 'query').map((p) => p.name);
      const requiredParams = parameters.filter((p) => p.required).map((p) => p.name);
      const placeholders = [...pathValue.matchAll(/\{([^}]+)\}/g)].map((match) => match[1]);
      const pathParamMap = placeholders.reduce<Record<string, string>>((acc, placeholder) => {
        acc[placeholder] = resolveParamName(placeholder, parameters);
        return acc;
      }, {});

      endpoints.push({
        operationId: operation.operationId ?? methodName,
        methodName,
        tag,
        tagKey,
        httpMethod: httpMethod.toUpperCase(),
        pathTemplate: buildPathTemplate(pathValue, pathParamMap),
        pathParamMap,
        pathParams,
        queryParams,
        requiredParams,
        returnType: resolveReturnType(operation),
        deprecated: Boolean(operation.deprecated),
        summary: operation.summary ?? '',
      });
    }
  }

  return endpoints.sort((a, b) => a.tagKey.localeCompare(b.tagKey) || a.methodName.localeCompare(b.methodName));
};

const paramAccessor = (param: string): string =>
  param.includes('.') ? `args[${JSON.stringify(param)}]` : `args.${param}`;

const buildArgsInterface = (endpoint: EndpointDef): string => {
  const lines: string[] = [];
  const uniqueParams = [...new Set([...Object.values(endpoint.pathParamMap), ...endpoint.queryParams])];

  for (const param of uniqueParams) {
    const required = endpoint.requiredParams.includes(param);
    const key = param.includes('.') ? JSON.stringify(param) : param;
    lines.push(`    ${key}${required ? '' : '?'}: string | number | boolean | string[];`);
  }

  lines.push('    keepTflTypes?: boolean;');
  lines.push('    signal?: AbortSignal;');

  return `export interface ${toPascalCase(endpoint.tagKey)}${toPascalCase(endpoint.methodName)}Args {\n${lines.join('\n')}\n}`;
};

const buildMethodBody = (endpoint: EndpointDef): string => {
  const queryEntries = endpoint.queryParams.map((param) => {
    const accessor = paramAccessor(param);
    return `    if (${accessor} !== undefined) query[${JSON.stringify(param)}] = ${accessor};`;
  });

  const pathExpr = `\`${endpoint.pathTemplate}\``;

  return `    const query: Record<string, string | number | boolean | string[] | undefined> = {};
${queryEntries.join('\n')}
    return this.http.request<${endpoint.returnType}>({
      method: '${endpoint.httpMethod}',
      path: ${pathExpr},
      query,
      keepTflTypes: args.keepTflTypes,
      signal: args.signal,
    });`;
};

const generate = (): void => {
  const doc = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8')) as SwaggerDoc;
  const endpoints = buildEndpoints(doc);
  const provenance = readSpecProvenance();

  const argsInterfaces = endpoints.map(buildArgsInterface).join('\n\n');

  const endpointsFile = `// Auto-generated endpoint registry. Do not edit manually.
// Source: ${provenance}
${GENERATION_META_HINT}

export interface EndpointDefinition {
  operationId: string;
  methodName: string;
  tag: string;
  tagKey: string;
  httpMethod: string;
  pathTemplate: string;
  pathParamMap: Record<string, string>;
  pathParams: readonly string[];
  queryParams: readonly string[];
  requiredParams: readonly string[];
  returnType: string;
  deprecated: boolean;
  summary: string;
}

export const ENDPOINTS: readonly EndpointDefinition[] = ${JSON.stringify(endpoints, null, 2)} as const;

export const ENDPOINT_COUNT = ${endpoints.length} as const;
`;

  const byTag = endpoints.reduce<Record<string, EndpointDef[]>>((acc, endpoint) => {
    if (!acc[endpoint.tagKey]) {
      acc[endpoint.tagKey] = [];
    }
    acc[endpoint.tagKey].push(endpoint);
    return acc;
  }, {});

  const namespaceBlocks = Object.entries(byTag)
    .map(([tagKey, tagEndpoints]) => {
      const methods = tagEndpoints
        .map((endpoint) => {
          const argsType = `${toPascalCase(tagKey)}${toPascalCase(endpoint.methodName)}Args`;
          const argsDefault = endpoint.requiredParams.length === 0 ? ' = {}' : '';
          return `    /**
     * ${endpoint.summary.replace(/\*/g, '')}
     * @operationId ${endpoint.operationId}
     * @deprecated ${endpoint.deprecated}
     */
    ${endpoint.methodName}: async (args: ${argsType}${argsDefault}): Promise<${endpoint.returnType}> => {
${buildMethodBody(endpoint)}
    },`;
        })
        .join('\n\n');

      return `  readonly ${tagKey} = {
${methods}
  };`;
    })
    .join('\n\n');

  const typeNames = new Set<string>();
  for (const endpoint of endpoints) {
    const { returnType } = endpoint;
    if (
      returnType === 'unknown' ||
      returnType === 'unknown[]' ||
      returnType === 'Record<string, unknown>' ||
      returnType === 'string' ||
      returnType === 'number' ||
      returnType === 'boolean'
    ) {
      continue;
    }
    if (returnType.endsWith('[]')) {
      typeNames.add(returnType.slice(0, -2));
    } else {
      typeNames.add(returnType);
    }
  }

  const typeImportBlock = typeNames.size
    ? `import type {\n  ${[...typeNames].sort().join(',\n  ')},\n} from './types';\n\n`
    : '';

  const rawFile = `// Auto-generated raw TfL API client. Do not edit manually.
// Source: ${provenance}
${GENERATION_META_HINT}

import { TflHttpClient } from '../core/http';
${typeImportBlock}
${argsInterfaces}

const formatPathParam = (value: string | number | boolean | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  if (value === undefined || value === null) {
    return '';
  }
  return String(value);
};

export class RawClient {
  constructor(private readonly http: TflHttpClient) {}

${namespaceBlocks}
}
`;

  fs.writeFileSync(ENDPOINTS_PATH, endpointsFile);
  fs.writeFileSync(RAW_PATH, rawFile);
  recordGeneratedArtifact('raw', { endpointCount: endpoints.length });
  console.log(`Generated ${endpoints.length} endpoints -> ${ENDPOINTS_PATH}`);
  console.log(`Generated RawClient -> ${RAW_PATH}`);
};

generate();
