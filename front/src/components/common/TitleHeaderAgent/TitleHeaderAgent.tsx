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
  onReturnClick?: () => void;
}

export const TitleHeaderAgent: React.FC<TitleHeaderProps> = ({
  title,
  bgColorClass,
  switchWordPosition,
  colorClassnameOne,
  colorClassnameTwo,
  href,
  onReturnClick,
}: TitleHeaderProps) => {
  return (
    <div
      className={cs('grid grid-cols-[40px_1fr_40px] w-full flex-row h-16 pt-4 z-50', bgColorClass)}
    >
      <div className="mx-auto mt-1.5">
        <Link back={!href && !onReturnClick} href={href} onClick={onReturnClick}>
          <Icon name="chevron-left" size="lg" />
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
