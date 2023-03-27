import { useState } from 'react';

import { Switch } from '@headlessui/react';
import cs from 'classnames';

import { Typography } from '@/components/common/Typography';

export type HomeToggleProps = {
  valueLeft: string;
  valueRight: string;
};

export const HomeToggle = ({ valueLeft, valueRight }: HomeToggleProps) => {
  const [rightPosition, switchToggle] = useState(false);

  const handleClick = () => {
    switchToggle(!rightPosition);
  };
  return (
    <Switch
      onClick={handleClick}
      className={cs(
        'absolute bg-gray-200 items-center grid grid-cols-2 h-14 w-fit border-4 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      )}
    >
      <div
        className={cs(
          rightPosition ? 'translate-x-full' : 'translate-x-0',
          'absolute h-full w-1/2 bg-white rounded-full transition ease-in-out duration-200',
        )}
      />
      <span className="relative px-2">
        <Typography color={rightPosition ? 'light-gray' : 'black'} size="text-xl">
          {valueLeft}
        </Typography>
      </span>
      <span className="relative px-2">
        <Typography color={!rightPosition ? 'light-gray' : 'black'} size="text-xl">
          {valueRight}
        </Typography>
      </span>
    </Switch>
  );
};
