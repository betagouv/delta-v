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
    return <span className="text-black">{product.rankedValue}</span>;
  }

  const matchValue = product.rankedValue
    .toLocaleLowerCase()
    .replace(search.toLocaleLowerCase(), ',');
  const matchValues = matchValue.split(',');

  return (
    <span className="text-black">
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
            className="flex cursor-default select-none items-center py-2 px-3"
            data-testid="result-product-search-element"
            onClick={() => onClickProduct(resultElement)}
          >
            <div className="flex h-5 gap-3">
              <span className="text-blue-700">
                <Icon name="search" />
              </span>
              <span>
                {renderMatchedWithSearch(resultElement, search)}
                {resultElement.name && (
                  <React.Fragment>
                    <span className="text-gray-400"> dans </span>
                    <span className="text-blue-700">{resultElement.name}</span>
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
