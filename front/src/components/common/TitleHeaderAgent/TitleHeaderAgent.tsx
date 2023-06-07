import React from 'react';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { TitleAgent } from '../TitleAgent';

export interface TitleHeaderProps {
  title: string;
}

export const TitleHeaderAgent: React.FC<TitleHeaderProps> = ({ title }: TitleHeaderProps) => {
  return (
    <div className="items-center w-full flex flex-row px-6 py-5">
      <Link back>
        <Icon name="chevron-left" size="base" />
      </Link>
      <div className="flex justify-center w-full">
        <TitleAgent title={title} />
      </div>
    </div>
  );
};
