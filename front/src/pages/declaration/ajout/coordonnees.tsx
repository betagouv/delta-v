/* eslint-disable no-nested-ternary */

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { FormContactDetails } from '@/components/business/FormContactDetails';
import { declaration } from '@/core/hoc/declaration.hoc';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';
import { Routing } from '@/utils/const';

export interface FormDeclarationData {
  lastName: string;
  firstName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}

const Declaration = () => {
  const router = useRouter();

  const { validateDeclarationStep2, contactDetails } = useStore(
    (state) => ({
      validateDeclarationStep2: state.validateDeclarationStep2,
      contactDetails: state.declaration.appState.declarationRequest?.contactDetails,
    }),
    shallow,
  );

  const onSubmit = (data: FormDeclarationData) => {
    validateDeclarationStep2({
      lastName: data.lastName,
      firstName: data.firstName,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    router.push(`/declaration/ajout/transports`);
  };

  return (
    <DeclarationSteps linkButton={Routing.declarationAge}>
      <FormContactDetails onSubmit={onSubmit} defaultValues={contactDetails} />
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
