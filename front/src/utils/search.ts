import Fuse from 'fuse.js';

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
}: AdvancedSearchOptions<T>): SearchType<T>[] => {
  if (searchValue.length === 0) {
    return [];
  }

  const fuse = new Fuse(searchList, {
    includeScore: true,
    includeMatches: true,
    findAllMatches: false,
    minMatchCharLength: 2,
    threshold: 0.2,
    shouldSort: true,
    keys: searchKey,
  });
  const result = fuse.search(searchValue);

  return result.map((rankedItem) => ({
    ...rankedItem.item,
    rank: rankedItem.score ?? 0,
    rankedValue: rankedItem.matches?.[0]?.value ?? '',
    rankedPosition: rankedItem.matches?.[0]?.indices[0] ?? [0, 0],
  }));
};
