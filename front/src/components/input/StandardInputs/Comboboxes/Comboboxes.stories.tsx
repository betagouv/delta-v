import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { Comboboxes } from './Comboboxes';

export default {
  title: 'Components/Input/StandardInputs/Comboboxes',
  component: Comboboxes,
} as Meta;

type FormValues = {
  comment: string;
};

const options = [
  { id: 1, value: 'Audi' },
  { id: 2, value: 'Mercedes' },
  { id: 3, value: 'BMW' },
];

export const Base = (): JSX.Element => {
  const methods = useForm<FormValues>({
    defaultValues: {
      comment: options[0]?.value,
    },
  });
  const {
    control,
    formState: { errors },
  } = methods;

  return (
    <>
      <div>
        <span>Small width :</span>
        <Comboboxes
          error={errors.comment?.message}
          name="comment"
          options={options}
          control={control}
        />
      </div>
      <br />
      <br />
      <div>
        <span>Full width :</span>
        <Comboboxes
          error={errors.comment?.message}
          name="comment"
          options={options}
          control={control}
          fullWidth
        />
      </div>
    </>
  );
};
