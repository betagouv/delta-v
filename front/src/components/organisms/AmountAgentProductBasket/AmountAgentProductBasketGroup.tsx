import { Alpha2Code } from 'i18n-iso-countries';

import { Typography } from '../../atoms/Typography';
import { AmountAgentProductBasket } from './AmountAgentProductBasket';
import { getAmountCategoryName } from '@/model/amount';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface AmountAgentProductBasketGroupProps {
  amountProductGroup: GroupedAmountProduct;
  country?: Alpha2Code;
  border?: boolean;
  onModifyClick: (id: string) => void;
  onDelete: (id: string) => void;
  editable: boolean;
  tobaccoTax?: number;
  alcoholTax?: number;
}

export const AmountAgentProductBasketGroup: React.FC<AmountAgentProductBasketGroupProps> = ({
  amountProductGroup,
  onModifyClick,
  onDelete,
  editable,
  tobaccoTax,
  alcoholTax,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Typography color="light-gray" desktopSize="text-sm">
        {getAmountCategoryName(amountProductGroup.group)}
      </Typography>
      <div className="flex md:flex-row flex-col flex-wrap gap-4 md:gap-5">
        {amountProductGroup.group === 'allTobaccoProducts'
          ? amountProductGroup.products.map((product) => (
              <div className="md:w-72 w-full" key={product.customId}>
                <AmountAgentProductBasket
                  product={product}
                  onProductClick={onModifyClick}
                  onDelete={onDelete}
                  editable={editable}
                  tobaccoTax={tobaccoTax}
                />
              </div>
            ))
          : amountProductGroup.products.map((product) => (
              <div className="md:w-72 w-full" key={product.customId}>
                <AmountAgentProductBasket
                  product={product}
                  onProductClick={onModifyClick}
                  onDelete={onDelete}
                  editable={editable}
                  alcoholTax={alcoholTax}
                />
              </div>
            ))}
      </div>
    </div>
  );
};
