import React from 'react';

import { AddProductCartDeclaration } from '../AddProductCartDeclaration';
import {
  DefaultValuesUpdateProduct,
  OnAddProductOptions,
} from '@/components/business/FormSelectProduct';
import DownModal from '@/components/common/DownModal';
import { Product } from '@/model/product';

type OnAddProduct = (options: OnAddProductOptions) => void;

interface ModalAddProductCartDeclarationProps {
  open: boolean;
  onClose: () => void;
  currentProduct?: Product;
  onAddProduct: OnAddProduct;
  defaultCurrency?: string;
  defaultValues?: DefaultValuesUpdateProduct;
}

export const ModalAddProductCartDeclaration: React.FC<ModalAddProductCartDeclarationProps> = ({
  onClose,
  currentProduct,
  onAddProduct,
  open,
  defaultCurrency,
  defaultValues,
}) => {
  return (
    <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
      <AddProductCartDeclaration
        onAddProduct={onAddProduct}
        defaultCurrency={defaultCurrency}
        currentProduct={currentProduct}
        defaultValues={defaultValues}
      />
    </DownModal>
  );
};
