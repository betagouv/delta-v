import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { SearchResultProducts } from './product/SearchResultProducts';
import { UnknownProduct } from './product/UnknownProduct';
import { Input } from '@/components/input/StandardInputs/Input';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

type SearchDisplayType = 'product';
interface SearchProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  onChange?: (displayResult: boolean) => void;
  withSearchIcon?: boolean;
  searchType?: SearchDisplayType;
}

const getSearchResult = <T extends unknown>(
  searchType: SearchDisplayType,
  resultSearch: SearchType<T>[],
) => {
  switch (searchType) {
    case 'product':
    default:
      return (
        <SearchResultProducts resultSearch={resultSearch as unknown as SearchType<Product>[]} />
      );
  }
};

export const Search: React.FC<SearchProps<any>> = <T extends unknown>({
  onSearch,
  onChange = () => {},
  searchType = 'product',
  withSearchIcon = false,
}: SearchProps<T>) => {
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);
  const { register, getValues } = useForm<{ searchValue: string }>({
    defaultValues: {
      searchValue: '',
    },
  });

  register('searchValue', {
    onChange: () => {
      const searchValue = getValues('searchValue');

      const productsThatMatch = onSearch(searchValue);

      setResultSearch(productsThatMatch);
    },
  });

  useEffect(() => {
    const displayResults = getValues('searchValue').length > 0;
    onChange(displayResults);
  }, [resultSearch]);

  const SearchResult = getSearchResult(searchType, resultSearch);

  return (
    <div className="h-full" data-testid="search-element">
      <Input
        data-testid="input-search-element"
        name="search"
        type="text"
        fullWidth
        placeholder="Saisissez votre achat"
        trailingSvgIcon={withSearchIcon ? 'search' : undefined}
        register={register('searchValue')}
      />
      {getValues('searchValue').length === 0 ? (
        <></>
      ) : (
        <div className="relative bottom-0 -mx-3 mt-1">
          <div className="absolute inset-x-0 top-0 z-10 h-96 w-full bg-white">
            <div className="bg-white px-3 py-4">
              {resultSearch.length === 0 ? <UnknownProduct /> : SearchResult}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
