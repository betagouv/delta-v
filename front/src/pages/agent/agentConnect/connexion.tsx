import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useAgentConnectCallbackMutation } from '@/api/hooks/useAPIAuth';
import { useStore } from '@/stores/store';

const AgentConnectCallbackPage = () => {
  const { setUserFromToken } = useStore((state) => ({
    setUserFromToken: state.setUserFromToken,
  }));
  const router = useRouter();
  const agentConnectCallbackMutation = useAgentConnectCallbackMutation({
    onSuccess: (data) => {
      setUserFromToken(data.accessToken, data.refreshToken, data.lastRefresh);
      router.replace('/agent');
    },
  });

  const hasCalledRef = useRef(false);

  useEffect(() => {
    const { code, state, iss } = router.query;

    if (code && state && !hasCalledRef.current) {
      hasCalledRef.current = true;
      agentConnectCallbackMutation.mutate({
        code: code as string,
        state: state as string,
        iss: iss as string,
      });
    }
  }, [router.query]);

  return <div>Authentification en cours...</div>;
};

export default AgentConnectCallbackPage;
