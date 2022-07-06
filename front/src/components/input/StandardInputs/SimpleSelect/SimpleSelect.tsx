import { UseFormRegisterReturn } from 'react-hook-form';

export interface Options {
  id: number | string;
  value: string;
}

export interface SimpleSelectOptions {
  disabled?: boolean;
  options: Options[];
  error?: string;
  register?: UseFormRegisterReturn;
  control?: any;
  name: string;
  fullWidth?: boolean;
}

export const SimpleSelect: React.FC<SimpleSelectOptions> = ({
  options,
  disabled,
  error,
  name,
  fullWidth,
  register,
}) => {
  let className = `bg-white relative border border-secondary-300 border-solid rounded-full pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 text-base`;
  className += fullWidth ? ' w-full' : ' w-auto';
  className += error
    ? ' border-red-300 focus:ring-red-500 focus:border-red-500'
    : ' border-secondary-300 focus:ring-transparent focus:border-primary-600';
  className += disabled ? ' text-disabled-text' : '';

  return (
    <select name={name} {...register} className={className} disabled={disabled}>
      {options.map((option, index) => (
        <option key={index} value={option.id}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
