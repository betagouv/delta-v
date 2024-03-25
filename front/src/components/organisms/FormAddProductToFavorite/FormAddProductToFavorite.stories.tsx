import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { FormAddProductToFavorite } from './FormAddProductToFavorite';
import { productFactory } from '@/tests/factories/Product.factory';

export default {
  title: 'Components/Organisms/FormAddProductToFavorite',
  component: FormAddProductToFavorite,
} as Meta;

export interface FormSimulatorData {
  value?: number;
  devise?: string;
}

const product = productFactory({});

export const base = (): JSX.Element => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      value: undefined,
      devise: 'eur',
    },
  });
  return (
    <div className="p-3">
      <br />
      <FormAddProductToFavorite
        productId={product.id}
        register={register}
        control={control}
        errors={errors}
      />
      <br />
    </div>
  );
};
