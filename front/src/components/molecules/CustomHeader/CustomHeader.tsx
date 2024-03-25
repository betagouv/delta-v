import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { BackButton } from '@/components/atoms/BackButton';
import { BackButtonWithTitle } from '@/components/atoms/BackButtonWithTitle';
import { Link } from '@/components/atoms/Link';
import { Header } from '@/components/molecules/Header';
import Modal from '@/components/molecules/Modal';
import { SvgIcon } from '@/components/molecules/SvgIcon';
import { Role } from '@/components/organisms/FormSelectProduct/utils';
import { SummaryExport } from '@/components/organisms/SummaryExport';
import { useStore } from '@/stores/store';

interface HeaderProps {
  withCart?: boolean;
  withSearch?: boolean;
  withPrint?: boolean;
  withLogo?: boolean;
  title?: string;
  linkSearch?: string;
  templateRole?: Role;
  linkButton?: string;
  method?: 'declaration' | 'simulateur';
  onClick?: () => void;
}

export const CustomHeader: React.FC<HeaderProps> = ({
  withCart = false,
  withSearch = false,
  withPrint = false,
  withLogo = false,
  title,
  linkSearch = '/simulateur/produits/recherche',
  templateRole = 'user',
  method = 'simulateur',
  onClick,
  linkButton,
}: HeaderProps) => {
  const { shoppingProducts, simulatorRequest, simulatorResponse } = useStore(
    (state) => ({
      shoppingProducts:
        method === 'simulateur'
          ? state.simulator.appState.simulatorRequest.shoppingProducts
          : state.declaration.appState.declarationRequest.shoppingProducts,
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
      router.push(`/${method}/panier`);
      return;
    }
    setOpenBasketModal(true);
  };

  const leftButtons = (
    <>
      {title ? (
        <BackButtonWithTitle title={title} href={linkButton} onClick={onClick} />
      ) : (
        <BackButton href={linkButton} onClick={onClick} />
      )}
    </>
  );

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
      {withPrint && method === 'simulateur' && (
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
