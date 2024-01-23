import React, { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';

import { AddProductToFavorites } from '../AddProductToFavorites';
import { ModalDeleteFavoriteProduct } from '../ModalDeleteFavoriteProduct';
import { useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { OnAddProductOptions } from '@/components/business/FormSelectProduct';
import { CategoryList, Item } from '@/components/common/CategoryList';
import DownModal from '@/components/common/DownModal';
import { SvgNames } from '@/components/common/SvgIcon';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { checkIsFinalProduct, findProduct, findProductTree } from '@/utils/product.util';

interface ModalCategoryNomenclatureProductProps {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  defaultProduct?: Product;
}

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

export const ModalCategoryNomenclatureProduct: React.FC<ModalCategoryNomenclatureProductProps> = ({
  onClose,
  open,
  defaultProduct,
}) => {
  const { products, removeFavoriteProducts } = useStore(
    (state) => ({
      products: state.products.appState.nomenclatureProducts,
      removeFavoriteProducts: state.removeFavoriteProducts,
    }),
    shallow,
  );

  const removeFavoriteMutation = useRemoveFavoriteMutation({});

  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [openModalDeleteFavorite, setOpenModalDeleteFavorite] = useState(false);

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
      const selectedProduct = findProduct(products, currentId);
      console.log('🚀 ~ useEffect ~ selectedProduct:', selectedProduct);

      setProductTree(findProductTree(products, currentId));
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

  const onClickDelete = (product: Product) => {
    setCurrentProduct(product);
    setOpenModalDeleteFavorite(true);
  };

  const onRemove = (product?: Product) => {
    if (!product) {
      return;
    }
    removeFavoriteProducts(product.id);
    removeFavoriteMutation.mutate(product.id);
    setOpenModalDeleteFavorite(false);
  };

  const onParentCategoryClick = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCurrentId(productTree?.[1]?.id);
  };

  const onAddProduct = ({ product }: OnAddProductOptions) => {
    setCurrentProduct(product);
    if (onClose) {
      onClose();
    }
  };
  const isFinalProduct = checkIsFinalProduct(currentProduct ?? defaultProduct);

  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onCloseModal} withoutMargin>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {isFinalProduct ? (
              <AddProductToFavorites
                currentProduct={currentProduct ?? defaultProduct}
                onAddProduct={onAddProduct}
                onRemoveProduct={onClickDelete}
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
      <ModalDeleteFavoriteProduct
        open={openModalDeleteFavorite}
        onClose={() => setOpenModalDeleteFavorite(false)}
        onDeleteProduct={() => onRemove(currentProduct)}
      />
    </>
  );
};
