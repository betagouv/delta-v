import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useStore } from '@/stores/store';
import { RoutingAgent } from '@/utils/const';

interface ModalDeclarationProps {
  open: boolean;
  onClose?: () => void;
}

export const ModalResumeDeclaration: React.FC<ModalDeclarationProps> = ({ onClose, open }) => {
  const router = useRouter();

  const { resetDeclaration } = useStore((state) => ({
    resetDeclaration: state.resetDeclaration,
  }));

  const resumeDeclaration = () => {
    router.push(RoutingAgent.createDeclaration);
    onClose?.();
  };
  return (
    <>
      <Modal
        title="Vous avez commencé une declaration."
        subtitle="Souhaitez vous la reprendre ou en débuter une nouvelle ? "
        open={open}
        onClose={onClose}
      >
        <div className="grid w-full grid-rows-2 gap-base">
          <Button
            type="submit"
            size="lg"
            variant="outlined"
            rounded="full"
            fullWidth
            onClick={() => {
              resetDeclaration();
              router.push(RoutingAgent.createDeclaration);
            }}
          >
            Nouvelle declaration
          </Button>
          <Button type="submit" size="lg" rounded="full" fullWidth onClick={resumeDeclaration}>
            Reprendre la declaration
          </Button>
        </div>
      </Modal>
    </>
  );
};
