import { ReactNode } from 'react';

import { MENU_ITEMS } from './const';
import { TabBar } from '@/components/common/TabBar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased">
    {props.meta}

    <div className="flex min-h-screen flex-col p-4 pb-[90px]">{props.children}</div>
    <TabBar items={MENU_ITEMS} />
  </div>
);

export { Main };
