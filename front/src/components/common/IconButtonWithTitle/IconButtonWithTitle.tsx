import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

type Props = {
  title: string;
  icon: string;
  onClick?: () => void;
};

export const IconButtonWithTitle = ({ title, icon, onClick }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2" onClick={onClick}>
      <div className="flex items-center justify-center rounded-full bg-primary-600 h-5 w-5">
        <Icon name={icon} size="xs" color="white" />
      </div>
      <Typography color="black" size="text-sm" weight="bold">
        {title}
      </Typography>
    </div>
  );
};
