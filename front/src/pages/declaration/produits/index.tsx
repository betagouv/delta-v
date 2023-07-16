import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { CategoryList, Item } from '@/components/common/CategoryList';
import { Input } from '@/components/input/StandardInputs/Input';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { Main } from '@/templates/Main';

const Index = () => {
  const { products, setProductsDeclarationToDisplay } = useStore((state) => ({
    products: state.products.appState.products,
    setProductsDeclarationToDisplay: state.setProductsDeclarationToDisplay,
  }));
  const router = useRouter();

  useEffect(() => {
    setProductsDeclarationToDisplay();
  }, []);

  const onRedirectProduct = (idRedirect: string) => {
    router.push(`/declaration/produits/${idRedirect}`);
  };

  const displayedProducts = products?.map((product): Item => {
    return {
      id: product.id,
      svgNames: product.icon ?? 'categoryOther',
      title: product.name,
    };
  });

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
      withTitle
      titleValue={
        <>
          Déclarer
          <br />
          mes achats
        </>
      }
      titleIcon="douanier"
      method="declaration"
    >
      <div className="flex flex-1 flex-col gap-6">
        <Input
          name="search"
          type="text"
          fullWidth
          placeholder="Recherchez un produit"
          trailingIcon="search"
          onClick={() => router.push('/declaration/produits/recherche')}
        />
        <CategoryList
          onSelectProduct={onRedirectProduct}
          items={displayedProducts}
          title="Catégories"
        />
      </div>
    </Main>
  );
};
export default declaration(Index);
