import { useEffect, useMemo, useState } from 'react';

import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { ModalSearchProduct } from '@/components/autonomous/ModalSearchProduct';
import { InputGroup } from '@/components/input/InputGroup';
import { declaration } from '@/core/hoc/declaration.hoc';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';
import { disabledCountries } from '@/utils/const';

export interface FormDeclarationData {
  country?: Alpha2Code;
}

const Declaration = () => {
  const { resetDeclarationSteps, validateDeclarationStep3, setProductsDeclarationToDisplay } =
    useStore(
      (state) => ({
        resetDeclarationSteps: state.resetDeclarationSteps,
        validateDeclarationStep3: state.validateDeclarationStep3,
        setProductsDeclarationToDisplay: state.setProductsDeclarationToDisplay,
      }),
      shallow,
    );
  const router = useRouter();
  useEffect(() => {
    resetDeclarationSteps(3);
    setProductsDeclarationToDisplay();
  }, []);

  const [openDownModal, setOpenDownModal] = useState(false);

  const handleCloseDownModal = () => {
    setOpenDownModal(false);
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormDeclarationData>({
    defaultValues: {
      country: undefined,
    },
  });

  const onSubmit = (data: FormDeclarationData) => {
    if (!data.country) {
      return;
    }
    validateDeclarationStep3(data.country);

    router.push(`/agent/declaration/ajout/recapitulatif`);
  };

  register('country', {
    onChange: () => {
      setTimeout(() => {
        handleSubmit(onSubmit)();
      }, 250);
    },
  });

  const countriesAlternatives = [
    {
      id: 'CH',
      alternatives: ['Suisse', 'Switzerland', 'Schweiz'],
    },
    {
      id: 'US',
      alternatives: ['USA', 'United States', 'Etats-Unis'],
    },
    {
      id: 'GB',
      alternatives: ['Royaume-Uni', 'United Kingdom', 'Angleterre', 'UK'],
    },
    {
      id: 'DE',
      alternatives: ['Allemagne', 'Germany', 'Deutschland'],
    },
  ];

  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries) as Alpha2Code[];
    const enabledKeys = keys.filter((key) => !disabledCountries.includes(key));
    return enabledKeys.map((key) => {
      const countryAlternative = countriesAlternatives.find((country) => country.id === key);
      return {
        value: countries[key] ?? '',
        id: key,
        alternatives: countryAlternative?.alternatives ?? [],
      };
    });
  }, []);

  return (
    <DeclarationSteps
      currentStep={3}
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
    >
      <div className="mt-1" onClick={() => setOpenDownModal(true)}>
        <InputGroup
          type="text"
          fullWidth={true}
          name="country"
          placeholder="Que recherchez-vous ?"
          leadingIcon="search"
          options={countriesOptions}
          control={control}
          error={errors?.country?.message}
        />
      </div>
      <ModalSearchProduct open={openDownModal} onClose={handleCloseDownModal} />
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
