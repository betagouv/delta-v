import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SimulatorRequest } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';

const isExcludeRoute = (path: string): boolean => {
  return path.startsWith('/simulateur/configuration/etape1');
};

const isSimulatorRoute = (path: string): boolean => {
  return path.startsWith('/simulateur');
};

interface RouteLevel {
  path: string;
  level: number;
}

const routes: RouteLevel[] = [
  {
    path: '/simulateur/configuration/etape1',
    level: 1,
  },
  {
    path: '/simulateur/configuration/etape2',
    level: 2,
  },
  {
    path: '/simulateur/configuration/etape3',
    level: 3,
  },
  {
    path: '/simulateur/configuration/etape4',
    level: 4,
  },
  {
    path: '/simulateur/produits',
    level: 5,
  },
  {
    path: '/simulateur/panier',
    level: 5,
  },
  {
    path: '/simulateur/recapitulatif',
    level: 5,
  },
];

const getLevelWithData = (simulatorRequest: SimulatorRequest): number => {
  if (simulatorRequest.age === undefined) {
    return 1;
  }
  if (simulatorRequest.meanOfTransport === undefined) {
    return 2;
  }
  if (simulatorRequest.country === undefined) {
    return 3;
  }
  if (simulatorRequest.border === undefined) {
    return 4;
  }
  return 5;
};

const getCurrentLevelPath = (path: string): number => {
  return routes.find((route) => path.startsWith(route.path))?.level ?? 1;
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
