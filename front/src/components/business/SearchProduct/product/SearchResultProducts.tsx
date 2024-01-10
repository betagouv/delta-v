import React from 'react';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<Product>[];
  search: string;
  onClickProduct: (product: IdRequiredProduct, searchValue: string) => void;
}

export const renderMatchedWithSearch = (product: SearchType<Product>, search: string) => {
  if (!product.rankedValue.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
    return (
      <Typography color="black" size="text-base">
        {product.rankedValue}
      </Typography>
    );
  }

  const matchValue = product.rankedValue.replace(new RegExp(`(${search})`, 'gi'), ',');
  const matchValues = matchValue.split(',');

  return (
    <Typography color="black" size="text-base">
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
        <ul className="w-full text-base">
          {resultSearch.map((resultElement) => {
            return (
              <li
                key={resultElement.id}
                className="flex cursor-default select-none items-center px-3 pt-2 leading-3"
                data-testid="result-product-search-element"
                onClick={
                  onClickProduct && (() => onClickProduct(resultElement, resultElement.rankedValue))
                }
              >
                <div className="flex items-center gap-3">
                  <span className="mb-1 text-blue-700">
                    <Icon name="search" size="base" />
                  </span>
                  <span>
                    {renderMatchedWithSearch(resultElement, search)}
                    {resultElement.name && (
                      <React.Fragment>
                        <Typography color="light-gray" size="text-base">
                          {' '}
                          dans{' '}
                        </Typography>
                        <Typography size="text-base">
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
