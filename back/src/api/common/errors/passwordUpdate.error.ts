import { buildError, IAppError } from '../../../core/buildError';
import { HttpStatuses } from '../../../core/httpStatuses';
import { ErrorCodes } from '../enums/errorCodes.enum';

export default (): IAppError =>
  buildError({
    message: 'Modification de mot de passe impossible',
    publicMessage: 'Mise à jour du mot de passe impossible',
    code: ErrorCodes.PASSWORD_UPDATE_ERROR,
    statusCode: HttpStatuses.INTERNAL_SERVER_ERROR,
  });
