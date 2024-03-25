import React from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';

export interface IFileOptions {
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn<any>;
  name: string;
}

export const File: React.FC<IFileOptions> = ({ name, register, onFileChange }) => {
  const { onChange, ...rest } = { ...register };
  const mergedClassname = clsxm({
    hidden: true,
  });

  return (
    <label
      htmlFor="file"
      className="inline-flex border border-primary-600 text-primary-600 rounded-full px-5 py-2 justify-center items-center self-start cursor-pointer"
    >
      <div className="inline-flex flex-row gap-1 items-center">
        <Icon name="paperclip" size="sm" />
        <Typography size="text-2xs" weight="bold">
          Ajouter une pièce jointe
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
  );
};
export default File;
