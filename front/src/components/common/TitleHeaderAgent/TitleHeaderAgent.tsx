import React from 'react';

import cs from 'classnames';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { TitleAgent } from '../TitleAgent';

export interface TitleHeaderProps {
  title: string;
  bgColorClass?: string;
}

export const TitleHeaderAgent: React.FC<TitleHeaderProps> = ({
  title,
  bgColorClass,
}: TitleHeaderProps) => {
  return (
    <div className={cs('flex w-full flex-row items-center px-6 py-5', bgColorClass)}>
      <Link back>
        <Icon name="chevron-left" size="base" />
      </Link>
      <div className="flex w-full justify-center">
        <TitleAgent title={title} />
      </div>
    </div>
  );
};
