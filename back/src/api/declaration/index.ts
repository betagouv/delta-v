import { Router } from 'express';
import { getSimulation } from './getSimulation';
import { putDeclaration } from './putDeclaration';

export default Router().use(getSimulation).use(putDeclaration);
