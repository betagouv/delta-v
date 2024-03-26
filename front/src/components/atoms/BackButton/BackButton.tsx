import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Link } from '@/components/atoms/Link';

type Props = {
  href?: string;
  onClick?: () => void;
};
export const BackButton = ({ href, onClick }: Props) => {
  const Component = onClick ? 'div' : Link;
  return (
    <Component back={!href} href={href} onClick={onClick}>
      <div className="flex flex-row items-center">
        <div className="mr-4 h-5 w-5">
          <Icon name="chevron-left" />
        </div>
        <Typography color="secondary">Retour</Typography>
      </div>
    </Component>
  );
};
