import { useState } from 'react';

import { useRouter } from 'next/router';

import { FavoriteProducts } from '../../FavoriteProducts';
import { SearchProductDesktop } from '../../SearchProduct/desktop';
import { ProductSearchBarStyle, getSearchPagePath } from '../enum';
import { useFavorites, useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { ModalDeleteFavoriteProductDesktop } from '@/components/autonomous/ModalDeleteFavoriteProduct/desktop';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { findProduct, haveAgeRestriction } from '@/utils/product.util';

export interface ProductSearchToolsProps {
  variant?: ProductSearchBarStyle;
  onFilterByCategoryClick?: () => void;
}

export const ProductSearchTools = ({
  variant = ProductSearchBarStyle.DECLARATION,
  onFilterByCategoryClick,
}: ProductSearchToolsProps) => {
  const router = useRouter();
  const [isDeleteFavoriteModalOpen, setIsDeleteFavoriteModalOpen] = useState(false);
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
    // defaultCurrency,
  } = useStore((state) => ({
    searchNomenclatureProducts: state.searchNomenclatureProducts,
    searchProducts: state.searchProducts,
    removeFavoriteProducts: state.removeFavoriteProducts,
    setFavoriteProducts: state.setFavoriteProducts,
    nomenclatureProducts: state.products.appState.nomenclatureProducts,
    favoriteProducts: state.products.appState.favoriteProducts,
    // defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
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

  const onClickProduct = (product: IdRequiredProduct, searchValue: string) => {
    updateSearchProductHistory.mutate({ productId: product.id, searchValue });
    router.push({
      pathname: searchPagePath,
      query: { search: searchValue, selectedId: product.id },
    });
  };

  const onClickFavorite = (product: Product) => {
    setSelectedFavoriteProduct(product);
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

  const onFilterClick = () => {
    if (onFilterByCategoryClick) {
      onFilterByCategoryClick();
    }
    setSelectedFavoriteProduct(undefined);
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

  console.log(selectedFavoriteProduct);

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
          onFilterByCategoryClick={onFilterClick}
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
          {/* <ModalCategoryNomenclatureProduct
            open={openCategoryDownModal}
            onClose={handleCloseDownModal}
            defaultProduct={selectedFavoriteProduct}
          /> */}
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
          {/* <ModalCategoryProduct
            open={openCategoryDownModal}
            onClose={handleCloseDownModal}
            defaultCurrency={defaultCurrency}
          /> */}
        </>
      )}
    </>
  );
};
