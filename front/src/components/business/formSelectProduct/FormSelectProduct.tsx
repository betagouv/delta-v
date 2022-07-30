import React, { ReactNode, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { FormAddProduct } from '../formAddProduct';
import { ProductNotManaged } from './ProductNotManaged';
import {
  FormSelectProductData,
  getDefaultValues,
  getRadioCardProductForm,
  getRadioProductForm,
  getSteps,
} from './utils';
import { Input } from '@/components/input/StandardInputs/Input';
import { Product, ProductDisplayTypes } from '@/model/product';

export interface OnAddProductOptions {
  product: Product;
  name: string;
  value: string;
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

  const { handleSubmit, register, control, reset } = useForm<FormSelectProductData>({
    defaultValues: {
      value: undefined,
      devise: 'eur',
      ...getDefaultValues(steps),
    },
  });

  const [idSelectedStep, setIdSelectedStep] = useState<string | undefined>();

  useEffect(() => {
    reset({
      name: undefined,
      value: undefined,
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
        value: (data.value as string) ?? '1',
        devise: (data.devise as string) ?? 'eur',
      });
    }
  };

  interface EventChangeRadio {
    type: string;
    target: {
      name: string;
      value: string;
    };
  }
  const onChangeRadio = ({ type, target: { name, value } }: EventChangeRadio) => {
    const notResetSteps = !name || type !== 'change';
    if (notResetSteps) {
      return;
    }
    if (typeof value === 'string' && value !== idSelectedStep) {
      setIdSelectedStep(value);
      onSelectStep(value);
    }
  };

  const multiForm = steps
    .map((step): ReactNode | undefined => {
      const fieldRegister = register(step.id, {
        onChange: (e) => {
          onChangeRadio(e);
        },
      });
      if (step.productDisplayTypes === ProductDisplayTypes.radio) {
        return getRadioProductForm(step, fieldRegister);
      }

      if (step.productDisplayTypes === ProductDisplayTypes.radioCard) {
        return getRadioCardProductForm(step, fieldRegister, control);
      }
      return undefined;
    })
    .filter((formElement) => formElement !== undefined);

  const isAddAble =
    steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1;

  return currentProduct.productDisplayTypes !== ProductDisplayTypes.notManaged ? (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-6">
      <div>
        <label
          htmlFor="name"
          className={`mb-4 block text-base font-bold`}
          data-testid="label-element"
        >
          Nommez votre achat{' '}
          <span className="ml-1 font-normal italic text-gray-400">(facultatif)</span>
        </label>
        <Input
          fullWidth
          name="name"
          type="text"
          placeholder="Exemple : Jeans, pantalon noir, slim..."
          register={register('name', { required: false })}
        />
      </div>
      {multiForm.map((form, index) => {
        return <div key={index}>{form}</div>;
      })}
      <FormAddProduct
        product={currentProduct}
        disabled={!isAddAble}
        control={control}
        register={register}
      />
    </form>
  ) : (
    <ProductNotManaged />
  );
};
