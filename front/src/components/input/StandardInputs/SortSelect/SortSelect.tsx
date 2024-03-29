import React, { Fragment, useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useController, UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '../../../atoms/Icon';

export interface IOptions {
  id: number | string;
  value: string;
}

export interface ISortSelectOptions {
  disabled?: boolean;
  options: IOptions[];
  error?: string;
  register?: UseFormRegisterReturn;
  control?: any;
  name: string;
  rules?: any;
  fullWidth?: boolean;
}

export const SortSelect: React.FC<ISortSelectOptions> = ({
  options,
  disabled,
  error,
  control,
  name,
  rules,
  fullWidth,
}: ISortSelectOptions) => {
  const [selected, setSortSelected] = useState(options[0]);
  const { field } = useController({
    control,
    name,
    rules,
  });

  let classNameButton = `min-w-[200px] bg-white relative rounded-full pl-3 pr-10 py-2 text-left cursor-default text-primary-600 text-base`;
  classNameButton += fullWidth ? ' w-full' : ' w-auto';
  classNameButton += error ? ' text-red-300' : '';
  classNameButton += disabled ? ' bg-secondary-200 text-secondary-400' : '';

  let classNameOptions =
    'absolute z-10 mt-1 max-h-60 w-full list-none overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm';
  classNameOptions += fullWidth ? ' w-full' : ' w-auto';
  return (
    <Listbox
      disabled={disabled}
      {...field}
      value={selected}
      onChange={(e) => {
        field.onChange(e?.id);
        setSortSelected(e);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button data-testid="select-element" className={classNameButton}>
              <span className="block truncate">{selected?.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex p-2.5">
                {open ? <Icon name="chevron-thin-up" /> : <Icon name="chevron-thin-down" />}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className={classNameOptions}>
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
  );
};

export default SortSelect;
