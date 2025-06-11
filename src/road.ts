import { 
  Api, 
  TflApiPresentationEntitiesRoadCorridor,
  TflApiPresentationEntitiesRoadDisruption
} from './tfl';

interface RoadQuery {
  ids: string[];
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

class Road {
  private api: Api<{}>;

  constructor(api: Api<{}>) {
    this.api = api;
  }

  async getStatus(options: RoadQuery): Promise<TflApiPresentationEntitiesRoadCorridor[]> {
    return this.api.road.roadStatus({
      ids: options.ids,
      dateRangeNullableStartDate: options.dateRange?.startDate,
      dateRangeNullableEndDate: options.dateRange?.endDate
    }).then(response => response.data);
  }

  async getDisruptions(options: RoadQuery): Promise<TflApiPresentationEntitiesRoadDisruption[]> {
    return this.api.road.roadDisruption({
      ids: options.ids
    }).then(response => response.data);
  }
}

export { Road, RoadQuery }; 