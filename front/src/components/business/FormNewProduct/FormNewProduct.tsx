import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { FormAddProduct } from '../FormAddProduct';
import { getSchema } from './schema';
import { InputGroup } from '@/components/input/InputGroup';
import { IOptions } from '@/components/input/StandardInputs/Select';
import { useStore } from '@/stores/store';

interface FormSelectProductProps {
  productName?: string;
  openModal: () => void;
  addNewProduct: (data: AddNewProductForm) => void;
}

export interface AddNewProductForm {
  name?: string;
  category?: string;
  value?: number;
  currency?: string;
}

export const FormNewProduct: React.FC<FormSelectProductProps> = ({
  productName,
  openModal,
  addNewProduct,
}: FormSelectProductProps) => {
  const { trackEvent } = useMatomo();
  const defaultCategory = { id: '', value: 'Catégorie' };
  const { products, defaultCurrency } = useStore(
    (state) => ({
      products: state.products.appState.products,
      defaultCurrency: state.simulator.appState.simulatorRequest.defaultCurrency,
    }),
    shallow,
  );

  const [categoryOptions, setCategoryOptions] = useState<IOptions[]>([]);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const options = products.map((product) => ({ id: product.id, value: product.name }));
    setCategoryOptions([defaultCategory, ...options]);
  }, [products]);

  useEffect(() => {
    if (productName) {
      trackEvent({ category: 'user-action', action: 'add-new-product', name: productName });
    }
  }, [productName]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AddNewProductForm>({
    defaultValues: {
      name: productName,
      category: defaultCategory.id,
      value: undefined,
      currency: defaultCurrency ?? 'EUR',
    },
    resolver: yupResolver(getSchema()),
  });

  useEffect(() => {
    if (productName) {
      setValue('name', productName);
    }
  }, [productName]);

  const onSubmit = (data: AddNewProductForm) => {
    setSubmitted(true);
    addNewProduct(data);
    setTimeout(() => {
      openModal();
    }, 250);
  };

  return (
    <form className="flex flex-1 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <InputGroup
          name="name"
          type="text"
          label="Nommer votre achat"
          placeholder="Exemple : Jeans, pantalon noir, slim..."
          register={register('name', { required: true })}
          error={errors.name?.message}
          fullWidth
        />
        <InputGroup
          name="category"
          type="simple-select"
          options={categoryOptions}
          placeholder="Catégorie"
          label="Choisissez la catégorie"
          register={register('category', { required: true })}
          error={errors.category?.message}
          control={control}
        />
        <FormAddProduct
          control={control}
          register={register}
          errors={errors as FieldErrors}
          submitted={submitted}
          templateRole="user"
        />
      </div>
    </form>
  );
};
