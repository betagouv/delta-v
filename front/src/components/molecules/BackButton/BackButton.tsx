import React from 'react';

import { Icon } from '@/components/atoms/Icon';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';

export interface BackButtonProps {
  href?: string;
  onReturnClick?: () => void;
  label?: string;
}

export const BackButton = ({ href, onReturnClick, label }: BackButtonProps) => {
  return (
    <div className="mx-auto mt-1.5 flex items-center">
      <Link back={!href && !onReturnClick} href={href} onClick={onReturnClick}>
        <Icon name="chevron-left" size="base" />
        {label && <Typography size="text-xs" color="black">{` ${label}`}</Typography>}
      </Link>
    </div>
  );
};
