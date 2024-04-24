import { useState } from 'react';

import { CategoryProductDesktop } from '../../CategoryProduct/CategoryProductDesktop';
import { FavoriteProducts } from '../../FavoriteProducts';
import { OnAddProduct } from '../../ModalAddProductCartDeclaration';
import { SearchProductCategoryFilter } from './SearchProductCategoryFilter';
import { ClearButtonVisibilityType, SearchInputField } from './SearchProductInputField';
import { SearchProductSubmitButton } from './SearchProductSubmitButton';
import { SearchProductHistoryItem } from '@/api/lib/products';
import { IdRequiredProduct, Product } from '@/model/product';
import { ProductSearchContext } from '@/utils/enums';
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
  showCategoryFilters?: boolean;
  onCloseCategoryNomenclatureModal?: () => void;
  onCloseDeclarationProductCartModal?: () => void;
  onOpenCategoryNomenclatureModal?: (product: Product) => void;
  onOpenDeclarationProductCartModal?: (product: Product) => void;
  onAddProduct: OnAddProduct;
  variant?: ProductSearchContext;
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
  showCategoryFilters,
  onCloseCategoryNomenclatureModal,
  onCloseDeclarationProductCartModal,
  onOpenCategoryNomenclatureModal,
  onOpenDeclarationProductCartModal,
  onAddProduct,
  variant,
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
    <div className="w-full flex flex-col gap-[10px]">
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

      <FavoriteProducts
        onFavoriteClick={
          variant === ProductSearchContext.DECLARATION
            ? onOpenDeclarationProductCartModal
            : onOpenCategoryNomenclatureModal
        }
      />

      {showCategoryFilters && (
        <CategoryProductDesktop
          onNomenclatureModalClose={onCloseCategoryNomenclatureModal}
          onDeclarationModalClose={onCloseDeclarationProductCartModal}
          onAddProductToDeclaration={onAddProduct}
          variant={variant}
        />
      )}
    </div>
  );
};
