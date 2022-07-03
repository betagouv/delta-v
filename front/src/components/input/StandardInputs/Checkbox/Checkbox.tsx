import { UseFormRegisterReturn } from 'react-hook-form';

export interface ICheckboxOptions {
  name: string;
  disabled?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
}

export const Checkbox: React.FC<ICheckboxOptions> = ({ register, name, disabled }) => {
  return (
    <div className="flex items-center space-y-0 space-x-6">
      <input
        data-testid="checkbox-element"
        name={name}
        type="checkbox"
        disabled={disabled}
        className="h-6 w-6 rounded border-black text-primary-600 focus:ring-transparent disabled:text-disabled-text"
        {...register}
      />
    </div>
  );
};
