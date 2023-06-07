import classNames from 'classnames';

import { Icon } from '@/components/common/Icon';
import { SvgNames } from '@/components/common/SvgIcon';

export interface IRadioCardMinOptions {
  value: string;
  disabled?: boolean;
  checked?: boolean;
  svgIcon: SvgNames;
  onClick: (transport?: string) => void;
}

export const RadioCardMin: React.FC<IRadioCardMinOptions> = ({
  value,
  disabled,
  checked,
  onClick,
}) => {
  return (
    <button
      data-testid="radio-card-min"
      type="button"
      disabled={disabled}
      className={classNames(
        'text-sm',
        'border-primary-600 border rounded-full flex items-center justify-center text-sm sm:flex-1',
        checked ? 'bg-primary-600 text-white' : ' text-primary-600',
      )}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick(e.currentTarget.value);
      }}
    >
      <div className="flex flex-row items-center py-1 px-3">
        <Icon name={checked ? 'cancel' : 'add_circle'} size="base" />
        <label className="ml-2">{value}</label>
      </div>
    </button>
  );
};
