import React from 'react';

import { SvgIcon, SvgNames } from '../../molecules/SvgIcon';

export interface TransportBadgeProps {
  svgName: SvgNames;
  onClick?: () => void;
}

export const TransportBadge: React.FC<TransportBadgeProps> = ({
  svgName,
  onClick,
}: TransportBadgeProps) => {
  const Component = typeof onClick === 'undefined' ? 'div' : 'button';

  return (
    <Component
      className="inline-flex h-10 w-10 p-1 items-center justify-center bg-black text-white rounded-full"
      onClick={onClick}
    >
      <SvgIcon name={svgName} />
    </Component>
  );
};
