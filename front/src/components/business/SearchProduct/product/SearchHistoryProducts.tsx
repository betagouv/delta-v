import React from 'react';

import cs from 'classnames';

import { SearchProductHistoryItem } from '@/api/lib/products';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { haveAgeRestriction } from '@/utils/product.util';

interface SearchHistoryProductsProps {
  history: SearchProductHistoryItem[];
  onClickProduct: (product: Partial<Product>) => void;
}
interface ProductHistoryItemProps {
  product: Product;
  onClick?: (product: Partial<Product>) => void;
  disabled?: boolean;
}

const ProductHistoryItem: React.FC<ProductHistoryItemProps> = ({
  product,
  onClick,
  disabled = false,
}: ProductHistoryItemProps) => {
  return (
    <li
      key={product.id}
      className={cs({
        'flex select-none items-center px-3 pt-3 leading-3': true,
        'cursor-pointer': onClick,
        'cursor-not-allowed': disabled,
      })}
      data-testid="result-product-search-element"
      onClick={onClick && (() => onClick(product))}
    >
      <div className="flex items-center gap-3">
        <span
          className={cs({ 'mb-1': true, 'text-blue-700': !disabled, 'text-gray-400': disabled })}
        >
          <Icon name="search" size="base" />
        </span>
        <span>
          {product.name && (
            <React.Fragment>
              <Typography color={disabled ? 'light-gray' : 'black'} size="text-base">
                {product.name}
              </Typography>
              <Typography color="light-gray" size="text-base">
                {' '}
                dans{' '}
              </Typography>
              <Typography size="text-base">
                <span className={disabled ? 'text-gray-400' : 'text-blue-700'}>{product.name}</span>
              </Typography>
            </React.Fragment>
          )}
        </span>
      </div>
    </li>
  );
};

export const SearchHistoryProducts: React.FC<SearchHistoryProductsProps> = ({
  history,
  onClickProduct,
}: SearchHistoryProductsProps) => {
  const { findProduct } = useStore((state) => ({ findProduct: state.findProduct }));
  const enabledHistoryProducts: Product[] = [];
  const disabledHistoryProducts: Product[] = [];

  history.forEach((historyItem) => {
    const product = findProduct(historyItem.id);
    console.log('product', product);
    if (product) {
      if (haveAgeRestriction(product)) {
        disabledHistoryProducts.push(product);
      } else enabledHistoryProducts.push(product);
    }
  });
  return (
    <>
      {history.length > 0 ? (
        <ul className="w-full text-base">
          <Typography color="black" size="text-base">
            Historique des recherches
          </Typography>
          {enabledHistoryProducts.map((product) => {
            return <ProductHistoryItem product={product} onClick={onClickProduct} />;
          })}
          {disabledHistoryProducts.map((product) => {
            return <ProductHistoryItem product={product} disabled />;
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
