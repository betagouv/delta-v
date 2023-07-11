import classNames from 'classnames';

import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';

export interface IRadioCardElementOptions {
  value: string;
  disabled?: boolean;
  checked?: boolean;
  svgIcon: SvgNames;
  onClick: (transport?: string) => void;
  fullWidth?: boolean;
}

export const RadioCardElement: React.FC<IRadioCardElementOptions> = ({
  svgIcon,
  value,
  disabled,
  checked,
  fullWidth = false,
  onClick,
}) => {
  return (
    <button
      data-testid="radio-card-element"
      type="button"
      disabled={disabled}
      className={classNames(
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'active:bg-gray-50 active:p-[15px] active:border-4',
        checked ? 'font-bold border-4 p-[15px]' : 'font-normal border',
        fullWidth ? 'w-full h-32' : 'p-[18px] h-[130px] w-[104px]',
        'border-gray-200 rounded-xl flex items-center justify-center text-base sm:flex-1',
      )}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick(e.currentTarget.value);
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex h-8 items-center justify-center">
          <SvgIcon name={svgIcon} />
        </div>
        <label className="text-center">
          {value.length > 30 ? `${value.slice(0, 30)}...` : value}
        </label>
      </div>
    </button>
  );
};
