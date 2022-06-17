import React, { useEffect, useState } from 'react';

import { BackButton } from '@/components/common/BackButton';
import { Link } from '@/components/common/Link';
import { SvgIcon } from '@/components/common/SvgIcon';
import { useStore } from '@/stores/store';

interface HeaderProps {
  withCart?: boolean;
  withSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ withCart = false }: HeaderProps) => {
  const shoppingProducts = useStore((state) => state.simulator.appState.shoppingProducts);
  const [nbCartItems, setNbCartItems] = useState(0);

  useEffect(() => {
    setNbCartItems(shoppingProducts?.length ?? 0);
  }, [shoppingProducts]);
  return (
    <div className="flex flex-row">
      <BackButton />
      <div className="flex-1" />
      {withCart && (
        <Link to="/app/simulateur/pannier">
          <div className="flex flex-row">
            <div className="mt-1 mr-1  h-7 w-7 ">
              <SvgIcon name="basket" />
            </div>
            <div className="-ml-5 h-5 w-5 rounded-full bg-primary-500 text-center text-white">
              {nbCartItems}
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
