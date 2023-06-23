import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { AmountProductBasket } from './AmountProductBasket';
import { getAmountCategoryName, getMessageOverMaximumAmount } from '@/model/amount';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface AmountProductBasketGroupProps {
  amountProductGroup: GroupedAmountProduct;
  onModifyClick?: () => void;
  onOverMaximumClick?: () => void;
}

export const AmountProductBasketGroup: React.FC<AmountProductBasketGroupProps> = ({
  amountProductGroup,
  onModifyClick,
  onOverMaximumClick,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="mt-2">
        <Typography color="light-gray">
          {getAmountCategoryName(amountProductGroup.group)}
        </Typography>
      </div>
      {amountProductGroup.products.map((product) => (
        <AmountProductBasket
          key={product.id}
          containError={amountProductGroup.isOverMaximum}
          product={product}
          onButtonClick={onModifyClick}
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
            <span className="text-link cursor-pointer" onClick={onOverMaximumClick}>
              cliquez ici
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
