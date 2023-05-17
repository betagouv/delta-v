import { useRouter } from 'next/router';

import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';

const SearchProduct = () => {
  const { searchAllProducts } = useStore((state) => ({
    searchAllProducts: state.searchAllProducts,
  }));

  const router = useRouter();

  const { search } = router.query;

  const productsThatMatch = searchAllProducts((search as string) ?? '');

  return (
    <MainAgent
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withTitle
      titleHeader="Créer une déclaration"
    >
      <div className="flex flex-1 flex-col gap-6">
        {productsThatMatch.map((product) => (
          <NomenclatureCard key={product.id} product={product} />
        ))}
      </div>
    </MainAgent>
  );
};
export default simulator(SearchProduct);
