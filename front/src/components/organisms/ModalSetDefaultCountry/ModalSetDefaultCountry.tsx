import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { getNames } from 'i18n-iso-countries';
import type { Alpha2Code } from 'i18n-iso-countries';

import { usePutDefaultCountryMutation } from '@/api/hooks/useAPIConfig';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { Typography } from '@/components/atoms/Typography';
import { useStore } from '@/stores/store';
import { ModalType, getModalComponent } from '@/utils/modal';

interface ModalSetDefaultCountryProps {
  country: Alpha2Code;
  isOpen?: boolean;
  onClose?: () => void;
  onSet?: () => void;
  preventClose?: boolean;
  modalType?: ModalType;
}

export const ModalSetDefaultCountry: React.FC<ModalSetDefaultCountryProps> = ({
  country,
  isOpen = false,
  onClose,
  onSet,
  preventClose = false,
  modalType = ModalType.DOWN,
}) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const { hideSetDefaultCountry, showSetDefaultCountry } = useStore((state) => ({
    hideSetDefaultCountry: state.hideSetDefaultCountry,
    showSetDefaultCountry: state.showSetDefaultCountry,
  }));
  const usePutDefaultCountry = usePutDefaultCountryMutation({});

  const countries = getNames('fr', { select: 'official' });
  const countryLabel = countries[country];

  const handleClose = () => {
    if (doNotShowAgain) {
      hideSetDefaultCountry();
    } else showSetDefaultCountry();

    if (onClose) {
      onClose();
    }
  };

  const ModalComponent = getModalComponent(modalType);

  const onCheckboxClick = (value: boolean) => {
    setDoNotShowAgain(value);
  };

  const onSetDefaultCountry = () => {
    if (onSet) {
      onSet();
    }
    usePutDefaultCountry.mutate({ country });
    handleClose();
  };

  return (
    <ModalComponent
      bgColor="bg-white"
      open={isOpen}
      onClose={handleClose}
      preventClose={preventClose}
      noInitialFocus
    >
      <motion.div className="mx-auto w-full md:gap-5 gap-7 flex flex-col h-auto md:p-0 p-5">
        <div className="flex flex-col md:gap-2 gap-4">
          <Typography
            color="black"
            size="text-sm"
            desktopSize="text-xs"
            weight="bold"
            textPosition="text-center"
          >
            {`Voulez vous définir ${countryLabel}`}
            <br className="md:hidden block" /> par défaut ?
          </Typography>
          <Typography
            color="black"
            size="text-xs"
            desktopSize="text-xs"
            textPosition="text-center"
            italic
          >
            Vous pourrez modifier à tout moment vos paramètres dans votre espace personnel.
          </Typography>
        </div>
        <div className="flex gap-2 self-center">
          <Checkbox name="doNotShowAgain" variant="agent" onChange={onCheckboxClick} />
          <Typography
            color="black"
            size="text-xs"
            desktopSize="text-xs"
            textPosition="text-center"
            italic
          >
            Ne plus afficher la pop in
          </Typography>
        </div>
        <div className="flex gap-[10px] self-center md:flex-row flex-col-reverse md:w-auto w-52">
          <Button
            variant="outlined"
            className={{ 'md:h-[34px] md:text-xs md:whitespace-nowrap md:px-7': true }}
            onClick={handleClose}
            size="sm"
            fullWidth
          >
            Continuer sans définir
          </Button>
          <Button
            fullWidth
            size="sm"
            className={{ 'md:h-[34px] md:text-xs md:whitespace-nowrap md:px-7': true }}
            onClick={onSetDefaultCountry}
          >
            Définir
          </Button>
        </div>
      </motion.div>
    </ModalComponent>
  );
};
