import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';

export interface FormSimulatorData {
  age?: number;
}

const Configuration = () => {
  const resetSteps = useStore((state) => state.resetSteps);
  const validateStep1 = useStore((state) => state.validateStep1);
  const router = useRouter();
  const numberStep = 1;
  useEffect(() => {
    resetSteps(numberStep);
  }, [numberStep]);

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
    router.push(`/app/simulateur/configuration/etape2`);
  };

  return (
    <ConfigurationSteps progression={25}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Quel âge avez-vous ?"
          type="number"
          name="age"
          fullWidth={false}
          placeholder="Votre age ?"
          trailingAddons="ans"
          register={register('age', { required: true })}
          error={errors?.age?.message}
        />
        <div className="absolute inset-x-0 bottom-0 w-full">
          <div className="p-4">
            {errors?.age && <div className="text-red-500">{errors.age.message}</div>}
            <Button fullWidth={true} type="submit">
              Valider
            </Button>
          </div>
        </div>
      </form>
    </ConfigurationSteps>
  );
};

export default Configuration;
