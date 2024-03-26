import { useState } from 'react';

import { useRouter } from 'next/router';

import Kid from '@/assets/images/Kid.jpg';
import TravelerPlaneBoat from '@/assets/images/Traveler-plane-boat.jpg';
import TravelerTrainCar from '@/assets/images/Traveler-train-car.jpg';
import { Typography } from '@/components/atoms/Typography';
import { SvgIcon } from '@/components/molecules/SvgIcon';
import { ModalResumeSimulator } from '@/components/organisms/ModalResumeSimulator';
import { useStore } from '@/stores/store';
import { Routing } from '@/utils/const';
import { getLevelWithData } from '@/utils/simulator';

export const NonEu: React.FC = () => {
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
        Produits normaux
      </Typography>
      <div className="-mt-3">
        <Typography
          size="text-sm"
          italic
          color="middle-gray"
          textPosition="text-center"
          weight="light"
        >
          Selon votre âge et votre moyen de transport, la limite à partir de laquelle vous devrez
          payer des droits et taxes varie
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
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-16 flex-row items-center">
              <div className="h-8 w-16">
                <SvgIcon name="money" />
              </div>
            </div>
            <div className="w-20 text-center leading-4">
              Seuil de <br />
              <span className="font-bold">150 €</span>
            </div>
          </div>
        </div>
        <div className="border-b" />
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-24">
              <img src={TravelerPlaneBoat.src} className="h-auto w-full" />
            </div>
            <div className="w-24 text-center leading-4">
              <span className="font-bold">Plus de 15 ans</span> en{' '}
              <span className="font-bold">avion</span> ou <span className="font-bold">bateau</span>
            </div>
          </div>
          <div className="border-r" />
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-16 flex-row items-center">
              <div className="h-8 w-16">
                <SvgIcon name="money" />
              </div>
            </div>
            <div className="w-20 text-center leading-4">
              Seuil de <span className="font-bold">430 €</span>
            </div>
          </div>
        </div>
        <div className="border-b" />
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="h-20 w-24 p-2">
              <img src={TravelerTrainCar.src} className="h-auto w-full" />
            </div>
            <div className="w-20">
              <Typography
                weight="bold"
                color="secondary"
                textPosition="text-center"
                lineHeight="leading-4"
              >
                Plus de 15 ans autres moyens de transports
              </Typography>
            </div>
          </div>
          <div className="border-r" />
          <div className="flex flex-col items-center">
            <div className="flex h-20 w-16 flex-row items-center">
              <div className="h-8 w-16">
                <SvgIcon name="money" />
              </div>
            </div>
            <div className="w-20 text-center leading-4">
              Seuil de <span className="font-bold">300 €</span>
            </div>
          </div>
        </div>
        <div className="border-b" />
      </div>
      <div className="mt-6">
        <Typography size="text-lg" weight="bold" color="secondary" textPosition="text-center">
          Produits spécifiques
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
          Les produits suivants sont soumis à une réglementation particulière.
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
        Utilisez notre simulateur
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
