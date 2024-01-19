import React, { useEffect, useState } from 'react';

import { SearchHistoryProducts } from '../../product/SearchHistoryProducts';
import { SearchResultProducts } from '../../product/SearchResultProducts';
import { useGetSearchProductHistory } from '@/api/hooks/useAPIProducts';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchInputFieldProps {
  onSearchProduct: (searchValue: string) => SearchType<Product>[];
  onFieldChange?: (value: string) => void;
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const SearchInputField = ({
  onSearchProduct,
  onFieldChange,
  onClickProduct = () => {},
  placeholder = '',
  autoFocus = false,
  disabled = false,
}: SearchInputFieldProps) => {
  const { data: history } = useGetSearchProductHistory();

  const [searchValue, setSearchValue] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<SearchType<Product>[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setResultSearch(onSearchProduct(searchValue ?? ''));
  }, [searchValue]);

  const isFocusedEmpty = isFocused && !searchValue;
  const showSearchResults = !!searchValue && resultSearch.length > 0;
  const showSearchHistory = !!history && (isFocusedEmpty || !!searchValue);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (onFieldChange) {
      onFieldChange(event.target.value);
    }
  };

  return (
    <div className="relative h-full flex px-5 bg-white rounded-full flex-1">
      <input
        data-testid="input-search-element"
        placeholder={placeholder}
        disabled={disabled}
        enterKeyHint="search"
        className="text-xs font-normal border-none w-full placeholder:text-secondary-400 placeholder:italic focus:ring-transparent"
        onChange={handleFieldChange}
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
  );
};
