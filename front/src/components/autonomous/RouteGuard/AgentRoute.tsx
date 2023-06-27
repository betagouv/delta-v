import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { ModalTokenExpire } from '../ModalTokenExpire';
import { useRefreshMutation } from '@/api/hooks/useAPIAuth';
import useTokenValidity, { TokenValidity } from '@/hooks/useTokenValidity';
import { useStore } from '@/stores/store';
import { clearTokens, hasToken } from '@/utils/auth';
import { RoutingAuthentication } from '@/utils/const';

type AdminRouteProps = {
  children: React.ReactNode;
};

export const AgentRoute: React.FC<AdminRouteProps> = ({ children }: AdminRouteProps) => {
  const router = useRouter();
  const tokenValidity = useTokenValidity();
  const [showExpirationModal, setShowExpirationModal] = useState(
    tokenValidity === TokenValidity.SOON_EXPIRED,
  );
  const { clearUser, setUserFromToken, tokenExpiration } = useStore(
    (state) => ({
      clearUser: state.clearUser,
      setUserFromToken: state.setUserFromToken,
      tokenExpiration: state.users.appState.user.exp,
    }),
    shallow,
  );

  const refreshMutation = useRefreshMutation({
    onSuccess: (data) => {
      setUserFromToken(data.accessToken, data.refreshToken);
      setShowExpirationModal(tokenValidity === TokenValidity.SOON_EXPIRED);
    },
  });

  const disconnect = () => {
    clearUser();
    clearTokens();
    router.push(RoutingAuthentication.login);
  };

  useEffect(() => {
    setShowExpirationModal(tokenValidity === TokenValidity.SOON_EXPIRED);

    if (tokenValidity === TokenValidity.INVALID || !hasToken()) {
      disconnect();
    }
  }, [tokenValidity]);

  return (
    <>
      {children}
      <ModalTokenExpire
        expirationTime={tokenExpiration ?? 0}
        isLoading={refreshMutation.isLoading}
        open={showExpirationModal}
        onClose={() => setShowExpirationModal(false)}
        onRefresh={() => refreshMutation.mutate()}
      />
    </>
  );
};
