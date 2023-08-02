import React, { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface SummaryCustomProductProps {
  product: DetailedProduct;
  hideDetails?: boolean;
}

export const SummaryCustomProduct: React.FC<SummaryCustomProductProps> = ({
  product,
  hideDetails = false,
}: SummaryCustomProductProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 mb-4" onClick={() => setOpen(!open)}>
      <div className="flex flex-col">
        <Typography color="secondary" weight="bold" lineHeight="leading-tight">
          {product.name}
        </Typography>
        <Typography color="secondary" italic lineHeight="leading-tight">
          {product.customName}
        </Typography>
      </div>
      <div className="mt-1 flex flex-row">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 flex-row">
            <Typography color="secondary">{product.unitPrice} €</Typography>
            <div className="flex-1" />
            <Typography color={'primary'}>non renseignés</Typography>
          </div>
          <div
            className={classNames({
              'mt-5 w-full text-right overflow-hidden transition-[max-height] ease-in-out duration-300':
                true,
              'max-h-0': !open,
              'max-h-[1000px]': open,
              hidden: hideDetails,
            })}
          >
            <Typography size="text-sm">{`Calcul de la conversion ${product.originalCurrency} > EUR`}</Typography>
            <div className="mt-1 leading-none">
              <Typography color="light-gray" size="text-sm">
                Taux {product.rateCurrency} au {dayjs().format('DD/MM/YYYY')}
              </Typography>
            </div>
            <div className="flex flex-row leading-none">
              <p className="w-full text-sm">
                {product.originalPrice} / {product.rateCurrency} ={' '}
                <span className="text-primary-700">{product.unitPrice} €</span>
              </p>
              <div className="ml-1"></div>
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="mx-2 h-5 w-5 font-thin">
          {open ? <Icon name="chevron-up" /> : <Icon name="chevron-down" />}
        </div>
      </div>
    </div>
  );
};
