import { useState } from 'react';

import { useRouter } from 'next/router';

import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Input } from '@/components/input/StandardInputs/Input';
import { DisplayTuto } from '@/core/hoc/displayTuto.hoc';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { MENU_AGENT_ITEMS, RoutingAgent } from '@/utils/const';

const Index = () => {
  const router = useRouter();
  const [mode, setMode] = useState('tools');
  return (
    <MainAgent
      meta={
        <Meta
          title="Déclare Douane "
          description="Déclare Douane est un outil pour les particuliers qui permet de déclarer..."
        />
      }
    >
      <div className="-mt-2 -mb-3 flex flex-col items-center">
        <div className="h-6 ">
          <SvgIcon name="logo" />
        </div>
      </div>
      <button
        className="inline-flex justify-center rounded-md border border-primary-500 p-3 align-middle shadow-xl"
        onClick={() => setMode(mode === 'tools' ? 'declaration' : 'tools')}
      >
        {mode === 'tools' ? 'Déclaration' : 'Outils'}
      </button>
      {mode === 'tools' ? (
        <>
          <Link withBorder to={RoutingAgent.qrCodeManuel}>
            saisir manuellement
          </Link>
          <Link withBorder to={RoutingAgent.declaration}>
            déclaration
          </Link>
        </>
      ) : (
        <div className="mb-1 flex flex-col gap-6">
          <div>
            <Input
              name="search"
              type="text"
              fullWidth
              placeholder="Que recherchez-vous ?"
              trailingIcon="search"
              onClick={() => router.push(`/recherche`)}
            />
          </div>
          {MENU_AGENT_ITEMS.map((item) => (
            <Link withBorder to={item.path}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </MainAgent>
  );
};

export default DisplayTuto(Index);
