import { TokenSet, Issuer, Client } from 'openid-client';
import * as jose from 'jose';
import { IAgentConnectService, AgentConnectService } from '../../src/core/agentConnect/service';
import { Agent } from '../../src/core/agentConnect/lib';
import { agentConnectConfig, AgentConnectConfig } from '../../src/core/agentConnect/config';

interface AgentConnectServiceMockOptions {
  getAuthorizationUrl?: string;
  getTokenSet?: TokenSet;
  getUserInfo?: any;
  mapToUser?: Agent;
  getLogoutUrl?: string;
  getPublicKey?: jose.KeyLike;
  refreshTokenSet?: TokenSet;
  checkAndRefreshToken?: TokenSet;
  getCallbackParams?: any;
  verifyIdToken?: jose.JWTVerifyResult;
  config?: Partial<AgentConnectConfig>;
  client?: Partial<Client>;
  issuer?: Partial<Issuer>;
}

export const agentConnectServiceMock = (
  options: AgentConnectServiceMockOptions,
): IAgentConnectService => {
  const agentConnectService = new AgentConnectService(agentConnectConfig);

  // Mock la méthode privée
  (agentConnectService as any).initializeClient = jest.fn().mockResolvedValue(undefined);

  // Mock les méthodes publiques
  agentConnectService.getAuthorizationUrl = jest
    .fn()
    .mockReturnValue(options.getAuthorizationUrl || '');
  agentConnectService.getTokenSet = jest.fn().mockResolvedValue(options.getTokenSet || {});
  agentConnectService.getUserInfo = jest.fn().mockResolvedValue(options.getUserInfo || {});
  agentConnectService.mapToUser = jest.fn().mockReturnValue(options.mapToUser || {});
  agentConnectService.getLogoutUrl = jest.fn().mockReturnValue(options.getLogoutUrl || '');
  agentConnectService.getPublicKey = jest
    .fn()
    .mockResolvedValue(options.getPublicKey || ({} as jose.KeyLike));
  agentConnectService.refreshTokenSet = jest.fn().mockResolvedValue(options.refreshTokenSet || {});
  agentConnectService.checkAndRefreshToken = jest
    .fn()
    .mockResolvedValue(options.checkAndRefreshToken || {});
  agentConnectService.getCallbackParams = jest
    .fn()
    .mockReturnValue(options.getCallbackParams || {});
  agentConnectService.verifyIdToken = jest.fn().mockResolvedValue(
    options.verifyIdToken ||
      ({
        payload: {},
        protectedHeader: {},
      } as jose.JWTVerifyResult),
  );
  agentConnectService.getLogoutUrl = jest.fn().mockReturnValue(options.getLogoutUrl || '');

  return agentConnectService;
};
