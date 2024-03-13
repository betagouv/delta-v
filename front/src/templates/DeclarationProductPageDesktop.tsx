import { useState } from 'react';

import { UseFormHandleSubmit, useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { DeclarationAgentStepsDesktop } from './DeclarationAgentStepsDesktop';
import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { ProductSearchTools } from '@/components/business/SearchProduct/SearchProductDesktop';
import { SummaryDeclarationAgent } from '@/components/business/SummaryDeclarationAgent';
import Modal from '@/components/common/Modal';
import { useStore } from '@/stores/store';
import { DECLARATION_STEP_PAGE } from '@/utils/const';
import { ProductSearchContext } from '@/utils/enums';

export const DeclarationProductPageDesktop = () => {
  const { declarationId, declarationAgentRequest } = useStore(
    (state) => ({
      declarationId: state.declaration.appState.declarationAgentRequest?.declarationId,
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
    }),
    shallow,
  );

  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      setOpenSummaryModal(true);
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
        {declarationId && (
          <Modal
            open={openSummaryModal}
            scrollable
            noPadding
            onClose={() => setOpenSummaryModal(false)}
          >
            <SummaryDeclarationAgent declarationId={declarationId} hideBackgroundSummary />
          </Modal>
        )}
      </DeclarationAgentStepsDesktop>
    </AgentRoute>
  );
};
