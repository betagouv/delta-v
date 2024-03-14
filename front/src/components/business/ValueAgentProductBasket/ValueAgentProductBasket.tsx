import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { TaxItemCalculation } from '../TaxTable/TaxItemCalculation';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { DetailedProduct } from '@/stores/simulator/appState.store';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type ValueAgentProductBasketProps = {
  product: DetailedProduct;
  nomenclatures: string[];
  detailsButton?: boolean;
  editable?: boolean;
  onDelete: (id: string) => void;
  onEditClick?: (id: string) => void;
  withCalculation?: boolean;
};

export const ValueAgentProductBasket = ({
  product,
  nomenclatures,
  detailsButton,
  editable = false,
  onDelete,
  onEditClick,
  withCalculation = true,
}: ValueAgentProductBasketProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={cs('relative flex flex-col rounded-md w-full bg-[#E3E3FD]')}>
      <div className={cs({ 'absolute right-2 top-2 cursor-pointer': true, hidden: !editable })}>
        <Typography onClick={() => onDelete(product.customId)}>
          <Icon name="cross-thin" size="sm" />
        </Typography>
      </div>

      <div className="flex flex-col gap-2 p-5">
        <div className="flex flex-col">
          {nomenclatures && (
            <span className="flex flex-row gap-6">
              {nomenclatures.map((item, index) => (
                <Typography key={index} color="light-gray" size="text-2xs">
                  {item}
                </Typography>
              ))}
            </span>
          )}
          <Typography transform="sentence-case" size="text-sm" weight="bold" desktopSize="text-sm">
            {product.customName}
          </Typography>
          <Typography color="black" transform="sentence-case" size="text-xs" desktopSize="text-xs">
            {product.name}
          </Typography>
        </div>
        {(product.unitPrice || product.unitTaxes) && (
          <div className="flex flex-col divide-y divide-black">
            <div className="grid grid-cols-2 pb-2">
              <Typography
                color="black"
                transform="sentence-case"
                size="text-xs"
                weight="bold"
                desktopSize="text-xs"
              >
                Prix d'achat
              </Typography>
              <Typography
                color="black"
                transform="sentence-case"
                size="text-xs"
                desktopSize="text-xs"
                textPosition="text-right"
                weight="bold"
              >
                {`${product.unitPrice} €`}
              </Typography>
            </div>
            <div className="grid grid-cols-2 pt-2">
              <Typography
                transform="sentence-case"
                size="text-sm"
                weight="bold"
                desktopSize="text-sm"
              >
                Droits et taxes dues
              </Typography>
              <Typography
                transform="sentence-case"
                size="text-sm"
                desktopSize="text-sm"
                textPosition="text-right"
                weight="bold"
              >
                {withCalculation ? `${product.unitTaxes} €` : 'non renseignés'}
              </Typography>
            </div>
          </div>
        )}
        {detailsButton && !editable && (
          <div className="flex justify-center">
            <Button
              color="tertiary"
              variant="outlined"
              size="2xs"
              onClick={() => setOpen(!open)}
              icon={open ? 'chevron-thin-up' : 'chevron-thin-down'}
              fullWidth
              iconClassname="w-2.5"
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
              Voir calcul
            </Button>
          </div>
        )}
        {editable && (
          <div className="flex justify-center">
            <Button
              size="2xs"
              color="tertiary"
              onClick={() => onEditClick && onEditClick(product.customId)}
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
              Modifier
            </Button>
          </div>
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
            <TaxItemCalculation detailedProduct={product} withCalculation={withCalculation} />
          </div>
        </div>
      </div>
    </div>
  );
};
