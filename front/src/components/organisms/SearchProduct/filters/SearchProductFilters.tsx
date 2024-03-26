import { useState } from 'react';

import { SearchProductCategoryFilter } from './SearchProductCategoryFilter';
import { ClearButtonVisibilityType, SearchInputField } from './SearchProductInputField';
import { SearchProductSubmitButton } from './SearchProductSubmitButton';
import { SearchProductHistoryItem } from '@/api/lib/products';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchProductFilterBarProps {
  onSearchProduct: (searchValue: string) => SearchType<Product>[];
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  onFilterClick?: () => void;
  onClearFieldClick?: () => void;
  onSearchAllClick?: (searchValue: string) => void;
  placeholder?: string;
  isCategoryFilterOpen?: boolean;
  history?: SearchProductHistoryItem[];
  clearButtonVisibility?: ClearButtonVisibilityType;
}

export const SearchProductFilterBar = ({
  onSearchProduct,
  onClickProduct,
  onFilterClick,
  onClearFieldClick,
  onSearchAllClick,
  placeholder,
  isCategoryFilterOpen,
  history,
  clearButtonVisibility,
}: SearchProductFilterBarProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onInputChange = (value: string) => {
    setSearchValue(value);
  };

  const onSearchClick = () => {
    if (searchValue === '') {
      return;
    }
    if (onSearchAllClick) {
      onSearchAllClick(searchValue);
    }
  };

  const onClearClick = () => {
    if (onClearFieldClick) {
      onClearFieldClick();
    }
    setSearchValue('');
  };

  return (
    <div className="h-[40px] w-full flex items-center gap-[10px]">
      <SearchInputField
        onSearchProduct={onSearchProduct}
        onFieldChange={onInputChange}
        placeholder={placeholder}
        onClickProduct={onClickProduct}
        onClearFieldClick={onClearClick}
        history={history}
        clearButtonVisibility={clearButtonVisibility}
      />
      <SearchProductCategoryFilter onClick={onFilterClick} open={isCategoryFilterOpen} />
      <SearchProductSubmitButton onClick={onSearchClick} />
    </div>
  );
};
