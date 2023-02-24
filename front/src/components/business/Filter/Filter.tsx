import React from 'react';

import { FilterItem, FilterItemProps } from './FilterItem';
import { Typography } from '@/components/common/Typography';

export type FilterProps = {
  title: string;
  filters: FilterItemProps[];
};

export const Filter = ({ title, filters }: FilterProps) => {
  return (
    <div>
      <Typography color="black" size="text-xs">
        {title}
      </Typography>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {filters.map((item, index) => (
          <FilterItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
