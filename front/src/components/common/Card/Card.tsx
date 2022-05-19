import React from 'react';

import { SvgIcon, SvgNames } from '../SvgIcon';

type CardVariant = 'vertical' | 'horizontal';
type CardRounded = 'full' | 'lg' | 'md' | 'base' | 'none';

export interface CardProps {
  variant?: CardVariant;
  rounded?: CardRounded;
  disabled?: boolean;
  fullWidth?: boolean;
  svgName: SvgNames;
  title: string;
  subtitle?: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'horizontal',
  rounded = 'lg',
  disabled = false,
  fullWidth = false,
  svgName,
  title,
  subtitle,
  description,
}: CardProps) => {
  let className = 'flex h-auto items-center border border-gray-300 bg-white p-3';
  if (variant === 'vertical') {
    className += ' flex-col text-center';
  } else if (variant === 'horizontal') {
    className += ' text-left gap-2';
  }

  if (disabled) {
    className += ' opacity-50';
  }
  if (!fullWidth) {
    className += ' w-auto';
  }

  switch (rounded) {
    case 'full':
      className += ' rounded-full';
      break;
    case 'lg':
      className += ' rounded-lg';
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

  return (
    <div className={className}>
      <div className="h-14 w-14">
        <SvgIcon name={svgName} />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-base font-bold">{title}</span>
        {subtitle && <span className="font-bold text-primary-700">{subtitle}</span>}
        <span className="leading-4 text-gray-500">{description}</span>
      </div>
    </div>
  );
};
