import React from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // import duration plugin

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';

dayjs.extend(duration); // extend dayjs with duration plugin

interface ModalSwitchPaperDeclarationProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSwitchPaperDeclaration: () => void;
}

export const ModalSwitchPaperDeclaration: React.FC<ModalSwitchPaperDeclarationProps> = ({
  onClose,
  open,
  isLoading,
  onSwitchPaperDeclaration,
}) => {
  return (
    <>
      <Modal open={open} onClose={onClose} withMargin={false}>
        <div className="flex flex-col items-center">
          <Typography
            size="text-xs"
            color="secondary"
            textPosition="text-center"
            weight="bold"
            desktopSize="text-xs"
          >
            Êtes-vous sur de vouloir passer en <br />
            déclaration papier ?
          </Typography>
          <div className="flex mt-2">
            <Typography
              size="text-xs"
              color="secondary"
              textPosition="text-center"
              desktopSize="text-xs"
            >
              La déclaration n’est pas complète : <br />
              L'usager n’a pas pu ajouter une marchandise
              <br />
              Un des taux n’est pas le bon
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center mt-6 gap-3">
            <Button
              onClick={onSwitchPaperDeclaration}
              disabled={isLoading}
              fullWidth
              className={{ 'md:text-xs md:h-[34px]': true }}
            >
              Je passe en déclaration papier
            </Button>
            <div className="cursor-pointer">
              <Typography
                size="text-xs"
                desktopSize="text-xs"
                color="primary"
                textPosition="text-center"
                underline
                onClick={onClose}
              >
                Annuler
              </Typography>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
