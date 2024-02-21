import classNames from 'classnames';

import { SvgIcon, SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import clsxm from '@/utils/clsxm';

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
        'border-primary-600 border rounded-full flex items-center justify-center sm:flex-1',
        checked ? 'bg-primary-600 text-white' : ' text-primary-600',
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
          'flex flex-row items-center pl-1 pr-3 py-0.5': true,
        })}
      >
        <SvgIcon
          name="addAlt"
          className={clsxm('w-5 h-5 md:w-[14px] md:h-[14px]', { 'rotate-45': checked })}
        />
        <label
          className={classNames({
            'flex ml-1 cursor-pointer items-center': true,
          })}
        >
          <Typography color={checked ? 'white' : undefined} size="text-sm" desktopSize="text-xs">
            {value}
          </Typography>
        </label>
      </div>
    </button>
  );
};
