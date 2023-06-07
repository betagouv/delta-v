import React from 'react';

import dayjs from 'dayjs';

import { Typography } from '../Typography';
import { ContentValueProduct } from './ContentValueProduct';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface ValueProductBasketProps {
  detailedProduct: DetailedProduct;
  customProduct?: boolean;
}

export const DetailedValueCalculation: React.FC<ValueProductBasketProps> = ({
  detailedProduct,
  customProduct = false,
}: ValueProductBasketProps) => {
  return (
    <div className="p-6 text-left">
      <Typography size="text-base">{`Calcul de la conversion ${detailedProduct?.originalCurrency} > EUR`}</Typography>
      <div className="mt-2 leading-none">
        <Typography color="light-gray" size="text-base">
          Taux {detailedProduct?.rateCurrency ?? '1'} au {dayjs().format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className="flex flex-row leading-none">
        <Typography color="secondary" size="text-base">
          {detailedProduct?.originalPrice} / {detailedProduct?.rateCurrency ?? '1'} =
        </Typography>
        <div className="ml-1">
          <Typography color="primary" size="text-base">
            {detailedProduct?.unitPrice} €
          </Typography>
        </div>
      </div>
      {detailedProduct && !customProduct && (
        <ContentValueProduct detailedCalculation={detailedProduct} />
      )}
    </div>
  );
};
