import { useState } from 'react';

import { useRouter } from 'next/router';

import { useDeclaration } from '@/api/hooks/useAPIDeclaration';
import { ModalUnderConstruction } from '@/components/autonomous/ModalUnderConstruction';
import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { DeclarationContactDetails } from '@/components/business/DeclarationContactDetails';
import { DeclarationStatusDetails } from '@/components/business/DeclarationStatusDetails';
import { TaxTable } from '@/components/business/TaxTable';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { Meta } from '@/layout/Meta';
import { MainAgent } from '@/templates/MainAgent';
import { isUUIDRegex } from '@/utils/formatTools';

const DeclarationSearch = () => {
  const router = useRouter();
  const query = router.query as { id: string };
  const id = isUUIDRegex(query.id) ? query.id : '';

  if (!isUUIDRegex(id)) {
    return <></>;
  }

  const { isLoading, data: validateDeclarationResponse } = useDeclaration(id);

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
                Ajouter un commentaire
              </button>
            </div>
            <div className="flex flex-col gap-4 py-8 px-10 justify-center text-center">
              <Typography size="text-sm" color="black">
                Voulez-vous valider cette déclaration ?
              </Typography>
              <div className="flex flex-row gap-5">
                <Button fullWidth variant="outlined" onClick={() => setOpenDownModal(true)}>
                  Annuler
                </Button>
                <Button fullWidth onClick={() => setOpenDownModal(true)}>
                  Valider
                </Button>
              </div>
            </div>
            <ModalUnderConstruction open={openDownModal} onClose={() => setOpenDownModal(false)} />
          </div>
        )}
      </MainAgent>
    </AgentRoute>
  );
};
export default DeclarationSearch;
