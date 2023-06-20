import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { FormSelectProduct, OnAddProductOptions } from '@/components/business/formSelectProduct';
import { CategoryList, Item } from '@/components/common/CategoryList';
import DownModal from '@/components/common/DownModal';
import { SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';

interface ModalCategoryProductProps {
  open: boolean;
  onClose?: () => void;
  defaultCurrency?: string;
}

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

export const ModalCategoryProduct: React.FC<ModalCategoryProductProps> = ({
  onClose,
  open,
  defaultCurrency,
}) => {
  const { findProduct, products, addProductCartDeclaration } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      products: state.products.appState.products,
      addProductCartDeclaration: state.addProductCartDeclaration,
    }),
    shallow,
  );
  const { trackEvent } = useMatomo();
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  const defaultDisplayedProducts: DisplayedProduct[] = products?.map((product): Item => {
    return {
      id: product.id,
      svgNames: product.icon ?? 'categoryOther',
      title: product.name,
    };
  });
  const [displayedProducts, setDisplayedProducts] =
    useState<DisplayedProduct[]>(defaultDisplayedProducts);

  useEffect(() => {
    if (currentId) {
      const selectedProduct = findProduct(currentId);
      setCurrentProduct(selectedProduct);
      setDisplayedProducts(
        selectedProduct?.subProducts.map((product) => {
          return {
            id: product.id,
            svgNames: product.icon ?? 'categoryOther',
            title: product.name,
          };
        }) ?? [],
      );
    }
  }, [currentId]);

  useEffect(() => {
    if (open) {
      setCurrentId(undefined);
      setCurrentProduct(undefined);
      setDisplayedProducts(defaultDisplayedProducts);
    }
  }, [open]);

  const onSelectProduct = (idSelected: string) => {
    setCurrentId(idSelected);
  };

  const onAddProduct = ({ product, value, currency }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclaration(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
        <div className="min-h-[50vh] flex h-auto flex-1 flex-col gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {currentProduct?.finalProduct ? (
              <div className="flex flex-col h-auto">
                <div className="px-4 py-5">
                  <div className="flex flex-row gap-4">
                    <Typography color="secondary" colorGradient="600" size="text-2xs">
                      BreadCrumbs
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-2 pt-5 pb-2">
                    <Typography color="black" size="text-xl" weight="bold">
                      {currentProduct.name}
                    </Typography>
                    <div className="flex flex-row gap-2">
                      {currentProduct.nomenclatures &&
                        currentProduct.nomenclatures.map((nomenclature) => (
                          <Typography color="primary" size="text-2xs">
                            {nomenclature}
                          </Typography>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 bg-secondary-100 px-4 py-5">
                  <FormSelectProduct
                    currentProduct={currentProduct}
                    onAddProduct={onAddProduct}
                    templateRole="agent"
                    defaultCurrency={defaultCurrency}
                  />
                </div>
              </div>
            ) : (
              <div className="px-4 py-5">
                <CategoryList
                  onSelectProduct={onSelectProduct}
                  items={displayedProducts}
                  title="Filter par catégories"
                  displayType="card"
                  fullWidth
                />
              </div>
            )}
          </div>
        </div>
      </DownModal>
    </>
  );
};
