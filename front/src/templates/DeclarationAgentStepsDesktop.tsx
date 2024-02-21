import { ReactNode } from 'react';

import classNames from 'classnames';
import { UseFormHandleSubmit } from 'react-hook-form';

import { MainAgentDesktop } from './MainAgentDesktop';
import { ProgressBarAgent } from '@/components/common/ProgressBarAgent';
import { ProgressBarAgentItemType } from '@/components/common/ProgressBarAgent/ProgressBarAgentItem';
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

const links: ProgressBarAgentItemType[] = [
  { name: 'Coordonnées', to: DECLARATION_STEP_PAGE[1] ?? '', stepNumber: 1 },
  { name: 'Transports', to: DECLARATION_STEP_PAGE[2] ?? '', stepNumber: 2 },
  { name: 'Marchandises', to: DECLARATION_STEP_PAGE[3] ?? '', stepNumber: 3 },
];

const DeclarationAgentStepsDesktop = ({
  children,
  currentStep,
  handleSubmit,
  onSubmit,
  simpleBg,
}: IMainProps) => {
  const showProgressBar = currentStep <= 3 && currentStep >= 1;

  return (
    <>
      <MainAgentDesktop
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        titleHeader="Créer une déclaration"
      >
        {showProgressBar && <ProgressBarAgent links={links} currentStep={currentStep} />}
      </MainAgentDesktop>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={classNames({
          'px-[126px]': true,
          'bg-white': simpleBg,
          'bg-secondary-bg': !simpleBg,
        })}
      >
        {children}
      </form>
    </>
  );
};

export { DeclarationAgentStepsDesktop };
