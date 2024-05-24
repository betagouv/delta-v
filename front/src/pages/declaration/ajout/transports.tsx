import { useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { getEmojiFlag } from 'countries-list';
import type { Alpha2Code } from 'i18n-iso-countries';
import { getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { IRadioType, Radio } from '@/components/input/StandardInputs/Radio';
import { IRadioCardType } from '@/components/input/StandardInputs/RadioCard';
import { declaration } from '@/core/hoc/declaration.hoc';
import { MeansOfTransport } from '@/stores/declaration/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationSteps } from '@/templates/DeclarationSteps';
import { disabledCountries } from '@/utils/const';

export interface MeansOfTransportAndCountryData {
  meansOfTransport: MeansOfTransport;
  country: Alpha2Code;
  flightNumber?: string;
  border: string;
}

const meansOfTransports: IRadioCardType[] = [
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
    id: 'train',
    value: 'Train',
    svgIcon: 'train',
  },
  {
    id: 'boat',
    value: 'Bateau',
    svgIcon: 'boat',
  },
  {
    id: 'other',
    value: 'Autre',
    svgIcon: 'other',
  },
];

const radioValues: IRadioType[] = [
  { id: 'true', value: 'Oui' },
  { id: 'false', value: 'Non' },
];

const Declaration = () => {
  const { validateDeclarationStep3, declarationRequest } = useStore(
    (state) => ({
      validateDeclarationStep3: state.validateDeclarationStep3,
      declarationRequest: state.declaration.appState.declarationRequest,
    }),
    shallow,
  );
  const router = useRouter();

  const schema = yup.object({
    meansOfTransport: yup.string().required('Champ obligatoire'),
    flightNumber: yup.string().nullable(),
    country: yup.string().required('Champ obligatoire'),
    border: yup
      .boolean()
      .when('country', (country, field) => (country === 'CH' ? field.required() : field)),
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm<MeansOfTransportAndCountryData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      meansOfTransport: declarationRequest.meansOfTransportAndCountry?.meansOfTransport,
      country: declarationRequest.meansOfTransportAndCountry?.country,
      border: declarationRequest.border ? 'true' : 'false',
    },
  });

  const [transportChosen, setTransportChosen] = useState<string | undefined>(
    getValues('meansOfTransport'),
  );

  const [isPlane, setIsPlane] = useState(getValues('meansOfTransport') === 'plane');
  const [isFrontalier, setIsFrontalier] = useState(getValues('country') === 'CH');

  const onSubmit = (data: MeansOfTransportAndCountryData) => {
    if (!data.meansOfTransport) {
      return;
    }

    validateDeclarationStep3({
      meansOfTransport: data.meansOfTransport,
      country: data.country,
      border: !!data.border,
    });
    router.push(`/declaration/produits`);
  };

  register('meansOfTransport', {
    onChange: (e) => {
      setTransportChosen(e.target.value);
      if (e.target.value === 'plane') {
        setIsPlane(true);
      } else {
        setIsPlane(false);
      }
    },
  });

  register('country', {
    onChange: (e) => {
      setTransportChosen(e.target.value);
      if (e.target.value === 'CH') {
        setIsFrontalier(true);
      } else {
        setIsFrontalier(false);
      }
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
    const finalCountriesOptions = enabledKeys.map((key) => {
      const countryAlternative = countriesAlternatives.find((country) => country.id === key);
      return {
        value: `${countries[key]} ${getEmojiFlag(key).toString()} ` ?? '',
        id: key,
        alternatives: countryAlternative?.alternatives ?? [],
      };
    });

    return finalCountriesOptions;
  }, []);

  return (
    <DeclarationSteps
      handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
      onSubmit={onSubmit}
      linkButton="/declaration/ajout/coordonnees"
    >
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="meansOfTransport"
            className="mb-3 block text-base font-bold leading-tight"
          >
            Quel est votre moyen <br />
            de transport ?
          </label>
          <InputGroup
            type="radioCard"
            fullWidth
            name="meansOfTransport"
            radioCardValues={meansOfTransports}
            register={register('meansOfTransport', { required: true })}
            control={control}
            error={errors?.meansOfTransport?.message}
          />
          {transportChosen && (
            <div className="mt-4">
              <InputGroup
                type="select"
                fullWidth={true}
                name="country"
                placeholder="Sélectionner le pays d’où vous arrivez"
                trailingIcon="search"
                options={countriesOptions}
                register={register('country', { required: true })}
                control={control}
                error={errors?.country?.message}
                withBorder
              />
            </div>
          )}
          {isPlane && (
            <div className="mt-4 flex flex-row items-center">
              <div className="w-56">
                <InputGroup
                  type="text"
                  name="phone"
                  fullWidth={true}
                  placeholder="Numéro de vol : A36WJB..."
                  register={register('flightNumber')}
                  control={control}
                  error={errors?.flightNumber?.message}
                  required
                  withBorder
                />
              </div>
              <div className="ml-2.5">
                <Typography size="text-2xs" color="light-gray" italic>
                  Facultatif
                </Typography>
              </div>
            </div>
          )}
          {isFrontalier && (
            <div className="mt-4">
              <label htmlFor="adult" className={`mb-4 block text-sm`} data-testid="label-element">
                Est-ce dans le cadre d’un déplacement frontalier ?
              </label>
              <div className="bg-white w-44 px-5 py-2.5 rounded-full flex justify-center">
                <Radio
                  name="border"
                  radioValues={radioValues}
                  register={register('border')}
                  error={errors?.border?.message}
                />
              </div>
            </div>
          )}
          <div>
            {errors?.meansOfTransport && (
              <div className="text-red-500">{errors.meansOfTransport.message}</div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <Button fullWidth={true} type="submit" disabled={!isValid}>
            Valider
          </Button>
        </div>
      </div>
    </DeclarationSteps>
  );
};

export default declaration(Declaration);
