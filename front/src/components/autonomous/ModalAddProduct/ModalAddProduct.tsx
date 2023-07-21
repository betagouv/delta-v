import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ModalAddProductProps {
  open: boolean;
  onClose?: () => void;
  method?: 'declaration' | 'simulateur' | 'agent';
}

const getLink = (method: 'declaration' | 'simulateur' | 'agent'): string => {
  switch (method) {
    case 'agent':
      return '/agent/declaration/ajout/marchandises';
    case 'declaration':
      return '/declaration/panier';
    case 'simulateur':
      return '/simulateur/panier';
    default:
      return '/simulateur/panier';
  }
};

export const ModalAddProduct: React.FC<ModalAddProductProps> = ({
  onClose,
  open,
  method = 'simulateur',
}) => {
  const router = useRouter();
  const onRedirectBasket = (): void => {
    router.push(getLink(method));
    if (onClose) {
      onClose();
    }
  };
  const onRedirectProducts = (): void => {
    router.push(`/${method === 'simulateur' ? 'simulateur' : 'declaration'}/produits`);
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <Modal
        title={
          <>
            Voulez-vous ajouter
            <br />
            d'autres produits ou
            <br />
            terminer votre {method === 'simulateur' ? 'simulation' : 'déclaration'} ?
          </>
        }
        open={open}
        onClose={onRedirectProducts}
      >
        <div className="flex flex-col gap-4">
          <Button size="lg" fullWidth variant="outlined" onClick={onRedirectProducts}>
            Ajouter un produit
          </Button>
          <Button size="lg" fullWidth onClick={onRedirectBasket}>
            Terminer ma {method === 'simulateur' ? 'simulation' : 'déclaration'}
          </Button>
        </div>
      </Modal>
    </>
  );
};
