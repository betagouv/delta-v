import React, { useEffect, useState } from 'react';

import { SearchHistoryProducts } from './product/SearchHistoryProducts';
import { SearchResultProducts } from './product/SearchResultProducts';
import { useGetSearchProductHistory } from '@/api/hooks/useAPIProducts';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { IdRequiredProduct, Product } from '@/model/product';
import { SearchType } from '@/utils/search';
import { getStringOrUndefined } from '@/utils/string';

type SearchDisplayType = 'product' | 'global';
interface SearchProductProps<T> {
  onSearch: (searchValue: string) => SearchType<T>[];
  onChange?: (displayResult: boolean) => void;
  onSearchAll?: (search: string) => void;
  onClickProduct?: (product: IdRequiredProduct, search: string) => void;
  placeholder?: string;
  withSearchIcon?: boolean;
  autoFocus?: boolean;
  searchType?: SearchDisplayType;
  disabled?: boolean;
}

const getResultsLabel = (itemCount: number): string | undefined => {
  if (itemCount === 0) {
    return 'Aucun résultat';
  }
  if (itemCount === 1) {
    return 'Voir 1 résultat';
  }
  if (itemCount > 1) {
    return `Voir les ${itemCount} résultats`;
  }
  return undefined;
};

export const SearchProductMobile: React.FC<SearchProductProps<any>> = <T extends unknown>({
  onSearch,
  onChange = () => {},
  onSearchAll = () => {},
  onClickProduct = () => {},
  autoFocus = false,
  disabled = false,
  placeholder = '',
}: SearchProductProps<T>) => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [resultSearch, setResultSearch] = useState<SearchType<T>[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const productsThatMatch = onSearch(searchValue ?? '');
    setResultSearch(productsThatMatch);
  }, [searchValue]);

  useEffect(() => {
    const displayResults = !!searchValue;
    onChange(displayResults);
  }, [resultSearch]);

  const { data: history } = useGetSearchProductHistory();

  const isFocusedEmpty = isFocused && !searchValue;
  const showSearchResults = !!searchValue && resultSearch.length > 0;
  const showSearchHistory = !!history && (isFocusedEmpty || !!searchValue) && history.length > 0;

  return (
    <>
      <div
        data-testid="search-element"
        className="items-between flex flex-col h-full overflow-y-auto"
      >
        <div className={`flex flex-col p-5 pb-6 bg-secondary-bg rounded-t-3xl`}>
          <div className="text-black flex flex-row items-center gap-2 ml-5">
            <Icon name="search" size="base" />
            <Typography color="black" size="text-base" weight="bold">
              Recherche
            </Typography>
          </div>
          <input
            data-testid="input-search-element"
            placeholder={placeholder}
            disabled={disabled}
            enterKeyHint="search"
            className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-placeholder focus:border-secondary-300 focus:outline-none  focus:ring-transparent mt-2 border-none"
            onChange={(event) => {
              setSearchValue(getStringOrUndefined(event.target.value));
              onSearch(event.target.value);
            }}
            autoFocus={autoFocus}
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsFocused(false);
              }, 100)
            }
          />
        </div>
        <div className="p-5 flex-1">
          {showSearchResults && (
            <SearchResultProducts
              resultSearch={resultSearch as unknown as SearchType<Product>[]}
              search={searchValue}
              onClickProduct={onClickProduct}
            />
          )}
          {showSearchResults && showSearchHistory && <div className="border-t my-8" />}
          {showSearchHistory && (
            <SearchHistoryProducts history={history} onClickProduct={onClickProduct} />
          )}
        </div>
      </div>
      <div className="w-full flex justify-center relative pt-5 pb-[30px]">
        {!!searchValue &&
          (resultSearch.length > 0 ? (
            <div className="text-center min-w-[176px]">
              <Button
                onClick={() => onSearchAll(searchValue)}
                disabled={resultSearch.length === 0}
                fullWidth
              >
                {getResultsLabel(resultSearch.length)}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 px-4">
                <Typography color="secondary" size="text-lg">
                  Aucun résultat ne semble correspondre à votre recherche.
                </Typography>
                <Typography color="secondary" size="text-lg">
                  Ajouter votre achat en cliquant sur le bouton ci-dessous.
                </Typography>
              </div>
              <div className=" flex w-full flex-col items-center">
                <div className="flex w-60 flex-col">
                  <Link to={`/agent/declaration/produits/ajout?searchValue=${searchValue}`}>
                    <Button fullWidth>Enregistrer votre produit</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
