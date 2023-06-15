import React from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';

interface LinkWithIconProps {
  href: string;
  name: string;
  svgName: SvgNames;
  withBgColor?: boolean;
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({
  href,
  name,
  svgName,
  withBgColor,
}: LinkWithIconProps) => {
  return (
    <a
      className={classNames({
        'border border-secondary-500 py-4 px-5 rounded-md flex flex-row items-center justify-between':
          true,
        'bg-primary-400 text-white': withBgColor,
        'text-black': !withBgColor,
      })}
      href={href}
    >
      <div className="flex flex-row gap-4 h-4 items-center">
        <SvgIcon name={svgName} />
        <p className="text-sm">{name}</p>
      </div>
      <Icon name="chevron-right" size="base" />
    </a>
  );
};
