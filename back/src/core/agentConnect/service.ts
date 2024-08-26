// eslint-disable-next-line import/no-extraneous-dependencies
import { Issuer, Client, TokenSet } from 'openid-client';
import { AgentConnectConfig } from './config';
import { Agent } from './lib';

export interface IAgentConnectService {
  getAuthorizationUrl(state: string, nonce: string): string;
  getTokenSet(code: string, state: string, nonce: string): Promise<TokenSet>;
  getUserInfo(accessToken: string): any;
  mapToUser(userInfo: any): Agent;
  getLogoutUrl(idToken: string, state: string, nonce: string): string;
}

export class AgentConnectService implements IAgentConnectService {
  private config: AgentConnectConfig;
  private client: Client;

  constructor(config: AgentConnectConfig) {
    this.config = config;
    void this.initializeClient();
  }

  private async initializeClient(): Promise<void> {
    const agentConnectIssuer = await Issuer.discover(this.config.issuer);
    this.client = new agentConnectIssuer.Client({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uris: [this.config.redirectUri],
      response_types: ['code'],
    });
  }

  public getAuthorizationUrl(state: string, nonce: string): string {
    return this.client.authorizationUrl({
      scope: 'openid email profile',
      state,
      nonce,
      acr_values: 'eidas1',
      prompt: 'login',
    });
  }

  public async getTokenSet(code: string, state: string, nonce: string): Promise<TokenSet> {
    return await this.client.callback(this.config.redirectUri, { code }, { state, nonce });
  }

  public getUserInfo(accessToken: string): any {
    return this.client.userinfo(accessToken);
  }

  public mapToUser(userInfo: any): Agent {
    return {
      id: userInfo.sub,
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      username: userInfo.preferred_username,
      createdAt: new Date(userInfo.created_at),
      updatedAt: new Date(userInfo.updated_at),
    };
  }

  public getLogoutUrl(idToken: string, state: string, nonce: string): string {
    const params = new URLSearchParams({
      id_token_hint: idToken,
      state,
      nonce,
      post_logout_redirect_uri: this.config.postLogoutRedirectUri,
    });
    return `${this.config.postLogoutRedirectUri}?${params.toString()}`;
  }
}
