import { Alpha2Code } from 'i18n-iso-countries';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { ProductSearchBarStyle } from '@/components/business/ProductSearchTools/enum';
import { ProductSearchBarMobile } from '@/components/business/ProductSearchTools/mobile';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const NomenclatureAgentMobile = () => {
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
      >
        <ProductSearchBarMobile variant={ProductSearchBarStyle.NOMENCLATURE} />
      </MainAgent>
    </AgentRoute>
  );
};

export default NomenclatureAgentMobile;
