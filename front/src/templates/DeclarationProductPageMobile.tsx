import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import type { Alpha2Code } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { usePutSearchProductHistoryMutation } from '@/api/hooks/useAPIProducts';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { AmountAgentProductBasketGroup } from '@/components/organisms/AmountAgentProductBasket/AmountAgentProductBasketGroup';
import { CategoryProductMobile } from '@/components/organisms/CategoryProduct';
import {
  DefaultValuesUpdateProduct,
  OnAddProductOptions,
} from '@/components/organisms/FormSelectProduct';
import { ModalAddProductCartDeclaration } from '@/components/organisms/ModalAddProductCartDeclaration';
import { ModalDeleteProductCartDeclaration } from '@/components/organisms/ModalDeleteProductCartDeclaration';
import { ModalFavorites } from '@/components/organisms/ModalFavorites';
import { ModalSearchProduct } from '@/components/organisms/ModalSearchProduct';
import { ValueAgentProductBasket } from '@/components/organisms/ValueAgentProductBasket';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { IdRequiredProduct, Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationAgentStepsMobile } from '@/templates/DeclarationAgentStepsMobile';
import { DECLARATION_STEP_PAGE } from '@/utils/const';
import { haveAgeRestriction } from '@/utils/product.util';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Declaration = () => {
  const {
    setProductsDeclarationToDisplayAgent,
    removeProductDeclaration,
    updateProductCartDeclarationAgent,
    addProductCartDeclarationAgent,
    resetDeclarationAgent,
    findProduct,
    findDeclarationShoppingProductAgent,
    declarationId,
    declarationAgentRequest,
    meansOfTransportAndCountry,
    defaultCurrency,
    declarationAgentResponse,
    favoriteProducts,
  } = useStore(
    (state) => ({
      setProductsDeclarationToDisplayAgent: state.setProductsDeclarationToDisplayAgent,
      updateProductCartDeclarationAgent: state.updateProductCartDeclarationAgent,
      addProductCartDeclarationAgent: state.addProductCartDeclarationAgent,
      removeProductDeclaration: state.removeProductCartDeclarationAgent,
      resetDeclarationAgent: state.resetDeclarationAgent,
      findProduct: state.findProduct,
      findDeclarationShoppingProductAgent: state.findDeclarationShoppingProductAgent,
      declarationId: state.declaration.appState.declarationAgentRequest?.declarationId,
      declarationAgentResponse: state.declaration.appState.declarationAgentResponse,
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
      meansOfTransportAndCountry:
        state.declaration.appState.declarationAgentRequest.meansOfTransportAndCountry,
      defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
      favoriteProducts: state.products.appState.favoriteProducts,
    }),
    shallow,
  );

  const amountProducts = declarationAgentResponse?.amountProducts;
  const valueProducts = declarationAgentResponse?.valueProducts;
  const customProducts = declarationAgentResponse?.customProducts;
  const { trackEvent } = useMatomo();
  const router = useRouter();
  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [openFavoriteDownModal, setOpenFavoriteDownModal] = useState(false);
  const [isAvailableToEdit, setIsAvailableToEdit] = useState<boolean>(false);
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [categoryProductToShow, setCategoryProductToShow] = useState<Product | undefined>(
    undefined,
  );
  const [deletedProductId, setDeletedProductId] = useState<string | undefined>();
  const [defaultValuesProduct, setDefaultValuesProduct] = useState<
    DefaultValuesUpdateProduct | undefined
  >();
  const totalProducts =
    (valueProducts?.length ?? 0) + (amountProducts?.length ?? 0) + (customProducts?.length ?? 0);

  useEffect(() => {
    setProductsDeclarationToDisplayAgent();
  }, []);

  useEffect(() => {
    if (valueProducts && valueProducts.length === 0) setIsAvailableToEdit(false);
  }, [valueProducts]);

  const onClickProductToRemove = (id: string) => {
    removeProductDeclaration(id);
  };

  const handleCloseDownModal = () => {
    setOpenSearchDownModal(false);
    setOpenCategoryDownModal(false);
    setOpenFavoriteDownModal(false);
    setOpenModalAddProduct(false);
    setOpenModalDeleteProduct(false);
    setTimeout(() => {
      setCategoryProductToShow(undefined);
    }, 250);
  };

  const { handleSubmit } = useForm();

  const updateSearchProductHistory = usePutSearchProductHistoryMutation({});

  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      resetDeclarationAgent();
      router.push(`/agent/declaration/${declarationId}`);
    },
  });

  const onUpdateProduct = ({ product, value, currency, name, customId }: OnAddProductOptions) => {
    const shoppingProduct: Partial<ShoppingProduct> = {
      id: customId,
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    updateProductCartDeclarationAgent(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
    setOpenModalAddProduct(false);
    router.push(`/agent/declaration/ajout/marchandises`);
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
    setOpenCategoryDownModal(false);
  };

  const onModifyClick = (id: string) => {
    const shoppingProduct = findDeclarationShoppingProductAgent(id);
    const product = findProduct(shoppingProduct?.productId ?? '');
    if (!shoppingProduct) {
      return;
    }
    setDefaultValuesProduct({
      customId: id,
      currency: shoppingProduct?.currency,
      name: shoppingProduct?.name,
      value: shoppingProduct?.value,
    });
    setSelectedProduct(product);
    setOpenModalAddProduct(true);
  };

  const onSubmit = () => {
    if (!declarationId) return;
    createDeclarationMutation.mutate({
      declarationId,
      contactDetails: declarationAgentRequest.contactDetails,
      shoppingProducts: declarationAgentRequest.shoppingProducts,
      border: declarationAgentRequest.border,
      meansOfTransportAndCountry: declarationAgentRequest.meansOfTransportAndCountry,
      authorType: 'agent',
    });
  };

  const onSearchProduct = (product: IdRequiredProduct, searchValue: string) => {
    setOpenSearchDownModal(false);
    updateSearchProductHistory.mutate({ productId: product.id, searchValue });
    router.push({
      pathname: '/agent/declaration/produits/recherche',
      query: { search: searchValue, selectedId: product.id },
    });
  };

  const onClickFavorite = (product: Product) => {
    setOpenFavoriteDownModal(false);
    setCategoryProductToShow(product);
    setOpenCategoryDownModal(true);
  };

  const onSearchAll = (searchValue: string) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/declaration/produits/recherche',
      query: { search: searchValue },
    });
  };

  const flattenFavoriteProducts: Product[] = [];
  const ageRestrictionFavoriteProducts: Product[] = [];

  favoriteProducts?.forEach((favoriteProduct) => {
    const product = findProduct(favoriteProduct.id);
    if (product) {
      flattenFavoriteProducts.push(product);
    } else if (haveAgeRestriction(favoriteProduct)) {
      ageRestrictionFavoriteProducts.push(favoriteProduct);
    }
  });

  const withoutFavoriteProducts =
    flattenFavoriteProducts.length === 0 && ageRestrictionFavoriteProducts.length === 0;

  return (
    <AgentRoute>
      <DeclarationAgentStepsMobile
        currentStep={3}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
        linkButton={DECLARATION_STEP_PAGE[2]}
        simpleBg
      >
        <div className="p-5 bg-secondary-bg rounded-md">
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
            onClick={withoutFavoriteProducts ? () => {} : () => setOpenFavoriteDownModal(true)}
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
            onClick={() => setOpenCategoryDownModal(true)}
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

        {(valueProducts || amountProducts) && (
          <>
            <div className="w-full mt-5 flex flex-col gap-4 flex-1 justify-between">
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-row justify-between items-center mb-1">
                  <Typography color="black" size="text-xs">
                    Marchandises <b>{totalProducts}</b>
                  </Typography>
                  {totalProducts > 0 && (
                    <Typography
                      color={isAvailableToEdit ? 'black' : 'primary'}
                      colorGradient="400"
                      size="text-xs"
                      onClick={() => setIsAvailableToEdit(!isAvailableToEdit)}
                    >
                      <span className="cursor-pointer">
                        {isAvailableToEdit ? 'Annuler' : 'Modifier'}
                      </span>
                    </Typography>
                  )}
                </div>
                {valueProducts?.map((product, index) => (
                  <ValueAgentProductBasket
                    product={product}
                    nomenclatures={[]}
                    key={`${product.id}-${index}`}
                    editable={isAvailableToEdit}
                    onDelete={(id) => {
                      setDeletedProductId(id);
                      setOpenModalDeleteProduct(true);
                    }}
                    detailsButton
                    onEditClick={onModifyClick}
                    withCalculation={declarationAgentResponse.canCalculateTaxes}
                  />
                ))}
                {customProducts?.map((product, index) => (
                  <ValueAgentProductBasket
                    product={product}
                    nomenclatures={[]}
                    key={`${product.id}-${index}`}
                    editable={isAvailableToEdit}
                    onDelete={(id) => {
                      setDeletedProductId(id);
                      setOpenModalDeleteProduct(true);
                    }}
                    detailsButton
                    onEditClick={onModifyClick}
                    withCalculation={declarationAgentResponse.canCalculateTaxes}
                  />
                ))}
                {amountProducts &&
                  amountProducts.map((amountProduct, index) => (
                    <AmountAgentProductBasketGroup
                      amountProductGroup={amountProduct}
                      country={meansOfTransportAndCountry.country}
                      border={declarationAgentRequest.border}
                      onDelete={(id) => {
                        setDeletedProductId(id);
                        setOpenModalDeleteProduct(true);
                      }}
                      editable={isAvailableToEdit}
                      onModifyClick={onModifyClick}
                      key={`${amountProduct.group}-${index}`}
                    />
                  ))}
              </div>

              <Button
                type="submit"
                onClick={() => onSubmit}
                disabled={!declarationAgentResponse.canCreateDeclaration}
                className={{ 'self-center': true }}
              >
                Valider les marchandises
              </Button>
            </div>
          </>
        )}
      </DeclarationAgentStepsMobile>

      <ModalSearchProduct
        open={openSearchDownModal}
        onClose={handleCloseDownModal}
        onClickProduct={(product, searchValue) => onSearchProduct(product, searchValue)}
        onSearchAll={onSearchAll}
      />
      <CategoryProductMobile
        open={openCategoryDownModal}
        onClose={handleCloseDownModal}
        onAddProduct={onAddProduct}
        defaultCurrency={defaultCurrency}
        defaultProduct={categoryProductToShow}
      />

      <ModalAddProductCartDeclaration
        open={openModalAddProduct}
        onClose={handleCloseDownModal}
        onAddProduct={onUpdateProduct}
        currentProduct={selectedProduct}
        defaultCurrency={defaultCurrency}
        defaultValues={defaultValuesProduct ?? undefined}
      />

      <ModalDeleteProductCartDeclaration
        open={openModalDeleteProduct}
        onClose={handleCloseDownModal}
        onDeleteProduct={() => {
          if (deletedProductId) {
            onClickProductToRemove(deletedProductId);
          }
          handleCloseDownModal();
        }}
      />

      <ModalFavorites
        open={openFavoriteDownModal}
        onClose={() => setOpenFavoriteDownModal(false)}
        onClickFavorite={onClickFavorite}
      />
    </AgentRoute>
  );
};

export default declarationAgent(Declaration);
