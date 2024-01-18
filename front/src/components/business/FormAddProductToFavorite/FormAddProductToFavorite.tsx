import React from 'react';

import classNames from 'classnames';
import { FieldErrors } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import shallow from 'zustand/shallow';

import { Role } from '../FormSelectProduct/utils';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { TailwindDefaultScreenSize } from '@/utils/enums';
import { findProduct } from '@/utils/product.util';

interface FormAddProductToFavoriteProps {
  register: any;
  onRemoveProduct?: (product: Product) => void;
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
  onRemoveProduct,
}: FormAddProductToFavoriteProps) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  const { nomenclatureProducts, favoriteProducts } = useStore(
    (state) => ({
      currencies: state.currencies.appState.currencies,
      nomenclatureProducts: state.products.appState.nomenclatureProducts,
      favoriteProducts: state.products.appState.favoriteProducts,
    }),
    shallow,
  );

  const product = productId ? findProduct(nomenclatureProducts, productId) : undefined;

  const isInFavorite = favoriteProducts.find((p) => p.id === productId);

  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      <div className="flex flex-col gap-[10px]">
        {isAddAble && (
          <div className="flex flex-col gap-[10px] flex-1 justify-between">
            <div className="w-full bg-primary-100 text-primary-600 h-[76px] flex justify-center items-center">
              <Typography size={isMobile ? 'text-2xs' : 'text-xs'} weight="bold">
                Taux de DD : {product?.id}
              </Typography>
            </div>
            <div
              className={classNames({
                'flex w-full': true,
                'flex-col gap-[30px]': isMobile,
                'justify-between': !isMobile,
              })}
            >
              <div className="flex flex-col gap-1 justify-start">
                <Typography size={isMobile ? 'text-2xs' : 'text-xs'} color="black">
                  Prix d'achat : 12,00€
                </Typography>
                <Typography size={isMobile ? 'text-2xs' : 'text-xs'} color="black">
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
                        'underline text-error text-xs ': true,
                        'self-start': !isMobile,
                      })}
                      type="button"
                      onClick={
                        onRemoveProduct && product ? () => onRemoveProduct(product) : undefined
                      }
                    >
                      Retirer des favoris
                    </button>
                  ) : (
                    <button
                      className={classNames({
                        'underline text-primary-600 text-xs': true,
                        'self-start': !isMobile,
                      })}
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
  );
};
