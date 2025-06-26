import { 
  Api, 
  TflApiPresentationEntitiesJourneyPlannerItineraryResult,
  TflApiPresentationEntitiesMode,
  JourneyJourneyResultsParams
} from './generated/tfl';

interface JourneyQuery extends Partial<JourneyJourneyResultsParams> {
  from: string;
  to: string;
}

class Journey {
  private api: Api<{}>;

  constructor(api: Api<{}>) {
    this.api = api;
  }

  async plan(options: JourneyQuery): Promise<TflApiPresentationEntitiesJourneyPlannerItineraryResult> {
    return this.api.journey.journeyJourneyResults(options).then(response => response.data);
  }

  async getModes(): Promise<TflApiPresentationEntitiesMode[]> {
    return this.api.journey.journeyMeta().then(response => response.data);
  }
}

export { Journey, JourneyQuery }; 