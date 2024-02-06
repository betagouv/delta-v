import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import clsxm from '@/utils/clsxm';

export interface ITextAreaOptions
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  placeholder?: string;
  id?: string;
  name: string;
  disabled?: boolean;
  error?: string;
  rows?: number;
  specificClassName?: string;
  additionalClassName?: string;
  register?: UseFormRegisterReturn;
}

export const TextArea: React.FC<ITextAreaOptions> = ({
  placeholder,
  name,
  disabled,
  error,
  rows,
  specificClassName,
  additionalClassName,
  register,
}) => {
  const mergedClassname = clsxm(
    {
      'bg-secondary-bg focus:outline-none placeholder:text-disabled-text border-none resize-none min-h-[288px] block w-full rounded-[10px] p-5 text-xs placeholder:italic focus:border-none focus:ring-0':
        true,
      'border-error text-error placeholder:text-red-300 focus:border-error focus:outline-none focus:ring-error focus:ring-1 ring-1 ring-error':
        error,
    },
    additionalClassName,
  );

  return (
    <textarea
      data-testid="textarea-element"
      rows={rows}
      id={name}
      placeholder={placeholder}
      disabled={disabled}
      className={specificClassName ?? mergedClassname}
      // className={`${
      //   specificClassName ??
      //   `bg-secondary-bg focus:outline-none placeholder:text-disabled-text border-none resize-none min-h-[288px] ${
      //     error
      //       ? 'border-error text-error placeholder:text-red-300 focus:border-error focus:outline-none focus:ring-error'
      //       : ''
      //   } block w-full rounded-[10px] p-5 text-xs placeholder:italic focus:border-none selection:focus:border-none`
      // }`}
      {...register}
      name={name}
    />
  );
};
export default TextArea;
