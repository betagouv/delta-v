import { Router } from 'express';
import { initiateAgentConnect } from './initiate';
import { authenticateAgentConnect } from './authenticate';
import { logoutAgentConnect } from './logout';
import { refreshAgentConnect } from './refresh';
import { logoutCallbackAgentConnect } from './logoutCallback';

export const agentConnectRouter = Router();

agentConnectRouter.use(
  '/agent-connect',
  Router()
    .use(initiateAgentConnect)
    .use(authenticateAgentConnect)
    .use(logoutAgentConnect)
    .use(refreshAgentConnect)
    .use(logoutCallbackAgentConnect),
);
