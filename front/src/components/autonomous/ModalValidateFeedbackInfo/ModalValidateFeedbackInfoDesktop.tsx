import React from 'react';

import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';

interface ModalValidateFeedbackInfoProps {
  open: boolean;
  onClose?: () => void;
  onClickToRedirect: () => void;
}

export const ModalValidateFeedbackInfoDesktop: React.FC<ModalValidateFeedbackInfoProps> = ({
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
      <Modal open={open} onClose={onCloseModal}>
        <div className="flex h-auto flex-1 flex-col justify-center px-4 items-center">
          <Typography size="text-lg" weight="bold" color="black">
            Merci !
          </Typography>
          <div className="mt-1.5 text-center">
            <Typography
              size="text-2xs"
              color="black"
              textPosition="text-center"
              lineHeight="leading-none"
            >
              Votre message a bien été envoyé. <br /> Nos équipes reviendront vers vous au plus
              vite.
            </Typography>
          </div>
          <div className="inline-flex self-center mt-5">
            <button
              className={`py-3 w-full rounded-full  text-white text-2xs bg-primary-600 px-[30px]`}
              onClick={onClickToRedirect}
            >
              Revenir à l’accueil
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
