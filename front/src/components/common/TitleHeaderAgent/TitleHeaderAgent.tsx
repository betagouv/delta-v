import React from 'react';

import cs from 'classnames';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { TitleAgent } from '../TitleAgent';

export interface TitleHeaderProps {
  title: string;
  bgColorClass?: string;
  switchWordPosition?: number;
  colorClassnameOne?: string;
  colorClassnameTwo?: string;
  href?: string;
}

export const TitleHeaderAgent: React.FC<TitleHeaderProps> = ({
  title,
  bgColorClass,
  switchWordPosition,
  colorClassnameOne,
  colorClassnameTwo,
  href,
}: TitleHeaderProps) => {
  return (
    <div className={cs('grid grid-cols-[40px_1fr_40px] w-full flex-row h-14 mt-4', bgColorClass)}>
      <div className="mx-auto mt-1.5">
        <Link back={!href} href={href}>
          <Icon name="chevron-left" size="base" />
        </Link>
      </div>
      <div className="flex w-full justify-center">
        <TitleAgent
          title={title}
          switchWordPosition={switchWordPosition}
          colorClassnameOne={colorClassnameOne}
          colorClassnameTwo={colorClassnameTwo}
        />
      </div>
    </div>
  );
};
