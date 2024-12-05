import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useAgentConnectLogoutCallbackMutation } from '@/api/hooks/useAPIAuth';
import { Typography } from '@/components/atoms/Typography';
import { Meta } from '@/layout/Meta';
import { useStore } from '@/stores/store';
import { MainAuth } from '@/templates/MainAuth';
import { clearTokens } from '@/utils/auth';
import { RoutingAuthentication } from '@/utils/const';

const LogoutPage = () => {
  const router = useRouter();
  const { state: logoutState } = router.query;
  const { clearUser } = useStore((state) => ({
    clearUser: state.clearUser,
  }));

  const agentConnectLogoutCallbackMutation = useAgentConnectLogoutCallbackMutation({
    onSuccess: () => {
      clearUser();
      clearTokens();
      router.replace(RoutingAuthentication.login);
    },
  });

  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (logoutState && !hasCalledRef.current) {
      hasCalledRef.current = true;
      agentConnectLogoutCallbackMutation.mutate({
        state: logoutState as string,
      });
    }
  }, [logoutState]);

  return (
    <MainAuth
      meta={
        <Meta
          title="Déclare Douanes - Déconnexion"
          description="Page de déconnexion d'un agent des douanes"
        />
      }
    >
      <div className="flex flex-col items-center justify-center h-full">
        <Typography variant="h1" size="text-xl" weight="bold" textPosition="text-center">
          Déconnexion en cours...
        </Typography>
        <Typography size="text-base" textPosition="text-center">
          Vous allez être redirigé dans un instant.
        </Typography>
      </div>
    </MainAuth>
  );
};

export default LogoutPage;
