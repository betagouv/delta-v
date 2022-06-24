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
        'text-[13px]',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        checked ? 'font-bold border-2' : 'font-normal border hover:bg-gray-50',
        'border-gray-200 rounded-xl p-[18px] h-[88px] w-[85px] flex items-center justify-center text-sm sm:flex-1',
      )}
      onClick={() => {
        if (disabled) {
          return;
        }
        onClick();
      }}
    >
      <div className="flex flex-col">
        <div className="h-8">
          <SvgIcon name={svgIcon} />
        </div>
        <label className="text-center">{value}</label>
      </div>
    </button>
  );
};
