import { useEffect } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { Header } from '@/components/business/header';
import { CategoryList, Item } from '@/components/common/CategoryList';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Input } from '@/components/input/StandardInputs/Input';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Index = () => {
  const { products, getProductsResponse } = useStore(
    (state) => ({
      products: state.products.appState.products,
      getProductsResponse: state.getProductsResponse,
    }),
    shallow,
  );
  const router = useRouter();

  const displayedProducts = products?.map((product): Item => {
    return {
      to: `/simulateur/produits/${product.id}`,
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
          placeholder="Recherchez votre achat"
          trailingIcon="search"
          onClick={() => router.push('/simulateur/produits/recherche')}
        />
        <CategoryList items={displayedProducts} title="Catégories" />
      </div>
    </Main>
  );
};
export default simulator(Index);
