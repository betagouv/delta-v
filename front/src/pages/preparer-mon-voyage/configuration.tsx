import { useMemo, useState } from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';
import { getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { IRadioType } from '@/components/input/StandardInputs/Radio';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';
import { disabledCountries, Routing } from '@/utils/const';
import { getCountryType } from '@/utils/country.util';

export interface FormConfigurationData {
  country?: Alpha2Code;
  border?: boolean;
}
interface EventCountryChange {
  type: string;
  target: {
    name: string;
    value?: Alpha2Code;
  };
}
interface EventBorderChange {
  type: string;
  target: {
    name: string;
    value?: 'true' | 'false';
  };
}

const index = () => {
  const [displayBorder, setDisplayBorder] = useState(false);
  const router = useRouter();
  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries) as Alpha2Code[];
    const enabledKeys = keys.filter((key) => !disabledCountries.includes(key));
    return enabledKeys.map((key) => ({ value: countries[key] ?? '', id: key }));
  }, []);

  const {
    getValues,
    register,
    control,
    formState: { errors },
  } = useForm<FormConfigurationData>({
    defaultValues: {
      country: undefined,
    },
  });

  const displayResult = (country: Alpha2Code, border: boolean): void => {
    const countryType = getCountryType(country);
    router.push(`${Routing.prepareMyTrip}?countryType=${countryType}&border=${border}`);
  };

  register('country', {
    onChange: ({ type, target: { name, value } }: EventCountryChange) => {
      const notResetSteps = !name || type !== 'change';
      if (notResetSteps) {
        return;
      }
      if (value === 'CH') {
        setTimeout(() => {
          setDisplayBorder(true);
        }, 250);
      } else if (value !== undefined) {
        setTimeout(() => {
          displayResult(value, false);
        }, 250);
      }
    },
  });

  register('border', {
    onChange: ({ type, target: { name, value } }: EventBorderChange) => {
      const notResetSteps = !name || type !== 'change';
      if (notResetSteps) {
        return;
      }
      const selectedCountry = getValues('country');
      if (selectedCountry) {
        displayResult(selectedCountry, value === 'true');
      }
    },
  });

  const radioValues: IRadioType[] = [
    { id: 'true', value: 'Oui' },
    { id: 'false', value: 'Non' },
  ];

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclare Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
      withHeader
      withTitle
      titleIcon="luggages"
      titleValue="Préparer mon voyage"
    >
      <Typography size="text-lg" color="secondary" lineHeight="leading-7">
        Vous arrivez en France, dans quel pays avez-vous effectué vos achats ?
      </Typography>
      <InputGroup
        label="Le pays d’où vous arrivez"
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
      {displayBorder && (
        <div className="mt-4">
          <InputGroup
            label="Êtes-vous dans le cadre d’un déplacement de résident frontalier ?"
            type="radio"
            name="border"
            radioValues={radioValues}
            register={register('border', { required: true })}
            error={errors?.border?.message}
          />
        </div>
      )}
    </Main>
  );
};

export default index;
