import React from 'react';

import { Icon } from '@/components/common/Icon';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<Product>[];
  search: string;
  onClickProduct: (product: Product) => void;
}

export const renderMatchedWithSearch = (product: SearchType<Product>, search: string) => {
  if (!product.rankedValue.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
    return <span className="text-xs text-black">{product.rankedValue}</span>;
  }

  const matchValue = product.rankedValue.replace(new RegExp(`(${search})`, 'gi'), ',');
  const matchValues = matchValue.split(',');

  return (
    <span className="text-xs text-black">
      {matchValues[0]}
      <b>{search}</b>
      {matchValues[1]}
    </span>
  );
};

export const SearchResultProducts: React.FC<SearchResultProductsProps> = ({
  resultSearch,
  search,
  onClickProduct,
}: SearchResultProductsProps) => {
  return (
    <ul className="w-full text-base">
      {resultSearch.map((resultElement) => {
        return (
          <li
            key={resultElement.id}
            className="flex cursor-default select-none items-center px-3 pt-3 leading-3"
            data-testid="result-product-search-element"
            onClick={() => onClickProduct(resultElement)}
          >
            <div className="flex items-center gap-3">
              <span className="mb-1 text-blue-700">
                <Icon name="search" size="sm" />
              </span>
              <span>
                {renderMatchedWithSearch(resultElement, search)}
                {resultElement.name && (
                  <React.Fragment>
                    <span className="text-xs text-gray-400"> dans </span>
                    <span className="text-xs text-blue-700">{resultElement.name}</span>
                  </React.Fragment>
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
