import React from 'react';

import cs from 'classnames';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { FilterOptions } from '@/utils/filters';

export type FilterItemProps = {
  filter: FilterOptions;
  isActive: boolean;
  onClick: (id: string) => void;
};

export const FilterItem = ({ filter, isActive, onClick }: FilterItemProps) => {
  return (
    <div
      className={cs({
        'h-6 w-fit grid grid-cols-[14px_1fr] rounded-full items-center pl-1 pr-2 border border-primary-600 cursor-pointer':
          true,
        'bg-primary-600 text-white': isActive,
      })}
      onClick={() => onClick(filter.id)}
    >
      <div
        className={cs({
          'h-3.5 w-3.5 rounded-full z-10 flex justify-center items-center': true,
          'text-primary-600 bg-white': isActive,
          'bg-primary-600 text-white': !isActive,
        })}
      >
        <Icon name="plus" size="xs" />
      </div>
      <span className="flex ml-1 items-center">
        <Typography size="text-2xs" desktopSize="text-sm" color={isActive ? 'white' : 'primary'}>
          {filter.value}
        </Typography>
      </span>
    </div>
  );
};
