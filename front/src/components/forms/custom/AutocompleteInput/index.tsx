import * as React from 'react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { FieldError, FieldErrorsImpl, Merge, useController, useFormContext } from 'react-hook-form';

import { Suggestion, SuggestionsContainer } from './SuggestionsContainer';
import { Icon } from '@/components/atoms/Icon';
import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';
import clsxm from '@/utils/clsxm';

const findStringsStartingWithSearchStrings = (searchStrings: string[], strings: string[]) => {
  return searchStrings.some((searchStringPart) => {
    return strings.some((stringPart) => stringPart.startsWith(searchStringPart));
  });
};

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
}: AutocompleteInputProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

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

  const getMatchingResult = (sv: string) => {
    return options.filter((option) => {
      const searchValueParts = sv.split(' ').filter((part) => part.trim() !== '');
      const optionParts = option.label.split(' ').filter((part) => part.trim() !== '');

      const flattenedSearchValueParts = searchValueParts.flatMap((part) => part.toLowerCase());
      const flattenedNameParts = optionParts.flatMap((part) => part.toLowerCase());

      return findStringsStartingWithSearchStrings(flattenedSearchValueParts, flattenedNameParts);
    });
  };

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
      const matchingResults = getMatchingResult(searchValue);
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
      const matchingResults = getMatchingResult(searchValue);
      setSuggestions(matchingResults);
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
          className={clsxm(className, { 'font-bold': fieldValue.value })}
          onFocus={onInputFocus}
          autoComplete="off"
          value={searchValue}
        />
        <div className="absolute right-2 top-3 cursor-pointer" onClick={onDropdownClick}>
          <Icon name="chevron-down" />
        </div>
        {suggestions.length > 0 && (
          <SuggestionsContainer
            items={suggestions}
            onItemClick={onSuggestionClick}
            disableClickOnDisabledItem={disableClickOnDisabledItem}
            onOutsideClick={onOutsideClick}
          />
        )}
      </div>
    </Group>
  );
};
