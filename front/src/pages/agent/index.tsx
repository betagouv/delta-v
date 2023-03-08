import { useState } from 'react';

import { useRouter } from 'next/router';

import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Input } from '@/components/input/StandardInputs/Input';
import { QrCodeScanner } from '@/components/input/StandardInputs/QrCodeScanner';
import { DisplayTuto } from '@/core/hoc/displayTuto.hoc';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { MENU_AGENT_ITEMS, RoutingAgent } from '@/utils/const';

const SCAN_HEIGHT = '268px';
const SCAN_WIDTH = '357px';

const Index = () => {
  const router = useRouter();
  const [mode, setMode] = useState('tools');

  const getIdByQRCode = (qrCode: string) => {
    console.log(qrCode);
  };

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
        <div className="flex flex-col gap-3">
          <p className="text-[26px] leading-7">Scanner le QR Code</p>
          <QrCodeScanner onScan={getIdByQRCode} height={SCAN_HEIGHT} width={SCAN_WIDTH} />
          <div className="inline-flex items-center justify-center">
            <button
              className="z-50 flex flex-row items-center justify-center gap-1 rounded-full border border-black bg-secondary-300 py-3 px-6"
              onClick={() => router.push(RoutingAgent.qrCodeManuel)}
              type="button"
            >
              <SvgIcon name="keyboard" />
              <Typography size="text-sm" color="black">
                saisir manuellement
              </Typography>
            </button>
          </div>
        </div>
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
