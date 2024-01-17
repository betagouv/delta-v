import { useState } from 'react';

import { useRouter } from 'next/router';

import { FavoriteProducts } from '../../FavoriteProducts';
import { SearchProductDesktop } from '../../SearchProduct/desktop';
import { ProductSearchBarStyle, getSearchPagePath } from '../enum';
import { useFavorites, useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalCategoryProduct } from '@/components/autonomous/ModalCategoryProduct';
import { ModalDeleteFavoriteProductDesktop } from '@/components/autonomous/ModalDeleteFavoriteProduct/desktop';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { findProduct, haveAgeRestriction } from '@/utils/product.util';

export interface ProductSearchBarProps {
  variant?: ProductSearchBarStyle;
}

export const ProductSearchBarDesktop = ({
  variant = ProductSearchBarStyle.DECLARATION,
}: ProductSearchBarProps) => {
  const router = useRouter();
  const [isDeleteFavoriteModalOpen, setIsDeleteFavoriteModalOpen] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [selectedFavoriteProduct, setSelectedFavoriteProduct] = useState<Product | undefined>(
    undefined,
  );
  const {
    searchNomenclatureProducts,
    searchProducts,
    removeFavoriteProducts,
    nomenclatureProducts,
    setFavoriteProducts,
    favoriteProducts,
    defaultCurrency,
  } = useStore((state) => ({
    searchNomenclatureProducts: state.searchNomenclatureProducts,
    searchProducts: state.searchProducts,
    removeFavoriteProducts: state.removeFavoriteProducts,
    setFavoriteProducts: state.setFavoriteProducts,
    nomenclatureProducts: state.products.appState.nomenclatureProducts,
    favoriteProducts: state.products.appState.favoriteProducts,
    defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
  }));

  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

  const removeFavoriteMutation = useRemoveFavoriteMutation({});

  const searchPagePath = getSearchPagePath(variant);

  const onSuccess = (data: string[]) => {
    const tmpFavorites: Product[] = [];
    data.forEach((id) => {
      const product = findProduct(nomenclatureProducts, id);
      if (product) {
        tmpFavorites.push(product);
      }
    });
    setFavoriteProducts(tmpFavorites);
  };

  useFavorites({ onSuccess });

  const handleCloseDownModal = () => {
    setOpenCategoryDownModal(false);
  };

  const onClickProduct = (product: IdRequiredProduct, searchValue?: string) => {
    updateSearchProductHistory.mutate({ productId: product.id, searchValue });
    router.push({
      pathname: searchPagePath,
      query: { search: searchValue, selectedId: product.id },
    });
  };

  const onClickFavorite = (product: Product) => {
    setSelectedFavoriteProduct(product);
    setOpenCategoryDownModal(true);
  };

  const onDeleteFavorite = (product: Product) => {
    setSelectedFavoriteProduct(product);
    setIsDeleteFavoriteModalOpen(true);
  };

  const onConfirmDeleteFavorite = () => {
    if (!selectedFavoriteProduct) {
      return;
    }
    removeFavoriteProducts(selectedFavoriteProduct.id);
    removeFavoriteMutation.mutate(selectedFavoriteProduct.id);
    setIsDeleteFavoriteModalOpen(false);
  };

  const onFilterByCategoryClick = () => {
    setSelectedFavoriteProduct(undefined);
    setOpenCategoryDownModal(true);
  };

  const onSearchAll = (searchValue: string) => {
    router.push({
      pathname: searchPagePath,
      query: { search: searchValue },
    });
  };

  const flattenFavoriteProducts: Product[] = [];
  const ageRestrictionFavoriteProducts: Product[] = [];

  favoriteProducts?.forEach((favoriteProduct) => {
    const product = favoriteProduct;
    if (product) {
      flattenFavoriteProducts.push(product);
    } else if (haveAgeRestriction(favoriteProduct)) {
      ageRestrictionFavoriteProducts.push(favoriteProduct);
    }
  });

  return (
    <>
      <div className="p-5 bg-secondary-bg rounded-[20px] flex flex-col items-center gap-4">
        <SearchProductDesktop
          onSearch={
            variant === ProductSearchBarStyle.NOMENCLATURE
              ? searchNomenclatureProducts
              : searchProducts
          }
          placeholder="Type de marchandises, marques..."
          onClickProduct={onClickProduct}
          onFilterByCategoryClick={onFilterByCategoryClick}
          onSearchClick={onSearchAll}
        />

        {flattenFavoriteProducts.length > 0 && (
          <FavoriteProducts
            allowedFavoriteProducts={flattenFavoriteProducts}
            restrictedFavoriteProducts={ageRestrictionFavoriteProducts}
            onFavoriteClick={(product) => onClickFavorite(product)}
            onDeleteClick={onDeleteFavorite}
          />
        )}
      </div>

      {variant === 'nomenclature' && (
        <div className="flex flex-row justify-end w-full mt-[30px] border-t pt-5">
          <ModalSelectCountry />
        </div>
      )}

      {selectedFavoriteProduct && (
        <ModalDeleteFavoriteProductDesktop
          open={isDeleteFavoriteModalOpen}
          productName={selectedFavoriteProduct.name}
          onDeleteProduct={onConfirmDeleteFavorite}
          onClose={() => setIsDeleteFavoriteModalOpen(false)}
        />
      )}

      {variant === ProductSearchBarStyle.NOMENCLATURE && (
        <>
          {/* <ModalSearchNomenclatureProduct
            open={openSearchDownModal}
            onClose={handleCloseDownModal}
            onClickProduct={(product, searchValue) => onClickProduct(product, searchValue)}
            onSearchAll={onSearchAll}
          /> */}
          <ModalCategoryNomenclatureProduct
            open={openCategoryDownModal}
            onClose={handleCloseDownModal}
            defaultProduct={selectedFavoriteProduct}
          />
        </>
      )}

      {variant === ProductSearchBarStyle.DECLARATION && (
        <>
          {/* <ModalSearchProduct
            open={openSearchDownModal}
            onClose={handleCloseDownModal}
            onClickProduct={(product, searchValue) => onClickProduct(product, searchValue)}
            onSearchAll={onSearchAll}
          /> */}
          <ModalCategoryProduct
            open={openCategoryDownModal}
            onClose={handleCloseDownModal}
            defaultCurrency={defaultCurrency}
          />
        </>
      )}
    </>
  );
};
