import React, { useState } from 'react';

import { ModalDeleteFavoriteProduct } from '../ModalDeleteFavoriteProduct/ModalDeleteFavoriteProduct';
import { useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { FavoriteProducts } from '@/components/business/FavoriteProducts';
import DownModal from '@/components/common/DownModal';
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

  const removeFavoriteMutation = useRemoveFavoriteMutation({});

  const onClick = (product: Product) => {
    onClickFavorite(product);
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

  const flattenFavoriteProducts: Product[] = [];
  const ageRestrictionFavoriteProducts: Product[] = [];

  favoriteProducts?.forEach((favoriteProduct) => {
    const product = isInNomenclature ? favoriteProduct : findProduct(favoriteProduct.id);
    if (product) {
      flattenFavoriteProducts.push({ ...product, name: favoriteProduct.name });
    } else if (haveAgeRestriction(favoriteProduct)) {
      ageRestrictionFavoriteProducts.push(favoriteProduct);
    }
  });

  return (
    <DownModal bgColor="bg-white" open={open} onClose={onClose}>
      <div className="flex flex-col gap-6 justify-start">
        <TitleAgent title="Mes favoris" textPosition="text-left" />
        <div className="flex flex-row gap-[10px] w-full flex-wrap">
          {flattenFavoriteProducts && flattenFavoriteProducts.length ? (
            <FavoriteProducts onDeleteClick={onClickDelete} onFavoriteClick={onClick} />
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
