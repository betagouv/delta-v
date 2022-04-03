import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFieldArray, useForm } from 'react-hook-form';

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
        { id: '1', name: 'Sac en cuir', amount: 0, price: 0 },
        { id: '2', name: 'téléphone portable', amount: 0, price: 0 },
      ],
    },
  });
  const { fields: productFields, remove: removeProduct } = useFieldArray({
    control,
    name: 'shopingProducts',
  });
  return (
    <FormSimulator
      control={control}
      errors={formErrors}
      register={register}
      fields={productFields}
      remove={removeProduct}
    />
  );
};
