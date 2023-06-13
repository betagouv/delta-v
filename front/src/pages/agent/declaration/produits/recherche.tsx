import { useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { ModalAddProductCartDeclaration } from '@/components/autonomous/ModalAddProductCartDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { OnAddProductOptions } from '@/components/business/formSelectProduct';
import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import { SearchType } from '@/utils/search';

const SearchProduct = () => {
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const { trackEvent } = useMatomo();
  const { addProductCartDeclaration, searchProducts, findProduct, defaultCurrency } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      addProductCartDeclaration: state.addProductCartDeclaration,
      searchProducts: state.searchProducts,
      defaultCurrency: state.declaration.appState.declarationRequest.defaultCurrency,
    }),
    shallow,
  );

  const router = useRouter();

  const { id, search } = router.query;

  const productsThatMatch = id
    ? findProduct(id as string)
    : searchProducts((search as string) ?? '');
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const onAddProduct = ({ product, value, currency }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclaration(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenModalAddProduct(false);
    router.push(`/agent/declaration/ajout/marchandises`);
  };

  const onClickProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenModalAddProduct(true);
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withHeader
        withTitle
        titleHeader="Créer une déclaration"
      >
        <div className="flex flex-1 flex-col gap-6">
          {id ? (
            <NomenclatureCard product={productsThatMatch as Product} onClick={onClickProduct} />
          ) : (
            (productsThatMatch as SearchType<Product>[])?.map((product) => (
              <NomenclatureCard key={product.id} product={product} onClick={onClickProduct} />
            ))
          )}
        </div>
        {selectedProduct && (
          <ModalAddProductCartDeclaration
            open={openModalAddProduct}
            onClose={() => setOpenModalAddProduct(false)}
            onAddProduct={onAddProduct}
            currentProduct={selectedProduct}
            defaultCurrency={defaultCurrency}
          />
        )}
      </MainAgent>
    </AgentRoute>
  );
};
export default declaration(SearchProduct);
