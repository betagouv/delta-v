import React from 'react';

import { FilterHistoryItem, FilterHistoryItemProps } from './FilterHistoryItem';
import { Typography } from '@/components/common/Typography';

export type FilterHistoryProps = {
  histories: FilterHistoryItemProps[];
};

export const FilterHistory = ({ histories }: FilterHistoryProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography weight="bold" color="black" size="text-xs">
        Historique des recherches
      </Typography>
      {histories.map((history, index) => (
        <FilterHistoryItem
          key={index}
          title={history.title}
          startDate={history.startDate}
          endDate={history.endDate}
          status={history.status}
          to={history.to}
        />
      ))}
    </div>
  );
};
