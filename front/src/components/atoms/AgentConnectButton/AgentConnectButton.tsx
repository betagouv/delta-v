import React from 'react';

import { Button } from '../Button';

export interface AgentConnectButtonProps {
  onClick: () => void;
}

export const AgentConnectButton: React.FC<AgentConnectButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} fullWidth={true} size="sm" variant="outlinedBgWhite">
      Se connecter avec AgentConnect
    </Button>
  );
};
