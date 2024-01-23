import React, { ReactNode, useState } from 'react';

import { getRadioCardProductForm, getRadioProductForm, getSteps } from '../FormSelectProduct/utils';
import { Product, ProductDisplayTypes } from '@/model/product';

interface EventChangeRadio {
  type: string;
  target: {
    name: string;
    value: string;
  };
}

interface StepsFormProductProps {
  currentProduct: Product;
  setSteps: (steps: Product[]) => void;
  steps: Product[];
  isFromFavorites?: boolean;
  register: any;
  control: any;
}

export const StepsFormProduct: React.FC<StepsFormProductProps> = ({
  currentProduct,
  setSteps,
  steps,
  register,
  control,
  isFromFavorites = false,
}: StepsFormProductProps) => {
  const [idSelectedStep, setIdSelectedStep] = useState<string | undefined>();

  const onChangeRadio = ({ type, target: { name, value } }: EventChangeRadio) => {
    const notResetSteps = !name || type !== 'change';
    if (notResetSteps) {
      return;
    }
    if (typeof value === 'string' && value !== idSelectedStep) {
      setIdSelectedStep(value);
      setSteps(getSteps({ currentProduct, lastId: value }));
    }
  };

  const inputSteps = steps
    .map((step): ReactNode | undefined => {
      const fieldRegister = register(step.id, {
        onChange: (event: any) => {
          onChangeRadio(event);
        },
      });
      if (step.productDisplayTypes === ProductDisplayTypes.radio) {
        return getRadioProductForm(step, fieldRegister, isFromFavorites);
      }

      if (step.productDisplayTypes === ProductDisplayTypes.radioCard) {
        return getRadioCardProductForm({
          product: step,
          register: fieldRegister,
          control,
          disabled: isFromFavorites,
        });
      }
      return undefined;
    })
    .filter((formElement) => formElement !== undefined);

  return (
    <>
      {inputSteps.map((form, index) => {
        return <div key={index}>{form}</div>;
      })}
    </>
  );
};
