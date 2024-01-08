import { useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { NomenclatureCard } from '@/components/business/NomenclatureCard';
import { Typography } from '@/components/common/Typography';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { Meta } from '@/layout/Meta';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';
import { findProduct } from '@/utils/product.util';
import { SearchType } from '@/utils/search';

const SearchProduct = () => {
  const { searchNomenclatureProducts, products } = useStore(
    (state) => ({
      setProductsNomenclatureToDisplay: state.setProductsNomenclatureToDisplay,
      searchNomenclatureProducts: state.searchNomenclatureProducts,
      setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
      products: state.products.appState.nomenclatureProducts,
    }),
    shallow,
  );

  const router = useRouter();

  const { id, search, selectedId }: { id?: string; search?: string; selectedId?: string } =
    router.query;

  let initialProduct: Product | undefined;

  if (selectedId) {
    initialProduct = findProduct(products, selectedId);
  }

  const productsThatMatch: Product[] = [];

  if (id) {
    productsThatMatch.push(findProduct(products, id as string) as Product);
  } else {
    searchNomenclatureProducts((search as string) ?? '').map((product) =>
      productsThatMatch.push(product),
    );
  }
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    (initialProduct as Product) ?? undefined,
  );
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState<boolean>(
    !!initialProduct ?? false,
  );

  const onClickProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(true);
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
        withTitle
        titleHeader="Recherche"
      >
        <div className="flex flex-1 flex-col border-t border-secondary-300 py-4 mx-5">
          <div className="flex flex-row justify-between items-center">
            <Typography size="text-sm" color="black">
              {`${(productsThatMatch as Product[])?.length} résultat${
                (productsThatMatch as SearchType<Product>[])?.length > 1 ? 's' : ''
              } pour "${id ? productsThatMatch[0]?.name : search ?? ''}"`}
            </Typography>
            <ModalSelectCountry />
          </div>
          <div className="flex flex-1 flex-col gap-4 mt-2">
            {(productsThatMatch as SearchType<Product>[])?.map((product) => (
              <NomenclatureCard
                key={product.id}
                product={product}
                onClick={onClickProduct}
                searchValue={search as string}
              />
            ))}
          </div>
        </div>
        <ModalCategoryNomenclatureProduct
          open={openCategoryDownModal}
          onClose={() => setOpenCategoryDownModal(false)}
          defaultProduct={selectedProduct}
        />
      </MainAgent>
    </AgentRoute>
  );
};
export default declarationAgent(SearchProduct);