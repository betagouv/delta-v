import React from 'react';

import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { InputGroup } from './InputGroup';

export default {
  title: 'Components/Input/InputGroup',
  component: InputGroup,
} as Meta;

const options = [
  { id: 1, value: 'Audi' },
  { id: 2, value: 'Mercedes' },
  { id: 3, value: 'BMW' },
];

type FormValues = {
  comment: string;
};

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
    <div>
      <div>
        <InputGroup name="test" label="Label" placeholder="Placeholder" type="text" />
      </div>
      <br />
      <div>
        <InputGroup
          name="test"
          label="Label"
          error={errors.comment?.message}
          placeholder="Placeholder"
          type="text"
        />
      </div>
      <br />
      <div>
        <InputGroup
          name="test"
          label="Label"
          placeholder="Placeholder"
          type="select"
          options={options}
          control={control}
        />
      </div>
      <br />
      <div>
        <InputGroup
          name="test"
          label="Label"
          placeholder="Placeholder"
          type="select"
          options={options}
          error={errors.comment?.message}
          control={control}
        />
      </div>
      <br />
      <div>
        <InputGroup name="test" label="Label" placeholder="Placeholder" type="textarea" />
      </div>
      <br />
      <div>
        <InputGroup
          name="test"
          label="Label"
          placeholder="Placeholder"
          type="textarea"
          error={errors.comment?.message}
        />
      </div>
      <div>
        <InputGroup
          name="test"
          label="Label"
          placeholder="Placeholder"
          type="toggle"
          control={control}
          error={errors.comment?.message}
        />
      </div>
    </div>
  );
};
