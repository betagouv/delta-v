import { ReactNode } from 'react';

import { MainAgentDesktop } from './MainAgentDesktop';
import { MainAgentMobile } from './MainAgentMobile';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';

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
  withPadding?: boolean;
  isMobile?: boolean;
};

const MainAgent = ({
  children,
  meta,
  withHeader = false,
  withLogo = false,
  titleHeader,
  withTitle = false,
  withPadding = false,
  linkButton,
  isMobile = true,
}: IMainAgentProps) => {
  return (
    <AgentRoute>
      {isMobile ? (
        <MainAgentMobile
          children={children}
          meta={meta}
          withHeader={withHeader}
          withLogo={withLogo}
          titleHeader={titleHeader}
          withTitle={withTitle}
          withPadding={withPadding}
          linkButton={linkButton}
        />
      ) : (
        <MainAgentDesktop children={children} meta={meta} titleHeader={titleHeader} />
      )}
    </AgentRoute>
  );
};

export { MainAgent };
