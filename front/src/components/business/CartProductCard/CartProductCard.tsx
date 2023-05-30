import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

<<<<<<< HEAD
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { DetailedValueCalculation } from '@/components/common/ValueProductBasket/DetailedValueCalculation';
import { DetailedProduct } from '@/stores/simulator/appState.store';
=======
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
>>>>>>> 5d6a1ba (cart product card component done)

require('dayjs/locale/fr');

dayjs.locale('fr');

<<<<<<< HEAD
const getCartProductCardColor = (deletable: boolean): string => {
  if (deletable === true) {
=======
export type CartProductCardColors = 'base' | 'selectable';

const getCartProductCardColor = (color: CartProductCardColors): string => {
  if (color === 'selectable') {
>>>>>>> 5d6a1ba (cart product card component done)
    return 'bg-[#FFE8E8]';
  }

  return 'bg-[#E8EDFF]';
};

export type CartProductCardProps = {
<<<<<<< HEAD
  product: DetailedProduct;
  nomenclatures: string[];
  detailsButton?: boolean;
  deletable?: boolean;
  onDelete: (id: string) => void;
=======
  product: Product;
  declaredPrice?: string;
  vatAmount?: string;
  detailsButton?: boolean;
  productDetails?: string;
  checkbox?: boolean;
  bgColor?: CartProductCardColors;
>>>>>>> 5d6a1ba (cart product card component done)
};

export const CartProductCard = ({
  product,
<<<<<<< HEAD
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
          <Typography
            color={deletable ? 'red' : 'primary'}
            onClick={() => onDelete(product.customId)}
          >
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
=======
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
>>>>>>> 5d6a1ba (cart product card component done)
    </div>
  );
};
