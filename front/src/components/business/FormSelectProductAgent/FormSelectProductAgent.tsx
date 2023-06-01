import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../formAddProduct';
import { StepsFormProduct } from '../stepsFormProduct/StepsFormProduct';
import { ProductNotManaged } from './ProductNotManaged';
import { getSchema } from './schema';
import { FormSelectProductAgentData, getDefaultValues } from './utils';
import { Product, ProductDisplayTypes } from '@/model/product';
import { useStore } from '@/stores/store';

export interface OnAddProductOptions {
  product: Product;
  name: string;
  value: string;
  currency: string;
}

type OnAddProduct = (options: OnAddProductOptions) => void;

interface FormSelectProductAgentProps {
  currentProduct: Product;
  onAddProduct: OnAddProduct;
}

export const FormSelectProductAgent: React.FC<FormSelectProductAgentProps> = ({
  currentProduct,
  onAddProduct,
}: FormSelectProductAgentProps) => {
  const [steps, setSteps] = useState<Product[]>([]);
  const { defaultCurrency } = useStore((state) => ({
    defaultCurrency: state.simulator.appState.simulatorRequest.defaultCurrency,
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

  const onSubmit = (data: FormSelectProductAgentData): void => {
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
      <StepsFormProduct
        control={control}
        currentProduct={currentProduct}
        register={register}
        setSteps={setSteps}
        steps={steps}
      />
      {isAddAble && (
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
