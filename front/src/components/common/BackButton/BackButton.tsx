import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Link } from '@/components/common/Link';

type Props = {
  href?: string;
};
export const BackButton = ({ href }: Props) => {
  return (
    <Link back={!href} href={href}>
      <div className="flex flex-row items-center">
        <div className="mr-4 h-5 w-5">
          <Icon name="chevron-left" />
        </div>
        <Typography color="secondary">Retour</Typography>
      </div>
    </Link>
  );
};
