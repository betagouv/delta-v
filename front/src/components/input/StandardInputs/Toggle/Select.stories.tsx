import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Toggle } from './Toggle';

export default {
  title: 'Components/Input/StandardInputs/Toggle',
  component: Toggle,
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
    control,
    formState: { errors },
  } = methods;

  return (
    <div>
      <Toggle error={errors.happy?.message} name="happy" control={control} />
    </div>
  );
};
