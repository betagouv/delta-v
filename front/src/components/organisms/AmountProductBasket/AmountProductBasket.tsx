import React, { useEffect, useState } from 'react';

import classnames from 'classnames';

import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { getUnit } from '@/model/amount';
import { AmountProductInterface } from '@/stores/simulator/appState.store';

interface AmountProductBasketProps {
  product: AmountProductInterface;
  containError?: boolean;
  onDeleteProduct: () => void;
  onUpdateProduct: () => void;
  tobaccoTax?: number;
  isTobaccoProduct?: boolean;
  alcoholTax?: number;
  isAlcoholProduct?: boolean;
}

export const AmountProductBasket: React.FC<AmountProductBasketProps> = ({
  product: { name, amount, customName, amountProduct },
  containError = false,
  onDeleteProduct,
  onUpdateProduct,
  tobaccoTax = 0,
  isTobaccoProduct = false,
  alcoholTax = 0,
  isAlcoholProduct = false,
}) => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<string>('');

  useEffect(() => {
    setUnit(getUnit(amountProduct) ?? '');
  }, [amountProduct]);

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
      {isTobaccoProduct && tobaccoTax > 0 && (
        <div className="grid grid-cols-2 pt-2">
          <Typography transform="sentence-case" size="text-sm" weight="bold" desktopSize="text-sm">
            Droits et taxes dus
          </Typography>
          <Typography
            transform="sentence-case"
            size="text-sm"
            desktopSize="text-sm"
            textPosition="text-right"
            weight="bold"
          >
            {`${tobaccoTax.toFixed(2)} €`}
          </Typography>
        </div>
      )}
      {isAlcoholProduct && alcoholTax > 0 && (
        <div className="grid grid-cols-2 pt-2">
          <Typography transform="sentence-case" size="text-sm" weight="bold" desktopSize="text-sm">
            Droits et taxes dus
          </Typography>
          <Typography
            transform="sentence-case"
            size="text-sm"
            desktopSize="text-sm"
            textPosition="text-right"
            weight="bold"
          >
            {`${alcoholTax.toFixed(2)} €`}
          </Typography>
        </div>
      )}
    </div>
  );
};
