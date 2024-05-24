import { useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { getEmojiFlag } from 'countries-list';
import type { Alpha2Code } from 'i18n-iso-countries';
import { getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import * as yup from 'yup';
import shallow from 'zustand/shallow';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { IRadioType, Radio } from '@/components/input/StandardInputs/Radio';
import { IRadioCardType } from '@/components/input/StandardInputs/RadioCard';
import { AgentRoute } from '@/components/molecules/RouteGuard/AgentRoute';
import { declarationAgent } from '@/core/hoc/declarationAgent.hoc';
import { MeansOfTransport } from '@/stores/declaration/appState.store';
import { useStore } from '@/stores/store';
import { DeclarationAgentStepsDesktop } from '@/templates/DeclarationAgentStepsDesktop';
import { DeclarationAgentStepsMobile } from '@/templates/DeclarationAgentStepsMobile';
import clsxm from '@/utils/clsxm';
import { DECLARATION_STEP_PAGE, disabledCountries } from '@/utils/const';

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
  const { validateDeclarationAgentStep2, declarationAgentRequest } = useStore(
    (state) => ({
      validateDeclarationAgentStep2: state.validateDeclarationAgentStep2,
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
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
    watch,
    formState: { errors },
    getValues,
  } = useForm<MeansOfTransportAndCountryData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      meansOfTransport: declarationAgentRequest.meansOfTransportAndCountry?.meansOfTransport,
      country: declarationAgentRequest.meansOfTransportAndCountry?.country,
      border: declarationAgentRequest.border ? 'true' : 'false',
    },
  });

  const [transportChosen, setTransportChosen] = useState<string | undefined>(
    getValues('meansOfTransport'),
  );
  const [selectedCountry, setSelectedCountry] = useState(watch('country'));

  const [isPlane, setIsPlane] = useState(getValues('meansOfTransport') === 'plane');
  const [isFrontalier, setIsFrontalier] = useState(getValues('country') === 'CH');

  const onSubmit = (data: MeansOfTransportAndCountryData) => {
    if (!data.meansOfTransport) {
      return;
    }

    validateDeclarationAgentStep2({
      meansOfTransport: data.meansOfTransport,
      country: data.country,
      border: !!data.border,
    });
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

  register('country', {
    onChange: (e) => {
      setTransportChosen(e.target.value);
      setSelectedCountry(e.target.value);
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

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const DeclarationAgentStepsComponent = isMobile
    ? DeclarationAgentStepsMobile
    : DeclarationAgentStepsDesktop;

  return (
    <AgentRoute>
      <DeclarationAgentStepsComponent
        currentStep={2}
        handleSubmit={handleSubmit as UseFormHandleSubmit<any>}
        onSubmit={onSubmit}
        linkButton={DECLARATION_STEP_PAGE[1]}
      >
        <div className="md:py-10 flex flex-col">
          <InputGroup
            type="radioCard"
            label="Sélectionner le moyen de transport"
            name="meansOfTransport"
            radioCardValues={meansOfTransports}
            register={register('meansOfTransport', { required: true })}
            control={control}
            error={errors?.meansOfTransport?.message}
            littleCard
            newLabel
          />
          <div className={clsxm({ 'mt-4 md:w-[284px]': true, invisible: !transportChosen })}>
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
            />
          </div>
          <div
            className={clsxm({
              'mt-4 grid grid-cols-[3fr_1fr] md:grid-cols-[284px_1fr] md:gap-1 gap-4 items-center':
                true,
              invisible: !isPlane,
              hidden: !isPlane && isFrontalier,
            })}
          >
            <InputGroup
              type="text"
              name="phone"
              fullWidth={true}
              placeholder="Numéro de vol  : A36WJB..."
              register={register('flightNumber')}
              control={control}
              error={errors?.flightNumber?.message}
              required
            />
            <div className="ml-2.5">
              <Typography
                size="text-xs"
                desktopSize="text-2xs"
                color="placeholder"
                italic
                weight="normal"
              >
                Facultatif
              </Typography>
            </div>
          </div>
          {isFrontalier && (
            <div className="mt-4">
              <label
                htmlFor="adult"
                className="mb-4 block text-base md:text-xs"
                data-testid="label-element"
              >
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
          <div className="md:relative md:bottom-0 md:mt-20 absolute bottom-12 w-40 md:w-[118px] md:h-[34px] self-center md:self-start">
            <Button fullWidth fullHeight type="submit" disabled={!selectedCountry}>
              <span className="md:text-xs">Valider</span>
            </Button>
          </div>
        </div>
      </DeclarationAgentStepsComponent>
    </AgentRoute>
  );
};

export default declarationAgent(Declaration);
