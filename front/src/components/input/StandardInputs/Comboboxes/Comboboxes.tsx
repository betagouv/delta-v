import { useState } from 'react';

import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

export interface Options {
  id: number | string;
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
  const [selectedOption, setSelectedOption] = useState({ id: null, value: '' });
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

  const className = fullWidth ? 'w-full' : 'max-w-fit';
  let classNameCombobox =
    'w-full border bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none rounded-full';
  classNameCombobox += error
    ? ' border-red-300 focus:ring-red-500 focus:border-red-500'
    : ' border-secondary-300 focus:ring-primary-600 focus:border-primary-600';
  classNameCombobox += disabled ? ' bg-secondary-200 text-secondary-400' : '';

  return (
    <Combobox
      data-testid="comboboxes-element"
      className={className}
      as="div"
      value={selectedOption}
      onChange={(e) => {
        if (e.id) {
          field.onChange(e?.id);
          setSelectedOption(e);
        }
      }}
    >
      <div className="relative mt-1">
        <Combobox.Input
          className={classNameCombobox}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option?: Options) => option?.value ?? ''}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>
        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-primary-600' : 'text-secondary-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>
                      {option.value}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          active ? 'text-white' : 'text-primary-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};
