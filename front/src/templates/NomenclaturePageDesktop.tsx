import { ProductSearchTools } from '@/components/organisms/SearchProduct/SearchProductDesktop';
import { ProductSearchContext } from '@/utils/enums';

export const NomenclaturePageDesktop = () => {
  return <ProductSearchTools variant={ProductSearchContext.NOMENCLATURE} />;
};
