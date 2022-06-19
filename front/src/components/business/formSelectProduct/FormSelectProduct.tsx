import React, { ReactNode, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../formAddProduct';
import {
  FormSelectProductData,
  getDefaultValues,
  getRadioCardProductForm,
  getRadioProductForm,
  getSteps,
} from './utils';
import { InputGroup } from '@/components/input/InputGroup';
import { Product, ProductDisplayTypes } from '@/model/product';

export interface OnAddProductOptions {
  product: Product;
  name: string;
  price: number;
  devise: string;
}

type OnAddProduct = (options: OnAddProductOptions) => void;

interface FormSelectProductProps {
  currentProduct: Product;
  onAddProduct: OnAddProduct;
}

export const FormSelectProduct: React.FC<FormSelectProductProps> = ({
  currentProduct,
  onAddProduct,
}: FormSelectProductProps) => {
  const [steps, setSteps] = useState<Product[]>([]);

  useEffect(() => {
    if (currentProduct) {
      setSteps([currentProduct]);
    }
  }, [currentProduct]);

  const onSelectStep = (idSelectedStep: string): void => {
    setSteps(getSteps({ currentProduct, lastId: idSelectedStep }));
  };

  const { handleSubmit, register, control, watch, reset } = useForm<FormSelectProductData>({
    defaultValues: {
      price: undefined,
      devise: 'eur',
      ...getDefaultValues(steps),
    },
  });

  const idsToWatch = steps
    .filter(
      (step) =>
        step.productDisplayTypes === ProductDisplayTypes.radio ||
        step.productDisplayTypes === ProductDisplayTypes.radioCard,
    )
    .map((step) => step.id);

  const [idSelectedStep, setIdSelectedStep] = useState<string | undefined>();

  useEffect(() => {
    watch((value, { name, type }) => {
      const notResetSteps = !name || type !== 'change' || !idsToWatch.includes(name);
      if (notResetSteps) {
        return;
      }

      const idSelected = value[name];

      if (typeof idSelected === 'string' && idSelected !== idSelectedStep) {
        setIdSelectedStep(idSelected);
        onSelectStep(idSelected);
      }
    });
  }, [watch(idsToWatch)]);

  useEffect(() => {
    reset({
      name: undefined,
      price: undefined,
      devise: 'eur',
      ...getDefaultValues(steps),
    });
  }, [steps]);

  const onSubmit = (data: FormSelectProductData): void => {
    const product = steps.pop();
    if (product) {
      onAddProduct({
        name: (data.name as string) ?? '',
        product,
        price: (data.price as number) ?? 1,
        devise: (data.devise as string) ?? 'eur',
      });
    }
  };

  const multiForm = steps
    .map((step): ReactNode | undefined => {
      if (step.productDisplayTypes === ProductDisplayTypes.notManaged) {
        return <div>Produit non géré</div>;
      }

      if (step.productDisplayTypes === ProductDisplayTypes.radio) {
        return getRadioProductForm(step, register);
      }

      if (step.productDisplayTypes === ProductDisplayTypes.radioCard) {
        return getRadioCardProductForm(step, register, control);
      }
      return undefined;
    })
    .filter((formElement) => formElement !== undefined);

  const isAddAble =
    steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1;

  return multiForm.length > 0 ? (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex h-full flex-col gap-6">
        <InputGroup
          fullWidth
          name="name"
          type="text"
          label="Nommez votre achat"
          placeholder="Exemple : Jeans, pantalon noir, slim..."
          control={control}
          register={register('name', { required: true })}
        />
        {multiForm.map((form, index) => {
          return <div key={index}>{form}</div>;
        })}
        <FormAddProduct disabled={!isAddAble} control={control} register={register} />
      </div>
    </form>
  ) : (
    <></>
  );
};
