import { Router } from 'express';
import { initiateAgentConnect } from './initiate';
import { authenticateAgentConnect } from './authenticate';
import { logoutAgentConnect } from './logout';

export const agentConnectRouter = Router()
  .use(initiateAgentConnect)
  .use(authenticateAgentConnect)
  .use(logoutAgentConnect);
