import { useEffect } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { SummarySimulator } from '@/components/business/summarySimulator';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';
import { Routing } from '@/utils/const';

export interface FormUpdateShoppingProduct {
  name?: string;
  value: number;
  devise: string;
}

const Summary = () => {
  const router = useRouter();
  const { simulate, simulatorRequest, simulatorResponse } = useStore(
    (state) => ({
      simulate: state.simulate,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      simulatorResponse: state.simulator.appState.simulatorResponse,
    }),
    shallow,
  );

  useEffect(() => {
    if (!simulatorResponse) {
      simulate();
    }
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
    >
      <div className="flex flex-col gap-4 pb-4">
        <SummarySimulator
          simulatorRequest={simulatorRequest}
          simulatorResponse={simulatorResponse}
        />
        <div>
          <Typography weight="bold" color="secondary" lineHeight="leading-loose">
            Merci d’avoir utilisé le simulateur !
          </Typography>
          <Typography color="secondary">
            Les informations sont fournies par
            <br />
            le simulateur à titre indicatif.
          </Typography>
          <div className="mt-4">
            <div>
              Pour procéder à votre déclaration
              <br />
              rapprochez-vous{' '}
              <span
                onClick={() => router.push(`${Routing.faq}?id=16`)}
                className="cursor-pointer text-link underline"
              >
                des agents douaniers lors de votre passage de la frontière.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Link to={Routing.home}>
            <Button fullWidth>Revenir à l’accueil</Button>
          </Link>
        </div>
        <div className="mb-2">
          <Link to={Routing.simulator}>
            <Button variant="outlined" fullWidth>
              Nouvelle simulation
            </Button>
          </Link>
        </div>
        <Typography weight="bold" color="secondary">
          Des questions ?
        </Typography>
        <div className="flex flex-col gap-2">
          <Link to={`${Routing.faq}?id=17`}>
            <Typography underline color="link">
              Pourquoi n’ai-je rien à payer ?
            </Typography>
          </Link>
          <Link to={`${Routing.faq}?id=3`}>
            <Typography underline color="link">
              Pourquoi dois-je payer des droits et taxes ?
            </Typography>
          </Link>
          <Link to={`${Routing.faq}?id=7`}>
            <Typography underline color="link">
              Comment payer ce que je dois ?
            </Typography>
          </Link>
          <Link to={`${Routing.faq}?id=3`}>
            <Typography underline color="link">
              Pourquoi dois-je passer au guichet Douane ?
            </Typography>
          </Link>
        </div>
        <Link to={Routing.faq}>
          <Typography tag="div" weight="bold" color="link">
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
