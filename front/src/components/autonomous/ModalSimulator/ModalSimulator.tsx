import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ModalSimulatorProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalSimulator: React.FC<ModalSimulatorProps> = ({ onClose, open }) => {
  const router = useRouter();
  const onQuitSimulator = () => {
    if (onClose) {
      onClose();
    }
    router.push(`/app`);
  };
  return (
    <>
      <Modal
        title="Êtes-vous sur de vouloir quitter la simulation ?"
        subtitle="Si vous quittez la simulation vous perdrez toutes vos données."
        open={open}
        onClose={onClose}
      >
        <div className="grid w-full grid-rows-2 gap-base">
          <Button
            type="submit"
            size="lg"
            variant="outlined"
            rounded="full"
            fullWidth
            onClick={onQuitSimulator}
          >
            Quitter le simulateur
          </Button>
          <Button type="submit" size="lg" rounded="full" fullWidth onClick={onClose}>
            Poursuivre
          </Button>
        </div>
      </Modal>
    </>
  );
};
