import React from 'react';

import cs from 'classnames';
import { useForm } from 'react-hook-form';

import { FilterHistoryItemProps } from '../FilterHistory';
import { FilterHistory } from '../FilterHistory/FilterHistory';
import { SearchDisplayType } from '../Search';
import { FilterGroup } from './FilterGroup';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';
import { FILTER_MEANS_OF_TRANSPORT, FILTER_NEWS_TAGS, FILTER_STATUS } from '@/utils/filters';

export type FilterBarProps = {
  title: string;
  searchType?: SearchDisplayType;
  noSearchBar?: boolean;
  noPeriodInput?: boolean;
  filterHistories?: FilterHistoryItemProps[];
  filtersCount?: number;
  onValidateFilter: (data: FilterBarForm) => void;
  withMeanOfTransportFilter?: boolean;
  withStatusFilter?: boolean;
  withNewsTagsFilter?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export interface FilterBarForm {
  status?: string[];
  meanOfTransport?: string[];
  newsTags?: string[];
  startDate?: Date | null;
  endDate?: Date | null;
  search: string | null;
}

export const FilterBar = ({
  title = 'Plus de filtres',
  noSearchBar = false,
  noPeriodInput = false,
  filterHistories = [],
  filtersCount = 0,
  withMeanOfTransportFilter = false,
  withStatusFilter = false,
  withNewsTagsFilter = false,
  onValidateFilter,
  open,
  setOpen,
}: FilterBarProps) => {
  const { register, control, handleSubmit } = useForm<FilterBarForm>({
    defaultValues: {
      status: [],
      meanOfTransport: [],
      newsTags: [],
      startDate: null,
      endDate: null,
      search: null,
    },
  });

  const onSubmit = (data: FilterBarForm) => {
    setOpen(false);
    onValidateFilter(data);
  };

  return (
    <div className="flex flex-col rounded-xl bg-gray-100 px-5 py-4">
      <div
        className="grid cursor-pointer grid-cols-[20px_1fr_20px] items-center justify-items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <SvgIcon name="filter" className="h-4 w-4" />
        <span className="items-center gap-1 justify-self-start flex">
          <Typography color="black">{title}</Typography>
          {!open && filtersCount > 0 && (
            <div className="flex justify-center items-center h-5 w-5 rounded-full bg-primary-600 ">
              <Typography color="white" size="sm" weight="bold">
                {filtersCount}
              </Typography>
            </div>
          )}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 py-5">
            {!noSearchBar && (
              <input
                data-testid="input-search-element"
                enterKeyHint="search"
                placeholder="Thèmes, mots-clés..."
                className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent mt-2 border-none"
                {...register('search')}
              />
            )}
            {!noPeriodInput && (
              <PeriodInput
                noBorder
                endDateName="endDate"
                startDateName="startDate"
                control={control}
              />
            )}
            {withMeanOfTransportFilter && (
              <FilterGroup
                title="Moyen de transport"
                control={control}
                name="meanOfTransport"
                filters={FILTER_MEANS_OF_TRANSPORT}
              />
            )}
            {withStatusFilter && (
              <FilterGroup
                title="Statut de la déclaration"
                control={control}
                name="status"
                filters={FILTER_STATUS}
              />
            )}
            {withNewsTagsFilter && (
              <FilterGroup
                title="Filter par"
                control={control}
                name="newsTags"
                filters={FILTER_NEWS_TAGS}
              />
            )}
          </div>
          <div className="flex flex-col gap-8 py-5">
            {filterHistories.length > 0 && <FilterHistory histories={filterHistories} />}
            <span className="self-center">
              <Button type="submit">Voir les résultats</Button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
