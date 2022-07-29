import { useState } from 'react';

import { useRouter } from 'next/router';

import { ModalResumeSimulator } from '@/components/autonomous/ModalResumeSimulator';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { useStore } from '@/stores/store';
import { Routing } from '@/utils/const';
import { getLevelWithData } from '@/utils/simulator';

export const Eu: React.FC = () => {
  const [openModalResumeSimulator, setOpenModalResumeSimulator] = useState<boolean>(false);
  const router = useRouter();

  const { simulatorRequest } = useStore((state) => ({
    simulatorRequest: state.simulator.appState.simulatorRequest,
  }));
  const openSimulator = () => {
    if (getLevelWithData(simulatorRequest) === 1) {
      router.push(Routing.simulator);
    } else {
      setOpenModalResumeSimulator(true);
    }
  };
  return (
    <>
      <Typography size="text-lg" weight="bold" color="secondary" textPosition="text-center">
        Franchise en valeur
      </Typography>
      <Typography size="text-sm" italic color="secondary" textPosition="text-center">
        Si vous êtes en dessous de ce montant, vous n'aurez rien à payer.
      </Typography>
      <div className="mt-6 flex flex-row">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-auto pr-4">
            <SvgIcon name="completeBasket" />
          </div>
          <label className="w-28 text-center">
            Achat à <span className="font-bold">usage personnel</span>
          </label>
        </div>
        <div className="mx-2 mt-8 h-7 w-auto">
          <SvgIcon name="bigArrowRight" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 items-center">
            <div className="mt-4 flex h-10 w-auto items-center">
              <SvgIcon name="traveler" />
            </div>
          </div>
          <label className="w-28 text-center">Rien à déclarer</label>
        </div>
      </div>
      <Typography color="secondary" textPosition="text-center" lineHeight="leading-4">
        En effet la TVA est payée directement dans le pays UE d’achat du produit.
      </Typography>
      <div className="mt-6">
        <Typography size="text-lg" weight="bold" color="secondary" textPosition="text-center">
          Franchise en volume
        </Typography>
      </div>
      <Typography size="text-sm" italic color="secondary" textPosition="text-center">
        Vous ne pourrez pas rammener une quantité de marchandise supérieur à la franchise.
      </Typography>

      <div className="mt-2 flex w-full flex-col items-center">
        <div className="flex flex-row">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-auto items-center">
              <SvgIcon name="categoryCigarette" />
            </div>
            <label className="w-28 text-center">Tabac</label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-auto items-center">
              <SvgIcon name="categoryAlcohol" />
            </div>
            <label className="w-28 text-center">Alcool</label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-auto items-center">
              <SvgIcon name="plants" />
            </div>
            <label className="w-28 text-center">Végétaux</label>
          </div>
        </div>
        <div className="mt-4 flex flex-row">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-auto">
              <SvgIcon name="medication" />
            </div>
            <label className="w-28 text-center">Médicaments</label>
          </div>
        </div>
      </div>
      <button
        onClick={openSimulator}
        className="inline-flex w-fit flex-row-reverse place-content-center items-center rounded-full border border-primary-600 bg-white px-4 py-2.5 text-sm font-normal text-primary-600 shadow-sm focus:outline-none active:border-primary-500 active:bg-gray-300 active:text-primary-500 disabled:bg-white disabled:text-primary-600"
      >
        Simuler vos achats dès maintenant
        <div className="mr-2 flex h-6 items-center">
          <SvgIcon name="calculator" />
        </div>
      </button>
      <ModalResumeSimulator
        open={openModalResumeSimulator}
        onClose={() => setOpenModalResumeSimulator(false)}
        simulatorRequest={simulatorRequest}
      />
    </>
  );
};
