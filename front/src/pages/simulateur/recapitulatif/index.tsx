import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { TextLink } from '@/components/atoms/TextLink';
import { Typography } from '@/components/atoms/Typography';
import { ModalDeclareSimulation } from '@/components/organisms/ModalDeclareSimulation';
import { SummarySimulator } from '@/components/organisms/SummarySimulator';
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
  const [openModal, setOpenModal] = useState(false);

  const onDeclare = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (!simulatorResponse) {
      simulate();
    }
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withPrint
      linkButton={Routing.simulatorBasket}
    >
      <div className="flex flex-col gap-4 pb-4">
        <SummarySimulator
          simulatorRequest={simulatorRequest}
          simulatorResponse={simulatorResponse}
        />
        <div>
          <Typography weight="bold" color="secondary" lineHeight="leading-loose" tag="div">
            Merci d’avoir utilisé le simulateur !
          </Typography>
          <Typography color="secondary">
            Les informations sont fournies par le simulateur à titre indicatif.
          </Typography>
          <div className="mt-4">
            <div>
              Si vous ramenez ces produits en France, vous devrez vous rapprocher des{' '}
              <span
                onClick={() => router.push(`${Routing.faq}?id=16`)}
                className="cursor-pointer text-link underline"
              >
                services douaniers présents à votre arrivée pour les déclarer.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Button fullWidth onClick={onDeclare} disabled={!simulatorResponse?.canCreateDeclaration}>
            Je déclare
          </Button>
        </div>
        <div className="mb-2">
          <Link to={Routing.home}>
            <Button variant="outlined" fullWidth>
              Revenir à l’accueil
            </Button>
          </Link>
        </div>
        <Typography weight="bold" color="secondary">
          Des questions ?
        </Typography>
        <div className="flex flex-col gap-2">
          <TextLink underline to={`${Routing.faq}?id=payment-1`}>
            Pourquoi n’ai-je rien à payer ?
          </TextLink>
          <TextLink underline to={`${Routing.faq}?id=declaration-3`}>
            Pourquoi dois-je payer des droits et taxes ?
          </TextLink>
          <TextLink underline to={`${Routing.faq}?id=payment-4`}>
            Comment payer ce que je dois ?
          </TextLink>
          <TextLink underline to={`${Routing.faq}?id=declaration-3`}>
            Pourquoi dois-je passer au guichet Douane ?
          </TextLink>
        </div>
        <TextLink bold withArrow to={Routing.faq}>
          En savoir plus
        </TextLink>
      </div>
      <ModalDeclareSimulation open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};
export default simulator(Summary);
