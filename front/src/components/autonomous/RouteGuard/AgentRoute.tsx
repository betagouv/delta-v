import { useEffect } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { useStore } from '@/stores/store';
import { clearTokens } from '@/utils/auth';
import { RoutingAuthentication } from '@/utils/const';

type AdminRouteProps = {
  children: React.ReactNode;
};
export const AgentRoute: React.FC<AdminRouteProps> = ({ children }: AdminRouteProps) => {
  const router = useRouter();
  const { isAgent, exp, clearUser } = useStore((state) => ({
    isAgent: state.users.appState.user.isAgent,
    exp: state.users.appState.user.exp,
    clearUser: state.clearUser,
  }));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAgentLogged = !!isAgent;
      if (!isAgentLogged) {
        router.push(RoutingAuthentication.login);
      }

      const isExpiredRefreshToken = exp && dayjs().isAfter(dayjs.unix(exp));
      if (isExpiredRefreshToken) {
        clearUser();
        clearTokens();
        router.push(RoutingAuthentication.login);
      }
    }
  }, []);

  return <>{children}</>;
};
