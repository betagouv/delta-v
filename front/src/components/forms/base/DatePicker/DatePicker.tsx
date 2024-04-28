import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

import { InputGroup } from '../../helper/InputGroup';
import { Icon } from '@/components/atoms/Icon';
import clsxm from '@/utils/clsxm';

type DatePickerProps = {
  validation?: RegisterOptions;
  label: string;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
} & Omit<ReactDatePickerProps, 'onChange'>;

export const DatePicker = ({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  ...rest
}: DatePickerProps) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const formError = errors[id];

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <InputGroup
      id={id}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      noErrorIcon
    >
      <Controller
        control={control}
        rules={validation}
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
                className={clsxm(formError && 'error')}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                openToDate={value ? new Date(value) : defaultDate}
                dateFormat="dd/MM/yyyy"
                readOnly={readOnly}
                {...rest}
              />
              <Icon name="calendar" />
            </div>
          </>
        )}
      />
    </InputGroup>
  );
};
