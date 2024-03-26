import classNames from 'classnames';

import { Icon } from '@/components/atoms/Icon';
import { Product } from '@/model/product';

export interface IFavoriteBadgeOptions {
  onClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
  isAvailableToEdit?: boolean;
  product: Product;
  disabled?: boolean;
}

export const FavoriteBadge: React.FC<IFavoriteBadgeOptions> = ({
  onClick,
  onDeleteClick,
  isAvailableToEdit,
  product,
  disabled = false,
}) => {
  return (
    <button
      data-testid="badge-favorite"
      type="button"
      disabled={isAvailableToEdit ? false : disabled}
      className={classNames(
        'inline-flex flex-row items-center justify-between gap-3 rounded-full border py-0.5 px-1.5 text-xs',
        // eslint-disable-next-line no-nested-ternary
        isAvailableToEdit
          ? 'border-error text-error'
          : disabled
          ? 'border-disabled-text text-disabled-text'
          : 'border-primary-400 text-primary-400',
      )}
      onClick={() => {
        if (isAvailableToEdit) {
          onDeleteClick(product);
        } else {
          onClick(product);
        }
      }}
    >
      <div
        className={classNames({
          'flex flex-row items-center': true,
        })}
      >
        <Icon
          // eslint-disable-next-line no-nested-ternary
          name={isAvailableToEdit ? 'cross-thin' : disabled ? 'adult' : 'etoile'}
          size="sm"
        />
        <p className="ml-1">{product.name}</p>
      </div>
    </button>
  );
};
