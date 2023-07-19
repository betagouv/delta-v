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
    <Link
      href={to}
      className="grid h-10 w-52 grid-cols-[34px_1fr_20px] content-center rounded-lg border border-black"
    >
      <div className="flex items-center justify-self-center">
        {badgeNumber !== undefined && (
          <div className="h-5 w-5 rounded-full bg-[#EFB45A] text-center">
            <Typography color="black" size="text-xs" lineHeight="leading-5">
              {badgeNumber}
            </Typography>
          </div>
        )}
        {badgeNumber === undefined && iconName && <Icon name={iconName} size="lg" />}
      </div>
      <Typography color="black">{title}</Typography>
      <div className="flex items-center justify-self-center">
        <Icon name="chevron-right" size="base" />
      </div>
    </Link>
  );
};
