import { Router } from 'express';
import { getDeclaration } from './getDeclaration';
import { getSimulation } from './getSimulation';
import { putDeclaration } from './putDeclaration';
import { patchStatus } from './patchStatus';

export default Router().use(getSimulation).use(putDeclaration).use(getDeclaration).use(patchStatus);
