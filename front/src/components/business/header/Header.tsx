import React from 'react';

import { BackButton } from '@/components/common/BackButton';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';

interface HeaderProps {
  withCart?: boolean;
  nbCartItems?: number;
  cartLink?: string;
  withSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  withCart = false,
  nbCartItems,
  cartLink,
}: HeaderProps) => {
  return (
    <div className="flex flex-row">
      <BackButton />
      <div className="flex-1" />
      {withCart && (
        <Link to={cartLink}>
          <div className="flex h-7 w-7 flex-row">
            <SvgIcon name="basket" />
            {nbCartItems && nbCartItems > 0 && <div>{nbCartItems}</div>}
          </div>
        </Link>
      )}
    </div>
  );
};
