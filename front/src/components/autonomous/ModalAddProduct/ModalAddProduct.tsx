import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ModalAddProductProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalAddProduct: React.FC<ModalAddProductProps> = ({ onClose, open }) => {
  const router = useRouter();
  const onRedirectBasket = (): void => {
    router.push('/simulateur/panier');
    if (onClose) {
      onClose();
    }
  };
  const onRedirectProducts = (): void => {
    router.push('/simulateur/produits');
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
            terminer votre simulation ?
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
            Terminer ma simulation
          </Button>
        </div>
      </Modal>
    </>
  );
};
