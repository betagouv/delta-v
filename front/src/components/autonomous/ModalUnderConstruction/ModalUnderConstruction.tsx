import React from 'react';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ModalUnderConstructionProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalUnderConstruction: React.FC<ModalUnderConstructionProps> = ({
  onClose,
  open,
}) => {
  return (
    <>
      <Modal
        title={
          <>
            Cette fonctionnalité n’est
            <br />
            pas encore opérationnelle
          </>
        }
        subtitle={
          <>
            Nous sommes désolés.
            <br />
            Nous travaillons et améliorons
            <br />
            l’application de jour en jour.
          </>
        }
        open={open}
        onClose={onClose}
      >
        <Button rounded="full" onClick={onClose}>
          Retour
        </Button>
      </Modal>
    </>
  );
};
