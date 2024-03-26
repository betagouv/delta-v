import React from 'react';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import clsxm from '@/utils/clsxm';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<Product>[];
  search: string;
  onClickProduct: (product: IdRequiredProduct, searchValue: string) => void;
}

export const renderMatchedWithSearch = (product: SearchType<Product>, search: string) => {
  if (!product.rankedValue.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
    return (
      <Typography color="black" size="text-base" desktopSize="text-xs">
        {product.rankedValue}
      </Typography>
    );
  }

  const matchValue = product.rankedValue.replace(new RegExp(`(${search})`, 'gi'), ',');
  const matchValues = matchValue.split(',');

  return (
    <Typography color="black" size="text-base" desktopSize="text-xs">
      {matchValues[0]}
      <b>{search}</b>
      {matchValues[1]}
    </Typography>
  );
};

export const SearchResultProducts: React.FC<SearchResultProductsProps> = ({
  resultSearch,
  search,
  onClickProduct,
}: SearchResultProductsProps) => {
  return (
    <>
      {resultSearch.length > 0 ? (
        <ul className="text-base flex flex-col gap-2">
          {resultSearch.map((resultElement) => {
            return (
              <li
                key={resultElement.id}
                className={clsxm({
                  'flex select-none items-center px-3 leading-3 w-fit': true,
                  'cursor-pointer': onClickProduct,
                })}
                data-testid="result-product-search-element"
                onClick={
                  onClickProduct && (() => onClickProduct(resultElement, resultElement.rankedValue))
                }
              >
                <div className="flex items-center gap-3">
                  <div className="mb-1 text-blue-700">
                    <span className="hidden md:block">
                      <Icon name="search" size="sm" />
                    </span>
                    <span className="md:hidden block">
                      <Icon name="search" size="base" />
                    </span>
                  </div>
                  <span>
                    {renderMatchedWithSearch(resultElement, search)}
                    {resultElement.name && (
                      <React.Fragment>
                        <Typography color="light-gray" size="text-base" desktopSize="text-xs">
                          {' '}
                          dans{' '}
                        </Typography>
                        <Typography size="text-base" desktopSize="text-xs">
                          <span className="text-blue-700">{resultElement.name}</span>
                        </Typography>
                      </React.Fragment>
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
