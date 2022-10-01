import { matchSorter, MatchSorterOptions } from 'match-sorter';

import { capitalize } from './string';

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
  minRankAllowed = 0,
  limit = 10,
}: AdvancedSearchOptions<T>): SearchType<T>[] => {
  const options: MatchSorterOptions<any> = {
    keys: searchKey,
    sorter: (rankedItems) => {
      return rankedItems
        .map((rankedItem) => ({
          ...rankedItem,
          item: {
            ...rankedItem.item,
            rank: rankedItem.rank,
            rankedValue: capitalize(rankedItem.rankedValue),
          },
        }))
        .sort((a, b) => b.rank - a.rank);
    },
  };

  if (searchValue.length === 0) {
    return [];
  }

  return (matchSorter(searchList, searchValue, options) as SearchType<T>[])
    .filter((rankedItem) => rankedItem.rank >= minRankAllowed)
    .slice(0, limit);
};
