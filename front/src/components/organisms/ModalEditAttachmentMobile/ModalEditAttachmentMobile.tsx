import React from 'react';

import { Button } from '@/components/atoms/Button';
import { InputGroup } from '@/components/input/InputGroup';
import DownModal from '@/components/molecules/DownModal';

interface ModalEditAttachmentMobileProps {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  register: any;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ModalEditAttachmentMobile: React.FC<ModalEditAttachmentMobileProps> = ({
  onClose,
  onDelete,
  onFileChange,
  register,
  open,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(event);
    if (onClose) {
      onClose();
    }
  };
  return (
    <DownModal subtitle="Que souhaitez-vous faire ?" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 pt-5 justify-center items-center w-full">
        <InputGroup
          type="file"
          name="file"
          register={register('files')}
          onFileChange={handleFileChange}
          withFileIcon={false}
          fileTitle="Modifier la pièce jointe"
        />
        <Button size="sm" variant="outlined" onClick={onDelete} type="button">
          Supprimer la pièce jointe
        </Button>
        <button
          onClick={onClose}
          className="text-primary-500 underline font-bold text-xs"
          type="button"
        >
          Annuler
        </button>
      </div>
    </DownModal>
  );
};
