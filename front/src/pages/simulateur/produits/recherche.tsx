import { useEffect } from 'react';

import shallow from 'zustand/shallow';

import { Search } from '@/components/business/search';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const SearchProduct = () => {
  const { searchProducts, getProductsResponse } = useStore(
    (state) => ({
      searchProducts: state.searchProducts,
      getProductsResponse: state.getProductsResponse,
    }),
    shallow,
  );

  useEffect(() => {
    getProductsResponse();
  }, [getProductsResponse]);
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
        <Search onSearch={searchProducts} autoFocus withSearchIcon />
      </div>
    </Main>
  );
};
export default simulator(SearchProduct);
