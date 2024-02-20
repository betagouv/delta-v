import React from 'react';

import { useController } from 'react-hook-form';

import { FilterItem } from './FilterItem';
import { Typography } from '@/components/common/Typography';
import { FilterOptions } from '@/utils/filters';

export type FilterGroupProps = {
  title: string;
  filters: FilterOptions[];
  control?: any;
  name: string;
  rules?: any;
  isMobile?: boolean;
};

export const FilterGroup = ({ title, filters, control, name, rules }: FilterGroupProps) => {
  const { field } = useController({
    control,
    name,
    rules,
  });

  const handleSelectFilter = (id: string) => {
    const selectedValues: string[] = field.value;
    if (selectedValues.includes(id)) {
      selectedValues.splice(selectedValues.indexOf(id), 1);
      field.onChange(selectedValues);
    } else {
      field.onChange([...selectedValues, id]);
    }
  };

  const isActiveFilter = (value: string) => {
    return field.value.includes(value);
  };

  return (
    <div className="sm:flex-col md:flex-row md:items-center flex gap-2.5">
      <Typography color="black" size="text-xs">
        {title}
      </Typography>

      <div className="flex flex-wrap gap-2.5 pr-6">
        {filters.map((item, index) => (
          <FilterItem
            key={index}
            filter={item}
            onClick={handleSelectFilter}
            isActive={isActiveFilter(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
