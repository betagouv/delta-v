import React from 'react';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';

interface ModalDeleteAttachmentProps {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
}

export const ModalDeleteAttachment: React.FC<ModalDeleteAttachmentProps> = ({
  onClose,
  onDelete,
  open,
}) => {
  return (
    <>
      <Modal title="Voulez-vous supprimer cette pièce jointe ?" open={open} onClose={onClose}>
        <div className="flex flex-row gap-4">
          <Button size="lg" variant="normal" onClick={onDelete} className={{ 'w-[100px]': true }}>
            Supprimer
          </Button>
          <Button size="lg" variant="outlined" onClick={onClose} className={{ 'w-[100px]': true }}>
            Annuler
          </Button>
        </div>
      </Modal>
    </>
  );
};
