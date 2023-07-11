import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  useChangeStatusOfDeclarationMutation,
  useDeclarationMutation,
} from '@/api/hooks/useAPIDeclaration';
import { ModalPaidDeclaration } from '@/components/autonomous/ModalPaidDeclaration';
import { ModalRejectedDeclaration } from '@/components/autonomous/ModalRejectedDeclaration';
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
  const [validateDeclarationResponse, setValidateDeclarationResponse] = useState<any>();

  const onClose = () => {
    setOpenDownModal(false);
    setOpenValidateDeclarationModal(false);
    setOpenPayDeclarationModal(false);
    setOpenRejectDeclarationModal(false);
  };

  const getDeclarationMutation = useDeclarationMutation({
    onSuccess: (data) => {
      setValidateDeclarationResponse(data);
    },
  });

  const { isLoading } = getDeclarationMutation;

  useEffect(() => {
    getDeclarationMutation.mutate(id);
  }, [id]);

  const changeStatusOfDeclarationMutation = useChangeStatusOfDeclarationMutation({
    onSuccess: () => {
      onClose();
      getDeclarationMutation.mutate(id);
    },
  });

  const onValidateDeclaration = () => {
    if (!validateDeclarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: validateDeclarationResponse.id,
      status: DeclarationStatus.VALIDATED,
    });
  };

  const onPayDeclaration = () => {
    if (!validateDeclarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: validateDeclarationResponse.id,
      status: DeclarationStatus.PAID,
    });
  };

  const onRejectForErrorDeclaration = () => {
    if (!validateDeclarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: validateDeclarationResponse.id,
      status: DeclarationStatus.ERROR,
    });
  };

  const onRejectForLitigationDeclaration = () => {
    if (!validateDeclarationResponse) return;
    changeStatusOfDeclarationMutation.mutate({
      declarationId: validateDeclarationResponse.id,
      status: DeclarationStatus.LITIGATION,
    });
  };

  const renderValidateDeclarationModal = (status: DeclarationStatus) => {
    switch (status) {
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
        return <></>;
      default:
        return (
          <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
            <div className="flex flex-col gap-2">
              <Button fullWidth onClick={() => setOpenValidateDeclarationModal(true)}>
                Valider la déclaration
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setOpenRejectDeclarationModal(true)}
              >
                Déclaration non conforme
              </Button>
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
      >
        {!isLoading && validateDeclarationResponse && (
          <div className="flex flex-1 flex-col">
            <div className="flex w-full flex-col gap-4 border-b border-white px-4 pb-7 pt-0">
              <DeclarationStatusDetails
                status={validateDeclarationResponse.status}
                declarationId={validateDeclarationResponse.publicId}
                date={validateDeclarationResponse.versionDate}
              />
            </div>
            <div className="flex w-full flex-col gap-4 border-b-4 border-white">
              <DeclarationContactDetails
                address={validateDeclarationResponse.declarantAddressStreet}
                city={validateDeclarationResponse.declarantAddressCity}
                postalCode={validateDeclarationResponse.declarantAddressPostalCode}
                age={validateDeclarationResponse.declarantAge}
                firstName={validateDeclarationResponse.declarantFirstName}
                lastName={validateDeclarationResponse.declarantLastName}
                email={validateDeclarationResponse.declarantEmail}
                phoneNumber={validateDeclarationResponse.declarantPhoneNumber}
              />
            </div>
            <div className="py-7 bg-secondary-100 flex flex-col justify-center">
              <TaxTable declarationResponse={validateDeclarationResponse} />
              <button
                onClick={() => setOpenDownModal(true)}
                className="bg-primary-400 px-8 py-3 text-white rounded-full self-center"
              >
                <Typography color="white">Ajouter un commentaire</Typography>
              </button>
            </div>
            {renderValidateDeclarationModal(validateDeclarationResponse.status)}
            <ModalUnderConstruction open={openDownModal} onClose={() => setOpenDownModal(false)} />
          </div>
        )}
      </MainAgent>

      {validateDeclarationResponse && (
        <>
          <ModalValidateDeclaration
            open={openValidateDeclarationModal}
            onClose={() => setOpenValidateDeclarationModal(false)}
            isLoading={false}
            onValidate={onValidateDeclaration}
            declarationId={validateDeclarationResponse.publicId}
          />
          <ModalPaidDeclaration
            open={openPayDeclarationModal}
            onClose={() => setOpenPayDeclarationModal(false)}
            isLoading={false}
            onPaid={onPayDeclaration}
            declarationId={validateDeclarationResponse.publicId}
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
    </AgentRoute>
  );
};
export default DeclarationSearch;
