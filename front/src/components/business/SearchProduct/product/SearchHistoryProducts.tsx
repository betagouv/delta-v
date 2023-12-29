import React from 'react';

import cs from 'classnames';

import { SearchProductHistoryItem } from '@/api/lib/products';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { AGENT_PRODUCT_SEARCH_HISTORY_LIMIT } from '@/config/productSearch';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';

interface SearchHistoryProductsProps {
  history: SearchProductHistoryItem[];
  onClickProduct: (product: IdRequiredProduct) => void;
}
interface ProductHistoryItemProps {
  product: IdRequiredProduct;
  onClick?: (product: IdRequiredProduct) => void;
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
  const historyProductToShow: Product[] = [];

  history.forEach((historyItem) => {
    const product = findProduct(historyItem.id);
    if (product) {
      historyProductToShow.push(product);
    }
  });
  console.log('history', history);

  historyProductToShow.splice(AGENT_PRODUCT_SEARCH_HISTORY_LIMIT);
  return (
    <>
      {history.length > 0 ? (
        <ul className="w-full text-base">
          <Typography color="black" size="text-base">
            Historique des recherches
          </Typography>
          {historyProductToShow.map((product) => {
            return (
              <ProductHistoryItem product={product} onClick={onClickProduct} key={product.id} />
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
