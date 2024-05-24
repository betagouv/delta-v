import { useState } from 'react';

import type { Alpha2Code } from 'i18n-iso-countries';

import { Typography } from '../../atoms/Typography';
import { AmountAgentProductBasket } from './AmountAgentProductBasket';
import { ModalMaximumAmount } from '@/components/organisms/ModalMaximumAmount';
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
  editable: boolean;
}

export const AmountAgentProductBasketGroup: React.FC<AmountAgentProductBasketGroupProps> = ({
  amountProductGroup,
  onModifyClick,
  country,
  border = false,
  onDelete,
  editable,
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
    <div className="flex flex-col gap-5">
      <Typography color="light-gray" desktopSize="text-sm">
        {getAmountCategoryName(amountProductGroup.group)}
      </Typography>
      <div className="flex md:flex-row flex-col flex-wrap gap-4 md:gap-5">
        {amountProductGroup.products.map((product) => (
          <div className="md:w-72 w-full" key={product.customId}>
            <AmountAgentProductBasket
              containError={amountProductGroup.isOverMaximum}
              product={product}
              onProductClick={onModifyClick}
              onDelete={onDelete}
              editable={editable}
            />
          </div>
        ))}
      </div>
      {amountProductGroup.isOverMaximum && (
        <div className="flex flex-row gap-1 text-error">
          <p className="md:ml-5 flex-1 text-xs">
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
