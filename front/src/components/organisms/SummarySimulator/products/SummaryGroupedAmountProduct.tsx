import React from 'react';

import { Typography } from '@/components/atoms/Typography';
import { getAmountCategoryName, getUnit } from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface SummaryGroupedAmountProductProps {
  groupedAmount: GroupedAmountProduct;
  openModalProductType: (productType?: AmountProduct) => void;
}

export const SummaryGroupedAmountProduct: React.FC<SummaryGroupedAmountProductProps> = ({
  groupedAmount,
}: SummaryGroupedAmountProductProps) => {
  return (
    <div key={groupedAmount.group}>
      <Typography color="light-gray" size="text-2xs">
        {getAmountCategoryName(groupedAmount.group)}
      </Typography>
      {groupedAmount.products.map((product) => (
        <div key={product.customId} className="mt-1 mb-4 ">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <Typography color={'secondary'} weight="bold">
                {product.name}
              </Typography>
              <Typography color={'secondary'} italic>
                {product.customName}
              </Typography>
            </div>
            <div className="flex-1" />
            <div className="flex min-w-[75px] flex-row-reverse">
              <Typography color={'secondary'}>
                {product.amount} {getUnit(product.amountProduct)}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
