import React, { useEffect, useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { v4 as uuidv4 } from 'uuid';

import { AddProductToFavorites } from '../../AddProductToFavorites';
import { OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { CategoryList, Item } from '@/components/common/CategoryList';
import CenterModal from '@/components/common/CenterModal';
import { SvgNames } from '@/components/common/SvgIcon';
import { Product } from '@/model/product';
import { ShoppingProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';

interface CategoryProductDesktopProps {
  defaultProduct?: Product;
  listVisible?: boolean;
  hideListOnModalClose?: boolean;
  onModalClose?: () => void;
}

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

export const CategoryProductDesktop: React.FC<CategoryProductDesktopProps> = ({
  defaultProduct,
  listVisible = true,
  hideListOnModalClose = true,
  onModalClose,
}) => {
  const { findProduct, findProductTree, addProductCartDeclarationAgent, products } = useStore(
    (state) => ({
      findProduct: state.findProduct,
      findProductTree: state.findProductTree,
      addProductCartDeclarationAgent: state.addProductCartDeclarationAgent,
      products: state.products.appState.products,
    }),
  );

  const { trackEvent } = useMatomo();
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [isListVisible, setIsListVisible] = useState<boolean>(listVisible);
  const [productTree, setProductTree] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(defaultProduct);
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

  const onSelectProduct = (idSelected: string) => {
    setCurrentId(idSelected);
  };

  const onAddProduct = ({ product, value, currency, name }: OnAddProductOptions) => {
    const shoppingProduct: ShoppingProduct = {
      id: uuidv4(),
      productId: product.id,
      name,
      value: parseFloat(value),
      amount: 1,
      currency: currency ?? 'EUR',
    };

    addProductCartDeclarationAgent(shoppingProduct);
    trackEvent({ category: 'user-action', action: 'add-product', name: product.name });
  };

  const onParentCategoryClick = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCurrentId(productTree?.[1]?.id);
  };

  const handleModalClose = () => {
    if (onModalClose) {
      onModalClose();
    }
    if (hideListOnModalClose) {
      setIsListVisible(false);
    }
    setCurrentId(productTree?.[1]?.id);
  };

  const isFinalProduct = currentProduct?.finalProduct ?? false;
  return (
    <>
      {isListVisible && (
        <CategoryList
          onSelectProduct={onSelectProduct}
          productTree={productTree}
          items={displayedProducts}
          displayType="card"
          onClick={onParentCategoryClick}
          bigSize
        />
      )}
      <CenterModal open={isFinalProduct} noMargin onClose={handleModalClose}>
        <AddProductToFavorites
          currentProduct={currentProduct}
          onAddProduct={onAddProduct}
          onSelectProduct={onSelectProduct}
        />
      </CenterModal>
    </>
  );
};
