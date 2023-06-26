import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { UseDeclarationParams, useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { DeclarationCard } from '@/components/business/DeclarationCard';
import { FilterBar, FilterBarForm } from '@/components/business/FilterGroup/FilterBar';
import { Meta } from '@/layout/Meta';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const QuittancePage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [declarations, setDeclarations] = useState<DeclarationResponse[]>([]);
  const [queryData, setQueryData] = useState<UseDeclarationParams>({
    search: null,
    searchPublicId: null,
    limit: Constants.MINI_TABLE_LIMIT,
    offset: page * Constants.MINI_TABLE_LIMIT,
  });

  const { isLoading, data: apiDeclarations } = useDeclarations(queryData);

  const onDeclarationCardClick = (id: string) => {
    router.push(`/agent/declaration/${id}`);
  };

  useEffect(() => {
    if (apiDeclarations) {
      const tmpDeclarations = [...declarations, ...apiDeclarations];
      const uniqueArray = tmpDeclarations.filter(
        (v, i, a) => a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i,
      );
      setDeclarations(uniqueArray);
    }
  }, [apiDeclarations]);

  const onValidateFilter = (data: FilterBarForm) => {
    setPage(0);
    setDeclarations([]);
    setQueryData({
      ...queryData,
      search: data.search,
      offset: 0 * Constants.MINI_TABLE_LIMIT,
      status: data.status.length > 0 ? data.status.join(',') : undefined,
      meanOfTransports:
        data.meanOfTransport.length > 0 ? data.meanOfTransport.join(',') : undefined,
      startDate: data.startDate ?? undefined,
      endDate: data.endDate ?? undefined,
    });
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
                onValidateFilter={onValidateFilter}
              />
              {declarations &&
                declarations?.map((declaration, index) => (
                  <DeclarationCard
                    key={declaration.id}
                    {...declaration}
                    date={declaration.versionDate}
                    id={declaration.id}
                    publicId={declaration.publicId}
                    onClick={onDeclarationCardClick}
                    firstName={declaration.declarantFirstName}
                    lastName={declaration.declarantLastName}
                    transport={declaration.declarantMeanOfTransport}
                    newLimit={apiDeclarations && apiDeclarations.length ? newLimit : undefined}
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
