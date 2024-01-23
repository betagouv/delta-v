import React, { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';

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
  onSelectProduct?: (id: string) => void;
  defaultCurrency?: string;
  defaultValues?: DefaultValuesUpdateProduct;
}

export const AddProductCartDeclaration: React.FC<AddProductCartDeclarationProps> = ({
  currentProduct,
  onAddProduct,
  onSelectProduct,
  defaultCurrency,
  defaultValues,
}) => {
  const { findProductTree, findProductTreeSteps } = useStore(
    (state) => ({
      findProductTree: state.findProductTree,
      findProductTreeSteps: state.findProductTreeSteps,
    }),
    shallow,
  );

  const [defaultSteps, setDefaultSteps] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  useEffect(() => {
    if (currentProduct?.id) {
      const steps = findProductTreeSteps(currentProduct.id);
      setDefaultSteps(steps);
      setSelectedProduct(steps[0]);
    }
  }, [currentProduct]);

  const productTree = currentProduct ? findProductTree(currentProduct.id) : [];
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="px-4 py-5">
          <div className="flex flex-row gap-4">
            <Breadcrumbs
              categoryProducts={productTree
                .slice(0)
                .reverse()
                .map((product) => product)}
              limit={3}
              onClickLink={onSelectProduct}
            />
          </div>
          <div className="flex flex-col gap-2 pt-5 pb-2">
            <Typography color="black" size="text-xl" weight="bold" lineHeight="leading-none">
              {currentProduct?.name}
            </Typography>
            {currentProduct?.nomenclatures && (
              <div className="flex flex-row gap-2">
                {currentProduct.nomenclatures.map((nomenclature) => (
                  <Typography color="primary" size="text-2xs">
                    {nomenclature}
                  </Typography>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 bg-secondary-bg px-4 py-5">
          {selectedProduct && (
            <FormSelectProduct
              currentProduct={selectedProduct}
              defaultSteps={defaultSteps}
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
