import { ReactNode, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { MENU_ITEMS, Routing } from '../utils/const';
import { CustomHeader } from '@/components/autonomous/CustomHeader';
import { ModalResumeDeclaration } from '@/components/autonomous/ModalResumeDeclaration';
import { ModalResumeSimulator } from '@/components/autonomous/ModalResumeSimulator';
import { SvgNames } from '@/components/common/SvgIcon';
import { TabBar } from '@/components/common/TabBar';
import { TitleHeader } from '@/components/common/TitleHeader';
import { useStore } from '@/stores/store';
import { getLevelWithData as getDeclarationLevelWithData } from '@/utils/declaration';
import { getLevelWithData } from '@/utils/simulator';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  withHeader?: boolean;
  withPrint?: boolean;
  withCart?: boolean;
  withSearch?: boolean;
  linkSearch?: string;
  withTitle?: boolean;
  withLogo?: boolean;
  titleValue?: React.ReactNode;
  titleIcon?: SvgNames;
  linkButton?: string;
  method?: 'declaration' | 'simulateur';
  onClickBack?: () => void;
};

const Main = ({
  children,
  meta,
  withHeader = false,
  withPrint = false,
  withCart = false,
  withSearch = false,
  withLogo = false,
  linkSearch,
  withTitle = false,
  onClickBack,
  method,
  titleValue,
  titleIcon,
  linkButton,
}: IMainProps) => {
  const [openModalResumeSimulator, setOpenModalResumeSimulator] = useState<boolean>(false);
  const [openModalResumeDeclaration, setOpenModalResumeDeclaration] = useState<boolean>(false);
  const router = useRouter();

  const { simulatorRequest, declarationRequest } = useStore(
    (state) => ({
      simulatorRequest: state.simulator.appState.simulatorRequest,
      declarationRequest: state.declaration.appState.declarationRequest,
    }),
    shallow,
  );

  const openSimulator = () => {
    if (getLevelWithData(simulatorRequest) === 1) {
      router.push(Routing.simulator);
    } else {
      setOpenModalResumeSimulator(true);
    }
  };

  const openDeclaration = () => {
    if (getDeclarationLevelWithData(declarationRequest) === 1) {
      router.push(Routing.createDeclaration);
    } else {
      setOpenModalResumeDeclaration(true);
    }
  };
  return (
    <div className="h-full antialiased">
      {meta}

      <div className="flex min-h-[calc(100%-72px)] flex-col gap-6 p-4">
        {withHeader && (
          <CustomHeader
            withCart={withCart}
            withSearch={withSearch}
            linkSearch={linkSearch}
            withPrint={withPrint}
            withLogo={withLogo}
            linkButton={linkButton}
            method={method}
            onClick={onClickBack}
          />
        )}
        {withTitle && <TitleHeader title={titleValue} icon={titleIcon} />}
        {children}
      </div>
      <div className="h-[72px]" />
      <TabBar items={MENU_ITEMS} openSimulator={openSimulator} openDeclaration={openDeclaration} />
      <ModalResumeSimulator
        open={openModalResumeSimulator}
        onClose={() => setOpenModalResumeSimulator(false)}
        simulatorRequest={simulatorRequest}
      />
      <ModalResumeDeclaration
        open={openModalResumeDeclaration}
        onClose={() => setOpenModalResumeDeclaration(false)}
        templateRole="user"
      />
    </div>
  );
};

export { Main };
