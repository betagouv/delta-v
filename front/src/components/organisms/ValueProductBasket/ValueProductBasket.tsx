import React, { useEffect, useState } from 'react';

import classnames from 'classnames';
import getSymbolFromCurrency from 'currency-symbol-map';

import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { DetailedValueCalculation } from './DetailedValueCalculation';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface ValueProductBasketProps {
  containError?: boolean;
  detailedProduct?: DetailedProduct;
  customProduct?: boolean;
  onUpdateProduct: () => void;
  onDeleteProduct: () => void;
}

export const ValueProductBasket: React.FC<ValueProductBasketProps> = ({
  containError = false,
  detailedProduct,
  customProduct = false,
  onUpdateProduct,
  onDeleteProduct,
}: ValueProductBasketProps) => {
  const [open, setOpen] = useState(false);
  const [originalCurrencySymbol, setOriginalCurrencySymbol] = useState('€');

  useEffect(() => {
    if (detailedProduct?.originalCurrency) {
      setOriginalCurrencySymbol(getSymbolFromCurrency(detailedProduct?.originalCurrency) ?? '€');
    }
  }, [detailedProduct]);
  return (
    <div
      className={classnames({
        'w-full divide-y-2 divide-dashed rounded-xl border': true,
        'border-red-700': containError,
      })}
      onClick={() => setOpen(!open)}
    >
      <div className="p-3 leading-tight">
        <div className="flex">
          <div className="mr-2 flex-1 leading-none">
            <div className="flex flex-row items-center">
              {customProduct ? (
                <div className="mr-1 flex h-2 w-2 text-link">
                  <Icon name="point" size="xs" />
                </div>
              ) : null}
              <Typography weight="bold" color="secondary" size="text-lg" lineHeight="leading-tight">
                {detailedProduct?.name ?? 'Nouvelle marchandise'}
              </Typography>
            </div>
          </div>
          <Typography weight="extrabold" color="secondary" size="text-lg" lineHeight="leading-none">
            {detailedProduct?.originalPrice} {originalCurrencySymbol}
          </Typography>
        </div>
        <Typography weight="light" color="light-gray" size="text-base">
          {detailedProduct?.customName}
        </Typography>
      </div>
      <div className={classnames({ 'divide-y-2 divide-dashed': open })}>
        <div
          className={classnames({
            'overflow-hidden transition-[max-height] duration-300 ease-in-out': true,
            'max-h-0': !open,
            'max-h-[1000px]': open,
          })}
        >
          <div className="w-full px-4 py-5">
            <div className="relative">
              <div className="absolute right-0">
                <Icon size="xl" name="chevron-thin-up" />
              </div>
            </div>
            {detailedProduct && (
              <DetailedValueCalculation
                detailedProduct={detailedProduct}
                customProduct={customProduct}
              />
            )}
            <div className="flex gap-5 justify-center">
              <div className="flex flex-col gap-2">
                <Typography color="secondary" size="text-base" lineHeight="leading-6">
                  CONVERSION EN €
                </Typography>
                <Typography color="secondary" size="text-base" lineHeight="leading-6">
                  TOTAL TAXES
                </Typography>
              </div>
              <div className="flex flex-col gap-2">
                <Typography
                  color="primary"
                  size="text-lg"
                  textPosition="text-right"
                  lineHeight="leading-6"
                >
                  {detailedProduct ? `${detailedProduct.unitPrice}€` : 'non renseigné'}
                </Typography>
                <Typography
                  color="primary"
                  size="text-lg"
                  textPosition="text-right"
                  lineHeight="leading-6"
                >
                  {detailedProduct && !customProduct
                    ? `${detailedProduct.unitTaxes}€`
                    : 'non renseigné'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-3">
          {!open ? (
            <>
              {detailedProduct && !customProduct && (
                <>
                  <div className="text-left">
                    <Typography weight="normal" color="secondary">
                      Conversion en €
                    </Typography>
                  </div>
                </>
              )}
              <div className="flex-1" />
              <Typography weight="normal" color="primary" size="text-lg">
                {detailedProduct && !customProduct
                  ? `${detailedProduct?.unitPrice} €`
                  : 'non renseigné'}
              </Typography>
              <div className="mt-[2px] ml-3">
                <Icon size="xl" name="chevron-thin-down" />
              </div>
            </>
          ) : (
            <div className="flex w-full gap-5">
              <Button fullWidth variant="outlined" onClick={onUpdateProduct}>
                Modifier
              </Button>
              <Button fullWidth icon="bin" iconPosition="right" onClick={onDeleteProduct}>
                Supprimer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
