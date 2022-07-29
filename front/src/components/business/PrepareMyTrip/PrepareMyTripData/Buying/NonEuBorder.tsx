import { useState } from 'react';

import { useRouter } from 'next/router';

import Kid from '@/assets/images/Kid.jpg';
import { ModalResumeSimulator } from '@/components/autonomous/ModalResumeSimulator';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { useStore } from '@/stores/store';
import { Routing } from '@/utils/const';
import { getLevelWithData } from '@/utils/simulator';

export const NonEuBorder: React.FC = () => {
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
      <div className="-mt-3">
        <Typography
          size="text-sm"
          italic
          color="middle-gray"
          textPosition="text-center"
          weight="light"
        >
          Si vous êtes en dessous de ce montant, vous n'aurez rien à payer.
        </Typography>
      </div>
      <div className="flex flex-col gap-5 px-8">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-24 p-4">
              <img src={Kid.src} className="h-auto w-full" />
            </div>
            <div className="w-20">
              <Typography
                weight="bold"
                color="secondary"
                textPosition="text-center"
                lineHeight="leading-4"
              >
                Moins de 15ans
              </Typography>
            </div>
          </div>
          <div className="border-r" />
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-16 flex-row items-center">
                <div className="h-8 w-16">
                  <SvgIcon name="money" />
                </div>
              </div>
              <div className="w-20 text-center leading-4">
                Franchise de <span className="font-bold">40 €</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b" />
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="m-2 h-20 w-auto p-4">
              <SvgIcon name="traveler" />
            </div>
            <div className="w-20">
              <Typography
                weight="bold"
                color="secondary"
                textPosition="text-center"
                lineHeight="leading-4"
              >
                Plus de 15ans
              </Typography>
            </div>
          </div>
          <div className="border-r" />
          <div className="flex flex-col">
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-16 flex-row items-center">
                <div className="h-8 w-16">
                  <SvgIcon name="money" />
                </div>
              </div>
              <div className="w-20 text-center leading-4">
                Franchise de <span className="font-bold">75 €</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b" />
      </div>
      <div className="mt-6">
        <Typography size="text-lg" weight="bold" color="secondary" textPosition="text-center">
          Franchise en volume
        </Typography>
      </div>
      <div className="-mt-3">
        <Typography
          size="text-sm"
          italic
          color="middle-gray"
          textPosition="text-center"
          weight="light"
        >
          Vous ne pourrez pas rammener une quantité de marchandise supérieur à la franchise.
        </Typography>
      </div>
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
        <div className="mt-6 flex flex-row">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-auto">
              <SvgIcon name="pet" />
            </div>
            <label className="w-28 text-center">Animaux de compagnie</label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-auto">
              <SvgIcon name="categoryFood" />
            </div>
            <label className="w-28 text-center">Alimentation</label>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-auto">
              <SvgIcon name="medication" />
            </div>
            <label className="w-28 text-center">Médicaments</label>
          </div>
        </div>
        <div className="mt-4 flex flex-row">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-auto">
              <SvgIcon name="car" />
            </div>
            <label className="w-28 text-center">Véhicule personnel</label>
          </div>
        </div>
      </div>
      <button
        onClick={openSimulator}
        className="my-2 inline-flex w-fit flex-row-reverse place-content-center items-center rounded-full border border-primary-600 bg-white px-4 py-2.5 text-sm font-normal text-primary-600 shadow-sm focus:outline-none active:border-primary-500 active:bg-gray-300 active:text-primary-500 disabled:bg-white disabled:text-primary-600"
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
