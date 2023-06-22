import { ReactNode } from 'react';

import { CustomHeader } from '@/components/autonomous/CustomHeader';
import { TitleHeaderAgent } from '@/components/common/TitleHeaderAgent';

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
  linkButton?: string;
};

const MainAgent = ({
  children,
  meta,
  withHeader = false,
  withLogo = false,
  titleHeader,
  withTitle = false,
  linkButton,
}: IMainAgentProps) => {
  return (
    <div className="h-full antialiased">
      {meta}

      <div className={withHeader || withTitle ? 'flex min-h-[calc(100%)] flex-col' : ''}>
        {withHeader && <CustomHeader withLogo={withLogo} title={titleHeader} />}
        {withTitle && <TitleHeaderAgent title={titleHeader || ''} href={linkButton} />}
        {children}
      </div>
    </div>
  );
};

export { MainAgent };
