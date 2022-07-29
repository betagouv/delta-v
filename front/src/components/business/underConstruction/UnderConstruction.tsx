import React from 'react';

import underConstruction from '@/assets/images/Under-Construction.png';

export const UnderConstruction: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="h-auto w-60">
        <img {...underConstruction} />
      </div>
      <p className="-mt-8">
        Cette page est en cours <br />
        de construction, <br />
        elle sera bientôt disponible.
      </p>
    </div>
  );
};
