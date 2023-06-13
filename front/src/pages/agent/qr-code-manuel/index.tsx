import { useState } from 'react';

import { useRouter } from 'next/router';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Icon } from '@/components/common/Icon';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const ManualQRCodePage = () => {
  const [qr, setQr] = useState('');
  const router = useRouter();

  const handleChange = (value: string) => {
    setQr(value);
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
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <li
              key={1}
              className="flex cursor-pointer flex-row items-center rounded-lg bg-gray-300 p-3"
              onClick={() => router.push('/agent/declaration/1')}
            >
              Page of first id
            </li>
          </div>
        </div>
      </MainAgent>
    </AgentRoute>
  );
};

export default ManualQRCodePage;
