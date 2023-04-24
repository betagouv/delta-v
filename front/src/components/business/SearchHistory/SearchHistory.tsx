import React from 'react';

import { SearchHistoryItem, SearchHistoryItemProps } from './SearchHistoryItem';

export type SearchHistoryProps = {
  histories: SearchHistoryItemProps[];
};

export const SearchHistory = ({ histories }: SearchHistoryProps) => {
  return (
    <div className="flex flex-col gap-3">
      <span>Historique des recherches</span>
      {histories.map((history) => (
        <SearchHistoryItem
          matchingValue={history.matchingValue}
          category={history.category}
          searchStart={history.searchStart}
          searchEnd={history.searchEnd}
        />
      ))}
    </div>
  );
};
