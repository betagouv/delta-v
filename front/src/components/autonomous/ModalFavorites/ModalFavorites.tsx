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
import { haveAgeRestriction } from '@/utils/product.util';

interface ModalFavoritesProps {
  onClose: () => void;
  open: boolean;
  onClickFavorite: (product: Product) => void;
  isInNomenclature?: boolean;
}

export const ModalFavorites: React.FC<ModalFavoritesProps> = ({
  onClose,
  open,
  onClickFavorite,
  isInNomenclature = false,
}: ModalFavoritesProps) => {
  const [openModalDeleteFavorite, setOpenModalDeleteFavorite] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);
  const { removeFavoriteProducts, favoriteProducts, findProduct } = useStore((state) => ({
    removeFavoriteProducts: state.removeFavoriteProducts,
    findProduct: state.findProduct,
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

  const flattenFavoriteProducts: Product[] = [];
  const ageRestrictionFavoriteProducts: Product[] = [];

  favoriteProducts?.forEach((favoriteProduct) => {
    const product = isInNomenclature ? favoriteProduct : findProduct(favoriteProduct.id);
    if (product) {
      flattenFavoriteProducts.push(product);
    } else if (haveAgeRestriction(favoriteProduct)) {
      ageRestrictionFavoriteProducts.push(favoriteProduct);
    }
  });

  return (
    <DownModal bgColor="bg-white" open={open} onClose={onCloseModal}>
      <div className="flex flex-col gap-6 justify-start">
        <TitleAgent title="Mes favoris" textPosition="text-left" />
        <div className="flex flex-row gap-[10px] w-full flex-wrap">
          {flattenFavoriteProducts && flattenFavoriteProducts.length ? (
            <>
              {flattenFavoriteProducts.map((favoriteProduct) => (
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
              {ageRestrictionFavoriteProducts &&
                ageRestrictionFavoriteProducts.map((favoriteProduct) => (
                  <>
                    <FavoriteBadge
                      product={favoriteProduct}
                      onClick={() => console.log('click')}
                      onDeleteClick={onClickDelete}
                      isAvailableToEdit={isAvailableToEdit}
                      key={favoriteProduct.id}
                      disabled
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
              {ageRestrictionFavoriteProducts && ageRestrictionFavoriteProducts.length > 0 ? (
                <Typography size="text-sm" color="black" textPosition="text-center">
                  Vous n'avez que des favoris avec restriction d'âge et ils ne sont pas disponibles
                  pour ce déclarant
                </Typography>
              ) : (
                <Typography size="text-sm" color="black" textPosition="text-center">
                  Vous n'avez pas encore de favoris
                </Typography>
              )}
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
