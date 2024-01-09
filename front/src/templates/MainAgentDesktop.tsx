import { ReactNode } from 'react';

import { NavBar } from '@/components/common/NavBar';
import { TitleAgent } from '@/components/common/TitleAgent';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

type IMainAgentDesktopProps = {
  meta: ReactNode;
  children: ReactNode;
  titleHeader?: string;
};

const MainAgentDesktop = ({ meta, children, titleHeader }: IMainAgentDesktopProps) => {
  return (
    <div className="h-full antialiased flex flex-col">
      {meta}

      <div className="pl-[103px] pr-20 border-b border-disabled-bg">
        <NavBar links={MAIN_MENU_AGENT_ITEMS} />
      </div>
      <div className="flex flex-col flex-1 px-[126px] py-[60px] gap-[30px]">
        {titleHeader && <TitleAgent title={titleHeader} textPosition="text-left" size="text-3xl" />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export { MainAgentDesktop };
