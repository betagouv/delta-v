import { useState } from 'react';

import { Combobox } from '@headlessui/react';
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
        <Combobox.Button className={classNames(fullWidth ? 'w-full' : 'w-fit')}>
          <Combobox.Input
            className={classNameCombobox}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option?: Options) => option?.value ?? ''}
          />
        </Combobox.Button>
        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md p-0 py-1 text-base focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                value={option}
                className="relative cursor-default select-none py-2 pl-3 pr-9"
              >
                {({ selected }) => (
                  <>
                    <span className={classNames('block truncate', selected && 'font-semibold')}>
                      {option.value}
                    </span>

                    <input
                      id="candidates"
                      aria-describedby="candidates-description"
                      name="candidates"
                      type="checkbox"
                      className="absolute inset-y-0 right-4 flex h-6 w-6 items-center rounded border-gray-500 pr-4 text-primary-600"
                      checked={selected}
                    />
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
