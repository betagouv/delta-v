import { useEffect, useState } from 'react';

import { FavoriteProducts } from '../../FavoriteProducts';
import { NomenclatureCard } from '../../NomenclatureCard';
import { SearchProductDesktop } from '../../SearchProduct/desktop';
import { ProductSearchBarStyle } from '../enum';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { AddProductToFavorites } from '@/components/autonomous/AddProductToFavorites';
import { CategoryProductDesktop } from '@/components/autonomous/CategoryProduct/desktop';
import { ModalDeleteFavoriteProductDesktop } from '@/components/autonomous/ModalDeleteFavoriteProduct/desktop';
import { ModalSelectCountry } from '@/components/autonomous/ModalSelectCountry';
import CenterModal from '@/components/common/CenterModal';
import { Typography } from '@/components/common/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { getSearchProductResults } from '@/utils/search';

export interface ProductSearchToolsProps {
  variant?: ProductSearchBarStyle;
}

export const ProductSearchTools = ({
  variant = ProductSearchBarStyle.DECLARATION,
}: ProductSearchToolsProps) => {
  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});
  const { searchNomenclatureProducts, searchProducts, findProduct } = useStore((state) => ({
    searchNomenclatureProducts: state.searchNomenclatureProducts,
    searchProducts: state.searchProducts,
    findProduct: state.findProduct,
  }));

  const searchFunction =
    variant === ProductSearchBarStyle.NOMENCLATURE ? searchNomenclatureProducts : searchProducts;

  const [showMatchingProducts, setShowMatchingProducts] = useState<boolean>(false);
  const [showCategoryFilters, setShowCategoryFilters] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>('');
  const [productsThatMatch, setProductsThatMatch] = useState<Product[]>([]);
  const [isDeleteFavoriteModalOpen, setIsDeleteFavoriteModalOpen] = useState(false);

  const onClickProduct = (product: IdRequiredProduct, search: string) => {
    setSelectedId(product.id);
    setSearchValue(search);
    setShowCategoryFilters(false);
    setShowMatchingProducts(true);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue: search });
  };

  const onFilterByCategoryClick = (isOpen: boolean) => {
    setShowCategoryFilters(!isOpen);
    setShowMatchingProducts(false);
    setProductsThatMatch([]);
  };

  const onSearchAll = (search: string) => {
    setSelectedId(undefined);
    setSearchValue(search);
    setShowCategoryFilters(false);
    setShowMatchingProducts(true);
  };

  const onClickCard = (product: Product) => {
    setCurrentProduct(product);
  };

  const onConfirmDeleteFavorite = () => {
    setIsDeleteFavoriteModalOpen(false);
  };

  useEffect(() => {
    setProductsThatMatch(
      getSearchProductResults({
        selectedId,
        search: searchValue,
        findProduct,
        searchFunction,
      }),
    );
  }, [selectedId, searchValue]);

  return (
    <div>
      <div className=" first:p-5 bg-secondary-bg rounded-[20px] flex flex-col items-center gap-4">
        <SearchProductDesktop
          onSearchProduct={searchFunction}
          placeholder="Type de marchandises, marques..."
          onClickProduct={onClickProduct}
          onFilterClick={onFilterByCategoryClick}
          onSearchAllClick={onSearchAll}
        />

        <FavoriteProducts onFavoriteClick={(product) => setCurrentProduct(product)} />
      </div>
      <div className="flex-col pt-5 relative flex">
        <div className="absolute right-0 top-[30px]">
          <ModalSelectCountry />
        </div>
        {showCategoryFilters && <CategoryProductDesktop hideListOnModalClose={false} />}
        {showMatchingProducts && (
          <div className="flex flex-col gap-[30px]">
            <Typography size="text-xs" color="black">
              {`${productsThatMatch.length} résultat${
                productsThatMatch.length > 1 ? 's' : ''
              } pour "${searchValue}"`}
            </Typography>
            {productsThatMatch.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {productsThatMatch.map((product) => {
                  return (
                    <NomenclatureCard
                      product={product}
                      searchValue={searchValue}
                      onClick={onClickCard}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {currentProduct && (
        <>
          <ModalDeleteFavoriteProductDesktop
            open={isDeleteFavoriteModalOpen}
            productName={currentProduct.name}
            onDeleteProduct={onConfirmDeleteFavorite}
            onClose={() => setIsDeleteFavoriteModalOpen(false)}
          />
          <CenterModal open={true} noMargin onClose={() => setCurrentProduct(undefined)}>
            <AddProductToFavorites
              currentProduct={currentProduct}
              onAddProduct={() => console.log('product added to favorite')}
            />
          </CenterModal>
        </>
      )}
    </div>
  );
};
