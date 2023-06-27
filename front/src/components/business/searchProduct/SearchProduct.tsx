import React, { useEffect, useState } from 'react';

import { SearchResultProducts } from './product/SearchResultProducts';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
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
    <div data-testid="search-element" className="items-between flex flex-col h-full">
      <div className={`flex flex-col p-5 pb-6 bg-secondary-100 rounded-md`}>
        <div className="text-black flex flex-row items-center gap-2 ml-5">
          <Icon name="search" size="sm" />
          <Typography color="black" size="text-sm" weight="bold">
            Recherche
          </Typography>
        </div>
        <input
          data-testid="input-search-element"
          placeholder={placeholder}
          disabled={disabled}
          enterKeyHint="search"
          className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none  focus:ring-transparent mt-2"
          onChange={(event) => {
            setSearchValue(event.target.value);
            onSearch(event.target.value);
          }}
          autoFocus={autoFocus}
        />
      </div>
      <div className="p-5 flex-1">
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
      <div className="my-5 self-center">
        <Button onClick={() => onSearchAll(searchValue)} disabled={resultSearch.length === 0}>
          {`Voir les ${resultSearch.length} résultats`}
        </Button>
      </div>
    </div>
  );
};
