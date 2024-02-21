import React from 'react';

import { SvgIcon, SvgNames } from '../SvgIcon';
import clsxm from '@/utils/clsxm';

export interface TooltipProps {
  icon?: SvgNames;
  arrowClassname?: string;
  iconClassname?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  icon = 'infoLight',
  arrowClassname = 'rotate-45 w-[26px] h-[26px] bg-navbar-bg bottom-[-45px] left-[-3px]',
  iconClassname,
  isOpen,
  onClick,
}: TooltipProps) => {
  return (
    <div className={clsxm('relative', { 'cursor-pointer': onClick })} onClick={onClick}>
      <SvgIcon name={icon} className={iconClassname} />
      {isOpen && <div className={clsxm('absolute', arrowClassname)} />}
    </div>
  );
};
