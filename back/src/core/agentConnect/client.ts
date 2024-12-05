import { agentConnectConfig } from './config';
import { AgentConnectService } from './service';

export const agentConnectService = new AgentConnectService(agentConnectConfig);
