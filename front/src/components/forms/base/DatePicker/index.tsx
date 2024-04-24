import cs from 'classnames';
import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';

import 'react-datepicker/dist/react-datepicker.css';

import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';

type DatePickerProps = {
  inputOptions?: RegisterOptions;
  label: string;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
  horizontal?: boolean;
  tooltipMessage?: string;
} & Omit<ReactDatePickerProps, 'onChange'>;

export const DatePicker = ({
  inputOptions,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  horizontal,
  tooltipMessage,
  ...rest
}: DatePickerProps) => {
  const {
    formState: { errors },
    control
  } = useFormContext();
  const formError = errors[id];

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) {
    defaultDate.setFullYear(defaultYear);
  }
  if (defaultMonth) {
    defaultDate.setMonth(defaultMonth);
  }

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  return (
    <Group id={id} label={label} helperText={helperText} error={formError?.message as unknown as string | undefined} center tooltipMessage={tooltipMessage}>
      <Controller
        control={control}
        rules={inputOptions}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className="relative mt-1">
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                selected={value ? new Date(value) : undefined}
                className={cs(formError && 'error')}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat="dd/MM/yyyy"
                readOnly={readOnly}
                data-testid={`input-${id}`}
                {...rest}
              />
              <HiOutlineCalendar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-lg text-slate-500" />
            </div>
          </>
        )}
      />
    </Group>
  );
};
