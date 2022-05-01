import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';

import { IRadioType } from '../StandardInputs/Radio';
import { IRadioCardType } from '../StandardInputs/RadioCard';
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
    svgIcon: 'train',
  },
  {
    id: 'other',
    value: 'Autre',
    svgIcon: 'other',
  },
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
        <InputGroup name="test" label="Simple input" placeholder="Placeholder" type="text" />
      </div>
      <br />
      <div>
        <InputGroup
          name="test"
          label="Input with error"
          error="Huston we have a problem"
          placeholder="Placeholder"
          type="text"
        />
      </div>
      <br />
      <div>
        <InputGroup
          name="test"
          label="Select"
          placeholder="Placeholder"
          type="select"
          options={options}
          control={control}
        />
      </div>
      <br />
      <div>
        <InputGroup name="test" label="Simple textarea" placeholder="Placeholder" type="textarea" />
      </div>
      <div>
        <InputGroup
          name="test"
          label="Simple toggle"
          placeholder="Placeholder"
          type="toggle"
          control={control}
          error={errors.comment?.message}
        />
      </div>
      <div>
        <InputGroup
          name="test"
          label="Simple radio"
          placeholder="Placeholder"
          type="radio"
          control={control}
          radioValues={radioValues}
          error={errors.comment?.message}
        />
      </div>
      <div>
        <InputGroup
          name="test"
          label="Radio card"
          placeholder="Placeholder"
          type="radioCard"
          control={control}
          radioCardValues={radioCardValues}
          error={errors.comment?.message}
        />
      </div>
    </div>
  );
};
