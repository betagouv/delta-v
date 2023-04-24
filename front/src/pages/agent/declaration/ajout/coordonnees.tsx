import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Button } from '@/components/common/Button';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { declaration } from '@/core/hoc/declaration.hoc';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  adult?: boolean;
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
  const [age, setAge] = useState<number>();
  const [displayNotAdult, setDisplayNotAdult] = useState(false);
  const { resetSteps, validateStep1 } = useStore(
    (state) => ({
      resetSteps: state.resetSteps,
      validateStep1: state.validateStep1,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetSteps(1);
  }, []);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormDeclarationData>({
    defaultValues: {
      adult: undefined,
      notAdultAge: undefined,
    },
  });

  register('adult', {
    onChange: ({ type, target: { name, value } }: EventChangeRadio) => {
      const notResetSteps = !name || type !== 'change';
      if (notResetSteps) {
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
      const notResetSteps = !name || type !== 'change';
      if (notResetSteps) {
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
    if (!age) {
      return;
    }
    validateStep1(age);
    router.push(`/agent/declaration/ajout/transports`);
  };

  return (
    <DeclarationSteps
      currentStep={1}
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
    >
      <InputGroup
        label="Avez-vous plus de 18 ans ?"
        type="radio"
        name="adult"
        fullWidth={false}
        placeholder="Âge"
        register={register('adult')}
        error={errors?.adult?.message}
        radioValues={[
          { id: 'true', value: 'Oui' },
          { id: 'false', value: 'Non' },
        ]}
      />
      <div className="mt-2">
        <Typography italic color="light-gray">
          Cette information permet de calculer au plus juste les éventuels droits et taxes à payer
          sur les produits que vous ramenez avec vous de l'étranger.
        </Typography>
      </div>
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

      <div className="mb-8 flex-1" />
      <div>
        {errors?.adult && <div className="text-red-500">{errors.adult.message}</div>}
        <Button fullWidth={true} type="submit" disabled={!age}>
          Valider
        </Button>
      </div>
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
