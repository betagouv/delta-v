import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import shallow from 'zustand/shallow';

import { useStore } from '@/stores/store';

export enum TokenValidity {
  VALID = 'valid',
  SOON_EXPIRED = 'soon-expired',
  INVALID = 'invalid',
}

const useTokenValidity = () => {
  const [tokenValidity, setTokenValidity] = useState<TokenValidity | undefined>(undefined);
  const { isAgent, exp } = useStore(
    (state) => ({
      isAgent: state.users.appState.user.isAgent,
      exp: state.users.appState.user.exp,
    }),
    shallow,
  );

  const checkTokenValidity = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const isExpiredRefreshToken = !!exp && dayjs().isAfter(dayjs.unix(exp));
    const shouldShowExpirationPopup = !!exp && dayjs.unix(exp).diff(dayjs(), 'minutes') < 5;

    if (!isAgent) {
      setTokenValidity(TokenValidity.INVALID);
    } else if (isExpiredRefreshToken) {
      setTokenValidity(TokenValidity.INVALID);
    } else if (shouldShowExpirationPopup) {
      setTokenValidity(TokenValidity.SOON_EXPIRED);
    } else {
      setTokenValidity(TokenValidity.VALID);
    }
  };

  const initCheckUserConnected = () => {
    const intervalId = setInterval(() => {
      checkTokenValidity();
    }, 1000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    checkTokenValidity();
    return initCheckUserConnected();
  }, [isAgent, exp]);

  return tokenValidity;
};

export const isConnected = (tokenValidity?: TokenValidity): boolean => {
  switch (tokenValidity) {
    case TokenValidity.VALID:
    case TokenValidity.SOON_EXPIRED:
      return true;
    default:
      return false;
  }
};

export default useTokenValidity;
