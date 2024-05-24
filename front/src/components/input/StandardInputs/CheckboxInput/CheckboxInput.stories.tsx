import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { CheckboxInput } from './CheckboxInput';

export default {
  title: 'Components/Input/StandardInputs/CheckboxInput',
  component: CheckboxInput,
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
      <CheckboxInput error={errors.happy?.message} name="happy" />
    </div>
  );
};
