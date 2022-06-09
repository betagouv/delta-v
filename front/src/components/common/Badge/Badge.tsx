import React from 'react';

import { SvgIcon, SvgNames } from '../SvgIcon';
import { CITIES } from './const';

type BadgeVariant = 'vertical' | 'horizontal';
type BadgeRounded = 'full' | 'lg' | 'md' | 'base' | 'none';

export interface BadgeProps {
  variant?: BadgeVariant;
  rounded?: BadgeRounded;
  disabled?: boolean;
  fullWidth?: boolean;
  svgName: SvgNames;
  title: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'horizontal',
  rounded = 'lg',
  disabled = false,
  fullWidth = false,
  svgName,
  title,
  onClick,
}: BadgeProps) => {
  let className = 'flex h-auto items-center border border-gray-300 bg-white p-3 flex-1 gap-4';
  if (variant === 'vertical') {
    className += ' flex-col text-center';
  } else if (variant === 'horizontal') {
    className += ' text-left gap-2';
  }

  if (disabled) {
    className += ' opacity-50';
  }
  if (!fullWidth) {
    className += ' w-fit';
  }

  switch (rounded) {
    case 'full':
      className += ' rounded-full';
      break;
    case 'lg':
      className += ' rounded-[10px]';
      break;
    case 'md':
      className += ' rounded-md';
      break;
    case 'base':
      className += ' rounded-base';
      break;
    case 'none':
      className += ' rounded-none';
      break;
    default:
      break;
  }

  const city = CITIES.find((x) => x.id === title);

  return (
    <div className={className} onClick={onClick}>
      <div className="flex w-24 flex-1 flex-col items-center justify-center">
        <div className="h-14 w-14">
          <SvgIcon name={svgName} />
        </div>
        <span className="text-small">{city?.name}</span>
        <span className="text-small">{city?.department}</span>
      </div>
    </div>
  );
};
