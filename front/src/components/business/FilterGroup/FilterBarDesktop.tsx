import React from 'react';

import { useForm } from 'react-hook-form';

import { FilterGroup } from './FilterGroup';
import { FilterBarForm, FilterBarProps } from './types';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';
import { FILTER_MEANS_OF_TRANSPORT, FILTER_NEWS_TAGS, FILTER_STATUS } from '@/utils/filters';

export const FilterBarDesktop = ({
  noSearchBar = false,
  noPeriodInput = false,
  withMeanOfTransportFilter = false,
  withStatusFilter = false,
  withNewsTagsFilter = false,
  defaultSearchValue,
  onValidateFilter,
  filterBarData,
  setOpen,
}: FilterBarProps) => {
  const { register, control, handleSubmit } = useForm<FilterBarForm>({
    defaultValues: {
      status: filterBarData?.status ?? [],
      meanOfTransport: filterBarData?.meanOfTransport ?? [],
      newsTags: filterBarData?.newsTags ?? [],
      startDate: filterBarData?.startDate ?? null,
      endDate: filterBarData?.endDate ?? null,
      search: filterBarData?.search ?? defaultSearchValue ?? null,
    },
  });

  const onSubmit = (data: FilterBarForm) => {
    setOpen(false);
    onValidateFilter(data);
  };
  const [startFocused, setStartFocused] = React.useState<boolean>(false);
  const [endFocused, setEndFocused] = React.useState<boolean>(false);

  const onFocusedStartPeriodInput = (isFocused: boolean) => {
    setStartFocused(isFocused);
  };

  const onFocusedEndPeriodInput = (isFocused: boolean) => {
    setEndFocused(isFocused);
  };

  return (
    <div className="flex flex-col rounded-xl bg-gray-100 p-5 max-w-[781px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-start gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center gap-4">
              {!noSearchBar && (
                <input
                  data-testid="input-search-element"
                  enterKeyHint="search"
                  placeholder="Thèmes, mots-clés..."
                  className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:text-xs placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent border-none"
                  {...register('search')}
                />
              )}
              {!noPeriodInput && (
                <PeriodInput
                  noBorder
                  endDateName="endDate"
                  startDateName="startDate"
                  control={control}
                  isStartFocused={onFocusedStartPeriodInput}
                  isEndFocused={onFocusedEndPeriodInput}
                />
              )}
            </div>
            {(startFocused || endFocused) && <div className="h-[260px]" />}
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
          <div className="flex flex-col gap-8">
            <button
              type="submit"
              className="flex flex-row gap-5 bg-primary-600 rounded-full text-white items-center justify-center px-5 py-2.5"
            >
              <Typography size="text-2xs" color="white">
                Rechercher
              </Typography>
              <Icon name="search" size="sm" color="white" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
