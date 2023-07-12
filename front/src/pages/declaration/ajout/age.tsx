/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Radio } from '@/components/input/StandardInputs/Radio';
import { declaration } from '@/core/hoc/declaration.hoc';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  adult?: string;
  notAdultAge?: number;
}

interface EventChangeRadio {
  type: string;
  target: {
    name: string;
    value: string;
  };
}

const Declaration = () => {
  const { validateDeclarationStep1, contactDetails } = useStore(
    (state) => ({
      validateDeclarationStep1: state.validateDeclarationStep1,
      contactDetails: state.declaration.appState.declarationRequest.contactDetails,
    }),
    shallow,
  );

  const router = useRouter();

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
    defaultValues: {
      adult: checkIsAdult(contactDetails.age),
      notAdultAge: contactDetails.age,
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

  const onSubmit = () => {
    validateDeclarationStep1(age ?? 0);
    router.push(`/declaration/ajout/coordonnees`);
  };

  return (
    <DeclarationSteps
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
      linkButton="/"
    >
      <div className="mt-4">
        <div>
          <label htmlFor="adult" className={`mb-2 block text-sm`} data-testid="label-element">
            L’usager a-t-il plus de 18 ans ?
          </label>
          <div className="bg-white w-44 px-5 py-2.5 rounded-full flex justify-center">
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
        <div className="mt-2">
          <Typography italic color="light-gray">
            Cette information permet de calculer au plus juste les éventuels droits et taxes à payer
            sur les produits que vous ramenez avec vous de l'étranger.
          </Typography>
        </div>
        {displayNotAdult && (
          <div className="mt-4 w-44">
            <InputGroup
              type="select"
              name="notAdultAge"
              fullWidth={true}
              label="Sélectionnez votre âge"
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
            />
          </div>
        )}
      </div>

      <div className="mb-8 flex-1" />
      <div className="w-40 self-center">
        {errors?.adult && <div className="text-red-500">{errors.adult.message}</div>}

        <Button fullWidth={true} type="submit" disabled={!age || !isValid}>
          Valider
        </Button>
      </div>
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
