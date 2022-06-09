import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { ModalSimulator } from '@/components/autonomous/ModalSimulator';
import { Link } from '@/components/common/Link';

interface BackButtonProps {
  open?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  open = false,
  onClose,
  onClick,
}: BackButtonProps) => {
  return onClick ? (
    <div className="flex flex-row items-end" onClick={onClick}>
      <div className="mr-4 h-5 w-5">
        <Icon name="chevron-thin-left" />
      </div>
      <Typography> Retour</Typography>
      <ModalSimulator open={open} onClose={onClose} />
    </div>
  ) : (
    <Link back>
      <div className="flex flex-row items-end">
        <div className="mr-4 h-5 w-5">
          <Icon name="chevron-thin-left" />
        </div>
        <Typography> Retour</Typography>
      </div>
    </Link>
  );
};
