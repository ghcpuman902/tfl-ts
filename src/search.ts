/**
 * Search API Module
 */
import {
  TflApiPresentationEntitiesSearchResponse,
  TflApiPresentationEntitiesSearchMatch,
} from './generated/types';
import { RawClient } from './generated/raw';
import { Categories, SearchProviders, Sorts } from './generated/meta/Meta';

export interface SearchQuery {
  query: string;
  keepTflTypes?: boolean;
}

export interface SearchBusSchedulesQuery {
  query: string;
  keepTflTypes?: boolean;
}

export type TflSearchResponse = TflApiPresentationEntitiesSearchResponse;
export type TflSearchMatch = TflApiPresentationEntitiesSearchMatch;

export class Search {
  static readonly API_NAME = 'Search API';
  static readonly TOTAL_ENDPOINTS = 5;

  public readonly SEARCH_PROVIDERS: readonly typeof SearchProviders[number][] = SearchProviders;
  public readonly SORT_OPTIONS: readonly typeof Sorts[number][] = Sorts;
  public readonly CATEGORIES: readonly typeof Categories[number][] = Categories;

  constructor(private raw: RawClient) {}

  async search(options: SearchQuery): Promise<TflSearchResponse> {
    const { keepTflTypes = false, query } = options;
    return this.raw.search.get({ query, keepTflTypes });
  }

  async searchBusSchedules(options: SearchBusSchedulesQuery): Promise<TflSearchResponse> {
    const { keepTflTypes = false, query } = options;
    return this.raw.search.busSchedules({ query, keepTflTypes });
  }

  async getMetaSearchProviders(options: { keepTflTypes?: boolean } = {}): Promise<string[]> {
    const { keepTflTypes = false } = options;
    return this.raw.search.metaSearchProviders({ keepTflTypes }) as Promise<string[]>;
  }

  async getMetaCategories(options: { keepTflTypes?: boolean } = {}): Promise<string[]> {
    const { keepTflTypes = false } = options;
    return this.raw.search.metaCategories({ keepTflTypes }) as Promise<string[]>;
  }

  async getMetaSorts(options: { keepTflTypes?: boolean } = {}): Promise<string[]> {
    const { keepTflTypes = false } = options;
    return this.raw.search.metaSorts({ keepTflTypes }) as Promise<string[]>;
  }
}
