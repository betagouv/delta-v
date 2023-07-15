import React from 'react';

import { Typography } from '@/components/common/Typography';
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
    <div key={product.customId} className="mt-1 mb-4 ">
      <div className="flex flex-row">
        <div>
          <Typography color="secondary" weight="bold">
            {product.name}
          </Typography>
          <Typography color="secondary" italic>
            {product.customName}
          </Typography>
        </div>
        <div className="flex-1" />
        <div className="flex min-w-[75px] flex-row-reverse">
          <Typography color="secondary">
            {product.unitPrice} {getUnit(product.amountProduct)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
