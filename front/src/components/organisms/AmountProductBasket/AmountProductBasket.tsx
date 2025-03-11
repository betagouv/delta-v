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
  taxDetails?: {
    excise?: number;
    css?: number;
    customsDuty?: number;
    vat?: number;
    total: number;
    priceInEuros?: number;
  };
}

export const AmountProductBasket: React.FC<AmountProductBasketProps> = ({
  product: { name, amount, customName, amountProduct, priceInEuros },
  containError = false,
  onDeleteProduct,
  onUpdateProduct,
  taxDetails,
}) => {
  console.log('🚀 ~ priceInEuros:', priceInEuros);
  console.log('🚀 ~ taxDetails:', taxDetails);
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
          <div className="flex flex-col items-end">
            <Typography
              weight="extrabold"
              color="secondary"
              size="text-lg"
              lineHeight="leading-none"
            >
              {amount} {unit}
            </Typography>
            <Typography weight="normal" color="light-gray" size="text-base">
              Prix unitaire : {((priceInEuros || 0) / amount).toFixed(2)} €
            </Typography>
          </div>
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
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <Typography color="secondary" size="text-base">
                  Quantité
                </Typography>
                <Typography color="primary" size="text-xl">
                  {amount} {unit}
                </Typography>
              </div>
              <div className="flex items-end justify-between">
                <Typography color="secondary" size="text-base">
                  Prix total
                </Typography>
                <Typography color="primary" size="text-xl">
                  {priceInEuros?.toFixed(2)} €
                </Typography>
              </div>
              <>
                <div className="flex items-end justify-between">
                  <Typography color="secondary" size="text-base">
                    Accises
                  </Typography>
                  <Typography color="primary" size="text-xl">
                    {((Number(taxDetails?.excise) || 0) + (Number(taxDetails?.css) || 0)).toFixed(
                      2,
                    )}{' '}
                    €
                  </Typography>
                </div>
                <div className="flex items-end justify-between">
                  <Typography color="secondary" size="text-base">
                    Droits de douane
                  </Typography>
                  <Typography color="primary" size="text-xl">
                    {(taxDetails?.customsDuty || 0).toFixed(2)} €
                  </Typography>
                </div>
                <div className="flex items-end justify-between">
                  <Typography color="secondary" size="text-base">
                    TVA
                  </Typography>
                  <Typography color="primary" size="text-xl">
                    {(taxDetails?.vat || 0).toFixed(2)} €
                  </Typography>
                </div>
                <div className="flex items-end justify-between border-t border-gray-200 pt-2">
                  <Typography color="secondary" size="text-base" weight="bold">
                    Total taxes
                  </Typography>
                  <Typography color="primary" size="text-xl" weight="bold">
                    {(taxDetails?.total || 0).toFixed(2)} €
                  </Typography>
                </div>
              </>
            </div>
          </div>
        </div>
        <div className="flex p-3">
          {!open ? (
            <>
              <div className="flex-1 text-left"></div>
              <Typography weight="normal" color="primary" size="text-lg">
                {(priceInEuros || 0).toFixed(2)} €
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
