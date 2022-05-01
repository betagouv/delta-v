import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { IRadioType, Radio } from './Radio';

export default {
  title: 'Components/Input/StandardInputs/Radio',
  component: Radio,
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

  const radioValues: IRadioType[] = [
    {
      id: 'oui',
      value: 'Oui',
    },
    {
      id: 'non',
      value: 'Non',
    },
    {
      id: 'maybe',
      value: 'Peut être',
    },
  ];

  return (
    <div>
      <Radio error={errors.happy?.message} name="happy" radioValues={radioValues} />
    </div>
  );
};
