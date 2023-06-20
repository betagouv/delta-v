import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { v4 as uuidv4 } from 'uuid';
import shallow from 'zustand/shallow';

import { AddProductCartDeclaration } from '../AddProductCartDeclaration';
import { OnAddProductOptions } from '@/components/business/formSelectProduct';
import { CategoryList, Item } from '@/components/common/CategoryList';
import DownModal from '@/components/common/DownModal';
import { SvgNames } from '@/components/common/SvgIcon';
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
  const { findProduct, products, addProductCartDeclaration, findProductTree } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      products: state.products.appState.products,
      addProductCartDeclaration: state.addProductCartDeclaration,
      findProductTree: state.findProductTree,
    }),
    shallow,
  );
  const { trackEvent } = useMatomo();
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [productTree, setProductTree] = useState<Product[]>([]);

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

      setProductTree(findProductTree(currentId));
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
    } else {
      setProductTree([]);
      setDisplayedProducts(defaultDisplayedProducts);
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

  const onCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setProductTree([]);
  };

  const onParentCategoryClick = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCurrentId(productTree?.[1]?.id);
  };

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onCloseModal} withoutMargin>
        <div className="min-h-[50vh] flex h-auto flex-1 flex-col gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {currentProduct?.finalProduct ? (
              <AddProductCartDeclaration
                currentProduct={currentProduct}
                defaultCurrency={defaultCurrency}
                onAddProduct={onAddProduct}
              />
            ) : (
              <div className="px-4 py-5">
                <CategoryList
                  onSelectProduct={onSelectProduct}
                  productTree={productTree}
                  items={displayedProducts}
                  title="Filter par catégories"
                  displayType="card"
                  onClick={onParentCategoryClick}
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
