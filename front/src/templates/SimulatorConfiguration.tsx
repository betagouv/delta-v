import { ReactNode } from 'react';

import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

type SimulatorConfigurationProps = {
  children: ReactNode;
};

const SimulatorConfiguration = ({ children }: SimulatorConfigurationProps) => {
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex flex-col gap-6 px-4 py-8">
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
        {children}
      </div>
    </Main>
  );
};

export default SimulatorConfiguration;
