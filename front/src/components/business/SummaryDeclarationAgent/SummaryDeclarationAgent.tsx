import { useEffect, useRef, useState } from 'react';

import { getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import ReactToPrint from 'react-to-print';
import shallow from 'zustand/shallow';

import { DeclarationJourneyDetails } from '../DeclarationJourneyDetails';
import {
  useChangeStatusOfDeclarationMutation,
  useDeclarationMutation,
} from '@/api/hooks/useAPIDeclaration';
import { ModalPaidDeclaration } from '@/components/autonomous/ModalPaidDeclaration';
import { ModalRejectedDeclaration } from '@/components/autonomous/ModalRejectedDeclaration';
import { ModalSwitchPaperDeclaration } from '@/components/autonomous/ModalSwitchPaperDeclaration';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { ModalValidateDeclaration } from '@/components/autonomous/ModalValidateDeclaration';
import { DeclarationContactDetails } from '@/components/business/DeclarationContactDetails';
import { DeclarationStatusDetails } from '@/components/business/DeclarationStatusDetails';
import { TaxTable } from '@/components/business/TaxTable';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { useStore } from '@/stores/store';
import { RoutingAgent } from '@/utils/const';
import { DeclarationStatus } from '@/utils/declarationStatus.util';
import { getMeanOfTransportsLabel } from '@/utils/meanOfTransports.util';

export const SummaryDeclarationAgent = ({
  declarationId,
  hideBackgroundSummary = false,
}: {
  declarationId: string;
  hideBackgroundSummary?: boolean;
}) => {
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  const pageStyle = `
  @page {
    size: 2.5in 4in
    margin: 16px;
  }
`;
  const { resetDeclarationAgent } = useStore(
    (state) => ({
      resetDeclarationAgent: state.resetDeclarationAgent,
    }),
    shallow,
  );

  const [openDownModal, setOpenDownModal] = useState(false);
  const [backgroundSummaryVisible, setBackgroundSummaryVisible] = useState(true);
  const [openValidateDeclarationModal, setOpenValidateDeclarationModal] = useState(false);
  const [openPayDeclarationModal, setOpenPayDeclarationModal] = useState(false);
  const [openRejectDeclarationModal, setOpenRejectDeclarationModal] = useState(false);
  const [openSwitchPaperDeclarationModal, setOpenSwitchPaperDeclarationModal] = useState(false);

  const countries = getNames('fr', { select: 'official' });

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
    getDeclarationMutation.mutate({ id: declarationId });
  }, [declarationId]);

  useEffect(() => {
    if (!hideBackgroundSummary) {
      return;
    }
    if (
      openDownModal ||
      openValidateDeclarationModal ||
      openPayDeclarationModal ||
      openRejectDeclarationModal ||
      openSwitchPaperDeclarationModal
    ) {
      setBackgroundSummaryVisible(false);
    }
    if (
      !openDownModal &&
      !openValidateDeclarationModal &&
      !openPayDeclarationModal &&
      !openRejectDeclarationModal &&
      !openSwitchPaperDeclarationModal
    ) {
      setBackgroundSummaryVisible(true);
    }
  }, [
    openDownModal,
    openValidateDeclarationModal,
    openPayDeclarationModal,
    openRejectDeclarationModal,
    openSwitchPaperDeclarationModal,
  ]);

  const changeStatusOfDeclarationMutation = useChangeStatusOfDeclarationMutation({
    onSuccess: ({ newStatus }) => {
      onClose();
      getDeclarationMutation.mutate({ id: declarationId });
      if (newStatus === DeclarationStatus.VALIDATED) {
        setOpenPayDeclarationModal(true);
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

  const onBackHomeClick = () => {
    resetDeclarationAgent();
    router.push(RoutingAgent.home);
  };

  const renderFinalStatusButtons = () => {
    return (
      <div className="flex flex-col gap-5 items-center">
        <ReactToPrint
          trigger={() => (
            <Button
              variant="outlined"
              onClick={() => setOpenRejectDeclarationModal(true)}
              className={{ 'md:w-[198px] md:h-[34px] md:text-xs': true }}
            >
              Imprimer la quittance
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle={pageStyle}
        />
        <Button
          onClick={onBackHomeClick}
          className={{ 'md:w-[198px] md:h-[34px] md:text-xs md:whitespace-nowrap': true }}
        >
          Revenir à l'accueil
        </Button>
      </div>
    );
  };

  const renderValidateDeclarationModal = () => {
    switch (declarationResponse?.status) {
      case DeclarationStatus.VALIDATED:
        return (
          <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
            <div className="flex flex-col gap-2 self-center">
              <Typography size="text-sm" color="black" desktopSize="text-xs">
                La déclaration est validée, vous pouvez procéder à l’encaissement de la déclaration.
              </Typography>
              <Button
                fullWidth
                onClick={() => setOpenPayDeclarationModal(true)}
                className={{ 'w-[230px] self-center md:text-xs md:w-[198px] md:h-[34px]': true }}
              >
                Déclaration payée
              </Button>
            </div>
            {renderFinalStatusButtons()}
          </div>
        );
      case DeclarationStatus.PAID:
      case DeclarationStatus.ERROR:
      case DeclarationStatus.LITIGATION:
      case DeclarationStatus.SWITCH_PAPER:
        return (
          <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
            {renderFinalStatusButtons()}
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
            <div className="flex flex-col gap-5 items-center">
              <Button
                onClick={() => setOpenValidateDeclarationModal(true)}
                disabled={declarationResponse?.canCalculateTaxes === false}
                className={{ 'md:w-[198px] md:h-[34px] md:text-xs': true }}
              >
                Valider la déclaration
              </Button>
              <div className="flex flex-col gap-2.5 items-center">
                <Button
                  variant="outlined"
                  onClick={() => setOpenRejectDeclarationModal(true)}
                  className={{ 'md:w-[198px] md:h-[34px] md:text-xs': true }}
                >
                  Déclaration non conforme
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenSwitchPaperDeclarationModal(true)}
                  className={{ 'md:w-[198px] md:h-[34px] md:text-xs md:whitespace-nowrap': true }}
                >
                  Passage en déclaration papier
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (isLoading || !declarationResponse) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {backgroundSummaryVisible && (
        <div className="flex flex-col gap-1" ref={componentRef}>
          <DeclarationStatusDetails
            status={declarationResponse.status}
            declarationId={declarationResponse.publicId}
            date={declarationResponse.versionDate}
          />
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
          <DeclarationJourneyDetails
            country={countries[declarationResponse.declarantCountry] ?? ''}
            transport={getMeanOfTransportsLabel(declarationResponse.declarantMeanOfTransport)}
          />
          <TaxTable declarationResponse={declarationResponse} noDetails />
          <div className="py-7 bg-secondary-bg flex flex-col justify-center">
            <button
              type="button"
              onClick={() => setOpenDownModal(true)}
              className="bg-primary-400 px-8 py-3 text-white rounded-full self-center md:w-[198px] md:h-[34px] items-center flex"
            >
              <Typography color="white" desktopSize="text-xs">
                Ajouter un commentaire
              </Typography>
            </button>
          </div>
          {renderValidateDeclarationModal()}
        </div>
      )}
      <ModalUnderConstruction open={openDownModal} onClose={() => setOpenDownModal(false)} />
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
    </div>
  );
};
export default SummaryDeclarationAgent;
