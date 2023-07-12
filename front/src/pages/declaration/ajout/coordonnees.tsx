/* eslint-disable no-nested-ternary */

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { useCreateDeclarationMutation } from '@/api/hooks/useAPIDeclaration';
import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { declaration } from '@/core/hoc/declaration.hoc';
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

const Declaration = () => {
  const router = useRouter();
  const { from } = router.query;

  const {
    validateDeclarationStep2,
    contactDetails,
    simulatorRequest,
    declarationId,
    resetAllRequests,
  } = useStore(
    (state) => ({
      validateDeclarationStep2: state.validateDeclarationStep2,
      contactDetails:
        from === 'simulateur' ? {} : state.declaration.appState.declarationRequest.contactDetails,
      declarationId: state.simulator.appState.simulatorRequest.declarationId,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      resetAllRequests: state.resetAllRequests,
    }),
    shallow,
  );

  const schema = yup.object({
    lastName: yup
      .string()
      .required('Le nom est requis')
      .min(2, 'Le nom doit contenir au moins 2 caractères'),
    firstName: yup
      .string()
      .required('Le prénom est requis')
      .min(2, 'Le prénom doit contenir au moins 2 caractères'),
    address: yup
      .string()
      .required("L'adresse est requise")
      .min(2, "L'adresse doit contenir au moins 2 caractères"),
    city: yup
      .string()
      .required('La ville est requise')
      .min(2, 'La ville doit contenir au moins 2 caractères'),
    postalCode: yup
      .string()
      .required('Le code postal est requis')
      .min(5, 'Le code postal doit contenir 5 chiffres')
      .max(5, 'Le code postal doit contenir 5 chiffres')
      .matches(/^[0-9]{5}$/, "Le code postal n'est pas valide"),
    email: yup.string().required("L'email est requis").email("L'email n'est pas valide"),
    phoneNumber: yup
      .string()
      .min(10, 'Le numéro de téléphone doit contenir 10 chiffres')
      .required('Le numéro de téléphone est requis')
      .matches(
        /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
        "Le numéro de téléphone n'est pas valide",
      ),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<FormDeclarationData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      lastName: contactDetails.lastName,
      firstName: contactDetails.firstName,
      address: contactDetails.address,
      city: contactDetails.city,
      postalCode: contactDetails.postalCode,
      email: contactDetails.email,
      phoneNumber: contactDetails.phoneNumber,
    },
  });

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

  return (
    <DeclarationSteps
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={from === 'simulateur' ? onSubmitSimulation : onSubmit}
      linkButton="/declaration/ajout/age"
    >
      <div className="flex flex-col gap-4">
        <div className="w5/6 flex flex-col gap-4">
          <div className="w-56">
            <InputGroup
              type="text"
              name="lastName"
              label="Nom"
              fullWidth={true}
              placeholder="Nom"
              register={register('lastName')}
              control={control}
              error={errors?.lastName?.message}
              required
            />
          </div>
          <div className="w-56">
            <InputGroup
              type="text"
              name="firstName"
              label="Prénom"
              fullWidth={true}
              placeholder="Prénom"
              register={register('firstName')}
              control={control}
              error={errors?.firstName?.message}
              required
            />
          </div>
        </div>
        <InputGroup
          type="text"
          name="address"
          label="Adresse"
          fullWidth={true}
          placeholder="Adresse"
          register={register('address')}
          control={control}
          error={errors?.address?.message}
          required
        />
        <div className="flex flex-row gap-4 w-full">
          <div className="w-28">
            <InputGroup
              type="text"
              name="postalCode"
              label="Code postal"
              fullWidth={true}
              placeholder="Code postal"
              register={register('postalCode')}
              control={control}
              error={errors?.postalCode?.message}
              required
            />
          </div>
          <div className="flex-1">
            <InputGroup
              type="text"
              name="city"
              label="Ville"
              fullWidth={true}
              placeholder="Ville"
              register={register('city')}
              control={control}
              error={errors?.city?.message}
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <InputGroup
          type="text"
          name="mail"
          fullWidth={true}
          placeholder="Email"
          label="Email"
          register={register('email')}
          control={control}
          error={errors?.email?.message}
          required
        />
        <InputGroup
          type="text"
          name="phone"
          label="Téléphone"
          fullWidth={false}
          placeholder="Téléphone"
          register={register('phoneNumber')}
          control={control}
          error={errors?.phoneNumber?.message}
          required
        />
      </div>

      <div className="mb-8 flex-1" />
      <div className="w-40 self-center">
        <Button fullWidth={true} type="submit" disabled={!isValid}>
          Valider
        </Button>
      </div>
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
