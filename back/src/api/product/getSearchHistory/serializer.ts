import { SearchProductHistoryEntityInterface } from '../../../entities/searchProductHistory.entity';

interface SearchProductHistoryItem {
  id: string;
  name?: string;
  searchValue?: string;
}
export interface SearchProductHistoryItemWithName extends SearchProductHistoryItem {
  id: string;
  name: string;
  searchValue?: string;
}

export interface SerializedGetSearchProductHistory {
  productsHistory: SearchProductHistoryItemWithName[];
}

export const serializer = (
  history: SearchProductHistoryEntityInterface[],
): SerializedGetSearchProductHistory => {
  const serializedProducts: SearchProductHistoryItem[] = history.map((search) => {
    return {
      id: search.productId,
      name: search.product?.name,
      searchValue: search.searchValue,
    };
  });

  return {
    productsHistory: serializedProducts.filter(
      (serializedProduct): serializedProduct is SearchProductHistoryItemWithName =>
        serializedProduct.name !== undefined,
    ),
  };
};
