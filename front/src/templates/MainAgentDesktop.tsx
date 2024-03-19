import { ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { NavBar } from '@/components/common/NavBar';
import { TitleAgent } from '@/components/common/TitleAgent';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

type IMainAgentDesktopProps = {
  meta: ReactNode;
  children: ReactNode;
  titleHeader?: string;
};

const MainAgentDesktop = ({ meta, children, titleHeader }: IMainAgentDesktopProps) => {
  const router = useRouter();
  const path = router.pathname;
  const [contentWidth, setContentWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setContentWidth(document.getElementById('agentDesktopContent')?.offsetWidth);
  }, []);
  return (
    <div className="antialiased flex flex-col" id="agentDesktopHeader">
      {meta}

      <div className="flex place-content-center pl-[103px] pr-20 border-b border-disabled-bg">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} activePath={path} width={contentWidth} />
      </div>
      <div
        className="container py-5 flex flex-col flex-1 px-[126px] pt-[60px] gap-[30px]"
        id="agentDesktopContent"
      >
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
