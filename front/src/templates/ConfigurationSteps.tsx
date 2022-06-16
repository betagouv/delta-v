import { ReactNode } from 'react';

import { Main } from './Main';
import { Header } from '@/components/business/header';
import { ProgressBar } from '@/components/common/ProgressBar';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Meta } from '@/layout/Meta';

type IMainProps = {
  children: ReactNode;
  progression: number;
};

const ConfigurationSteps = (props: IMainProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="absolute inset-x-0 top-0 h-auto w-full">
        <ProgressBar progression={props.progression} />
      </div>
      <div className="mb-8 flex flex-col gap-6">
        <Header />
        <TitleHeader
          title={
            <>
              Simuler
              <br />
              mes achats
            </>
          }
          icon="calculator"
        />
      </div>
      {props.children}
    </Main>
  );
};

export { ConfigurationSteps };
