import React from 'react';

import { AddProductCartDeclaration } from '../AddProductCartDeclaration';
import { OnAddProductOptions } from '@/components/business/formSelectProduct';
import DownModal from '@/components/common/DownModal';
import { Product } from '@/model/product';

type OnAddProduct = (options: OnAddProductOptions) => void;

interface ModalAddProductCartDeclarationProps {
  open: boolean;
  onClose?: () => void;
  currentProduct?: Product;
  onAddProduct: OnAddProduct;
  defaultCurrency?: string;
}

export const ModalAddProductCartDeclaration: React.FC<ModalAddProductCartDeclarationProps> = ({
  onClose,
  currentProduct,
  onAddProduct,
  open,
  defaultCurrency,
}) => {
  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
        <AddProductCartDeclaration
          onAddProduct={onAddProduct}
          defaultCurrency={defaultCurrency}
          currentProduct={currentProduct}
        />
      </DownModal>
    </>
  );
};
