import { 
  Api, 
  TflApiPresentationEntitiesMode,
  TflApiPresentationEntitiesPrediction,
  TflApiPresentationEntitiesActiveServiceType
} from './generated/tfl';

interface ModeQuery {
  mode: string;
  count?: number;
}

class Mode {
  private api: Api<{}>;

  constructor(api: Api<{}>) {
    this.api = api;
  }

  async getAll(): Promise<TflApiPresentationEntitiesActiveServiceType[]> {
    return this.api.mode.modeGetActiveServiceTypes().then(response => response.data);
  }

  async getArrivals(options: ModeQuery): Promise<TflApiPresentationEntitiesPrediction[]> {
    return this.api.mode.modeArrivals({
      mode: options.mode,
      count: options.count
    }).then(response => response.data);
  }
}

export { Mode, ModeQuery }; 