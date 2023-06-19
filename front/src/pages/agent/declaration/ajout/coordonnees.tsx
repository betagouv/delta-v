import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { declaration } from '@/core/hoc/declaration.hoc';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  adult?: boolean;
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
  const [age, setAge] = useState<number>();
  const [displayNotAdult, setDisplayNotAdult] = useState(false);
  const { resetDeclarationSteps, validateDeclarationStep1 } = useStore(
    (state) => ({
      resetDeclarationSteps: state.resetDeclarationSteps,
      validateDeclarationStep1: state.validateDeclarationStep1,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetDeclarationSteps(1);
  }, []);

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
      adult: undefined,
      notAdultAge: undefined,
    },
  });

  register('adult', {
    onChange: ({ type, target: { name, value } }: EventChangeRadio) => {
      const notResetDeclarationSteps = !name || type !== 'change';
      if (notResetDeclarationSteps) {
        return;
      }
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
      const notResetDeclarationSteps = !name || type !== 'change';
      if (notResetDeclarationSteps) {
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
    validateDeclarationStep1({
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
      <DeclarationSteps
        currentStep={1}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 mt-1">
          <div className="w5/6 flex flex-col gap-4">
            <InputGroup
              type="text"
              name="lastName"
              fullWidth={false}
              placeholder="Nom"
              register={register('lastName')}
              control={control}
              error={errors?.lastName?.message}
              required
              withBorder={false}
            />
            <InputGroup
              type="text"
              name="firstName"
              fullWidth={false}
              placeholder="Prénom"
              register={register('firstName')}
              control={control}
              error={errors?.firstName?.message}
              required
              withBorder={false}
            />
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
            <div className="min-w-[139px] flex-1">
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
            <div className="flex-3">
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
        <div className="mt-9">
          <InputGroup
            label="Avez-vous plus de 18 ans ?"
            type="radio"
            name="adult"
            fullWidth={true}
            placeholder="Âge"
            register={register('adult')}
            error={errors?.adult?.message}
            radioValues={[
              { id: 'true', value: 'Oui' },
              { id: 'false', value: 'Non' },
            ]}
          />
          {displayNotAdult && (
            <div className="mt-4">
              <InputGroup
                label="Sélectionnez votre âge"
                type="select"
                name="notAdultAge"
                fullWidth={false}
                placeholder="Âge"
                register={register('notAdultAge')}
                control={control}
                error={errors?.notAdultAge?.message}
                options={[
                  { id: 'none', value: 'Âge' },
                  { id: 14, value: 'Moins de 15 ans' },
                  { id: 15, value: '15 ans' },
                  { id: 16, value: '16 ans' },
                  { id: 17, value: '17 ans' },
                ]}
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
      </DeclarationSteps>
    </AgentRoute>
  );
};

export default declaration(Declaration);
