import { useEffect, useState } from 'react';

import { Alpha2Code } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { toast } from 'react-toastify';
import shallow from 'zustand/shallow';

import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { ModalCategoryProduct } from '@/components/autonomous/ModalCategoryProduct';
import { ModalSearchProduct } from '@/components/autonomous/ModalSearchProduct';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { declaration } from '@/core/hoc/declaration.hoc';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Declaration = () => {
  const {
    resetDeclarationSteps,
    setProductsDeclarationToDisplay,
    getAllShoppingProduct,
    removeProductDeclaration,
    resetDeclaration,
    declarationId,
    declarationRequest,
    defaultCurrency,
  } = useStore(
    (state) => ({
      resetDeclarationSteps: state.resetDeclarationSteps,
      setProductsDeclarationToDisplay: state.setProductsDeclarationToDisplay,
      getAllShoppingProduct: state.getAllShoppingProduct,
      removeProductDeclaration: state.removeProductCartDeclaration,
      resetDeclaration: state.resetDeclaration,
      declarationId: state.declaration.appState.declarationRequest.declarationId,
      declarationRequest: state.declaration.appState.declarationRequest,
      defaultCurrency: state.declaration.appState.declarationRequest.defaultCurrency,
    }),
    shallow,
  );
  const router = useRouter();

  const [openSearchDownModal, setOpenSearchDownModal] = useState(false);
  const [openCategoryDownModal, setOpenCategoryDownModal] = useState(false);
  const [openFavoriteDownModal, setOpenFavoriteDownModal] = useState(false);
  const [allShoppingProducts, setAllShoppingProducts] = useState<ShoppingProduct[]>([]);

  useEffect(() => {
    resetDeclarationSteps(3);
    setProductsDeclarationToDisplay();
    setAllShoppingProducts(getAllShoppingProduct());
  }, []);

  const onClickProductToRemove = (id: string) => {
    removeProductDeclaration(id);
    setAllShoppingProducts(getAllShoppingProduct());
  };

  const handleCloseDownModal = () => {
    setOpenSearchDownModal(false);
    setOpenCategoryDownModal(false);
  };

  const { handleSubmit } = useForm();

  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      router.push(`/agent/declaration/${declarationId}`);
      resetDeclaration();
      toast.success(
        "Votre signalement a bien été envoyé. Vous serez notifié dès qu'il sera traité.",
      );
    },
  });

  const onSubmit = () => {
    createDeclarationMutation.mutate({
      declarationId,
      contactDetails: declarationRequest.contactDetails,
      shoppingProducts: declarationRequest.shoppingProducts,
      border: declarationRequest.border,
      meansOfTransportAndCountry: declarationRequest.meansOfTransportAndCountry,
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
      <DeclarationSteps
        currentStep={3}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
        simpleBg
      >
        <div className="p-5 bg-secondary-100 rounded-md">
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
              <Icon name="chevron-down" size="sm" />
            </div>
          </button>
          <button
            onClick={() => setOpenCategoryDownModal(true)}
            type="button"
            className="gap-3 bg-white border-2 border-secondary-200 rounded-full flex-1 flex justify-center items-center"
          >
            <div className="flex flex-row items-center gap-3">
              <Typography color="black" size="text-xs">
                Filtrer par catégories
              </Typography>
              <Icon name="chevron-down" size="sm" />
            </div>
          </button>
        </div>

        {allShoppingProducts.map((product) => (
          <button
            key={product.id}
            className="mt-1 w-full bg-red-500"
            onClick={() => onClickProductToRemove(product.id)}
          >
            {product.name}
          </button>
        ))}

        <Button
          type="submit"
          onClick={() => onSubmit}
          disabled={!allShoppingProducts.length}
          className={{ 'absolute bottom-6 self-center': true }}
        >
          Valider les marchandises
        </Button>
      </DeclarationSteps>

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
    </AgentRoute>
  );
};

export default declaration(Declaration);
