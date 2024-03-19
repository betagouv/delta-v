import React from 'react';

import { AddProductCartDeclaration } from '../AddProductCartDeclaration';
import {
  DefaultValuesUpdateProduct,
  OnAddProductOptions,
} from '@/components/business/FormSelectProduct';
import { Product } from '@/model/product';
import { ModalType, getModalComponent } from '@/utils/modal';

export type OnAddProduct = (options: OnAddProductOptions) => void;

interface ModalAddProductCartDeclarationProps {
  open: boolean;
  onClose: () => void;
  currentProduct?: Product;
  onAddProduct: OnAddProduct;
  defaultCurrency?: string;
  defaultValues?: DefaultValuesUpdateProduct;
  modalType?: ModalType;
}

export const ModalAddProductCartDeclaration: React.FC<ModalAddProductCartDeclarationProps> = ({
  onClose,
  currentProduct,
  onAddProduct,
  open,
  defaultCurrency,
  defaultValues,
  modalType = ModalType.DOWN,
}) => {
  const ModalComponent = getModalComponent(modalType);
  return (
    <ModalComponent bgColor="bg-white" open={open} onClose={onClose} withoutMargin noPadding>
      <AddProductCartDeclaration
        onAddProduct={onAddProduct}
        defaultCurrency={defaultCurrency}
        currentProduct={currentProduct}
        defaultValues={defaultValues}
        isMobile={modalType === ModalType.DOWN}
      />
    </ModalComponent>
  );
};
