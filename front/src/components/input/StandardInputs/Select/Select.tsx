import React, { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useController, UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../../../common/Icon';
import clsxm from '@/utils/clsxm';

export interface IOptions {
  id: number | string;
  value: string;
}

export interface ISelectOptions {
  placeholder?: string;
  disabled?: boolean;
  options: IOptions[];
  error?: string;
  register?: UseFormRegisterReturn;
  control?: any;
  name: string;
  rules?: any;
  fullWidth?: boolean;
  withBorder?: boolean;
  withListBoxEffect?: boolean;
}

export const Select: React.FC<ISelectOptions> = ({
  placeholder,
  options,
  disabled,
  error,
  control,
  name,
  rules,
  fullWidth,
  withBorder = false,
  withListBoxEffect = false,
}: ISelectOptions) => {
  const { field } = useController({
    control,
    name,
    rules,
  });

  const getSelectedOption = () => {
    return options.find((option) => option.id === field.value) ?? null;
  };

  let classNameOptions =
    'absolute z-10 mt-1 max-h-60 w-full list-none overflow-auto rounded-md bg-white p-0 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none';
  classNameOptions += fullWidth ? ' w-full' : ' w-auto';
  return (
    <Listbox
      disabled={disabled}
      {...field}
      value={getSelectedOption()}
      onChange={(e) => {
        field.onChange(e?.id);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1 flex-col">
            <Listbox.Button
              data-testid="select-element"
              className={twMerge(
                classNames({
                  'bg-white relative rounded-full pl-3 pr-10 py-2.5 text-left focus:outline-none w-auto border-0 focus:ring-0 text-base md:text-xs md:h-10':
                    true,
                  'w-full': fullWidth,
                  'bg-secondary-200 text-secondary-400 cursor-default': disabled,
                  'border border-secondary-300  border-solid': withBorder,
                  'border border-red-500 focus:ring-red-500 focus:border-red-500': error,
                }),
              )}
            >
              <span className={classNames({ 'block truncate ml-2': true, 'text-error': error })}>
                {options.find((option) => option.id === field.value)?.value ?? placeholder}
              </span>
              <span
                className={classNames({
                  'pointer-events-none absolute inset-y-0 right-0 flex p-2.5 pr-5 items-center':
                    true,
                  'text-error': error,
                })}
              >
                {open ? (
                  <Icon name="chevron-thin-up" size="base" />
                ) : (
                  <Icon name="chevron-thin-down" size="base" />
                )}
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
                        active ? 'bg-lightBlue' : 'text-secondary-900',
                        'cursor-default select-none relative py-3 pl-2 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected: selectedValue, active }) => (
                      <span
                        className={clsxm({
                          'block truncate text-base md:text-xs font-normal': true,
                          'font-semibold bg-lightBlue': selectedValue,
                          'bg-lightBlue': active,
                        })}
                      >
                        {option.value}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>

            {withListBoxEffect && (
              <motion.div
                initial={{
                  height: '0px',
                }}
                animate={{
                  height: open ? '240px' : '0px',
                }}
                transition={{ duration: 0.1 }}
              />
            )}
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
