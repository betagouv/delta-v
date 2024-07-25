import { config } from '../../loader/config';

export interface AgentConnectConfig {
  tokenEndpoint: string;
  userInfoEndpoint: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export const agentConnectConfig: AgentConnectConfig = {
  tokenEndpoint: config.AGENTCONNECT_TOKEN_ENDPOINT || 'https://agentconnect.gouv.fr/api/token',
  userInfoEndpoint:
    config.AGENTCONNECT_USERINFO_ENDPOINT || 'https://agentconnect.gouv.fr/api/userinfo',
  clientId: config.AGENTCONNECT_CLIENT_ID || 'YOUR_CLIENT_ID',
  clientSecret: config.AGENTCONNECT_CLIENT_SECRET || 'YOUR_CLIENT_SECRET',
  redirectUri: config.AGENTCONNECT_REDIRECT_URI || 'YOUR_REDIRECT_URI',
};
