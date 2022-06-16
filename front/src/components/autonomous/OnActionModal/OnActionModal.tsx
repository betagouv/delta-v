import React from 'react';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface OnActionModalProps {
  open: boolean;
  onSuccess: () => void;
  onReject: () => void;
}

export const OnActionModal: React.FC<OnActionModalProps> = ({ onSuccess, onReject, open }) => {
  // TODO: Function to delete product in the cart
  return (
    <>
      <Modal title="Êtes-vous sur de vouloir supprimer cet achat ?" open={open} onClose={onReject}>
        <div className="grid w-full grid-cols-2 gap-base">
          <Button
            type="submit"
            size="lg"
            rounded="full"
            variant="outlined"
            className={{ 'row-start-1': true }}
            fullWidth
            // TODO: Replace with onDeleteProduct
            onClick={onSuccess}
          >
            Oui
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="outlined"
            rounded="full"
            className={{ 'row-start-1': true }}
            fullWidth
            onClick={onReject}
          >
            Non
          </Button>
        </div>
      </Modal>
    </>
  );
};
