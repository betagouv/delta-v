import Fuse from 'fuse.js';

import { AGENT_PRODUCT_SEARCH_RESULTS_LIMIT } from '@/config/productSearch';
import { Product } from '@/model/product';

interface AdvancedSearchOptions<T> {
  searchValue: string;
  searchList: T[];
  searchKey: string[];
  minRankAllowed?: number;
  limit?: number;
}

export type SearchType<T> = T & {
  rank: number;
  rankedValue: string;
  rankedPosition?: [number, number];
};

export const advancedSearch = <T>({
  searchValue,
  searchList,
  searchKey,
  limit = AGENT_PRODUCT_SEARCH_RESULTS_LIMIT,
  minRankAllowed = 0.2,
}: AdvancedSearchOptions<T>): SearchType<T>[] => {
  if (searchValue.length === 0) {
    return [];
  }

  const fuse = new Fuse(searchList, {
    includeScore: true,
    includeMatches: true,
    findAllMatches: false,
    minMatchCharLength: 2,
    threshold: minRankAllowed,
    shouldSort: true,
    keys: searchKey,
  });
  const result = fuse.search(searchValue);

  return result
    .map((rankedItem) => ({
      ...rankedItem.item,
      rank: rankedItem.score ?? 0,
      rankedValue: rankedItem.matches?.[0]?.value ?? '',
      rankedPosition: rankedItem.matches?.[0]?.indices[0] ?? [0, 0],
    }))
    .slice(0, limit);
};

interface GetSearchProductResultsProps {
  findProduct: (id: string) => Product | undefined;
  searchFunction: (searchValue: string) => SearchType<Product>[];
  selectedId?: string;
  search?: string;
}

export const getSearchProductResults = ({
  findProduct,
  searchFunction,
  selectedId,
  search,
}: GetSearchProductResultsProps): Product[] => {
  if (!selectedId) {
    return searchFunction(search ?? '');
  }

  const reducedProductsThatMatch = searchFunction(search ?? '');
  const searchProductsWithoutSelectedProduct = reducedProductsThatMatch.filter(
    (product) => product.id !== selectedId,
  );

  const productOnTop = findProduct(selectedId);

  if (!productOnTop) {
    return searchProductsWithoutSelectedProduct;
  }

  return [productOnTop, ...searchProductsWithoutSelectedProduct];
};
