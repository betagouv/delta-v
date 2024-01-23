import React, { useEffect, useState } from 'react';

import {
  DefaultValuesUpdateProduct,
  FormSelectProduct,
  OnAddProductOptions,
} from '@/components/business/FormSelectProduct';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { findProductTree } from '@/utils/product.util';

type OnAddProduct = (options: OnAddProductOptions) => void;

interface AddProductToFavoritesProps {
  currentProduct?: Product;
  onAddProduct: OnAddProduct;
  onRemoveProduct?: (product: Product) => void;
  onSelectProduct?: (id: string) => void;
  defaultCurrency?: string;
  defaultValues?: DefaultValuesUpdateProduct;
  isFromFavorites?: boolean;
}

export const AddProductToFavorites: React.FC<AddProductToFavoritesProps> = ({
  currentProduct,
  onAddProduct,
  onRemoveProduct,
  onSelectProduct,
  defaultCurrency,
  defaultValues,
  isFromFavorites,
}) => {
  const { nomenclatureProducts, findProductTreeSteps } = useStore((state) => ({
    nomenclatureProducts: state.products.appState.nomenclatureProducts,
    findProductTreeSteps: state.findProductTreeSteps,
  }));

  const productTree = currentProduct
    ? findProductTree(nomenclatureProducts, currentProduct.id)
    : [];

  const [defaultSteps, setDefaultSteps] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  useEffect(() => {
    if (currentProduct?.id) {
      const steps = findProductTreeSteps(currentProduct.id);
      setDefaultSteps(steps);
      setSelectedProduct(steps[steps.length - 1]);
    }
  }, [currentProduct]);

  return (
    <>
      <div className="flex flex-col h-full flex-1">
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
              onRemoveProduct={onRemoveProduct}
              defaultCurrency={defaultCurrency}
              isFromFavorites={isFromFavorites}
              defaultValues={defaultValues}
              isAddAbleToFavorites
              templateRole="agent"
            />
          )}
        </div>
      </div>
    </>
  );
};
