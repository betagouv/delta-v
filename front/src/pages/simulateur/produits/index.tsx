import { useEffect, useState } from 'react';

import { Header } from '@/components/business/header';
import { Search } from '@/components/business/search';
import { CategoryList, Item } from '@/components/common/CategoryList';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Index = () => {
  const products = useStore((state) => state.products.appState.products);
  const searchProducts = useStore((state) => state.searchProducts);
  const getProductsResponse = useStore((state) => state.getProductsResponse);
  const [displayProducts, setDisplayProducts] = useState(true);

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
        <Search
          withSearchIcon
          onSearch={searchProducts}
          onChange={(displayResult) => {
            setDisplayProducts(!displayResult);
          }}
        />
        {displayProducts && <CategoryList items={displayedProducts} title="Catégories" />}
      </div>
    </Main>
  );
};
export default Index;
