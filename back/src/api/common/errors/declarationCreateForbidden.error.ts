import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Declaration create forbidden.',
    publicMessage:
      'Création de déclaration non autorisée - Vos produits en quantité ne doivent pas dépasser la limite autorisée.',
    code: ErrorCodes.DECLARATION_CREATION_FORBIDDEN,
    statusCode: HttpStatuses.FORBIDDEN,
  });
