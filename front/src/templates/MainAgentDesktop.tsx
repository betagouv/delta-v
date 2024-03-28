import { ReactNode } from 'react';

import { useRouter } from 'next/router';

import { TitleAgent } from '@/components/atoms/TitleAgent';
import { NavBar } from '@/components/molecules/NavBar';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

type IMainAgentDesktopProps = {
  meta: ReactNode;
  children: ReactNode;
  titleHeader?: string;
};

const MainAgentDesktop = ({ meta, children, titleHeader }: IMainAgentDesktopProps) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <div className="antialiased flex flex-col" id="agentDesktopHeader">
      {meta}

      <div className="flex place-content-center border-b border-disabled-bg">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} activePath={path} />
      </div>
      <div className="container py-5 flex flex-col flex-1 pt-[60px] gap-[30px] max-w-[1052px] px-2.5">
        {titleHeader && (
          <TitleAgent
            title={titleHeader}
            textPosition="text-left"
            size="text-3xl"
            fontFamily="marianne"
          />
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export { MainAgentDesktop };
