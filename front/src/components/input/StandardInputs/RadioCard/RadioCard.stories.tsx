import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { IRadioCardType, RadioCard } from './RadioCard';

export default {
  title: 'Components/Input/StandardInputs/RadioCard',
  component: RadioCard,
} as Meta;

type FormValues = {
  happy: boolean;
};

export const Base = (): JSX.Element => {
  const methods = useForm<FormValues>({
    defaultValues: {
      happy: false,
    },
  });
  const {
    formState: { errors },
    control,
    register,
  } = methods;

  const radioCardValues: IRadioCardType[] = [
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
      disabled: true,
      svgIcon: 'train',
    },
    {
      id: 'other',
      value: 'Autre',
      svgIcon: 'other',
    },
  ];

  return (
    <div>
      <RadioCard
        control={control}
        register={register('happy')}
        error={errors.happy?.message}
        name="happy"
        radioCardValues={radioCardValues}
      />
    </div>
  );
};
