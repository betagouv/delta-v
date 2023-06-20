import { useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { getEmojiFlag } from 'countries-list';
import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { AgentRoute } from '@/components/autonomous/RouteGuard/AgentRoute';
import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';
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

const Declaration = () => {
  const { validateDeclarationStep2, declarationRequest } = useStore(
    (state) => ({
      validateDeclarationStep2: state.validateDeclarationStep2,
      declarationRequest: state.declaration.appState.declarationRequest,
    }),
    shallow,
  );
  const router = useRouter();

  const [isPlane, setIsPlane] = useState(false);

  const schema = yup.object({
    meansOfTransport: yup.string().required('Champ obligatoire'),
    flightNumber: yup.string().nullable(),
    country: yup.string().required('Champ obligatoire'),
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
    },
  });

  const [transportChosen, setTransportChosen] = useState<string | undefined>(
    getValues('meansOfTransport'),
  );

  const onSubmit = (data: MeansOfTransportAndCountryData) => {
    if (!data.meansOfTransport) {
      return;
    }
    validateDeclarationStep2({ ...data });
    router.push(`/agent/declaration/ajout/marchandises`);
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
        value: `${countries[key]} ${getEmojiFlag(key).toString()} ` ?? '',
        id: key,
        alternatives: countryAlternative?.alternatives ?? [],
      };
    });
  }, []);

  return (
    <AgentRoute>
      <DeclarationSteps
        currentStep={2}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
      >
        <InputGroup
          label="Quel est votre moyen de transport ?"
          type="radioCard"
          name="meansOfTransport"
          radioCardValues={meansOfTransports}
          register={register('meansOfTransport', { required: true })}
          control={control}
          error={errors?.meansOfTransport?.message}
          littleCard
          defaultValue={getValues('meansOfTransport')}
        />
        {transportChosen && (
          <div className="mt-4">
            <InputGroup
              label="De quel pays arrivez-vous ?"
              type="comboboxes"
              fullWidth={true}
              name="country"
              placeholder="Pays"
              trailingIcon="search"
              options={countriesOptions}
              register={register('country', { required: true })}
              control={control}
              error={errors?.country?.message}
              defaultValue={getValues('country')}
            />
          </div>
        )}
        {isPlane && (
          <div className="mt-4">
            <InputGroup
              type="text"
              name="phone"
              fullWidth={false}
              placeholder="Numéro de vol"
              register={register('flightNumber')}
              control={control}
              error={errors?.flightNumber?.message}
              required
            />
          </div>
        )}
        <div>
          {errors?.meansOfTransport && (
            <div className="text-red-500">{errors.meansOfTransport.message}</div>
          )}
        </div>
        <div className="absolute bottom-8 w-40 self-center">
          <Button fullWidth={true} type="submit" disabled={!isValid}>
            Valider
          </Button>
        </div>
      </DeclarationSteps>
    </AgentRoute>
  );
};

export default declaration(Declaration);
