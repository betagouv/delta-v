import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../formAddProduct';
import { StepsFormProduct } from '../stepsFormProduct/StepsFormProduct';
import { ProductNotManaged } from './ProductNotManaged';
import { getSchema } from './schema';
import { FormSelectProductData, getDefaultValues } from './utils';
import { InputGroup } from '@/components/input/InputGroup';
import { Product, ProductDisplayTypes } from '@/model/product';
import { useStore } from '@/stores/store';

export type Role = 'agent' | 'user';

export interface OnAddProductOptions {
  product: Product;
  name: string;
  value: string;
  currency: string;
}

interface FormSelectProductProps {
  currentProduct: Product;
  onAddProduct: (options: OnAddProductOptions) => void;
  role?: Role;
}

export const FormSelectProduct: React.FC<FormSelectProductProps> = ({
  currentProduct,
  onAddProduct,
  role = 'user',
}: FormSelectProductProps) => {
  const [steps, setSteps] = useState<Product[]>([]);
  const { defaultCurrency } = useStore((state) => ({
    defaultCurrency:
      role === 'user'
        ? state.simulator.appState.simulatorRequest.defaultCurrency
        : state.declaration.appState.declarationRequest.defaultCurrency,
  }));

  useEffect(() => {
    if (currentProduct) {
      setSteps([currentProduct]);
    }
  }, [currentProduct]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: undefined,
      value: null,
      currency: defaultCurrency ?? 'EUR',
      ...getDefaultValues(steps),
    },
    resolver: yupResolver(getSchema(!!currentProduct.amountProduct)),
  });

  useEffect(() => {
    reset({
      name: undefined,
      ...getDefaultValues(steps),
    });
  }, [steps]);

  const onSubmit = (data: FormSelectProductData): void => {
    const product = steps.pop();
    if (product) {
      onAddProduct({
        name: (data.name as string) ?? '',
        product,
        value: data.value?.toString() ?? '1',
        currency: (data.currency as string) ?? 'EUR',
      });
    }
  };

  const isAddAble =
    steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1;

  return currentProduct.productDisplayTypes !== ProductDisplayTypes.notManaged ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-6">
      {role === 'user' && (
        <div>
          <label
            htmlFor="name"
            className={`mb-4 block text-base font-bold`}
            data-testid="label-element"
          >
            Nommez votre achat{' '}
            <span className="ml-1 font-normal italic text-gray-400">(facultatif)</span>
          </label>
          <InputGroup
            type="text"
            fullWidth
            name="name"
            placeholder="Exemple : Jeans, pantalon noir, slim..."
            register={register('name', { required: false })}
            error={errors.name?.message as string | undefined}
          />
        </div>
      )}
      <StepsFormProduct
        control={control}
        currentProduct={currentProduct}
        register={register}
        setSteps={setSteps}
        steps={steps}
      />
      {(role === 'user' || isAddAble) && (
        <FormAddProduct
          productId={currentProduct.id}
          disabled={!isAddAble}
          control={control}
          register={register}
          errors={errors}
        />
      )}
    </form>
  ) : (
    <ProductNotManaged />
  );
};
