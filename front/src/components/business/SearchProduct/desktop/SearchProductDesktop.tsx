import React, { useState } from 'react';

import { CategoryFilterButton } from './CategoryFilterButton';
import { SearchInputField } from './SearchInputField';
import { SubmitSearchButton } from './SubmitSearchButton';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchProductDesktopProps {
  onSearchProduct: (searchValue: string) => SearchType<Product>[];
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  onFilterClick?: (isOpen: boolean) => void;
  onSearchAllClick?: (searchValue: string) => void;
  placeholder?: string;
}

export const SearchProductDesktop = ({
  onSearchProduct,
  onClickProduct,
  onFilterClick,
  onSearchAllClick,
  placeholder,
}: SearchProductDesktopProps) => {
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
      />
      <CategoryFilterButton onClick={onFilterClick} />
      <SubmitSearchButton onClick={onSearchClick} />
    </div>
  );
};
