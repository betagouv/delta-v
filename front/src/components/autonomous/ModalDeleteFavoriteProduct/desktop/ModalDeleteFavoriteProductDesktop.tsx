import React from 'react';

import CenterModal from '@/components/common/CenterModal';
import { Typography } from '@/components/common/Typography';

interface ModalDeleteProductCartDeclarationProps {
  productName: string;
  open: boolean;
  onClose: () => void;
  onDeleteProduct: () => void;
}

export const ModalDeleteFavoriteProductDesktop: React.FC<
  ModalDeleteProductCartDeclarationProps
> = ({ productName, onClose, open, onDeleteProduct }) => {
  return (
    <>
      <CenterModal bgColor="bg-white" open={open} onClose={onClose} centeredContent>
        <div className="flex-col flex items-center gap-4">
          <Typography color="secondary" textPosition="text-center" size="text-2xs">
            {`Êtes-vous sur de vouloir supprimer "${productName}"`}
          </Typography>
          <div className="flex gap-5">
            <button onClick={onDeleteProduct} className="w-28 h-[34px] bg-primary-600 rounded-full">
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
      </CenterModal>
    </>
  );
};
