import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useStore } from '@/stores/store';
import { getCurrentLevelPath, getLevelWithData } from '@/utils/declarationAgent';

const isDeclarationRoute = (path: string): boolean => {
  return path.startsWith('/agent/declaration/ajout/');
};

export const declarationAgent = (Component: React.FC) => {
  const CheckDeclaration = (props: any) => {
    const router = useRouter();

    const { declarationAgentRequest } = useStore((state) => ({
      declarationAgentRequest: state.declaration.appState.declarationAgentRequest,
    }));
    const path = router.pathname;
    const defaultComponent = <Component {...props} />;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!isDeclarationRoute(path)) {
        setLoading(false);
        return;
      }

      const maxLevel = getLevelWithData(declarationAgentRequest);
      const currentLevel = getCurrentLevelPath(path);

      if (maxLevel < currentLevel) {
        router.replace('/agent/declaration/ajout/coordonnees');
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
