import React from 'react';

import cs from 'classnames';
import Link from 'next/link';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';

export type MenuLinkProps = {
  title: string;
  to: string;
  badgeNumber?: Number;
  iconName?: string;
};

export const MenuLink = ({ title, to, badgeNumber, iconName }: MenuLinkProps) => {
  return (
    <Link href={to}>
      <div
        className={cs(
          'h-[40px] w-[210px] border border-black rounded-lg flex items-center justify-around',
          !badgeNumber && iconName && 'border-2 border-cyan-500',
        )}
      >
        <div className="flex-center flex-1 justify-center">
          <div className="flex">
            <div className="w-[34px] flex-1">
              {!badgeNumber && iconName && <Icon name={iconName} size="lg" />}
              {badgeNumber && (
                <div className="h-5 w-5 rounded-full bg-[#EFB45A] text-center align-middle text-xs leading-5">
                  {badgeNumber}
                </div>
              )}
            </div>
            <Typography>{title}</Typography>
          </div>
        </div>
        <div className="flex-none">
          <Icon name="chevron-thin-right" size="base" />
        </div>
      </div>
    </Link>
  );
};
