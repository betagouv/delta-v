import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { SummaryExport } from '../../business/summaryExport';
import { Role } from '@/components/business/formSelectProduct/utils';
import { BackButton } from '@/components/common/BackButton';
import { BackButtonWithTitle } from '@/components/common/BackButtonWithTitle';
import { Header } from '@/components/common/Header';
import { Link } from '@/components/common/Link';
import Modal from '@/components/common/Modal';
import { SvgIcon } from '@/components/common/SvgIcon';
import { useStore } from '@/stores/store';

interface HeaderProps {
  withCart?: boolean;
  withSearch?: boolean;
  withPrint?: boolean;
  withLogo?: boolean;
  title?: string;
  linkSearch?: string;
  templateRole?: Role;
}

export const CustomHeader: React.FC<HeaderProps> = ({
  withCart = false,
  withSearch = false,
  withPrint = false,
  withLogo = false,
  title,
  linkSearch = '/simulateur/produits/recherche',
  templateRole = 'user',
}: HeaderProps) => {
  const { shoppingProducts, simulatorRequest, simulatorResponse } = useStore(
    (state) => ({
      shoppingProducts: state.simulator.appState.simulatorRequest.shoppingProducts,
      simulatorRequest: state.simulator.appState.simulatorRequest,
      simulatorResponse: state.simulator.appState.simulatorResponse,
    }),
    shallow,
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

  const leftButtons = <>{title ? <BackButtonWithTitle title={title} /> : <BackButton />}</>;

  const rightButtons = (
    <>
      {withSearch && (
        <Link to={linkSearch}>
          <div className="mx-4 mt-1 h-7 w-7">
            <SvgIcon name="liteSearch" />
          </div>
        </Link>
      )}
      {withCart && (
        <>
          <div className="flex flex-row" onClick={onClickBasket}>
            <div className="mt-1 mr-1 h-7 w-7 ">
              <SvgIcon name="basket" />
            </div>
            {nbCartItems > 0 && (
              <div className="-ml-5 h-5 w-5 rounded-full bg-primary-500 text-center text-white">
                {nbCartItems}
              </div>
            )}
          </div>
          <Modal
            title="Votre panier est vide"
            open={openBasketModal}
            onClose={() => setOpenBasketModal(false)}
          />
        </>
      )}
      {withPrint && (
        <SummaryExport simulatorRequest={simulatorRequest} simulatorResponse={simulatorResponse} />
      )}
      {withLogo && (
        <Link to={linkSearch}>
          <div className="h-6 ">
            <SvgIcon name="logo" />
          </div>
        </Link>
      )}
    </>
  );
  return (
    <div className={templateRole === 'agent' ? 'px-5 pt-6 pb-0' : ''}>
      <Header leftButtons={leftButtons} rightButtons={rightButtons} />
    </div>
  );
};
