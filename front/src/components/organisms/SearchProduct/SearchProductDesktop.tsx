import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { NomenclatureCard } from '../../molecules/NomenclatureCard';
import { FavoriteProducts } from '../FavoriteProducts';
import { DefaultValuesUpdateProduct, OnAddProductOptions } from '../FormSelectProduct';
import { ModalAddProductCartDeclaration } from '../ModalAddProductCartDeclaration';
import { ModalDeleteProductCartDeclaration } from '../ModalDeleteProductCartDeclaration';
import { SearchProductFilterBar } from './filters/SearchProductFilters';
import { ShoppingProductsCart } from './product/ShoppingProductsCart';
import { useCreateFavoriteMutation, useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import {
  useGetSearchProductHistory,
  usePutSearchProductHistoryMutation,
} from '@/api/hooks/useAPIProducts';
import { Typography } from '@/components/atoms/Typography';
import { CategoryProductDesktop } from '@/components/organisms/CategoryProduct/CategoryProductDesktop';
import {
  FormAddFavoriteData,
  ModalAddFavoriteProduct,
} from '@/components/organisms/ModalAddFavoriteProduct/ModalAddFavoriteProduct';
import { ModalCategoryNomenclatureProduct } from '@/components/organisms/ModalCategoryNomenclatureProduct';
import { ModalDeleteFavoriteProduct } from '@/components/organisms/ModalDeleteFavoriteProduct/ModalDeleteFavoriteProduct';
import { ModalSelectCountry } from '@/components/organisms/ModalSelectCountry';
import { IdRequiredProduct, Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
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
  const { trackEvent } = useMatomo();
  const {
    searchNomenclatureProducts,
    searchProducts,
    findProduct,
    addFavoriteProducts,
    removeFavoriteProducts,
    countryForProductsNomenclature,
    addProductCartDeclarationAgent,
    removeProductDeclaration,
    updateProductCartDeclarationAgent,
    findDeclarationShoppingProductAgent,
  } = useStore(
    (state) => ({
      searchNomenclatureProducts: state.searchNomenclatureProducts,
      searchProducts: state.searchProducts,
      findProduct: state.findProduct,
      addFavoriteProducts: state.addFavoriteProducts,
      removeFavoriteProducts: state.removeFavoriteProducts,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
      addProductCartDeclarationAgent: state.addProductCartDeclarationAgent,
      removeProductDeclaration: state.removeProductCartDeclarationAgent,
      updateProductCartDeclarationAgent: state.updateProductCartDeclarationAgent,
      declarationAgentResponse: state.declaration.appState.declarationAgentResponse,
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
      meansOfTransportAndCountry:
        state.declaration.appState.declarationAgentRequest.meansOfTransportAndCountry,
      findDeclarationShoppingProductAgent: state.findDeclarationShoppingProductAgent,
    }),
    shallow,
  );

  const { data: history, refetch: updateHistory } = useGetSearchProductHistory();
  const createFavoriteMutation = useCreateFavoriteMutation({});
  const removeFavoriteMutation = useRemoveFavoriteMutation({});
  const updateSearchProductHistory = usePutSearchProductHistoryMutation({
    onSuccess: updateHistory,
  });

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
  const [openDeclarationProductCartModal, setOpenDeclarationProductCartModal] = useState<
    'add' | 'update' | undefined
  >(undefined);

  const [favoriteValue, setFavoriteValue] = useState('');
  const [openAddFavoriteModal, setOpenAddFavoriteModal] = useState(false);
  const [openRemoveFavoriteModal, setOpenRemoveFavoriteModal] = useState(false);

  const [cartProductId, setCartProductId] = useState<string | undefined>(undefined);
  const [openRemoveCartProductModal, setOpenRemoveCartProductModal] = useState(false);

  const [defaultValuesProduct, setDefaultValuesProduct] = useState<
    DefaultValuesUpdateProduct | undefined
  >();

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
    setOpenDeclarationProductCartModal('add');
    updateSearchProductHistory.mutate({ productId: product.id, searchValue: search });
  };

  const onClearFieldClick = () => {
    setSearchValue('');
    setShowMatchingProducts(false);
    setProductsMatchingInputSearch([]);
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

  const onOpenDeclarationProductCartModal = (product: Product) => {
    setCurrentProduct(product);
    setOpenDeclarationProductCartModal('add');
  };

  const onCloseDeclarationProductCartModal = () => {
    setCurrentProduct(undefined);
    setOpenDeclarationProductCartModal(undefined);
  };

  const onOpenCategoryNomenclatureModal = (product: Product) => {
    setCurrentProduct(product);
    setOpenCategoryNomenclatureModal(true);
  };

  const onCloseCategoryNomenclatureModal = () => {
    setCurrentProduct(undefined);
    setOpenCategoryNomenclatureModal(false);
  };

  const onCloseDeleteCartProductModal = () => {
    setCartProductId(undefined);
    setOpenRemoveCartProductModal(false);
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

  const onAddProduct = ({ product, value, currency, name, customName }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclarationAgent(shoppingProduct);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue: customName });
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenDeclarationProductCartModal(undefined);
    setShowMatchingProducts(false);
    setShowCategoryFilters(false);
  };

  const onUpdateProduct = ({ product, value, currency, name }: OnAddProductOptions) => {
    if (!cartProductId) {
      return;
    }
    const shoppingProduct: ShoppingProduct = {
      id: cartProductId,
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    updateProductCartDeclarationAgent(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenDeclarationProductCartModal(undefined);
    setShowMatchingProducts(false);
  };

  const onRemoveCartProduct = (productId: string) => {
    setCartProductId(productId);
    setOpenRemoveCartProductModal(true);
  };

  const onConfirmRemoveCartProduct = () => {
    if (cartProductId) {
      removeProductDeclaration(cartProductId);
      setOpenRemoveCartProductModal(false);
    }
  };

  const onModifyClick = (productId: string) => {
    const shoppingProduct = findDeclarationShoppingProductAgent(productId);
    const product = findProduct(shoppingProduct?.productId ?? '');
    if (!shoppingProduct) {
      return;
    }
    setCartProductId(productId);
    setDefaultValuesProduct({
      customId: productId,
      currency: shoppingProduct?.currency,
      name: shoppingProduct?.name,
      value: shoppingProduct?.value,
    });
    setCurrentProduct(product);
    setOpenDeclarationProductCartModal('update');
  };

  return (
    <div>
      <div className=" first:p-5 bg-secondary-bg rounded-[20px] flex flex-col items-center gap-4">
        <SearchProductFilterBar
          onSearchProduct={searchFunction}
          placeholder="Que recherchez-vous ?  (type de vêtements, marques, matières...)"
          onClickProduct={onClickInputResult}
          onFilterClick={onFilterByCategoryClick}
          onSearchAllClick={onSearchAll}
          isCategoryFilterOpen={showCategoryFilters}
          history={history}
          onClearFieldClick={onClearFieldClick}
          clearButtonVisibility={showMatchingProducts}
        />

        <FavoriteProducts
          onFavoriteClick={
            variant === ProductSearchContext.DECLARATION
              ? onOpenDeclarationProductCartModal
              : onOpenCategoryNomenclatureModal
          }
        />
      </div>
      <div className="flex-col pt-5 relative flex">
        {variant === ProductSearchContext.NOMENCLATURE && (
          <div className="absolute right-0 top-[30px]">
            <ModalSelectCountry
              modalType={modalType}
              isOpen={true}
              preventClose={!countryForProductsNomenclature}
            />
          </div>
        )}
        {showCategoryFilters && (
          <CategoryProductDesktop
            onNomenclatureModalClose={onCloseCategoryNomenclatureModal}
            onDeclarationModalClose={onCloseDeclarationProductCartModal}
            onAddProductToDeclaration={onAddProduct}
            variant={variant}
          />
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
                {productsMatchingInputSearch.map((product, index) => {
                  return (
                    <div className="w-[292px]" key={index}>
                      <NomenclatureCard
                        product={product}
                        searchValue={searchValue}
                        onClick={
                          variant === ProductSearchContext.DECLARATION
                            ? onOpenDeclarationProductCartModal
                            : onOpenCategoryNomenclatureModal
                        }
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
        {variant === ProductSearchContext.DECLARATION &&
          !showMatchingProducts &&
          !showCategoryFilters && (
            <ShoppingProductsCart
              onRemoveCartProduct={onRemoveCartProduct}
              onModifyClick={onModifyClick}
            />
          )}
      </div>

      {currentProduct && variant === ProductSearchContext.NOMENCLATURE && (
        <ModalCategoryNomenclatureProduct
          open={openCategoryNomenclatureModal}
          onClose={onCloseCategoryNomenclatureModal}
          defaultProduct={currentProduct}
          modalType={modalType}
        />
      )}
      {currentProduct && variant === ProductSearchContext.DECLARATION && (
        <ModalAddProductCartDeclaration
          open={!!openDeclarationProductCartModal}
          onClose={onCloseDeclarationProductCartModal}
          onAddProduct={openDeclarationProductCartModal === 'add' ? onAddProduct : onUpdateProduct}
          currentProduct={currentProduct}
          modalType={modalType}
          defaultValues={defaultValuesProduct ?? undefined}
        />
      )}
      {currentFavorite && (
        <>
          <ModalAddFavoriteProduct
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
      {cartProductId && (
        <ModalDeleteProductCartDeclaration
          modalType={ModalType.CENTER}
          open={openRemoveCartProductModal}
          onClose={onCloseDeleteCartProductModal}
          onDeleteProduct={onConfirmRemoveCartProduct}
        />
      )}
    </div>
  );
};
