import React from 'react';

import cs from 'classnames';

import { Icon } from '@/components/common/Icon';
import { FilterOptions } from '@/utils/filters';

export type FilterItemProps = {
  filter: FilterOptions;
  activeFilters: string;
  onClick?: (value: string) => void;
};

export const FilterItem = ({ filter, activeFilters, onClick }: FilterItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(filter.id);
    }
  };

  return (
    <div
      className={cs({
        'h-6 w-fit grid grid-cols-[14px_1fr] rounded-full items-center pl-1 pr-2 border border-primary-600 cursor-pointer':
          true,
        'bg-primary-600 text-white': activeFilters.includes(filter.id),
      })}
      onClick={handleClick}
    >
      <div
        className={cs({
          'h-3.5 w-3.5 rounded-full z-10 flex justify-center items-center': true,
          'text-primary-600 bg-white': activeFilters.includes(filter.id),
          'bg-primary-600 text-white': !activeFilters.includes(filter.id),
        })}
      >
        <Icon name="plus" size="xs" />
      </div>
      <span
        className={cs({
          'text-xs ml-1': true,
          'text-primary-600': !activeFilters.includes(filter.id),
          'text-white': activeFilters.includes(filter.id),
        })}
      >
        {filter.value}
      </span>
    </div>
  );
};
