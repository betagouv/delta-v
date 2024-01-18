import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { SearchHistoryProducts } from '../product/SearchHistoryProducts';
import { SearchResultProducts } from '../product/SearchResultProducts';
import { useGetSearchProductHistory } from '@/api/hooks/useAPIProducts';
import { Icon } from '@/components/common/Icon';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchProductProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  onChange?: (displayResult: boolean) => void;
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  onFilterClick?: (isOpen: boolean) => void;
  onSearchClick?: (search: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const SearchProductDesktop: React.FC<SearchProductProps<any>> = <T extends unknown>({
  onSearch,
  onChange,
  onClickProduct = () => {},
  onSearchClick = () => {},
  onFilterClick,
  placeholder = '',
  autoFocus = false,
  disabled = false,
}: SearchProductProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    const productsThatMatch = onSearch(searchValue ?? '');
    setResultSearch(productsThatMatch);
  }, [searchValue]);

  useEffect(() => {
    const displayResults = !!searchValue;
    if (onChange) {
      onChange(displayResults);
    }
  }, [resultSearch]);

  const { data: history } = useGetSearchProductHistory();

  const isFocusedEmpty = isFocused && !searchValue;
  const showSearchResults = !!searchValue && resultSearch.length > 0;
  const showSearchHistory = !!history && (isFocusedEmpty || !!searchValue);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
    if (onFilterClick) {
      onFilterClick(isFilterOpen);
    }
  };
  return (
    <div className="h-[40px] w-full flex items-center gap-[10px]">
      <div className="relative h-full flex px-5 bg-white rounded-full flex-1">
        <input
          data-testid="input-search-element"
          placeholder={placeholder}
          disabled={disabled}
          enterKeyHint="search"
          className="text-xs font-normal border-none w-full placeholder:text-secondary-400 placeholder:italic focus:ring-transparent"
          onChange={(event) => {
            setSearchValue(event.target.value);
            onSearch(event.target.value);
          }}
          autoFocus={autoFocus}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsFocused(false);
            }, 100)
          }
        />
        {isFocused && (
          <div className="w-[calc(100%+10px)] border-secondary-bg border-[5px] absolute flex flex-col left-0 bottom-0 translate-y-[calc(100%+5px)] translate-x-[-5px] z-10 bg-white rounded-[10px] p-5">
            {showSearchResults && (
              <SearchResultProducts
                resultSearch={resultSearch as unknown as SearchType<Product>[]}
                search={searchValue}
                onClickProduct={onClickProduct}
              />
            )}
            {showSearchResults && showSearchHistory && <div className="border-t my-5" />}
            {showSearchHistory && (
              <SearchHistoryProducts history={history} onClickProduct={onClickProduct} />
            )}
          </div>
        )}
      </div>
      <div
        className={classNames({
          'h-full flex items-center px-5 rounded-full bg-white gap-11': true,
          'cursor-pointer': onFilterClick,
        })}
        onClick={handleFilterClick}
      >
        <div className="flex items-center gap-[10px]">
          <SvgIcon name="filter" className="h-3 w-3" />
          <Typography color="black" weight="bold" size="text-2xs">
            Filtrer par catégories
          </Typography>
        </div>
        <span
          className={classNames({
            'rotate-180 transition-all': isFilterOpen,
            'rotate-0 transition-all': !isFilterOpen,
          })}
        >
          <Icon name="chevron-down" size="sm" />
        </span>
      </div>
      <button
        className="bg-primary-600 w-[134px] h-[34px] rounded-full flex items-center px-5 justify-between ml-5"
        onClick={() => !!searchValue && onSearchClick(searchValue)}
      >
        <Typography color="white" size="text-2xs" textPosition="text-left">
          Rechercher
        </Typography>
        <Icon name="search" color="white" size="sm" />
      </button>
    </div>
  );
};
