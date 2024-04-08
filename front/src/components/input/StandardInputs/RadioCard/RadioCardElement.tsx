import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import { Typography } from '@/components/atoms/Typography';
import { SvgIcon, SvgNames } from '@/components/molecules/SvgIcon';
import clsxm from '@/utils/clsxm';

export interface IRadioCardElementOptions {
  value: string;
  disabled?: boolean;
  checked?: boolean;
  svgIcon: SvgNames;
  onClick: (transport?: string) => void;
  bigSize?: boolean;
  labelClassname?: string;
}

export const RadioCardElement: React.FC<IRadioCardElementOptions> = ({
  svgIcon,
  value,
  disabled,
  checked,
  bigSize = false,
  onClick,
  labelClassname,
}) => {
  return (
    <button
      data-testid="radio-card-element"
      type="button"
      disabled={disabled}
      className={twMerge(
        classNames({
          'leading-none h-[88px] w-[85px] border-gray-200 rounded-xl md:rounded-md py-[18px] px-4 flex items-center justify-center active:bg-gray-50 active:py-[14px] active:border-4 font-normal border':
            true,
          'opacity-50 cursor-not-allowed': disabled,
          'font-bold border-4 py-[14px] px-2': checked,
          'p-[18px] pt-[40px] h-[130px] w-[104px] md:h-[160px] md:w-[138px] ': bigSize,
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
          'h-full flex flex-col items-center justify-items-center gap-5': true,
          'md:grid md:grid-rows-[40px_80px]': bigSize,
        })}
      >
        <div
          className={classNames({
            'flex-col flex w-auto h-7 md:h-10': true,
            'md:w-10': bigSize,
          })}
        >
          <SvgIcon name={svgIcon} />
        </div>
        <div className={clsxm({ 'md:line-clamp-2 ': true, 'self-start': bigSize }, labelClassname)}>
          <Typography color="secondary" size="text-xs" desktopSize="text-base" tag="div">
            <p className="!leading-none">{value}</p>
          </Typography>
        </div>
      </div>
    </button>
  );
};
