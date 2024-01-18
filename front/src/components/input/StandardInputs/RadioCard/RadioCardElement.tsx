import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { twMerge } from 'tailwind-merge';

import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { TailwindDefaultScreenSize } from '@/utils/enums';

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
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  return (
    <button
      data-testid="radio-card-element"
      type="button"
      disabled={disabled}
      className={twMerge(
        classNames({
          'h-[88px] w-[85px] border-gray-200 rounded-xl py-[18px] px-4 flex items-center justify-center sm:flex-1 active:bg-gray-50 active:py-[14px] active:border-4 font-normal border':
            true,
          'opacity-50 cursor-not-allowed': disabled,
          'font-bold border-4 py-[14px] px-2': checked,
          'p-[18px] h-[130px] w-[104px]': bigSize && isMobile,
          'p-[18px] h-[160px] w-[138px]': bigSize && !isMobile,
        }),
      )}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick(e.currentTarget.value);
      }}
    >
      <div
        className={classNames({
          'h-auto flex flex-col items-center ': true,
          'gap-3': isMobile,
          'gap-5': !isMobile,
        })}
      >
        <div
          className={classNames({
            'flex-col flex w-auto': true,
            'h-7': isMobile,
            'h-10': !isMobile,
          })}
        >
          <SvgIcon name={svgIcon} />
        </div>
        <div className="flex-col flex">
          <Typography
            color="secondary"
            size={isMobile ? 'text-xs' : 'text-sm'}
            lineHeight="leading-none"
          >
            {value.length > 30 ? `${value.slice(0, 30)}...` : value}
          </Typography>
        </div>
      </div>
    </button>
  );
};
