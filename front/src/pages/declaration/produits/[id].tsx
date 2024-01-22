import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { ModalAddProduct } from '@/components/autonomous/ModalAddProduct';
import { FormSelectProduct, OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { CategoryList } from '@/components/common/CategoryList';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Meta } from '@/layout/Meta';
import { Product, ProductDisplayTypes } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const ProductSearch = () => {
  const [openModalAddProductCartDeclaration, setOpenModalAddProductCartDeclaration] =
    useState<boolean>(false);
  const { trackEvent } = useMatomo();
  const { findProductTreeSteps, addProductCartDeclaration, defaultCurrency } = useStore(
    (state) => ({
      findProductTreeSteps: state.findProductTreeSteps,
      addProductCartDeclaration: state.addProductCartDeclaration,
      defaultCurrency: state.declaration.appState.declarationRequest.defaultCurrency,
    }),
    shallow,
  );

  const router = useRouter();
  const queryParams = router.query;
  const id = typeof queryParams.id === 'string' ? queryParams.id : undefined;

  const [currentProduct, setCurrentProduct] = useState<Product | undefined>();
  const [defaultSteps, setDefaultSteps] = useState<Product[]>([]);
  useEffect(() => {
    if (id) {
      const steps = findProductTreeSteps(id as string);
      setDefaultSteps(steps);
      setCurrentProduct(steps[0]);
    }
  }, [id]);
  const onRedirectProduct = (idRedirect: string) => {
    router.push(`/declaration/produits/${idRedirect}`);
  };
  const displayedProducts =
    currentProduct?.subProducts.map((product) => {
      return {
        id: product.id,
        svgNames: product.icon ?? 'categoryOther',
        title: product.name,
      };
    }) ?? [];

  const onAddProductCartDeclaration = ({ product, value, name, currency }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency,
    };
    addProductCartDeclaration(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenModalAddProductCartDeclaration(true);
  };

  if (!currentProduct) {
    return <Error statusCode={404} />;
  }

  return (
    <Main
      meta={
        <Meta
          title="Declaration Déclare Douanes"
          description="Déclaration de douane en quelques clics"
        />
      }
      withHeader
      withCart
      withSearch
      linkSearch="/declaration/produits/recherche"
      withTitle
      titleValue={currentProduct?.name}
      titleIcon="douanier"
      method="declaration"
    >
      <div className="flex flex-1 flex-col gap-6">
        {currentProduct.productDisplayTypes === ProductDisplayTypes.category ? (
          <CategoryList
            onSelectProduct={onRedirectProduct}
            items={displayedProducts}
            title="Catégories"
          />
        ) : (
          <FormSelectProduct
            currentProduct={currentProduct}
            defaultSteps={defaultSteps}
            onAddProduct={onAddProductCartDeclaration}
            defaultCurrency={defaultCurrency}
          />
        )}
      </div>
      <ModalAddProduct
        open={openModalAddProductCartDeclaration}
        onClose={() => setOpenModalAddProductCartDeclaration(false)}
        method="declaration"
      />
    </Main>
  );
};
export default declaration(ProductSearch);
