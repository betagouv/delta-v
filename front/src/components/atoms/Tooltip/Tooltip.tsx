import React, { ReactNode } from 'react';

import clsx from 'clsx';

import { Typography } from '../Typography';

type ComponentProps = {
  message: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
  tooltipHidden?: boolean;
};

export const Tooltip = ({
  message,
  children,
  position = 'bottom',
  tooltipHidden = false,
}: ComponentProps) => {
  if (tooltipHidden) {
    return <>{children}</>;
  }

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          tooltip: '-top-full left-1/2 -translate-x-1/2 mt-2',
          arrow: 'bottom-0 mb-[23px] left-1/2 -translate-x-1/2 rotate-45',
        };
      case 'bottom':
        return {
          tooltip: '-bottom-full left-1/2 -translate-x-1/2 -mb-2',
          arrow: 'top-0 mb-[23px] left-1/2 -translate-x-1/2 rotate-45',
        };
      default:
        return {
          tooltip: '-top-full left-1/2 -translate-x-1/2 mt-2',
          arrow: 'bottom-0 mb-[23px] left-1/2 -translate-x-1/2 rotate-45',
        };
    }
  };

  const { tooltip, arrow } = getPositionStyles();

  return (
    <div className="group relative hover:cursor-pointer">
      <div>{children}</div>
      <div
        className={clsx(
          'absolute hidden group-hover:flex min-w-full min-h-full place-content-center',
          tooltip,
        )}
      >
        <div className={clsx('absolute w-3 h-3 bg-slate-600', arrow)} />
        <div className="whitespace-no-wrap absolute w-max max-w-sm -left-1/2 top-1 z-10 p-2 text-xs leading-none text-white bg-slate-600 rounded-md shadow-lg">
          <Typography color="white">{message}</Typography>
        </div>
      </div>
    </div>
  );
};
