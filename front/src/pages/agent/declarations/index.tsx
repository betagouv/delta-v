import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { DeclarationCard } from '@/components/business/DeclarationCard';
import { Meta } from '@/layout/Meta';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const QuittancePage = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [declarations, setDeclarations] = useState<DeclarationResponse[]>([]);
  const { isLoading, data } = useDeclarations({
    search,
    searchPublicId: null,
    limit: Constants.MINI_TABLE_LIMIT,
    offset: page * Constants.MINI_TABLE_LIMIT,
  });

  useEffect(() => {
    if (data) {
      const tmpDeclarations = [...declarations, ...data];
      setDeclarations(tmpDeclarations);
    }
  }, [data]);

  const newLimit = () => {
    setPage(page + 1);
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
              <input
                data-testid="input-search-element"
                enterKeyHint="search"
                className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none  focus:ring-transparent mt-2"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              {declarations &&
                declarations?.map((declaration, index) => (
                  <DeclarationCard
                    key={declaration.id}
                    {...declaration}
                    id={declaration.publicId}
                    firstName={declaration.declarantFirstName}
                    lastName={declaration.declarantLastName}
                    transport={declaration.declarantMeanOfTransport}
                    newLimit={data?.length ? newLimit : undefined}
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
