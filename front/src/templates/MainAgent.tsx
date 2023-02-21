import { ReactNode } from 'react';

import { CustomHeader } from '@/components/autonomous/CustomHeader';
import { SvgNames } from '@/components/common/SvgIcon';
import { TitleHeader } from '@/components/common/TitleHeader';

type IMainAgentProps = {
  meta: ReactNode;
  children: ReactNode;
  withHeader?: boolean;
  withPrint?: boolean;
  withCart?: boolean;
  withSearch?: boolean;
  withLogo?: boolean;
  titleHeader?: string;
  linkSearch?: string;
  withTitle?: boolean;
  titleValue?: React.ReactNode;
  titleIcon?: SvgNames;
};

const MainAgent = ({
  children,
  meta,
  withHeader = false,
  withLogo = false,
  titleHeader,
  withTitle = false,
  titleValue,
  titleIcon,
}: IMainAgentProps) => {
  return (
    <div className="h-full antialiased">
      {meta}

      <div className="flex min-h-[calc(100%-74px)] flex-col gap-6 p-4">
        {withHeader && <CustomHeader withLogo={withLogo} title={titleHeader} />}
        {withTitle && <TitleHeader title={titleValue} icon={titleIcon} />}
        {children}
      </div>
    </div>
  );
};

export { MainAgent };
