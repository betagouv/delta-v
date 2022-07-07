import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Button } from '@/components/common/Button';
import { Checkbox } from '@/components/input/StandardInputs/Checkbox';
import { displayInfoSimulator } from '@/core/hoc/displayInfoSimulator.hoc';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';

export interface FormSimulatorData {
  notDisplayAnymore: boolean;
}

const Configuration = () => {
  const { resetSteps, validateStep0 } = useStore(
    (state) => ({
      resetSteps: state.resetSteps,
      validateStep0: state.validateStep0,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetSteps(0);
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      notDisplayAnymore: false,
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    const shouldDisplayInfoNextTime = !data.notDisplayAnymore;
    validateStep0(shouldDisplayInfoNextTime);
    router.push(`/simulateur/configuration/etape1`);
  };

  return (
    <ConfigurationSteps
      fromProgression={0}
      toProgression={12}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4">
        <p>
          Le <span className="font-bold">simulateur DéclareDouane</span> vous permet d’
          <span className="font-bold">estimer les éventuels droits et taxes</span> que vous auriez à
          payer si vous rameniez avec vous un produit de l’étranger.
        </p>
        <p>
          Avec seulement quelques infos et en quelques clics vous pourrez calculer vos éventuels
          droits et taxes.
        </p>
        <p>
          <span className="font-bold">Facilitez votre passage frontière avec ce simulateur</span>,
          vous n’aurez plus qu’à vous présenter aux agents douaniers si besoin !
        </p>
        <div className="flex flex-row">
          <Checkbox
            name="notDisplayAnymore"
            register={register('notDisplayAnymore', { required: false })}
            error={errors?.notDisplayAnymore?.message}
          />
          <label
            htmlFor="notDisplayAnymore"
            className="ml-2 block flex-1 text-base"
            data-testid="label-element"
          >
            Ne plus afficher ce message.
          </label>
        </div>
      </div>
      <div className="mb-8 flex-1" />

      <div>
        {errors?.notDisplayAnymore && (
          <div className="text-red-500">{errors.notDisplayAnymore.message}</div>
        )}
        <Button fullWidth={true} type="submit">
          Je commence la simulation
        </Button>
      </div>
    </ConfigurationSteps>
  );
};

export default displayInfoSimulator(Configuration);
