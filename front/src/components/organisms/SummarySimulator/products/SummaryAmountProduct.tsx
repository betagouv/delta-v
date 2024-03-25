import React from 'react';

import { Typography } from '@/components/atoms/Typography';
import { getUnit } from '@/model/amount';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface SummaryAmountProductProps {
  product: DetailedProduct;
  hideDetails?: boolean;
}

export const SummaryAmountProduct: React.FC<SummaryAmountProductProps> = ({
  product,
}: SummaryAmountProductProps) => {
  return (
    <div key={product.customId} className="mb-4 ">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Typography color="secondary" weight="bold" lineHeight="leading-tight">
            {product.name}
          </Typography>
          <Typography color="secondary" italic lineHeight="leading-tight">
            {product.customName}
          </Typography>
        </div>
        <div className="flex-1" />
        <div className="flex min-w-[75px] flex-row-reverse content-end flex-wrap">
          <Typography color="secondary">
            {product.unitPrice} {getUnit(product.amountProduct)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
