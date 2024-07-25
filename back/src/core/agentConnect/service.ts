import axios from 'axios';
import { AgentConnectConfig } from './config';
import { Agent } from './lib';

export class AgentConnectService {
  private config: AgentConnectConfig;

  constructor(config: AgentConnectConfig) {
    this.config = config;
  }

  public async authenticate(code: string): Promise<Agent> {
    const token = await this.getToken(code);
    const userInfo = await this.getUserInfo(token);

    return this.mapToUser(userInfo);
  }

  private async getToken(code: string): Promise<string> {
    const response = await axios.post(this.config.tokenEndpoint, {
      code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      grant_type: 'authorization_code',
    });

    return response.data.access_token;
  }

  private async getUserInfo(token: string): Promise<any> {
    const response = await axios.get(this.config.userInfoEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('🚀 ~ AgentConnectService ~ getUserInfo ~ response:', response);

    return response.data;
  }

  private mapToUser(userInfo: any): Agent {
    console.log('🚀 ~ AgentConnectService ~ mapToUser ~ userInfo:', userInfo);
    return {
      id: userInfo.sub,
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      username: userInfo.username,
      createdAt: new Date(userInfo.created_at),
      updatedAt: new Date(userInfo.updated_at),
    };
  }
}
