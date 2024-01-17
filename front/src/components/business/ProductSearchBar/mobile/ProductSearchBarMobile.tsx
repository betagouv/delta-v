import { useState } from 'react';

import { useRouter } from 'next/router';

import { ProductSearchBarStyle, getSearchPagePath } from '../enum';
import { useFavorites } from '@/api/hooks/useAPIFavorite';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalCategoryProduct } from '@/components/autonomous/ModalCategoryProduct';
import { ModalFavorites } from '@/components/autonomous/ModalFavorites';
import { ModalSearchNomenclatureProduct } from '@/components/autonomous/ModalSearchNomenclatureProduct';
import { ModalSearchProduct } from '@/components/autonomous/ModalSearchProduct';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { findProduct, haveAgeRestriction } from '@/utils/product.util';

export interface ProductSearchBarProps {
  variant?: ProductSearchBarStyle;
}

export const ProductSearchBarMobile = ({
  variant = ProductSearchBarStyle.DECLARATION,
}: ProductSearchBarProps) => {
  const router = useRouter();
  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [openFavoriteDownModal, setOpenFavoriteDownModal] = useState(false);
  const [selectedFavoriteProduct, setSelectedFavoriteProduct] = useState<Product | undefined>(
    undefined,
  );
  const { nomenclatureProducts, setFavoriteProducts, favoriteProducts, defaultCurrency } = useStore(
    (state) => ({
      setFavoriteProducts: state.setFavoriteProducts,
      nomenclatureProducts: state.products.appState.nomenclatureProducts,
      favoriteProducts: state.products.appState.favoriteProducts,
      defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
    }),
  );

  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

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
    setOpenSearchDownModal(false);
    setOpenCategoryDownModal(false);
    setOpenFavoriteDownModal(false);
  };

  const onClickProduct = (product: IdRequiredProduct, searchValue?: string) => {
    setOpenSearchDownModal(false);
    setOpenFavoriteDownModal(false);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue });
    router.push({
      pathname: searchPagePath,
      query: { search: searchValue, selectedId: product.id },
    });
  };

  const onClickFavorite = (product: Product) => {
    setSelectedFavoriteProduct(product);
    setOpenSearchDownModal(false);
    setOpenFavoriteDownModal(false);
    setOpenCategoryDownModal(true);
  };

  const onFilterByCategoryClick = () => {
    setSelectedFavoriteProduct(undefined);
    setOpenCategoryDownModal(true);
  };

  const onSearchAll = (searchValue: string) => {
    setOpenSearchDownModal(false);
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

  const withoutFavoriteProducts =
    flattenFavoriteProducts.length === 0 && ageRestrictionFavoriteProducts.length === 0;

  return (
    <>
      <div className="p-5 bg-secondary-bg rounded-[10px]">
        <div className="mt-1" onClick={() => setOpenSearchDownModal(true)}>
          <div className={`flex flex-col`}>
            <div className="text-black flex flex-row items-center gap-2">
              <Icon name="search" size="sm" />
              <Typography color="black" size="text-base" weight="bold">
                Recherche
              </Typography>
            </div>
            <div className="px-5 py-3 border border-secondary-100 bg-white rounded-full mt-[10px]">
              <Typography color="light-gray" size="text-sm" italic>
                Type de marchandises, marques...
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-3 w-full mt-5">
        <button
          type="button"
          onClick={() => setOpenFavoriteDownModal(true)}
          disabled={withoutFavoriteProducts}
          className={`gap-3 ${
            withoutFavoriteProducts ? 'bg-disabled-bg' : 'bg-primary-400'
          } rounded-full px-5 py-2 text-white`}
        >
          <div className="flex flex-row items-center gap-3">
            <Typography color="white" size="text-xs">
              Mes favoris
            </Typography>
            <Icon name="chevron-thin-down" size="sm" />
          </div>
        </button>
        <button
          onClick={onFilterByCategoryClick}
          type="button"
          className="border gap-3 bg-white border-gray-300 rounded-full flex-1 flex justify-center items-center"
        >
          <div className="flex flex-row items-center gap-3">
            <Typography color="black" weight="bold" size="text-xs">
              Filtrer par catégories
            </Typography>
            <Icon name="chevron-down" size="sm" />
          </div>
        </button>
      </div>
      {variant === 'nomenclature' && (
        <div className="flex flex-row justify-end w-full mt-[30px] border-t pt-5">
          <ModalSelectCountry />
        </div>
      )}

      <ModalFavorites
        open={openFavoriteDownModal}
        onClose={() => setOpenFavoriteDownModal(false)}
        onClickFavorite={onClickFavorite}
        isInNomenclature
      />

      {variant === ProductSearchBarStyle.NOMENCLATURE && (
        <>
          <ModalSearchNomenclatureProduct
            open={openSearchDownModal}
            onClose={handleCloseDownModal}
            onClickProduct={(product, searchValue) => onClickProduct(product, searchValue)}
            onSearchAll={onSearchAll}
          />
          <ModalCategoryNomenclatureProduct
            open={openCategoryDownModal}
            onClose={handleCloseDownModal}
            defaultProduct={selectedFavoriteProduct}
          />
        </>
      )}

      {variant === ProductSearchBarStyle.DECLARATION && (
        <>
          <ModalSearchProduct
            open={openSearchDownModal}
            onClose={handleCloseDownModal}
            onClickProduct={(product, searchValue) => onClickProduct(product, searchValue)}
            onSearchAll={onSearchAll}
          />
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
