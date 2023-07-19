import { Router } from 'express';
import { getDeclaration } from './getDeclaration';
import { getSimulation } from './getSimulation';
import { putDeclaration } from './putDeclaration';
import { patchStatus } from './patchStatus';
import { getDeclarationWithPublicId } from './getDeclarationWithPublicId';
import { getDeclarations } from './getDeclarations';

export default Router()
  .use(getSimulation)
  .use(putDeclaration)
  .use(getDeclaration)
  .use(getDeclarationWithPublicId)
  .use(getDeclarations)
  .use(patchStatus);
