import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useStore } from '@/stores/store';
import { getCurrentLevelPath, getLevelWithData } from '@/utils/declaration';

const isExcludeRoute = (path: string): boolean => {
  return path.startsWith('/simulateur/configuration/etape1');
};

const isDeclarationRoute = (path: string): boolean => {
  return path.startsWith('/simulateur');
};

export const declaration = (Component: React.FC) => {
  const CheckDeclaration = (props: any) => {
    const router = useRouter();

    const { declarationRequest } = useStore((state) => ({
      declarationRequest: state.declaration.appState.declarationRequest,
    }));
    const path = router.pathname;
    const defaultComponent = <Component {...props} />;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (isExcludeRoute(path) || !isDeclarationRoute(path)) {
        setLoading(false);
        return;
      }

      const maxLevel = getLevelWithData(declarationRequest);
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

  return CheckDeclaration;
};
