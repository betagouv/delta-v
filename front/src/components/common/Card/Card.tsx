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
  description: React.ReactNode;
  onClick?: () => void;
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
  onClick,
}: CardProps) => {
  let className = 'flex h-auto border border-gray-300 bg-white p-3 flex-1 gap-4 active:bg-gray-100';
  if (variant === 'vertical') {
    className += ' flex-col text-center items-center';
  } else if (variant === 'horizontal' && !subtitle) {
    className += ' text-left items-end';
  } else {
    className += ' text-left items-center';
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

  return (
    <div className={className} onClick={onClick}>
      <div className="flex h-auto w-[50px] flex-col items-center">
        <SvgIcon name={svgName} />
      </div>
      <div className="flex flex-1 flex-col">
        <span className="text-base font-bold">{title}</span>
        {subtitle && <span className="font-bold leading-4 text-primary-700">{subtitle}</span>}
        <div className="whitespace-pre-wrap leading-4 text-gray-500">{description}</div>
      </div>
    </div>
  );
};
