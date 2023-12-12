import classNames from 'classnames';

import { Icon } from '@/components/common/Icon';
import { Product } from '@/model/product';

export interface IFavoriteBadgeOptions {
  onClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
  isAvailableToEdit?: boolean;
  product: Product;
}

export const FavoriteBadge: React.FC<IFavoriteBadgeOptions> = ({
  onClick,
  onDeleteClick,
  isAvailableToEdit,
  product,
}) => {
  return (
    <button
      data-testid="badge-favorite"
      type="button"
      className={classNames(
        'inline-flex flex-row items-center gap-2 rounded-full border py-0.5 px-2.5 text-xs',
        isAvailableToEdit ? 'border-error text-error' : 'border-primary-400 text-primary-400',
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
        <Icon name={isAvailableToEdit ? 'cross-thin' : 'etoile'} size="sm" />
        <p>{product.name}</p>
      </div>
    </button>
  );
};
