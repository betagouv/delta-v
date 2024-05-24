import React, { useEffect, useMemo, useRef } from 'react';

import { Suggestion, checkDisableClick as checkIsClickDisabled, getRenderedOption } from './utils';
import { Typography } from '@/components/atoms/Typography';

type Props = {
  items: Suggestion[];
  onItemClick: (item: Suggestion) => void;
  searchValue: string;
  defaultItemId?: string;
  defaultItemHelperText?: string;
  favoriteItemIds?: string[];
  favoritesTitle?: string;
  onOutsideClick?: () => void;
  disableClickOnDisabledItem?: boolean;
};

export const SuggestionsContainer: React.FC<Props> = ({
  items,
  onItemClick,
  searchValue,
  defaultItemId,
  defaultItemHelperText = 'Par défaut',
  favoriteItemIds,
  favoritesTitle = 'Favoris',
  onOutsideClick,
  disableClickOnDisabledItem = false,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onClick = (item: Suggestion) => {
    const disableClick = checkIsClickDisabled(item, disableClickOnDisabledItem);
    if (!disableClick) {
      onItemClick(item);
    }
  };

  const formattedOptions = useMemo(() => {
    const defaultOption = items.find((item) => item.value === defaultItemId);
    const formattedDefaultOption = defaultOption && {
      value: defaultOption.value,
      label: getRenderedOption({
        item: defaultOption,
        disableClick: checkIsClickDisabled(defaultOption, disableClickOnDisabledItem),
        onOptionClick: onClick,
        helperText: defaultItemHelperText,
      }),
    };
    const formattedAllOptions = items.map((item) => {
      const disableClick = checkIsClickDisabled(item, disableClickOnDisabledItem);
      const renderedOption = getRenderedOption({ item, disableClick, onOptionClick: onClick });
      return { value: item.value, label: renderedOption };
    });
    const formattedFavoritesOptions = formattedAllOptions.filter((item) =>
      favoriteItemIds?.includes(item.value),
    );
    return {
      all: formattedAllOptions,
      default: formattedDefaultOption,
      favorites: formattedFavoritesOptions,
    };
  }, [items, defaultItemId, favoriteItemIds, disableClickOnDisabledItem]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        if (onOutsideClick) {
          onOutsideClick();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="z-10 flex flex-col bg-white w-full overflow-y-scroll md:max-h-[205px] max-h-[calc(100vh-200px)] top-9"
      ref={containerRef}
    >
      {searchValue === '' && formattedOptions.default && (
        <div>{formattedOptions.default.label}</div>
      )}
      {searchValue === '' && formattedOptions.favorites.length > 0 && (
        <div>
          <div className="flex pl-4 h-7 items-center">
            <Typography color="placeholder" size="text-xs" desktopSize="text-xs" italic>
              {favoritesTitle}
            </Typography>
          </div>
          {formattedOptions.favorites.map((favorite) => (
            <div key={favorite.value}>{favorite.label}</div>
          ))}
        </div>
      )}
      {searchValue !== '' && items.length > 0 && (
        <div className="flex-col flex">
          {formattedOptions.all.map((item) => (
            <div key={item.value}>{item.label}</div>
          ))}
        </div>
      )}
    </div>
  );
};
