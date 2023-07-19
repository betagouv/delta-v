/* eslint-disable no-nested-ternary */

import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { ModalCancelDeclaration } from '@/components/autonomous/ModalCancelDeclaration';
import { FormContactDetails } from '@/components/business/FormContactDetails';
import { getSchema } from '@/components/business/FormContactDetails/schema';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  lastName: string;
  firstName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}

const SimulatorDeclaration = () => {
  const router = useRouter();
  const [openModalCancelDeclaration, setOpenModalCancelDeclaration] = useState(false);

  const { simulatorRequest, declarationId, resetAllRequests } = useStore(
    (state) => ({
      declarationId: state.simulator.appState.simulatorRequest?.declarationId,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      resetAllRequests: state.resetAllRequests,
    }),
    shallow,
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<FormDeclarationData>({
    mode: 'onBlur',
    resolver: yupResolver(getSchema()),
    defaultValues: {},
  });

  const createDeclarationMutation = useCreateDeclarationMutation({
    onSuccess: () => {
      resetAllRequests();
      router.push(`/declaration/${declarationId}`);
    },
  });

  const onSubmitSimulation = (data: FormDeclarationData) => {
    if (!declarationId) return;
    createDeclarationMutation.mutate({
      declarationId,
      contactDetails: {
        lastName: data.lastName,
        firstName: data.firstName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        email: data.email,
        phoneNumber: data.phoneNumber,
        age: simulatorRequest.age,
      },
      shoppingProducts: simulatorRequest.shoppingProducts,
      border: simulatorRequest.border,
      meansOfTransportAndCountry: {
        meansOfTransport: simulatorRequest.meanOfTransport,
        country: simulatorRequest.country,
      },
    });
  };

  const onCancelDeclaration = () => {
    setOpenModalCancelDeclaration(true);
  };

  return (
    <DeclarationSteps
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmitSimulation}
      onClickBack={onCancelDeclaration}
    >
      <FormContactDetails
        register={register}
        control={control}
        errors={errors}
        validData={isValid}
      />
      <ModalCancelDeclaration
        open={openModalCancelDeclaration}
        onClose={() => setOpenModalCancelDeclaration(false)}
      />
    </DeclarationSteps>
  );
};

export default SimulatorDeclaration;
