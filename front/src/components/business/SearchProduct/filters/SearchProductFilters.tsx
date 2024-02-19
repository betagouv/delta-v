import { useState } from 'react';

import { SearchProductCategoryFilter } from './SearchProductCategoryFilter';
import { SearchInputField } from './SearchProductInputField';
import { SearchProductSubmitButton } from './SearchProductSubmitButton';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchProductFilterBarProps {
  onSearchProduct: (searchValue: string) => SearchType<Product>[];
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  onFilterClick?: () => void;
  onSearchAllClick?: (searchValue: string) => void;
  placeholder?: string;
  isCategoryFilterOpen?: boolean;
}

export const SearchProductFilterBar = ({
  onSearchProduct,
  onClickProduct,
  onFilterClick,
  onSearchAllClick,
  placeholder,
  isCategoryFilterOpen,
}: SearchProductFilterBarProps) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const onInputChange = (value: string) => {
    setSearchValue(value);
  };

  const onSearchClick = () => {
    if (onSearchAllClick) {
      onSearchAllClick(searchValue);
    }
  };

  return (
    <div className="h-[40px] w-full flex items-center gap-[10px]">
      <SearchInputField
        onSearchProduct={onSearchProduct}
        onFieldChange={onInputChange}
        placeholder={placeholder}
        onClickProduct={onClickProduct}
        onClearFieldClick={() => setSearchValue('')}
      />
      <SearchProductCategoryFilter onClick={onFilterClick} open={isCategoryFilterOpen} />
      <SearchProductSubmitButton onClick={onSearchClick} />
    </div>
  );
};
