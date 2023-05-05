import { Router } from 'express';
import { getDeclaration } from './getDeclaration';
import { getSimulation } from './getSimulation';
import { putDeclaration } from './putDeclaration';

export default Router().use(getSimulation).use(putDeclaration).use(getDeclaration);
