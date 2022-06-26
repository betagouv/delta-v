import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from './Search';

export default {
  title: 'Components/Business/FormAddProduct',
  component: FormAddProduct,
} as Meta;

export interface FormSimulatorData {
  price?: number;
  devise?: string;
}

const { register, control } = useForm<FormSimulatorData>({
  defaultValues: {
    price: undefined,
    devise: 'eur',
  },
});

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <FormAddProduct register={register} control={control} />
    <br />
  </div>
);
