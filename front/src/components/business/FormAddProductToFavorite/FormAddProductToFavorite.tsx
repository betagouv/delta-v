import React, { useState } from 'react';

import classNames from 'classnames';
import { FieldErrors } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Role } from '../FormSelectProduct/utils';
import { useCreateFavoriteMutation, useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { ModalAddFavoriteProductMobile } from '@/components/autonomous/ModalAddFavoriteProduct/ModalAddFavoriteProductMobile';
import { ModalDeleteFavoriteProduct } from '@/components/autonomous/ModalDeleteFavoriteProduct/ModalDeleteFavoriteProduct';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { findProduct } from '@/utils/product.util';

interface FormAddProductToFavoriteProps {
  register: any;
  onRemoveFavorite?: (product: Product) => void;
  onAddFavorite?: (product: Product) => void;
  control: any;
  productId?: string;
  submitted?: boolean;
  errors: FieldErrors;
  defaultCurrency?: string;
  templateRole?: Role;
  isAddAble?: boolean;
}

export const FormAddProductToFavorite: React.FC<FormAddProductToFavoriteProps> = ({
  submitted = false,
  productId,
  isAddAble = false,
  onRemoveFavorite,
  onAddFavorite,
}: FormAddProductToFavoriteProps) => {
  const { nomenclatureProducts, favoriteProducts, removeFavoriteProducts, addFavoriteProducts } =
    useStore(
      (state) => ({
        nomenclatureProducts: state.products.appState.nomenclatureProducts,
        favoriteProducts: state.products.appState.favoriteProducts,
        removeFavoriteProducts: state.removeFavoriteProducts,
        addFavoriteProducts: state.addFavoriteProducts,
      }),
      shallow,
    );

  const removeFavoriteMutation = useRemoveFavoriteMutation({});
  const createFavoriteMutation = useCreateFavoriteMutation({});

  const [isRemoveFavoriteModalOpen, setIsRemoveFavoriteModalOpen] = useState<boolean>(false);
  const [isAddFavoriteModalOpen, setIsAddFavoriteModalOpen] = useState<boolean>(false);

  const product = productId ? findProduct(nomenclatureProducts, productId) : undefined;

  const isInFavorite = favoriteProducts.find((p) => p.id === productId);

  const handleRemoveFavoriteClick = (favoriteProductToRemove?: Product) => {
    if (!favoriteProductToRemove) {
      return;
    }
    if (onRemoveFavorite) {
      onRemoveFavorite(favoriteProductToRemove);
    }
    setIsRemoveFavoriteModalOpen(true);
  };

  const handleConfirmRemoveFavorite = () => {
    if (!product) {
      return;
    }
    removeFavoriteProducts(product.id);
    removeFavoriteMutation.mutate(product.id);
    setIsRemoveFavoriteModalOpen(false);
  };

  const handleAddFavoriteClick = (favoriteProductToAdd?: Product) => {
    if (!favoriteProductToAdd) {
      return;
    }
    if (onAddFavorite) {
      onAddFavorite(favoriteProductToAdd);
    }
    setIsAddFavoriteModalOpen(true);
  };

  const handleConfirmAddFavorite = () => {
    if (!product) {
      return;
    }
    addFavoriteProducts(product);
    createFavoriteMutation.mutate({
      productId: product.id,
      name: product.name,
    });
    setIsRemoveFavoriteModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-6 w-full">
        <div className="flex flex-col gap-[10px]">
          {isAddAble && (
            <div className="flex flex-col gap-[10px] flex-1 justify-between">
              <div className="w-full bg-primary-100 text-primary-600 h-[76px] flex justify-center items-center">
                <Typography size="text-xs" desktopSize="text-sm" weight="bold">
                  Taux de DD : {product?.id}
                </Typography>
              </div>
              <div className="md: flex-col flex md:flex-row w-full gap-[30px] justify-between">
                <div className="flex flex-col gap-1 justify-start">
                  <Typography size="text-xs" desktopSize="text-sm" color="black">
                    Prix d'achat : 12,00€
                  </Typography>
                  <Typography size="text-xs" desktopSize="text-sm" color="black">
                    Prix de vente : 12,00€
                  </Typography>
                </div>
                {submitted ? (
                  <div className="flex justify-center">
                    <Typography color="link" size="text-xl" weight="bold">
                      Merci !
                    </Typography>
                  </div>
                ) : (
                  <>
                    {isInFavorite ? (
                      <button
                        className={classNames({
                          'underline text-error md:text-xs text-sm md:self-start font-bold': true,
                        })}
                        type="button"
                        onClick={() => handleRemoveFavoriteClick(product)}
                      >
                        Retirer des favoris
                      </button>
                    ) : (
                      <button
                        className={classNames({
                          'underline text-primary-600 md:text-xs text-sm md:self-start font-bold':
                            true,
                        })}
                        onClick={() => handleAddFavoriteClick(product)}
                      >
                        Ajouter aux favoris
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {product && (
        <>
          <ModalDeleteFavoriteProduct
            open={isRemoveFavoriteModalOpen}
            onDeleteProduct={handleConfirmRemoveFavorite}
            onClose={() => setIsRemoveFavoriteModalOpen(false)}
            productName={product.name}
          />
          <ModalAddFavoriteProductMobile
            open={isAddFavoriteModalOpen}
            onClose={() => setIsAddFavoriteModalOpen(false)}
            onSubmit={handleConfirmAddFavorite}
          />
        </>
      )}
    </>
  );
};
