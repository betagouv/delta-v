import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { HomepageAgentDesktop } from '@/templates/HomepageAgentDesktop';
import { HomepageAgentMobile } from '@/templates/HomepageAgentMobile';

const Index = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1121px)',
  });

  return (
    <AgentRoute>
      {isDesktopOrLaptop ? <HomepageAgentDesktop /> : <HomepageAgentMobile />}
    </AgentRoute>
  );
};

export default Index;
