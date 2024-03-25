import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration'; // import duration plugin

import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import Modal from '@/components/molecules/Modal';

dayjs.extend(duration); // extend dayjs with duration plugin

interface ModalTokenExpireProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  expirationTime: number;
  onRefresh: () => void;
}

const getCountDownValue = (expirationTime: number): string => {
  const secondDuration = dayjs.unix(expirationTime).diff(dayjs(), 'seconds');
  if (secondDuration < 0) return '0:00';
  return dayjs.duration(secondDuration, 'seconds').format('mm:ss');
};

export const ModalTokenExpire: React.FC<ModalTokenExpireProps> = ({
  onClose,
  open,
  isLoading,
  expirationTime,
  onRefresh,
}) => {
  const [countDown, setCountDown] = useState(getCountDownValue(expirationTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(getCountDownValue(expirationTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationTime]);

  return (
    <>
      <Modal
        title="Message de sécurité"
        subtitle="Cela fait plus de 55 min que vous n’avez pas réalisé d’action principale."
        open={open}
        onClose={onClose}
        preventClose
      >
        <div className="flex flex-1 flex-col items-center">
          <Typography textPosition="text-center" color="black" weight="bold">
            Déconnexion prévue dans
          </Typography>
          <Typography textPosition="text-center" color="error" weight="bold">
            {countDown} min
          </Typography>
          <br />
          <Button onClick={onRefresh} disabled={isLoading}>
            Rester connecté
          </Button>
        </div>
      </Modal>
    </>
  );
};
