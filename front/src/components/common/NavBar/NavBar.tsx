import React from 'react';

import NextLink from 'next/link';

import { SvgIcon } from '../SvgIcon';
import { Typography } from '../Typography';
import clsxm from '@/utils/clsxm';
import { MenuAgentItem } from '@/utils/const';

interface NavBarProps {
  links: MenuAgentItem[];
  activePath?: string;
  onDeclarationClick?: () => void;
}

const getNavBarLink = (item: MenuAgentItem) => {
  if (item.disabled) {
    return '';
  }
  return item.path ?? '';
};

export const NavBar: React.FC<NavBarProps> = ({
  links,
  activePath,
  onDeclarationClick,
}: NavBarProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="w-[86px] h-[45px] md:hidden lg:flex">
        <SvgIcon name="logoAgent" />
      </div>
      <div className="flex flex-row gap-[45px] items-center py-7">
        {links.map((item) => {
          return (
            <div
              key={item.title}
              className="flex justify-center items-center w-full"
              onClick={onDeclarationClick}
            >
              {item.id === 'declaration' ? (
                <div
                  className={clsxm({
                    'py-2 px-5 rounded-full bg-primary-400 inline-flex items-center justify-between cursor-pointer':
                      true,
                    'cursor-not-allowed': item.disabled,
                  })}
                >
                  <div className="flex flex-row gap-2.5 items-center">
                    <div className="w-5 h-5 flex items-center justify-items-center">
                      <SvgIcon name={item.svgIcon} />
                    </div>
                    <Typography color={'white'} size="text-2xs" tag="div" noWrap>
                      {item.title}
                    </Typography>
                  </div>
                </div>
              ) : (
                <NextLink href={getNavBarLink(item)} key={item.title}>
                  <div
                    className={clsxm({
                      'cursor-pointer': true,
                      'cursor-not-allowed': item.disabled,
                    })}
                  >
                    <Typography
                      size="text-2xs"
                      color={item.disabled ? 'light-gray' : 'black'}
                      weight={activePath === item.path ? 'bold' : undefined}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                  </div>
                </NextLink>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
