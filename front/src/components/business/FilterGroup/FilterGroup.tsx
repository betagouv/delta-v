import React from 'react';

import { FilterItem } from './FilterItem';
import { Typography } from '@/components/common/Typography';
import { FilterOptions } from '@/utils/filters';

export type FilterGroupProps = {
  title: string;
  filters: FilterOptions[];
  activeFilters: string;
  onSelectFilter: (value: string) => void;
};

export const FilterGroup = ({
  title,
  filters,
  activeFilters,
  onSelectFilter,
}: FilterGroupProps) => {
  return (
    <div>
      <Typography color="black" size="text-xs">
        {title}
      </Typography>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {filters.map((item, index) => (
          <FilterItem
            key={index}
            filter={item}
            onClick={onSelectFilter}
            activeFilters={activeFilters}
          />
        ))}
      </div>
    </div>
  );
};
