import { useState } from 'react';

import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { FavoriteBadge } from '@/components/common/FavoriteBadge';
import { Product } from '@/model/product';
import { TailwindDefaultScreenSize } from '@/utils/enums';

export interface FavoriteProductsProps {
  allowedFavoriteProducts?: Product[];
  restrictedFavoriteProducts?: Product[];
  onFavoriteClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}

export const FavoriteProducts = ({
  allowedFavoriteProducts,
  restrictedFavoriteProducts,
  onFavoriteClick,
  onDeleteClick,
}: FavoriteProductsProps) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  const [isAvailableToEdit, setIsAvailableToEdit] = useState<boolean>(false);

  const onClick = (product: Product) => {
    onFavoriteClick(product);
  };

  const onDelete = (product: Product) => {
    onDeleteClick(product);
  };

  return (
    <>
      {(allowedFavoriteProducts || restrictedFavoriteProducts) && (
        <div className={classNames({ 'w-full flex gap-5': true, 'flex-col': isMobile })}>
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
                  onDeleteClick={onDeleteClick}
                  isAvailableToEdit={isAvailableToEdit}
                  key={favoriteProduct.id}
                  disabled
                />
              ))}
          </div>
          {allowedFavoriteProducts && allowedFavoriteProducts.length > 0 && (
            <div
              className={classNames({
                'underline w-fit self-center cursor-pointer': true,
                'pb-[10px]': isMobile,
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
    </>
  );
};
