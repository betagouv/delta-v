import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { simulator } from '@/core/hoc/simulator.hoc';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';

export interface FormSimulatorData {
  age?: number;
}

const Configuration = () => {
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
    formState: { errors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      age: undefined,
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    if (!data.age) {
      return;
    }
    validateStep1(data.age);
    router.push(`/simulateur/configuration/etape2`);
  };

  return (
    <ConfigurationSteps
      fromProgression={12}
      toProgression={25}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <InputGroup
        label="Quel âge avez-vous ?"
        type="number"
        name="age"
        fullWidth={false}
        placeholder="Âge"
        trailingAddons="ans"
        register={register('age', { required: true })}
        error={errors?.age?.message}
      />
      <div className="mb-8 flex-1" />
      <div>
        {errors?.age && <div className="text-red-500">{errors.age.message}</div>}
        <Button fullWidth={true} type="submit">
          Valider
        </Button>
      </div>
    </ConfigurationSteps>
  );
};

export default simulator(Configuration);
