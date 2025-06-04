import { 
  Api,
  TflApiPresentationEntitiesLineStatus as TflLineStatus,
  TflApiPresentationEntitiesLine as TflLine,
  TflApiPresentationEntitiesDisruption as TflDisruption,
  TflApiPresentationEntitiesCrowding as TflCrowding,
  TflApiPresentationEntitiesMode as TflMode,
  TflApiPresentationEntitiesStatusSeverity as TflStatusSeverity,
  TflApiPresentationEntitiesRouteSearchResponse as TflRouteSearchResponse,
  ServiceTypesEnum as ServiceType,
  TflApiPresentationEntitiesDisruptionCategoryEnum as DisruptionCategory
} from './tfl';


/** Base interface for line queries */
interface BaseLineQuery {
  ids?: string[];
  modes?: string[];
}

/** Interface for line route queries */
interface LineRouteQuery extends BaseLineQuery {
  serviceTypes?: string[];
}

/** Interface for line status queries */
interface LineStatusQuery extends BaseLineQuery {
  severity?: number;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

/** Interface for line search queries */
interface LineSearchQuery {
  query: string;
  modes?: string[];
}

type DefaultValue<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? U extends object
      ? DefaultValue<U>[]
      : U[]
    : T[K] extends object
    ? DefaultValue<T[K]>
    : T[K] extends string
    ? string
    : T[K] extends number
    ? number
    : T[K];
};

const getDefaultValue = <T>(value: T): T => {
  if (Array.isArray(value)) return [] as unknown as T;
  switch (typeof value) {
    case 'string': return '' as unknown as T;
    case 'number': return 0 as unknown as T;
    case 'boolean': return false as unknown as T;
    case 'object': return {} as T;
    default: return value;
  }
};

const mapToType = <T extends object>(data: any, template: T): DefaultValue<T> => {
  if (!data) return {} as DefaultValue<T>;
  
  return Object.keys(template).reduce((acc: any, key) => {
    const templateValue = template[key as keyof T];
    const dataValue = data[key];

    if (Array.isArray(templateValue)) {
      acc[key] = (dataValue || []).map((item: any) =>
        typeof templateValue[0] === 'object'
          ? mapToType(item, templateValue[0])
          : item || getDefaultValue(templateValue[0])
      );
    } else if (typeof templateValue === 'object' && templateValue !== null) {
      acc[key] = mapToType(dataValue, templateValue as object);
    } else {
      acc[key] = dataValue || getDefaultValue(templateValue);
    }

    return acc;
  }, {} as DefaultValue<T>);
};

const mapLineStatus = (status: any): TflLine => {
  const template: TflLine = {
    id: '',
    name: '',
    modeName: '',
    disruptions: [],
    created: '',
    modified: '',
    lineStatuses: [{
      id: 0,
      lineId: '',
      statusSeverity: 0,
      statusSeverityDescription: '',
      reason: '',
      created: '',
      modified: '',
      validityPeriods: [{
        fromDate: '',
        toDate: '',
        isNow: false
      }],
      disruption: {
        category: 'Undefined',
        type: '',
        description: ''
      } as TflDisruption
    }] as TflLineStatus[],
    routeSections: [],
    serviceTypes: [],
    crowding: {
      crowdingDescription: '',
      crowdingLevel: 0
    } as TflCrowding
  };

  return mapToType(status, template);
};

class Line {
  private api: Api<{}>;

  /**
   * Creates an instance of Line service.
   * @param api - The TfL API instance
   */
  constructor(api: Api<{}>) {
    this.api = api;
  }

  /**
   * Get line information
   */
  async get(options: BaseLineQuery = {}): Promise<TflLine[]> {
    const { ids, modes } = options;

    if (ids?.length) {
      return this.api.line.lineGet(ids).then(response => response.data);
    }

    if (modes?.length) {
      return this.api.line.lineGetByMode(modes).then(response => response.data);
    }

    return this.api.line.lineGet([]).then(response => response.data);
  }

  /**
   * Get line route information
   */
  async getRoute(options: LineRouteQuery = {}): Promise<TflLine[]> {
    const { ids, modes } = options;

    if (ids?.length) {
      return this.api.line.lineLineRoutesByIds({ ids, serviceTypes: options.serviceTypes as ServiceType[] }).then(response => response.data);
    }

    if (modes?.length) {
      return this.api.line.lineRouteByMode({ modes, serviceTypes: options.serviceTypes as ServiceType[] }).then(response => response.data);
    }

    return this.api.line.lineRoute({ serviceTypes: options.serviceTypes as ServiceType[] }).then(response => response.data);
  }

  /**
   * Get line status information
   */
  async getStatus(options: LineStatusQuery = {}): Promise<TflLine[]> {
    const { ids, modes, severity, dateRange } = options;

    // Handle date range specific status
    if (dateRange && ids?.length) {
      return this.api.line.lineStatus(
        { ids, startDate: dateRange.startDate, endDate: dateRange.endDate }
      ).then(response => response.data);
    }

    // Handle severity specific status
    if (typeof severity === 'number') {
      return this.api.line.lineStatusBySeverity(severity).then(response => response.data);
    }

    // Handle mode specific status
    if (modes?.length) {
      return this.api.line.lineStatusByMode({ modes, ...options }).then(response => response.data);
    }

    // Handle id specific status
    if (ids?.length) {
      return this.api.line.lineStatusByIds({ ids, ...options }).then(response => response.data);
    }

    // Default: get all modes first, then get status for all modes
    const allModes = await this.api.line.lineMetaModes().then(response => response.data);
    const modeNames = allModes.map(mode => mode.modeName).filter((name): name is string => name !== undefined);
    return this.api.line.lineStatusByMode({ modes: modeNames, ...options }).then(response => response.data);
  }

  /**
   * Get line disruption information
   */
  async getDisruption(options: BaseLineQuery = {}): Promise<TflDisruption[]> {
    const { ids, modes } = options;

    if (ids?.length) {
      return this.api.line.lineDisruption(ids).then(response => response.data);
    }

    if (modes?.length) {
      return this.api.line.lineDisruptionByMode(modes).then(response => response.data);
    }

    return this.api.line.lineMetaDisruptionCategories().then(response => 
      response.data.map(category => ({
        category: category as DisruptionCategory,
        type: '',
        description: '',
      }))
    );
  }

  /**
   * Get line metadata
   */
  async getMeta(): Promise<{
    modes: TflMode[];
    severities: TflStatusSeverity[];
    disruptionCategories: string[];
    serviceTypes: string[];
  }> {
    const [modes, severities, disruptions, serviceTypes] = await Promise.all([
      this.api.line.lineMetaModes().then(response => response.data),
      this.api.line.lineMetaSeverity().then(response => response.data),
      this.api.line.lineMetaDisruptionCategories().then(response => response.data),
      this.api.line.lineMetaServiceTypes().then(response => response.data)
    ]);

    return {
      modes,
      severities,
      disruptionCategories: disruptions,
      serviceTypes
    };
  }

  /**
   * Search lines
   */
  async search(options: LineSearchQuery): Promise<TflRouteSearchResponse> {
    const { query, modes } = options;
    return this.api.line.lineSearch({ query, modes }).then(response => response.data);
  }
}

// Export the Line module
export { Line, BaseLineQuery, LineRouteQuery, LineStatusQuery, LineSearchQuery };