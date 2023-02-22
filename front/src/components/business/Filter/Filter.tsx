import React from 'react';

import { FilterItem } from './FilterItem';
import { Typography } from '@/components/common/Typography';

export type FilterProps = {
  title: string;
  filters: string[];
};

export const Filter = ({ title, filters }: FilterProps) => {
  return (
    <div>
      <span className="text-[12px]">
        <Typography color="black" size="text-xs">
          {title}
        </Typography>
      </span>
      <div className="mt-[10px] flex flex-wrap gap-[8px]">
        {filters.map((item, index) => (
          <FilterItem key={index} title={item} />
        ))}
      </div>
    </div>
  );
};
