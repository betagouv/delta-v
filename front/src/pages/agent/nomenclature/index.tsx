import { Alpha2Code } from 'i18n-iso-countries';
import { useMediaQuery } from 'react-responsive';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { NomenclaturePageDesktop } from '@/templates/NomenclaturePageDesktop';
import { NomenclaturePageAgentMobile } from '@/templates/NomenclaturePageMobile';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Nomenclature = () => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        withPadding
        titleHeader="Nomenclature"
        isMobile={isMobile}
      >
        {isMobile ? <NomenclaturePageAgentMobile /> : <NomenclaturePageDesktop />}
      </MainAgent>
    </AgentRoute>
  );
};

export default Nomenclature;
