import { useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
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
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const { trackEvent } = useMatomo();
  const { findProduct, addProduct } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      addProduct: state.addProduct,
    }),
    shallow,
  );
  const router = useRouter();
  const { id } = router.query;
  const currentProduct = findProduct(id as string);
  const onRedirectProduct = (idRedirect: string) => {
    router.push(`/simulateur/produits/${idRedirect}`);
  };
  const displayedProducts =
    currentProduct?.subProducts.map((product) => {
      return {
        id: product.id,
        svgNames: product.icon ?? 'categoryOther',
        title: product.name,
      };
    }) ?? [];

  const onAddProduct = ({ product, value, name, currency }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency,
    };
    addProduct(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenModalAddProduct(true);
  };

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

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
      withSearch
      linkSearch="/simulateur/produits/recherche"
      withTitle
      titleValue={currentProduct?.name}
      titleIcon="calculator"
    >
      <div className="flex flex-1 flex-col gap-6">
        {currentProduct?.finalProduct ? (
          <FormSelectProduct currentProduct={currentProduct} onAddProduct={onAddProduct} />
        ) : (
          <CategoryList
            onSelectProduct={onRedirectProduct}
            items={displayedProducts}
            title="Catégories"
          />
        )}
      </div>
      <ModalAddProduct open={openModalAddProduct} onClose={() => setOpenModalAddProduct(false)} />
    </Main>
  );
};
export default simulator(ProductSearch);
