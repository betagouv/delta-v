import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useStore } from '@/stores/store';
import { getCurrentLevelPath, getLevelWithData } from '@/utils/simulator';

const isExcludeRoute = (path: string): boolean => {
  return path.startsWith('/simulateur/configuration/etape1');
};

const isSimulatorRoute = (path: string): boolean => {
  return path.startsWith('/simulateur');
};

export const simulator = (Component: React.FC) => {
  const CheckSimulator = (props: any) => {
    const router = useRouter();

    const { simulatorRequest } = useStore((state) => ({
      simulatorRequest: state.simulator.appState.simulatorRequest,
    }));
    const path = router.pathname;
    const defaultComponent = <Component {...props} />;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (isExcludeRoute(path) || !isSimulatorRoute(path)) {
        setLoading(false);
        return;
      }

      const maxLevel = getLevelWithData(simulatorRequest);
      const currentLevel = getCurrentLevelPath(path);

      if (maxLevel < currentLevel) {
        router.replace('/simulateur/configuration/etape0');
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) {
      return <></>;
    }
    return defaultComponent;
  };

  return CheckSimulator;
};
