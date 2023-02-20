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
      <Typography size="text-lg">{title}</Typography>
      <div className="my-6 flex flex-row gap-3">
        {filters.map((item, index) => (
          <FilterItem key={index} title={item} />
        ))}
      </div>
    </div>
  );
};
