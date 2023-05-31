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
<<<<<<< HEAD
=======
  // onAddProduct,
>>>>>>> 3599b28 (feat(#542): add search modal on step marchandises)
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

<<<<<<< HEAD
  const { reset } = useForm<any>({
=======
  const {
    // handleSubmit,
    // register,
    // control,
    reset,
    // formState: { errors },
  } = useForm<any>({
>>>>>>> 3599b28 (feat(#542): add search modal on step marchandises)
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

<<<<<<< HEAD
=======
  // const isAddAble =
  //   steps.findIndex((step) => step.productDisplayTypes === ProductDisplayTypes.addable) !== -1;

  // const isClothes = currentProduct.name.toLocaleLowerCase().includes('vêtements');

>>>>>>> 3599b28 (feat(#542): add search modal on step marchandises)
  return (
    <>
      <ModalUnderConstruction open={open} onClose={onClose} />
    </>
  );
};
