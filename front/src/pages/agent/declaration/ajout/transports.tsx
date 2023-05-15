import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { InputGroup } from '@/components/input/InputGroup';
import { IRadioCardType } from '@/components/input/StandardInputs/RadioCard';
import { declaration } from '@/core/hoc/declaration.hoc';
import { MeansOfTransport } from '@/stores/declaration/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';

export interface FormDeclarationData {
  meanOfTransport?: MeansOfTransport;
}

const meanOfTransports: IRadioCardType[] = [
  {
    id: 'car',
    value: 'Voiture',
    svgIcon: 'car',
  },
  {
    id: 'plane',
    value: 'Avion',
    svgIcon: 'plane',
  },
  {
    id: 'boat',
    value: 'Bateau',
    svgIcon: 'boat',
  },
  {
    id: 'train',
    value: 'Train',
    svgIcon: 'train',
  },
  {
    id: 'other',
    value: 'Autre',
    svgIcon: 'other',
  },
];

const Declaration = () => {
  const { resetDeclarationSteps, validateDeclarationStep2 } = useStore(
    (state) => ({
      resetDeclarationSteps: state.resetDeclarationSteps,
      validateDeclarationStep2: state.validateDeclarationStep2,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetDeclarationSteps(2);
  }, []);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormDeclarationData>({
    defaultValues: {
      meanOfTransport: undefined,
    },
  });

  const onSubmit = (data: FormDeclarationData) => {
    if (!data.meanOfTransport) {
      return;
    }
    validateDeclarationStep2(data.meanOfTransport);
    router.push(`/agent/declaration/ajout/marchandises`);
  };

  register('meanOfTransport', {
    onChange: () => {
      handleSubmit(onSubmit)();
    },
  });

  return (
    <DeclarationSteps
      currentStep={2}
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
    >
      <InputGroup
        label="Quel est votre moyen de transport ?"
        type="radioCard"
        name="meanOfTransport"
        radioCardValues={meanOfTransports}
        register={register('meanOfTransport', { required: true })}
        control={control}
        error={errors?.meanOfTransport?.message}
      />
      <div className="mb-8 flex-1" />
      <div>
        {errors?.meanOfTransport && (
          <div className="text-red-500">{errors.meanOfTransport.message}</div>
        )}
      </div>
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
