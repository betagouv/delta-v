import { useEffect } from 'react';

import { Header } from '@/components/business/header';
import { Search } from '@/components/business/search';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const SearchProduct = () => {
  const searchProducts = useStore((state) => state.searchProducts);
  const getProductsResponse = useStore((state) => state.getProductsResponse);

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
        <Search onSearch={searchProducts} />
      </div>
    </Main>
  );
};
export default SearchProduct;
