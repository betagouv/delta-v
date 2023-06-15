import { useState } from 'react';

import { useRouter } from 'next/router';

import { useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { DeclarationCard } from '@/components/business/DeclarationCard';
import { Icon } from '@/components/common/Icon';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { Constants } from '@/utils/enums';

const ManualQRCodePage = () => {
  const [searchPublicId, setSearchPublicId] = useState<string | null>(null);
  const router = useRouter();
  const [qr, setQr] = useState<string>('');
  const { isLoading, data } = useDeclarations({
    search: null,
    searchPublicId,
    limit: Constants.LiST_LIMIT,
    offset: 0,
  });

  const handleChange = (value: string) => {
    setQr(value);
    if (qr.length > 5) {
      setSearchPublicId(value.toLocaleUpperCase());
    }
  };

  const onDeclarationClick = (id: string) => {
    router.push(`/agent/declaration/${id}`);
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
        withHeader
        titleHeader="Saisie manuelle de la quittance"
      >
        <div className="mb-1 flex flex-col justify-center gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 z-10 flex h-full w-9 items-center pr-4">
              <Icon name="search" />
            </div>
            <input
              className="w-full rounded-full border border-secondary-300 py-3 pl-10 pr-3 placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent"
              enterKeyHint="search"
              data-testid="input-search-element"
              placeholder="Saisissez les chiffres : XV56HJL..."
              onChange={(event) => handleChange(event.target.value)}
              value={qr}
            />
            {!isLoading &&
              data &&
              data.length === 1 &&
              searchPublicId &&
              data.map((item: any) => (
                <div onClick={() => onDeclarationClick(item.publicId)} key={item.publicId}>
                  <DeclarationCard
                    firstName={item.declarantFirstName}
                    lastName={item.declarantLastName}
                    id={item.publicId}
                    status={item.status}
                    date={item.versionDate}
                    transport={item.declarantMeanOfTransport}
                    key={item.publicId}
                  />
                </div>
              ))}
          </div>
          <div className="mt-6 flex flex-col gap-6"></div>
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default ManualQRCodePage;
