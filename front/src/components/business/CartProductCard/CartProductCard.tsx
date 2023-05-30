import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';

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
  product: Product;
  declaredPrice?: string;
  vatAmount?: string;
  detailsButton?: boolean;
  productDetails?: string;
  checkbox?: boolean;
  bgColor?: CartProductCardColors;
};

export const CartProductCard = ({
  product,
  declaredPrice,
  vatAmount,
  detailsButton,
  productDetails,
  checkbox = false,
  bgColor = 'base',
}: CartProductCardProps) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const color = getCartProductCardColor(bgColor);
  return (
    <div className={cs({ 'grid items-center gap-5': true, 'grid-cols-[28px_1fr]': checkbox })}>
      {checkbox && (
        <div
          className="flex h-7 w-7 cursor-pointer place-content-center items-center rounded-full border border-[#F63939] bg-[#FCF4F4]"
          onClick={() => setChecked(!checked)}
        >
          {checked && <div className="h-4 w-4 rounded-full bg-[#F63939]" />}
        </div>
      )}
      <div className={cs('relative flex flex-col rounded w-full p-2', color)}>
        <div className="flex flex-row gap-6">
          {product.nomenclatures &&
            product.nomenclatures.map((item, index) => (
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
            {product.relatedWords.map((item) => item).join(', ')}
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
        {detailsButton && productDetails && (
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
                'mt-2': true,
                hidden: !open,
              })}
            >
              <Typography color="black" size="text-2xs">
                {productDetails}
              </Typography>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
