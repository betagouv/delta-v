import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { AmountAgentProductBasket } from './AmountAgentProductBasket';
import { getAmountCategoryName, getMessageOverMaximumAmount } from '@/model/amount';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface AmountProductBasketGroupProps {
  amountProductGroup: GroupedAmountProduct;
  onModifyClick?: () => void;
  onOverMaximumClick?: () => void;
  onDeleteClick: () => void;
}

export const AmountAgentProductBasketGroup: React.FC<AmountProductBasketGroupProps> = ({
  amountProductGroup,
  onModifyClick,
  onOverMaximumClick,
  onDeleteClick,
}) => {
  return (
    <div className="flex flex-col gap-3">
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
          onButtonClick={onModifyClick}
          onDelete={onDeleteClick}
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
