import { useEffect, useState } from 'react';

import { UseDeclarationParams, useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { DeclarationCard } from '@/components/business/DeclarationCard';
import { FilterBar } from '@/components/business/FilterGroup/FilterBar';
import { Meta } from '@/layout/Meta';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const QuittancePage = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [declarations, setDeclarations] = useState<DeclarationResponse[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterMeanOfTransports, setFilterMeanOfTransports] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [queryData, setQueryData] = useState<UseDeclarationParams>({
    search: null,
    searchPublicId: null,
    limit: Constants.MINI_TABLE_LIMIT,
    offset: page * Constants.MINI_TABLE_LIMIT,
  });

  const { isLoading, data } = useDeclarations(queryData);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const onChangeFilterStatus = (value: string) => {
    if (!filterStatus.includes(value.toLocaleLowerCase())) {
      const newFilter = filterStatus?.split(',') ?? [];
      newFilter.push(value.toLocaleLowerCase());

      setFilterStatus(newFilter.toString());
    } else {
      const newFilter = filterStatus?.split(',') ?? [];
      const index = newFilter.indexOf(value.toLocaleLowerCase());
      if (index > -1) {
        newFilter.splice(index, 1);
      }

      setFilterStatus(newFilter.toString());
    }
  };

  const onChangeFilterMeanOfTransports = (value: string) => {
    if (!filterMeanOfTransports.includes(value.toLocaleLowerCase())) {
      const newFilter = filterMeanOfTransports?.split(',') ?? [];
      newFilter.push(value.toLocaleLowerCase());

      setFilterMeanOfTransports(newFilter.toString());
    } else {
      const newFilter = filterMeanOfTransports?.split(',') ?? [];
      const index = newFilter.indexOf(value.toLocaleLowerCase());
      if (index > -1) {
        newFilter.splice(index, 1);
      }

      setFilterMeanOfTransports(newFilter.toString());
    }
  };

  const onChangeDate = (newStartDate: Date | null, newEndDate: Date | null) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    if (data) {
      const tmpDeclarations = [...declarations, ...data];
      const uniqueArray = tmpDeclarations.filter(
        (v, i, a) => a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
      );
      setDeclarations(uniqueArray);
    }
  }, [data]);

  const onValidateFilter = () => {
    setPage(0);
    setDeclarations([]);
    setQueryData({
      ...queryData,
      search,
      offset: 0 * Constants.MINI_TABLE_LIMIT,
      status: filterStatus !== '' ? filterStatus : undefined,
      meanOfTransports: filterMeanOfTransports !== '' ? filterMeanOfTransports : undefined,
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
    });
  };

  const newLimit = () => {
    setPage(page + 1);
    setQueryData({
      ...queryData,
      offset: (page + 1) * Constants.MINI_TABLE_LIMIT,
    });
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Déclaration"
      >
        <div className="flex flex-col px-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col gap-[10px]">
              <FilterBar
                title="Declarations"
                searchType="global"
                onSearch={handleSearch}
                onValidateFilter={onValidateFilter}
                onChangeDate={onChangeDate}
                onChangeFilterStatus={onChangeFilterStatus}
                onChangeFilterMeanOfTransports={onChangeFilterMeanOfTransports}
                activeFiltersStatus={filterStatus}
                activeFiltersMeanOfTransports={filterMeanOfTransports}
                startDate={startDate}
                endDate={endDate}
              />
              {declarations &&
                declarations?.map((declaration, index) => (
                  <DeclarationCard
                    key={declaration.id}
                    {...declaration}
                    date={declaration.versionDate}
                    id={declaration.publicId}
                    firstName={declaration.declarantFirstName}
                    lastName={declaration.declarantLastName}
                    transport={declaration.declarantMeanOfTransport}
                    newLimit={data && data.length ? newLimit : undefined}
                    isLast={index === declarations.length - 1}
                  />
                ))}
            </div>
          )}
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default QuittancePage;
