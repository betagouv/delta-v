import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  useChangeStatusOfDeclarationMutation,
  useDeclarationMutation,
} from '@/api/hooks/useAPIDeclaration';
import { ModalPaidDeclaration } from '@/components/autonomous/ModalPaidDeclaration';
import { ModalRejectedDeclaration } from '@/components/autonomous/ModalRejectedDeclaration';
import { ModalSwitchPaperDeclaration } from '@/components/autonomous/ModalSwitchPaperDeclaration';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { ModalValidateDeclaration } from '@/components/autonomous/ModalValidateDeclaration';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { DeclarationContactDetails } from '@/components/business/DeclarationContactDetails';
import { DeclarationStatusDetails } from '@/components/business/DeclarationStatusDetails';
import { TaxTable } from '@/components/business/TaxTable';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { DeclarationStatus } from '@/utils/declarationStatus.util';
import { isUUIDRegex } from '@/utils/formatTools';

const DeclarationSearch = () => {
  const router = useRouter();
  const query = router.query as { id: string };
  const id = isUUIDRegex(query.id) ? query.id : '';

  const [openDownModal, setOpenDownModal] = useState(false);
  const [openValidateDeclarationModal, setOpenValidateDeclarationModal] = useState(false);
  const [openPayDeclarationModal, setOpenPayDeclarationModal] = useState(false);
  const [openRejectDeclarationModal, setOpenRejectDeclarationModal] = useState(false);
  const [openSwitchPaperDeclarationModal, setOpenSwitchPaperDeclarationModal] = useState(false);

  const onClose = () => {
    setOpenDownModal(false);
    setOpenValidateDeclarationModal(false);
    setOpenPayDeclarationModal(false);
    setOpenRejectDeclarationModal(false);
    setOpenSwitchPaperDeclarationModal(false);
  };

  const getDeclarationMutation = useDeclarationMutation({});

  const { isLoading, data: declarationResponse } = getDeclarationMutation;

  useEffect(() => {
    getDeclarationMutation.mutate({ id });
  }, [id]);

  const changeStatusOfDeclarationMutation = useChangeStatusOfDeclarationMutation({
    onSuccess: ({ newStatus }) => {
      onClose();
      getDeclarationMutation.mutate({ id });
      if (newStatus === DeclarationStatus.VALIDATED) {
        setTimeout(() => {
          setOpenPayDeclarationModal(true);
        }, 250);
      }
    },
  });

  const onValidateDeclaration = () => {
    if (!declarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: declarationResponse.id,
      status: DeclarationStatus.VALIDATED,
    });
  };

  const onPayDeclaration = () => {
    if (!declarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: declarationResponse.id,
      status: DeclarationStatus.PAID,
    });
  };

  const onRejectForErrorDeclaration = () => {
    if (!declarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: declarationResponse.id,
      status: DeclarationStatus.ERROR,
    });
  };

  const onRejectForLitigationDeclaration = () => {
    if (!declarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: declarationResponse.id,
      status: DeclarationStatus.LITIGATION,
    });
  };

  const onSwitchPaperDeclaration = () => {
    if (!declarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: declarationResponse.id,
      status: DeclarationStatus.SWITCH_PAPER,
    });
  };

  const renderValidateDeclarationModal = () => {
    switch (declarationResponse?.status) {
      case DeclarationStatus.VALIDATED:
        return (
          <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
            <div className="flex flex-col gap-2 w-[230px] self-center">
              <Typography size="text-sm" color="black">
                Voulez-vous valider le paiement cette déclaration ?
              </Typography>
              <Button fullWidth onClick={() => setOpenPayDeclarationModal(true)}>
                Valider
              </Button>
            </div>
          </div>
        );
      case DeclarationStatus.PAID:
      case DeclarationStatus.ERROR:
      case DeclarationStatus.LITIGATION:
      case DeclarationStatus.SWITCH_PAPER:
        return <></>;
      default:
        return (
          <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
            <div className="flex flex-col gap-5 items-center">
              <Button
                onClick={() => setOpenValidateDeclarationModal(true)}
                disabled={declarationResponse?.canCalculateTaxes === false}
              >
                Valider la déclaration
              </Button>
              <div className="flex flex-col gap-2.5 items-center">
                <Button variant="outlined" onClick={() => setOpenRejectDeclarationModal(true)}>
                  Déclaration non conforme
                </Button>
                <Button variant="outlined" onClick={() => setOpenSwitchPaperDeclarationModal(true)}>
                  Passage en déclaration papier
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withTitle
        titleHeader="Récapitulatif"
      >
        {!isLoading && declarationResponse && (
          <div className="flex flex-1 flex-col">
            <div className="flex w-full flex-col gap-4 border-b border-white px-4 pb-7 pt-0">
              <DeclarationStatusDetails
                status={declarationResponse.status}
                declarationId={declarationResponse.publicId}
                date={declarationResponse.versionDate}
              />
            </div>
            <div className="flex w-full flex-col gap-4 border-b-4 border-white">
              <DeclarationContactDetails
                address={declarationResponse.declarantAddressStreet}
                city={declarationResponse.declarantAddressCity}
                postalCode={declarationResponse.declarantAddressPostalCode}
                age={declarationResponse.declarantAge}
                firstName={declarationResponse.declarantFirstName}
                lastName={declarationResponse.declarantLastName}
                email={declarationResponse.declarantEmail}
                phoneNumber={declarationResponse.declarantPhoneNumber}
              />
            </div>
            <div className="py-7 bg-secondary-bg flex flex-col justify-center">
              <TaxTable declarationResponse={declarationResponse} />
              <button
                onClick={() => setOpenDownModal(true)}
                className="bg-primary-400 px-8 py-3 text-white rounded-full self-center"
              >
                <Typography color="white">Ajouter un commentaire</Typography>
              </button>
            </div>
            {renderValidateDeclarationModal()}
            <ModalUnderConstruction open={openDownModal} onClose={() => setOpenDownModal(false)} />
          </div>
        )}
      </MainAgent>

      {declarationResponse && (
        <>
          <ModalValidateDeclaration
            open={openValidateDeclarationModal}
            onClose={() => setOpenValidateDeclarationModal(false)}
            isLoading={false}
            onValidate={onValidateDeclaration}
            declarationId={declarationResponse.publicId}
          />
          <ModalPaidDeclaration
            open={openPayDeclarationModal}
            onClose={() => setOpenPayDeclarationModal(false)}
            isLoading={false}
            onPaid={onPayDeclaration}
            declarationId={declarationResponse.publicId}
          />
        </>
      )}
      <ModalRejectedDeclaration
        open={openRejectDeclarationModal}
        onClose={() => setOpenRejectDeclarationModal(false)}
        isLoading={false}
        onRejectedForError={onRejectForErrorDeclaration}
        onRejectedForLitigation={onRejectForLitigationDeclaration}
      />
      <ModalSwitchPaperDeclaration
        open={openSwitchPaperDeclarationModal}
        onClose={() => setOpenSwitchPaperDeclarationModal(false)}
        isLoading={false}
        onSwitchPaperDeclaration={onSwitchPaperDeclaration}
      />
    </AgentRoute>
  );
};
export default DeclarationSearch;
