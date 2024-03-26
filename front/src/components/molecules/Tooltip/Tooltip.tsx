import React from 'react';

import { Icon } from '@/components/atoms/Icon';
import clsxm from '@/utils/clsxm';

export interface TooltipProps {
  icon?: string;
  arrowClassname?: string;
  iconClassname?: string;
  isOpen?: boolean;
  onClick?: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  icon = 'info',
  arrowClassname = 'rotate-45 w-[26px] h-[26px] bg-navbar-bg bottom-[-33px] left-[-3px]',
  iconClassname,
  isOpen,
  onClick,
}: TooltipProps) => {
  return (
    <div
      className={clsxm(iconClassname, 'relative', { 'cursor-pointer': onClick })}
      onClick={onClick}
    >
      <div className={clsxm(iconClassname, 'text-primary-600')}>
        <Icon name={icon} size="lg" />
      </div>
      {isOpen && <div className={clsxm('absolute', arrowClassname)} />}
    </div>
  );
};
