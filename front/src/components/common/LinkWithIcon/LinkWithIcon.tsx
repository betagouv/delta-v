import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';
import { Typography } from '../Typography';

interface LinkWithIconProps {
  href?: string;
  onClick?: () => void;
  name: string;
  svgName: SvgNames;
  withBgColor?: boolean;
  disabled?: boolean;
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({
  href,
  onClick,
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
              'border border-secondary-200 py-4 px-5 rounded-md flex flex-row items-center justify-between h-14 cursor-pointer':
                true,
              'bg-primary-400': withBgColor,
            })}
          >
            <div className="flex flex-row gap-4 items-center">
              <div className="w-5 h-5 flex items-center justify-items-center">
                <SvgIcon name={svgName} />
              </div>
              <Typography color={withBgColor ? 'white' : 'black'} tag="div">
                {name}
              </Typography>
            </div>
            <Icon name="chevron-right" size="base" color={withBgColor ? 'white' : 'black'} />
          </div>
        </NextLink>
      ) : (
        <div
          className={twMerge(
            classNames({
              'border border-secondary-500 py-4 px-5 rounded-md flex flex-row items-center justify-between h-14 cursor-pointer':
                true,
              'bg-primary-400': withBgColor,
              'bg-disabled-bg border-none opacity-40 cursor-default': disabled,
            }),
          )}
          onClick={onClick}
        >
          <div className="flex flex-row gap-4 items-center">
            <div className="w-5 h-5 flex items-center justify-items-center">
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
