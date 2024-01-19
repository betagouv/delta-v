import { MainAgentDesktop } from './MainAgentDesktop';
import { ProductSearchTools } from '@/components/business/ProductSearchTools/desktop';
import { ProductSearchBarStyle } from '@/components/business/ProductSearchTools/enum';
import { MAIN_MENU_AGENT_ITEMS } from '@/utils/const';

const AgentNomenclaturePageDesktop = () => {
  return (
    <MainAgentDesktop navbarItems={MAIN_MENU_AGENT_ITEMS} title="Nomenclature">
      <ProductSearchTools variant={ProductSearchBarStyle.NOMENCLATURE} />
    </MainAgentDesktop>
  );
};

export { AgentNomenclaturePageDesktop };
