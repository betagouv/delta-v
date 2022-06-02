import { ReactNode } from 'react';

import { Main } from './Main';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { ProgressBar } from '@/components/common/ProgressBar';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';

type IMainProps = {
  children: ReactNode;
  progression: number;
};

const ConfigurationSteps = (props: IMainProps) => (
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
      <Link back>
        <div className="flex flex-row items-end">
          <div className="mr-4 h-5 w-5">
            <Icon name="chevron-thin-left" />
          </div>
          <Typography> Retour</Typography>
        </div>
      </Link>
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

export { ConfigurationSteps };
