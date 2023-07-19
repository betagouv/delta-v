/* eslint-disable no-nested-ternary */

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';
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

  return (
    <DeclarationSteps
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
      linkButton={Routing.declarationAge}
    >
      <FormContactDetails
        register={register}
        control={control}
        errors={errors}
        validData={isValid}
      />
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
