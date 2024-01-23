import React from 'react';

import classNames from 'classnames';

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
}

export const AddProductToFavorites: React.FC<AddProductToFavoritesProps> = ({
  currentProduct,
  onAddProduct,
  onRemoveProduct,
  onSelectProduct,
  defaultCurrency,
  defaultValues,
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
      setSelectedProduct(steps[0]);
    }
  }, [currentProduct]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className={classNames({ 'px-4 pt-5 md:px-10 md:pt-10 md:pb-5': true })}>
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
            <Typography
              color="black"
              size="text-xl"
              desktopSize="md:text-[26px]"
              weight="bold"
              lineHeight="leading-none"
            >
              {currentProduct?.name}
            </Typography>
            {currentProduct?.nomenclatures && (
              <div className="flex flex-row gap-2">
                {currentProduct.nomenclatures.map((nomenclature) => (
                  <Typography color="primary" size="text-2xs" desktopSize="text-sm">
                    {nomenclature}
                  </Typography>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames({
            'relative flex flex-col gap-6 bg-secondary-bg px-4 py-5 md:p-10 h-full': true,
          })}
        >
          {currentProduct && (
            <FormSelectProduct
              currentProduct={selectedProduct}
              defaultSteps={defaultSteps}
              onAddProduct={onAddProduct}
              onRemoveProduct={onRemoveProduct}
              defaultCurrency={defaultCurrency}
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
