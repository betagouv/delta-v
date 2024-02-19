import { useState } from 'react';

import classNames from 'classnames';

import { useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { ModalDeleteFavoriteProduct } from '@/components/autonomous/ModalDeleteFavoriteProduct/ModalDeleteFavoriteProduct';
import { FavoriteBadge } from '@/components/common/FavoriteBadge';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { haveAgeRestriction } from '@/utils/product.util';

export interface FavoriteProductsProps {
  onFavoriteClick?: (product: Product) => void;
  onDeleteClick?: (product: Product) => void;
}

export const FavoriteProducts = ({ onFavoriteClick, onDeleteClick }: FavoriteProductsProps) => {
  const removeFavoriteMutation = useRemoveFavoriteMutation({});

  const [selectedFavoriteProduct, setSelectedFavoriteProduct] = useState<Product | undefined>(
    undefined,
  );
  const [isDeleteFavoriteModalOpen, setIsDeleteFavoriteModalOpen] = useState(false);
  const [isAvailableToEdit, setIsAvailableToEdit] = useState<boolean>(false);

  const { favoriteProducts, removeFavoriteProducts } = useStore((state) => ({
    favoriteProducts: state.products.appState.favoriteProducts,
    removeFavoriteProducts: state.removeFavoriteProducts,
  }));

  const allowedFavoriteProducts: Product[] = [];
  const restrictedFavoriteProducts: Product[] = [];

  favoriteProducts?.forEach((favoriteProduct) => {
    const product = favoriteProduct;
    if (product) {
      allowedFavoriteProducts.push(product);
    } else if (haveAgeRestriction(favoriteProduct)) {
      restrictedFavoriteProducts.push(favoriteProduct);
    }
  });

  const onClick = (product: Product) => {
    setSelectedFavoriteProduct(product);
    if (onFavoriteClick) {
      onFavoriteClick(product);
    }
  };

  const onDelete = (product: Product) => {
    if (onDeleteClick) {
      onDeleteClick(product);
    }
    setSelectedFavoriteProduct(product);
    setIsDeleteFavoriteModalOpen(true);
  };

  const onConfirmDeleteFavorite = () => {
    if (!selectedFavoriteProduct) {
      return;
    }
    removeFavoriteProducts(selectedFavoriteProduct.id);
    removeFavoriteMutation.mutate(selectedFavoriteProduct.id);
    setIsDeleteFavoriteModalOpen(false);
  };

  return (
    <>
      {(allowedFavoriteProducts || restrictedFavoriteProducts) && (
        <div className="w-full flex gap-5 md:flex-row flex-col">
          <div className="flex flex-wrap gap-[10px]">
            {allowedFavoriteProducts?.map((favoriteProduct) => (
              <FavoriteBadge
                product={favoriteProduct}
                onClick={onClick}
                onDeleteClick={onDelete}
                isAvailableToEdit={isAvailableToEdit}
                key={favoriteProduct.id}
              />
            ))}
            {restrictedFavoriteProducts &&
              restrictedFavoriteProducts.map((favoriteProduct) => (
                <FavoriteBadge
                  product={favoriteProduct}
                  onClick={() => {}}
                  onDeleteClick={onDelete}
                  isAvailableToEdit={isAvailableToEdit}
                  key={favoriteProduct.id}
                  disabled
                />
              ))}
          </div>
          {allowedFavoriteProducts && allowedFavoriteProducts.length > 0 && (
            <div
              className={classNames({
                'underline w-fit self-center cursor-pointer md:pb-0 pb-[10px] text-base md:text-xs font-bold':
                  true,
                'text-error': isAvailableToEdit,
                'text-primary-400': !isAvailableToEdit,
              })}
              onClick={() => setIsAvailableToEdit(!isAvailableToEdit)}
            >
              {isAvailableToEdit ? 'Annuler' : 'Modifier'}
            </div>
          )}
        </div>
      )}
      {selectedFavoriteProduct && (
        <ModalDeleteFavoriteProduct
          open={isDeleteFavoriteModalOpen}
          productName={selectedFavoriteProduct.name}
          onDeleteProduct={onConfirmDeleteFavorite}
          onClose={() => setIsDeleteFavoriteModalOpen(false)}
        />
      )}
    </>
  );
};
