/* eslint-disable import/no-cycle */

import { StoreSlice } from '../store';
import { fuzzySearch, SearchData } from '@/services/search.service';
import { BuyingData } from '@/staticData/PrepareMyTrip/Buying';
import { Routing } from '@/utils/const';
import { CountryType } from '@/utils/country.util';
import { SearchType } from '@/utils/search';

export interface PrepareMyTripOptions {
  countryType: CountryType;
  border: boolean;
}

export interface PrepareMyTripUseCaseSlice {
  getPrepareMyTripData: (options: PrepareMyTripOptions) => BuyingData[];
  searchPrepareMyTrip: (query: string) => SearchType<SearchData>[];
}

export const createUseCasePrepareMyTripSlice: StoreSlice<PrepareMyTripUseCaseSlice> = (
  _set,
  get,
) => ({
  getPrepareMyTripData: ({ border, countryType }: PrepareMyTripOptions) => {
    const { data } = get().prepareMyTrip.appState;
    return data.filter((item) => {
      if (item.border !== undefined && item.border !== border) {
        return false;
      }
      if (item.countryType !== undefined && item.countryType !== countryType) {
        return false;
      }
      return true;
    });
  },
  searchPrepareMyTrip: (query: string) => {
    const prepareMyTripData = get().prepareMyTrip.appState.data;
    const searchData = prepareMyTripData.map((item) => ({
      ...item,
      path: Routing.prepareMyTripConfig,
      pageTitle: 'Préparer mon voyage',
      pageDescription: 'Préparer mon voyage.',
    }));

    const normalizeQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return fuzzySearch(normalizeQuery, searchData, ['search']);
  },
});
