import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../formAddProduct';
import { StepsFormProduct } from '../stepsFormProduct/StepsFormProduct';
import { ProductNotManaged } from './ProductNotManaged';
import { getSchema } from './schema';
import { FormSelectProductData, Role, getDefaultValues } from './utils';
import { InputGroup } from '@/components/input/InputGroup';
import { Product, ProductDisplayTypes } from '@/model/product';

export interface OnAddProductOptions {
  product: Product;
  name: string;
  value: string;
  currency: string;
}

interface FormSelectProductProps {
  currentProduct: Product;
  onAddProduct: (options: OnAddProductOptions) => void;
  templateRole?: Role;
  defaultCurrency?: string;
}

export const FormSelectProduct: React.FC<FormSelectProductProps> = ({
  currentProduct,
  onAddProduct,
  templateRole = 'user',
  defaultCurrency = 'EUR',
}: FormSelectProductProps) => {
  const [steps, setSteps] = useState<Product[]>([]);

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
      currency: defaultCurrency,
      ...getDefaultValues(steps),
    },
    resolver: yupResolver(
      getSchema({
        amountProduct: !!currentProduct.amountProduct,
        withName: templateRole === 'agent',
      }),
    ),
  });

  useEffect(() => {
    reset({
      name: undefined,
      currency: defaultCurrency,
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
      {templateRole === 'user' && (
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
      {isAddAble && (
        <FormAddProduct
          productId={currentProduct.id}
          disabled={!isAddAble}
          control={control}
          register={register}
          errors={errors}
          defaultCurrency={defaultCurrency}
          templateRole={templateRole}
        />
      )}
    </form>
  ) : (
    <ProductNotManaged />
  );
};
