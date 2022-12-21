import React, { useState } from 'react';

import classnames from 'classnames';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { DetailedProduct } from '@/stores/simulator/appState.store';

interface AmountProductBasketProps {
  containError?: boolean;
  detailedProduct?: DetailedProduct;
  dataBasket: {
    amount: number;
    unit: string;
    name: string;
    customName?: string;
  };
  onUpdateProduct: () => void;
  onDeleteProduct: () => void;
}

export const AmountProductBasket: React.FC<AmountProductBasketProps> = ({
  containError = false,
  dataBasket: { amount, unit, name, customName },
  onUpdateProduct,
  onDeleteProduct,
}: AmountProductBasketProps) => {
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
          <div className="mr-2 flex-1 leading-none">
            <Typography weight="bold" color="secondary" size="text-lg" lineHeight="leading-tight">
              {name}
            </Typography>
          </div>
          <Typography weight="extrabold" color="secondary" size="text-lg" lineHeight="leading-none">
            {amount} {unit}
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
              <div className="flex-1 text-left"></div>
              <div className="mt-[2px] ml-3">
                <Icon size="xl" name="chevron-thin-up" />
              </div>
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
                  {amount} {unit}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-3">
          {!open ? (
            <>
              <div className="flex-1 text-left"></div>
              <Typography weight="normal" color="primary" size="text-lg">
                {amount} {unit}
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
