import { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Alpha2Code } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { ModalAddProductCartDeclaration } from '@/components/autonomous/ModalAddProductCartDeclaration';
import { ModalCategoryProduct } from '@/components/autonomous/ModalCategoryProduct';
import { ModalDeleteProductCartDeclaration } from '@/components/autonomous/ModalDeleteProductCartDeclaration';
import { ModalSearchProduct } from '@/components/autonomous/ModalSearchProduct';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import {
  DefaultValuesUpdateProduct,
  OnAddProductOptions,
} from '@/components/business/FormSelectProduct';
import { ValueAgentProductBasket } from '@/components/business/ValueAgentProductBasket';
import { AmountAgentProductBasketGroup } from '@/components/common/AmountAgentProductBasket/AmountAgentProductBasketGroup';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationAgentSteps } from '@/templates/DeclarationAgentSteps';
import { DECLARATION_STEP_PAGE } from '@/utils/const';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Declaration = () => {
  const {
    setProductsDeclarationToDisplayAgent,
    removeProductDeclaration,
    updateProductCartDeclarationAgent,
    resetDeclaration,
    findProduct,
    findDeclarationShoppingProductAgent,
    declarationId,
    declarationAgentRequest,
    meansOfTransportAndCountry,
    defaultCurrency,
    valueProducts,
    amountProducts,
  } = useStore(
    (state) => ({
      setProductsDeclarationToDisplayAgent: state.setProductsDeclarationToDisplayAgent,
      updateProductCartDeclarationAgent: state.updateProductCartDeclarationAgent,
      removeProductDeclaration: state.removeProductCartDeclarationAgent,
      resetDeclaration: state.resetDeclaration,
      findProduct: state.findProduct,
      findDeclarationShoppingProductAgent: state.findDeclarationShoppingProductAgent,
      declarationId: state.declaration.appState.declarationAgentRequest?.declarationId,
      valueProducts: state.declaration.appState.declarationAgentResponse?.valueProducts,
      amountProducts: state.declaration.appState.declarationAgentResponse?.amountProducts,
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
      meansOfTransportAndCountry:
        state.declaration.appState.declarationAgentRequest.meansOfTransportAndCountry,
      defaultCurrency: state.declaration.appState.declarationAgentRequest.defaultCurrency,
    }),
    shallow,
  );
  const { trackEvent } = useMatomo();
  const router = useRouter();
  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [openFavoriteDownModal, setOpenFavoriteDownModal] = useState(false);
  const [isAvailableToRemove, setIsAvailableToRemove] = useState<boolean>(false);
  const [openModalAddProduct, setOpenModalAddProduct] = useState<boolean>(false);
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [deletedProductId, setDeletedProductId] = useState<string | undefined>();
  const [defaultValuesProduct, setDefaultValuesProduct] = useState<
    DefaultValuesUpdateProduct | undefined
  >();

  useEffect(() => {
    setProductsDeclarationToDisplayAgent();
  }, []);

  useEffect(() => {
    if (valueProducts && valueProducts.length === 0) setIsAvailableToRemove(false);
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
  };

  const { handleSubmit } = useForm();

  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      resetDeclaration();
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
    });
  };

  const onClickProduct = (product: Product) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/declaration/produits/recherche',
      query: { id: product.id },
    });
  };

  const onSearchAll = (searchValue: string) => {
    setOpenSearchDownModal(false);
    router.push({
      pathname: '/agent/declaration/produits/recherche',
      query: { search: searchValue },
    });
  };

  return (
    <AgentRoute>
      <DeclarationAgentSteps
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
              <div className="px-5 py-3 border border-secondary-100 bg-white rounded-full mt-[10px]">
                <Typography color="light-gray" size="text-sm">
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
            className="gap-3 bg-primary-400 rounded-full px-5 py-2 text-white"
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
                    Marchandises{' '}
                    <b>{(valueProducts?.length ?? 0) + (amountProducts?.length ?? 0)}</b>
                  </Typography>
                  {(valueProducts?.length ?? 0) + (amountProducts?.length ?? 0) > 0 && (
                    <Typography
                      color={isAvailableToRemove ? 'black' : 'primary'}
                      colorGradient="400"
                      size="text-xs"
                      onClick={() => setIsAvailableToRemove(!isAvailableToRemove)}
                    >
                      {isAvailableToRemove ? 'Annuler' : 'Supprimer'}
                    </Typography>
                  )}
                </div>
                {valueProducts?.map((product, index) => (
                  <ValueAgentProductBasket
                    product={product}
                    nomenclatures={[]}
                    key={`${product.id}-${index}`}
                    deletable={isAvailableToRemove}
                    onDelete={(id) => {
                      setDeletedProductId(id);
                      setOpenModalDeleteProduct(true);
                    }}
                    detailsButton
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
                      deletable={isAvailableToRemove}
                      onModifyClick={onModifyClick}
                      key={`${amountProduct.group}-${index}`}
                    />
                  ))}
              </div>

              <Button
                type="submit"
                onClick={() => onSubmit}
                disabled={
                  (!valueProducts?.length && !amountProducts?.length) ||
                  !!amountProducts?.find((amountProduct) => amountProduct.isOverMaximum)
                }
                className={{ 'self-center': true }}
              >
                Valider les marchandises
              </Button>
            </div>
          </>
        )}
      </DeclarationAgentSteps>

      <ModalSearchProduct
        open={openSearchDownModal}
        onClose={handleCloseDownModal}
        onClickProduct={onClickProduct}
        onSearchAll={onSearchAll}
      />
      <ModalCategoryProduct
        open={openCategoryDownModal}
        onClose={handleCloseDownModal}
        defaultCurrency={defaultCurrency}
      />
      <ModalUnderConstruction
        open={openFavoriteDownModal}
        onClose={() => setOpenFavoriteDownModal(false)}
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
    </AgentRoute>
  );
};

export default declarationAgent(Declaration);
