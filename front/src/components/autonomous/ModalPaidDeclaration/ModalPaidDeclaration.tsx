import React from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // import duration plugin

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';

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
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-1 justify-center">
            <Typography size="text-2xs" color="secondary">
              Numéro de quittance
            </Typography>
            <Typography size="text-sm" color="black" weight="bold">
              {declarationId}
            </Typography>
          </div>
          <div className="mt-5 w-[190px]">
            <Typography size="text-xs" color="secondary" textPosition="text-center">
              La déclaration est validée, vous pouvez procéder à l’encaissement de la déclaration.
            </Typography>
          </div>
          <div className="flex flex-1 flex-col items-center mt-4 gap-4">
            <Button onClick={onPaid} disabled={isLoading}>
              Déclaration payée
            </Button>
            <Typography
              size="text-xs"
              color="primary"
              textPosition="text-center"
              underline
              onClick={onClose}
            >
              Annuler pour impossibilité d’encaissement
            </Typography>
          </div>
        </div>
      </Modal>
    </>
  );
};
