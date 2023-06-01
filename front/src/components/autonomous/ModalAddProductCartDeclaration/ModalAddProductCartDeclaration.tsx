import React from 'react';

import { FormSelectProduct, OnAddProductOptions } from '@/components/business/formSelectProduct';
import { CategoryList } from '@/components/common/CategoryList';
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
  const displayedProducts =
    currentProduct?.subProducts.map((product) => {
      return {
        to: `/simulateur/produits/${product.id}`,
        svgNames: product.icon ?? 'categoryOther',
        title: product.name,
      };
    }) ?? [];

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose}>
        <div className=" flex h-[90vh]">
          <div className="flex flex-1 flex-col gap-6">
            {currentProduct?.finalProduct ? (
              <FormSelectProduct
                currentProduct={currentProduct}
                onAddProduct={onAddProduct}
                role="agent"
              />
            ) : (
              <CategoryList items={displayedProducts} title="Catégories" />
            )}
          </div>
        </div>
      </DownModal>
    </>
  );
};
