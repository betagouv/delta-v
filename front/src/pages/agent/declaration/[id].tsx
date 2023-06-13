import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { AddNote } from '@/components/business/AddNote';
import { DeclarationContactDetails } from '@/components/business/DeclarationContactDetails';
import { DeclarationStatusDetails } from '@/components/business/DeclarationStatusDetails';
import { DeclarationTravelDetails } from '@/components/business/DeclarationTravelDetails';
import { TaxTable } from '@/components/business/TaxTable';
import { Button } from '@/components/common/Button';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAgent } from '@/templates/MainAgent';

const DeclarationSearch = () => {
  const router = useRouter();
  const { id } = router.query;

  const { getDeclaration, validateDeclarationResponse } = useStore((state) => ({
    getDeclaration: state.getDeclaration,
    validateDeclarationResponse: state.declaration.appState.validateDeclarationResponse,
  }));

  const [openDownModal, setOpenDownModal] = useState(false);
  useEffect(() => {
    if (id) {
      getDeclaration(id as string);
    }
  }, [id]);

  return (
    <AgentRoute>
      <MainAgent
        meta={
          <Meta
            title="Simulateur Déclare Douanes"
            description="Simuler la déclaration de douane en quelques clics"
          />
        }
        withHeader
        titleHeader="Déclaration"
      >
        {validateDeclarationResponse && (
          <div className="flex flex-1 flex-col">
            <div className="flex w-full flex-col gap-4 border-b border-black py-6 pt-0">
              <DeclarationStatusDetails
                status={validateDeclarationResponse.status}
                declarationId={validateDeclarationResponse.publicId}
                date={validateDeclarationResponse.versionDate}
              />
            </div>
            <div className="flex w-full flex-col gap-4 border-b border-black py-6">
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
            <div className="flex w-full flex-col gap-4 border-b border-black py-6">
              <DeclarationTravelDetails
                country={validateDeclarationResponse.declarantCountry}
                transport={validateDeclarationResponse.declarantMeanOfTransport}
              />
            </div>
            <div className="border-b border-black py-8">
              <TaxTable declarationResponse={validateDeclarationResponse} />
            </div>
            <div className="w-full border-b border-black py-6">
              <AddNote onClick={() => setOpenDownModal(true)} />
            </div>
            <div className="flex w-3/6 flex-col gap-4 self-center pt-6">
              <Button fullWidth>Valider la déclaration</Button>
              <Button fullWidth variant="outlined">
                Annuler
              </Button>
            </div>
            <ModalUnderConstruction open={openDownModal} onClose={() => setOpenDownModal(false)} />
          </div>
        )}
      </MainAgent>
    </AgentRoute>
  );
};
export default DeclarationSearch;
