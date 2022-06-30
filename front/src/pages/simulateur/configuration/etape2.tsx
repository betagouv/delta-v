import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { InputGroup } from '@/components/input/InputGroup';
import { IRadioCardType } from '@/components/input/StandardInputs/RadioCard';
import { simulator } from '@/core/hoc/simulator.hoc';
import { MeansOfTransport } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';

export interface FormSimulatorData {
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

const Configuration = () => {
  const { resetSteps, validateStep2 } = useStore(
    (state) => ({
      resetSteps: state.resetSteps,
      validateStep2: state.validateStep2,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetSteps(2);
  }, []);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      meanOfTransport: undefined,
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    if (!data.meanOfTransport) {
      return;
    }
    validateStep2(data.meanOfTransport);
    router.push(`/simulateur/configuration/etape3`);
  };

  register('meanOfTransport', {
    onChange: () => {
      handleSubmit(onSubmit)();
    },
  });

  return (
    <ConfigurationSteps fromProgression={25} toProgression={50}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Quel est votre moyen de transport ?"
          type="radioCard"
          name="meanOfTransport"
          radioCardValues={meanOfTransports}
          register={register('meanOfTransport', { required: true })}
          control={control}
          error={errors?.meanOfTransport?.message}
        />
        <div className="absolute inset-x-0 bottom-0 w-full">
          <div className="p-4">
            {errors?.meanOfTransport && (
              <div className="text-red-500">{errors.meanOfTransport.message}</div>
            )}
          </div>
        </div>
      </form>
    </ConfigurationSteps>
  );
};

export default simulator(Configuration);
