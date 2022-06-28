import { useEffect } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { FormSelectProduct, OnAddProductOptions } from '@/components/business/formSelectProduct';
import { Header } from '@/components/business/header';
import { CategoryList } from '@/components/common/CategoryList';
import { TitleHeader } from '@/components/common/TitleHeader';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const ProductSearch = () => {
  const { findProduct, getProductsResponse, addProduct } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      getProductsResponse: state.getProductsResponse,
      addProduct: state.addProduct,
    }),
    shallow,
  );
  const router = useRouter();
  const { id } = router.query;
  const currentProduct = findProduct(id as string);
  const selectedProduct = currentProduct;
  const displayedProducts =
    currentProduct?.subProducts.map((product) => {
      return {
        to: `/simulateur/produits/${product.id}`,
        svgNames: product.icon ?? 'categoryOther',
        title: product.name,
      };
    }) ?? [];

  const onAddProduct = ({ product, price, name }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      product,
      name,
      price,
      amount: 1,
    };
    addProduct(shoppingProduct);
    router.push('/simulateur/produits');
  };

  useEffect(() => {
    getProductsResponse();
  }, [getProductsResponse]);

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="flex h-full flex-col gap-6">
        <Header withCart withSearch linkSearch="/simulateur/produits/recherche" />
        <TitleHeader title={currentProduct?.name} icon="calculator" />
        {selectedProduct?.finalProduct ? (
          <FormSelectProduct currentProduct={currentProduct} onAddProduct={onAddProduct} />
        ) : (
          <CategoryList items={displayedProducts} title="Catégories" />
        )}
      </div>
    </Main>
  );
};
export default simulator(ProductSearch);
