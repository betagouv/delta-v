/* eslint-disable no-nested-ternary */

import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Radio } from '@/components/input/StandardInputs/Radio';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { Tooltip } from '@/components/molecules/Tooltip';
import { TooltipContainer } from '@/components/molecules/Tooltip/TooltipContainer';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { useStore } from '@/stores/store';
import { DeclarationAgentStepsDesktop } from '@/templates/DeclarationAgentStepsDesktop';
import { DeclarationAgentStepsMobile } from '@/templates/DeclarationAgentStepsMobile';
import { RoutingAgent } from '@/utils/const';

export interface FormDeclarationData {
  adult?: string;
  age?: number | null;
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
      contactDetails: state.declaration.appState.declarationAgentRequest?.contactDetails,
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
    adult: yup.string().oneOf(['true', 'false'], "L'age est requis").required("L'age est requis"),
    age: yup
      .number()
      .when('adult', {
        is: 'false',
        then: yup.number().typeError("L'age est requis").required("L'age est requis"),
      })
      .when('adult', {
        is: 'true',
        then: yup.number().typeError("L'age est requis").default(18).required("L'age est requis"),
      }),
    email: yup.string().required("L'email est requis").email('Mail invalide'),
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
      return '';
    }
    return age >= 18 ? 'true' : 'false';
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormDeclarationData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      adult: checkIsAdult(contactDetails?.age),
      age: contactDetails?.age ?? null,
      lastName: contactDetails?.lastName,
      firstName: contactDetails?.firstName,
      address: contactDetails?.address,
      city: contactDetails?.city,
      postalCode: contactDetails?.postalCode,
      email: contactDetails?.email,
      phoneNumber: contactDetails?.phoneNumber,
    },
  });

  const watchNotAdultSelect = watch('adult') === 'false';

  register('adult', {
    onChange: ({ target: { value } }: EventChangeRadio) => {
      if (typeof value === 'string') {
        const isAdult = value === 'true';
        if (isAdult) {
          setValue('age', 18);
        } else {
          setValue('age', null);
        }
      }
    },
  });

  const onSubmit = (data: FormDeclarationData) => {
    validateDeclarationAgentStep1({
      age: data.age ?? 0,
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

  const [isMailTooltipOpen, setIsMailTooltipOpen] = useState(false);

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const DeclarationAgentStepsComponent = isMobile
    ? DeclarationAgentStepsMobile
    : DeclarationAgentStepsDesktop;

  return (
    <AgentRoute>
      <DeclarationAgentStepsComponent
        currentStep={1}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
        linkButton={`${RoutingAgent.home}?mode=tools`}
      >
        <div className="flex flex-col md:w-[616px] md:py-10 pb-8 flex-1">
          <div className="flex flex-col gap-5">
            <div className="w5/6 flex flex-col gap-5">
              <div className="flex md:flex-row flex-col gap-5">
                <div className="w-56 md:w-[300px]">
                  <InputGroup
                    type="text"
                    name="lastName"
                    fullWidth={true}
                    placeholder="Nom"
                    register={register('lastName')}
                    control={control}
                    error={errors?.lastName?.message}
                    required
                  />
                </div>
                <div className="w-56 md:w-[300px]">
                  <InputGroup
                    type="text"
                    name="firstName"
                    fullWidth={true}
                    placeholder="Prénom"
                    register={register('firstName')}
                    control={control}
                    error={errors?.firstName?.message}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[505px]">
              <InputGroup
                type="text"
                name="address"
                fullWidth={true}
                placeholder="Adresse"
                register={register('address')}
                control={control}
                error={errors?.address?.message}
                required
              />
            </div>
            <div className="flex items-start gap-5 w-full md:w-[505px]">
              <div className="w-32 md:w-[190px]">
                <InputGroup
                  type="text"
                  name="postalCode"
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
          <div className="mt-4 flex flex-col w-fit">
            <div>
              <label
                htmlFor="adult"
                className={classNames({
                  'mb-2 block text-base md:text-sm': true,
                  'text-error': errors?.adult?.message,
                })}
                data-testid="label-element"
              >
                L’usager a-t-il plus de 18 ans ?
              </label>
              <div
                className={classNames({
                  'bg-white px-5 py-2.5 rounded-full flex justify-center h-10 md:w-[156px]': true,
                  'border border-error': errors?.adult?.message,
                })}
              >
                <Radio
                  id="adult"
                  name="adult"
                  error={errors?.adult?.message}
                  radioValues={[
                    { id: 'true', value: 'Oui' },
                    { id: 'false', value: 'Non' },
                  ]}
                  register={register('adult')}
                  newRadio
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
            <div className={classNames({ 'mt-4 w-56': true, hidden: !watchNotAdultSelect })}>
              <InputGroup
                type="select"
                name="age"
                fullWidth={true}
                placeholder="Sélectionnez l’âge"
                register={register('age')}
                control={control}
                error={errors?.age?.message}
                options={[
                  { id: 14, value: 'Moins de 15 ans' },
                  { id: 15, value: '15 ans' },
                  { id: 16, value: '16 ans' },
                  { id: 17, value: '17 ans' },
                ]}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5 w-full">
            <div className="grid gap-[10px] md:grid-cols-[340px_20px] grid-cols-[1fr_10px]">
              <InputGroup
                type="text"
                name="mail"
                fullWidth={true}
                placeholder="Adresse mail"
                register={register('email')}
                control={control}
                error={errors?.email?.message}
                required
              />
              <Tooltip
                onClick={() => setIsMailTooltipOpen(!isMailTooltipOpen)}
                isOpen={isMailTooltipOpen}
                iconClassname="mt-[3px]"
              />
            </div>
            {isMailTooltipOpen && (
              <TooltipContainer
                description="L’adresse mail est obligatoire, elle permet à l’usager de recevoir sa déclaration directement sur son mail."
                onCloseClick={() => setIsMailTooltipOpen(false)}
              />
            )}

            <div className="md:grid md:grid-cols-[230px_20px] md:gap-2 w-56 md:w-full">
              <InputGroup
                type="text"
                name="phone"
                fullWidth={true}
                placeholder="Téléphone"
                register={register('phoneNumber')}
                control={control}
                error={errors?.phoneNumber?.message}
                required
              />
            </div>
          </div>

          <div className="mb-8 flex-1 md:mt-10 md:flex-none" />
          <div className="w-40 md:w-[118px] md:h-[34px] self-center md:self-start">
            <Button fullWidth fullHeight type="submit">
              <span className="md:text-xs">Valider</span>
            </Button>
          </div>
        </div>
      </DeclarationAgentStepsComponent>
    </AgentRoute>
  );
};

export default declarationAgent(Declaration);
