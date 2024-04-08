import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import { useStore } from '@/stores/store';
import { Routing, RoutingAgent } from '@/utils/const';

interface ModalDeclarationProps {
  open: boolean;
  onClose?: () => void;
  templateRole: 'agent' | 'user';
}

export const ModalResumeDeclaration: React.FC<ModalDeclarationProps> = ({
  onClose,
  open,
  templateRole,
}) => {
  const router = useRouter();

  const { resetDeclaration, resetDeclarationAgent } = useStore((state) => ({
    resetDeclaration: state.resetDeclaration,
    resetDeclarationAgent: state.resetDeclarationAgent,
  }));

  const onResetDeclarationClick = () => {
    if (templateRole === 'agent') {
      resetDeclarationAgent();
      router.push(RoutingAgent.createDeclaration);
    } else {
      resetDeclaration();
      router.push(Routing.createDeclaration);
    }
    onClose?.();
  };

  const onResumeDeclarationClick = () => {
    if (templateRole === 'agent') {
      router.push(RoutingAgent.createDeclaration);
    } else {
      router.push(Routing.createDeclaration);
    }
    onClose?.();
  };
  return (
    <>
      <Modal
        title="Vous avez commencé une declaration."
        subtitle="Souhaitez vous la reprendre ou en débuter une nouvelle ? "
        open={open}
        onClose={onClose}
        desktopTitleSize="text-sm"
        desktopSubtitleSize="text-sm"
      >
        <div className="grid w-full grid-rows-2 gap-base justify-items-center mt-5">
          <Button
            type="submit"
            size="lg"
            variant="outlined"
            rounded="full"
            fullWidth
            className={{ 'md:w-[198px] md:h-[34px] md:text-xs': true }}
            onClick={onResetDeclarationClick}
          >
            Nouvelle declaration
          </Button>
          <Button
            type="submit"
            size="lg"
            rounded="full"
            fullWidth
            onClick={onResumeDeclarationClick}
            className={{ 'md:w-[198px] md:h-[34px] md:text-xs': true }}
          >
            Reprendre la declaration
          </Button>
        </div>
      </Modal>
    </>
  );
};
