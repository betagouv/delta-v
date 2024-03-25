import React from 'react';

import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

export interface TooltipContainerProps {
  description: string;
  className?: string;
  onCloseClick?: () => void;
}

export const TooltipContainer: React.FC<TooltipContainerProps> = ({
  description,
  className = 'bg-navbar-bg p-4 flex md:w-full justify-between z-10 w-screen md:mx-0 -mx-5 items-center',
  onCloseClick,
}: TooltipContainerProps) => {
  return (
    <div className={className}>
      <Typography size="text-3xs" lineHeight="leading-none">
        {description}
      </Typography>
      <div className="md:block hidden">
        {onCloseClick && (
          <div className="self-center cursor-pointer" onClick={onCloseClick}>
            <Icon name="cross-thin" size="base" />
          </div>
        )}
      </div>
    </div>
  );
};
