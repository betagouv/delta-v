import React, { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';

import { ModalCategoryNomenclatureProduct } from '../ModalCategoryNomenclatureProduct';
import { CategoryList, Item } from '@/components/common/CategoryList';
import { SvgNames } from '@/components/common/SvgIcon';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { ModalType } from '@/utils/modal';
import { checkIsFinalProduct, findProduct, findProductTree } from '@/utils/product.util';

interface CategoryProductDesktopProps {
  defaultProduct?: Product;
  onModalClose?: () => void;
}

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

const getSubProductCardsToDisplay = (productTree: Product[]) => {
  const currentProduct = productTree[0];
  const parentProduct = productTree[1];
  const isFinalProduct = checkIsFinalProduct(currentProduct);
  const selectedProduct = isFinalProduct ? parentProduct : currentProduct;
  if (!selectedProduct) {
    return [];
  }
  return selectedProduct.subProducts.map((product) => {
    return {
      id: product.id,
      svgNames: product.icon ?? 'categoryOther',
      title: product.name,
    };
  });
};

export const CategoryProductDesktop: React.FC<CategoryProductDesktopProps> = ({
  defaultProduct,
  onModalClose,
}) => {
  const { products } = useStore(
    (state) => ({
      products: state.products.appState.nomenclatureProducts,
    }),
    shallow,
  );

  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(defaultProduct);
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
      const selectedProduct = findProduct(products, currentId);
      const newProductTree = findProductTree(products, currentId);
      setProductTree(newProductTree);
      setCurrentProduct(selectedProduct);
      setDisplayedProducts(getSubProductCardsToDisplay(newProductTree));
    } else {
      setProductTree([]);
      setCurrentProduct(undefined);
      setDisplayedProducts(defaultDisplayedProducts);
    }
  }, [currentId]);

  const onSelectProduct = (idSelected: string) => {
    setCurrentId(idSelected);
  };

  const onParentCategoryClick = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCurrentId(productTree?.[1]?.id ?? undefined);
  };

  const handleModalClose = () => {
    if (onModalClose) {
      onModalClose();
    }
    onParentCategoryClick();
  };

  const isFinalProduct = checkIsFinalProduct(currentProduct);

  return (
    <>
      <div className="px-4 py-5">
        <CategoryList
          onSelectProduct={onSelectProduct}
          productTree={productTree}
          items={displayedProducts}
          displayType="card"
          onClick={onParentCategoryClick}
          bigSize
        />
      </div>
      {currentProduct && (
        <ModalCategoryNomenclatureProduct
          open={isFinalProduct}
          defaultProduct={currentProduct}
          modalType={ModalType.CENTER}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};
