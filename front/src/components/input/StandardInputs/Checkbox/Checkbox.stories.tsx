import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Input/StandardInputs/Checkbox',
  component: Checkbox,
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
  } = methods;

  return (
    <div>
      <Checkbox error={errors.happy?.message} name="happy" />
    </div>
  );
};
