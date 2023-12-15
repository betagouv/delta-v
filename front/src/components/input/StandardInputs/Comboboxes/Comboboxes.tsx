import { useEffect, useState } from 'react';

import classNames from 'classnames';
import Fuse from 'fuse.js';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '@/components/common/Icon';

export interface Options {
  id: number | string | null;
  value: string;
  alternatives?: string[];
}

export interface ComboboxesOptions {
  disabled?: boolean;
  options: Options[];
  error?: string;
  register?: UseFormRegisterReturn;
  control?: any;
  name: string;
  rules?: any;
  fullWidth?: boolean;
  placeholder?: string;
  trailingIcon?: string;
}

export const Comboboxes: React.FC<ComboboxesOptions> = ({
  options,
  disabled,
  error,
  control,
  name,
  rules,
  fullWidth,
  placeholder,
  trailingIcon,
}) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Options[]>([]);
  const { field } = useController({
    control,
    name,
    rules,
  });

  useEffect(() => {
    if (query === '') {
      setFilteredOptions(options);
    } else {
      const fuse = new Fuse(options, {
        includeScore: true,
        minMatchCharLength: 2,
        threshold: 0.5,
        keys: ['value', 'alternatives'],
      });
      const result = fuse.search(query);

      setFilteredOptions(result.map((item) => item.item));
    }
  }, [query]);

  const className = classNames(fullWidth ? 'w-full' : 'max-w-fit');
  let classNameCombobox =
    'w-full border py-2 pl-3 pr-10 focus:outline-none rounded-full placeholder:italic placeholder:text-secondary-400 placeholder:font-light';
  classNameCombobox += error
    ? ' border-red-500 focus:ring-red-500 focus:border-red-500'
    : ' border-secondary-300';
  classNameCombobox += disabled ? ' bg-secondary-200 text-secondary-400' : '';

  return (
    <div data-testid="comboboxes-element" className={className}>
      <div className="relative mt-1">
        <input
          className={classNames(fullWidth ? 'w-full' : 'w-fit', classNameCombobox)}
          enterKeyHint="search"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          disabled={disabled}
          placeholder={placeholder}
          value={field.value}
        />
        {trailingIcon && (
          <div className="absolute inset-y-0 right-0 z-10 flex h-full w-9 items-center pr-4">
            {query.length === 0 ? (
              <Icon name={trailingIcon} />
            ) : (
              <div>
                <Icon name="cross-thin" onClick={() => setQuery('')} />
              </div>
            )}
          </div>
        )}
        {filteredOptions.length > 0 && query.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-0 py-1 text-base">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex cursor-pointer flex-row py-2 px-3"
                onClick={() => {
                  field.onChange(option.id);
                  setTimeout(() => {
                    setFilteredOptions([]);
                  }, 250);
                }}
              >
                <span
                  className={classNames(
                    'block truncate flex-1',
                    option.id === field.value && 'font-semibold',
                  )}
                >
                  {option.value}
                </span>

                <input
                  id="candidates"
                  aria-describedby="candidates-description"
                  name="candidates"
                  type="checkbox"
                  className="h-6 w-6 items-center rounded border-gray-500 pr-4 text-primary-600 focus:ring-transparent"
                  checked={option.id === field.value}
                  onChange={() => {}}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
