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
  className = 'bg-navbar-bg p-4 flex w-full justify-between',
  onCloseClick,
}: TooltipContainerProps) => {
  return (
    <div className={className}>
      <Typography size="text-3xs" lineHeight="leading-none">
        {description}
      </Typography>
      {onCloseClick && (
        <div className="self-center cursor-pointer" onClick={onCloseClick}>
          <SvgIcon name="times" className="h-[14px] w-[14px]" />
        </div>
      )}
    </div>
  );
};
