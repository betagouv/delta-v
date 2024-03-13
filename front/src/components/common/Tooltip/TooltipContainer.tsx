import React from 'react';

import { SvgIcon } from '../SvgIcon';
import { Typography } from '../Typography';

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
            <SvgIcon name="times" className="h-[14px] w-[14px]" />
          </div>
        )}
      </div>
    </div>
  );
};
