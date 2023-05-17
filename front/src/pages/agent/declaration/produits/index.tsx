import { useEffect } from 'react';

import { CategoryList, Item } from '@/components/common/CategoryList';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Index = () => {
  const { products, setProductsToDisplay } = useStore((state) => ({
    products: state.products.appState.products,
    setProductsToDisplay: state.setProductsToDisplay,
  }));

  useEffect(() => {
    setProductsToDisplay();
  }, []);

  const displayedProducts = products?.map((product): Item => {
    return {
      to: `/simulateur/produits/${product.id}`,
      svgNames: product.icon ?? 'categoryOther',
      title: product.name,
    };
  });

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withTitle
      titleValue={
        <>
          Simuler
          <br />
          mes achats
        </>
      }
      titleIcon="calculator"
    >
      <div className="flex flex-1 flex-col gap-6">
        <CategoryList items={displayedProducts} title="Catégories" />
      </div>
    </Main>
  );
};
export default simulator(Index);
