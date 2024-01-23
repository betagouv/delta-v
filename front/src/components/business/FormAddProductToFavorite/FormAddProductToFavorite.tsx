import React from 'react';

import { FieldErrors } from 'react-hook-form';
import shallow from 'zustand/shallow';

import { Role } from '../FormSelectProduct/utils';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
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
      <div className="flex flex-col gap-2.5 ml-2">
        {isAddAble && (
          <div className="flex flex-col gap-1 ml-2 flex-1 justify-between">
            <div className="w-full bg-primary-100 text-primary-600 h-[76px] flex justify-center items-center">
              <Typography size="text-2xs" weight="bold">
                Taux de DD : {product?.id}
              </Typography>
            </div>
            <div className="flex flex-col gap-1 ml-2 justify-start">
              <Typography size="text-2xs" color="black">
                Prix d'achat : 12,00€
              </Typography>
              <Typography size="text-2xs" color="black">
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
                    className="underline text-error"
                    type="button"
                    onClick={
                      onRemoveProduct && product ? () => onRemoveProduct(product) : undefined
                    }
                  >
                    Retirer des favoris
                  </button>
                ) : (
                  <button className="underline text-primary-600" type="submit">
                    Ajouter aux favoris
                  </button>
                )}
              </>
            )}
          </div>
        )}
        <div className="flex flex-col gap-1  mt-[77px]">
          <Typography size="text-3xs" color="middle-gray" textPosition="text-center">
            Vous souhaitez nous faire parvenir une remarque, une optimisation,
            <br /> une demande particulière ? <a>Cliquez ici</a>
          </Typography>
        </div>
      </div>
    </div>
  );
};
