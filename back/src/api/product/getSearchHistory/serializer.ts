/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SearchProductHistoryEntityInterface } from '../../../entities/searchProductHistory.entity';

export type SearchProductHistoryItem = {
  id?: string;
  name?: string;
  searchValue?: string;
};

export interface SerializedGetSearchProductHistory {
  productsHistory: SearchProductHistoryItem[];
}

export const serializer = (
  history: SearchProductHistoryEntityInterface[],
): SerializedGetSearchProductHistory => {
  return {
    productsHistory: history.map((search) => {
      if (!search.product) {
        return {};
      }
      return {
        id: search.productId,
        name: search.product.name,
        searchValue: search.searchValue,
      };
    }),
  };
};
