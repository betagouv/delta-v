import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
import { IRadioType } from '@/components/input/StandardInputs/Radio';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';

export interface FormSimulatorData {
  border?: boolean;
}

const Configuration = () => {
  const resetSteps = useStore((state) => state.resetSteps);
  const validateStep4 = useStore((state) => state.validateStep4);
  const router = useRouter();
  const numberStep = 3;
  useEffect(() => {
    resetSteps(numberStep);
  }, [numberStep]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      border: undefined,
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    if (!data.border) {
      return;
    }
    validateStep4(data.border);
    router.push(`/app`);
  };

  const radioValues: IRadioType[] = [
    { id: 'true', value: 'Oui' },
    { id: 'false', value: 'Non' },
  ];
  return (
    <ConfigurationSteps progression={85}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          label="Êtes-vous dans le cadre d’un déplacement de résident frontalier ?"
          type="radio"
          name="border"
          radioValues={radioValues}
          register={register('border', { required: true })}
          error={errors?.border?.message}
        />
        <div className="absolute inset-x-0 bottom-0 w-full">
          <div className="p-4">
            {errors?.border && <div className="text-red-500">{errors.border.message}</div>}
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
