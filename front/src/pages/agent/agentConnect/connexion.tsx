import { useEffect } from 'react';

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
      console.log('🚀 ~ AgentConnectCallbackPage ~ data:', data);

      router.replace('/agent');
    },
  });

  useEffect(() => {
    const { code, state, iss } = router.query;

    if (code && state) {
      agentConnectCallbackMutation.mutate({
        code: code as string,
        state: state as string,
        iss: iss as string,
      });
    }
  }, []);

  return <div>Authentification en cours...</div>;
};

export default AgentConnectCallbackPage;
