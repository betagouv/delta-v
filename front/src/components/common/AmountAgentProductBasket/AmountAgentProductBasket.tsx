import React, { useEffect, useState } from 'react';

import cs from 'classnames';
import { twMerge } from 'tailwind-merge';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { getUnit } from '@/model/amount';
import { AmountProductInterface } from '@/stores/simulator/appState.store';

interface AmountProductBasketProps {
  product: AmountProductInterface;
  nomenclatures?: string[];
  containError?: boolean;
  deletable?: boolean;
  onDelete: (id: string) => void;
  onButtonClick?: () => void;
}

export const AmountAgentProductBasket: React.FC<AmountProductBasketProps> = ({
  product,
  nomenclatures,
  containError = false,
  deletable = false,
  onDelete,
  onButtonClick,
}: AmountProductBasketProps) => {
  const [unit, setUnit] = useState<string>('');
  useEffect(() => {
    setUnit(getUnit(product.amountProduct) ?? '');
  }, [product.amountProduct]);
  return (
    <div
      className={twMerge(
        cs({
          'relative flex flex-col rounded-md w-full bg-[#E3E3FD]': true,
          'bg-[#FFE8E5] border border-[#CE0500]': containError,
          'bg-[#FFE8E5]': deletable,
        }),
      )}
    >
      {deletable && (
        <div className="absolute right-2 top-2 cursor-pointer">
          <Typography
            color={deletable ? 'red' : 'primary'}
            onClick={() => onDelete(product.customId)}
          >
            <Icon name="cross-thin" size="sm" />
          </Typography>
        </div>
      )}
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col line-clamp-6">
          {nomenclatures && (
            <span className="flex flex-row gap-6">
              {nomenclatures.map((item, index) => (
                <Typography key={index} color="light-gray" size="text-2xs">
                  {item}
                </Typography>
              ))}
            </span>
          )}
          <Typography
            color={containError || deletable ? 'red' : 'primary'}
            transform="sentence-case"
            size="text-sm"
            weight="bold"
          >
            {product.customName}
          </Typography>
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.name}
          </Typography>
        </div>
        {product.amount && (
          <div className="flex flex-col divide-y divide-black">
            <div className="grid grid-cols-2 pb-2">
              <Typography color="black" transform="sentence-case" size="text-xs" weight="bold">
                {unit}
              </Typography>
              <Typography
                color="black"
                transform="sentence-case"
                size="text-xs"
                textPosition="text-right"
                weight="bold"
              >
                {product.amount}
              </Typography>
            </div>
            <div className="grid grid-cols-2 pt-2">
              <Typography
                color={containError || deletable ? 'red' : 'primary'}
                transform="sentence-case"
                size="text-sm"
                weight="bold"
              >
                {unit}
              </Typography>
              <Typography
                color={containError || deletable ? 'red' : 'primary'}
                transform="sentence-case"
                size="text-sm"
                textPosition="text-right"
                weight="bold"
              >
                {product.amount}
              </Typography>
            </div>
          </div>
        )}
        <span className="flex justify-center">
          <Button
            color={containError || deletable ? 'red' : 'primary'}
            size="2xs"
            onClick={onButtonClick}
          >
            <span>Modifier</span>
          </Button>
        </span>
      </div>
    </div>
  );
};
