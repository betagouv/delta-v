import { ReactNode } from 'react';

import { MENU_ITEMS } from './const';
import { Header } from '@/components/business/header';
import { SvgNames } from '@/components/common/SvgIcon';
import { TabBar } from '@/components/common/TabBar';
import { TitleHeader } from '@/components/common/TitleHeader';

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
}: IMainProps) => (
  <div className="antialiased">
    {meta}

    <div className="flex min-h-screen flex-col gap-6 p-4  pb-[90px]">
      {withHeader && <Header withCart={withCart} withSearch={withSearch} linkSearch={linkSearch} />}
      {withTitle && <TitleHeader title={titleValue} icon={titleIcon} />}
      {children}
    </div>
    <TabBar items={MENU_ITEMS} />
  </div>
);

export { Main };
