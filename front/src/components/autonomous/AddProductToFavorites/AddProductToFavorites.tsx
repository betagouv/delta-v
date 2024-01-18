import React from 'react';

import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import {
  DefaultValuesUpdateProduct,
  FormSelectProduct,
  OnAddProductOptions,
} from '@/components/business/FormSelectProduct';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { TailwindDefaultScreenSize } from '@/utils/enums';
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
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  const { nomenclatureProducts } = useStore((state) => ({
    nomenclatureProducts: state.products.appState.nomenclatureProducts,
  }));

  const productTree = currentProduct
    ? findProductTree(nomenclatureProducts, currentProduct.id)
    : [];

  return (
    <>
      <div
        className={classNames({ 'flex flex-col h-full flex-1': true, 'min-h-[586px]': !isMobile })}
      >
        <div className={classNames({ 'px-4 py-5': isMobile, 'px-10 pt-10 pb-5': !isMobile })}>
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
              size={isMobile ? 'text-xl' : 'text-[26px]'}
              weight="bold"
              lineHeight="leading-none"
            >
              {currentProduct?.name}
            </Typography>
            {currentProduct?.nomenclatures && (
              <div className="flex flex-row gap-2">
                {currentProduct.nomenclatures.map((nomenclature) => (
                  <Typography color="primary" size={isMobile ? 'text-2xs' : 'text-xs'}>
                    {nomenclature}
                  </Typography>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className={classNames({
            'flex flex-1 flex-col gap-6 bg-secondary-bg': true,
            'px-4 py-5': isMobile,
            'p-10': !isMobile,
          })}
        >
          {currentProduct && (
            <FormSelectProduct
              currentProduct={currentProduct}
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
