import React from 'react';

import dayjs from 'dayjs';

import { Typography } from '../../atoms/Typography';
import { Color } from '../../atoms/Typography/style/typography.style';
import { ContentValueProduct } from './ContentValueProduct';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface ValueProductBasketProps {
  detailedProduct: DetailedProduct;
  customProduct?: boolean;
  textColor?: Color;
  rateTextColor?: Color;
}

export const DetailedValueCalculation: React.FC<ValueProductBasketProps> = ({
  detailedProduct,
  customProduct = false,
  textColor = 'black',
  rateTextColor = 'primary',
}: ValueProductBasketProps) => {
  return (
    <div className="p-6 text-center">
      <Typography
        weight="bold"
        size="text-sm"
        color={textColor}
      >{`Calcul de la conversion ${detailedProduct?.originalCurrency} > EUR`}</Typography>
      <div>
        <Typography color={rateTextColor} size="text-sm">
          Taux {detailedProduct?.rateCurrency ?? '1'} au {dayjs().format('DD/MM/YYYY')}
        </Typography>
      </div>
      <div className="inline-flex text-center leading-none">
        <Typography color={textColor} size="text-sm">
          {detailedProduct?.originalPrice} / {detailedProduct?.rateCurrency ?? '1'} =
        </Typography>
        <div className="ml-1">
          <Typography color={textColor} size="text-sm">
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
