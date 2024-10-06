import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import { ModalTokenExpire } from '../../organisms/ModalTokenExpire';
import { useAgentConnectLogoutMutation, useRefreshMutation } from '@/api/hooks/useAPIAuth';
import { CountdownToast } from '@/components/atoms/CountdownToast';
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
  const {
    clearUser,
    setUserFromToken,
    tokenExpiration,
    lastRefresh,
    setCountdownEnd,
    getCountdownEnd,
  } = useStore(
    (state) => ({
      clearUser: state.clearUser,
      setUserFromToken: state.setUserFromToken,
      tokenExpiration: state.users.appState.user.exp,
      lastRefresh: state.users.appState.user.lastRefresh,
      setCountdownEnd: state.setCountdownEnd,
      getCountdownEnd: state.getCountdownEnd,
    }),
    shallow,
  );

  const agentConnectLogoutMutation = useAgentConnectLogoutMutation({});

  const disconnectAgentConnect = () => {
    agentConnectLogoutMutation.mutate();
  };

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCountdown = (duration: number) => {
    const endTime = Date.now() + duration;
    setCountdownEnd(endTime);
  };

  const refreshMutation = useRefreshMutation({
    onSuccess: (data) => {
      setUserFromToken(data.accessToken, data.refreshToken, data.lastRefresh);
      setShowExpirationModal(tokenValidity === TokenValidity.SOON_EXPIRED);

      if (data.lastRefresh && data.timeToLogout) {
        const timeoutInMs = data.timeToLogout;
        startCountdown(timeoutInMs);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          disconnectAgentConnect();
        }, timeoutInMs);
      }
    },
    onError: () => {
      disconnectAgentConnect();
    },
  });

  const disconnect = () => {
    clearUser();
    clearTokens();
    router.replace(RoutingAuthentication.login);
  };

  useEffect(() => {
    setShowExpirationModal(tokenValidity === TokenValidity.SOON_EXPIRED && !lastRefresh);

    if (!hasToken()) {
      disconnect();
      return;
    }

    if (tokenValidity === TokenValidity.INVALID) {
      disconnectAgentConnect();
    }
  }, [tokenValidity, lastRefresh]);

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
      {getCountdownEnd() && <CountdownToast onTimeout={disconnectAgentConnect} />}
    </>
  );
};
