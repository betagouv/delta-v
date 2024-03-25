import React, { useEffect, useState } from 'react';

import shallow from 'zustand/shallow';

import { AddProductToFavorites } from '../../molecules/AddProductToFavorites';
import {
  FormAddFavoriteData,
  ModalAddFavoriteProduct,
} from '../ModalAddFavoriteProduct/ModalAddFavoriteProduct';
import { ModalDeleteFavoriteProduct } from '../ModalDeleteFavoriteProduct/ModalDeleteFavoriteProduct';
import { useCreateFavoriteMutation, useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { CategoryList, Item } from '@/components/molecules/CategoryList';
import { SvgNames } from '@/components/molecules/SvgIcon';
import { OnAddProductOptions } from '@/components/organisms/FormSelectProduct';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { ModalType, getModalComponent } from '@/utils/modal';
import { checkIsFinalProduct, findProduct, findProductTree } from '@/utils/product.util';

interface ModalCategoryNomenclatureProductProps {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  defaultProduct?: Product;
  modalType?: ModalType;
  modalSuperposition?: boolean;
}

interface DisplayedProduct {
  id: string;
  svgNames: SvgNames;
  title: string;
}

export const ModalCategoryNomenclatureProduct: React.FC<ModalCategoryNomenclatureProductProps> = ({
  onClose,
  onOpen,
  open,
  defaultProduct,
  modalType = ModalType.DOWN,
  modalSuperposition = false,
}) => {
  const { products, addFavoriteProducts, removeFavoriteProducts } = useStore(
    (state) => ({
      products: state.products.appState.nomenclatureProducts,
      addFavoriteProducts: state.addFavoriteProducts,
      removeFavoriteProducts: state.removeFavoriteProducts,
    }),
    shallow,
  );

  const removeFavoriteMutation = useRemoveFavoriteMutation({});

  const createFavoriteMutation = useCreateFavoriteMutation({
    onSuccess: () => {
      if (onClose) {
        onClose();
      }
    },
  });

  const [isParentModalVisible, setIsParentModalVisible] = useState<boolean>(true);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [openRemoveFavoriteModal, setOpenRemoveFavoriteModal] = useState(false);
  const [openAddFavoriteModal, setOpenAddFavoriteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const [productTree, setProductTree] = useState<Product[]>([]);
  const [value, setValue] = useState('');

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

  useEffect(() => {
    if (modalSuperposition) {
      return;
    }
    if (openRemoveFavoriteModal || openAddFavoriteModal) {
      setIsParentModalVisible(false);
    }
  }, [openRemoveFavoriteModal, openAddFavoriteModal]);

  const onSelectProduct = (idSelected: string) => {
    setCurrentId(idSelected);
  };

  const onMoveToParentProduct = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    setCurrentId(productTree?.[1]?.id);
  };

  const onMainModalClose = () => {
    if (onClose) {
      onClose();
    }
    onMoveToParentProduct();
  };

  const onRemoveFavoriteClick = (product: Product) => {
    setCurrentProduct(product);
    setOpenRemoveFavoriteModal(true);
  };

  const onRemoveFavoriteModalClose = () => {
    setValue('');
    setOpenRemoveFavoriteModal(false);
    if (onOpen) {
      setTimeout(() => {
        onOpen();
      }, 300);
    }
    onMainModalClose();
  };

  const onConfirmRemoveFavorite = (product?: Product) => {
    if (!product) {
      return;
    }
    removeFavoriteProducts(product.id);
    removeFavoriteMutation.mutate(product.id);
    onRemoveFavoriteModalClose();
    onMainModalClose();
  };

  const onAddFavoriteClick = ({ product }: OnAddProductOptions) => {
    setCurrentProduct(product);
    setOpenAddFavoriteModal(true);
  };

  const onAddFavoriteModalClose = () => {
    setValue('');
    setOpenAddFavoriteModal(false);
    onMainModalClose();
  };

  const onConfirmAddFavorite = (data: FormAddFavoriteData) => {
    if (!currentProduct) {
      return;
    }
    addFavoriteProducts({ ...currentProduct, name: data.name });
    createFavoriteMutation.mutate({
      productId: currentProduct?.id,
      name: data.name,
    });
    setValue(data.name);
    onMainModalClose();
  };

  const isFinalProduct = checkIsFinalProduct(currentProduct ?? defaultProduct);

  const ModalComponent = getModalComponent(modalType);

  return (
    <>
      <ModalComponent
        bgColor="bg-white"
        open={open && isParentModalVisible}
        onClose={onMainModalClose}
        withoutMargin
        noPadding
      >
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-1 flex-col gap-6">
            {isFinalProduct ? (
              <AddProductToFavorites
                currentProduct={currentProduct ?? defaultProduct}
                onAddProduct={onAddFavoriteClick}
                onRemoveProduct={onRemoveFavoriteClick}
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
                  onClick={onMoveToParentProduct}
                  bigSize
                />
              </div>
            )}
          </div>
        </div>
      </ModalComponent>
      <ModalDeleteFavoriteProduct
        open={openRemoveFavoriteModal}
        onClose={onRemoveFavoriteModalClose}
        onDeleteProduct={() => onConfirmRemoveFavorite(currentProduct)}
        productName={currentProduct?.name}
      />
      <ModalAddFavoriteProduct
        open={openAddFavoriteModal}
        onClose={onAddFavoriteModalClose}
        onSubmit={onConfirmAddFavorite}
        value={value}
      />
    </>
  );
};
