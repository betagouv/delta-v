import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { useCreateFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import {
  FormAddFavoriteData,
  ModalAddFavoriteProduct,
} from '@/components/autonomous/ModalAddFavoriteProduct';
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
  const { searchNomenclatureProducts, addFavoriteProducts, products } = useStore(
    (state) => ({
      setProductsNomenclatureToDisplay: state.setProductsNomenclatureToDisplay,
      searchNomenclatureProducts: state.searchNomenclatureProducts,
      setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
      products: state.products.appState.nomenclatureProducts,
      addFavoriteProducts: state.addFavoriteProducts,
    }),
    shallow,
  );

  const router = useRouter();

  const { id, search, selectedId }: { id?: string; search?: string; selectedId?: string } =
    router.query;

  const [initialProduct, setInitialProduct] = useState<Product | undefined>(undefined);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState<boolean>(!!initialProduct);
  console.log('🚀 ~ SearchProduct ~ initialProduct:', initialProduct);
  const [productsThatMatch, setProductsThatMatch] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    (initialProduct as Product) ?? undefined,
  );
  console.log('🚀 ~ SearchProduct ~ selectedProduct:', selectedProduct);
  const [resultCount, setResultCount] = useState<number>(0);

  const [value, setValue] = useState('');
  const [openModalAddFavorite, setOpenModalAddFavorite] = useState(false);

  useEffect(() => {
    if (id && !selectedId) {
      setProductsThatMatch([findProduct(products, id as string) as Product]);
    }
  }, [id]);

  useEffect(() => {
    if (search && !selectedId) {
      setProductsThatMatch(searchNomenclatureProducts((search as string) ?? ''));
    }
  }, [search]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }

    setInitialProduct(findProduct(products, selectedId));
    const reducedProductsThatMatch = searchNomenclatureProducts((search as string) ?? '');

    const selectedProductPosition = reducedProductsThatMatch.findIndex(
      (product) => product.id === selectedId,
    );

    if (selectedProductPosition === undefined) {
      setProductsThatMatch(reducedProductsThatMatch);
      setOpenCategoryDownModal(true);
      return;
    }

    reducedProductsThatMatch.splice(selectedProductPosition, 1);
    setProductsThatMatch(reducedProductsThatMatch);
    setOpenCategoryDownModal(true);
  }, [selectedId, search]);

  const onCloseModalAddFavorite = () => {
    setValue('');
    setOpenModalAddFavorite(false);
    setTimeout(() => {
      setOpenCategoryDownModal(true);
    }, 300);
  };

  const createFavoriteMutation = useCreateFavoriteMutation({
    onSuccess: () => {
      if (onCloseModalAddFavorite) {
        onCloseModalAddFavorite();
      }
    },
  });

  const onClickFavorite = (product: Product) => {
    setSelectedProduct(product);
    setOpenCategoryDownModal(false);
    setOpenModalAddFavorite(true);
  };

  const onSubmit = (data: FormAddFavoriteData) => {
    if (!selectedProduct) {
      return;
    }
    addFavoriteProducts(selectedProduct);
    createFavoriteMutation.mutate({
      productId: selectedProduct?.id,
      name: data.name,
    });
    setValue(data.name);
  };

  useEffect(() => {
    if (!productsThatMatch && !selectedProduct) {
      setResultCount(0);
      return;
    }
    if (!productsThatMatch && selectedProduct) {
      setResultCount(1);
      return;
    }
    setResultCount(productsThatMatch.length + 1);
  }, [productsThatMatch, selectedProduct]);

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
              {`${resultCount} résultat${resultCount > 1 ? 's' : ''} pour "${
                id ? productsThatMatch[0]?.name : search ?? ''
              }"`}
            </Typography>
            <ModalSelectCountry />
          </div>
          <div className="flex flex-1 flex-col gap-4 mt-2">
            {initialProduct && (
              <NomenclatureCard
                key={initialProduct.id}
                product={initialProduct}
                onClick={onClickProduct}
                onClickFavorite={onClickFavorite}
                searchValue={search as string}
              />
            )}
            {(productsThatMatch as SearchType<Product>[])?.map((product) => (
              <NomenclatureCard
                key={product.id}
                product={product}
                onClick={onClickProduct}
                onClickFavorite={onClickFavorite}
                searchValue={search as string}
              />
            ))}
          </div>
        </div>
        <ModalCategoryNomenclatureProduct
          open={openCategoryDownModal}
          onClose={() => setOpenCategoryDownModal(false)}
          onOpen={() => setOpenCategoryDownModal(true)}
          defaultProduct={initialProduct ?? selectedProduct}
        />

        <ModalAddFavoriteProduct
          open={openModalAddFavorite}
          onClose={onCloseModalAddFavorite}
          onSubmit={onSubmit}
          value={value}
        />
      </MainAgent>
    </AgentRoute>
  );
};
export default declarationAgent(SearchProduct);
