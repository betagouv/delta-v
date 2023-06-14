import React from 'react';

import { FilterItem, FilterItemProps } from './FilterItem';
import { Typography } from '@/components/common/Typography';

export type FilterGroupProps = {
  title: string;
  filters: FilterItemProps[];
};

export const FilterGroup = ({ title, filters }: FilterGroupProps) => {
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
