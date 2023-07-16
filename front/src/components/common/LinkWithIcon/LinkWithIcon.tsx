import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';
import { Typography } from '../Typography';

interface LinkWithIconProps {
  href?: string;
  name: string;
  svgName: SvgNames;
  withBgColor?: boolean;
  disabled?: boolean;
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({
  href,
  name,
  svgName,
  withBgColor,
  disabled,
}: LinkWithIconProps) => {
  return (
    <>
      {href && !disabled ? (
        <NextLink href={href}>
          <div
            className={classNames({
              'border border-secondary-200 py-4 px-5 rounded-md flex flex-row items-center justify-between':
                true,
              'bg-primary-400': withBgColor,
            })}
          >
            <div className="flex flex-row gap-4 items-center">
              <div>
                <SvgIcon name={svgName} />
              </div>
              <Typography color={withBgColor ? 'white' : 'black'} tag="div">
                {name}
              </Typography>
            </div>
            <Icon name="chevron-right" size="base" />
          </div>
        </NextLink>
      ) : (
        <div
          className={classNames({
            'border border-secondary-500 py-4 px-5 rounded-md flex flex-row items-center justify-between':
              true,
            'bg-primary-400': withBgColor,
            'bg-disabled-bg border-none opacity-40': disabled,
          })}
        >
          <div className="flex flex-row gap-4 h-4 items-center">
            <div>
              <SvgIcon name={svgName} />
            </div>
            <Typography color={withBgColor ? 'white' : 'black'}>{name}</Typography>
          </div>
          <Icon name="chevron-right" size="base" />
        </div>
      )}
    </>
  );
};
