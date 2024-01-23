import React from 'react';

import { useForm } from 'react-hook-form';

import { FilterBarDesktop } from './FilterBarDesktop';
import { FilterGroup } from './FilterGroup';
import { FilterBarForm, FilterBarProps } from './types';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';
import { FILTER_NEWS_TAGS } from '@/utils/filters';

export const FilterBarActuality = ({
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
    <FilterBarDesktop onSubmit={onSubmit} handleSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center gap-4">
          <input
            data-testid="input-search-element"
            enterKeyHint="search"
            placeholder="Thèmes, mots-clés..."
            className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:text-xs placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent border-none"
            {...register('search')}
          />
          <PeriodInput
            noBorder
            endDateName="endDate"
            startDateName="startDate"
            control={control}
            isStartFocused={onFocusedStartPeriodInput}
            isEndFocused={onFocusedEndPeriodInput}
          />
        </div>
        {(startFocused || endFocused) && <div className="h-[260px]" />}
        <FilterGroup
          title="Filtrer par :"
          control={control}
          name="newsTags"
          filters={FILTER_NEWS_TAGS}
        />
      </div>
    </FilterBarDesktop>
  );
};
