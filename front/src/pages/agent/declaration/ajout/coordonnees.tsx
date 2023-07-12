/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Radio } from '@/components/input/StandardInputs/Radio';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { useStore } from '@/stores/store';
import { DeclarationAgentSteps } from '@/templates/DeclarationAgentSteps';

export interface FormDeclarationData {
  adult?: string;
  notAdultAge?: number;
  lastName: string;
  firstName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}
interface EventChangeRadio {
  type: string;
  target: {
    name: string;
    value: string;
  };
}

const Declaration = () => {
  const { validateDeclarationAgentStep1, contactDetails } = useStore(
    (state) => ({
      validateDeclarationAgentStep1: state.validateDeclarationAgentStep1,
      contactDetails: state.declaration.appState.declarationAgentRequest.contactDetails,
    }),
    shallow,
  );

  const router = useRouter();
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

  const checkIsAdult = (age: number | undefined) => {
    if (age === undefined) {
      return undefined;
    }
    return age >= 18 ? 'true' : 'false';
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormDeclarationData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      adult: checkIsAdult(contactDetails.age),
      notAdultAge: contactDetails.age,
      lastName: contactDetails.lastName,
      firstName: contactDetails.firstName,
      address: contactDetails.address,
      city: contactDetails.city,
      postalCode: contactDetails.postalCode,
      email: contactDetails.email,
      phoneNumber: contactDetails.phoneNumber,
    },
  });

  const [displayNotAdult, setDisplayNotAdult] = useState(getValues('adult') === 'false');
  const [age, setAge] = useState<number | undefined>(getValues('notAdultAge'));

  register('adult', {
    onChange: ({ target: { value } }: EventChangeRadio) => {
      if (typeof value === 'string') {
        const isAdult = value === 'true';
        if (isAdult) {
          setAge(18);
          setDisplayNotAdult(false);
        } else {
          setDisplayNotAdult(true);
          setAge(undefined);
        }
      }
    },
  });

  register('notAdultAge', {
    onChange: ({ type, target: { name, value } }: EventChangeRadio) => {
      const notResetDeclarationAgentSteps = !name || type !== 'change';
      if (notResetDeclarationAgentSteps) {
        return;
      }
      if (typeof value === 'number') {
        setAge(value);
      } else {
        setAge(undefined);
      }
    },
  });

  const onSubmit = (data: FormDeclarationData) => {
    validateDeclarationAgentStep1({
      age: age ?? 0,
      lastName: data.lastName,
      firstName: data.firstName,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    router.push(`/agent/declaration/ajout/transports`);
  };

  return (
    <AgentRoute>
      <DeclarationAgentSteps
        currentStep={1}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
        linkButton="/agent/"
      >
        <div className="flex flex-col gap-4">
          <div className="w5/6 flex flex-col gap-4">
            <div className="w-56">
              <InputGroup
                type="text"
                name="lastName"
                fullWidth={true}
                placeholder="Nom"
                register={register('lastName')}
                control={control}
                error={errors?.lastName?.message}
                required
                withBorder={false}
              />
            </div>
            <div className="w-56">
              <InputGroup
                type="text"
                name="firstName"
                fullWidth={true}
                placeholder="Prénom"
                register={register('firstName')}
                control={control}
                error={errors?.firstName?.message}
                required
                withBorder={false}
              />
            </div>
          </div>
          <InputGroup
            type="text"
            name="address"
            fullWidth={true}
            placeholder="Adresse"
            register={register('address')}
            control={control}
            error={errors?.address?.message}
            required
            withBorder={false}
          />
          <div className="flex flex-row gap-4">
            <div className="w-32">
              <InputGroup
                type="text"
                name="postalCode"
                fullWidth={true}
                placeholder="Code postal"
                register={register('postalCode')}
                control={control}
                error={errors?.postalCode?.message}
                required
                withBorder={false}
              />
            </div>
            <div className="flex-1">
              <InputGroup
                type="text"
                name="city"
                fullWidth={true}
                placeholder="Ville"
                register={register('city')}
                control={control}
                error={errors?.city?.message}
                required
                withBorder={false}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col w-fit">
          <div>
            <label htmlFor="adult" className={`mb-2 block text-base`} data-testid="label-element">
              L’usager a-t-il plus de 18 ans ?
            </label>
            <div className="bg-white px-5 py-2.5 rounded-full flex justify-center">
              <Radio
                id="adult"
                name="adult"
                error={errors?.adult?.message}
                radioValues={[
                  { id: 'true', value: 'Oui' },
                  { id: 'false', value: 'Non' },
                ]}
                register={register('adult')}
              />
            </div>
            {errors?.adult?.message && (
              <div data-testid="error-element" className="flex pl-2 pt-1">
                <span className="pl-1" id="input-error">
                  <Typography size="text-2xs" color="error">
                    {errors?.adult?.message}
                  </Typography>
                </span>
              </div>
            )}
          </div>
          {displayNotAdult && (
            <div className="mt-4">
              <InputGroup
                type="select"
                name="notAdultAge"
                fullWidth={true}
                placeholder="Sélectionnez l’âge"
                register={register('notAdultAge')}
                control={control}
                error={errors?.notAdultAge?.message}
                options={[
                  { id: 14, value: 'Moins de 15 ans' },
                  { id: 15, value: '15 ans' },
                  { id: 16, value: '16 ans' },
                  { id: 17, value: '17 ans' },
                ]}
                withBorder={false}
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <InputGroup
            type="text"
            name="mail"
            fullWidth={true}
            placeholder="Email"
            register={register('email')}
            control={control}
            error={errors?.email?.message}
            required
            withBorder={false}
          />
          <InputGroup
            type="text"
            name="phone"
            fullWidth={false}
            placeholder="Téléphone"
            register={register('phoneNumber')}
            control={control}
            error={errors?.phoneNumber?.message}
            required
            withBorder={false}
          />
        </div>

        <div className="mb-8 flex-1" />
        <div className="w-40 self-center">
          {errors?.adult && <div className="text-red-500">{errors.adult.message}</div>}

          <Button fullWidth={true} type="submit" disabled={!age || !isValid}>
            Valider
          </Button>
        </div>
      </DeclarationAgentSteps>
    </AgentRoute>
  );
};

export default declarationAgent(Declaration);
