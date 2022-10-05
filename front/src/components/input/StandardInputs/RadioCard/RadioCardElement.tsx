import classNames from 'classnames';

import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';

export interface IRadioCardElementOptions {
  value: string;
  disabled?: boolean;
  checked?: boolean;
  svgIcon: SvgNames;
  onClick: () => void;
}

export const RadioCardElement: React.FC<IRadioCardElementOptions> = ({
  svgIcon,
  value,
  disabled,
  checked,
  onClick,
}) => {
  return (
    <button
      data-testid="radio-card-element"
      disabled={disabled}
      className={classNames(
        'text-sm',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'active:bg-gray-50 active:p-[15px] active:border-4',
        checked ? 'font-bold border-4 p-[15px]' : 'font-normal border',
        'border-gray-200 rounded-xl p-[18px] h-[88px] w-[85px] flex items-center justify-center text-sm sm:flex-1',
      )}
      onClick={() => {
        if (disabled) {
          return;
        }
        onClick();
      }}
    >
      <div className="flex flex-col items-center">
        <div className="h-8 w-auto">
          <SvgIcon name={svgIcon} />
        </div>
        <label className="text-center">{value}</label>
      </div>
    </button>
  );
};
