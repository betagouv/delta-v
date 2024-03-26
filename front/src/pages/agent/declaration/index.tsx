import { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { UseDeclarationParams, useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { DeclarationCard } from '@/components/molecules/DeclarationCard';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { FilterBarMobile } from '@/components/organisms/FilterGroup/FilterBarMobile';
import { FilterBarForm } from '@/components/organisms/FilterGroup/types';
import { Meta } from '@/layout/Meta';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { MainAgent } from '@/templates/MainAgent';
import { RoutingAgent } from '@/utils/const';
import { Constants } from '@/utils/enums';

const QuittancePage = () => {
  const router = useRouter();

  const { search } = router.query;
  const [page, setPage] = useState<number>(0);
  const [counter, setCounter] = useState<number>(search ? 1 : 0);
  const [declarations, setDeclarations] = useState<DeclarationResponse[]>([]);
  const [openFilterBar, setOpenFilterBar] = useState(false);

  const getFiltersCount = (data: FilterBarForm) => {
    let filtersCount = 0;
    if (data.search && data.search !== '') {
      filtersCount += 1;
    }
    if (data.startDate || data.endDate) {
      filtersCount += 1;
    }
    if (data.meanOfTransport && data.meanOfTransport.length > 0) {
      filtersCount += data.meanOfTransport.length;
    }
    if (data.status && data.status.length > 0) {
      filtersCount += data.status.length;
    }
    if (data.newsTags && data.newsTags.length > 0) {
      filtersCount += data.newsTags.length;
    }
    return filtersCount;
  };

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

  const { isLoading, data: apiDeclarations } = useDeclarations(queryData);

  const onValidateFilter = (data: FilterBarForm) => {
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
    setCounter(getFiltersCount(data));
  };

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
        linkButton={`${RoutingAgent.home}?mode=tools`}
      >
        <div className="flex flex-col px-4 pb-4">
          <div className="mb-5">
            <FilterBarMobile
              title="Plus de filtres"
              searchType="global"
              onValidateFilter={onValidateFilter}
              open={openFilterBar}
              setOpen={setOpenFilterBar}
              withMeanOfTransportFilter
              withStatusFilter
              filtersCount={counter}
              defaultSearchValue={search as string}
            />
          </div>
          <div className="md:items-center flex flex-col gap-2.5">
            {declarations &&
              declarations?.map((declaration, index) => (
                <span className={cs({ 'opacity-40': openFilterBar })} key={declaration.id}>
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
                </span>
              ))}
          </div>
          {isLoading && <div>Chargement...</div>}
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default QuittancePage;
