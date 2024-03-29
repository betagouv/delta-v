import { useState } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { useDeclarations } from '@/api/hooks/useAPIDeclaration';
import { InputGroup } from '@/components/input/InputGroup';
import { DeclarationCard } from '@/components/molecules/DeclarationCard';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { RoutingAgent } from '@/utils/const';
import { Constants } from '@/utils/enums';

const ManualQRCodePage = () => {
  const [searchPublicId, setSearchPublicId] = useState<string | null>(null);
  const router = useRouter();
  const { isLoading, data } = useDeclarations({
    search: null,
    searchPublicId,
    limit: Constants.LIST_LIMIT,
    offset: 0,
  });

  const { register, setValue } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  register('search', {
    onChange: (e) => {
      const searchValue = e.target.value;
      if (searchValue.length === 0) {
        setSearchPublicId(null);
      }
      setValue('search', searchValue.toUpperCase());
      setSearchPublicId(searchValue.toUpperCase());
    },
  });

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
        linkButton={`${RoutingAgent.home}?mode=scanner`}
        titleHeader="Saisissez votre numéro de déclaration"
      >
        <div className="mb-1 flex flex-col justify-center gap-6 p-4 mt-9">
          <InputGroup
            name="search"
            type="text"
            leadingIcon="search"
            placeholder="Numéro de déclaration : XV56HJL..."
            fullWidth
            register={register('search')}
            withBorder
          />
          <div className="flex flex-col gap-2.5 w-max place-self-center">
            {!isLoading &&
              data &&
              data.length === 1 &&
              searchPublicId &&
              data.map((item: any) => (
                <DeclarationCard
                  firstName={item.declarantFirstName}
                  lastName={item.declarantLastName}
                  id={item.id}
                  status={item.status}
                  date={item.versionDate}
                  transport={item.declarantMeanOfTransport}
                  key={item.publicId}
                  publicId={item.publicId}
                  onClick={() => router.push(`/agent/declaration/${item.id}`)}
                />
              ))}
          </div>
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default ManualQRCodePage;
