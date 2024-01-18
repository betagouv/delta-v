import React, { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';

import { AddProductCartDeclaration } from '../AddProductCartDeclaration';
import { OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { CategoryList, Item } from '@/components/common/CategoryList';
import DownModal from '@/components/common/DownModal';
import { SvgNames } from '@/components/common/SvgIcon';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { checkIsFinalProduct } from '@/utils/product.util';

interface ModalCategoryProductProps {
  open: boolean;
  onAddProduct: (options: OnAddProductOptions) => void;
  onClose?: () => void;
  defaultCurrency?: string;
  defaultProduct?: Product;
}

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

export const ModalCategoryProduct: React.FC<ModalCategoryProductProps> = ({
  onClose,
  onAddProduct,
  open,
  defaultCurrency,
  defaultProduct,
}) => {
  const { findProduct, products, findProductTree } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      products: state.products.appState.products,
      findProductTree: state.findProductTree,
    }),
    shallow,
  );
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

  const isFinalProduct = checkIsFinalProduct(currentProduct ?? defaultProduct);

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onCloseModal} withoutMargin>
        <div className="min-h-[50vh] flex flex-1 flex-col gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {isFinalProduct ? (
              <AddProductCartDeclaration
                currentProduct={currentProduct ?? defaultProduct}
                defaultCurrency={defaultCurrency}
                onAddProduct={onAddProduct}
                onSelectProduct={onSelectProduct}
              />
            ) : (
              <div className="px-4 py-5">
                <CategoryList
                  onSelectProduct={onSelectProduct}
                  productTree={productTree}
                  items={displayedProducts}
                  title="Filtrer par catégories"
                  displayType="card"
                  onClick={onParentCategoryClick}
                  bigSize
                />
              </div>
            )}
          </div>
        </div>
      </DownModal>
    </>
  );
};
