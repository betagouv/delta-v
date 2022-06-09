import { useEffect } from 'react';

import Error from 'next/error';
import { useRouter } from 'next/router';

import { FormSimulatorData } from '@/components/business/formAddProduct';
import { FormSelectProduct } from '@/components/business/formSelectProduct';
import { Header } from '@/components/business/header';
import { CategoryList } from '@/components/common/CategoryList';
import { TitleHeader } from '@/components/common/TitleHeader';
import { Meta } from '@/layout/Meta';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const ProductSearch = () => {
  const findProduct = useStore((state) => state.findProduct);
  const getProductsResponse = useStore((state) => state.getProductsResponse);
  const addProduct = useStore((state) => state.addProduct);
  const shoppingProducts = useStore((state) => state.simulator.appState.shoppingProducts);
  const router = useRouter();
  const { id } = router.query;
  const currentProduct = findProduct(id as string);
  const selectedProduct = currentProduct;
  const displayedProducts =
    currentProduct?.subProducts.map((product) => {
      return {
        to: `/app/simulateur/produits/${product.id}`,
        svgNames: product.icon ?? 'categoryOther',
        title: product.name,
      };
    }) ?? [];

  const onSubmit = (data: FormSimulatorData) => {
    const product: ShoppingProduct = {
      id: currentProduct?.id ?? '12',
      price: data.price ?? 1,
      amount: 1,
    };
    addProduct(product);
    router.push('/app/simulateur/produits');
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
      <div className="flex flex-col gap-6 px-4 py-8">
        <Header
          withCart
          nbCartItems={shoppingProducts?.length}
          cartLink="/app/simulateur/pannier"
        />
        <TitleHeader title={currentProduct?.name} icon="calculator" />
        {selectedProduct?.finalProduct ? (
          <FormSelectProduct currentProduct={currentProduct} onSubmit={onSubmit} />
        ) : (
          <CategoryList items={displayedProducts} title="Catégories" />
        )}
      </div>
    </Main>
  );
};
export default ProductSearch;
