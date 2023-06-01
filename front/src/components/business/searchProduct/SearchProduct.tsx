import React, { useEffect, useState } from 'react';

import { SearchResultProducts } from './product/SearchResultProducts';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

type SearchDisplayType = 'product' | 'global';
interface SearchProductProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  onChange?: (displayResult: boolean) => void;
  onSearchAll?: (search: string) => void;
  onClickProduct?: (product: Product) => void;
  placeholder?: string;
  withSearchIcon?: boolean;
  autoFocus?: boolean;
  searchType?: SearchDisplayType;
  disabled?: boolean;
}

export const SearchProduct: React.FC<SearchProductProps<any>> = <T extends unknown>({
  onSearch,
  onChange = () => {},
  onSearchAll = () => {},
  onClickProduct = () => {},
  autoFocus = false,
  disabled = false,
  placeholder = '',
}: SearchProductProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);

  useEffect(() => {
    const productsThatMatch = onSearch(searchValue);
    setResultSearch(productsThatMatch);
  }, [searchValue]);

  useEffect(() => {
    const displayResults = searchValue.length > 0;
    onChange(displayResults);
  }, [resultSearch]);

  return (
    <div
      className="flex h-5/6 flex-1 flex-col content-between justify-between gap-4"
      data-testid="search-element"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 top-1 flex h-9 w-9 pl-4">
          <Icon name="search" />
        </div>
        <input
          data-testid="input-search-element"
          placeholder={placeholder}
          disabled={disabled}
          enterKeyHint="search"
          className="block w-full rounded-full border border-solid border-secondary-300 px-4 py-2 pl-11 text-base placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none  focus:ring-transparent"
          onChange={(event) => {
            setSearchValue(event.target.value);
            onSearch(event.target.value);
          }}
          autoFocus={autoFocus}
        />
        {searchValue.length === 0 ? (
          <></>
        ) : (
          <SearchResultProducts
            resultSearch={resultSearch as unknown as SearchType<Product>[]}
            search={searchValue}
            onClickProduct={onClickProduct}
          />
        )}
      </div>
      <div className="min-w-40 absolute bottom-8 self-center">
        <Button fullWidth={true} onClick={() => onSearchAll(searchValue)}>
          {`Voir les ${resultSearch.length} résultats`}
        </Button>
      </div>
    </div>
  );
};
