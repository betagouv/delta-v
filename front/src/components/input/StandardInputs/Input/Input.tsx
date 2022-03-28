import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputOptions {
  placeholder?: string;
  id?: string;
  name: string;
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'date'
    | 'datetime'
    | 'email'
    | 'tel'
    | 'file'
    | 'checkbox'
    | 'radio';
  disabled?: boolean;
  value?: string;
  error?: string;
  register?: UseFormRegisterReturn;
}

export const Input: React.FC<IInputOptions> = ({
  placeholder,
  id,
  name,
  type,
  disabled,
  value,
  error,
  register,
}: IInputOptions) => (
  <div>
    <div className="relative rounded-md p-1">
      <input
        id={id ?? name}
        name={name}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        value={value}
        className={`border-secondary-300 border block border-solid w-full sm:text-sm rounded-md p-2  focus:outline-none  focus:ring-1 ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
            : ' focus:ring-blue-300 focus:border-blue-300'
        }`}
        {...register}
      />
    </div>
  </div>
);

export default Input;
