import { ReactNode, useEffect, useMemo } from 'react';

import { Alpha2Code, getNames } from 'i18n-iso-countries';
import { useRouter } from 'next/router';
import { Control, useForm, UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { ProgressBar } from '@/components/common/ProgressBar';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { IRadioType } from '@/components/input/StandardInputs/Radio';
import { IRadioCardType } from '@/components/input/StandardInputs/RadioCard';
import { Meta } from '@/layout/Meta';
import { SimulateParams, SimulateSteps, useSimulatorStore } from '@/stores/simulator.store';
import { Main } from '@/templates/Main';
import { getNextStep, getProgressionStep } from '@/utils/steps';

export interface FormSimulatorData {
  border?: string;
  age?: number;
  meanOfTransport?: string;
  country?: Alpha2Code;
}

interface GetDisplayStepOptions {
  step: SimulateSteps;
  register: UseFormRegister<FormSimulatorData>;
  control: Control<FormSimulatorData, any>;
  errors: any;
  reset: () => void;
  simulateParams: SimulateParams;
}

const getDisplayedStep = ({
  step,
  control,
  register,
  errors,
  reset,
  simulateParams,
}: GetDisplayStepOptions): ReactNode => {
  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries);
    return keys.map((key) => ({ value: countries[key] ?? '', id: key }));
  }, []);
  const radioValues: IRadioType[] = [
    { id: 'true', value: 'Oui' },
    { id: 'false', value: 'Non' },
  ];
  const meanOfTransports: IRadioCardType[] = [
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
      id: 'boat',
      value: 'Bateau',
      svgIcon: 'boat',
    },
    {
      id: 'train',
      value: 'Train',
      svgIcon: 'train',
    },
    {
      id: 'other',
      value: 'Autre',
      svgIcon: 'other',
    },
  ];
  switch (step) {
    case SimulateSteps.AGE:
      return (
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
      );
    case SimulateSteps.MEAN_OF_TRANSPORT:
      return (
        <InputGroup
          label="Quel est votre moyen de transport ?"
          type="radioCard"
          name="meanOfTransport"
          radioCardValues={meanOfTransports}
          register={register('meanOfTransport', { required: true })}
          control={control}
          error={errors?.meanOfTransport?.message}
        />
      );
    case SimulateSteps.COUNTRY:
      return (
        <InputGroup
          label="Quel est le pays d’où vous arrivez ?"
          type="comboboxes"
          fullWidth={true}
          name="country"
          options={countriesOptions}
          register={register('country', { required: true })}
          control={control}
          error={errors?.countries?.message}
        />
      );
    case SimulateSteps.BORDER:
      return (
        <InputGroup
          label="Êtes-vous dans le cadre d’un déplacement de résident frontalier ?"
          type="radio"
          name="border"
          radioValues={radioValues}
          register={register('border', { required: true })}
          error={errors?.border?.message}
        />
      );

    default:
      return (
        <>
          <div>Vous avez terminé la configuration de votre profile</div>
          <Typography>Age : {simulateParams.age}</Typography>
          <Typography>Moyen de transport : {simulateParams.meanOfTransport}</Typography>
          <Typography>Pays : {simulateParams.country}</Typography>
          <Typography>Frontalier : {simulateParams.border ? 'Oui' : 'Non'}</Typography>
          <Button onClick={reset}>Changer la configuration</Button>
        </>
      );
  }
};

const Configuration = () => {
  const setSimulateParams = useSimulatorStore((state) => state.setSimulateParams);
  const resetParams = useSimulatorStore((state) => state.resetParams);
  const simulateParams = useSimulatorStore((state) => state.simulateParams);
  const router = useRouter();
  const step = router.query.step as SimulateSteps;

  const onSubmit = async (data: FormSimulatorData) => {
    const formattedData: SimulateParams = {
      age: data.age,
      border: data.border ? data.border === 'true' : undefined,
      meanOfTransport: data.meanOfTransport,
      country: data.country,
    };

    setSimulateParams(formattedData);
    const nextStep = getNextStep(step, simulateParams);

    router.push(`/app/simulateur/configuration/${nextStep}`);
  };

  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { errors: formErrors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      border: undefined,
      age: undefined,
      meanOfTransport: undefined,
      country: undefined,
    },
  });

  const handleReset = () => {
    reset();
    resetParams();
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [watch('meanOfTransport')]);

  return (
    <Main
      meta={
        <Meta
          title="Simulateur Déclaration Douanes"
          description="Simuler la déclaration de douane en quelques clics"
        />
      }
    >
      <div className="absolute top-0 h-auto w-full">
        <ProgressBar progression={getProgressionStep(step)} />
      </div>
      <div className="flex flex-col gap-6 px-4 py-8">
        <Link back>
          <div className="flex flex-row items-end">
            <div className="mr-4 h-5 w-5">
              <Icon name="chevron-thin-left" />
            </div>
            <Typography> Retour</Typography>
          </div>
        </Link>
        <div className="flex flex-row gap-2">
          <div>
            <SvgIcon name="calculator" />
          </div>
          <div className="mt-3">
            <Typography weight="bold" variant="h1" tag="h1" color="secondary">
              Simuler
              <br />
              mes achats
            </Typography>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {getDisplayedStep({
            step,
            register,
            control,
            errors: formErrors,
            reset: handleReset,
            simulateParams,
          })}
          {step !== SimulateSteps.MEAN_OF_TRANSPORT && (
            <div className="absolute inset-x-0 bottom-0 w-full">
              <div className="p-4">
                <Button fullWidth={true} type="submit">
                  Valider
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </Main>
  );
};

export default Configuration;
