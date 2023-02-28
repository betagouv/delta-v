import React, { useState } from 'react';

import cs from 'classnames';

import { Typography } from '@/components/common/Typography';

export type HomeToggleProps = {
  value: boolean;
  onClick?: (value: boolean) => void;
};

export const HomeToggle = ({ value: initialValue = true, onClick }: HomeToggleProps) => {
  const [value, setValue] = useState(initialValue);

  const handleClick = () => {
    setValue(!value);
    if (onClick) {
      onClick(!value);
    }
  };

  return (
    <div
      className="grid h-14 w-64 cursor-pointer grid-cols-2 items-center gap-2 rounded-full bg-gray-200 p-1"
      onClick={handleClick}
    >
      <div
        className={cs({
          'h-full w-full rounded-full flex justify-center items-center transition ease-linear':
            true,
          'bg-white': value,
        })}
      >
        <Typography color={value ? 'black' : 'light-gray'} size="text-xl">
          Déclaration
        </Typography>
      </div>
      <div
        className={cs({
          'h-full w-full rounded-full flex justify-center items-center transition ease-linear':
            true,
          'bg-white': !value,
        })}
      >
        <Typography color={value ? 'light-gray' : 'black'} size="text-xl">
          Outils
        </Typography>
      </div>
    </div>
  );
};
