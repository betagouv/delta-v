import classNames from 'classnames';

import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

export interface IRadioCardElementOptions {
  value: string;
  disabled?: boolean;
  checked?: boolean;
  svgIcon: SvgNames;
  onClick: (transport?: string) => void;
  bigSize?: boolean;
}

export const RadioCardElement: React.FC<IRadioCardElementOptions> = ({
  svgIcon,
  value,
  disabled,
  checked,
  bigSize = false,
  onClick,
}) => {
  return (
    <button
      data-testid="radio-card-element"
      type="button"
      disabled={disabled}
      className={classNames(
        bigSize ? 'text-base' : 'text-sm',
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'active:bg-gray-50 active:p-[15px] active:border-4',
        checked ? 'font-bold border-4 p-[15px]' : 'font-normal border',
        bigSize ? 'p-[18px] h-[130px] w-[104px]' : 'h-[88px] w-[85px]',
        'border-gray-200 rounded-xl p-[18px] flex items-center justify-center text-sm sm:flex-1',
      )}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick(e.currentTarget.value);
      }}
    >
      <div className="h-16 flex flex-col items-center">
        <div className="flex-1 flex-col flex h-8 w-auto justify-start">
          <SvgIcon name={svgIcon} />
        </div>
        <div className="flex-1 flex-col flex justify-start mt-4">
          <Typography color="secondary" size="text-xs">
            {value.length > 30 ? `${value.slice(0, 30)}...` : value}
          </Typography>
        </div>
      </div>
    </button>
  );
};
