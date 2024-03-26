import React from 'react';

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';
import { ModalType, getModalComponent } from '@/utils/modal';

interface ModalDeleteProductCartDeclarationProps {
  open: boolean;
  onClose: () => void;
  onDeleteProduct: () => void;
  modalType?: ModalType;
}

export const ModalDeleteProductCartDeclaration: React.FC<
  ModalDeleteProductCartDeclarationProps
> = ({ onClose, open, onDeleteProduct, modalType = ModalType.DOWN }) => {
  const ModalComponent = getModalComponent(modalType);
  return (
    <>
      <ModalComponent bgColor="bg-white" open={open} onClose={onClose} withoutMargin noPadding>
        <div className="flex-col flex py-10 items-center">
          <div className="mb-4 flex">
            <Typography color="secondary" textPosition="text-center" desktopSize="text-xs">
              Êtes-vous sur de vouloir supprimer
              <br className={clsxm({ hidden: modalType === ModalType.CENTER })} /> cette marchandise
              ?
            </Typography>
          </div>
          <div className="md:gap-5 flex md:flex-row-reverse flex-col gap-2">
            <div className="w-36 md:w-auto">
              <Button
                fullWidth
                onClick={() => {
                  onDeleteProduct();
                }}
                className={{ 'md:text-xs': true, 'md:w-[111px]': true, 'md:h-[34px]': true }}
              >
                Supprimer
              </Button>
            </div>
            <div className="w-36 md:w-auto">
              <Button
                variant="outlined"
                fullWidth
                onClick={onClose}
                className={{ 'md:text-xs': true, 'md:w-[111px]': true, 'md:h-[34px]': true }}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </ModalComponent>
    </>
  );
};
