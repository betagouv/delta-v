import { ReactNode } from 'react';

import InputGroup from '@/components/input/InputGroup/InputGroup';
import { IRadioType } from '@/components/input/StandardInputs/Radio';
import { IRadioCardType } from '@/components/input/StandardInputs/RadioCard';
import { Product, ProductDisplayTypes } from '@/model/product';

export type Role = 'agent' | 'user' | 'userDeclaration';

export interface FormStepsProductData {
  [key: string]: boolean | number | string | undefined;
}

export interface FormSelectProductData extends FormStepsProductData {
  name?: string;
  value?: number;
  currency?: string;
  templateRole?: Role;
}

export interface RadioCardProductFormOptions {
  product: Product;
  register: any;
  control: any;
  templateRole?: Role;
  disabled?: boolean;
}

export const getDefaultValues = (steps: Product[]): FormStepsProductData => {
  const defaultValues: FormStepsProductData = {};
  steps.forEach((step) => {
    if (
      step.productDisplayTypes === ProductDisplayTypes.radio ||
      step.productDisplayTypes === ProductDisplayTypes.radioCard
    ) {
      const checkedProduct = step.subProducts.find((subProduct) => {
        return steps.findIndex((findStep) => findStep.id === subProduct.id) !== -1;
      });

      defaultValues[step.id] = checkedProduct ? checkedProduct.id : undefined;
    }
  });

  return defaultValues;
};

interface GetSteps {
  currentProduct: Product;
  lastId: string;
}

export const getSteps = ({ currentProduct, lastId }: GetSteps): Product[] => {
  let steps: Product[] = [];
  currentProduct.subProducts.every((subProduct) => {
    if (subProduct.id === lastId) {
      steps = [currentProduct, subProduct];

      return false;
    }
    const subSteps = getSteps({ currentProduct: subProduct, lastId });
    steps = [currentProduct, ...subSteps];
    return true;
  });
  return steps;
};

export const getRadioProductForm = (
  product: Product,
  register: any,
  disabled?: boolean,
): ReactNode => {
  const radioValues: IRadioType[] = product.subProducts.map((subProduct): IRadioType => {
    return { id: subProduct.id, value: subProduct.radioValue ?? subProduct.name };
  });
  return (
    <InputGroup
      register={register}
      name={product.id}
      radioValues={radioValues}
      type="radio"
      label={product.childrenQuestion ?? undefined}
      disabled={disabled}
      barGroupedRadio
      newLabel
    />
  );
};

export const getRadioCardProductForm = ({
  product,
  register,
  control,
  templateRole = 'user',
  disabled,
}: RadioCardProductFormOptions): ReactNode => {
  const radioCardValues: IRadioCardType[] = product.subProducts.map(
    (subProduct): IRadioCardType => {
      return {
        id: subProduct.id,
        value: subProduct.radioValue ?? subProduct.name,
        svgIcon: subProduct.icon ?? 'categoryOther',
      };
    },
  );
  return templateRole === 'agent' ? (
    <InputGroup
      control={control}
      register={register}
      name={product.id}
      radioCardValues={radioCardValues}
      type="radioCard"
      label={product.childrenQuestion ?? undefined}
      disabled={disabled}
      radioCardLabelClassname="md:line-clamp-1"
    />
  ) : (
    <InputGroup
      control={control}
      register={register}
      name={product.id}
      radioCardValues={radioCardValues}
      type="radioCard"
      label={product.childrenQuestion ?? undefined}
      disabled={disabled}
      radioCardLabelClassname="md:line-clamp-1"
    />
  );
};
