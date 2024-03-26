import { ReactNode, useEffect, useState } from 'react';

import classNames from 'classnames';
import { UseFormHandleSubmit } from 'react-hook-form';

import { MainAgentDesktop } from './MainAgentDesktop';
import { ProgressBarAgent } from '@/components/molecules/ProgressBarAgent';
import { ProgressBarAgentItemType } from '@/components/molecules/ProgressBarAgent/types';
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

  const [headerHeight, setHeaderHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    setHeaderHeight(document.getElementById('agentDesktopHeader')?.offsetHeight);
  }, []);

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
          'bg-white': simpleBg,
          'bg-secondary-bg': !simpleBg,
        })}
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="container max-w-[1052px]">{children}</div>
      </form>
    </>
  );
};

export { DeclarationAgentStepsDesktop };
