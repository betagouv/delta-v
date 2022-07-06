import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { SearchResultProducts } from './product/SearchResultProducts';
import { UnknownProduct } from './product/UnknownProduct';
import { Input } from '@/components/input/StandardInputs/Input';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

type SearchDisplayType = 'product' | 'faq';
interface SearchProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  onChange?: (displayResult: boolean) => void;
  withSearchIcon?: boolean;
  autoFocus?: boolean;
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
  autoFocus = false,
  withSearchIcon = false,
}: SearchProps<T>) => {
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);
  const [placeholder, setPlaceholder] = useState<string>('');
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
    switch (searchType) {
      case 'product':
        setPlaceholder('Recherchez votre achat');
        break;
      case 'faq':
        setPlaceholder('Saisissez votre recherche');
        break;
      default:
        break;
    }
  }, [searchType]);

  useEffect(() => {
    const displayResults = getValues('searchValue').length > 0;
    onChange(displayResults);
  }, [resultSearch]);

  const SearchResult = getSearchResult(searchType, resultSearch);

  return (
    <div className="flex h-full flex-col" data-testid="search-element">
      <Input
        autoFocus={autoFocus}
        data-testid="input-search-element"
        name="search"
        type="text"
        fullWidth
        placeholder={placeholder}
        trailingIcon={withSearchIcon ? 'search' : undefined}
        register={register('searchValue')}
      />
      {getValues('searchValue').length === 0 ? (
        <></>
      ) : (
        <div className="h-full pt-4">
          {resultSearch.length === 0 ? (
            <UnknownProduct searchValue={getValues('searchValue')} />
          ) : (
            SearchResult
          )}
        </div>
      )}
    </div>
  );
};
