import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../FormAddProduct';
import { FormAddProductToFavorite } from '../FormAddProductToFavorite';
import { StepsFormProduct } from '../StepsFormProduct/StepsFormProduct';
import { ProductNotManaged } from './ProductNotManaged';
import { getSchema } from './schema';
import { FormSelectProductData, Role, getDefaultValues } from './utils';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import { Product, ProductDisplayTypes } from '@/model/product';

export interface OnAddProductOptions {
  product: Product;
  customId?: string;
  name: string;
  value: string;
  currency: string;
  customName: string;
}

export interface DefaultValuesUpdateProduct {
  customId: string;
  name: string;
  value: number;
  currency: string;
}

interface FormSelectProductProps {
  currentProduct: Product;
  defaultSteps: Product[];
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
  defaultSteps,
  onAddProduct,
  onRemoveProduct,
  templateRole = 'user',
  defaultCurrency = 'EUR',
  defaultName = '',
  defaultValues,
  isAddAbleToFavorites = false,
}: FormSelectProductProps) => {
  const [steps, setSteps] = useState<Product[]>(defaultSteps);
  const [allowNotManagedProduct, setAllowNotManagedProduct] = useState<boolean>(false);

  useEffect(() => {
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
    getValues,
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
        customName: getValues('name'),
      });
    }
  };

  const isAddAble =
    steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1 ||
    currentProduct.productDisplayTypes === ProductDisplayTypes.notManaged;

  return allowNotManagedProduct ||
    currentProduct.productDisplayTypes !== ProductDisplayTypes.notManaged ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full gap-6">
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
        <div className="md:grid md:grid-rows-2 h-full">
          <FormAddProductToFavorite
            productId={steps[steps.length - 1]?.id}
            onRemoveFavorite={onRemoveProduct}
            control={control}
            register={register}
            errors={errors}
            defaultCurrency={defaultCurrency}
            templateRole={templateRole}
            isAddAble={isAddAble}
          />
          <div className="flex flex-col w-full h-full md:justify-end md:mt-0 mt-10 ">
            <Typography
              size="text-2xs"
              desktopSize="text-sm"
              color="middle-gray"
              textPosition="text-center"
            >
              Vous souhaitez nous faire parvenir une remarque, une optimisation,
              <br /> une demande particulière ? <a>Cliquez ici</a>
            </Typography>
          </div>
        </div>
      )}
    </form>
  ) : (
    <ProductNotManaged addProduct={() => setAllowNotManagedProduct(true)} />
  );
};
