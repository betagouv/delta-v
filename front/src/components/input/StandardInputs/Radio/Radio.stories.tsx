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
      name: 'happy',
      value: 'Oui',
    },
    {
      id: 'non',
      name: 'happy',
      value: 'Non',
    },
    {
      id: 'maybe',
      name: 'happy',
      value: 'Peut être',
    },
  ];

  return (
    <div>
      <Radio error={errors.happy?.message} name="happy" radioValues={radioValues} />
    </div>
  );
};
