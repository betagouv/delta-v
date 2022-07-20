import React from 'react';

import { Icon } from '../Icon';

export interface InfoProps {
  children: React.ReactNode;
}

export const Info: React.FC<InfoProps> = ({ children }: InfoProps) => {
  return (
    <div className="flex flex-row items-center gap-2.5 bg-primary-100 p-2.5">
      <div className="flex h-5 w-5 items-center text-primary-700">
        <Icon name="info" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};
