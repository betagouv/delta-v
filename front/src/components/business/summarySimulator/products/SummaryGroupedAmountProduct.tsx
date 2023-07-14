import React from 'react';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { getAmountCategoryName, getMessageOverMaximumAmount, getUnit } from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface SummaryGroupedAmountProductProps {
  groupedAmount: GroupedAmountProduct;
  openModalProductType: (productType?: AmountProduct) => void;
}

export const SummaryGroupedAmountProduct: React.FC<SummaryGroupedAmountProductProps> = ({
  groupedAmount,
  openModalProductType,
}: SummaryGroupedAmountProductProps) => {
  return (
    <div key={groupedAmount.group}>
      <Typography color="light-gray" size="text-2xs">
        {getAmountCategoryName(groupedAmount.group)}
      </Typography>
      {groupedAmount.products.map((product) => (
        <div key={product.customId} className="mt-1 mb-4 ">
          <div className="flex flex-row">
            <div>
              <Typography color={groupedAmount.isOverMaximum ? 'error' : 'secondary'} weight="bold">
                {product.name}
              </Typography>
              <Typography color={groupedAmount.isOverMaximum ? 'error' : 'secondary'} italic>
                {product.customName}
              </Typography>
            </div>
            <div className="flex-1" />
            <div className="flex min-w-[75px] flex-row-reverse">
              <Typography color={groupedAmount.isOverMaximum ? 'error' : 'secondary'}>
                {product.amount} {getUnit(product.amountProduct)}
              </Typography>
            </div>
          </div>
          {groupedAmount.isOverMaximum && (
            <div className="mt-2 flex flex-row gap-1 text-red-700">
              <div className="h-4 w-4">
                <Icon name="error" />
              </div>
              <p className="flex-1 text-2xs">
                Vous dépassez la limite légale d'unités{' '}
                {getMessageOverMaximumAmount(groupedAmount.group)}. Pour connaître les quantités
                maximales autorisées{' '}
                <span
                  className="text-link"
                  onClick={() => {
                    openModalProductType(groupedAmount.products[0]?.amountProduct);
                  }}
                >
                  cliquez ici
                </span>
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
