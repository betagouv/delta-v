import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';

import { SvgIcon } from '../SvgIcon';
import { Typography } from '../Typography';
import { Link } from '@/components/common/Link';
import { MenuAgentItem } from '@/utils/const';

interface NavBarProps {
  links: MenuAgentItem[];
}

export const NavBar: React.FC<NavBarProps> = ({ links }: NavBarProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="w-[86px] h-[45px]">
        <SvgIcon name="logoAgent" />
      </div>
      <div className="flex flex-row gap-[45px] items-center py-7">
        {links.map((item) => {
          return (
            <div key={item.title} className="flex justify-center items-center w-full">
              {item.id === 'declaration' ? (
                <NextLink href={item.path ?? ''}>
                  <div
                    className={classNames({
                      'py-2 px-5 rounded-full bg-primary-400 inline-flex items-center justify-between cursor-pointer':
                        true,
                    })}
                  >
                    <div className="flex flex-row gap-[10px] items-center">
                      <div className="w-5 h-5 flex items-center justify-items-center">
                        <SvgIcon name={item.svgIcon} />
                      </div>
                      <Typography color={'white'} size="text-2xs" tag="div" noWrap>
                        {item.title}
                      </Typography>
                    </div>
                  </div>
                </NextLink>
              ) : (
                <Link href={item.path} key={item.title}>
                  <Typography size="text-2xs" color="black" noWrap>
                    {item.title}
                  </Typography>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
