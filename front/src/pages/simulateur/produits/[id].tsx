import { useEffect, useState } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { ModalAddProduct } from '@/components/autonomous/ModalAddProduct';
import { FormSelectProduct, OnAddProductOptions } from '@/components/business/formSelectProduct';
import { CategoryList } from '@/components/common/CategoryList';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const ProductSearch = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
    setOpenModal(true);
  };

  useEffect(() => {
    getProductsResponse();
  }, []);

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
      withHeader
      withCart
      withSearch
      linkSearch="/simulateur/produits/recherche"
      withTitle
      titleValue={currentProduct?.name}
      titleIcon="calculator"
    >
      <div className="flex flex-1 flex-col gap-6">
        {selectedProduct?.finalProduct ? (
          <FormSelectProduct currentProduct={currentProduct} onAddProduct={onAddProduct} />
        ) : (
          <CategoryList items={displayedProducts} title="Catégories" />
        )}
      </div>
      <ModalAddProduct open={openModal} onClose={() => setOpenModal(false)} />
    </Main>
  );
};
export default simulator(ProductSearch);
