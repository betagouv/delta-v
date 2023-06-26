import { useState } from 'react';

import { Alpha2Code } from 'i18n-iso-countries';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { AmountAgentProductBasket } from './AmountAgentProductBasket';
import { ModalMaximumAmount } from '@/components/autonomous/ModalMaximumAmount';
import {
  getAmountCategoryName,
  getAmountProductType,
  getMessageOverMaximumAmount,
} from '@/model/amount';
import { AmountProduct } from '@/model/product';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface AmountAgentProductBasketGroupProps {
  amountProductGroup: GroupedAmountProduct;
  country?: Alpha2Code;
  border?: boolean;
  onModifyClick: (id: string) => void;
  onDelete: (id: string) => void;
  deletable: boolean;
}

export const AmountAgentProductBasketGroup: React.FC<AmountAgentProductBasketGroupProps> = ({
  amountProductGroup,
  onModifyClick,
  country,
  border = false,
  onDelete,
  deletable,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [productType, setProductType] = useState<
    'alcohol' | 'tobacco' | 'valueProduct' | undefined
  >();
  const openModalProductType = (amountProduct?: AmountProduct) => {
    setProductType(amountProduct ? getAmountProductType(amountProduct) : 'valueProduct');

    setTimeout(() => {
      setOpenModal(true);
    }, 150);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-2">
        <Typography color="light-gray">
          {getAmountCategoryName(amountProductGroup.group)}
        </Typography>
      </div>
      {amountProductGroup.products.map((product) => (
        <AmountAgentProductBasket
          key={product.id}
          containError={amountProductGroup.isOverMaximum}
          product={product}
          onProductClick={onModifyClick}
          onDelete={onDelete}
          deletable={deletable}
        />
      ))}
      {amountProductGroup.isOverMaximum && (
        <div className="flex flex-row gap-1 text-error">
          <div className="h-4 w-4">
            <Icon name="error" />
          </div>
          <p className="flex-1 text-xs">
            Vous dépassez la limite légale d'unités{' '}
            {getMessageOverMaximumAmount(amountProductGroup.group)}. Pour connaître les quantités
            maximales autorisées{' '}
            <span
              className="text-link cursor-pointer"
              onClick={() => openModalProductType(amountProductGroup.products[0]?.amountProduct)}
            >
              cliquez ici
            </span>
          </p>
        </div>
      )}

      {(productType === 'alcohol' || productType === 'tobacco') && (
        <ModalMaximumAmount
          open={openModal}
          onClose={() => setOpenModal(false)}
          productType={productType}
          country={country}
          border={border}
        />
      )}
    </div>
  );
};
