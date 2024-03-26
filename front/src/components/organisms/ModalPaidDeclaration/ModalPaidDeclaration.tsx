import React from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // import duration plugin

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import Modal from '@/components/molecules/Modal';

dayjs.extend(duration); // extend dayjs with duration plugin

interface ModalPaidDeclarationProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onPaid: () => void;
  declarationId: string;
}

export const ModalPaidDeclaration: React.FC<ModalPaidDeclarationProps> = ({
  onClose,
  open,
  isLoading,
  onPaid,
  declarationId,
}) => {
  return (
    <>
      <Modal open={open} onClose={onClose} withMargin={false}>
        <div className="my-3 flex flex-col items-center">
          <div className="flex flex-col items-center gap-0.5 justify-center">
            <Typography size="text-2xs" color="light-gray" desktopSize="text-2xs">
              NUMÉRO DE QUITTANCE
            </Typography>
            <Typography size="text-base" color="black" weight="bold" desktopSize="text-sm">
              {declarationId}
            </Typography>
          </div>
          <div className="mt-5">
            <Typography
              size="text-sm"
              color="secondary"
              textPosition="text-center"
              tag="p"
              desktopSize="text-xs"
            >
              La déclaration est validée, <br /> vous pouvez procéder à l’encaissement de la
              déclaration.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center mt-4 gap-4">
            <Button
              onClick={onPaid}
              disabled={isLoading}
              className={{ 'w-[190px] md:w-[148px] md:h-[34px]': true }}
            >
              <Typography color="white" desktopSize="text-xs">
                Déclaration payée
              </Typography>
            </Button>
            <div className="cursor-pointer w-full text-center">
              <Typography
                size="text-sm"
                desktopSize="text-xs"
                color="primary"
                textPosition="text-center"
                underline
                onClick={onClose}
              >
                Annuler pour impossibilité d’encaissement
              </Typography>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
