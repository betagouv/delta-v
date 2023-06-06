import React from 'react';

import { FormSelectProduct, OnAddProductOptions } from '@/components/business/formSelectProduct';
import DownModal from '@/components/common/DownModal';
import { Product } from '@/model/product';

type OnAddProduct = (options: OnAddProductOptions) => void;

interface ModalAddProductCartDeclarationProps {
  open: boolean;
  onClose?: () => void;
  currentProduct: Product;
  onAddProduct: OnAddProduct;
}

export const ModalAddProductCartDeclaration: React.FC<ModalAddProductCartDeclarationProps> = ({
  onClose,
  currentProduct,
  onAddProduct,
  open,
}) => {
  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose}>
        <div className=" flex h-[90vh]">
          <div className="flex flex-1 flex-col gap-6">
            <FormSelectProduct
              currentProduct={currentProduct}
              onAddProduct={onAddProduct}
              role="agent"
            />
          </div>
        </div>
      </DownModal>
    </>
  );
};
