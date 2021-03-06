import React, { useState } from 'react';

import classnames from 'classnames';
import dayjs from 'dayjs';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { ContentValueProduct } from './ContentValueProduct';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface ProductBasketProps {
  containError?: boolean;
  detailedProduct?: DetailedProduct;
  dataBasket: {
    value: number;
    unit: string;
    name: string;
    customName?: string;
  };
  onUpdateProduct: () => void;
  onDeleteProduct: () => void;
}

export const ProductBasket: React.FC<ProductBasketProps> = ({
  containError = false,
  dataBasket: { value, unit, name, customName },
  detailedProduct,
  onUpdateProduct,
  onDeleteProduct,
}: ProductBasketProps) => {
  const [open, setOpen] = useState(false);
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
          <div className="flex-1 leading-none">
            {name ? (
              <Typography weight="bold" color="secondary" size="text-lg" lineHeight="leading-tight">
                {name}
              </Typography>
            ) : (
              <div className="flex flex-row items-center">
                <div className="mr-1 flex h-2 w-2 text-link">
                  <Icon name="point" size="xs" />
                </div>
                <Typography
                  weight="bold"
                  color="secondary"
                  size="text-lg"
                  lineHeight="leading-tight"
                >
                  Nouvelle marchandise
                </Typography>
              </div>
            )}
          </div>
          <Typography weight="extrabold" color="secondary" size="text-lg" lineHeight="leading-none">
            {value} {unit}
          </Typography>
        </div>
        <Typography weight="light" color="light-gray" size="text-base">
          {customName}
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
            <div className="flex">
              <div className="flex-1 text-left">
                <Typography weight="normal" color="secondary" size="text-base">
                  Conversion en ???
                </Typography>
              </div>
              <div className="mt-[2px] ml-3">
                <Icon size="xl" name="chevron-thin-up" />
              </div>
            </div>
            <div className="p-6 text-left">
              <Typography size="text-base">{`Calcul de la convertion ??? > ???`}</Typography>
              <div className="mt-2 leading-none">
                <Typography color="light-gray" size="text-base">
                  Taux 1 au {dayjs().format('DD/MM/YYYY')}
                </Typography>
              </div>
              <div className="flex flex-row leading-none">
                <Typography color="secondary" size="text-base">
                  {value} x 1 =
                </Typography>
                <div className="ml-1">
                  <Typography color="primary" size="text-base">
                    {value} {unit}
                  </Typography>
                </div>
              </div>
              {detailedProduct && <ContentValueProduct detailedCalculation={detailedProduct} />}
            </div>
            <div className="flex items-end">
              <div className="flex-1" />
              <div className="mb-[2px]">
                <Typography color="secondary" size="text-base">
                  TOTAL
                </Typography>
              </div>
              <div className="ml-5 content-end">
                <Typography color="primary" size="text-xl">
                  {detailedProduct ? `${detailedProduct.unitPrice}???` : 'non renseign??'}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-3">
          {!open ? (
            <>
              <div className="flex-1 text-left">
                <Typography weight="normal" color="secondary">
                  Conversion en ???
                </Typography>
              </div>
              {detailedProduct && (
                <Typography weight="normal" color="primary" size="text-lg">
                  {value} {unit}
                </Typography>
              )}
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
