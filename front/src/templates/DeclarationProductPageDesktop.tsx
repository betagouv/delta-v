import router from 'next/router';
import { UseFormHandleSubmit, useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { DeclarationAgentStepsDesktop } from './DeclarationAgentStepsDesktop';
import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { ProductSearchTools } from '@/components/business/SearchProduct/SearchProductDesktop';
import { useStore } from '@/stores/store';
import { DECLARATION_STEP_PAGE } from '@/utils/const';
import { ProductSearchContext } from '@/utils/enums';

export const DeclarationProductPageDesktop = () => {
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
  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      resetDeclarationAgent();
      router.push(`/agent/declaration/${declarationId}`);
    },
  });
  const { handleSubmit } = useForm();
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
  return (
    <AgentRoute>
      <DeclarationAgentStepsDesktop
        currentStep={3}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
        linkButton={DECLARATION_STEP_PAGE[2]}
        simpleBg
      >
        <ProductSearchTools variant={ProductSearchContext.DECLARATION} />
      </DeclarationAgentStepsDesktop>
    </AgentRoute>
  );
};
