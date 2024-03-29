import React, { useEffect, useState } from 'react';

import cs from 'classnames';

import { SearchProductHistoryItem } from '@/api/lib/products';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { AGENT_PRODUCT_SEARCH_HISTORY_LIMIT } from '@/config/productSearch';
import { IdRequiredProduct, Product } from '@/model/product';
import { useStore } from '@/stores/store';

interface SearchHistoryProductsProps {
  history: SearchProductHistoryItem[];
  onClickProduct: (product: IdRequiredProduct, searchValue: string) => void;
}
interface ProductHistoryItemProps {
  product: IdRequiredProduct;
  onClick?: (product: IdRequiredProduct, searchValue: string) => void;
  disabled?: boolean;
  searchValue: string;
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
        <div
          className={cs({ 'mb-1': true, 'text-blue-700': !disabled, 'text-gray-400': disabled })}
        >
          <span className="block md:hidden">
            <Icon name="search" size="base" />
          </span>
          <span className="md:block hidden">
            <Icon name="search" size="sm" />
          </span>
        </div>
        <span>
          {product.name && (
            <React.Fragment>
              {searchValue && (
                <>
                  <Typography
                    color={disabled ? 'light-gray' : 'black'}
                    size="text-base"
                    desktopSize="text-xs"
                  >
                    {searchValue}
                  </Typography>
                  <Typography color="light-gray" size="text-base" desktopSize="text-xs">
                    {' '}
                    dans{' '}
                  </Typography>
                </>
              )}
              <Typography size="text-base" desktopSize="text-xs">
                <span className={disabled ? 'text-gray-400' : 'text-blue-700'}>{product.name}</span>
              </Typography>
            </React.Fragment>
          )}
        </span>
      </div>
    </li>
  );
};

const getHistoryToShow = (
  history: SearchProductHistoryItem[],
  findingFunction: (id: string) => Product | undefined,
): ProductHistoryToShow[] => {
  const fullHistory = history
    .map((historyItem) => {
      const product = findingFunction(historyItem.id);
      if (product) {
        return { product, searchValue: historyItem.searchValue };
      }
      return null;
    })
    .filter((item) => item !== null) as ProductHistoryToShow[];
  return fullHistory.slice(0, AGENT_PRODUCT_SEARCH_HISTORY_LIMIT);
};

export const SearchHistoryProducts: React.FC<SearchHistoryProductsProps> = ({
  history,
  onClickProduct,
}: SearchHistoryProductsProps) => {
  const { findProduct } = useStore((state) => ({ findProduct: state.findProduct }));

  const [historyProductToShow, setHistoryProductToShow] = useState<ProductHistoryToShow[]>(
    getHistoryToShow(history, findProduct),
  );

  useEffect(() => {
    setHistoryProductToShow(getHistoryToShow(history, findProduct));
  }, []);

  return (
    <>
      {historyProductToShow.length > 0 ? (
        <ul className="gap-2 flex flex-col md:font-bold font-normal">
          <Typography color="black" size="text-base" desktopSize="text-xs" desktopWeight="bold">
            Historique des recherches
          </Typography>
          {historyProductToShow.map((historyToShowItem) => {
            return (
              <ProductHistoryItem
                product={historyToShowItem.product}
                onClick={onClickProduct}
                key={historyToShowItem.product.id}
                searchValue={historyToShowItem.searchValue}
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
