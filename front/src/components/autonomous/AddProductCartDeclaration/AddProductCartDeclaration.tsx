import React from 'react';

import {
  DefaultValuesUpdateProduct,
  FormSelectProduct,
  OnAddProductOptions,
} from '@/components/business/FormSelectProduct';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';

type OnAddProduct = (options: OnAddProductOptions) => void;

interface AddProductCartDeclarationProps {
  currentProduct?: Product;
  onAddProduct: OnAddProduct;
  defaultCurrency?: string;
  defaultValues?: DefaultValuesUpdateProduct;
}

export const AddProductCartDeclaration: React.FC<AddProductCartDeclarationProps> = ({
  currentProduct,
  onAddProduct,
  defaultCurrency,
  defaultValues,
}) => {
  const { findProductTree } = useStore((state) => ({
    findProductTree: state.findProductTree,
  }));

  const productTree = currentProduct ? findProductTree(currentProduct.id) : [];
  return (
    <>
      <div className="flex flex-col h-auto">
        <div className="px-4 py-5">
          <div className="flex flex-row gap-4">
            <Breadcrumbs
              categoryProducts={productTree
                .slice(0)
                .reverse()
                .map((product) => product.name)}
            />
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
        <div className="flex flex-1 flex-col gap-6 bg-secondary-bg px-4 py-5">
          {currentProduct && (
            <FormSelectProduct
              currentProduct={currentProduct}
              onAddProduct={onAddProduct}
              templateRole="agent"
              defaultCurrency={defaultCurrency}
              defaultValues={defaultValues}
            />
          )}
        </div>
      </div>
    </>
  );
};
