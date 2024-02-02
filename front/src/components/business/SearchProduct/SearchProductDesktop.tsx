import { useEffect, useState } from 'react';

import { FavoriteProducts } from '../FavoriteProducts';
import { NomenclatureCard } from '../NomenclatureCard';
import { SearchProductFilterBar } from './filters/SearchProductFilters';
import { useCreateFavoriteMutation, useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { CategoryProductDesktop } from '@/components/autonomous/CategoryProduct/CategoryProductDesktop';
import {
  FormAddFavoriteData,
  ModalAddFavoriteProductMobile,
} from '@/components/autonomous/ModalAddFavoriteProduct/ModalAddFavoriteProductMobile';
import { ModalCategoryNomenclatureProduct } from '@/components/autonomous/ModalCategoryNomenclatureProduct';
import { ModalDeleteFavoriteProduct } from '@/components/autonomous/ModalDeleteFavoriteProduct/ModalDeleteFavoriteProduct';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import { Typography } from '@/components/common/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { ProductSearchContext } from '@/utils/enums';
import { ModalType } from '@/utils/modal';
import { getSearchProductResults } from '@/utils/search';

export interface ProductSearchToolsProps {
  variant?: ProductSearchContext;
}

export const ProductSearchTools = ({
  variant = ProductSearchContext.DECLARATION,
}: ProductSearchToolsProps) => {
  const {
    searchNomenclatureProducts,
    searchProducts,
    findProduct,
    addFavoriteProducts,
    removeFavoriteProducts,
    countryForProductsNomenclature,
  } = useStore((state) => ({
    searchNomenclatureProducts: state.searchNomenclatureProducts,
    searchProducts: state.searchProducts,
    findProduct: state.findProduct,
    addFavoriteProducts: state.addFavoriteProducts,
    removeFavoriteProducts: state.removeFavoriteProducts,
    countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
  }));

  const createFavoriteMutation = useCreateFavoriteMutation({});
  const removeFavoriteMutation = useRemoveFavoriteMutation({});
  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

  const searchFunction =
    variant === ProductSearchContext.NOMENCLATURE ? searchNomenclatureProducts : searchProducts;

  const modalType = ModalType.CENTER;

  const [showMatchingProducts, setShowMatchingProducts] = useState<boolean>(false);
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>('');

  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [currentFavorite, setCurrentFavorite] = useState<Product | undefined>(undefined);

  const [productsMatchingInputSearch, setProductsMatchingInputSearch] = useState<Product[]>([]);

  const [openCategoryNomenclatureModal, setOpenCategoryNomenclatureModal] = useState(false);

  const [favoriteValue, setFavoriteValue] = useState('');
  const [openAddFavoriteModal, setOpenAddFavoriteModal] = useState(false);
  const [openRemoveFavoriteModal, setOpenRemoveFavoriteModal] = useState(false);

  useEffect(() => {
    setProductsMatchingInputSearch(
      getSearchProductResults({
        selectedId,
        search: searchValue,
        findProduct,
        searchFunction,
      }),
    );
  }, [selectedId, searchValue]);

  useEffect(() => {
    setShowCategoryFilters(false);
  }, [countryForProductsNomenclature]);

  const onClickInputResult = (product: IdRequiredProduct, search: string) => {
    const fullProduct = findProduct(product.id);
    setSelectedId(product.id);
    setSearchValue(search);
    setShowCategoryFilters(false);
    setShowMatchingProducts(true);
    setCurrentProduct(fullProduct);
    setOpenCategoryNomenclatureModal(true);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue: search });
  };

  const onFilterByCategoryClick = () => {
    setShowCategoryFilters(!showCategoryFilters);
    setShowMatchingProducts(false);
    setProductsMatchingInputSearch([]);
  };

  const onSearchAll = (search: string) => {
    setSelectedId(undefined);
    setSearchValue(search);
    setShowCategoryFilters(false);
    setShowMatchingProducts(true);
  };

  const onFavoriteBadgeClick = (product: Product) => {
    setCurrentProduct(product);
    setOpenCategoryNomenclatureModal(true);
  };

  const onClickCard = (product: Product) => {
    setCurrentProduct(product);
    setOpenCategoryNomenclatureModal(true);
  };

  const onCloseCategoryNomenclatureModal = () => {
    setCurrentProduct(undefined);
    setOpenCategoryNomenclatureModal(false);
  };

  const onAddFavoriteIconClick = (product: Product) => {
    setCurrentFavorite(product);
    setOpenAddFavoriteModal(true);
  };

  const onCloseAddFavoriteModal = () => {
    setOpenAddFavoriteModal(false);
    setFavoriteValue('');
  };

  const onConfirmAddFavorite = (data: FormAddFavoriteData) => {
    if (!currentFavorite) {
      return;
    }
    addFavoriteProducts({ ...currentFavorite, name: data.name });
    createFavoriteMutation.mutate({
      productId: currentFavorite.id,
      name: data.name,
    });
    setFavoriteValue(data.name);
  };

  const onRemoveFavoriteIconClick = (product: Product) => {
    setCurrentFavorite(product);
    setOpenRemoveFavoriteModal(true);
  };

  const onCloseRemoveFavoriteModal = () => {
    setOpenRemoveFavoriteModal(false);
    setFavoriteValue('');
  };

  const onConfirmRemoveFavorite = (product?: Product) => {
    if (!currentFavorite) {
      return;
    }
    if (!product) {
      return;
    }
    removeFavoriteProducts(product.id);
    removeFavoriteMutation.mutate(product.id);
    onCloseRemoveFavoriteModal();
  };

  return (
    <div>
      <div className=" first:p-5 bg-secondary-bg rounded-[20px] flex flex-col items-center gap-4">
        <SearchProductFilterBar
          onSearchProduct={searchFunction}
          placeholder="Type de marchandises, marques..."
          onClickProduct={onClickInputResult}
          onFilterClick={onFilterByCategoryClick}
          onSearchAllClick={onSearchAll}
          isCategoryFilterOpen={showCategoryFilters}
        />

        <FavoriteProducts onFavoriteClick={onFavoriteBadgeClick} />
      </div>
      <div className="flex-col pt-5 relative flex">
        <div className="absolute right-0 top-[30px]">
          <ModalSelectCountry modalType={modalType} />
        </div>
        {showCategoryFilters && (
          <CategoryProductDesktop onModalClose={onCloseCategoryNomenclatureModal} />
        )}
        {showMatchingProducts && (
          <div className="flex flex-col gap-[30px]">
            <Typography size="text-xs" color="black">
              {`${productsMatchingInputSearch.length} résultat${
                productsMatchingInputSearch.length > 1 ? 's' : ''
              } pour "${searchValue}"`}
            </Typography>
            {productsMatchingInputSearch.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {productsMatchingInputSearch.map((product) => {
                  return (
                    <div className="w-[292px]">
                      <NomenclatureCard
                        product={product}
                        searchValue={searchValue}
                        onClick={onClickCard}
                        onAddFavorite={onAddFavoriteIconClick}
                        onRemoveFavorite={onRemoveFavoriteIconClick}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {currentProduct && (
        <ModalCategoryNomenclatureProduct
          open={openCategoryNomenclatureModal}
          onClose={onCloseCategoryNomenclatureModal}
          defaultProduct={currentProduct}
          modalType={modalType}
        />
      )}
      {currentFavorite && (
        <>
          <ModalAddFavoriteProductMobile
            open={openAddFavoriteModal}
            onClose={onCloseAddFavoriteModal}
            onSubmit={onConfirmAddFavorite}
            value={favoriteValue}
          />
          <ModalDeleteFavoriteProduct
            open={openRemoveFavoriteModal}
            onClose={onCloseRemoveFavoriteModal}
            onDeleteProduct={() => onConfirmRemoveFavorite(currentFavorite)}
            productName={currentFavorite.name}
          />
        </>
      )}
    </div>
  );
};
