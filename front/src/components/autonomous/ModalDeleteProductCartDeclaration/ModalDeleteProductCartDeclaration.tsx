import React from 'react';

import { Button } from '@/components/common/Button';
import DownModal from '@/components/common/DownModal';
import { Typography } from '@/components/common/Typography';

interface ModalDeleteProductCartDeclarationProps {
  open: boolean;
  onClose: () => void;
  onDeleteProduct: () => void;
}

export const ModalDeleteProductCartDeclaration: React.FC<
  ModalDeleteProductCartDeclarationProps
> = ({ onClose, open, onDeleteProduct }) => {
  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onClose} withoutMargin>
        <div className="flex-col flex py-10 items-center">
          <div className="mb-4 flex">
            <Typography color="secondary" textPosition="text-center">
              Êtes-vous sur de vouloir supprimer
              <br /> cette marchandise ?
            </Typography>
          </div>
          <div className="w-36 mb-2 flex">
            <Button
              fullWidth
              onClick={() => {
                onDeleteProduct();
              }}
            >
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
    </>
  );
};
