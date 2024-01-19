import React from 'react';

import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { TailwindDefaultScreenSize } from '@/utils/enums';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<Product>[];
  search: string;
  onClickProduct: (product: IdRequiredProduct, searchValue: string) => void;
}

export const renderMatchedWithSearch = (
  product: SearchType<Product>,
  search: string,
  isMobile: boolean = true,
) => {
  if (!product.rankedValue.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
    return (
      <Typography color="black" size={isMobile ? 'text-base' : 'text-2xs'}>
        {product.rankedValue}
      </Typography>
    );
  }

  const matchValue = product.rankedValue.replace(new RegExp(`(${search})`, 'gi'), ',');
  const matchValues = matchValue.split(',');

  return (
    <Typography color="black" size={isMobile ? 'text-base' : 'text-2xs'}>
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
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  return (
    <>
      {resultSearch.length > 0 ? (
        <ul className="text-base flex flex-col gap-2">
          {resultSearch.map((resultElement) => {
            return (
              <li
                key={resultElement.id}
                className={classNames({
                  'flex select-none items-center px-3 leading-3 w-fit': true,
                  'cursor-pointer': onClickProduct,
                })}
                data-testid="result-product-search-element"
                onClick={
                  onClickProduct && (() => onClickProduct(resultElement, resultElement.rankedValue))
                }
              >
                <div className="flex items-center gap-3">
                  <span className="mb-1 text-blue-700">
                    <Icon name="search" size={isMobile ? 'base' : 'sm'} />
                  </span>
                  <span>
                    {renderMatchedWithSearch(resultElement, search, isMobile)}
                    {resultElement.name && (
                      <React.Fragment>
                        <Typography color="light-gray" size={isMobile ? 'text-base' : 'text-2xs'}>
                          {' '}
                          dans{' '}
                        </Typography>
                        <Typography size={isMobile ? 'text-base' : 'text-2xs'}>
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
