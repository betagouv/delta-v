import React from 'react';

import cs from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { SearchProductHistoryItem } from '@/api/lib/products';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { AGENT_PRODUCT_SEARCH_HISTORY_LIMIT } from '@/config/productSearch';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';
import { TailwindDefaultScreenSize } from '@/utils/enums';

interface SearchHistoryProductsProps {
  history: SearchProductHistoryItem[];
  onClickProduct: (product: IdRequiredProduct, searchValue: string) => void;
}
interface ProductHistoryItemProps {
  product: IdRequiredProduct;
  onClick?: (product: IdRequiredProduct, searchValue: string) => void;
  disabled?: boolean;
  searchValue: string;
  isMobile?: boolean;
}

type ProductHistoryToShow = {
  product: Product;
  searchValue: string;
};

const ProductHistoryItem: React.FC<ProductHistoryItemProps> = ({
  product,
  onClick,
  disabled = false,
  searchValue,
  isMobile = true,
}: ProductHistoryItemProps) => {
  return (
    <li
      key={product.id}
      className={cs({
        'flex select-none items-center px-3 leading-3 w-fit': true,
        'cursor-pointer': onClick,
        'cursor-not-allowed': disabled,
      })}
      data-testid="result-product-search-element"
      onClick={onClick && (() => onClick(product, searchValue))}
    >
      <div className="flex items-center gap-3">
        <span
          className={cs({ 'mb-1': true, 'text-blue-700': !disabled, 'text-gray-400': disabled })}
        >
          <Icon name="search" size={isMobile ? 'base' : 'sm'} />
        </span>
        <span>
          {product.name && (
            <React.Fragment>
              {searchValue && (
                <>
                  <Typography
                    color={disabled ? 'light-gray' : 'black'}
                    size={isMobile ? 'text-base' : 'text-2xs'}
                  >
                    {searchValue}
                  </Typography>
                  <Typography color="light-gray" size={isMobile ? 'text-base' : 'text-2xs'}>
                    {' '}
                    dans{' '}
                  </Typography>
                </>
              )}
              <Typography size={isMobile ? 'text-base' : 'text-2xs'}>
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
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  const { findProduct } = useStore((state) => ({ findProduct: state.findProduct }));
  const historyProductToShow: ProductHistoryToShow[] = [];

  history.forEach((historyItem) => {
    const product = findProduct(historyItem.id);
    if (product) {
      historyProductToShow.push({ product, searchValue: historyItem.searchValue });
    }
  });

  historyProductToShow.splice(AGENT_PRODUCT_SEARCH_HISTORY_LIMIT);
  return (
    <>
      {historyProductToShow.length > 0 ? (
        <ul className="gap-2 flex flex-col">
          <Typography
            color="black"
            size={isMobile ? 'text-base' : 'text-xs'}
            weight={isMobile ? 'normal' : 'bold'}
          >
            Historique des recherches
          </Typography>
          {historyProductToShow.map((historyToShowItem) => {
            return (
              <ProductHistoryItem
                product={historyToShowItem.product}
                onClick={onClickProduct}
                key={historyToShowItem.product.id}
                searchValue={historyToShowItem.searchValue}
                isMobile={isMobile}
              />
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
