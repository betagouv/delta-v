import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { FilterHistory } from '../../molecules/FilterHistory/FilterHistory';
import { FilterGroup } from './FilterGroup';
import { FilterBarForm, FilterBarProps } from './types';
import { Button } from '@/components/atoms/Button';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';
import { ModalWithTitleButton } from '@/components/molecules/ModalWithTitleButton/ModalWithTitleButton';
import { FILTER_MEANS_OF_TRANSPORT, FILTER_NEWS_TAGS, FILTER_STATUS } from '@/utils/filters';

export const ModalFilterBarDesktop = ({
  noSearchBar = false,
  noPeriodInput = false,
  filterHistories = [],
  withMeanOfTransportFilter = false,
  withStatusFilter = false,
  withNewsTagsFilter = false,
  onValidateFilter,
  filterBarData,
  open,
  setOpen,
  onResetFilter,
}: FilterBarProps) => {
  const [isModified, setIsModified] = useState(false);

  const [isDefaultValues, setIsDefaultValues] = useState(
    filterBarData?.status?.length === 0 &&
      filterBarData?.meanOfTransport?.length === 0 &&
      !filterBarData?.startDate &&
      !filterBarData?.endDate &&
      !filterBarData?.search,
  );
  const { register, control, handleSubmit, setValue, watch } = useForm<FilterBarForm>({
    defaultValues: {
      status: filterBarData?.status ?? [],
      meanOfTransport: filterBarData?.meanOfTransport ?? [],
      newsTags: filterBarData?.newsTags ?? [],
      startDate: filterBarData?.startDate,
      endDate: filterBarData?.endDate,
      search: filterBarData?.search,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    setIsModified(
      watch('status')?.join(',') !== filterBarData?.status?.join(',') ||
        watch('meanOfTransport')?.join(',') !== filterBarData?.meanOfTransport?.join(',') ||
        watch('newsTags')?.join(',') !== filterBarData?.newsTags?.join(',') ||
        watch('startDate') !== filterBarData?.startDate ||
        watch('endDate') !== filterBarData?.endDate ||
        watch('search') !== filterBarData?.search,
    );
    setIsDefaultValues(
      watch('status')?.length === 0 &&
        watch('meanOfTransport')?.length === 0 &&
        !watch('startDate') &&
        !watch('endDate') &&
        !watch('search'),
    );
  }, [watch()]);

  useEffect(() => {
    setValue('status', filterBarData?.status);
    setValue('meanOfTransport', filterBarData?.meanOfTransport);
    setValue('newsTags', filterBarData?.newsTags);
    setValue('startDate', filterBarData?.startDate);
    setValue('endDate', filterBarData?.endDate);
    setValue('search', filterBarData?.search ?? null);
  }, [filterBarData]);

  const onResetAll = () => {
    if (onResetFilter) {
      onResetFilter();
    }
    setValue('status', []);
    setValue('meanOfTransport', []);
    setValue('newsTags', []);
    setValue('startDate', null);
    setValue('endDate', null);
    setValue('search', null);
  };

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
    <ModalWithTitleButton
      open={open}
      title="Plus de filtres"
      titleColor="black"
      onClose={() => setOpen(false)}
      onResetAll={onResetAll}
      isDefaultValues={isDefaultValues}
    >
      <div className="flex flex-col bg-gray-100 px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 py-5">
            {!noSearchBar && (
              <input
                data-testid="input-search-element"
                enterKeyHint="search"
                placeholder="Thèmes, mots-clés..."
                className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-placeholder focus:border-secondary-300 focus:outline-none focus:ring-transparent mt-2 border-none"
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
            <div className="flex flex-col gap-10 pt-5">
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
                  title="Filtrer par :"
                  control={control}
                  name="newsTags"
                  filters={FILTER_NEWS_TAGS}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8 pt-5 pb-[50px]">
            {filterHistories.length > 0 && <FilterHistory histories={filterHistories} />}
            <div className="self-center">
              <Button type="submit" disabled={!isModified}>
                Voir les résultats
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ModalWithTitleButton>
  );
};
