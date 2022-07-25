import { ReactNode, useState } from 'react';

import { useRouter } from 'next/router';

import { MENU_ITEMS, Routing } from '../utils/const';
import { ModalResumeSimulator } from '@/components/autonomous/ModalResumeSimulator';
import { Header } from '@/components/business/header';
import { SvgNames } from '@/components/common/SvgIcon';
import { TabBar } from '@/components/common/TabBar';
import { TitleHeader } from '@/components/common/TitleHeader';
import { useStore } from '@/stores/store';
import { getLevelWithData } from '@/utils/simulator';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  withHeader?: boolean;
  withCart?: boolean;
  withSearch?: boolean;
  linkSearch?: string;
  withTitle?: boolean;
  titleValue?: React.ReactNode;
  titleIcon?: SvgNames;
};

const Main = ({
  children,
  meta,
  withHeader = false,
  withCart = false,
  withSearch = false,
  linkSearch,
  withTitle = false,
  titleValue,
  titleIcon = 'calculator',
}: IMainProps) => {
  const [openModalResumeSimulator, setOpenModalResumeSimulator] = useState<boolean>(false);
  const router = useRouter();

  const { simulatorRequest } = useStore((state) => ({
    simulatorRequest: state.simulator.appState.simulatorRequest,
  }));

  const openSimulator = () => {
    if (getLevelWithData(simulatorRequest) === 1) {
      router.push(Routing.simulator);
    }
    setOpenModalResumeSimulator(true);
  };
  return (
    <div className="h-full antialiased">
      {meta}

      <div className="flex min-h-[calc(100%-74px)] flex-col gap-6 p-4">
        {withHeader && (
          <Header withCart={withCart} withSearch={withSearch} linkSearch={linkSearch} />
        )}
        {withTitle && <TitleHeader title={titleValue} icon={titleIcon} />}
        {children}
      </div>
      <TabBar items={MENU_ITEMS} openSimulator={openSimulator} />
      <ModalResumeSimulator
        open={openModalResumeSimulator}
        onClose={() => setOpenModalResumeSimulator(false)}
        simulatorRequest={simulatorRequest}
      />
    </div>
  );
};

export { Main };
