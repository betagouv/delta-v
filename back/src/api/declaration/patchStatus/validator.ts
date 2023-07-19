import { buildValidationMiddleware } from '../../../core/middlewares';
import { validator } from '../../../core/validator';
import { DeclarationStatus } from '../../../entities/declaration.entity';

export interface PatchStatusRequest {
  params: {
    declarationId: string;
  };
  body: {
    status: DeclarationStatus;
  };
}

export const patchStatusValidator = {
  params: validator.object({
    declarationId: validator.string().uuid().required(),
  }),
  body: validator.object({
    status: validator
      .string()
      .valid(...Object.values(DeclarationStatus))
      .required(),
  }),
};

export default buildValidationMiddleware(patchStatusValidator);
