import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { DetailedValueCalculation } from '@/components/common/ValueProductBasket/DetailedValueCalculation';
import { DetailedProduct } from '@/stores/simulator/appState.store';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type CartProductCardColors = 'base' | 'selectable';

const getCartProductCardColor = (color: CartProductCardColors): string => {
  if (color === 'selectable') {
    return 'bg-[#FFE8E8]';
  }

  return 'bg-[#E8EDFF]';
};

export type CartProductCardProps = {
  product: DetailedProduct;
  nomenclatures: string[];
  relatedWords: string[];
  declaredPrice?: string;
  vatAmount?: string;
  detailsButton?: boolean;
  productDetails?: string;
  deletable?: boolean;
  selected?: boolean;
  bgColor?: CartProductCardColors;
  setSelectedId: (id: any) => void;
  isChecked: boolean;
  onCheckedChange: (id: string, checked: boolean) => void;
};

export const CartProductCard = ({
  product,
  nomenclatures,
  relatedWords,
  declaredPrice,
  vatAmount,
  detailsButton,
  deletable = false,
  bgColor = 'base',
  isChecked,
  onCheckedChange,
}: CartProductCardProps) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const color = getCartProductCardColor(bgColor);
  return (
    <div className={cs({ 'grid items-center gap-5': true, 'grid-cols-[28px_1fr]': deletable })}>
      {deletable && (
        <div
          className="flex h-7 w-7 cursor-pointer place-content-center items-center rounded-full border border-[#F63939] bg-[#FCF4F4]"
          onClick={() => {
            const newChecked = !isChecked;
            onCheckedChange(product.customId, newChecked);
            setChecked(newChecked);
          }}
        >
          {checked && <div className="h-4 w-4 rounded-full bg-[#F63939]" />}
        </div>
      )}
      <div className={cs('relative flex flex-col rounded w-full p-2', color)}>
        <div className="flex flex-row gap-6">
          {nomenclatures &&
            nomenclatures.map((item, index) => (
              <Typography key={index} color="black" size="text-2xs">
                {item}
              </Typography>
            ))}
        </div>
        <div className="mb-2 flex flex-col line-clamp-3">
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.name}
          </Typography>
          <Typography color="black" transform="sentence-case" size="text-base">
            {relatedWords.map((item) => item).join(', ')}
          </Typography>
        </div>
        {(declaredPrice || vatAmount) && (
          <div className="grid grid-cols-2">
            <Typography color="black" transform="sentence-case" size="text-xs">
              {declaredPrice || ''}
            </Typography>
            <Typography
              color="black"
              transform="sentence-case"
              size="text-xs"
              textPosition="text-right"
            >
              {vatAmount || ''}
            </Typography>
          </div>
        )}
        {detailsButton && (
          <>
            <div
              className="flex w-fit cursor-pointer items-center gap-1"
              onClick={() => setOpen(!open)}
            >
              {open ? <Icon name="chevron-up" size="xs" /> : <Icon name="chevron-down" size="xs" />}
              <Typography color="middle-gray" size="text-2xs">
                {open ? 'Masquer détails' : 'Voir détails'}
              </Typography>
            </div>
            <div
              className={cs({
                'overflow-hidden transition-[max-height] duration-300 ease-in-out': true,
                'max-h-0': !open,
                'max-h-[1000px]': open,
              })}
            >
              <Typography color="black" size="text-2xs">
                <div>
                  <DetailedValueCalculation detailedProduct={product} />
                </div>
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
