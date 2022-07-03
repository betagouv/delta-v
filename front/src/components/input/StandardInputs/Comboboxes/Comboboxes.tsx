import { useState } from 'react';

import classNames from 'classnames';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

export interface Options {
  id: number | string | null;
  value: string;
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
}

export const Comboboxes: React.FC<ComboboxesOptions> = ({
  options,
  disabled,
  error,
  control,
  name,
  rules,
  fullWidth,
}) => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<Options>({ id: null, value: '' });
  const { field } = useController({
    control,
    name,
    rules,
  });

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.value.toLowerCase().includes(query.toLowerCase());
        });

  const className = classNames(fullWidth ? 'w-full' : 'max-w-fit');
  let classNameCombobox = 'w-full border py-2 pl-3 pr-10 shadow-sm focus:outline-none rounded-full';
  classNameCombobox += error
    ? ' border-red-300 focus:ring-red-500 focus:border-red-500'
    : ' border-secondary-300';
  classNameCombobox += disabled ? ' bg-secondary-200 text-secondary-400' : '';

  return (
    <div data-testid="comboboxes-element" className={className}>
      <div className="relative mt-1">
        <input
          className={classNames(fullWidth ? 'w-full' : 'w-fit', classNameCombobox)}
          onChange={(event) => setQuery(event.target.value)}
          disabled={disabled}
        />
        {filteredOptions.length > 0 && query.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md p-0 py-1 text-base">
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="flex cursor-pointer flex-row py-2 px-3"
                onClick={() => {
                  const wasAlreadyChecked = option.id === selectedOption.id;
                  const newSelectedOption = wasAlreadyChecked ? { id: null, value: '' } : option;
                  setSelectedOption(newSelectedOption);
                  field.onChange(option.id);
                }}
              >
                <span
                  className={classNames(
                    'block truncate flex-1',
                    option.id === selectedOption.id && 'font-semibold',
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
                  checked={option.id === selectedOption.id}
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
