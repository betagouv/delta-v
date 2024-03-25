import React, { useEffect, useState } from 'react';

import cs from 'classnames';
import { twMerge } from 'tailwind-merge';

import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { getUnit } from '@/model/amount';
import { AmountProductInterface } from '@/stores/simulator/appState.store';

interface AmountAgentProductBasketProps {
  product: AmountProductInterface;
  nomenclatures?: string[];
  containError?: boolean;
  editable?: boolean;
  onDelete: (id: string) => void;
  onButtonClick?: () => void;
  onProductClick?: (id: string) => void;
}

export const AmountAgentProductBasket: React.FC<AmountAgentProductBasketProps> = ({
  product,
  nomenclatures,
  containError = false,
  editable = false,
  onDelete,
  onButtonClick,
  onProductClick,
}: AmountAgentProductBasketProps) => {
  const [unit, setUnit] = useState<string>('');
  useEffect(() => {
    setUnit(getUnit(product.amountProduct) ?? '');
  }, [product.amountProduct]);
  return (
    <div
      className={twMerge(
        cs({
          'relative flex flex-col rounded-md w-full bg-[#E3E3FD]': true,
          'bg-[#FFE8E5]': containError,
          'border border-[#CE0500]': containError && !editable,
        }),
      )}
    >
      <div className={cs({ 'absolute right-2 top-2 cursor-pointer': true, hidden: !editable })}>
        <Typography onClick={() => onDelete(product.customId)} color="red">
          <Icon name="cross-thin" size="sm" />
        </Typography>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-2.5">
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
            color={containError ? 'red' : 'primary'}
            transform="sentence-case"
            size="text-sm"
            weight="bold"
          >
            {product.customName !== '' ? product.customName : product.name}
          </Typography>
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.customName !== '' ? product.name : ''}
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
                color={containError ? 'red' : 'primary'}
                transform="sentence-case"
                size="text-sm"
                weight="bold"
              >
                {unit}
              </Typography>
              <Typography
                color={containError ? 'red' : 'primary'}
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

        {editable && (
          <span className="flex justify-center">
            <Button
              size="2xs"
              color={containError ? 'red' : 'tertiary'}
              onClick={() => {
                if (onButtonClick) {
                  onButtonClick();
                }
                if (onProductClick) {
                  onProductClick(product.customId);
                }
              }}
              className={{
                'md:w-[82px]': true,
                'md:h-[22px]': true,
                'h-[30px]': true,
                'w-[100px]': true,
                'md:text-2xs': true,
                'md:whitespace-nowrap': true,
                'text-xs': true,
              }}
            >
              <span>Modifier</span>
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};
