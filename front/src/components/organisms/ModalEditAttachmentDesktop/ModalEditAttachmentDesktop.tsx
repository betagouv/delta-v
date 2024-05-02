import React from 'react';

import { Button } from '@/components/atoms/Button';
import { InputGroup } from '@/components/input/InputGroup';
import Modal from '@/components/molecules/Modal';

interface ModalEditAttachmentDesktopProps {
  open: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
}

export const ModalEditAttachmentDesktop: React.FC<ModalEditAttachmentDesktopProps> = ({
  onClose,
  onDelete,
  open,
  onFileChange,
  register,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(event);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Modal
      title="Que souhaitez-vous faire ?"
      titleColor="black"
      titleWeight="normal"
      desktopTitleSize="text-sm"
      open={open}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-row gap-4 pt-4">
          <div className="flex flex-col gap-1">
            <InputGroup
              type="file"
              name="file"
              register={register('files')}
              onFileChange={handleFileChange}
              withFileIcon={false}
              fileTitle="Modifier la pièce jointe"
            />
          </div>
          <Button
            size="lg"
            variant="outlined"
            onClick={onDelete}
            className={{ 'w-[100px] md:w-fit md:h-[34px] md:text-xs': true }}
          >
            Supprimer la pièce jointe
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={onClose}
            className="text-primary-500 underline font-bold text-xs"
            type="button"
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
};
