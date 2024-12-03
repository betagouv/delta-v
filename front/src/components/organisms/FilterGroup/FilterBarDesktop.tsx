import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { ModalFilterBarDesktop } from './ModalFilterBarDesktop';
import { FilterBarForm } from './types';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';

export type FilterBarDesktopProps = {
  onSubmit: any;
  filterBarData?: FilterBarForm;
  withStatusFilter?: boolean;
  withMeanOfTransportFilter?: boolean;
  withNewsTagsFilter?: boolean;
};

export const FilterBarDesktop = ({
  onSubmit,
  filterBarData,
  withStatusFilter,
  withMeanOfTransportFilter,
  withNewsTagsFilter,
}: FilterBarDesktopProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { register, control, handleSubmit, setValue } = useForm<FilterBarForm>({
    defaultValues: {
      status: filterBarData?.status ?? [],
      meanOfTransport: filterBarData?.meanOfTransport ?? [],
      newsTags: filterBarData?.newsTags ?? [],
      startDate: filterBarData?.startDate ?? null,
      endDate: filterBarData?.endDate ?? null,
      search: filterBarData?.search ?? null,
    },
  });

  useEffect(() => {
    setValue('startDate', filterBarData?.startDate);
    setValue('endDate', filterBarData?.endDate);
    setValue('search', filterBarData?.search ?? null);
  }, [filterBarData]);

  const onResetFilter = () => {
    setValue('startDate', null);
    setValue('endDate', null);
    setValue('search', null);
  };

  return (
    <div className="flex flex-col rounded-xl bg-gray-100 p-5 max-w-[781px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-4 items-center">
            <input
              data-testid="input-search-element"
              enterKeyHint="search"
              placeholder="Thèmes, mots-clés..."
              className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-placeholder focus:border-secondary-300 focus:outline-none focus:ring-transparent border-none"
              {...register('search')}
            />
            <PeriodInput
              noBorder
              endDateName="endDate"
              startDateName="startDate"
              control={control}
            />
            <Button type="submit" icon="search" size="sm">
              Rechercher
            </Button>
          </div>
          <div className="flex flex-row gap-5 ml-5" onClick={() => setOpenModal(true)}>
            <div className="flex flex-row gap-1.5 items-center">
              <Icon name="filter" size="sm" color="black" />
              <Typography size="text-xs" color="black" weight="bold">
                Plus de filtres
              </Typography>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="chevron-thin-down" size="sm" color="black" />
            </div>
          </div>
        </div>
      </form>
      <ModalFilterBarDesktop
        withStatusFilter={withStatusFilter}
        withMeanOfTransportFilter={withMeanOfTransportFilter}
        withNewsTagsFilter={withNewsTagsFilter}
        onValidateFilter={onSubmit}
        filterBarData={filterBarData}
        open={openModal}
        setOpen={setOpenModal}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};
