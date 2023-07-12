import { useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import { ModalResumeDeclaration } from '@/components/autonomous/ModalResumeDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { LinkWithIcon } from '@/components/common/LinkWithIcon';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { QrCodeScanner } from '@/components/input/StandardInputs/QrCodeScanner';
import { DisplayTuto } from '@/core/hoc/displayTuto.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import { MENU_AGENT_ITEMS, RoutingAgent } from '@/utils/const';
import { getLevelWithData } from '@/utils/declarationAgent';

const SCAN_HEIGHT = '268px';
const SCAN_WIDTH = '357px';

const Index = () => {
  const router = useRouter();
  const [mode, setMode] = useState('tools');
  const [openModalResumeDeclaration, setOpenModalResumeDeclaration] = useState<boolean>(false);

  const getIdByQRCode = (qrCode: string) => {
    console.log(qrCode);
  };

  const { declarationAgentRequest } = useStore((state) => ({
    declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
  }));

  const openDeclaration = () => {
    if (getLevelWithData(declarationAgentRequest) === 1) {
      router.push(RoutingAgent.createDeclaration);
    } else {
      setOpenModalResumeDeclaration(true);
    }
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Déclare Douane "
            description="Déclare Douane est un outil pour les particuliers qui permet de déclarer..."
          />
        }
      >
        <div className="px-8 pt-9">
          <div className=" flex flex-col justify-center items-center gap-1">
            <div className="border border-secondary-500 inline-flex flex-row rounded-full p-1 text-center">
              <button
                className={classNames({
                  'inline-flex justify-center rounded-full px-5 py-2 align-middle text-base': true,
                  'bg-primary-600 text-white': mode === 'scanner',
                  'text-disabled-text': mode === 'tools',
                })}
                disabled
              >
                Scanner
              </button>
              <button
                className={classNames({
                  'inline-flex justify-center rounded-full px-5 py-2 align-middle text-base': true,
                  'bg-disabled-bg text-white': mode === 'tools',
                  'text-disabled-text': mode === 'scanner',
                })}
                onClick={() => setMode('tools')}
              >
                Outils
              </button>
            </div>
            <Typography color="black" size="text-2xs" textPosition="text-center">
              Nos équipes travaillent actuellement sur le scanner, <br />
              il sera disponible d’ici quelques jours.
            </Typography>
            <p className="text-[8px] text-center w-[185px] text-black"></p>
          </div>
          {mode === 'tools' ? (
            <div className="mb-1 flex flex-col gap-5 mt-4">
              {MENU_AGENT_ITEMS.map((item) => (
                <div
                  onClick={() => {
                    if (item.openDeclarationResumeModal) {
                      openDeclaration();
                    }
                  }}
                  key={item.title}
                >
                  <LinkWithIcon
                    href={item.path}
                    key={item.title}
                    svgName={item.svgIcon}
                    name={item.title}
                    withBgColor={item.id === 'declaration'}
                    disabled={item.disabled}
                  >
                    {item.title}
                  </LinkWithIcon>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
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
          )}
        </div>
        <ModalResumeDeclaration
          open={openModalResumeDeclaration}
          onClose={() => setOpenModalResumeDeclaration(false)}
        />
      </MainAgent>
    </AgentRoute>
  );
};

export default DisplayTuto(Index);
