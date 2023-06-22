import React, { useState } from 'react';

import cs from 'classnames';

import { FilterHistoryItemProps } from '../FilterHistory';
import { FilterHistory } from '../FilterHistory/FilterHistory';
import { SearchDisplayType } from '../search';
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
  startDate: Date | null;
  endDate: Date | null;
  onSearch?: (search: string) => void;
  onChangeDate: (startDate: Date | null, endDate: Date | null) => void;
  onValidateFilter: () => void;
};

export const FilterBar = ({
  title = 'Plus de filtres',
  noSearchBar = false,
  noPeriodInput = false,
  filterGroups = [],
  filterHistories = [],
  startDate,
  endDate,
  onSearch,
  onValidateFilter,
  onChangeDate,
}: FilterBarProps) => {
  const [open, setOpen] = useState(false);

  return (
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
          {!noSearchBar && (
            <input
              data-testid="input-search-element"
              enterKeyHint="search"
              placeholder="Thèmes, mots-clés..."
              className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none  focus:ring-transparent mt-2"
              onChange={(event) => {
                if (onSearch) {
                  onSearch(event.target.value);
                }
              }}
            />
          )}
          {!noPeriodInput && (
            <PeriodInput
              noBorder
              onChangeDate={onChangeDate}
              startDate={startDate}
              endDate={endDate}
            />
          )}
          {filterGroups.length > 0 &&
            filterGroups.map((filterGroup, index) => (
              <FilterGroup key={index} title={filterGroup.title} filters={filterGroup.filters} />
            ))}
        </div>
        <div className="flex flex-col gap-8 py-5">
          {filterHistories.length > 0 && <FilterHistory histories={filterHistories} />}
          <span className="self-center">
            <Button
              onClick={() => {
                onValidateFilter();
                setOpen(false);
              }}
            >
              Voir les résultats
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};
