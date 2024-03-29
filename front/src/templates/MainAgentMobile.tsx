import { ReactNode } from 'react';

import { TitleHeaderAgent } from '@/components/atoms/TitleHeaderAgent';
import { CustomHeader } from '@/components/molecules/CustomHeader';

type IMainAgentMobileProps = {
  meta: ReactNode;
  children: ReactNode;
  withHeader?: boolean;
  withPrint?: boolean;
  withCart?: boolean;
  withSearch?: boolean;
  withLogo?: boolean;
  titleHeader?: string;
  titleSwitchWordPosition?: number;
  linkSearch?: string;
  withTitle?: boolean;
  linkButton?: string;
  withPadding?: boolean;
};

const MainAgentMobile = ({
  children,
  meta,
  withHeader = false,
  withLogo = false,
  titleHeader,
  titleSwitchWordPosition,
  withTitle = false,
  withPadding = false,
  linkButton,
}: IMainAgentMobileProps) => {
  return (
    <div className="h-full antialiased">
      {meta}

      <div className={withHeader || withTitle ? 'flex min-h-[calc(100%)] flex-col' : ''}>
        {withHeader && (
          <CustomHeader withLogo={withLogo} title={titleHeader} templateRole="agent" />
        )}
        {withTitle && (
          <div className="p-4 pt-0">
            <TitleHeaderAgent
              title={titleHeader || ''}
              href={linkButton}
              switchWordPosition={titleSwitchWordPosition}
            />
          </div>
        )}
        {withPadding ? <div className="px-4">{children}</div> : children}
      </div>
    </div>
  );
};

export { MainAgentMobile };
