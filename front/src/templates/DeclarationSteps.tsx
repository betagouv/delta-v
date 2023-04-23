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
  toProgression: number;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
};

export type ProgressLinkType = {
  name: string;
  to: string;
  step: number;
};

const links: ProgressLinkType[] = [
  { name: 'Coordonnées', to: DECLARATION_STEP_PAGE[1] ?? '', step: 1 },
  { name: 'Transports', to: DECLARATION_STEP_PAGE[2] ?? '', step: 2 },
  { name: 'Marchandises', to: DECLARATION_STEP_PAGE[3] ?? '', step: 3 },
  { name: 'Récapitulatif', to: DECLARATION_STEP_PAGE[4] ?? '', step: 4 },
];

const DeclarationSteps = ({ children, toProgression, handleSubmit, onSubmit }: IMainProps) => {
  const shouldRedirectToAnotherStep = useStore((store) => store.shouldRedirectToAnotherStep);
  const router = useRouter();

  const showProgressBar = toProgression <= 5 && toProgression >= 1;

  useEffect(() => {
    const [shouldRedirect, redirectToStep] = shouldRedirectToAnotherStep();

    if (
      toProgression > 0 &&
      shouldRedirect &&
      redirectToStep !== null &&
      redirectToStep < toProgression
    ) {
      router.push(DECLARATION_STEP_PAGE[redirectToStep] ?? '');
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
      <div>
        <div className="">
          {showProgressBar && <ProgressBarAgent links={links} stepNumber={toProgression} />}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        {children}
      </form>
    </Main>
  );
};

export { DeclarationSteps };
