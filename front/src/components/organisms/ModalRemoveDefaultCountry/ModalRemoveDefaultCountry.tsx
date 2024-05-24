import React from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { ModalType, getModalComponent } from '@/utils/modal';

interface ModalRemoveDefaultCountryProps {
  isOpen?: boolean;
  onClose?: () => void;
  onRemove?: () => void;
  preventClose?: boolean;
  modalType?: ModalType;
}

export const ModalRemoveDefaultCountry = ({
  isOpen = false,
  onClose,
  onRemove,
  preventClose = false,
  modalType = ModalType.DOWN,
}: ModalRemoveDefaultCountryProps) => {
  const ModalComponent = getModalComponent(modalType);

  return (
    <ModalComponent
      bgColor="bg-white"
      open={isOpen}
      onClose={onClose}
      preventClose={preventClose}
      noInitialFocus
    >
      <motion.div className="mx-auto  gap-5 flex flex-col md:h-auto md:p-0 px-4 pt-7 pb-5">
        <Typography
          color="black"
          size="text-sm"
          desktopSize="text-xs"
          weight="bold"
          textPosition="text-center"
        >
          Êtes-vous sur de vouloir supprimer <br className="md:hidden block" />
          votre pays par défaut ?
        </Typography>
        <Typography
          color="black"
          size="text-xs"
          desktopSize="text-xs"
          textPosition="text-center"
          italic
        >
          Vous pourrez ajouter à tout moment un <br className="md:hidden block" />
          nouveau pays dans cette page
        </Typography>
        <div className="flex gap-[10px] self-center md:flex-row flex-col-reverse md:w-auto w-32">
          <Button
            variant="outlined"
            className={{ 'md:h-[34px] md:text-xs md:whitespace-nowrap md:px-7': true }}
            onClick={onClose}
            size="sm"
            fullWidth
          >
            Annuler
          </Button>
          <Button
            fullWidth
            size="sm"
            className={{ 'md:h-[34px] md:text-xs md:whitespace-nowrap md:px-7': true }}
            onClick={onRemove}
          >
            Supprimer
          </Button>
        </div>
      </motion.div>
    </ModalComponent>
  );
};
