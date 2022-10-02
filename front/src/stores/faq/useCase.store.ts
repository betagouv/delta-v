/* eslint-disable import/no-cycle */

import { StoreSlice } from '../store';
import { fuzzySearch, SearchData } from '@/services/search.service';
import { BlocElements, DataElement } from '@/staticData';
import { SearchType } from '@/utils/search';

export interface FaqUseCaseSlice {
  getFaqData: () => BlocElements[];
  searchFaq: (query: string) => SearchType<SearchData>[];
}

export const createUseCaseFaqSlice: StoreSlice<FaqUseCaseSlice> = (_set, get) => ({
  searchFaq: (query: string) => {
    const faqData = get().faq.appState.blocks.reduce((acc: DataElement[], block) => {
      acc.push(...block.elements);
      return acc;
    }, []);
    const searchData = faqData.map((item) => ({
      ...item,
      path: '/faqs',
      pageTitle: 'FAQ',
      pageDescription:
        'Pour connaître la règlementation concernant cette marchandise rendez dans la rubrique FAQ.',
    }));

    const normalizeQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    return fuzzySearch(normalizeQuery, searchData, ['search']);
  },
  getFaqData: () => get().faq.appState.blocks,
});
