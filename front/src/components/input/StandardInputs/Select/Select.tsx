import React, { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '../../../common/Icon';

export interface IOptions {
  id: number | string;
  value: string;
}

export interface ISelectOptions {
  disabled?: boolean;
  options: IOptions[];
  error?: string;
  register?: UseFormRegisterReturn;
  control?: any;
  name: string;
  rules?: any;
}

export const Select: React.FC<ISelectOptions> = ({
  options,
  disabled,
  error,
  control,
  name,
  rules,
}: ISelectOptions) => {
  const [selected, setSelected] = useState(options[0]);
  const { field } = useController({
    control,
    name,
    rules,
  });
  return (
    <div className="relative rounded-md p-1">
      <Listbox
        disabled={disabled}
        {...field}
        value={selected}
        onChange={(e) => {
          field.onChange(e?.id);
          setSelected(e);
        }}
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                className={`bg-white relative w-full border border-gray-300 border-solid rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm ${
                  error
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-secondary-300 focus:ring-blue-300 focus:border-blue-300'
                } ${disabled ? 'bg-secondary-200 text-secondary-400' : ''}`}
              >
                <span className="block truncate">{selected?.value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Icon name="chevron-thin-down" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full list-none overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-primary-600' : 'text-secondary-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9',
                        )
                      }
                      value={option}
                    >
                      {({ selected: selectedValue, active }) => (
                        <>
                          <span
                            className={classNames(
                              selectedValue ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {option.value}
                          </span>

                          {selectedValue ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-primary-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-6 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
