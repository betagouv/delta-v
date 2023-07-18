import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Link } from '@/components/common/Link';

type Props = {
  title: string;
  href?: string;
  onClick?: () => void;
};

export const BackButtonWithTitle = ({ title, href, onClick }: Props) => {
  return (
    <Link back={!href} href={href} onClick={onClick}>
      <div className="flex flex-row items-center">
        <div className="mr-4 items-center justify-center rounded-full bg-secondary-500 p-1 px-2">
          <Icon name="chevron-thin-left" size="base" />
        </div>
        <Typography color="secondary" size="text-3xl">
          {title}
        </Typography>
      </div>
    </Link>
  );
};
