import { useEffect, useState } from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';
import { useRouter } from 'next/router';

import { useGetDefaultCountry } from '@/api/hooks/useAPIConfig';
import { useFavorites } from '@/api/hooks/useAPIFavorite';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { FavoriteResponse } from '@/api/lib/types';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { memoizedCountriesData } from '@/components/organisms/FormSelectCountry/utils';
import { ModalCategoryNomenclatureProduct } from '@/components/organisms/ModalCategoryNomenclatureProduct';
import { ModalFavorites } from '@/components/organisms/ModalFavorites';
import { ModalSearchNomenclatureProduct } from '@/components/organisms/ModalSearchNomenclatureProduct';
import { ModalSelectCountry } from '@/components/organisms/ModalSelectCountry';
import { ModalSetDefaultCountry } from '@/components/organisms/ModalSetDefaultCountry';
import { SelectCountryButton } from '@/components/organisms/SelectCountryButton';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import clsxm from '@/utils/clsxm';
import { countriesAlternatives, disabledCountries } from '@/utils/const';
import { ModalType } from '@/utils/modal';
import { findProduct, haveAgeRestriction } from '@/utils/product.util';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

export const NomenclaturePageMobile = () => {
  const router = useRouter();
  const {
    nomenclatureProducts,
    setFavoriteProducts,
    favoriteProducts,
    setProductsNomenclatureToDisplayAgent,
    countryForProductsNomenclature,
    displaySetDefaultCountry,
  } = useStore((state) => ({
    setFavoriteProducts: state.setFavoriteProducts,
    nomenclatureProducts: state.products.appState.nomenclatureProducts,
    favoriteProducts: state.products.appState.favoriteProducts,
    setProductsNomenclatureToDisplayAgent: state.setProductsNomenclatureToDisplayAgent,
    countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
    displaySetDefaultCountry: state.global.appState.displaySetDefaultCountry,
  }));

  const { data: defaultCountry, refetch: updateDefaultCountry } = useGetDefaultCountry();

  const countriesData = memoizedCountriesData({ countriesAlternatives, disabledCountries });

  const [currentCountryLabel, setCurrentCountryLabel] = useState<string | undefined>(undefined);
  const [openSelectCountryModal, setOpenSelectCountryModal] = useState(
    !countryForProductsNomenclature,
  );
  const [selectedCountry, setSelectedCountry] = useState<Alpha2Code | undefined>(undefined);

  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [openFavoriteDownModal, setOpenFavoriteDownModal] = useState(false);
  const [selectedFavoriteProduct, setSelectedFavoriteProduct] = useState<Product | undefined>(
    undefined,
  );
  const [openSetDefaultCountryModal, setOpenSetDefaultCountryModal] = useState(true);

  useEffect(() => {
    if (!countryForProductsNomenclature) {
      return;
    }
    setProductsNomenclatureToDisplayAgent(countryForProductsNomenclature);
    setCurrentCountryLabel(
      countriesData.find((country) => country.value === countryForProductsNomenclature)?.label,
    );
  }, [countryForProductsNomenclature, defaultCountry]);

  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

  const onSuccess = (data: FavoriteResponse[]) => {
    const tmpFavorites: Product[] = [];
    data.forEach((favorite) => {
      const product = findProduct(nomenclatureProducts, favorite.productId);
      if (product) {
        tmpFavorites.push({ ...product, name: favorite.name ?? product.name });
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

  const onClickProduct = (product: IdRequiredProduct, searchValue: string) => {
    setOpenSearchDownModal(false);
    setOpenFavoriteDownModal(false);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue });
    router.push({
      pathname: '/agent/nomenclature/recherche',
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
      pathname: '/agent/nomenclature/recherche',
      query: { search: searchValue },
    });
  };

  const onCloseSelectCountryModal = () => {
    setOpenSelectCountryModal(false);
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

  const onSelectCountry = (country: Alpha2Code) => {
    setOpenSetDefaultCountryModal(true);
    setSelectedCountry(country);
  };

  const onCloseSetDefaultCountryModal = () => {
    setOpenSetDefaultCountryModal(false);
  };

  const shouldShowSetDefaultCountryModal =
    displaySetDefaultCountry && selectedCountry && selectedCountry !== defaultCountry;

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
            <div className="px-5 py-3 border border-secondary-100 bg-white rounded-full mt-2.5">
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
          className={clsxm({
            'border gap-3 bg-white border-gray-300 rounded-full flex-1 flex justify-center items-center cursor-pointer':
              true,
          })}
        >
          <div className="flex flex-row items-center gap-3">
            <Typography color="black" weight="bold" size="text-xs">
              Filtrer par catégories
            </Typography>
            <Icon name="chevron-down" size="sm" />
          </div>
        </button>
      </div>
      <div className="flex flex-row justify-end w-full mt-[30px] border-t pt-5">
        <SelectCountryButton
          onClick={() => setOpenSelectCountryModal(true)}
          countryLabel={currentCountryLabel}
          isDefaultCountry={defaultCountry === countryForProductsNomenclature}
        />
      </div>

      <ModalSearchNomenclatureProduct
        open={openSearchDownModal}
        onClose={handleCloseDownModal}
        onClickProduct={(product, searchValue) => onClickProduct(product, searchValue)}
        onSearchAll={onSearchAll}
      />
      <ModalCategoryNomenclatureProduct
        open={openCategoryDownModal}
        onClose={handleCloseDownModal}
        onOpen={() => setOpenCategoryDownModal(true)}
        defaultProduct={selectedFavoriteProduct}
      />
      <ModalFavorites
        open={openFavoriteDownModal}
        onClose={() => setOpenFavoriteDownModal(false)}
        onClickFavorite={onClickFavorite}
        isInNomenclature
      />
      <ModalSelectCountry
        isOpen={openSelectCountryModal}
        onClose={onCloseSelectCountryModal}
        modalType={ModalType.DOWN}
        preventClose={!countryForProductsNomenclature}
        onSelect={(country) => onSelectCountry(country)}
        defaultCountry={defaultCountry}
      />
      {shouldShowSetDefaultCountryModal && (
        <ModalSetDefaultCountry
          country={selectedCountry}
          isOpen={openSetDefaultCountryModal}
          onClose={onCloseSetDefaultCountryModal}
          modalType={ModalType.DOWN}
          preventClose={!countryForProductsNomenclature}
          onSet={updateDefaultCountry}
        />
      )}
    </>
  );
};

export default NomenclaturePageMobile;
