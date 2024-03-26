import React from 'react';

import { Button } from '@/components/atoms/Button';
import DownModal from '@/components/molecules/DownModal';

interface ModalDeleteAttachmentMobileProps {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
}

export const ModalDeleteAttachmentMobile: React.FC<ModalDeleteAttachmentMobileProps> = ({
  onClose,
  onDelete,
  open,
}) => {
  return (
    <DownModal subtitle="Voulez-vous supprimer cette pièce jointe ?" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 pt-[30px] justify-center items-center mb-4">
        <Button size="lg" variant="normal" onClick={onDelete} className={{ 'w-[100px]': true }}>
          Supprimer
        </Button>
        <Button size="lg" variant="outlined" onClick={onClose} className={{ 'w-[100px]': true }}>
          Annuler
        </Button>
      </div>
    </DownModal>
  );
};
