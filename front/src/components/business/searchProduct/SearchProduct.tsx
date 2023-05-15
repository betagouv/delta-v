import React from 'react';

import { Icon } from '@/components/common/Icon';

type SearchDisplayType = 'product' | 'global';
interface SearchProductProps {
  onSearch: (searchValue: string) => void;
  placeholder?: string;
  withSearchIcon?: boolean;
  autoFocus?: boolean;
  searchType?: SearchDisplayType;
  disabled?: boolean;
}

export const SearchProduct: React.FC<SearchProductProps> = ({
  onSearch,
  placeholder = '',
  autoFocus = false,
  disabled = false,
  withSearchIcon = false,
}: SearchProductProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4" data-testid="search-element">
      <div className="relative">
        <input
          className="w-full rounded-full border border-secondary-300 py-2 pl-3 pr-10 placeholder:font-light placeholder:italic placeholder:text-secondary-400 focus:border-secondary-300 focus:outline-none focus:ring-transparent"
          autoFocus={autoFocus}
          enterKeyHint="search"
          data-testid="input-search-element"
          placeholder={placeholder}
          onChange={(event) => onSearch(event.target.value)}
          disabled={disabled}
        />
      </div>

      {withSearchIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full w-9 items-center pr-4">
          <Icon name="search" />
        </div>
      )}
    </div>
  );
};
