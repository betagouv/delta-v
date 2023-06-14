import React, { useState } from 'react';

import cs from 'classnames';
import { useForm } from 'react-hook-form';

import { FilterHistoryItemProps } from '../FilterHistory';
import { FilterHistory } from '../FilterHistory/FilterHistory';
import { Search, SearchDisplayType } from '../search';
import { FilterGroup, FilterGroupProps } from './FilterGroup';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';

export type FilterBarProps = {
  title: string;
  searchType?: SearchDisplayType;
  noSearchBar?: boolean;
  noPeriodInput?: boolean;
  filterGroups?: FilterGroupProps[];
  filterHistories?: FilterHistoryItemProps[];
};

export const FilterBar = ({
  title = 'Plus de filtres',
  searchType = 'global',
  noSearchBar = false,
  noPeriodInput = false,
  filterGroups = [],
  filterHistories = [],
}: FilterBarProps) => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col rounded-xl bg-gray-100 px-5 py-4">
        <div
          className="grid cursor-pointer grid-cols-[20px_1fr_20px] items-center justify-items-center gap-2"
          onClick={() => setOpen(!open)}
        >
          <Icon name="list2" size="base" />
          <span className="justify-self-start">
            <Typography color="black">{title}</Typography>
          </span>
          <span className="self-end">
            {open ? (
              <Icon name="chevron-thin-up" size="base" />
            ) : (
              <Icon name="chevron-thin-down" size="base" />
            )}
          </span>
        </div>
        <div
          className={cs({
            'flex flex-col overflow-hidden transition-[max-height] duration-300 ease-in-out divide-y':
              true,
            'max-h-0': !open,
            'max-h-[1000px]': open,
          })}
        >
          <div className="flex flex-col gap-4 py-5">
            {!noSearchBar && <Search onSearch={() => []} searchType={searchType} noBorder></Search>}
            {!noPeriodInput && <PeriodInput register={register} noBorder />}
            {filterGroups.length > 0 &&
              filterGroups.map((filterGroup, index) => (
                <FilterGroup key={index} title={filterGroup.title} filters={filterGroup.filters} />
              ))}
          </div>
          <div className="flex flex-col gap-8 py-5">
            {filterHistories.length > 0 && <FilterHistory histories={filterHistories} />}
            <span className="self-center">
              <Button type="submit">Voir les résultats</Button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};
