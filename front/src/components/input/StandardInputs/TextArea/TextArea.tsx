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

export const TextArea: React.FC<ITextAreaOptions> = ({
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
          `border-secondary-300 border focus:outline-none focus:ring-1  ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
              : 'focus:ring-primary-600 focus:border-primary-600'
          } block w-full text-base rounded-md p-2`
        }`}
        {...register}
        name={name}
      />
    </div>
  );
};
export default TextArea;
