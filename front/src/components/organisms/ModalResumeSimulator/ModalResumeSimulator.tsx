import React from 'react';

import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/Button';
import Modal from '@/components/molecules/Modal';
import { SimulatorRequest } from '@/stores/simulator/appState.store';
import { Routing } from '@/utils/const';
import { getCurrentPath } from '@/utils/simulator';

interface ModalSimulatorProps {
  open: boolean;
  onClose?: () => void;
  simulatorRequest: SimulatorRequest;
}

export const ModalResumeSimulator: React.FC<ModalSimulatorProps> = ({
  onClose,
  open,
  simulatorRequest,
}) => {
  const router = useRouter();

  const resumeSimulation = () => {
    const resumePath = getCurrentPath(simulatorRequest);
    router.push(resumePath);
    onClose?.();
  };
  return (
    <>
      <Modal
        title="Vous avez commencé une simulation."
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
            onClick={() => router.push(Routing.simulator)}
          >
            Nouvelle simulation
          </Button>
          <Button type="submit" size="lg" rounded="full" fullWidth onClick={resumeSimulation}>
            Reprendre la simulation
          </Button>
        </div>
      </Modal>
    </>
  );
};
