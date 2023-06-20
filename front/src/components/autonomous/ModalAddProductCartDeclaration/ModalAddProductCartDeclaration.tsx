import React from 'react';

import { FormSelectProduct, OnAddProductOptions } from '@/components/business/formSelectProduct';
import DownModal from '@/components/common/DownModal';
import { Typography } from '@/components/common/Typography';
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
        <div className="flex flex-col h-auto">
          <div className="px-4 py-5">
            <div className="flex flex-row gap-4">
              <Typography color="secondary" colorGradient="600" size="text-2xs">
                BreadCrumbs
              </Typography>
            </div>
            <div className="flex flex-col gap-2 pt-5 pb-2">
              <Typography color="black" size="text-xl" weight="bold">
                {currentProduct?.name}
              </Typography>
              <div className="flex flex-row gap-2">
                {currentProduct?.nomenclatures &&
                  currentProduct.nomenclatures.map((nomenclature) => (
                    <Typography color="primary" size="text-2xs">
                      {nomenclature}
                    </Typography>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6 bg-secondary-100 px-4 py-5">
            {currentProduct && (
              <FormSelectProduct
                currentProduct={currentProduct}
                onAddProduct={onAddProduct}
                templateRole="agent"
                defaultCurrency={defaultCurrency}
              />
            )}
          </div>
        </div>
      </DownModal>
    </>
  );
};
