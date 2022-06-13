import { ReactNode } from 'react';

import { Main } from './Main';
import { BackButton } from '@/components/common/BackButton';
import { ProgressBar } from '@/components/common/ProgressBar';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
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
      <div className="absolute top-0 h-auto w-full">
        <ProgressBar progression={props.progression} />
      </div>
      <div className="flex flex-col gap-6 px-4 py-8">
        <BackButton />
        <div className="flex flex-row gap-2">
          <div>
            <SvgIcon name="calculator" />
          </div>
          <div className="mt-3">
            <Typography weight="bold" variant="h1" tag="h1" color="secondary">
              Simuler
              <br />
              mes achats
            </Typography>
          </div>
        </div>
        {props.children}
      </div>
    </Main>
  );
};

export { ConfigurationSteps };
