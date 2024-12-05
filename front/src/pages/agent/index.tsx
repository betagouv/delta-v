import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { useAgentConnectLogoutMutation } from '@/api/hooks/useAPIAuth';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { HomepageAgentDesktop } from '@/templates/HomepageAgentDesktop';
import { HomepageAgentMobile } from '@/templates/HomepageAgentMobile';
import { TailwindDefaultScreenSize } from '@/utils/enums';

const Index = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });

  const agentConnectLogoutMutation = useAgentConnectLogoutMutation({});

  const handleLogout = () => {
    agentConnectLogoutMutation.mutate();
  };

  return (
    <AgentRoute>
      {isMobile ? (
        <HomepageAgentMobile handleLogout={handleLogout} />
      ) : (
        <HomepageAgentDesktop handleLogout={handleLogout} />
      )}
    </AgentRoute>
  );
};

export default Index;
