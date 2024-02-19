import React from 'react';

import { useMediaQuery } from 'react-responsive';

import { Button } from '@/components/common/Button';
import DownModal from '@/components/common/DownModal';
import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';

interface ModalDeleteProductCartDeclarationProps {
  open: boolean;
  onClose: () => void;
  onDeleteProduct: (product?: Product) => void;
  productName?: string;
}

export const ModalDeleteFavoriteProduct: React.FC<ModalDeleteProductCartDeclarationProps> = ({
  onClose,
  open,
  onDeleteProduct,
  productName,
}) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });
  const MobileModal = () => {
    return (
      <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
        <div className="flex-col flex py-10 items-center">
          <div className="mb-4 flex">
            <Typography color="secondary" textPosition="text-center">
              Êtes-vous sur de vouloir supprimer
              <br /> ce favoris ?
            </Typography>
          </div>
          <div className="w-36 mb-2 flex">
            <Button fullWidth onClick={onDeleteProduct}>
              Supprimer
            </Button>
          </div>
          <div className="w-36 flex">
            <Button variant="outlined" fullWidth onClick={onClose}>
              Annuler
            </Button>
          </div>
        </div>
      </DownModal>
    );
  };

  const DesktopModal = () => {
    return (
      <Modal open={open} onClose={onClose}>
        <div className="flex-col flex items-center gap-4">
          <Typography color="secondary" textPosition="text-center" size="text-2xs">
            {productName
              ? `Êtes-vous sur de vouloir supprimer "${productName}"`
              : 'Êtes-vous sur de vouloir supprimer ce favori ?'}
          </Typography>
          <div className="flex gap-5">
            <button
              className="w-28 h-[34px] bg-primary-600 rounded-full"
              onClick={(_product) => onDeleteProduct()}
            >
              <Typography color="white" size="text-2xs">
                Oui
              </Typography>
            </button>
            <button
              onClick={onClose}
              className="w-28 h-[34px] border-primary-600 rounded-full border"
            >
              <Typography color="primary" size="text-2xs">
                Non
              </Typography>
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  return <>{isMobile ? <MobileModal /> : <DesktopModal />}</>;
};
