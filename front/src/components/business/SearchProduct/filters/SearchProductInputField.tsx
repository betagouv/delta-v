import { useEffect, useRef, useState } from 'react';

import { SearchHistoryProducts } from '../product/SearchHistoryProducts';
import { SearchResultProducts } from '../product/SearchResultProducts';
import { SearchProductHistoryItem } from '@/api/lib/products';
import { SvgIcon } from '@/components/common/SvgIcon';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

export type ClearButtonVisibilityType = 'always' | 'never' | 'searchValue' | boolean;

interface SearchInputFieldProps {
  onSearchProduct: (searchValue: string) => SearchType<Product>[];
  onFieldChange?: (value: string) => void;
  onClearFieldClick?: () => void;
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  history?: SearchProductHistoryItem[];
  clearButtonVisibility?: ClearButtonVisibilityType;
}

const getShowButtonValue = (type: ClearButtonVisibilityType, searchValue: string): boolean => {
  switch (type) {
    case 'always':
      return true;
    case 'never':
      return false;
    case 'searchValue':
      return !!searchValue;
    case true:
      return true;
    case false:
      return !!searchValue;
    default:
      return !!searchValue;
  }
};

export const SearchInputField = ({
  onSearchProduct,
  onFieldChange,
  onClearFieldClick,
  onClickProduct,
  placeholder = '',
  autoFocus = false,
  disabled = false,
  history,
  clearButtonVisibility = 'searchValue',
}: SearchInputFieldProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const removeFocus = () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<SearchType<Product>[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  useEffect(() => {
    setResultSearch(onSearchProduct(searchValue ?? ''));
  }, [searchValue]);

  useEffect(() => {
    setShowClearButton(getShowButtonValue(clearButtonVisibility, searchValue));
  }, [searchValue, clearButtonVisibility]);

  const isFocusedEmpty = isInputFocused && !searchValue;
  const showSearchResults = !!searchValue && resultSearch.length > 0;
  const showSearchHistory = !!history && history.length > 0 && (isFocusedEmpty || !!searchValue);
  const showInputSuggestions = isInputFocused && (showSearchResults || showSearchHistory);

  const handleFieldFocus = () => {
    setIsInputFocused(true);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (onFieldChange) {
      onFieldChange(event.target.value);
    }
  };

  const handleClearFieldClick = () => {
    setSearchValue('');
    if (onClearFieldClick) {
      onClearFieldClick();
    }
    removeFocus();
    setIsInputFocused(false);
  };

  const handleProductClick = (product: IdRequiredProduct, search: string) => {
    if (onClickProduct) {
      onClickProduct(product, search);
    }
    handleClearFieldClick();
    removeFocus();
    setIsInputFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        removeFocus();
        setIsInputFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative h-full flex px-5 bg-white rounded-full flex-1" ref={containerRef}>
      <input
        ref={inputRef}
        data-testid="input-search-element"
        placeholder={placeholder}
        disabled={disabled}
        enterKeyHint="search"
        className="relative text-xs font-normal border-none w-full placeholder:text-placeholder placeholder:italic focus:ring-transparent"
        onChange={handleFieldChange}
        autoFocus={autoFocus}
        onFocus={handleFieldFocus}
        value={searchValue}
      />
      {showClearButton && (
        <span onClick={handleClearFieldClick} className="my-auto ml-[13px]">
          <SvgIcon name="clearField" className=" w-[18px] h-[18px] cursor-pointer" />
        </span>
      )}
      {showInputSuggestions && (
        <div className="w-[calc(100%+10px)] border-secondary-bg border-[5px] absolute flex flex-col left-0 bottom-0 translate-y-[calc(100%+5px)] translate-x-[-5px] z-10 bg-white rounded-[10px] p-5">
          {showSearchResults && (
            <SearchResultProducts
              resultSearch={resultSearch as unknown as SearchType<Product>[]}
              search={searchValue}
              onClickProduct={handleProductClick}
            />
          )}
          {showSearchResults && showSearchHistory && <div className="border-t my-5" />}
          {showSearchHistory && (
            <SearchHistoryProducts history={history} onClickProduct={handleProductClick} />
          )}
        </div>
      )}
    </div>
  );
};
