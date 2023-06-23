import { ReactNode } from 'react';

import classNames from 'classnames';
import { UseFormHandleSubmit } from 'react-hook-form';

import { MainAgent } from './MainAgent';
import { ProgressBarAgent } from '@/components/common/ProgressBarAgent';
import { Meta } from '@/layout/Meta';
import { DECLARATION_STEP_PAGE } from '@/utils/const';

type IMainProps = {
  children: ReactNode;
  currentStep: number;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
  simpleBg?: boolean;
  linkButton?: string;
};

export type ProgressBarAgentItemType = {
  name: string;
  to: string;
  stepNumber: number;
};

const links: ProgressBarAgentItemType[] = [
  { name: 'Coordonnées', to: DECLARATION_STEP_PAGE[1] ?? '', stepNumber: 1 },
  { name: 'Transports', to: DECLARATION_STEP_PAGE[2] ?? '', stepNumber: 2 },
  { name: 'Marchandises', to: DECLARATION_STEP_PAGE[3] ?? '', stepNumber: 3 },
];

const DeclarationSteps = ({
  children,
  currentStep,
  handleSubmit,
  onSubmit,
  simpleBg,
  linkButton,
}: IMainProps) => {
  const showProgressBar = currentStep <= 3 && currentStep >= 1;

  return (
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withTitle
      titleHeader="Créer une déclaration"
      linkButton={linkButton}
    >
      {showProgressBar && (
        <div className="px-4">
          <ProgressBarAgent links={links} currentStep={currentStep} />
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames({
          'flex flex-1 flex-col h-full p-4 mt-4': true,
          'bg-white': simpleBg,
          'bg-secondary-100': !simpleBg,
        })}
      >
        {children}
      </form>
    </MainAgent>
  );
};

export { DeclarationSteps };
