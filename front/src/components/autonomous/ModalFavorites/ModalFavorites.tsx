import React, { useState } from 'react';

import classNames from 'classnames';

import { ModalDeleteFavoriteProduct } from '../ModalDeleteFavoriteProduct';
import { useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import DownModal from '@/components/common/DownModal';
import { FavoriteBadge } from '@/components/common/FavoriteBadge';
import { TitleAgent } from '@/components/common/TitleAgent';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';

interface ModalFavoritesProps {
  onClose: () => void;
  open: boolean;
  onClickFavorite: (product: Product) => void;
}

export const ModalFavorites: React.FC<ModalFavoritesProps> = ({
  onClose,
  open,
  onClickFavorite,
}: ModalFavoritesProps) => {
  const [openModalDeleteFavorite, setOpenModalDeleteFavorite] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const { removeFavoriteProducts, favoriteProducts } = useStore((state) => ({
    removeFavoriteProducts: state.removeFavoriteProducts,
    favoriteProducts: state.products.appState.favoriteProducts,
    setFavoriteProducts: state.setFavoriteProducts,
    nomenclatureProducts: state.products.appState.nomenclatureProducts,
  }));

  const [isAvailableToEdit, setIsAvailableToEdit] = useState<boolean>(false);

  const removeFavoriteMutation = useRemoveFavoriteMutation({});

  const onClick = (product: Product) => {
    onClickFavorite(product);
  };

  const onClickDelete = (product: Product) => {
    setCurrentProduct(product);
    setOpenModalDeleteFavorite(true);
  };

  const onCloseModal = () => {
    setIsAvailableToEdit(false);
    onClose();
  };

  const onRemove = (product?: Product) => {
    if (!product) {
      return;
    }
    removeFavoriteProducts(product.id);
    removeFavoriteMutation.mutate(product.id);
    setOpenModalDeleteFavorite(false);
  };

  return (
    <DownModal bgColor="bg-white" open={open} onClose={onCloseModal}>
      <div className="flex flex-col gap-6 justify-start">
        <TitleAgent title="Mes favoris" textPosition="text-left" />
        <div className="flex flex-row gap-[10px] w-full flex-wrap">
          {favoriteProducts && favoriteProducts.length ? (
            <>
              {favoriteProducts.map((favoriteProduct) => (
                <>
                  <FavoriteBadge
                    product={favoriteProduct}
                    onClick={onClick}
                    onDeleteClick={onClickDelete}
                    isAvailableToEdit={isAvailableToEdit}
                    key={favoriteProduct.id}
                  />
                </>
              ))}

              <div className="w-full text-center mt-5 mb-[14px]">
                <button
                  className={classNames(
                    'underline',
                    isAvailableToEdit ? 'text-error' : 'text-primary-400',
                  )}
                  onClick={() => setIsAvailableToEdit(!isAvailableToEdit)}
                >
                  {isAvailableToEdit ? 'Annuler' : 'Modifier'}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full mb-5">
              <Typography size="text-lg" color="black">
                Vous n'avez pas encore de favoris
              </Typography>
            </div>
          )}
        </div>
      </div>

      <ModalDeleteFavoriteProduct
        open={openModalDeleteFavorite}
        onClose={() => setOpenModalDeleteFavorite(false)}
        onDeleteProduct={() => onRemove(currentProduct)}
      />
    </DownModal>
  );
};
