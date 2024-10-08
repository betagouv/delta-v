import { Router } from 'express';
import { agentConnectRouter } from './agentConnect';

export default Router().use(agentConnectRouter);
