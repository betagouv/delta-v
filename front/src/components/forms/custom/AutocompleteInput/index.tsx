import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { FieldError, FieldErrorsImpl, Merge, useController, useFormContext } from 'react-hook-form';

import { SuggestionsContainer } from './SuggestionsContainer';
import { Suggestion, getMatchingResult } from './utils';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

const getInputError = (
  labelError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>,
  valueError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>,
  // eslint-disable-next-line consistent-return
) => {
  if (labelError) {
    return labelError.message as unknown as string;
  }
  if (valueError) {
    return valueError.message as unknown as string;
  }
  return undefined;
};

export type AutocompleteInputProps = {
  options: Suggestion[];
  onItemClick?: (item: Suggestion) => void;
  onOutsideClick?: () => void;
  disableClickOnDisabledItem?: boolean;
  className?: string;
  horizontal?: boolean;
  label?: string;
  labelId: string;
  valueId: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  defaultValue?: string;
  disabledItemSubmitError?: string;
  hideNoMatchError?: boolean;
  tooltipMessage?: string;
  searchFn?: (searchValue: string, options: Suggestion[]) => Suggestion[];
  defaultItemId?: string;
  favoriteItemIds?: string[];
  defaultItemHelperText?: string;
  favoritesTitle?: string;
};

export const AutocompleteInput = ({
  options,
  onItemClick,
  onOutsideClick,
  disableClickOnDisabledItem,
  className,
  horizontal,
  label,
  placeholder = '',
  helperText,
  defaultValue,
  labelId,
  valueId,
  required = false,
  disabledItemSubmitError,
  hideNoMatchError,
  tooltipMessage,
  searchFn = getMatchingResult,
  defaultItemId,
  favoriteItemIds,
  defaultItemHelperText,
  favoritesTitle,
}: AutocompleteInputProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showNoMatchError, setShowNoMatchError] = useState(false);

  const { field: fieldLabel } = useController({
    control,
    name: labelId,
  });

  const { field: fieldValue } = useController({
    control,
    name: valueId,
  });

  const searchValue = watch(labelId);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };
  const isInputFocused = () => {
    return document.activeElement === inputRef.current;
  };

  const labelError = errors[labelId];
  const valueError = errors[valueId];

  const error =
    getInputError(labelError, hideNoMatchError ? undefined : valueError) ||
    (isSelectionDisabled && disabledItemSubmitError) ||
    undefined;

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  const onDropdownClick = () => {
    setTimeout(() => {
      if (suggestions.length > 0) {
        setSuggestions([]);
      } else {
        setSuggestions(options);
        focusInput();
      }
    }, 50);
  };

  const onInputFocus = () => {
    if (searchValue) {
      const matchingResults = searchFn(searchValue, options);
      setSuggestions(matchingResults);
    } else {
      setSuggestions(options);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    fieldLabel.onChange(e.target.value);
    if (fieldValue.value) {
      fieldValue.onChange(undefined);
    }
  };

  const onSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.disabled && disableClickOnDisabledItem) {
      return;
    }
    fieldLabel.onChange(suggestion.label);
    fieldValue.onChange(suggestion.value);
    setSuggestions([]);
    if (onItemClick) {
      onItemClick(suggestion);
    }
  };

  useEffect(() => {
    if (!isInputFocused()) {
      return;
    }
    if (searchValue) {
      const matchingResults = searchFn(searchValue, options);
      setSuggestions(matchingResults);
      if (!showNoMatchError && matchingResults.length === 0) {
        setShowNoMatchError(true);
      }
      if (showNoMatchError && matchingResults.length > 0) {
        setShowNoMatchError(false);
      }
    } else {
      setSuggestions(options);
    }
  }, [searchValue]);

  useEffect(() => {
    if (fieldValue.value) {
      const selection = options.find((option) => option.value === fieldValue.value);
      if (selection) {
        setIsSelectionDisabled(!!selection.disabled);
      }
    } else {
      setIsSelectionDisabled(false);
    }
  }, [fieldValue.value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setSuggestions([]);
        setShowNoMatchError(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Group
      id={labelId}
      required={required}
      label={label}
      helperText={helperText}
      error={error}
      center
      tooltipMessage={tooltipMessage}
      preventFocusOnLabelClick
    >
      <div className="w-full relative" ref={containerRef}>
        <input
          ref={inputRef}
          data-testid={`input-${labelId}`}
          type="text"
          name={labelId}
          id={labelId}
          placeholder={placeholder}
          aria-describedby={labelId}
          onChange={onInputChange}
          defaultValue={defaultValue}
          className={className}
          onFocus={onInputFocus}
          autoComplete="off"
          value={searchValue}
        />
        <div className="absolute right-5 top-[5px] cursor-pointer" onClick={onDropdownClick}>
          <Icon name="search" size="sm" color="grey" />
        </div>
        {suggestions.length > 0 && (
          <SuggestionsContainer
            items={suggestions}
            searchValue={searchValue ?? ''}
            onItemClick={onSuggestionClick}
            disableClickOnDisabledItem={disableClickOnDisabledItem}
            onOutsideClick={onOutsideClick}
            defaultItemId={defaultItemId}
            favoriteItemIds={favoriteItemIds}
            defaultItemHelperText={defaultItemHelperText}
            favoritesTitle={favoritesTitle}
          />
        )}
        {showNoMatchError && (
          <div className="flex pl-4 h-10 items-center">
            <Typography
              color="middle-gray"
              size="text-xs"
              desktopSize="text-xs"
              italic
            >{`Aucun résultat pour "${searchValue}"`}</Typography>
          </div>
        )}
      </div>
    </Group>
  );
};
