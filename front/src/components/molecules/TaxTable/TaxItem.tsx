import { useState } from 'react';

import classNames from 'classnames';

import { TaxItemCalculation } from './TaxItemCalculation';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { getUnit } from '@/model/amount';
import { DetailedProduct, ProductStatus } from '@/stores/simulator/appState.store';

export interface ITaxItemProps {
  detailedProduct: DetailedProduct;
  withCalculation?: boolean;
  noDetails?: boolean;
}

export const TaxItem: React.FC<ITaxItemProps> = ({
  detailedProduct,
  withCalculation = true,
  noDetails = false,
}: ITaxItemProps) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const isAmountProduct = detailedProduct.status === ProductStatus.AMOUNT_PRODUCT;

  return (
    <div
      key={detailedProduct.customId}
      className={classNames({
        'border border-secondary-100 bg-white rounded-xl flex flex-col justify-start gap-2': true,
        'pb-5': isAmountProduct || noDetails,
      })}
    >
      <div className="flex flex-col pt-5 px-5">
        <Typography color="black" size="text-xs" weight="bold">
          {detailedProduct.customName}
        </Typography>
        {detailedProduct.name !== detailedProduct.customName && (
          <Typography color="black" size="text-xs">
            {detailedProduct.name}
          </Typography>
        )}
      </div>
      <div className="px-5 flex flex-row justify-between w-3/6">
        <Typography color="black" size="text-xs">
          {detailedProduct.originalCurrency ? "Prix d'achat" : 'Quantité'}
        </Typography>
        <Typography color="black" size="text-xs">
          {detailedProduct.unitPrice}{' '}
          {detailedProduct.originalCurrency ? '€' : getUnit(detailedProduct.amountProduct)}
        </Typography>
      </div>
      <div className="px-5 flex flex-row justify-between w-full">
        <Typography size="text-xs" weight="bold">
          Droits et taxes dues
        </Typography>
        <Typography size="text-xs" weight="bold">
          {withCalculation || isAmountProduct ? `${detailedProduct.unitTaxes} €` : 'Non renseignés'}
        </Typography>
      </div>
      {!isAmountProduct && !noDetails && (
        <div
          className="flex flex-col w-full justify-center py-2 px-5 bg-[#EEEEFE] rounded-b-xl cursor-pointer"
          onClick={() => setOpenDetail(!openDetail)}
        >
          <Typography size="text-xs" textPosition="text-center">
            Voir calcul{' '}
            <Icon name={openDetail ? 'chevron-thin-up' : 'chevron-thin-down'} size="sm" />
          </Typography>
          <div
            className={classNames({
              '-mx-5 border-b text-5xl border-gray-300 border-dashed overflow-hidden transition-[margin] duration-300 ease-in-out':
                true,
              'my-0 invisible': !openDetail,
              'my-2 visible': openDetail,
            })}
          />
          <div
            className={classNames({
              'overflow-hidden transition-[max-height] duration-300 ease-in-out': true,
              'max-h-0': !openDetail,
              'max-h-[1000px]': openDetail,
            })}
          >
            <TaxItemCalculation
              detailedProduct={detailedProduct}
              withCalculation={withCalculation}
            />
          </div>
        </div>
      )}
    </div>
  );
};
