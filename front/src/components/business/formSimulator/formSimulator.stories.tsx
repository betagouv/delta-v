import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { FormSimulator } from './formSimulator';
import { FormSimulatorData } from '@/pages';

export default {
  title: 'Components/Business/formSimulator',
  component: FormSimulator,
} as Meta;

export const WithVariant = () => {
  const {
    register,
    control,
    formState: { errors: formErrors },
  } = useForm<FormSimulatorData>({
    defaultValues: {
      border: false,
      age: 30,
      meanOfTransport: 'plane',
      shopingProducts: [
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
        { id: '', amount: 0, price: 0 },
      ],
    },
  });
  return (
    <FormSimulator
      control={control}
      errors={formErrors}
      register={register}
      onChangeBorder={() => undefined}
      onChangeMeanOfTransport={() => undefined}
    />
  );
};