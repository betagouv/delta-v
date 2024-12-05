import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import QrScanner from 'qr-scanner';

import { useDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { LinkWithIcon } from '@/components/atoms/LinkWithIcon';
import { Typography } from '@/components/atoms/Typography';
import { QrCodeScanner } from '@/components/input/StandardInputs/QrCodeScanner';
import { ModalResumeDeclaration } from '@/components/organisms/ModalResumeDeclaration';
import useTokenValidity, { isConnected } from '@/hooks/useTokenValidity';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import { MAIN_MENU_AGENT_ITEMS, MenuAgentItem, RoutingAgent } from '@/utils/const';
import { getLevelWithData } from '@/utils/declarationAgent';

const SCAN_HEIGHT = '184px';
const SCAN_WIDTH = '326px';

interface HomepageAgentMobileProps {
  handleLogout: () => void;
}

const HomepageAgentMobile = ({ handleLogout }: HomepageAgentMobileProps) => {
  const tokenValidity = useTokenValidity();
  const router = useRouter();

  const queryParams = router.query;
  const defaultMode =
    queryParams?.mode === 'scanner' || queryParams?.mode === 'tools'
      ? queryParams?.mode
      : 'scanner';
  const [mode, setMode] = useState<'scanner' | 'tools'>(defaultMode);
  const [openModalResumeDeclaration, setOpenModalResumeDeclaration] = useState<boolean>(false);
  const [dataScan, setDataScan] = useState<string>();
  const [scanner, setScanner] = useState<QrScanner>();
  const [scanningStarted, setScanningStarted] = useState<boolean>(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const startCamera = (ref: HTMLVideoElement) => {
    if (!isConnected(tokenValidity)) {
      return;
    }
    setVideoRef(ref);
    const qrScanner = new QrScanner(
      ref,
      (result: any) => {
        setDataScan(result.data);
      },
      {
        onDecodeError: () => {},
        maxScansPerSecond: 1,
        highlightScanRegion: true,
      },
    );
    setScanner(qrScanner);
    qrScanner.start().then(() => {
      setScanningStarted(true);
    });
  };

  const stopCamera = () => {
    scanner?.$video?.remove();
    scanner?.$canvas?.remove();
    scanner?.stop();
    scanner?.destroy();
    setScanningStarted(false);
  };

  const getDeclarationMutation = useDeclarationMutation({
    onSuccess: ({ data }) => {
      router.push(`/agent/declaration/${data.id}`);
      stopCamera();
    },
  });

  const getIdByQRCode = (qrCode: string) => {
    getDeclarationMutation.mutate({ id: qrCode });
  };

  const handleClickTools = () => {
    setVideoRef(null);
    scanner?.pause();
    setMode('tools');
    router.push({ query: { mode: 'tools' } });
  };

  const handleClickScanner = () => {
    setMode('scanner');
    router.push({ query: { mode: 'scanner' } });
  };

  useEffect(() => {
    if (dataScan) {
      stopCamera();
      setVideoRef(null);
      getIdByQRCode(dataScan);
    }
  }, [dataScan]);

  useEffect(() => {
    if (videoRef && mode === 'scanner') {
      startCamera(videoRef);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [videoRef, mode]);

  const { declarationAgentRequest, setCountryForProductsNomenclature } = useStore((state) => ({
    declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
    setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
  }));

  const openDeclaration = () => {
    if (getLevelWithData(declarationAgentRequest) === 1) {
      router.push(RoutingAgent.createDeclaration);
    } else {
      setOpenModalResumeDeclaration(true);
    }
  };

  const handleMenuItemClick = (item: MenuAgentItem) => {
    if (item.openDeclarationResumeModal) {
      openDeclaration();
    }
    setCountryForProductsNomenclature(undefined);
  };

  return (
    <>
      <MainAgent
        meta={
          <Meta
            title="Déclare Douane "
            description="Déclare Douane est un outil pour les particuliers qui permet de déclarer..."
          />
        }
      >
        <div className="px-8 pt-9">
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="border border-secondary-300 flex flex-row justify-around rounded-full px-[20px] py-[8px] text-center gap-7">
              <button
                className={classNames({
                  'z-10 text-base': true,
                  'text-white': mode === 'scanner',
                  'text-disabled-text': mode === 'tools',
                })}
                onClick={handleClickScanner}
              >
                Scanner
              </button>
              <button
                className={classNames({
                  'z-10 text-base': true,
                  'text-white': mode === 'tools',
                  'text-disabled-text': mode === 'scanner',
                })}
                onClick={handleClickTools}
              >
                Outils
              </button>
            </div>
            <motion.div
              className="relative bg-primary-600 w-[81px] h-[36px] rounded-full top-[-43px]"
              initial={{
                left: '42px',
              }}
              animate={{
                left: mode === 'tools' ? '44px' : '-36px',
                width: mode === 'tools' ? '76px' : '92px',
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
          {mode === 'tools' ? (
            <div className="flex flex-col gap-5 mt-4">
              {MAIN_MENU_AGENT_ITEMS.map((item) => (
                <div onClick={() => handleMenuItemClick(item)} key={item.title}>
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
              <LinkWithIcon href="#" svgName="logout" name="Déconnexion" onClick={handleLogout}>
                Déconnexion
              </LinkWithIcon>
            </div>
          ) : (
            <div
              className={classNames({
                'flex flex-col gap-3 mt-8 items-center': true,
                '[&>.scan-region-highlight]:hidden': dataScan,
              })}
            >
              <QrCodeScanner
                height={SCAN_HEIGHT}
                width={SCAN_WIDTH}
                scanningStarted={scanningStarted}
                startCamera={startCamera}
                stopCamera={stopCamera}
                data={dataScan}
              />
              <div className="flex flex-col mt-10 gap-2.5">
                <div className="flex flex-col">
                  <Typography weight="bold" size="text-xs">
                    Le scan ne marche pas ?
                  </Typography>
                  <Typography size="text-xs" color="black">
                    Saisissez le numéro de la déclaration
                  </Typography>
                </div>
                <LinkWithIcon
                  name="Saisir manuellement"
                  svgName="qrCode"
                  onClick={() => {
                    stopCamera();
                    router.push(RoutingAgent.qrCodeManuel);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <ModalResumeDeclaration
          open={openModalResumeDeclaration}
          onClose={() => setOpenModalResumeDeclaration(false)}
          templateRole="agent"
        />
      </MainAgent>
    </>
  );
};

export { HomepageAgentMobile };
