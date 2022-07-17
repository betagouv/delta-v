import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from './FormAddProduct';
import { productFactory } from '@/tests/factories/Product.factory';

export default {
  title: 'Components/Business/FormAddProduct',
  component: FormAddProduct,
} as Meta;

export interface FormSimulatorData {
  value?: number;
  devise?: string;
}

const { register, control } = useForm<FormSimulatorData>({
  defaultValues: {
    value: undefined,
    devise: 'eur',
  },
});

const product = productFactory({});

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <FormAddProduct product={product} register={register} control={control} />
    <br />
  </div>
);
