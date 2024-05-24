import clsxm from '@/utils/clsxm';

export interface ICheckboxOptions {
  name: string;
  checked?: boolean;
  variant?: 'agent' | 'public';
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<ICheckboxOptions> = ({
  name,
  checked,
  variant = 'public',
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };
  return (
    <div className="flex items-center space-y-0 space-x-6">
      <input
        data-testid="checkbox-element"
        name={name}
        type="checkbox"
        className={clsxm({
          'h-6 w-6 rounded border-black text-primary-600 focus:ring-transparent disabled:text-disabled-text':
            true,
          'h-4 w-4 rounded-[2px]': variant === 'agent',
        })}
        checked={checked}
        onChange={handleChange}
      />
    </div>
  );
};
