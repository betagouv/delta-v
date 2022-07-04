import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { BackButton } from '@/components/common/BackButton';
import { Link } from '@/components/common/Link';
import Modal from '@/components/common/Modal';
import { SvgIcon } from '@/components/common/SvgIcon';
import { useStore } from '@/stores/store';

interface HeaderProps {
  withCart?: boolean;
  withSearch?: boolean;
  linkSearch?: string;
}

export const Header: React.FC<HeaderProps> = ({
  withCart = false,
  withSearch = false,
  linkSearch = '/simulateur/produits/recherche',
}: HeaderProps) => {
  const shoppingProducts = useStore(
    (state) => state.simulator.appState.simulatorRequest.shoppingProducts,
  );
  const [nbCartItems, setNbCartItems] = useState(0);
  const [openBasketModal, setOpenBasketModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNbCartItems(shoppingProducts?.length ?? 0);
  }, [shoppingProducts]);

  const onClickBasket = () => {
    if (nbCartItems > 0) {
      router.push('/simulateur/panier');
      return;
    }
    setOpenBasketModal(true);
  };
  return (
    <>
      <div className="flex flex-row">
        <BackButton />
        <div className="flex-1" />
        {withSearch && (
          <Link to={linkSearch}>
            <div className="mx-4 mt-1 h-7 w-7">
              <SvgIcon name="liteSearch" />
            </div>
          </Link>
        )}
        {withCart && (
          <div className="flex flex-row" onClick={onClickBasket}>
            <div className="mt-1 mr-1  h-7 w-7 ">
              <SvgIcon name="basket" />
            </div>
            <div className="-ml-5 h-5 w-5 rounded-full bg-primary-500 text-center text-white">
              {nbCartItems}
            </div>
          </div>
        )}
      </div>
      <Modal
        title="Votre panier est vide"
        open={openBasketModal}
        onClose={() => setOpenBasketModal(false)}
      />
    </>
  );
};
