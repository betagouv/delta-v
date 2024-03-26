import React from 'react';

import { Button } from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';

interface ModalDeleteAttachmentDesktopProps {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
}

export const ModalDeleteAttachmentDesktop: React.FC<ModalDeleteAttachmentDesktopProps> = ({
  onClose,
  onDelete,
  open,
}) => {
  return (
    <Modal
      title="Voulez-vous supprimer cette pièce jointe ?"
      titleColor="black"
      titleWeight="normal"
      desktopTitleSize="text-sm"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-row gap-4 pt-5">
        <Button size="lg" variant="normal" onClick={onDelete} className={{ 'w-[100px]': true }}>
          Supprimer
        </Button>
        <Button size="lg" variant="outlined" onClick={onClose} className={{ 'w-[100px]': true }}>
          Annuler
        </Button>
      </div>
    </Modal>
  );
};
