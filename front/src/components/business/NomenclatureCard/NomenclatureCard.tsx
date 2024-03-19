import React from 'react';

import dayjs from 'dayjs';
import shallow from 'zustand/shallow';

import { useRemoveFavoriteMutation } from '@/api/hooks/useAPIFavorite';
import { Icon } from '@/components/common/Icon';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { useStore } from '@/stores/store';
import clsxm from '@/utils/clsxm';
import { searchRegex } from '@/utils/regex';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type NomenclatureCardProps = {
  product: Product;
  onClick?: (product: Product) => void;
  onAddFavorite?: (product: Product) => void;
  onRemoveFavorite?: (product: Product) => void;
  searchValue?: string;
};

export const renderMatchedWithSearch = (stringToChange: string, search: string): any => {
  if (!stringToChange.includes(search.toLocaleLowerCase())) {
    return (
      <Typography color="black" size="text-base" desktopSize="text-xs">
        {stringToChange}
      </Typography>
    );
  }

  const numberOccurrence = stringToChange.match(searchRegex(search)) ?? [];
  const matchValue = stringToChange.replace(searchRegex(search), '_');
  const matchValues = matchValue.split('_');
  return numberOccurrence.map((item, i) => (
    <Typography color="black" size="text-base" desktopSize="text-xs" key={item}>
      {matchValues[i]}
      <span className="bg-primary-400 text-white">{item}</span>
      {matchValues[i + 1]}
    </Typography>
  ));
};

export const NomenclatureCard = ({
  product,
  onClick,
  onAddFavorite,
  onRemoveFavorite,
  searchValue,
}: NomenclatureCardProps) => {
  const { favoriteProducts, removeFavoriteProducts } = useStore(
    (state) => ({
      favoriteProducts: state.products.appState.favoriteProducts,
      removeFavoriteProducts: state.removeFavoriteProducts,
    }),
    shallow,
  );

  const removeFavoriteMutation = useRemoveFavoriteMutation({});
  const isInFavorite = favoriteProducts ? favoriteProducts.find((p) => p.id === product.id) : false;

  const onRemove = (id: string) => {
    removeFavoriteProducts(id);
    removeFavoriteMutation.mutate(id);
  };

  return (
    <div
      className={clsxm({
        'relative grid rounded-lg border border-secondary-300 grid-cols-[40px_1fr] md:w-72 p-5 gap-5':
          true,
        'cursor-pointer': onClick,
      })}
      onClick={
        onClick
          ? (e) => {
              e.stopPropagation();
              onClick(product);
            }
          : undefined
      }
    >
      <div className="justify-center flex items-center">
        <SvgIcon name={product.icon ?? 'categoryOther'} />
      </div>

      <div className="absolute top-4 right-4 flex h-7 w-7 items-center cursor-pointer">
        {isInFavorite ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onRemoveFavorite) {
                onRemoveFavorite(product);
              } else {
                onRemove(product.id);
              }
            }}
          >
            <Icon name="etoile" color="link" />
          </button>
        ) : (
          <button
            type="button"
            color="gray"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddFavorite) {
                onAddFavorite(product);
              }
            }}
          >
            <Icon name="empty-star" color="gray" size="xl" />
          </button>
        )}
      </div>

      <div>
        {searchValue ? (
          <Typography color="black" transform="sentence-case" size="text-xs">
            {renderMatchedWithSearch(product.name, searchValue)}
          </Typography>
        ) : (
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.name}
          </Typography>
        )}
        <div className="flex flex-row gap-x-2.5 w-full flex-wrap">
          {product.nomenclatures &&
            product.nomenclatures.map((item, index) => (
              <Typography key={index} color="primary" weight="thin" size="text-xs">
                {item}
              </Typography>
            ))}
        </div>
        <div className="flex flex-col line-clamp-2">
          {searchValue ? (
            renderMatchedWithSearch(
              product.relatedWords.map((item) => item).join(', '),
              searchValue,
            )
          ) : (
            <Typography color="black" transform="sentence-case" size="text-sm">
              {product.relatedWords.map((item) => item).join(', ')}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
