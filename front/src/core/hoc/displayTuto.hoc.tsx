import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useStore } from '@/stores/store';
import { Routing } from '@/utils/const';

export const DisplayTuto = (Component: React.FC) => {
  const CheckTuto = (props: any) => {
    const router = useRouter();

    const displayTuto = useStore((state) => state.global.appState.displayTuto);
    const defaultComponent = <Component {...props} />;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!displayTuto) {
        setLoading(false);
        return;
      }
      router.replace(Routing.tuto);
    }, []);

    if (loading) {
      return <></>;
    }
    return defaultComponent;
  };

  return CheckTuto;
};
