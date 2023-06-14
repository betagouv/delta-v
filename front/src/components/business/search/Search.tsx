import React, { useEffect, useState } from 'react';

import { SearchResultGlobal } from './global/SearchResultGlobal';
import { UnknownSearch } from './global/UnknownSearch';
import { SearchResultProducts } from './product/SearchResultProducts';
import { UnknownProduct } from './product/UnknownProduct';
import { Icon } from '@/components/common/Icon';
import { Product } from '@/model/product';
import { SearchData } from '@/services/search.service';
import { SearchType } from '@/utils/search';

type SearchDisplayType = 'product' | 'global';
interface SearchProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  onChange?: (displayResult: boolean) => void;
  withSearchIcon?: boolean;
  autoFocus?: boolean;
  searchType?: SearchDisplayType;
  disabled?: boolean;
}

const getSearchResult = <T extends unknown>(
  searchType: SearchDisplayType,
  resultSearch: SearchType<T>[],
) => {
  switch (searchType) {
    case 'global':
      return (
        <SearchResultGlobal resultSearch={resultSearch as unknown as SearchType<SearchData>[]} />
      );
    case 'product':
    default:
      return (
        <SearchResultProducts resultSearch={resultSearch as unknown as SearchType<Product>[]} />
      );
  }
};

const getSearchUnknown = (searchType: SearchDisplayType, searchValue: string) => {
  switch (searchType) {
    case 'global':
      return <UnknownSearch />;
    case 'product':
    default:
      return <UnknownProduct searchValue={searchValue} />;
  }
};

export const Search: React.FC<SearchProps<any>> = <T extends unknown>({
  onSearch,
  onChange = () => {},
  searchType = 'product',
  autoFocus = false,
  withSearchIcon = false,
  disabled = false,
}: SearchProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);
  const [placeholder, setPlaceholder] = useState<string>('');

  useEffect(() => {
    const productsThatMatch = onSearch(searchValue);
    setResultSearch(productsThatMatch);
  }, [searchValue]);

  useEffect(() => {
    switch (searchType) {
      case 'product':
        setPlaceholder('Recherchez un produit');
        break;
      case 'global':
        setPlaceholder('Saisissez votre recherche');
        break;
      default:
        break;
    }
  }, [searchType]);

  useEffect(() => {
    const displayResults = searchValue.length > 0;
    onChange(displayResults);
  }, [resultSearch]);

  const SearchResult = getSearchResult(searchType, resultSearch);

  return (
    <div className="flex flex-1 flex-col gap-4" data-testid="search-element">
      <div className="relative">
        <input
          className="w-full rounded-full border border-secondary-100 py-2 pl-3 pr-10 placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent"
          autoFocus={autoFocus}
          enterKeyHint="search"
          data-testid="input-search-element"
          placeholder={placeholder}
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          disabled={disabled}
        />
        {withSearchIcon && (
          <div className="absolute inset-y-0 right-0 z-10 flex h-full w-9 items-center pr-4">
            {searchValue.length === 0 ? (
              <Icon name="search" />
            ) : (
              <div>
                <Icon name="cross-thin" onClick={() => setSearchValue('')} />
              </div>
            )}
          </div>
        )}
      </div>
      {searchValue.length === 0 ? (
        <></>
      ) : (
        <>{resultSearch.length === 0 ? getSearchUnknown(searchType, searchValue) : SearchResult}</>
      )}
    </div>
  );
};
