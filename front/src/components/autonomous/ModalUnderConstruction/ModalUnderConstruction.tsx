import React from 'react';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';

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
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col items-center gap-5">
          <Typography
            size="text-xs"
            color="secondary"
            textPosition="text-center"
            weight="bold"
            desktopSize="text-xs"
          >
            Cette fonctionnalité n’est
            <br />
            pas encore opérationnelle
          </Typography>
          <Typography
            size="text-xs"
            color="secondary"
            textPosition="text-center"
            desktopSize="text-xs"
          >
            Nous sommes désolés.
            <br />
            Nous travaillons et améliorons
            <br />
            l’application de jour en jour.
          </Typography>
          <Button rounded="full" onClick={onClose} className={{ 'md:text-xs md:h-[34px]': true }}>
            Retour
          </Button>
        </div>
      </Modal>
    </>
  );
};
