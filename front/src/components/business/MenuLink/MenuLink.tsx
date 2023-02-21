import React from 'react';

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
      <div className="grid h-[40px] w-[210px] grid-cols-[34px_1fr_20px] content-center rounded-lg border border-black">
        <div className="justify-self-center leading-none">
          {!badgeNumber && iconName && <Icon name={iconName} size="lg" />}
          {badgeNumber && (
            <div className="h-5 w-5 rounded-full bg-[#EFB45A] text-center text-xs leading-[20px]">
              {badgeNumber}
            </div>
          )}
        </div>
        <Typography>{title}</Typography>
        <div className="text-center leading-[20px]">
          <Icon name="chevron-thin-right" size="base" />
        </div>
      </div>
    </Link>
  );
};
