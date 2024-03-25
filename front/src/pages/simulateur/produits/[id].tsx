import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { CategoryList } from '@/components/molecules/CategoryList';
import { FormSelectProduct, OnAddProductOptions } from '@/components/organisms/FormSelectProduct';
import { ModalAddProduct } from '@/components/organisms/ModalAddProduct';
import { simulator } from '@/core/hoc/simulator.hoc';
import { Meta } from '@/layout/Meta';
import { Product, ProductDisplayTypes } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const ProductSearch = () => {
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const { trackEvent } = useMatomo();
  const { findProductTreeSteps, addProduct, defaultCurrency } = useStore(
    (state) => ({
      findProductTreeSteps: state.findProductTreeSteps,
      addProduct: state.addProduct,
      defaultCurrency: state.simulator.appState.simulatorRequest.defaultCurrency,
    }),
    shallow,
  );

  const router = useRouter();
  const queryParams = router.query;

  const customName =
    typeof queryParams.customName === 'string' ? queryParams.customName : undefined;
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
            onAddProduct={onAddProduct}
            defaultCurrency={defaultCurrency}
            defaultName={customName}
          />
        )}
      </div>
      <ModalAddProduct open={openModalAddProduct} onClose={() => setOpenModalAddProduct(false)} />
    </Main>
  );
};
export default simulator(ProductSearch);
