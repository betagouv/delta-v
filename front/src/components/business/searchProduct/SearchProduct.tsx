import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { SearchType } from '@/utils/search';

type SearchDisplayType = 'product' | 'global';
interface SearchProductProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  placeholder?: string;
  withSearchIcon?: boolean;
  autoFocus?: boolean;
  searchType?: SearchDisplayType;
  disabled?: boolean;
}

export const SearchProduct: React.FC<SearchProductProps<any>> = <T extends unknown>({
  onSearch,
  autoFocus = false,
  disabled = false,
  placeholder = '',
}: SearchProductProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);
  const router = useRouter();

  useEffect(() => {
    const productsThatMatch = onSearch(searchValue);
    setResultSearch(productsThatMatch);
  }, [searchValue]);

  return (
    <div
      className="flex h-5/6 flex-1 flex-col content-between justify-between gap-4"
      data-testid="search-element"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex h-full w-9 items-center pl-4">
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
      </div>
      <div className="min-w-40 absolute bottom-8 self-center">
        <Button
          fullWidth={true}
          onClick={() =>
            router.push({
              pathname: '/agent/declaration/produits/recherche',
              query: { search: searchValue },
            })
          }
        >
          {`Voir les ${resultSearch.length} résultats`}
        </Button>
      </div>
    </div>
  );
};
