import { useEffect } from 'react';

import shallow from 'zustand/shallow';

import { Header } from '@/components/business/header';
import { QrcodeBlock } from '@/components/business/qrcodeBlock';
import { SummarySimulator } from '@/components/business/summarySimulator';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

export interface FormUpdateShoppingProduct {
  name?: string;
  price: number;
  devise: string;
}

const Summary = () => {
  const { simulate, simulatorRequest, simulatorResponse } = useStore(
    (state) => ({
      simulate: state.simulate,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      simulatorResponse: state.simulator.appState.simulatorResponse,
    }),
    shallow,
  );

  useEffect(() => {
    simulate();
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex flex-col gap-4 pb-4">
        <Header />
        <SummarySimulator
          simulatorRequest={simulatorRequest}
          simulatorResponse={simulatorResponse}
        />
        <Link to="/simulateur/recapitulatif/qrcode">
          <QrcodeBlock />
        </Link>
        <Typography weight="bold" color="secondary">
          Des questions ?
        </Typography>
        <div className="flex flex-col gap-2">
          <Link to="/">
            <Typography underline color="link">
              Pourquoi n’ai-je rien à payer ?
            </Typography>
          </Link>
          <Link to="/">
            <Typography underline color="link">
              Pourquoi dois-je payer des droits et taxes ?
            </Typography>
          </Link>
          <Link to="/">
            <Typography underline color="link">
              Comment payer ce que je dois ?
            </Typography>
          </Link>
          <Link to="/">
            <Typography underline color="link">
              Pourquoi dois-je passer au guichet Douane ?
            </Typography>
          </Link>
        </div>
        <Link to="/">
          <Typography weight="bold" color="link">
            <div className="flex flex-row">
              En savoir plus
              <div className="ml-1 h-3.5 w-3.5">
                <Icon name="arrow-right" />
              </div>
            </div>
          </Typography>
        </Link>
      </div>
    </Main>
  );
};
export default simulator(Summary);
