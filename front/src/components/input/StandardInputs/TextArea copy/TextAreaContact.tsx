import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

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
  register?: UseFormRegisterReturn;
}

export const TextAreaContact: React.FC<ITextAreaOptions> = ({
  placeholder,
  name,
  disabled,
  error,
  rows,
  specificClassName,
  register,
}) => {
  return (
    <div className="p-1">
      <textarea
        data-testid="textarea-element"
        rows={rows}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className={`${
          specificClassName ??
          `bg-secondary-100 focus:outline-none placeholder:text-disabled-text border-none resize-none min-h-[288px] ${
            error
              ? 'border-error text-error placeholder:text-red-300 focus:border-error focus:outline-none focus:ring-error'
              : ''
          } block w-full rounded-[10px] p-5 text-xs placeholder:italic focus:border-none selection:focus:border-none`
        }`}
        {...register}
        name={name}
      />
    </div>
  );
};
export default TextAreaContact;
