import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';
import { UseFormHandleSubmit } from 'react-hook-form';

import { Main } from './Main';
import { ProgressBarAgent } from '@/components/common/ProgressBarAgent';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { DECLARATION_STEP_PAGE } from '@/utils/const';

type IMainProps = {
  children: ReactNode;
  currentStep: number;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
};

export type ProgressBarAgentItemType = {
  name: string;
  to: string;
  step: number;
};

const links: ProgressBarAgentItemType[] = [
  { name: 'Coordonnées', to: DECLARATION_STEP_PAGE[1] ?? '', step: 1 },
  { name: 'Transports', to: DECLARATION_STEP_PAGE[2] ?? '', step: 2 },
  { name: 'Marchandises', to: DECLARATION_STEP_PAGE[3] ?? '', step: 3 },
  { name: 'Récapitulatif', to: DECLARATION_STEP_PAGE[4] ?? '', step: 4 },
];

const DeclarationSteps = ({ children, currentStep, handleSubmit, onSubmit }: IMainProps) => {
  const getMaximumStepAvailable = useStore((store) => store.getMaximumStepAvailable);
  const router = useRouter();

  const showProgressBar = currentStep <= 3 && currentStep >= 1;

  useEffect(() => {
    const maximumStepAvailable = getMaximumStepAvailable();

    const shouldRedirect =
      currentStep > 0 && maximumStepAvailable !== null && maximumStepAvailable < currentStep;

    if (shouldRedirect) {
      router.push(DECLARATION_STEP_PAGE[maximumStepAvailable] ?? '');
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
      withTitle
      titleValue={
        <>
          Simuler
          <br />
          mes achats
        </>
      }
      titleIcon="calculator"
    >
      <div>{showProgressBar && <ProgressBarAgent links={links} currentStep={currentStep} />}</div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        {children}
      </form>
    </Main>
  );
};

export { DeclarationSteps };
