import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { CategoryList, Item } from '@/components/common/CategoryList';
import { Input } from '@/components/input/StandardInputs/Input';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Index = () => {
  const { products, setProductsToDisplay } = useStore((state) => ({
    products: state.products.appState.products,
    setProductsToDisplay: state.setProductsToDisplay,
  }));
  const router = useRouter();

  useEffect(() => {
    setProductsToDisplay();
  }, []);

  const onRedirectProduct = (idRedirect: string) => {
    router.push(`/simulateur/produits/${idRedirect}`);
  };

  const displayedProducts = products?.map((product): Item => {
    return {
      id: product.id,
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
        <Input
          name="search"
          type="text"
          fullWidth
          placeholder="Recherchez un produit"
          trailingIcon="search"
          onClick={() => router.push('/simulateur/produits/recherche')}
        />
        <CategoryList
          onSelectProduct={onRedirectProduct}
          items={displayedProducts}
          title="Catégories"
        />
      </div>
    </Main>
  );
};
export default simulator(Index);
