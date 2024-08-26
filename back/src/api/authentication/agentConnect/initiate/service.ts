import { AgentConnectService } from '../../../../core/agentConnect/service';
import { generateRandomString } from '../../../../utils/generateRandomString';

interface IInitiateServiceOptions {
  agentConnectService: AgentConnectService;
}

interface IInitiateServiceResponse {
  state: string;
  nonce: string;
  authorizationUrl: string;
}

export const service = ({
  agentConnectService,
}: IInitiateServiceOptions): IInitiateServiceResponse => {
  const state = generateRandomString();
  const nonce = generateRandomString();

  const authorizationUrl = agentConnectService.getAuthorizationUrl(state, nonce);

  return { state, nonce, authorizationUrl };
};
