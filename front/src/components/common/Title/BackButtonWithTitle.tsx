import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Link } from '@/components/common/Link';

type Props = {
  title: string;
};

export const BackButtonWithTitle = ({ title }: Props) => {
  return (
    <Link back>
      <div className="flex flex-row items-center justify-between">
        <Icon name="chevron-left" size="base" />
        <Typography color="secondary" size="text-3xl">
          {title}
        </Typography>
        <Typography color="secondary" size="text-3xl">
          {' '}
        </Typography>
      </div>
    </Link>
  );
};
