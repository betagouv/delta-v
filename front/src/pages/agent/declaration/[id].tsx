import { useState } from 'react';

import { useRouter } from 'next/router';

import { useDeclaration } from '@/api/hooks/useAPIDeclaration';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { AddNote } from '@/components/business/AddNote';
import { DeclarationContactDetails } from '@/components/business/DeclarationContactDetails';
import { DeclarationStatusDetails } from '@/components/business/DeclarationStatusDetails';
import { DeclarationTravelDetails } from '@/components/business/DeclarationTravelDetails';
import { TaxTable } from '@/components/business/TaxTable';
import { Button } from '@/components/common/Button';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';

const DeclarationSearch = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }

  const { isLoading, data: validateDeclarationResponse } = useDeclaration(id as string);

  const [openDownModal, setOpenDownModal] = useState(false);
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
        {!isLoading && validateDeclarationResponse && (
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
            <div className="border-b border-black py-6 w-full">
              <AddNote onClick={() => setOpenDownModal(true)} />
            </div>
            <div className="w-3/6 flex flex-col gap-4 pt-6 self-center">
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
