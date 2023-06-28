import React from 'react';

import DownModal from '@/components/common/DownModal';
import { Typography } from '@/components/common/Typography';

interface ModalValidateFeedbackInfoProps {
  open: boolean;
  onClose?: () => void;
  onClickToRedirect: () => void;
}

export const ModalValidateFeedbackInfo: React.FC<ModalValidateFeedbackInfoProps> = ({
  onClose,
  onClickToRedirect,
  open,
}) => {
  const onCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      <DownModal bgColor="bg-white" open={open} onClose={onCloseModal} withoutMargin>
        <div className="pt-8 pb-10 flex h-auto flex-1 flex-col justify-center px-4 items-center">
          <Typography size="text-2xl" weight="bold" color="black">
            Merci !
          </Typography>
          <div className="mt-4 text-center">
            <Typography size="text-sm" color="black" textPosition="text-center">
              Votre message a bien été envoyé. Nos équipes reviendront vers vous au plus vite.
            </Typography>
          </div>
          <div className="px-16 self-center mt-[30px] w-full">
            <button
              className={`py-3 w-full rounded-full  text-white text-xs bg-primary-600`}
              onClick={onClickToRedirect}
            >
              Revenir à l’accueil
            </button>
          </div>
        </div>
      </DownModal>
    </>
  );
};
