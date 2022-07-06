import { ReactNode } from 'react';

import { UseFormHandleSubmit } from 'react-hook-form';

import { Main } from './Main';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Meta } from '@/layout/Meta';

type IMainProps = {
  children: ReactNode;
  fromProgression?: number;
  toProgression: number;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => void;
};

const ConfigurationSteps = ({
  children,
  fromProgression,
  toProgression,
  handleSubmit,
  onSubmit,
}: IMainProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
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
        <div className="absolute inset-x-0 top-0 h-auto w-full">
          <ProgressBar from={fromProgression} to={toProgression} />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        {children}
      </form>
    </Main>
  );
};

export { ConfigurationSteps };
