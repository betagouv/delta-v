import { useEffect } from 'react';

import { Header } from '@/components/business/header';
import { CategoryList, Item } from '@/components/common/CategoryList';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Input } from '@/components/input/StandardInputs/Input';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Index = () => {
  const productsResponse = useStore((state) => state.products.appState.products);
  const getProductsResponse = useStore((state) => state.getProductsResponse);

  const displayedProducts = productsResponse?.map((product): Item => {
    return {
      to: `/app/simulateur/produits/${product.id}`,
      svgNames: product.icon ?? 'categoryOther',
      title: product.name,
    };
  });

  useEffect(() => {
    getProductsResponse();
  }, [getProductsResponse]);
  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex flex-col gap-6">
        <Header withCart />
        <TitleHeader
          title={
            <>
              Quels achats
              <br />
              souhaitez-vous
              <br />
              déclarer ?
            </>
          }
          icon="calculator"
        />
        <Input
          name="search"
          type="text"
          fullWidth
          placeholder="Saisissez votre achat"
          trailingIcon="search"
        ></Input>
        <CategoryList items={displayedProducts} title="Catégories" />
      </div>
    </Main>
  );
};
export default Index;
