import { config } from '../../loader/config';

export interface AgentConnectConfig {
  issuer: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  id_token_signed_response_alg: string;
  userinfo_signed_response_alg: string;
}

export const agentConnectConfig: AgentConnectConfig = {
  issuer: config.AGENTCONNECT_ISSUER || 'https://fca.integ01.dev-agentconnect.fr/api/v2',
  clientId: config.AGENTCONNECT_CLIENT_ID,
  clientSecret: config.AGENTCONNECT_CLIENT_SECRET,
  redirectUri: config.AGENTCONNECT_REDIRECT_URI,
  postLogoutRedirectUri: config.AGENTCONNECT_POST_LOGOUT_REDIRECT_URI,
  id_token_signed_response_alg: config.AGENTCONNECT_ID_TOKEN_SIGNED_RESPONSE_ALG,
  userinfo_signed_response_alg: config.AGENTCONNECT_USERINFO_SIGNED_RESPONSE_ALG,
};
