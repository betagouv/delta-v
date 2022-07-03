import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useStore } from '@/stores/store';

export const displayInfoSimulator = (Component: React.FC) => {
  const CheckSimulator = (props: any) => {
    const router = useRouter();

    const displayInfo = useStore((state) => state.simulator.appState.displayInfo);
    const defaultComponent = <Component {...props} />;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (displayInfo) {
        setLoading(false);
        return;
      }
      router.replace('/simulateur/configuration/etape1');
    }, []);

    if (loading) {
      return <></>;
    }
    return defaultComponent;
  };

  return CheckSimulator;
};
