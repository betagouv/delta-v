import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { DetailedValueCalculation } from '@/components/common/ValueProductBasket/DetailedValueCalculation';
import { DetailedProduct } from '@/stores/simulator/appState.store';

require('dayjs/locale/fr');

dayjs.locale('fr');

const getCartProductCardColor = (deletable: boolean): string => {
  if (deletable === true) {
    return 'bg-[#FFE8E8]';
  }

  return 'bg-[#E8EDFF]';
};

export type CartProductCardProps = {
  product: DetailedProduct;
  nomenclatures: string[];
  detailsButton?: boolean;
  deletable?: boolean;
  onDelete: (id: string) => void;
};

export const CartProductCard = ({
  product,
  nomenclatures,
  detailsButton,
  deletable = false,
  onDelete,
}: CartProductCardProps) => {
  const [open, setOpen] = useState(false);
  const color = getCartProductCardColor(deletable);
  return (
    <div className={cs('relative flex flex-col rounded-md w-full ', color)}>
      {deletable && (
        <div className="absolute right-2 top-2 cursor-pointer">
          <Typography color={deletable ? 'red' : 'primary'} onClick={() => onDelete(product.id)}>
            <Icon name="cross-thin" size="sm" />
          </Typography>
        </div>
      )}
      <div className="flex flex-col gap-2 p-5">
        <div className="flex flex-col line-clamp-6">
          <Typography
            color={deletable ? 'red' : 'primary'}
            transform="sentence-case"
            size="text-sm"
            weight="bold"
          >
            {product.customName}
          </Typography>
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.name}
          </Typography>
          {nomenclatures && (
            <span className="flex flex-row gap-6">
              {nomenclatures.map((item, index) => (
                <Typography key={index} color="black" size="text-2xs">
                  {item}
                </Typography>
              ))}
            </span>
          )}
        </div>
        {(product.unitPrice || product.unitTaxes) && (
          <div className="flex flex-col divide-y divide-black">
            <div className="grid grid-cols-2 pb-2">
              <Typography color="black" transform="sentence-case" size="text-xs" weight="bold">
                Prix d'achat
              </Typography>
              <Typography
                color="black"
                transform="sentence-case"
                size="text-xs"
                textPosition="text-right"
                weight="bold"
              >
                {`${product.unitPrice} €`}
              </Typography>
            </div>
            <div className="grid grid-cols-2 pt-2">
              <Typography
                color={deletable ? 'red' : 'primary'}
                transform="sentence-case"
                size="text-sm"
                weight="bold"
              >
                Taxes dues
              </Typography>
              <Typography
                color={deletable ? 'red' : 'primary'}
                transform="sentence-case"
                size="text-sm"
                textPosition="text-right"
                weight="bold"
              >
                {`${product.unitTaxes} €`}
              </Typography>
            </div>
          </div>
        )}
        {detailsButton && (
          <span className="flex justify-center">
            <Button
              variant="outlined"
              color={deletable ? 'red' : 'primary'}
              size="2xs"
              onClick={() => setOpen(!open)}
            >
              <span>Voir calcul </span>
              {open ? <Icon name="chevron-up" size="xs" /> : <Icon name="chevron-down" size="xs" />}
            </Button>
          </span>
        )}
      </div>

      <div className="flex justify-center rounded-b-md bg-white/60">
        <div
          className={cs({
            'overflow-hidden transition-[max-height] duration-300 ease-in-out': true,
            'max-h-0': !open,
            'max-h-[1000px]': open,
          })}
        >
          <div>
            <DetailedValueCalculation
              detailedProduct={product}
              rateTextColor={deletable ? 'red' : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
