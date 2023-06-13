import { Router } from 'express';
import { getDeclaration } from './getDeclaration';
import { getSimulation } from './getSimulation';
import { putDeclaration } from './putDeclaration';
<<<<<<< HEAD
import { patchStatus } from './patchStatus';

export default Router().use(getSimulation).use(putDeclaration).use(getDeclaration).use(patchStatus);
=======
import { getDeclarationWithPublicId } from './getDeclarationWithPublicId';
import { getDeclarations } from './getDeclarations';

export default Router()
  .use(getSimulation)
  .use(putDeclaration)
  .use(getDeclaration)
  .use(getDeclarationWithPublicId)
  .use(getDeclarations);
>>>>>>> 0e16980 (feat(#551): add search declaration)
