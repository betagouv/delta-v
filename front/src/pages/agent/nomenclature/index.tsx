import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { AgentNomenclaturePageDesktop } from '@/templates/AgentNomenclaturePageDesktop';
import NomenclatureAgentMobile from '@/templates/NomenclatureAgentMobile';
import { TailwindDefaultScreenSize } from '@/utils/enums';

const Index = () => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });

  return (
    <AgentRoute>
      {isMobile ? <NomenclatureAgentMobile /> : <AgentNomenclaturePageDesktop />}
    </AgentRoute>
  );
};

export default Index;
