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
import { Product, ProductDisplayTypes } from '@/stores/products/appState.store';

interface FormSelectProductProps {
  currentProduct: Product;
  onSubmit: (data: any) => void;
}

export const FormSelectProduct: React.FC<FormSelectProductProps> = ({
  currentProduct,
  onSubmit,
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
      price: undefined,
      devise: 'eur',
      ...getDefaultValues(steps),
    });
  }, [steps]);

  const multiForm = steps.map((step): ReactNode => {
    if (step.productDisplayTypes === ProductDisplayTypes.addable) {
      return <FormAddProduct control={control} register={register} />;
    }

    if (step.productDisplayTypes === ProductDisplayTypes.notManaged) {
      return <div>Produit non géré</div>;
    }

    if (step.productDisplayTypes === ProductDisplayTypes.radio) {
      return getRadioProductForm(step, register);
    }

    if (step.productDisplayTypes === ProductDisplayTypes.radioCard) {
      return getRadioCardProductForm(step, register, control);
    }

    return <></>;
  });

  return multiForm.length > 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      {multiForm.map((form, index) => {
        return (
          <div className="mb-5" key={index}>
            {form}
          </div>
        );
      })}
    </form>
  ) : (
    <></>
  );
};
