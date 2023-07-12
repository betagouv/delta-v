import classNames from 'classnames';

import { Icon } from '@/components/common/Icon';
import { SvgNames } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';

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
          'pl-2.5': checked,
        })}
      >
        <Icon name={checked ? 'cross-thin' : 'add_circle'} size={checked ? 'xs' : 'lg'} />
        <label
          className={classNames({
            'ml-1': true,
            'ml-2.5': checked,
          })}
        >
          <Typography color={checked ? 'white' : undefined}>{value}</Typography>
        </label>
      </div>
    </button>
  );
};
