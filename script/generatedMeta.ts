import fs from 'fs';
import path from 'path';

const GENERATED_META_PATH = path.join(__dirname, '..', 'src', 'generated', 'generated.meta.json');
const SPEC_META_PATH = path.join(__dirname, '..', 'src', 'generated', 'openapi', 'spec.meta.json');

export const GENERATED_META_RELATIVE_PATH = 'src/generated/generated.meta.json';

export interface ArtifactMeta {
  generatedAt: string;
  [key: string]: string | number | boolean | undefined;
}

export interface GeneratedMetaFile {
  spec: {
    path: string;
    sha256: string;
    fetchedAt: string;
    source: string;
    pathCount: number;
  };
  /** Updated whenever any artifact generator runs. */
  generatedAt: string;
  artifacts: {
    types?: ArtifactMeta & { tool: string; toolVersion: string };
    raw?: ArtifactMeta & { endpointCount: number };
    jsdoc?: ArtifactMeta & { endpointCount: number; sectionCount: number };
    tflMeta?: ArtifactMeta;
  };
}

const readSpecMeta = (): GeneratedMetaFile['spec'] => {
  try {
    const meta = JSON.parse(fs.readFileSync(SPEC_META_PATH, 'utf8')) as GeneratedMetaFile['spec'];
    return {
      path: 'openapi/tfl-v1.json',
      sha256: meta.sha256,
      fetchedAt: meta.fetchedAt,
      source: meta.source,
      pathCount: meta.pathCount,
    };
  } catch {
    return {
      path: 'openapi/tfl-v1.json',
      sha256: '',
      fetchedAt: '',
      source: 'https://api.tfl.gov.uk/swagger/docs/v1',
      pathCount: 0,
    };
  }
};

const readExisting = (): GeneratedMetaFile | null => {
  try {
    return JSON.parse(fs.readFileSync(GENERATED_META_PATH, 'utf8')) as GeneratedMetaFile;
  } catch {
    return null;
  }
};

export const recordGeneratedArtifact = (
  artifact: keyof GeneratedMetaFile['artifacts'],
  details: Record<string, string | number | boolean | undefined>,
): void => {
  const now = new Date().toISOString();
  const existing = readExisting();

  const next: GeneratedMetaFile = {
    spec: readSpecMeta(),
    generatedAt: now,
    artifacts: {
      ...(existing?.artifacts ?? {}),
      [artifact]: {
        generatedAt: now,
        ...details,
      },
    },
  };

  fs.mkdirSync(path.dirname(GENERATED_META_PATH), { recursive: true });
  fs.writeFileSync(GENERATED_META_PATH, `${JSON.stringify(next, null, 2)}\n`);
};

export const readSpecProvenance = (): string => {
  const spec = readSpecMeta();
  if (spec.sha256) {
    return `${spec.path} (sha256: ${spec.sha256})`;
  }
  return spec.path;
};
