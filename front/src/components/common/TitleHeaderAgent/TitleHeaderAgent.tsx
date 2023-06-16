import React from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { TitleAgent } from '../TitleAgent';

export interface TitleHeaderProps {
  title?: string;
}

export const TitleHeaderAgent: React.FC<TitleHeaderProps> = ({ title }: TitleHeaderProps) => {
  return (
    <div
      className={classNames({
        'items-center w-full flex flex-row': true,
        'px-5 py-6': title,
        'px-4 py-5': !title,
      })}
    >
      <Link back>
        <Icon name="chevron-left" size="base" />
      </Link>
      {title && (
        <div className="flex justify-center w-full">
          <TitleAgent title={title} />
        </div>
      )}
    </div>
  );
};
