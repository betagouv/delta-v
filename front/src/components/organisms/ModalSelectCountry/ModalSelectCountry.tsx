import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import type { Alpha2Code } from 'i18n-iso-countries';
import shallow from 'zustand/shallow';

import { FormSelectCountry } from '../FormSelectCountry';
import { Typography } from '@/components/atoms/Typography';
import { useStore } from '@/stores/store';
import { ModalType, getModalComponent } from '@/utils/modal';

interface ModalSelectCountryProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelect?: (country: Alpha2Code) => void;
  preventClose?: boolean;
  modalType?: ModalType;
  defaultCountry?: Alpha2Code;
}

export const ModalSelectCountry: React.FC<ModalSelectCountryProps> = ({
  isOpen = false,
  onClose,
  onSelect,
  preventClose = false,
  modalType = ModalType.DOWN,
  defaultCountry,
}) => {
  const {
    setProductsNomenclatureToDisplay,
    setCountryForProductsNomenclature,
    countryForProductsNomenclature,
  } = useStore(
    (state) => ({
      setProductsNomenclatureToDisplay: state.setProductsNomenclatureToDisplay,
      setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
    }),
    shallow,
  );

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!countryForProductsNomenclature) {
      return;
    }
    setProductsNomenclatureToDisplay(countryForProductsNomenclature);
  }, []);

  const ModalComponent = getModalComponent(modalType);

  const onSelectCountry = (country: Alpha2Code) => {
    if (onSelect) {
      onSelect(country);
    }
    setCountryForProductsNomenclature(country);
    handleClose();
  };

  return (
    <ModalComponent
      bgColor="bg-white"
      open={isOpen}
      onClose={onClose}
      preventClose={preventClose}
      noInitialFocus
      verticalPosition="top-[40%]"
    >
      <motion.div className="mx-auto md:w-[268px] gap-5 flex flex-col md:h-auto md:p-0 px-4 pt-7 pb-2 h-[calc(90vh-30px)]">
        <Typography
          color="black"
          size="text-xs"
          desktopSize="text-xs"
          weight="bold"
          textPosition="text-center"
        >
          Sélectionner le pays de provenance :
        </Typography>
        <FormSelectCountry onSelectCountry={onSelectCountry} defaultCountry={defaultCountry} />
      </motion.div>
    </ModalComponent>
  );
};
