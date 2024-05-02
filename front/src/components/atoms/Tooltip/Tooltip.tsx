import * as React from 'react';

import {
  TooltipArrow,
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

import { Typography } from '../Typography';

export type Side = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode | null;
  hidden?: boolean;
  side?: Side;
  disableTooltip?: boolean;
}

export const Tooltip = ({
  children,
  content,
  hidden = false,
  side = 'bottom',
  disableTooltip = false,
}: TooltipProps): JSX.Element => {
  if (hidden || !content || !children) {
    return <></>;
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  if (disableTooltip) {
    return <>{children}</>;
  }

  return (
    <TooltipBase>
      <TooltipTrigger asChild>
        <div onClick={handleClick}>{children}</div>
      </TooltipTrigger>
      {content && (
        <TooltipContent
          side={side}
          className={
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md bg-slate-900 px-3 py-1.5 text-xs text-slate-50 flex flex-col text-center gap-1'
          }
        >
          <TooltipArrow />
          {typeof content === 'string' ? <Typography color="white">{content}</Typography> : content}
        </TooltipContent>
      )}
    </TooltipBase>
  );
};
