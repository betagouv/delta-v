import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';

export interface IFileOptions {
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn<any>;
  name: string;
  withIcon?: boolean;
  title?: string;
  subtitle?: string;
  variant?: 'standard' | 'outlined';
  specificClass?: string;
}

export const File: React.FC<IFileOptions> = ({
  name,
  register,
  onFileChange,
  withIcon = true,
  title = 'Ajouter une pièce jointe',
  variant = 'standard',
  subtitle,
  specificClass,
}) => {
  const { onChange, ...rest } = { ...register };
  const mergedClassname = clsxm({
    hidden: true,
  });

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor="file"
        className={clsxm({
          'inline-flex  rounded-full px-5 py-2 justify-center items-center self-start cursor-pointer':
            true,
          'border border-primary-600 text-primary-600': variant === 'outlined',
          'bg-primary-600 text-white': variant === 'standard',
          specificClass,
        })}
      >
        <div className="inline-flex flex-row gap-1 items-center">
          {withIcon && <Icon name="paperclip" size="sm" />}
          <Typography
            size="text-xs"
            weight={variant === 'standard' ? 'normal' : 'bold'}
            color={variant === 'standard' ? 'white' : 'primary'}
          >
            {title}
          </Typography>
        </div>
        <input
          data-testid="file-element"
          name={name}
          {...rest}
          type="file"
          id={name}
          className={mergedClassname}
          onChange={(event) => {
            if (onFileChange && onChange) {
              onChange(event);
              onFileChange(event);
            }
          }}
        />
      </label>

      {subtitle && (
        <Typography color="placeholder" size="text-2xs" desktopSize="text-2xs" italic>
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
export default File;
