import { useEffect, useMemo } from 'react';

import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { InputGroup } from '@/components/input/InputGroup';
import { simulator } from '@/core/hoc/simulator.hoc';
import { useStore } from '@/stores/store';
import { ConfigurationSteps } from '@/templates/ConfigurationSteps';
import { disabledCountries } from '@/utils/const';

export interface FormSimulatorData {
  country?: Alpha2Code;
}

const Configuration = () => {
  const { resetSteps, validateStep3, meanOfTransport } = useStore(
    (state) => ({
      resetSteps: state.resetSteps,
      validateStep3: state.validateStep3,
      meanOfTransport: state.simulator.appState.simulatorRequest.meanOfTransport,
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

    if (meanOfTransport === 'car' && data.country === 'CH') {
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

  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries) as Alpha2Code[];
    const enabledKeys = keys.filter((key) => !disabledCountries.includes(key));
    return enabledKeys.map((key) => ({ value: countries[key] ?? '', id: key }));
  }, []);

  return (
    <ConfigurationSteps
      fromProgression={50}
      toProgression={75}
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
    >
      <InputGroup
        label="Quel est le pays d???o?? vous arrivez ?"
        type="comboboxes"
        fullWidth={true}
        name="country"
        placeholder="Pays"
        trailingIcon="search"
        options={countriesOptions}
        register={register('country', { required: true })}
        control={control}
        error={errors?.country?.message}
      />
    </ConfigurationSteps>
  );
};

export default simulator(Configuration);
