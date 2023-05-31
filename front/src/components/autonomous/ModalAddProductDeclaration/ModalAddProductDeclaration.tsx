import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ModalUnderConstruction } from '../ModalUnderConstruction';
import { OnAddProductOptions } from '@/components/business/formSelectProduct';
import { getSchema } from '@/components/business/formSelectProduct/schema';
import { getDefaultValues } from '@/components/business/formSelectProduct/utils';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';

type OnAddProduct = (options: OnAddProductOptions) => void;

interface ModalAddProductDeclarationProps {
  open: boolean;
  onClose?: () => void;
  currentProduct: Product;
  onAddProduct: OnAddProduct;
}

export const ModalAddProductDeclaration: React.FC<ModalAddProductDeclarationProps> = ({
  onClose,
  currentProduct,
  // onAddProduct,
  open,
}) => {
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
    // handleSubmit,
    // register,
    // control,
    reset,
    // formState: { errors },
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

  // const isAddAble =
  //   steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1;

  // const isClothes = currentProduct.name.toLocaleLowerCase().includes('vêtements');

  return (
    <>
      <ModalUnderConstruction open={open} onClose={onClose} />
    </>
  );
};
