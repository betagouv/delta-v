import { AgentConnectService } from '../../../../core/agentConnect/service';
import { generateRandomString } from '../../../../utils/generateRandomString';

interface ILogoutServiceOptions {
  idToken: string;
  agentConnectService: AgentConnectService;
}

interface ILogoutServiceResponse {
  logoutUrl: string;
  state: string;
}

export const service = ({
  idToken,
  agentConnectService,
}: ILogoutServiceOptions): ILogoutServiceResponse => {
  const state = generateRandomString(32);

  const logoutUrl = agentConnectService.getLogoutUrl(idToken, state);

  return { logoutUrl, state };
};
