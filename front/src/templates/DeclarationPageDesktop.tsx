import { useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { UseDeclarationParams, useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { DeclarationCard } from '@/components/molecules/DeclarationCard';
import { FilterBarDesktop } from '@/components/organisms/FilterGroup/FilterBarDesktop';
import { FilterBarForm } from '@/components/organisms/FilterGroup/types';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { Constants } from '@/utils/enums';

export const DeclarationPageDesktop = () => {
  const router = useRouter();

  const { search } = router.query;
  const [page, setPage] = useState<number>(0);
  const [declarations, setDeclarations] = useState<DeclarationResponse[]>([]);
  const [filterBarData, setFilterBarData] = useState<FilterBarForm>({
    search: '',
    status: [],
    meanOfTransport: [],
    startDate: null,
    endDate: null,
  });

  const addDeclarations = (apiDeclarationsData: DeclarationResponse[]): void => {
    const tmpDeclarations = [...declarations, ...apiDeclarationsData];
    const uniqueArray = tmpDeclarations.filter(
      (v, i, a) => a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
    );
    setDeclarations(uniqueArray);
  };

  const [queryData, setQueryData] = useState<UseDeclarationParams>({
    search: search as string | null,
    searchPublicId: null,
    limit: Constants.MINI_TABLE_LIMIT,
    offset: page * Constants.MINI_TABLE_LIMIT,
    onSuccess: (data) => addDeclarations(data),
  });

  const onValidateFilter = (data: FilterBarForm) => {
    setFilterBarData(data);
    setPage(0);
    setQueryData({
      ...queryData,
      search: data.search,
      offset: 0 * Constants.MINI_TABLE_LIMIT,
      status: data.status && data.status.length > 0 ? data.status.join(',') : undefined,
      meanOfTransports:
        data.meanOfTransport && data.meanOfTransport.length > 0
          ? data.meanOfTransport.join(',')
          : undefined,
      startDate: data.startDate ?? undefined,
      endDate: data.endDate ? dayjs(data.endDate).add(1, 'day').toDate() : undefined,
      onSuccess: (dataSuccess) => setDeclarations(dataSuccess),
    });
  };

  const { isLoading, data: apiDeclarations } = useDeclarations(queryData);

  const newLimit = () => {
    if (!apiDeclarations || apiDeclarations.length === 0) {
      return;
    }

    if (apiDeclarations.length < Constants.MINI_TABLE_LIMIT) {
      return;
    }

    setPage(page + 1);
    setQueryData({
      ...queryData,
      offset: (page + 1) * Constants.MINI_TABLE_LIMIT,
      onSuccess: (data) => addDeclarations(data),
    });
  };

  return (
    <div className="flex flex-col">
      <FilterBarDesktop
        onSubmit={onValidateFilter}
        filterBarData={filterBarData}
        withStatusFilter
        withMeanOfTransportFilter
      />
      <div className="grid grid-cols-3 gap-[30px] pt-10">
        {declarations &&
          declarations?.map((declaration, index) => (
            <DeclarationCard
              {...declaration}
              date={declaration.versionDate}
              id={declaration.id}
              publicId={declaration.publicId}
              onClick={() => router.push(`/agent/declaration/${declaration.id}`)}
              firstName={declaration.declarantFirstName}
              lastName={declaration.declarantLastName}
              transport={declaration.declarantMeanOfTransport}
              newLimit={apiDeclarations && apiDeclarations.length ? newLimit : undefined}
              isLast={index === declarations.length - 1}
            />
          ))}
        {isLoading && (
          <div className="flex justify-center w-full">
            <div className="lds-dual-ring" />
          </div>
        )}
      </div>
    </div>
  );
};
