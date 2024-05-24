import { UseFormRegisterReturn } from 'react-hook-form';

import clsxm from '@/utils/clsxm';

export interface ICheckboxInputOptions {
  name: string;
  disabled?: boolean;
  error?: string;
  register?: UseFormRegisterReturn;
  variant?: 'agent' | 'public';
}

export const CheckboxInput: React.FC<ICheckboxInputOptions> = ({
  register,
  name,
  disabled,
  variant = 'public',
}) => {
  return (
    <div className="flex items-center space-y-0 space-x-6">
      <input
        data-testid="checkbox-element"
        name={name}
        type="checkbox"
        disabled={disabled}
        className={clsxm({
          'h-6 w-6 rounded border-black text-primary-600 focus:ring-transparent disabled:text-disabled-text':
            true,
          'h-4 w-4 rounded-[2px]': variant === 'agent',
        })}
        {...register}
      />
    </div>
  );
};
