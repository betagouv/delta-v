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
        <SearchHistoryItem product={history.product} category={history.category} />
      ))}
    </div>
  );
};
