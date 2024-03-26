import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { HomepageAgentDesktop } from '@/templates/HomepageAgentDesktop';
import { HomepageAgentMobile } from '@/templates/HomepageAgentMobile';
import { TailwindDefaultScreenSize } from '@/utils/enums';

const Index = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });

  return <AgentRoute>{isMobile ? <HomepageAgentMobile /> : <HomepageAgentDesktop />}</AgentRoute>;
};

export default Index;
