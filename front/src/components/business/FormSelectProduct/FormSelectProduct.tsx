import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../FormAddProduct';
import { FormAddProductToFavorite } from '../FormAddProductToFavorite';
import { StepsFormProduct } from '../StepsFormProduct/StepsFormProduct';
import { ProductNotManaged } from './ProductNotManaged';
import { getSchema } from './schema';
import { FormSelectProductData, Role, getDefaultValues } from './utils';
import { InputGroup } from '@/components/input/InputGroup';
import { Product, ProductDisplayTypes } from '@/model/product';

export interface OnAddProductOptions {
  product: Product;
  customId?: string;
  name: string;
  value: string;
  currency: string;
}

export interface DefaultValuesUpdateProduct {
  customId: string;
  name: string;
  value: number;
  currency: string;
}

interface FormSelectProductProps {
  currentProduct: Product;
  onAddProduct: (options: OnAddProductOptions) => void;
  onRemoveProduct?: (product: Product) => void;
  templateRole?: Role;
  defaultCurrency?: string;
  defaultName?: string;
  defaultValues?: DefaultValuesUpdateProduct;
  isAddAbleToFavorites?: boolean;
}

export const FormSelectProduct: React.FC<FormSelectProductProps> = ({
  currentProduct,
  onAddProduct,
  onRemoveProduct,
  templateRole = 'user',
  defaultCurrency = 'EUR',
  defaultName = '',
  defaultValues,
  isAddAbleToFavorites = false,
}: FormSelectProductProps) => {
  const [steps, setSteps] = useState<Product[]>([]);
  const [allowNotManagedProduct, setAllowNotManagedProduct] = useState<boolean>(false);

  useEffect(() => {
    if (currentProduct) {
      setSteps([currentProduct]);
    }
    setAllowNotManagedProduct(false);
  }, [currentProduct]);

  useEffect(() => {
    if (defaultValues?.customId) {
      setAllowNotManagedProduct(true);
    }
  }, [defaultValues]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ...getDefaultValues(steps),
      name: defaultName,
      value: null,
      currency: defaultCurrency,
    },
    resolver: !isAddAbleToFavorites
      ? yupResolver(
          getSchema({
            amountProduct: !!currentProduct.amountProduct,
            withName: templateRole === 'agent',
          }),
        )
      : undefined,
  });

  useEffect(() => {
    reset({
      name: defaultValues?.name ?? undefined,
      value: defaultValues?.value ?? null,
      currency: defaultValues?.currency ?? defaultCurrency,
      ...getDefaultValues(steps),
    });
  }, [steps]);

  const onSubmit = (data: FormSelectProductData): void => {
    const product = steps.pop();
    if (product) {
      onAddProduct({
        customId: (defaultValues?.customId as string) ?? undefined,
        name: (data.name as string) ?? '',
        product,
        value: data.value?.toString() ?? '1',
        currency: (data.currency as string) ?? 'EUR',
      });
    }
  };

  const isAddAble =
    steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1 ||
    currentProduct.productDisplayTypes === ProductDisplayTypes.notManaged;

  return allowNotManagedProduct ||
    currentProduct.productDisplayTypes !== ProductDisplayTypes.notManaged ? (
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
            withBorder
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
      {isAddAble && !isAddAbleToFavorites && (
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
      {isAddAbleToFavorites && (
        <FormAddProductToFavorite
          productId={currentProduct.id}
          onRemoveProduct={onRemoveProduct}
          control={control}
          register={register}
          errors={errors}
          defaultCurrency={defaultCurrency}
          templateRole={templateRole}
          isAddAble={isAddAble}
        />
      )}
    </form>
  ) : (
    <ProductNotManaged addProduct={() => setAllowNotManagedProduct(true)} />
  );
};
