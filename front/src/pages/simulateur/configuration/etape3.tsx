import { useEffect } from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { InputGroup } from '@/components/input/InputGroup';
import { memoizedCountriesData } from '@/components/organisms/FormSelectCountry/utils';
import { simulator } from '@/core/hoc/simulator.hoc';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';
import { countriesAlternatives, disabledCountries } from '@/utils/const';

export interface FormSimulatorData {
  country?: Alpha2Code;
}

const Configuration = () => {
  const { resetSteps, validateStep3 } = useStore(
    (state) => ({
      resetSteps: state.resetSteps,
      validateStep3: state.validateStep3,
    }),
    shallow,
  );
  const router = useRouter();
  useEffect(() => {
    resetSteps(3);
  }, []);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      country: undefined,
    },
  });

  const onSubmit = (data: FormSimulatorData) => {
    if (!data.country) {
      return;
    }
    validateStep3(data.country);

    if (data.country === 'CH') {
      router.push(`/simulateur/configuration/etape4`);
    } else {
      router.push(`/simulateur/produits`);
    }
  };

  register('country', {
    onChange: () => {
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 250);
    },
  });

  const countryOptions = memoizedCountriesData({ countriesAlternatives, disabledCountries });

  return (
    <ConfigurationSteps
      fromProgression={50}
      toProgression={75}
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
    >
      <InputGroup
        label="De quel pays arrivez-vous ?"
        type="comboboxes"
        fullWidth={true}
        name="country"
        placeholder="Pays"
        trailingIcon="search"
        options={countryOptions.map((option) => {
          return { id: option.value, value: option.label };
        })}
        register={register('country', { required: true })}
        control={control}
        error={errors?.country?.message}
      />
    </ConfigurationSteps>
  );
};

export default simulator(Configuration);
